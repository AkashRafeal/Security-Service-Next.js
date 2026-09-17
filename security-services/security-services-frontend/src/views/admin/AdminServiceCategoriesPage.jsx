'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { MOCK_SERVICE_CATEGORIES } from '../../utils/mockData';
import { DataTable } from '../../components/admin/DataTable';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const AdminServiceCategoriesPage = () => {
  const [categories, setCategories] = useState(MOCK_SERVICE_CATEGORIES);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Shield');
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  const fetchCats = async () => {
    try {
      const data = await adminService.getCategories();
      if (data && data.length > 0) setCategories(data);
    } catch (e) {
      // Keep fallback categories without noisy toast
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const openCreate = () => {
    setEditingCat(null);
    setName('');
    setDescription('');
    setIcon('Shield');
    setIsModalOpen(true);
  };

  const openEdit = (cat) => {
    setEditingCat(cat);
    setName(cat.name);
    setDescription(cat.description || '');
    setIcon(cat.icon || 'Shield');
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingCat) {
        await adminService.updateCategory(editingCat.id, { name, description, icon });
        toast.success('Category updated');
      } else {
        await adminService.createCategory({ name, description, icon });
        toast.success('Category created');
      }
      setIsModalOpen(false);
      fetchCats();
    } catch (err) {
      toast.error('Failed to save category');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await adminService.deleteCategory(deleteTarget.id);
      toast.success('Category deleted');
      setDeleteTarget(null);
      fetchCats();
    } catch (e) {
      toast.error('Failed to delete category');
    }
  };

  const columns = [
    { header: 'Category Name', accessor: 'name', className: 'font-bold text-white' },
    { header: 'Slug', accessor: 'slug', className: 'font-mono text-xs text-slate-400' },
    { header: 'Description', accessor: 'description', className: 'text-xs text-slate-300' },
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
          <h1 className="text-2xl font-black text-white tracking-tight">Service Categories</h1>
          <p className="text-xs text-slate-400 mt-1">Manage departmental groupings for services.</p>
        </div>
        <Button variant="primary" size="md" icon={Plus} onClick={openCreate}>
          Add Category
        </Button>
      </div>

      <DataTable columns={columns} data={categories} loading={loading} searchKey="name" />

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCat ? 'Edit Category' : 'Create Category'}>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Category Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Description</label>
              <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500" />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" loading={isSaving}>Save Category</Button>
            </div>
          </form>
        </Modal>
      )}

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Category" message={`Delete category '${deleteTarget?.name}'?`} />
    </div>
  );
};
