'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Button from '../../components/common/Button';
import { MOCK_USERS } from '../../utils/mockData';
import { Plus, Edit, Trash2, Shield, User, Key } from 'lucide-react';

const AdminUsersPage = () => {
  const { addToast } = useToast();
  const [users, setUsers] = useState(MOCK_USERS);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    username: '',
    email: '',
    fullName: '',
    phone: '',
    roleNames: ['ROLE_OPERATOR'],
    enabled: true,
    password: ''
  };
  const [formData, setFormData] = useState(initialForm);
  const [newPassword, setNewPassword] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await adminService.getUsers();
      const list = Array.isArray(res) ? res : res?.data?.data || res?.data || [];
      if (list && list.length > 0) setUsers(list);
    } catch (err) {
      // keep fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (u) => {
    setIsEditing(true);
    setSelectedUser(u);
    setFormData({
      username: u.username || '',
      email: u.email || '',
      fullName: u.fullName || '',
      phone: u.phone || '',
      roleNames: u.roles ? u.roles.map(r => r.name) : ['ROLE_OPERATOR'],
      enabled: u.enabled !== undefined ? u.enabled : true,
      password: ''
    });
    setModalOpen(true);
  };

  const handleOpenResetPassword = (u) => {
    setSelectedUser(u);
    setNewPassword('');
    setPasswordModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await adminService.updateUser(selectedUser.id, formData);
        setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u));
        addToast('User details updated successfully', 'success');
      } else {
        const created = await adminService.createUser(formData);
        setUsers(prev => [created || { id: Date.now(), createdAt: new Date().toISOString(), ...formData }, ...prev]);
        addToast('New user account provisioned successfully', 'success');
      }
      setModalOpen(false);
    } catch (err) {
      addToast(err.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      addToast('Password must be at least 6 characters', 'warning');
      return;
    }
    try {
      await adminService.resetUserPassword(selectedUser.id, newPassword);
      addToast('Password has been successfully updated', 'success');
      setPasswordModalOpen(false);
    } catch (err) {
      addToast('Failed to update user password', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteUser(selectedUser.id);
      setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
      addToast('User deleted successfully', 'success');
      setDeleteDialogOpen(false);
    } catch (err) {
      addToast('Failed to delete user account', 'error');
    }
  };

  const handleRoleToggle = (role) => {
    setFormData((prev) => {
      const exists = prev.roleNames.includes(role);
      if (exists) {
        return { ...prev, roleNames: prev.roleNames.filter(r => r !== role) };
      } else {
        return { ...prev, roleNames: [...prev.roleNames, role] };
      }
    });
  };

  const columns = [
    {
      header: 'User Account',
      accessor: 'username',
      render: (item) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-navy-800 border border-slate-700 flex items-center justify-center font-bold text-gold-400">
            {item.fullName?.charAt(0) || item.username?.charAt(0) || 'U'}
          </div>
          <div>
            <div className="font-semibold text-white">{item.fullName || item.username}</div>
            <div className="text-xs text-slate-400">{item.email} • @{item.username}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Assigned Roles',
      render: (item) => (
        <div className="flex flex-wrap gap-1">
          {item.roles?.map((r) => (
            <span
              key={r.name}
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                r.name === 'ROLE_ADMIN' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' :
                r.name === 'ROLE_SECURITY_MANAGER' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                'bg-slate-800 text-slate-300 border border-slate-700'
              }`}
            >
              {r.name.replace('ROLE_', '')}
            </span>
          ))}
        </div>
      )
    },
    {
      header: 'Phone',
      accessor: 'phone',
      render: (item) => <span className="text-sm text-slate-300">{item.phone || '—'}</span>
    },
    {
      header: 'Account Status',
      accessor: 'enabled',
      render: (item) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${item.enabled ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'}`}>
          {item.enabled ? 'Enabled' : 'Disabled'}
        </span>
      )
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (item) => (
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => handleOpenResetPassword(item)}
            className="p-1.5 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-gold-400 border border-slate-700 transition"
            title="Reset Password"
          >
            <Key className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenEdit(item)}
            className="p-1.5 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-slate-300 border border-slate-700 transition"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setSelectedUser(item); setDeleteDialogOpen(true); }}
            className="p-1.5 rounded-lg bg-navy-800 hover:bg-rose-600 text-slate-300 hover:text-white border border-slate-700 transition"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">User & RBAC Access Management</h1>
          <p className="text-xs text-slate-400 mt-1">Provision operational staff accounts and configure RBAC roles.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={handleOpenAdd} className="shadow-gold-glow">
          Provision User
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={users}
        searchPlaceholder="Search users by name, username or email..."
        searchKey="username"
        loading={loading}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? 'Edit User Credentials & Roles' : 'Provision User Account'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Username *</label>
              <input
                type="text"
                required
                disabled={isEditing}
                className="input-field disabled:opacity-50 disabled:bg-slate-900"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="officer.smith"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="officer@domain.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Full Legal Name *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Contact Phone</label>
              <input
                type="text"
                className="input-field"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (800) 555-0199"
              />
            </div>
          </div>

          {!isEditing && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Initial Temporary Password *</label>
              <input
                type="password"
                required
                className="input-field"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Must be at least 6 characters"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Role Permissions</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { key: 'ROLE_ADMIN', label: 'Admin (Full Access)' },
                { key: 'ROLE_SECURITY_MANAGER', label: 'Security Manager' },
                { key: 'ROLE_OPERATOR', label: 'Desk Operator' }
              ].map((role) => (
                <label
                  key={role.key}
                  className={`flex items-center p-3 rounded-xl border cursor-pointer transition ${
                    formData.roleNames.includes(role.key)
                      ? 'border-gold-500 bg-gold-500/10 text-gold-300 font-medium'
                      : 'border-slate-800 bg-navy-950/60 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.roleNames.includes(role.key)}
                    onChange={() => handleRoleToggle(role.key)}
                    className="rounded border-slate-700 bg-navy-950 text-gold-500 focus:ring-gold-500/40 h-4 w-4 mr-2"
                  />
                  <span className="text-xs">{role.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="enabledUser"
              checked={formData.enabled}
              onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
              className="rounded border-slate-700 bg-navy-950 text-gold-500 focus:ring-gold-500/40 h-4 w-4"
            />
            <label htmlFor="enabledUser" className="text-xs font-semibold text-slate-300 cursor-pointer">
              Account Enabled (Allow portal login)
            </label>
          </div>

          <div className="sticky bottom-0 bg-navy-900/95 backdrop-blur-md flex justify-end space-x-3 pt-4 border-t border-slate-800 shrink-0">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Create Account'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Password Reset Modal */}
      <Modal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        title={`Reset Password for @${selectedUser?.username}`}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
          <p className="text-xs text-slate-400">
            Enter a new password for user <strong className="text-white">{selectedUser?.fullName}</strong>.
          </p>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">New Password *</label>
            <input
              type="password"
              required
              className="input-field"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
            />
          </div>
          <div className="sticky bottom-0 bg-navy-900/95 backdrop-blur-md flex justify-end space-x-3 pt-4 border-t border-slate-800 shrink-0">
            <Button variant="ghost" onClick={() => setPasswordModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update Password
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Revoke User Account"
        message={`Are you sure you want to delete user account "${selectedUser?.username}"?`}
        confirmText="Revoke Account"
      />
    </div>
  );
};

export default AdminUsersPage;
