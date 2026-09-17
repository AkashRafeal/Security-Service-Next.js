'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { CustomSelect } from '../../components/common/CustomSelect';
import { useToast } from '../../context/ToastContext';
import { Eye, Edit, FileSpreadsheet, CheckCircle, Calculator, Building, MapPin, Phone, Mail } from 'lucide-react';

export const AdminQuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editStaff, setEditStaff] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const toast = useToast();

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const data = await adminService.getQuotes();
      setQuotes(data || []);
    } catch (e) {
      toast.error('Failed to load quotes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const openEditModal = (quote) => {
    setSelectedQuote(quote);
    setEditStatus(quote.status || 'NEW');
    setEditNotes(quote.internalNotes || '');
    setEditAmount(quote.quotedAmount ? String(quote.quotedAmount) : '');
    setEditStaff(quote.assignedStaffName || '');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedQuote) return;
    setIsUpdating(true);
    try {
      await adminService.updateQuoteStatus(selectedQuote.id, {
        status: editStatus,
        internalNotes: editNotes,
        quotedAmount: editAmount ? parseFloat(editAmount) : null,
        assignedStaffName: editStaff,
      });
      toast.success(`Quote ${selectedQuote.quoteNumber} updated to ${editStatus}`);
      setSelectedQuote(null);
      fetchQuotes();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update quote');
    } finally {
      setIsUpdating(false);
    }
  };

  const columns = [
    {
      header: 'Quote #',
      accessor: 'quoteNumber',
      className: 'font-mono text-gold-400 font-bold',
    },
    {
      header: 'Client & Company',
      render: (row) => (
        <div>
          <span className="font-bold text-white block">{row.name}</span>
          <span className="text-[11px] text-slate-400 block">{row.company || 'Private Client'}</span>
        </div>
      ),
    },
    {
      header: 'Service Required',
      accessor: 'serviceRequired',
      className: 'font-medium text-slate-200',
    },
    {
      header: 'Location',
      accessor: 'location',
      className: 'text-xs text-slate-400',
    },
    {
      header: 'Guards',
      accessor: 'numberOfGuardsRequired',
      render: (row) => (
        <span className="font-bold text-white">{row.numberOfGuardsRequired || 1} Guards</span>
      ),
    },
    {
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Amount',
      render: (row) => (
        <span className="font-semibold text-emerald-400">
          {row.quotedAmount ? `₹${Number(row.quotedAmount).toLocaleString('en-IN')}` : '—'}
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
            title="View & Edit Quote"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Security Quote Requests</h1>
        <p className="text-xs text-slate-400 mt-1">Manage inbound client guarding quotes, assign staff, and track SLA proposals.</p>
      </div>

      <DataTable
        columns={columns}
        data={quotes}
        loading={loading}
        searchKey="name"
        searchPlaceholder="Search by client or company..."
        emptyMessage="No quote requests registered."
      />

      {/* Detail & Edit Modal */}
      {selectedQuote && (
        <Modal
          isOpen={!!selectedQuote}
          onClose={() => setSelectedQuote(null)}
          title={`Quote Proposal: ${selectedQuote.quoteNumber}`}
          maxWidth="max-w-4xl"
        >
          <form onSubmit={handleUpdate} className="space-y-4">
            {/* Overview Grid */}
            <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-300">
              <div>
                <span className="text-slate-500 block text-[11px] uppercase font-bold tracking-wider mb-0.5">Client & Company</span>
                <span className="font-bold text-white text-sm block truncate">{selectedQuote.name}</span>
                <span className="text-slate-400 block truncate">{selectedQuote.company || 'Private Client'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] uppercase font-bold tracking-wider mb-0.5">Contact</span>
                <span className="block truncate text-slate-200">{selectedQuote.email}</span>
                <span className="block text-slate-400">{selectedQuote.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] uppercase font-bold tracking-wider mb-0.5">Service Requested</span>
                <span className="font-bold text-gold-400 block truncate">{selectedQuote.serviceRequired}</span>
                <span className="block text-slate-400">{selectedQuote.numberOfGuardsRequired} Guards &bull; {selectedQuote.duration || 'Standard'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] uppercase font-bold tracking-wider mb-0.5">Deployment</span>
                <span className="block font-medium text-slate-200 truncate">{selectedQuote.location}</span>
                <span className="block text-slate-400">Start: {selectedQuote.startDate || 'Immediate'}</span>
              </div>
            </div>

            {selectedQuote.securityRequirements && (
              <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800 text-xs">
                <span className="font-semibold text-slate-400 block mb-0.5">Specific Client Requirements:</span>
                <p className="text-slate-200 leading-relaxed">{selectedQuote.securityRequirements}</p>
              </div>
            )}

            {/* Status Update Fields */}
            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Quote Lifecycle Status
                </label>
                <CustomSelect
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="NEW">New Proposal</option>
                  <option value="CONTACTED">Contacted Client</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="QUOTED">Quoted / Sent</option>
                  <option value="CONVERTED">Converted / Signed</option>
                  <option value="REJECTED">Rejected / Cancelled</option>
                </CustomSelect>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Quoted Amount (₹ INR)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  placeholder="e.g. 150000"
                  className="w-full bg-navy-950 text-white border border-slate-700/80 hover:border-slate-600 focus:border-gold-500 rounded-xl px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold-500/40 placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Assigned Staff Officer
                </label>
                <input
                  type="text"
                  value={editStaff}
                  onChange={(e) => setEditStaff(e.target.value)}
                  placeholder="e.g. Commander Arthur Vance"
                  className="w-full bg-navy-950 text-white border border-slate-700/80 hover:border-slate-600 focus:border-gold-500 rounded-xl px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold-500/40 placeholder:text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Internal Operational Notes
              </label>
              <textarea
                rows={2}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Log phone calls, site visit dates, supervisor staffing notes..."
                className="w-full bg-navy-950 text-white border border-slate-700/80 hover:border-slate-600 focus:border-gold-500 rounded-xl px-3.5 py-2 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold-500/40 placeholder:text-slate-500"
              />
            </div>

            <div className="sticky bottom-0 bg-navy-900/95 backdrop-blur-md flex justify-end gap-3 pt-3 pb-1 border-t border-slate-800 shrink-0">
              <Button variant="ghost" onClick={() => setSelectedQuote(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" loading={isUpdating}>
                Save & Update Quote
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
