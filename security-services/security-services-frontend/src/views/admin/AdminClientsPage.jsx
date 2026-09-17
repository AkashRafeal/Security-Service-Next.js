'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { DataTable } from '../../components/admin/DataTable';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { MOCK_CLIENTS } from '../../utils/mockData';
import { Plus, Edit, Trash2, Building } from 'lucide-react';

export const AdminClientsPage = () => {
  const [clients, setClients] = useState(MOCK_CLIENTS);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Corporate IT',
    logoUrl: '',
    websiteUrl: '',
    isFeatured: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  const fetchClients = async () => {
    try {
      const data = await adminService.getClients();
      if (data && data.length > 0) setClients(data);
    } catch (e) {
      // keep fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const openCreate = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      category: 'Corporate IT',
      logoUrl: '',
      websiteUrl: '',
      isFeatured: true,
    });
    setIsModalOpen(true);
  };

  const openEdit = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      category: client.category || 'Corporate IT',
      logoUrl: client.logoUrl || '',
      websiteUrl: client.websiteUrl || '',
      isFeatured: !!client.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingClient) {
        await adminService.updateClient(editingClient.id, formData);
        setClients(prev => prev.map(c => c.id === editingClient.id ? { ...c, ...formData } : c));
        toast.success('Client updated');
      } else {
        const created = await adminService.createClient(formData);
        setClients(prev => [created || { id: Date.now(), ...formData }, ...prev]);
        toast.success('Client added');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save client');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await adminService.deleteClient(deleteTarget.id);
      setClients(prev => prev.filter(c => c.id !== deleteTarget.id));
      toast.success('Client removed');
      setDeleteTarget(null);
    } catch (e) {
      toast.error('Failed to delete client');
    }
  };

  const columns = [
    { header: 'Client Partner', accessor: 'name', className: 'font-bold text-white' },
    { header: 'Industry Category', accessor: 'category', className: 'text-xs text-gold-400 font-medium' },
    {
      header: 'Actions',
      className: 'text-right',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-slate-300 border border-slate-700">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => setDeleteTarget(row)} className="p-1.5 rounded-lg bg-navy-800 hover:bg-rose-600 text-slate-300 hover:text-white border border-slate-700">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Client Partners</h1>
          <p className="text-xs text-slate-400 mt-1">Manage featured corporate and government client logos.</p>
        </div>
        <Button variant="primary" size="md" icon={Plus} onClick={openCreate}>
          Add Client
        </Button>
      </div>

      <DataTable columns={columns} data={clients} loading={loading} searchKey="name" />

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingClient ? 'Edit Client' : 'Add Client Partner'}>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Client Organization Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Sector / Category</label>
              <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Website URL</label>
              <input type="url" value={formData.websiteUrl} onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })} placeholder="https://example.com" className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500" />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" loading={isSaving}>Save Client</Button>
            </div>
          </form>
        </Modal>
      )}

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Client" message={`Delete client '${deleteTarget?.name}'?`} />
    </div>
  );
};
