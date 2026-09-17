'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { DataTable } from '../../components/admin/DataTable';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Button } from '../../components/common/Button';
import { FileUploader } from '../../components/common/FileUploader';
import { useToast } from '../../context/ToastContext';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const AdminIndustriesPage = () => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInd, setEditingInd] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    imageUrl: '',
    keySecurityNeedsJson: '["Threat 1", "Threat 2"]',
    solutionsJson: '["Solution 1", "Solution 2"]',
    isActive: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  const fetchIndustries = async () => {
    setLoading(true);
    try {
      const data = await adminService.getIndustries();
      setIndustries(data || []);
    } catch (e) {
      toast.error('Failed to load industries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  const openCreate = () => {
    setEditingInd(null);
    setFormData({
      name: '',
      shortDescription: '',
      description: '',
      imageUrl: '',
      keySecurityNeedsJson: '["Threat 1", "Threat 2"]',
      solutionsJson: '["Solution 1", "Solution 2"]',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEdit = (ind) => {
    setEditingInd(ind);
    setFormData({
      name: ind.name,
      shortDescription: ind.shortDescription || '',
      description: ind.description || '',
      imageUrl: ind.imageUrl || '',
      keySecurityNeedsJson: ind.keySecurityNeedsJson || '[]',
      solutionsJson: ind.solutionsJson || '[]',
      isActive: ind.isActive !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingInd) {
        await adminService.updateIndustry(editingInd.id, formData);
        toast.success('Industry updated');
      } else {
        await adminService.createIndustry(formData);
        toast.success('Industry created');
      }
      setIsModalOpen(false);
      fetchIndustries();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save industry');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await adminService.deleteIndustry(deleteTarget.id);
      toast.success('Industry deleted');
      setDeleteTarget(null);
      fetchIndustries();
    } catch (e) {
      toast.error('Failed to delete industry');
    }
  };

  const columns = [
    {
      header: 'Industry Name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.imageUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80'} alt={row.name} className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0" />
          <span className="font-bold text-white">{row.name}</span>
        </div>
      ),
    },
    { header: 'Slug', accessor: 'slug', className: 'font-mono text-xs text-slate-400' },
    { header: 'Summary', accessor: 'shortDescription', className: 'text-xs text-slate-300 max-w-xs truncate' },
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
          <h1 className="text-2xl font-black text-white tracking-tight">Industries Management</h1>
          <p className="text-xs text-slate-400 mt-1">Configure industry sector specifications and vulnerability profiles.</p>
        </div>
        <Button variant="primary" size="md" icon={Plus} onClick={openCreate}>
          Add Industry
        </Button>
      </div>

      <DataTable columns={columns} data={industries} loading={loading} searchKey="name" />

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingInd ? 'Edit Industry' : 'Create Industry'} maxWidth="max-w-2xl">
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Industry Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Short Summary</label>
              <textarea rows={2} value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Full Description</label>
              <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500" />
            </div>

            <FileUploader
              label="Industry Photo"
              currentUrl={formData.imageUrl}
              onUploadSuccess={(url) => setFormData({ ...formData, imageUrl: url })}
            />

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" loading={isSaving}>Save Industry</Button>
            </div>
          </form>
        </Modal>
      )}

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Industry" message={`Delete '${deleteTarget?.name}'?`} />
    </div>
  );
};
