'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Button from '../../components/common/Button';
import FileUploader from '../../components/common/FileUploader';
import { Plus, Edit, Trash2, UserCheck, Shield } from 'lucide-react';

const AdminTeamPage = () => {
  const { addToast } = useToast();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    name: '',
    designation: '',
    bio: '',
    photoUrl: '',
    experienceYears: 5,
    certifications: '',
    email: '',
    phone: '',
    displayOrder: 0,
    active: true
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await adminService.getTeamMembers();
      setTeamMembers(res.data?.data || res.data || []);
    } catch (err) {
      addToast('Failed to load team members', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (member) => {
    setIsEditing(true);
    setSelectedMember(member);
    setFormData({
      name: member.name || '',
      designation: member.designation || '',
      bio: member.bio || '',
      photoUrl: member.photoUrl || '',
      experienceYears: member.experienceYears || 0,
      certifications: member.certifications || '',
      email: member.email || '',
      phone: member.phone || '',
      displayOrder: member.displayOrder || 0,
      active: member.active !== undefined ? member.active : true
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await adminService.updateTeamMember(selectedMember.id, formData);
        addToast('Team member updated successfully', 'success');
      } else {
        await adminService.createTeamMember(formData);
        addToast('Team member created successfully', 'success');
      }
      setModalOpen(false);
      fetchTeam();
    } catch (err) {
      addToast(err.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteTeamMember(selectedMember.id);
      addToast('Team member removed successfully', 'success');
      setDeleteDialogOpen(false);
      fetchTeam();
    } catch (err) {
      addToast('Failed to delete team member', 'error');
    }
  };

  const columns = [
    {
      header: 'Officer / Leadership',
      accessor: 'name',
      render: (item) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-navy-950 border border-slate-800 flex-shrink-0 overflow-hidden flex items-center justify-center">
            {item.photoUrl ? (
              <img src={item.photoUrl} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <Shield className="w-5 h-5 text-gold-400" />
            )}
          </div>
          <div>
            <div className="font-semibold text-white">{item.name}</div>
            <div className="text-xs text-gold-400 font-medium">{item.designation}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Experience',
      accessor: 'experienceYears',
      render: (item) => <span className="text-sm font-medium text-slate-300">{item.experienceYears} Years</span>
    },
    {
      header: 'Certifications',
      accessor: 'certifications',
      render: (item) => <span className="text-xs text-slate-400 truncate max-w-xs block">{item.certifications || 'N/A'}</span>
    },
    {
      header: 'Order',
      accessor: 'displayOrder',
      render: (item) => <span className="text-sm text-slate-400">{item.displayOrder}</span>
    },
    {
      header: 'Status',
      accessor: 'active',
      render: (item) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${item.active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'}`}>
          {item.active ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      header: 'Actions',
      render: (item) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleOpenEdit(item)}
            className="p-1.5 text-slate-400 hover:text-gold-400 hover:bg-navy-800 rounded transition"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setSelectedMember(item); setDeleteDialogOpen(true); }}
            className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded transition"
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
          <h1 className="text-2xl font-black text-white tracking-tight">Security Personnel & Leadership</h1>
          <p className="text-slate-400 text-xs mt-1">Manage command team, senior operatives, and department heads.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={handleOpenAdd}>
          Add Team Member
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={teamMembers}
        searchPlaceholder="Search personnel by name or role..."
        searchKey="name"
        loading={loading}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? 'Edit Personnel Profile' : 'Add Personnel Profile'}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Full Name *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Col. Richard Vance"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Rank / Designation *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                placeholder="e.g. VP of Tactical Operations"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Years of Experience</label>
              <input
                type="number"
                className="input-field"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Contact Email</label>
              <input
                type="email"
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="officer@domain.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Display Order</label>
              <input
                type="number"
                className="input-field"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Certifications (comma-separated)</label>
            <input
              type="text"
              className="input-field"
              value={formData.certifications}
              onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
              placeholder="CPP, PSP, Ex-Special Forces, PCI-DSS Lead"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Bio / Profile Overview</label>
            <textarea
              rows={3}
              className="input-field"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Brief professional career and military or civilian law enforcement credentials..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Officer Photo</label>
            <FileUploader
              value={formData.photoUrl}
              onChange={(url) => setFormData({ ...formData, photoUrl: url })}
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="activeCheckbox"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="rounded border-slate-700 bg-navy-950 text-gold-500 focus:ring-gold-500/40 h-4 w-4"
            />
            <label htmlFor="activeCheckbox" className="text-sm font-medium text-slate-300 cursor-pointer">
              Active Duty / Display on Public Team Page
            </label>
          </div>

          <div className="sticky bottom-0 -mx-6 -mb-6 p-4 bg-navy-950/95 backdrop-blur-md border-t border-slate-800 flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Add Personnel'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Remove Team Member"
        message={`Are you sure you want to remove "${selectedMember?.name}"?`}
        confirmText="Remove Member"
      />
    </div>
  );
};

export default AdminTeamPage;
