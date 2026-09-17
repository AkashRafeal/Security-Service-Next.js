'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { DashboardCard } from '../../components/admin/DashboardCard';
import { Loader } from '../../components/common/Loader';
import {
  Mail,
  FileSpreadsheet,
  FileUser,
  Shield,
  Star,
  Users,
  Building,
  TrendingUp,
  AlertCircle,
  Clock
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';

const COLORS = ['#D97706', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899', '#64748B'];

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getDashboardStats()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader message="Compiling security operations telemetry..." />;

  // Transform monthly data for combined chart
  const monthlyData = (stats?.enquiriesByMonth || []).map((item, idx) => {
    const quoteItem = stats?.quotesByMonth?.[idx] || {};
    return {
      month: item.month,
      enquiries: Number(item.count || 0),
      quotes: Number(quoteItem.count || 0),
    };
  });

  // Transform quote distribution
  const quotePieData = Object.entries(stats?.quoteStatusDistribution || {}).map(([key, value]) => ({
    name: key,
    value: Number(value),
  })).filter((d) => d.value > 0);

  // Service demand data
  const serviceDemandData = stats?.serviceDemand || [];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Security Operations Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry, inbound quotes, officer deployments, and service demand analytics.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-navy-900 border border-slate-800 text-gold-400">
          <Clock className="w-4 h-4" />
          <span>System Status: Fully Operational</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <DashboardCard
          title="Total Enquiries"
          value={stats?.totalEnquiries || 0}
          badge={`${stats?.pendingEnquiries || 0} Pending`}
          badgeColor="text-amber-400 bg-amber-500/10 border-amber-500/30"
          subtitle="General public & commercial questions"
          icon={Mail}
        />
        <DashboardCard
          title="Quote Requests"
          value={stats?.totalQuotes || 0}
          badge={`${stats?.pendingQuotes || 0} New`}
          badgeColor="text-gold-400 bg-gold-500/10 border-gold-500/30"
          subtitle="Formal guarding contract submissions"
          icon={FileSpreadsheet}
        />
        <DashboardCard
          title="Job Applications"
          value={stats?.totalApplications || 0}
          badge={`${stats?.pendingApplications || 0} Under Review`}
          badgeColor="text-cyan-400 bg-cyan-500/10 border-cyan-500/30"
          subtitle="Tactical guard & dispatch candidates"
          icon={FileUser}
        />
        <DashboardCard
          title="Active Services"
          value={stats?.activeServices || 13}
          badge="Live in Catalog"
          badgeColor="text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
          subtitle="Physical, VIP & CCTV capabilities"
          icon={Shield}
        />
      </div>

      {/* Secondary Quick Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="group p-4 rounded-xl bg-navy-900 border border-slate-800 text-center shadow-card card-hover-effect">
          <span className="text-xs font-semibold text-slate-400 block group-hover:text-slate-600 transition-colors">Verified Reviews</span>
          <span className="text-xl font-bold text-white mt-1 block group-hover:text-gold-600 transition-colors">{stats?.totalTestimonials || 0}</span>
        </div>
        <div className="group p-4 rounded-xl bg-navy-900 border border-slate-800 text-center shadow-card card-hover-effect">
          <span className="text-xs font-semibold text-slate-400 block group-hover:text-slate-600 transition-colors">Client Partners</span>
          <span className="text-xl font-bold text-white mt-1 block group-hover:text-gold-600 transition-colors">{stats?.totalClients || 0}</span>
        </div>
        <div className="group p-4 rounded-xl bg-navy-900 border border-slate-800 text-center shadow-card card-hover-effect">
          <span className="text-xs font-semibold text-slate-400 block group-hover:text-slate-600 transition-colors">Active Openings</span>
          <span className="text-xl font-bold text-white mt-1 block group-hover:text-gold-600 transition-colors">{stats?.totalJobs || 0}</span>
        </div>
        <div className="group p-4 rounded-xl bg-navy-900 border border-slate-800 text-center shadow-card card-hover-effect">
          <span className="text-xs font-semibold text-slate-400 block group-hover:text-slate-600 transition-colors">FAQs Indexed</span>
          <span className="text-xl font-bold text-white mt-1 block group-hover:text-gold-600 transition-colors">{stats?.totalFaqs || 0}</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Cols: Enquiries & Quotes by Month */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-navy-900 border border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Inbound Volume Trends</h3>
              <p className="text-xs text-slate-400">Monthly contact enquiries vs formal quote proposals</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B132B',
                    borderColor: '#2A385E',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="enquiries" name="Contact Enquiries" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="quotes" name="Quote Requests" fill="#D97706" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 4 Cols: Quote Status Distribution */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-navy-900 border border-slate-800 shadow-card flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Quote Pipeline Status</h3>
            <p className="text-xs text-slate-400 mb-4">Distribution by contract lifecycle state</p>
            <div className="h-56 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={quotePieData.length > 0 ? quotePieData : [{ name: 'NEW', value: 1 }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {(quotePieData.length > 0 ? quotePieData : [{ name: 'NEW', value: 1 }]).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0B132B',
                      borderColor: '#2A385E',
                      borderRadius: '10px',
                      fontSize: '11px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
            {quotePieData.slice(0, 4).map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-slate-300 font-medium truncate">{d.name}: {d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Demand Bar Breakdown */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 shadow-card">
        <h3 className="text-base font-bold text-white mb-1">Security Service Demand Distribution</h3>
        <p className="text-xs text-slate-400 mb-6">Staffing requests categorized by service type</p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={serviceDemandData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" horizontal={false} />
              <XAxis type="number" stroke="#64748B" fontSize={11} />
              <YAxis dataKey="name" type="category" stroke="#CBD5E1" fontSize={11} width={150} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0B132B',
                  borderColor: '#2A385E',
                  borderRadius: '10px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="requests" name="Requests Volume" fill="#F59E0B" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
