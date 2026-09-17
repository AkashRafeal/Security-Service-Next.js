'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Shield, ShieldCheck, User, Lock, ArrowRight, AlertCircle, CheckCircle2, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export const UserLoginPage = () => {
  const searchParams = useSearchParams();
  const initialRole = searchParams?.get('role') === 'admin' ? 'admin' : 'user';

  const [activeTab, setActiveTab] = useState(initialRole); // 'user' or 'admin'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const userData = await login(username.trim(), password);
      const roles = userData.roles || [];
      const isAdminOrStaff = roles.some((r) =>
        ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_STAFF'].includes(typeof r === 'string' ? r : r.name)
      );

      if (activeTab === 'admin' && !isAdminOrStaff) {
        setErrorMsg('This account does not have staff or administrator privileges.');
        setLoading(false);
        return;
      }

      if (isAdminOrStaff) {
        router.push('/admin/dashboard');
      } else {
        router.push('/portal');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Invalid credentials. Please verify and try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillClientDemo = () => {
    setActiveTab('user');
    setUsername('user');
    setPassword('User@123456');
    setErrorMsg('');
  };

  const fillAdminDemo = () => {
    setActiveTab('admin');
    setUsername('admin');
    setPassword('Admin@123456');
    setErrorMsg('');
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-navy-950 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Brand Icon Header */}
        <div className="flex justify-center mb-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform border border-amber-400/40">
              <ShieldCheck className="w-7 h-7 stroke-[2.2]" style={{ color: '#FFFFFF', stroke: '#FFFFFF', fill: 'none' }} />
            </div>
          </Link>
        </div>

        <h2 className="text-center text-2xl sm:text-3xl font-black text-white tracking-tight">
          ABC <span className="text-gold-400 font-semibold">PORTAL</span>
        </h2>
        <p className="mt-1.5 text-center text-xs text-slate-400">
          Secure Authentication Gateway for Clients & Command Staff
        </p>

        {/* Role Tab Switcher */}
        <div className="mt-6 grid grid-cols-2 p-1 rounded-xl bg-navy-900 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setActiveTab('user');
              setErrorMsg('');
            }}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'user'
                ? 'bg-gold-500 text-navy-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Client / User
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setErrorMsg('');
            }}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'admin'
                ? 'bg-gold-500 text-navy-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Admin / Staff
          </button>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
        <div className="bg-navy-900/90 border border-slate-800 py-8 px-6 sm:px-10 rounded-3xl shadow-elevated backdrop-blur-md">


          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={activeTab === 'user' ? 'client or email' : 'admin or staff'}
                  className="w-full pl-10 pr-4 py-2.5 bg-navy-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm transition-colors"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-navy-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm transition-colors"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2 font-bold shadow-gold-glow"
              disabled={loading}
            >
              {loading ? (
                'Authenticating...'
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>Sign In as {activeTab === 'user' ? 'Client' : 'Admin'}</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* One-Click Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">
              Quick One-Click Demo Logins
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={fillClientDemo}
                className="px-2.5 py-2 rounded-xl bg-navy-950 hover:bg-slate-800 border border-slate-800 hover:border-gold-500/40 text-slate-300 hover:text-gold-400 text-xs font-medium transition-all text-center flex flex-col items-center"
              >
                <span className="font-bold text-white flex items-center gap-1">
                  <User className="w-3 h-3 text-gold-400" /> Client Demo
                </span>
                <span className="text-[10px] text-slate-500">user / User@123456</span>
              </button>
              <button
                type="button"
                onClick={fillAdminDemo}
                className="px-2.5 py-2 rounded-xl bg-navy-950 hover:bg-slate-800 border border-slate-800 hover:border-gold-500/40 text-slate-300 hover:text-gold-400 text-xs font-medium transition-all text-center flex flex-col items-center"
              >
                <span className="font-bold text-white flex items-center gap-1">
                  <Shield className="w-3 h-3 text-gold-400" /> Admin Demo
                </span>
                <span className="text-[10px] text-slate-500">admin / Admin@123456</span>
              </button>
            </div>
          </div>

          {/* Registration Link for Clients */}
          <div className="mt-6 text-center text-xs text-slate-400">
            Don't have a Client account?{' '}
            <Link href="/register" className="text-gold-400 font-bold hover:underline">
              Register as a Client
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
