'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Button from '../../components/common/Button';
import { CustomSelect } from '../../components/common/CustomSelect';
import { MOCK_FAQS } from '../../utils/mockData';
import { Plus, Edit, Trash2, HelpCircle } from 'lucide-react';

const AdminFaqsPage = () => {
  const { addToast } = useToast();
  const [faqs, setFaqs] = useState(MOCK_FAQS);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    question: '',
    answer: '',
    category: 'General Security',
    displayOrder: 0,
    active: true
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchFaqs = async () => {
    try {
      const res = await adminService.getFaqs();
      const list = Array.isArray(res) ? res : res?.data?.data || res?.data || [];
      if (list && list.length > 0) setFaqs(list);
    } catch (err) {
      // keep fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (faq) => {
    setIsEditing(true);
    setSelectedFaq(faq);
    setFormData({
      question: faq.question || '',
      answer: faq.answer || '',
      category: faq.category || 'General Security',
      displayOrder: faq.displayOrder || 0,
      active: faq.active !== undefined ? faq.active : true
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await adminService.updateFaq(selectedFaq.id, formData);
        setFaqs(prev => prev.map(f => f.id === selectedFaq.id ? { ...f, ...formData } : f));
        addToast('FAQ updated successfully', 'success');
      } else {
        const created = await adminService.createFaq(formData);
        setFaqs(prev => [created || { id: Date.now(), ...formData }, ...prev]);
        addToast('FAQ created successfully', 'success');
      }
      setModalOpen(false);
    } catch (err) {
      addToast(err.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteFaq(selectedFaq.id);
      setFaqs(prev => prev.filter(f => f.id !== selectedFaq.id));
      addToast('FAQ deleted successfully', 'success');
      setDeleteDialogOpen(false);
    } catch (err) {
      addToast('Failed to delete FAQ', 'error');
    }
  };

  const columns = [
    {
      header: 'Question',
      accessor: 'question',
      render: (item) => (
        <div className="flex items-start space-x-2.5">
          <HelpCircle className="w-4 h-4 text-gold-400 mt-1 flex-shrink-0" />
          <div className="font-semibold text-white">{item.question}</div>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (item) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gold-500/10 text-gold-400 border border-gold-500/20">
          {item.category}
        </span>
      )
    },
    {
      header: 'Order',
      accessor: 'displayOrder',
      render: (item) => <span className="text-sm font-mono text-slate-300">{item.displayOrder}</span>
    },
    {
      header: 'Status',
      accessor: 'active',
      render: (item) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${item.active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'}`}>
          {item.active ? 'Active' : 'Hidden'}
        </span>
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
            onClick={() => { setSelectedFaq(item); setDeleteDialogOpen(true); }}
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
          <h1 className="text-2xl font-black text-white tracking-tight">Frequently Asked Questions (FAQs)</h1>
          <p className="text-xs text-slate-400 mt-1">Help prospective clients find answers on guard vetting, contracts, and technology.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={handleOpenAdd} className="shadow-gold-glow">
          Add FAQ
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={faqs}
        searchPlaceholder="Search questions..."
        searchKey="question"
        loading={loading}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? 'Edit FAQ Item' : 'Add New FAQ Item'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Question *</label>
            <input
              type="text"
              required
              className="input-field"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="e.g. How quickly can you deploy armed security guards to a facility?"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Category</label>
              <CustomSelect
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="General Security">General Security</option>
                <option value="Personnel & Vetting">Personnel & Vetting</option>
                <option value="Emergency Response">Emergency Response</option>
                <option value="Contracts & Billing">Contracts & Billing</option>
                <option value="Technology & Systems">Technology & Systems</option>
              </CustomSelect>
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
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Answer *</label>
            <textarea
              required
              rows={5}
              className="input-field"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              placeholder="Provide a comprehensive and reassuring answer..."
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="activeFaq"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="rounded border-slate-700 bg-navy-950 text-gold-500 focus:ring-gold-500/40 h-4 w-4"
            />
            <label htmlFor="activeFaq" className="text-xs font-semibold text-slate-300 cursor-pointer">
              Active / Visible on public FAQ page
            </label>
          </div>

          <div className="sticky bottom-0 bg-navy-900/95 backdrop-blur-md flex justify-end space-x-3 pt-4 border-t border-slate-800 shrink-0">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Create FAQ'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete FAQ"
        message={`Are you sure you want to delete this FAQ?`}
        confirmText="Delete FAQ"
      />
    </div>
  );
};

export default AdminFaqsPage;
