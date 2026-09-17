'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  ShieldCheck,
  LayoutDashboard,
  FileSpreadsheet,
  Mail,
  FileUser,
  Layers,
  Building,
  Handshake,
  FolderKanban,
  Users,
  Star,
  Image,
  BookOpen,
  HelpCircle,
  Briefcase,
  UserCheck,
  Bell,
  History,
  Settings,
  X,
  LogOut,
  ExternalLink
} from 'lucide-react';
import { ADMIN_NAV_LINKS } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

const ICON_MAP = {
  LayoutDashboard,
  FileSpreadsheet,
  Mail,
  FileUser,
  Shield,
  Layers,
  Building,
  Handshake,
  FolderKanban,
  Users,
  Star,
  Image,
  BookOpen,
  HelpCircle,
  Briefcase,
  UserCheck,
  Bell,
  History,
  Settings,
};

export const AdminSidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { user, logout, isAdmin } = useAuth();

  const isActive = (path) => {
    return pathname === path || (path !== '/admin/dashboard' && pathname.startsWith(path));
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-navy-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-navy-950 border-r border-slate-800/80 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-white shadow-gold-glow shrink-0 border border-gold-400/40">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" style={{ color: '#FFFFFF', stroke: '#FFFFFF', fill: 'none' }} />
            </div>
            <div>
              <span className="text-sm font-extrabold text-white tracking-wider block">
                ABC <span className="text-gold-400 font-normal">ADMIN</span>
              </span>
              <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-semibold">
                Control Console
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Operations & Content
          </div>
          {ADMIN_NAV_LINKS.map((item) => {
            if (item.adminOnly && !isAdmin) return null;
            const Icon = ICON_MAP[item.icon] || Shield;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-gold-500 text-navy-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-navy-950' : 'text-slate-400'}`} />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* User profile & quick link to public site */}
        <div className="p-3 border-t border-slate-800 bg-navy-900/40 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-gold-400 hover:bg-navy-900 transition-colors mb-2"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              View Live Website
            </span>
          </Link>

          <div className="flex items-center justify-between px-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-navy-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-gold-400 shrink-0">
                {user?.fullName?.charAt(0) || 'A'}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{user?.fullName || 'Administrator'}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.username || 'admin'}</p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors rounded-lg hover:bg-rose-500/10"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
