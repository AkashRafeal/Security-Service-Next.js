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
import { Plus, Edit, Trash2, Star, CheckCircle, XCircle } from 'lucide-react';

const AdminTestimonialsPage = () => {
  const { addToast } = useToast();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    clientName: '',
    designation: '',
    company: '',
    rating: 5,
    testimonialText: '',
    clientAvatar: '',
    approved: true,
    featured: false
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await adminService.getTestimonials();
      setTestimonials(Array.isArray(res) ? res : res?.data?.data || res?.data || []);
    } catch (err) {
      addToast('Failed to load testimonials', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (test) => {
    setIsEditing(true);
    setSelectedTestimonial(test);
    setFormData({
      clientName: test.clientName || '',
      designation: test.designation || '',
      company: test.company || '',
      rating: test.rating || 5,
      testimonialText: test.testimonialText || '',
      clientAvatar: test.clientAvatar || '',
      approved: test.approved !== undefined ? test.approved : true,
      featured: test.featured !== undefined ? test.featured : false
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await adminService.updateTestimonial(selectedTestimonial.id, formData);
        addToast('Testimonial updated successfully', 'success');
      } else {
        await adminService.createTestimonial(formData);
        addToast('Testimonial created successfully', 'success');
      }
      setModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      addToast(err.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteTestimonial(selectedTestimonial.id);
      addToast('Testimonial deleted successfully', 'success');
      setDeleteDialogOpen(false);
      fetchTestimonials();
    } catch (err) {
      addToast('Failed to delete testimonial', 'error');
    }
  };

  const columns = [
    {
      header: 'Client / Representative',
      accessor: 'clientName',
      render: (item) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-navy-800 border border-slate-700 flex-shrink-0 overflow-hidden flex items-center justify-center font-bold text-gold-400">
            {item.clientAvatar ? (
              <img src={item.clientAvatar} alt={item.clientName} className="w-full h-full object-cover" />
            ) : (
              item.clientName?.charAt(0) || 'C'
            )}
          </div>
          <div>
            <div className="font-semibold text-white">{item.clientName}</div>
            <div className="text-xs text-slate-400">{item.designation} • {item.company}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Rating',
      accessor: 'rating',
      render: (item) => (
        <div className="flex items-center space-x-1">
          {[...Array(item.rating || 5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
          ))}
          <span className="text-xs text-slate-400 ml-1">({item.rating}/5)</span>
        </div>
      )
    },
    {
      header: 'Review Excerpt',
      accessor: 'testimonialText',
      render: (item) => (
        <p className="text-xs text-slate-300 line-clamp-2 max-w-md italic">
          "{item.testimonialText}"
        </p>
      )
    },
    {
      header: 'Status',
      accessor: 'approved',
      render: (item) => (
        <div className="flex items-center space-x-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${item.approved ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
            {item.approved ? 'Approved' : 'Pending Review'}
          </span>
          {item.featured && (
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gold-500/10 text-gold-400 border border-gold-500/30">
              Featured
            </span>
          )}
        </div>
      )
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
            onClick={() => { setSelectedTestimonial(item); setDeleteDialogOpen(true); }}
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
          <h1 className="text-2xl font-black text-white tracking-tight">Client Testimonials & Endorsements</h1>
          <p className="text-xs text-slate-400 mt-1">Review, approve, and curate client feedback for social proof.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={handleOpenAdd} className="shadow-gold-glow">
          Add Testimonial
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={testimonials}
        searchPlaceholder="Search reviews by client or company..."
        searchKey="clientName"
        loading={loading}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? 'Edit Testimonial' : 'Add Testimonial'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Client Contact Name *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="e.g. Rachel Sterling"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Company / Organization *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Apex Logistics"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Job Title / Designation</label>
              <input
                type="text"
                className="input-field"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                placeholder="e.g. Chief Security Officer"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Rating (1 to 5 Stars)</label>
              <CustomSelect
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
              >
                <option value={5}>5 Stars - Outstanding</option>
                <option value={4}>4 Stars - Very Good</option>
                <option value={3}>3 Stars - Good</option>
                <option value={2}>2 Stars - Fair</option>
                <option value={1}>1 Star - Poor</option>
              </CustomSelect>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Testimonial Content *</label>
            <textarea
              required
              rows={4}
              className="input-field"
              value={formData.testimonialText}
              onChange={(e) => setFormData({ ...formData, testimonialText: e.target.value })}
              placeholder="What the client had to say about our vigilance, response speed, or guard reliability..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Client Avatar / Photo</label>
            <FileUploader
              value={formData.clientAvatar}
              onChange={(url) => setFormData({ ...formData, clientAvatar: url })}
            />
          </div>

          <div className="flex items-center space-x-6 pt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.approved}
                onChange={(e) => setFormData({ ...formData, approved: e.target.checked })}
                className="rounded border-slate-700 bg-navy-950 text-gold-500 focus:ring-gold-500/40 h-4 w-4"
              />
              <span className="text-xs font-semibold text-slate-300">Approved for Public Display</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded border-slate-700 bg-navy-950 text-gold-500 focus:ring-gold-500/40 h-4 w-4"
              />
              <span className="text-xs font-semibold text-slate-300">Featured on Homepage</span>
            </label>
          </div>

          <div className="sticky bottom-0 bg-navy-900/95 backdrop-blur-md flex justify-end space-x-3 pt-4 border-t border-slate-800 shrink-0">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Publish Testimonial'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from "${selectedTestimonial?.clientName}"?`}
        confirmText="Delete Testimonial"
      />
    </div>
  );
};

export default AdminTestimonialsPage;
