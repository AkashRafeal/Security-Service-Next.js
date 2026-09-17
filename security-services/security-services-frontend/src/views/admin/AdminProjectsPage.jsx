'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Button from '../../components/common/Button';
import FileUploader from '../../components/common/FileUploader';
import { CustomSelect } from '../../components/common/CustomSelect';
import { Plus, Edit, Trash2, Eye, Shield } from 'lucide-react';

const AdminProjectsPage = () => {
  const { addToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    title: '',
    clientName: '',
    industryId: '',
    serviceId: '',
    location: '',
    description: '',
    challenge: '',
    solution: '',
    results: '',
    featuredImage: '',
    completionDate: '',
    active: true,
    featured: false
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, servRes, indRes] = await Promise.all([
        adminService.getProjects(),
        adminService.getServices(),
        adminService.getIndustries()
      ]);
      setProjects(projRes.data?.data || projRes.data || []);
      setServices(servRes.data?.data || servRes.data || []);
      setIndustries(indRes.data?.data || indRes.data || []);
    } catch (err) {
      addToast('Failed to load projects and dependencies', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setIsEditing(true);
    setSelectedProject(project);
    setFormData({
      title: project.title || '',
      clientName: project.clientName || '',
      industryId: project.industry?.id || '',
      serviceId: project.service?.id || '',
      location: project.location || '',
      description: project.description || '',
      challenge: project.challenge || '',
      solution: project.solution || '',
      results: project.results || '',
      featuredImage: project.featuredImage || '',
      completionDate: project.completionDate ? project.completionDate.substring(0, 10) : '',
      active: project.active !== undefined ? project.active : true,
      featured: project.featured !== undefined ? project.featured : false
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await adminService.updateProject(selectedProject.id, formData);
        addToast('Project case study updated successfully', 'success');
      } else {
        await adminService.createProject(formData);
        addToast('Project case study created successfully', 'success');
      }
      setModalOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteProject(selectedProject.id);
      addToast('Project deleted successfully', 'success');
      setDeleteDialogOpen(false);
      fetchData();
    } catch (err) {
      addToast('Failed to delete project', 'error');
    }
  };

  const columns = [
    {
      header: 'Project / Case Study',
      accessor: 'title',
      render: (item) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded bg-navy-950 border border-slate-800 flex-shrink-0 overflow-hidden flex items-center justify-center">
            {item.featuredImage ? (
              <img src={item.featuredImage} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <Shield className="w-5 h-5 text-gold-400" />
            )}
          </div>
          <div>
            <div className="font-semibold text-white">{item.title}</div>
            <div className="text-xs text-slate-400">Client: {item.clientName || 'Confidential'}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Service & Industry',
      render: (item) => (
        <div className="text-sm">
          <div className="text-white font-medium">{item.service?.title || 'General'}</div>
          <div className="text-xs text-slate-400">{item.industry?.name || 'General Industry'}</div>
        </div>
      )
    },
    {
      header: 'Location',
      accessor: 'location',
      render: (item) => <span className="text-sm text-slate-300">{item.location || 'N/A'}</span>
    },
    {
      header: 'Status',
      accessor: 'active',
      render: (item) => (
        <div className="flex items-center space-x-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${item.active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'}`}>
            {item.active ? 'Active' : 'Inactive'}
          </span>
          {item.featured && (
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gold-500/20 text-gold-400 border border-gold-500/40">
              Featured
            </span>
          )}
        </div>
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
            onClick={() => { setSelectedProject(item); setDeleteDialogOpen(true); }}
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
          <h1 className="text-2xl font-black text-white tracking-tight">Project Case Studies</h1>
          <p className="text-slate-400 text-xs mt-1">Document successful security operations and implementations.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={handleOpenAdd}>
          Add Project
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={projects}
        searchPlaceholder="Search projects by title or client..."
        searchKey="title"
        loading={loading}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? 'Edit Project Case Study' : 'Add New Project Case Study'}
        size="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Project Title *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Metro Banking Vault Security Overhaul"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Client Name</label>
              <input
                type="text"
                className="input-field"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="e.g. Apex Financial Group"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Service Category</label>
              <CustomSelect
                value={formData.serviceId}
                onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
              >
                <option value="">Select Service</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </CustomSelect>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Target Industry</label>
              <CustomSelect
                value={formData.industryId}
                onChange={(e) => setFormData({ ...formData, industryId: e.target.value })}
              >
                <option value="">Select Industry</option>
                {industries.map((ind) => (
                  <option key={ind.id} value={ind.id}>{ind.name}</option>
                ))}
              </CustomSelect>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Location</label>
              <input
                type="text"
                className="input-field"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, State / Region"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Executive Summary / Overview *</label>
            <textarea
              required
              rows={3}
              className="input-field"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="High level overview of the operational assignment..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">The Challenge</label>
              <textarea
                rows={3}
                className="input-field"
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                placeholder="Threat profile or vulnerability faced..."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">The Solution</label>
              <textarea
                rows={3}
                className="input-field"
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                placeholder="Tactical deployment, hardware, protocols..."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Key Results</label>
              <textarea
                rows={3}
                className="input-field"
                value={formData.results}
                onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                placeholder="Zero incidents, 100% compliance rate..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Featured Image</label>
            <FileUploader
              value={formData.featuredImage}
              onChange={(url) => setFormData({ ...formData, featuredImage: url })}
            />
          </div>

          <div className="flex items-center space-x-6 pt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="rounded border-slate-700 bg-navy-950 text-gold-500 focus:ring-gold-500/40 h-4 w-4"
              />
              <span className="text-sm font-medium text-slate-300">Publish Active</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded border-slate-700 bg-navy-950 text-gold-500 focus:ring-gold-500/40 h-4 w-4"
              />
              <span className="text-sm font-medium text-slate-300">Mark as Featured Showcase</span>
            </label>
          </div>

          <div className="sticky bottom-0 -mx-6 -mb-6 p-4 bg-navy-950/95 backdrop-blur-md border-t border-slate-800 flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Create Project'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Project Case Study"
        message={`Are you sure you want to delete "${selectedProject?.title}"? This cannot be undone.`}
        confirmText="Delete Project"
      />
    </div>
  );
};

export default AdminProjectsPage;
