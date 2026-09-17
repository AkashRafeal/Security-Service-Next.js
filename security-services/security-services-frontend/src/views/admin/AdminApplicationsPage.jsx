'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { CustomSelect } from '../../components/common/CustomSelect';
import { useToast } from '../../context/ToastContext';
import { Edit, FileText, Download, ExternalLink, User } from 'lucide-react';

export const AdminApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [editStatus, setEditStatus] = useState('NEW');
  const [editNotes, setEditNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const toast = useToast();

  const fetchApps = async () => {
    setLoading(true);
    try {
      const data = await adminService.getApplications();
      setApplications(data || []);
    } catch (e) {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const openEditModal = (app) => {
    setSelectedApp(app);
    setEditStatus(app.status || 'NEW');
    setEditNotes(app.internalNotes || '');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedApp) return;
    setIsUpdating(true);
    try {
      await adminService.updateApplicationStatus(selectedApp.id, {
        status: editStatus,
        internalNotes: editNotes,
      });
      toast.success('Applicant status updated');
      setSelectedApp(null);
      fetchApps();
    } catch (err) {
      toast.error('Failed to update applicant');
    } finally {
      setIsUpdating(false);
    }
  };

  const columns = [
    {
      header: 'Applicant',
      render: (row) => (
        <div>
          <span className="font-bold text-white block">{row.applicantName}</span>
          <span className="text-xs text-slate-400 block">{row.email} &bull; {row.phone}</span>
        </div>
      ),
    },
    {
      header: 'Role Applied',
      accessor: 'jobTitle',
      className: 'font-semibold text-gold-400',
    },
    {
      header: 'Experience',
      accessor: 'experienceYears',
      className: 'text-xs text-slate-300',
    },
    {
      header: 'Location',
      accessor: 'location',
      className: 'text-xs text-slate-400',
    },
    {
      header: 'Resume',
      render: (row) =>
        row.resumeUrl ? (
          <a
            href={row.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-gold-400 hover:underline"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download</span>
          </a>
        ) : (
          <span className="text-xs text-slate-500">None</span>
        ),
    },
    {
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (row) => (
        <button
          onClick={() => openEditModal(row)}
          className="p-1.5 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-slate-300 transition-colors border border-slate-700"
          title="Review Candidate"
        >
          <Edit className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Job Applications</h1>
        <p className="text-xs text-slate-400 mt-1">Review tactical guard applicants, check certifications, and manage recruitment pipeline.</p>
      </div>

      <DataTable
        columns={columns}
        data={applications}
        loading={loading}
        searchKey="applicantName"
        searchPlaceholder="Search by applicant name..."
      />

      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Candidate Review: ${selectedApp.applicantName}`}
        >
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-2 text-xs text-slate-300">
              <p><span className="text-slate-500">Applying for: </span><span className="text-gold-400 font-bold">{selectedApp.jobTitle}</span></p>
              <p><span className="text-slate-500">Contact: </span>{selectedApp.email} | {selectedApp.phone}</p>
              <p><span className="text-slate-500">Location: </span>{selectedApp.location}</p>
              <p><span className="text-slate-500">Experience: </span>{selectedApp.experienceYears}</p>
              {selectedApp.resumeUrl && (
                <div className="pt-2">
                  <a
                    href={selectedApp.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500 text-navy-950 font-bold text-xs shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Attached Resume ({selectedApp.resumeFileName || 'Document'})</span>
                  </a>
                </div>
              )}
            </div>

            {selectedApp.message && (
              <div className="p-3 rounded-xl bg-navy-950/60 border border-slate-800 text-xs">
                <span className="font-semibold text-slate-400 block mb-1">Cover Note / Licenses:</span>
                <p className="text-slate-200">{selectedApp.message}</p>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Candidate Pipeline Stage
              </label>
              <CustomSelect
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
              >
                <option value="NEW">New Application</option>
                <option value="REVIEWING">In Review</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="INTERVIEW">Interview Scheduled</option>
                <option value="SELECTED">Selected / Hired</option>
                <option value="REJECTED">Rejected</option>
              </CustomSelect>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Recruiter & Interview Notes
              </label>
              <textarea
                rows={3}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Log interview feedback, background check clearance..."
                className="w-full bg-navy-950 text-white border border-slate-700/80 hover:border-slate-600 focus:border-gold-500 rounded-xl px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-gold-500/40 placeholder:text-slate-500"
              />
            </div>

            <div className="sticky bottom-0 bg-navy-900/95 backdrop-blur-md flex justify-end gap-3 pt-3 pb-1 border-t border-slate-800 shrink-0">
              <Button variant="ghost" onClick={() => setSelectedApp(null)}>Cancel</Button>
              <Button type="submit" variant="primary" loading={isUpdating}>Save Decision</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
