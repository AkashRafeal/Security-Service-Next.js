'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import DataTable from '../../components/admin/DataTable';
import Button from '../../components/common/Button';
import { Bell, Check, CheckCheck, Trash2, Clock, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

const AdminNotificationsPage = () => {
  const { addToast } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await adminService.getNotifications();
      setNotifications(res.data?.data || res.data || []);
    } catch (err) {
      addToast('Failed to load notifications', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await adminService.markNotificationAsRead(id);
      addToast('Notification marked as read', 'success');
      fetchNotifications();
    } catch (err) {
      addToast('Failed to update notification', 'error');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await adminService.markAllNotificationsAsRead();
      addToast('All notifications marked as read', 'success');
      fetchNotifications();
    } catch (err) {
      addToast('Failed to mark all as read', 'error');
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'URGENT':
      case 'ALERT':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'SUCCESS':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const columns = [
    {
      header: 'Event / Alert',
      render: (item) => (
        <div className="flex items-start space-x-3">
          <div className="mt-0.5">{getTypeIcon(item.type)}</div>
          <div>
            <div className={`font-semibold ${item.isRead ? 'text-slate-400' : 'text-white'}`}>
              {item.title}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">{item.message}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Category / Type',
      accessor: 'type',
      render: (item) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-navy-800 text-gold-400 border border-slate-700">
          {item.type || 'INFO'}
        </span>
      )
    },
    {
      header: 'Timestamp',
      accessor: 'createdAt',
      render: (item) => (
        <div className="flex items-center text-xs text-slate-400 space-x-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{item.createdAt ? new Date(item.createdAt).toLocaleString() : 'Recent'}</span>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'isRead',
      render: (item) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
          item.isRead ? 'bg-navy-800 text-slate-400 border-slate-700' : 'bg-gold-500/20 text-gold-400 border-gold-500/40 font-bold'
        }`}>
          {item.isRead ? 'Read' : 'New'}
        </span>
      )
    },
    {
      header: 'Actions',
      render: (item) => (
        !item.isRead ? (
          <button
            onClick={() => handleMarkAsRead(item.id)}
            className="flex items-center space-x-1.5 text-xs text-gold-400 hover:text-navy-950 bg-gold-500/10 hover:bg-gold-500 border border-gold-500/30 px-2.5 py-1 rounded-lg transition"
            title="Mark as Read"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Acknowledge</span>
          </button>
        ) : (
          <span className="text-xs text-slate-500">Archived</span>
        )
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Security Operations Notification Log</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time alerts, incoming RFQ triggers, and system dispatches.</p>
        </div>
        <Button
          variant="outline"
          icon={<CheckCheck className="w-4 h-4" />}
          onClick={handleMarkAllAsRead}
        >
          Mark All Acknowledged
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={notifications}
        searchPlaceholder="Search notifications..."
        searchKey="title"
        loading={loading}
      />
    </div>
  );
};

export default AdminNotificationsPage;
