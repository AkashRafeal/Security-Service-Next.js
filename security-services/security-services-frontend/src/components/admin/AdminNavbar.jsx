'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Bell, Shield, LogOut, CheckCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { adminService } from '../../services/adminService';

export const AdminNavbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    adminService.getNotifications()
      .then((data) => setNotifications(data || []))
      .catch(() => {});
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = async () => {
    try {
      await adminService.markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (e) {}
  };

  return (
    <header className="h-16 bg-navy-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider hidden sm:inline">
            Live Central Operations
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 relative transition-colors"
            title="System Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-gold-500 text-[10px] font-bold text-navy-950 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-navy-950 border border-slate-800 shadow-elevated p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Notifications ({unreadCount} unread)
                </h4>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] font-semibold text-gold-400 hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60 mt-2">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-6">No recent notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`py-2.5 px-2 rounded-lg transition-colors ${
                        !n.isRead ? 'bg-gold-500/5' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-bold text-white">{n.title}</p>
                        {!n.isRead && (
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                      {n.linkUrl && (
                        <Link
                          href={n.linkUrl}
                          onClick={() => setShowNotifs(false)}
                          className="text-[10px] text-gold-400 font-semibold hover:underline mt-1 inline-block"
                        >
                          View record &rarr;
                        </Link>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User initials & logout */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-navy-800 border border-slate-700 flex items-center justify-center text-gold-400 font-bold text-xs">
            {user?.fullName?.charAt(0) || 'U'}
          </div>
          <span className="text-xs font-bold text-white hidden md:inline truncate max-w-[120px]">
            {user?.fullName || 'User'}
          </span>
          <button
            onClick={() => logout('/')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 active:bg-rose-500/20 transition-colors flex items-center justify-center"
            aria-label="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
