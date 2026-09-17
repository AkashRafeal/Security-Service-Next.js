'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Shield,
  User,
  PhoneCall,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  PlusCircle,
  Building,
  Mail,
  Phone,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { COMPANY_INFO } from '../../utils/constants';
import { Button } from '../../components/common/Button';
import { publicService } from '../../services/publicService';

export const ClientPortalPage = () => {
  const { user, logout, isAdmin, isStaff } = useAuth();
  const router = useRouter();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!user) {
      router.push('/login');
      return;
    }

    // Attempt to load mock or real client inquiries
    const savedLocal = localStorage.getItem('user_quotes');
    if (savedLocal) {
      setQuotes(JSON.parse(savedLocal));
      setLoading(false);
    } else {
      // Default demo client quotation items
      const sampleQuotes = [
        {
          id: 'QT-8942-01',
          serviceName: 'Corporate Armed Security & Access Control',
          submittedDate: '2026-09-10',
          guardCount: 4,
          coverageType: '24/7 Continuous Shift',
          location: 'Corporate HQ, Manhattan',
          status: 'IN_PROGRESS',
          notes: 'Tactical lead assigned for site perimeter inspection on Monday.',
        },
        {
          id: 'QT-7814-99',
          serviceName: 'CCTV AI Cloud Monitoring & Alarm Dispatch',
          submittedDate: '2026-08-25',
          guardCount: 0,
          coverageType: 'Remote AI Surveillance',
          location: 'Logistics Distribution Yard',
          status: 'CONVERTED',
          notes: 'Hardware installed, active 24/7 connection to central command.',
        },
      ];
      setQuotes(sampleQuotes);
      setLoading(false);
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-navy-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Welcome & Profile Banner */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-400 flex items-center justify-center text-navy-950 font-black text-2xl shadow-gold-glow shrink-0 border border-gold-300/40">
              {user.fullName ? user.fullName.charAt(0) : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  Welcome back, {user.fullName || user.username}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Verified Client
                </span>
                {(isAdmin || isStaff) && (
                  <Link
                    href="/admin/dashboard"
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500/20 text-gold-400 border border-gold-500/30 hover:bg-gold-500/30 transition-colors flex items-center gap-1"
                  >
                    <Shield className="w-3 h-3" />
                    Open Admin Console
                  </Link>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-3 flex-wrap">
                <span>Account: <strong className="text-slate-200">{user.username}</strong></span>
                <span>•</span>
                <span>Email: <strong className="text-slate-200">{user.email}</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
            <Link href="/request-quote">
              <Button size="sm" variant="primary" icon={PlusCircle} className="shadow-gold-glow text-xs">
                Request New Security Detail
              </Button>
            </Link>
            <button
              onClick={() => logout('/')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Operational Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                Active Detail
              </span>
              <span className="text-2xl font-black text-white mt-1 block">1 Contract</span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Guards on Active Duty
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
              <Shield className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                Quotations / Requests
              </span>
              <span className="text-2xl font-black text-white mt-1 block">{quotes.length} Submitted</span>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Last updated today
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                Command Dispatch
              </span>
              <span className="text-sm font-bold text-white mt-1 block">24/7 Live Desk</span>
              <span className="text-[10px] text-gold-400 mt-1 block font-semibold">
                {COMPANY_INFO.phoneEmergency}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                Security Officer
              </span>
              <span className="text-sm font-bold text-white mt-1 block">Unit Alpha-07</span>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Supervisor: Lt. Miller
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <User className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Security Quotations & Contracts Table */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-gold-400" />
                Your Security Service Quotations & Deployments
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Track status, assignment review, and contractual deployment terms
              </p>
            </div>
            <Link href="/request-quote">
              <Button size="sm" variant="outline" icon={PlusCircle} className="text-xs">
                New Quote Request
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Quote Ref</th>
                  <th className="py-3 px-4">Service Program</th>
                  <th className="py-3 px-4">Site Location</th>
                  <th className="py-3 px-4">Guards</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Command Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {quotes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-gold-400">{q.id}</td>
                    <td className="py-3 px-4 font-semibold text-white">{q.serviceName}</td>
                    <td className="py-3 px-4 text-slate-300">{q.location}</td>
                    <td className="py-3 px-4 font-semibold text-slate-200">
                      {q.guardCount > 0 ? `${q.guardCount} Officers` : 'System Only'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          q.status === 'CONVERTED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : q.status === 'IN_PROGRESS'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 max-w-xs truncate">{q.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Emergency Assistance & Direct Dispatch Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-elevated">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              Priority Incident Response
            </span>
            <h3 className="text-xl font-bold text-white">Need Immediate Tactical Reinforcements?</h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Our central dispatch command operates 24 hours a day with priority escalation for registered clients. Direct phone lines connect to our on-duty tactical supervisors.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a href={`tel:${COMPANY_INFO.phoneEmergency}`}>
              <Button size="md" variant="primary" icon={PhoneCall} className="shadow-gold-glow font-bold">
                Emergency Dispatch ({COMPANY_INFO.phoneEmergency})
              </Button>
            </a>
            <Link href="/contact">
              <Button size="md" variant="outline">
                Contact Office
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortalPage;
