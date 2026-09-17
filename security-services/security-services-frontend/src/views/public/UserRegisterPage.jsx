'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, ShieldCheck, User, Lock, Mail, Phone, Building, Building2, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export const UserRegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.username.trim() || !formData.email.trim() || !formData.password) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      await register({
        fullName: formData.fullName.trim(),
        company: formData.company.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
      });

      router.push('/portal');
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Username or email may already be registered.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10 px-4">
        <div className="flex justify-center mb-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform border border-amber-400/40">
              <ShieldCheck className="w-7 h-7 stroke-[2.2]" style={{ color: '#FFFFFF', stroke: '#FFFFFF', fill: 'none' }} />
            </div>
          </Link>
        </div>

        <h2 className="text-center text-2xl sm:text-3xl font-black text-white tracking-tight">
          Client Account <span className="text-gold-400 font-semibold">Registration</span>
        </h2>
        <p className="mt-1.5 text-center text-xs text-slate-400">
          Create an enterprise client account for quotation tracking, contract oversight, and patrol reports
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg px-4 relative z-10">
        <div className="bg-navy-900/90 border border-slate-800 py-8 px-6 sm:px-10 rounded-3xl shadow-elevated backdrop-blur-md">
          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. John Sterling"
                    className="w-full pl-9 pr-3 py-2 bg-navy-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 text-xs"
                  />
                  <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Company / Organization
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Sterling Capital"
                    className="w-full pl-9 pr-3 py-2 bg-navy-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 text-xs"
                  />
                  <Building2 className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Desired Username *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="e.g. jsterling"
                    className="w-full pl-9 pr-3 py-2 bg-navy-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 text-xs"
                  />
                  <Shield className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Work Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@sterlingcapital.com"
                    className="w-full pl-9 pr-3 py-2 bg-navy-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 text-xs"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Contact Phone *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (800) 555-0199"
                  className="w-full pl-9 pr-3 py-2 bg-navy-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 text-xs"
                />
                <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Password (6+ chars) *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-navy-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 text-xs"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-navy-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 text-xs"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-4 font-bold shadow-gold-glow"
              disabled={loading}
            >
              {loading ? (
                'Creating Client Profile...'
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>Register & Access Client Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="text-gold-400 font-bold hover:underline">
              Log In to Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterPage;
