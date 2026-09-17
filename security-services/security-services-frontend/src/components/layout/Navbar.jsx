'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, ShieldCheck, PhoneCall, Menu, X, ChevronRight, Radio, User, LogOut, FileText } from 'lucide-react';
import { COMPANY_INFO, NAV_LINKS } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, isAdmin, isStaff } = useAuth();

  // Close mobile drawer on page route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const scrollToTopHome = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      document.body.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('reset-hero-card'));
    }
    if (isOpen) setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md select-none border-b border-slate-100/80">
      {/* Primary Header Bar */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Identity */}
        <Link
          href="/"
          onClick={scrollToTopHome}
          className="flex items-center gap-2 group shrink-0 min-w-0"
          title="Go to top of Home page"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/25 group-hover:scale-105 transition-transform shrink-0 border border-amber-400/40">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" style={{ color: '#FFFFFF', stroke: '#FFFFFF', fill: 'none' }} />
          </div>
          <div className="min-w-0">
            <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-wider block leading-tight truncate">
              ABC <span className="text-amber-600 font-semibold">SECURITY</span>
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest block font-medium truncate hidden min-[360px]:block">
              Tactical & Corporate Security
            </span>
          </div>
        </Link>

        {/* Center: Live 24/7 Status Indicator (Visible on desktop) */}
        <div
          className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs shadow-sm shrink-0"
          style={{ backgroundColor: '#F8FAFC', borderColor: '#E2E8F0', color: '#334155' }}
        >
          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span className="font-semibold text-amber-700" style={{ color: '#B45309' }}>24/7 Command Dispatch</span>
          <span style={{ color: '#CBD5E1' }}>|</span>
          <span className="text-[11px] font-medium" style={{ color: '#475569' }}>Rapid Response Unit</span>
        </div>

        {/* Desktop Right Controls: Phone, Login, CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${COMPANY_INFO.phonePrimary}`}
            className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-amber-600 font-semibold transition-colors"
            title="Call Security Dispatch"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{COMPANY_INFO.phonePrimary}</span>
          </a>

          <span className="text-slate-300">|</span>

          {/* Primary Action Button: Get a Quote */}
          <Link
            href="/request-quote"
            className="shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold text-sm shadow-sm hover:shadow-md transition-all inline-flex items-center justify-center cursor-pointer border border-amber-600/30"
          >
            Get a Quote
          </Link>

          {/* User / Admin Authentication State */}
          {user ? (
            <div className="flex items-center gap-1.5 shrink-0">
              {isAdmin || isStaff ? (
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 text-xs font-bold transition-all shadow-sm"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Console</span>
                </Link>
              ) : (
                <Link
                  href="/portal"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition-all shadow-sm"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Client Portal</span>
                </Link>
              )}
              <button
                onClick={() => logout('/')}
                className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="shrink-0 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-sm transition-all inline-flex items-center justify-center gap-2 cursor-pointer border border-amber-600/30"
            >
              <User className="w-4 h-4 text-white stroke-[2.4]" />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Right Controls: Compact Quote CTA + Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Compact Quote CTA */}
          <Link
            href="/request-quote"
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs shadow-xs inline-flex items-center justify-center border border-amber-600/30 whitespace-nowrap"
          >
            Get a Quote
          </Link>

          {/* Quick Login / Profile Gateway - visible on sm+ screens */}
          <div className="hidden sm:flex items-center">
            {user ? (
              <Link
                href={isAdmin || isStaff ? '/admin/dashboard' : '/portal'}
                className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 transition-colors flex items-center justify-center"
                title={isAdmin ? 'Admin Console' : 'Client Portal'}
              >
                <User className="w-4 h-4 text-amber-700" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="p-1.5 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center justify-center"
                title="Sign In"
              >
                <User className="w-4 h-4 text-slate-700" />
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Toggle Button - ALWAYS visible with safe margin */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 sm:p-2 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-200 transition-colors flex items-center justify-center shadow-xs shrink-0"
            aria-label="Toggle Navigation Directory"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5 text-amber-700" /> : <Menu className="w-5 h-5 text-slate-800" />}
          </button>
        </div>
      </div>

      {/* Desktop Single-Row Navigation Menu */}
      <nav className="hidden lg:block bg-white/95 border-t border-slate-100/80">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-center gap-1.5 xl:gap-2.5 py-1.5">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={link.path === '/' ? scrollToTopHome : undefined}
                  className={`px-2.5 xl:px-3 py-1 rounded-md text-[12px] xl:text-[13px] font-semibold transition-all whitespace-nowrap ${
                    active
                      ? 'text-amber-700 bg-amber-50 font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu & Overlay */}
      {isOpen && (
        <>
          {/* Dark Backdrop Overlay */}
          <div
            className="fixed inset-0 top-[57px] sm:top-[65px] bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-Down Drawer Container */}
          <div className="relative z-50 bg-white border-b border-slate-200 shadow-2xl max-h-[calc(100vh-65px)] overflow-y-auto px-4 pt-3 pb-6 space-y-4 lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Quick 24/7 Command Dispatch Status */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse shrink-0" />
                <span className="font-bold text-slate-800">24/7 Command Dispatch</span>
              </div>
              <a
                href={`tel:${COMPANY_INFO.phonePrimary}`}
                className="font-bold text-amber-700 hover:underline flex items-center gap-1 shrink-0"
              >
                <PhoneCall className="w-3 h-3 text-amber-600" />
                <span>{COMPANY_INFO.phonePrimary}</span>
              </a>
            </div>

            {/* Navigation Directory Grid */}
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-amber-700 px-1 mb-2">
                Navigation Directory
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => {
                        if (link.path === '/') scrollToTopHome();
                        setIsOpen(false);
                      }}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all border ${
                        active
                          ? 'bg-amber-50 text-amber-800 border-amber-300 font-bold shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <span className="truncate">{link.name}</span>
                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-amber-600' : 'text-slate-400'}`} />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Actions: Emergency Line + Quote CTA + Authentication */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`tel:${COMPANY_INFO.phoneEmergency}`}
                className="flex items-center justify-center gap-2 py-2.5 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 rounded-xl text-xs font-bold transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Emergency Hotline: {COMPANY_INFO.phoneEmergency}</span>
              </a>

              <Link
                href="/request-quote"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white text-xs font-bold shadow-md transition-all border border-amber-600/30"
              >
                <FileText className="w-4 h-4 text-white" />
                <span>Request Free Security Quote</span>
              </Link>

              {user ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <User className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-bold text-slate-800 truncate">
                      {user.fullName || user.username}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={isAdmin || isStaff ? '/admin/dashboard' : '/portal'}
                      onClick={() => setIsOpen(false)}
                      className="text-xs font-bold text-amber-700 hover:underline"
                    >
                      {isAdmin || isStaff ? 'Admin Console' : 'My Portal'}
                    </Link>
                    <button
                      onClick={() => {
                        logout('/');
                        setIsOpen(false);
                      }}
                      className="text-xs font-semibold text-rose-600 hover:underline ml-1"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-slate-700" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-amber-700 text-xs font-bold border border-amber-300 transition-colors"
                  >
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
