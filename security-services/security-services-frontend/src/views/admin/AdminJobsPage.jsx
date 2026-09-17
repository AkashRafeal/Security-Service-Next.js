'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Button from '../../components/common/Button';
import { CustomSelect } from '../../components/common/CustomSelect';
import { Plus, Edit, Trash2, Briefcase, MapPin, IndianRupee } from 'lucide-react';

const AdminJobsPage = () => {
  const { addToast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    title: '',
    department: 'Armed Patrol Division',
    jobType: 'Full-Time',
    location: '',
    experienceLevel: 'Entry-Level',
    salaryRange: '₹4,50,000 - ₹6,50,000 / yr',
    description: '',
    requirements: '',
    benefits: '',
    active: true
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await adminService.getJobs();
      setJobs(Array.isArray(res) ? res : res?.data?.data || res?.data || []);
    } catch (err) {
      addToast('Failed to load career listings', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setIsEditing(true);
    setSelectedJob(job);
    setFormData({
      title: job.title || '',
      department: job.department || '',
      jobType: job.jobType || 'Full-Time',
      location: job.location || '',
      experienceLevel: job.experienceLevel || '',
      salaryRange: job.salaryRange ? job.salaryRange.replace(/\$/g, '₹') : '',
      description: job.description || '',
      requirements: job.requirements || '',
      benefits: job.benefits || '',
      active: job.status ? job.status === 'ACTIVE' : (job.active !== undefined ? job.active : true)
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        salaryRange: formData.salaryRange ? formData.salaryRange.replace(/\$/g, '₹') : '',
        status: formData.active ? 'ACTIVE' : 'CLOSED',
      };
      if (isEditing) {
        await adminService.updateJob(selectedJob.id, payload);
        addToast('Job posting updated successfully', 'success');
      } else {
        await adminService.createJob(payload);
        addToast('Job posting published successfully', 'success');
      }
      setModalOpen(false);
      fetchJobs();
    } catch (err) {
      addToast(err.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteJob(selectedJob.id);
      addToast('Job opening removed successfully', 'success');
      setDeleteDialogOpen(false);
      fetchJobs();
    } catch (err) {
      addToast('Failed to delete job posting', 'error');
    }
  };

  const handleToggleStatus = async (job) => {
    try {
      await adminService.toggleJobStatus(job.id);
      const wasActive = job.status ? job.status === 'ACTIVE' : Boolean(job.active);
      const nextState = wasActive ? 'Closed' : 'Accepting Applications';
      addToast(`Job opening is now ${nextState}`, 'success');
      fetchJobs();
    } catch (err) {
      addToast('Failed to toggle job status', 'error');
    }
  };

  const columns = [
    {
      header: 'Position Title',
      accessor: 'title',
      render: (item) => (
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-navy-800 border border-slate-700 flex items-center justify-center text-gold-400">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-white">{item.title}</div>
            <div className="text-xs text-slate-400">{item.department} • {item.jobType}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Location',
      accessor: 'location',
      render: (item) => (
        <div className="flex items-center text-sm text-slate-300 space-x-1.5">
          <MapPin className="w-3.5 h-3.5 text-gold-400/80" />
          <span>{item.location || 'HQ / On-Site'}</span>
        </div>
      )
    },
    {
      header: 'Compensation',
      accessor: 'salaryRange',
      render: (item) => <span className="text-sm font-semibold text-emerald-400">{(item.salaryRange || 'Competitive').replace(/\$/g, '₹')}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (item) => {
        const isActive = item.status ? item.status === 'ACTIVE' : Boolean(item.active);
        return (
          <button
            type="button"
            onClick={() => handleToggleStatus(item)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer shadow-sm ${
              isActive
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/60'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20 hover:border-rose-500/60'
            }`}
            title={`Click to switch status to ${isActive ? 'Closed' : 'Accepting Applications'}`}
          >
            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
            <span>{isActive ? 'Accepting Applications' : 'Closed'}</span>
          </button>
        );
      }
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (item) => (
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => handleOpenEdit(item)}
            className="p-1.5 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-slate-300 border border-slate-700 transition"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setSelectedJob(item); setDeleteDialogOpen(true); }}
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
          <h1 className="text-2xl font-black text-white tracking-tight">Career Postings & Job Openings</h1>
          <p className="text-xs text-slate-400 mt-1">Post new security roles, manage requirements, and recruit personnel.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={handleOpenAdd} className="shadow-gold-glow">
          Post New Job
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={jobs}
        searchPlaceholder="Search jobs by title or department..."
        searchKey="title"
        loading={loading}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? 'Edit Job Posting' : 'Post New Job Opening'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Position Title *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Armed Patrol Officer"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Department *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="e.g. Tactical Response"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Location *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. New York, NY"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Employment Type</label>
              <CustomSelect
                value={formData.jobType}
                onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Shift Rotation">Shift Rotation</option>
              </CustomSelect>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Salary / Rate Range</label>
              <input
                type="text"
                className="input-field"
                value={formData.salaryRange}
                onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                placeholder="e.g. ₹35,000 - ₹45,000/mo"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Position Overview & Scope *</label>
            <textarea
              required
              rows={3}
              className="input-field"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Summary of day-to-day operations, shift duties, client site details..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Qualifications & Requirements *</label>
            <textarea
              required
              rows={3}
              className="input-field"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="Security Guard License, Clean criminal record, Firearm permit, Physical fitness..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Benefits & Equipment Provided</label>
            <textarea
              rows={2}
              className="input-field"
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              placeholder="Full medical/dental, 401(k) matching, Uniform & duty gear provided, Overtime pay..."
            />
          </div>

          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Job Availability / Status
            </label>
            <CustomSelect
              value={formData.active ? 'ACTIVE' : 'CLOSED'}
              onChange={(e) => setFormData({ ...formData, active: e.target.value === 'ACTIVE' })}
            >
              <option value="ACTIVE">🟢 Accepting Applications (Active & Visible)</option>
              <option value="CLOSED">🔴 Closed (Paused / Filled)</option>
            </CustomSelect>
            <p className="text-[11px] text-slate-400 mt-1">
              {formData.active 
                ? 'This position will appear on the public careers portal and accept applicant resumes.' 
                : 'This position will be hidden from the public career portal.'}
            </p>
          </div>

          <div className="sticky bottom-0 bg-navy-900/95 backdrop-blur-md flex justify-end space-x-3 pt-4 border-t border-slate-800 shrink-0">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Post Job'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Job Opening"
        message={`Are you sure you want to delete the job "${selectedJob?.title}"?`}
        confirmText="Delete Job"
      />
    </div>
  );
};

export default AdminJobsPage;
