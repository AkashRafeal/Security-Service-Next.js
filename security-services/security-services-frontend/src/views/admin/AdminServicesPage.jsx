'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { DataTable } from '../../components/admin/DataTable';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Button } from '../../components/common/Button';
import { CustomSelect } from '../../components/common/CustomSelect';
import { FileUploader } from '../../components/common/FileUploader';
import { useToast } from '../../context/ToastContext';
import { Plus, Edit, Trash2, CheckCircle2, XCircle, Shield } from 'lucide-react';

export const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  const jsonToText = (val) => {
    if (!val) return '';
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed.join('\n');
    } catch (e) {}
    return val;
  };

  const textToJson = (text) => {
    if (!text || !text.trim()) return '[]';
    const lines = text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    return JSON.stringify(lines);
  };

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    shortDescription: '',
    description: '',
    imageUrl: '',
    featuresText: '24/7 Guard Coverage\nGPS Checkpoint Logging',
    benefitsText: 'Total visible deterrence\nFast emergency escalation',
    targetIndustries: 'Corporate, Retail, Residential',
    isFeatured: false,
    isActive: true,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [svcData, catData] = await Promise.all([
        adminService.getServices(),
        adminService.getCategories(),
      ]);
      setServices(svcData || []);
      setCategories(catData || []);
    } catch (e) {
      toast.error('Failed to load services data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      name: '',
      categoryId: categories[0]?.id || '',
      shortDescription: '',
      description: '',
      imageUrl: '',
      featuresText: '24/7 Guard Coverage\nGPS Checkpoint Logging',
      benefitsText: 'Total visible deterrence\nFast emergency escalation',
      targetIndustries: 'Corporate, Retail, Residential',
      isFeatured: false,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name || '',
      categoryId: service.categoryId || '',
      shortDescription: service.shortDescription || '',
      description: service.description || '',
      imageUrl: service.imageUrl || '',
      featuresText: jsonToText(service.featuresJson),
      benefitsText: jsonToText(service.benefitsJson),
      targetIndustries: service.targetIndustries || '',
      isFeatured: !!service.isFeatured,
      isActive: service.isActive !== false,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        featuresJson: textToJson(formData.featuresText),
        benefitsJson: textToJson(formData.benefitsText),
      };
      delete payload.featuresText;
      delete payload.benefitsText;

      if (editingService) {
        await adminService.updateService(editingService.id, payload);
        toast.success('Service updated successfully');
      } else {
        await adminService.createService(payload);
        toast.success('Service created successfully');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save service');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (service) => {
    try {
      await adminService.toggleServiceStatus(service.id);
      toast.success(`Service status toggled`);
      fetchData();
    } catch (e) {
      toast.error('Failed to toggle status');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await adminService.deleteService(deleteTarget.id);
      toast.success('Service deleted');
      setDeleteTarget(null);
      fetchData();
    } catch (e) {
      toast.error('Failed to delete service');
    }
  };

  const columns = [
    {
      header: 'Service Name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.imageUrl || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=150&q=80'}
            alt={row.name}
            className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
          />
          <div>
            <span className="font-bold text-white block">{row.name}</span>
            <span className="text-[11px] text-slate-400 block">{row.categoryName || 'Unassigned'}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Slug',
      accessor: 'slug',
      className: 'font-mono text-xs text-slate-400',
    },
    {
      header: 'Featured',
      render: (row) => (
        <span className={`text-xs font-semibold ${row.isFeatured ? 'text-gold-400' : 'text-slate-500'}`}>
          {row.isFeatured ? 'Yes (Featured)' : 'No'}
        </span>
      ),
    },
    {
      header: 'Status',
      render: (row) => (
        <button
          onClick={() => handleToggleStatus(row)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition-colors ${
            row.isActive
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20'
          }`}
        >
          {row.isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
          <span>{row.isActive ? 'ACTIVE' : 'INACTIVE'}</span>
        </button>
      ),
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => openEditModal(row)}
            className="p-1.5 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-slate-300 transition-colors border border-slate-700"
            title="Edit Service"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteTarget(row)}
            className="p-1.5 rounded-lg bg-navy-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors border border-slate-700"
            title="Delete Service"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Services Management</h1>
          <p className="text-xs text-slate-400 mt-1">Add, edit, feature, and toggle public security capabilities in catalog.</p>
        </div>
        <Button variant="primary" size="md" icon={Plus} onClick={openCreateModal}>
          Add New Service
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={services}
        loading={loading}
        searchKey="name"
        searchPlaceholder="Search services by title..."
      />

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingService ? `Edit Service: ${editingService.name}` : 'Create Security Service'}
          maxWidth="max-w-3xl"
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Service Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. VIP Protection"
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Service Category
                </label>
                <CustomSelect
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </CustomSelect>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Short Description (Card Teaser)
              </label>
              <textarea
                rows={2}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="A concise summary of duties and perimeter roles..."
                className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Operational Description
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="In-depth details of tactical protocols, guard certifications, emergency escalation..."
                className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-500"
              />
            </div>

            {/* Image upload */}
            <FileUploader
              label="Service Hero Photo"
              currentUrl={formData.imageUrl}
              onUploadSuccess={(url) => setFormData({ ...formData, imageUrl: url })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Features (One per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  placeholder={'24/7 Guard Coverage\nGPS Checkpoint Logging\nRapid Response'}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-gold-500"
                />
                <p className="text-[10px] text-slate-400 mt-1">Enter each feature on a new line</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Benefits (One per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.benefitsText}
                  onChange={(e) => setFormData({ ...formData, benefitsText: e.target.value })}
                  placeholder={'Total visible deterrence\nFast emergency escalation\nComplete peace of mind'}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-gold-500"
                />
                <p className="text-[10px] text-slate-400 mt-1">Enter each benefit on a new line</p>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded text-gold-500 focus:ring-gold-400"
                />
                <span>Feature on Homepage</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded text-gold-500 focus:ring-gold-400"
                />
                <span>Active Status</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" loading={isSaving}>Save Service</Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Security Service"
        message={`Are you sure you want to permanently delete '${deleteTarget?.name}'?`}
      />
    </div>
  );
};
