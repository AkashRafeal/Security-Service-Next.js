'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Shield, ShieldCheck, Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';

const loginSchema = z.object({
  username: z.string().min(1, 'Username or email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const AdminLoginPage = () => {
  const { login } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: 'admin',
      password: 'Admin@123456',
    },
  });

  const onSubmit = async (data) => {
    setErrorMsg('');
    try {
      await login(data.username, data.password);
      toast.success('Authenticated successfully. Welcome to Command Console.');
      router.push('/admin/dashboard');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-gold-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Website</span>
        </Link>

        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/30 border border-amber-400/40">
            <ShieldCheck className="w-7 h-7 stroke-[2.2]" style={{ color: '#FFFFFF', stroke: '#FFFFFF', fill: 'none' }} />
          </div>
        </div>

        <h2 className="text-center text-2xl sm:text-3xl font-black text-white tracking-tight">
          ABC <span className="text-gold-400 font-semibold">ADMIN</span>
        </h2>
        <p className="mt-1.5 text-center text-xs text-slate-400">
          Restricted Command & Control Console
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
        <div className="bg-navy-900/90 border border-slate-800 py-8 px-6 sm:px-10 rounded-3xl shadow-elevated backdrop-blur-md">
          {errorMsg && (
            <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  {...register('username')}
                  placeholder="admin"
                  className="w-full bg-navy-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                />
              </div>
              {errors.username && <p className="text-xs text-rose-400 mt-1">{errors.username.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  {...register('password')}
                  placeholder="••••••••"
                  className="w-full bg-navy-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                />
              </div>
              {errors.password && <p className="text-xs text-rose-400 mt-1">{errors.password.message}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              className="w-full mt-4 shadow-gold-glow font-bold"
            >
              Sign In to Command Portal
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Demo Admin Credentials:</p>
              <p>Username: <code className="text-gold-400 bg-navy-950 px-1.5 py-0.5 rounded">admin</code></p>
              <p>Password: <code className="text-gold-400 bg-navy-950 px-1.5 py-0.5 rounded">Admin@123456</code></p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/60">
              <p className="text-xs text-slate-400">
                Are you a client or customer?{' '}
                <Link href="/login" className="text-gold-400 font-bold hover:underline">
                  Client Portal Login &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
