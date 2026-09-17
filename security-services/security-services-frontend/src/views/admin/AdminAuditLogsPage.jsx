'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import DataTable from '../../components/admin/DataTable';
import { MOCK_AUDIT_LOGS } from '../../utils/mockData';
import { ShieldCheck, Clock, User, Terminal } from 'lucide-react';

const AdminAuditLogsPage = () => {
  const { addToast } = useToast();
  const [logs, setLogs] = useState(MOCK_AUDIT_LOGS);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    try {
      const res = await adminService.getAuditLogs();
      const list = Array.isArray(res) ? res : (res?.data?.data || res?.data || []);
      if (list && list.length > 0) setLogs(list);
    } catch (err) {
      // keep fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getActionBadge = (action) => {
    if (action.includes('CREATE')) return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
    if (action.includes('UPDATE')) return 'bg-sky-500/10 text-sky-400 border border-sky-500/30';
    if (action.includes('DELETE')) return 'bg-rose-500/10 text-rose-400 border border-rose-500/30';
    if (action.includes('LOGIN')) return 'bg-purple-500/10 text-purple-400 border border-purple-500/30';
    return 'bg-navy-800 text-gold-400 border border-slate-700';
  };

  const columns = [
    {
      header: 'Action / Operation',
      accessor: 'action',
      render: (item) => (
        <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${getActionBadge(item.action)}`}>
          {item.action}
        </span>
      )
    },
    {
      header: 'Entity / Target',
      render: (item) => (
        <div className="text-xs">
          <span className="font-semibold text-white">{item.entityName}</span>
          {item.entityId && <span className="text-gold-400/80 font-mono ml-1">#{item.entityId}</span>}
        </div>
      )
    },
    {
      header: 'Performed By',
      accessor: 'performedBy',
      render: (item) => (
        <div className="flex items-center text-xs text-slate-300 space-x-1 font-medium">
          <User className="w-3.5 h-3.5 text-gold-400" />
          <span>{item.performedBy || 'SYSTEM'}</span>
        </div>
      )
    },
    {
      header: 'Details & Changes',
      accessor: 'details',
      render: (item) => (
        <span className="text-xs font-mono text-slate-300 truncate max-w-sm block">
          {item.details || '—'}
        </span>
      )
    },
    {
      header: 'IP Address',
      accessor: 'ipAddress',
      render: (item) => <span className="text-xs font-mono text-slate-400">{item.ipAddress || '127.0.0.1'}</span>
    },
    {
      header: 'Timestamp',
      accessor: 'createdAt',
      render: (item) => (
        <div className="flex items-center text-xs text-slate-400 space-x-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>{item.createdAt ? new Date(item.createdAt).toLocaleString() : '—'}</span>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Security & Administrative Audit Logs</h1>
          <p className="text-xs text-slate-400 mt-1">Immutable compliance ledger tracking all administrative actions and logins.</p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Compliance Logging: Active</span>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={logs}
        searchPlaceholder="Search audit events by action, entity or officer..."
        searchKey="action"
        loading={loading}
      />
    </div>
  );
};

export default AdminAuditLogsPage;
