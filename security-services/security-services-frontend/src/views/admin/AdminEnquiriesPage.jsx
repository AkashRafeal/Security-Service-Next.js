'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Button } from '../../components/common/Button';
import { CustomSelect } from '../../components/common/CustomSelect';
import { useToast } from '../../context/ToastContext';
import { MOCK_ADMIN_ENQUIRIES } from '../../utils/mockData';
import { Edit, Trash2, Mail, Phone, Calendar } from 'lucide-react';

export const AdminEnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState(MOCK_ADMIN_ENQUIRIES);
  const [loading, setLoading] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [editStatus, setEditStatus] = useState('NEW');
  const [editNotes, setEditNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const toast = useToast();

  const fetchEnquiries = async () => {
    try {
      const data = await adminService.getEnquiries();
      if (data && data.length > 0) setEnquiries(data);
    } catch (e) {
      // Keep fallback enquiries
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const openEditModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setEditStatus(enquiry.status || 'NEW');
    setEditNotes(enquiry.internalNotes || '');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    setIsUpdating(true);
    try {
      await adminService.updateEnquiryStatus(selectedEnquiry.id, {
        status: editStatus,
        internalNotes: editNotes,
      });
      toast.success('Enquiry updated successfully');
      setSelectedEnquiry(null);
      fetchEnquiries();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update enquiry');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await adminService.deleteEnquiry(deleteTarget.id);
      toast.success('Enquiry record deleted');
      setDeleteTarget(null);
      fetchEnquiries();
    } catch (err) {
      toast.error('Failed to delete enquiry');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = [
    {
      header: 'Sender',
      render: (row) => (
        <div>
          <span className="font-bold text-white block">{row.name}</span>
          <span className="text-xs text-slate-400 block">{row.email}</span>
        </div>
      ),
    },
    {
      header: 'Phone',
      accessor: 'phone',
      className: 'text-xs text-slate-300',
    },
    {
      header: 'Subject & Message',
      render: (row) => (
        <div className="max-w-md">
          <span className="font-semibold text-gold-400 block truncate">{row.subject || 'General Enquiry'}</span>
          <span className="text-xs text-slate-400 line-clamp-1">{row.message}</span>
        </div>
      ),
    },
    {
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Received',
      render: (row) => (
        <span className="text-xs text-slate-400">
          {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'Recent'}
        </span>
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
            title="Edit Enquiry"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteTarget(row)}
            className="p-1.5 rounded-lg bg-navy-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors border border-slate-700"
            title="Delete Record"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Contact Enquiries</h1>
        <p className="text-xs text-slate-400 mt-1">General inquiries and consultation requests submitted through the public website.</p>
      </div>

      <DataTable
        columns={columns}
        data={enquiries}
        loading={loading}
        searchKey="name"
        searchPlaceholder="Search by sender or email..."
      />

      {/* Edit Modal */}
      {selectedEnquiry && (
        <Modal
          isOpen={!!selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          title={`Enquiry from: ${selectedEnquiry.name}`}
        >
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-2 text-xs">
              <p><span className="text-slate-400">Email: </span><span className="text-white font-medium">{selectedEnquiry.email}</span></p>
              <p><span className="text-slate-400">Phone: </span><span className="text-white font-medium">{selectedEnquiry.phone || 'N/A'}</span></p>
              <p><span className="text-slate-400">Subject: </span><span className="text-gold-400 font-semibold">{selectedEnquiry.subject}</span></p>
              <div className="pt-2 border-t border-slate-800 text-slate-200 leading-relaxed whitespace-pre-line">
                {selectedEnquiry.message}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Resolution Status
              </label>
              <CustomSelect
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
              >
                <option value="NEW">New Enquiry</option>
                <option value="CONTACTED">Contacted Client</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </CustomSelect>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Internal Follow-Up Notes
              </label>
              <textarea
                rows={3}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Log customer contact notes or response status..."
                className="w-full bg-navy-950 text-white border border-slate-700/80 hover:border-slate-600 focus:border-gold-500 rounded-xl px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold-500/40 placeholder:text-slate-500"
              />
            </div>

            <div className="sticky bottom-0 bg-navy-900/95 backdrop-blur-md flex justify-end gap-3 pt-3 pb-1 border-t border-slate-800 shrink-0">
              <Button variant="ghost" onClick={() => setSelectedEnquiry(null)}>Cancel</Button>
              <Button type="submit" variant="primary" loading={isUpdating}>Save Status</Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Contact Enquiry"
        message={`Are you sure you want to delete the enquiry from ${deleteTarget?.name}?`}
        loading={isDeleting}
      />
    </div>
  );
};
