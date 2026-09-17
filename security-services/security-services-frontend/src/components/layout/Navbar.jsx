'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, ShieldCheck, PhoneCall, Menu, X, ChevronRight, Radio, User, LogOut } from 'lucide-react';
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
      {/* Upper Executive Header: Branding, 24/7 Dispatch, Direct Phone & Primary CTA */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
        {/* Brand Identity */}
        <Link href="/" onClick={scrollToTopHome} className="flex items-center gap-2.5 group shrink-0" title="Go to top of Home page">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/25 group-hover:scale-105 transition-transform shrink-0 border border-amber-400/40">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" style={{ color: '#FFFFFF', stroke: '#FFFFFF', fill: 'none' }} />
          </div>
          <div>
            <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-wider block leading-tight">
              ABC <span className="text-amber-600 font-semibold">SECURITY</span>
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest block font-medium">
              Tactical & Corporate Security
            </span>
          </div>
        </Link>

        {/* Center: Live 24/7 Status Indicator (Visible on medium+ screens) */}
        <div
          className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs shadow-sm"
          style={{ backgroundColor: '#F8FAFC', borderColor: '#E2E8F0', color: '#334155' }}
        >
          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span className="font-semibold text-amber-700" style={{ color: '#B45309' }}>24/7 Command Dispatch</span>
          <span style={{ color: '#CBD5E1' }}>|</span>
          <span className="text-[11px] font-medium" style={{ color: '#475569' }}>Rapid Response Unit</span>
        </div>

        {/* Right: Phone, User/Admin Login Gateways & "Get a Quote" Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={`tel:${COMPANY_INFO.phonePrimary}`}
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-700 hover:text-amber-600 font-semibold transition-colors"
            title="Call Security Dispatch"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{COMPANY_INFO.phonePrimary}</span>
          </a>

          <span className="hidden sm:inline text-slate-300">|</span>

          {/* Primary Action Button: Get a Quote */}
          <Link
            href="/request-quote"
            className="shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold text-sm shadow-sm hover:shadow-md transition-all inline-flex items-center justify-center cursor-pointer border border-amber-600/30"
          >
            Get a Quote
          </Link>

          {/* Dynamic Authentication: Matches user design exactly */}
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

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Directory"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Dedicated Navigation Bar: Centered with compact spacing */}
      <nav className="bg-white/95">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          {/* Desktop Single-Row Navigation Menu: Centered with tight, elegant spacing */}
          <div className="hidden lg:flex items-center justify-center gap-1.5 xl:gap-2.5 py-1.5">
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

          {/* Tablet/Mobile Quick Horizontal Scroll Strip: Centered where space allows */}
          <div className="flex lg:hidden items-center justify-start md:justify-center gap-1.5 py-2 overflow-x-auto no-scrollbar scroll-smooth">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={link.path === '/' ? scrollToTopHome : undefined}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  isActive(link.path)
                    ? 'text-amber-800 bg-amber-100 border border-amber-300 font-bold'
                    : 'text-slate-700 bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
                style={
                  isActive(link.path)
                    ? { backgroundColor: '#FEF3C7', color: '#92400E', borderColor: '#FCD34D' }
                    : { backgroundColor: '#F1F5F9', color: '#334155', borderColor: '#E2E8F0' }
                }
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Full Directory Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-4 pb-6 max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="text-[10px] uppercase font-bold tracking-widest text-amber-700 px-2 py-1 mb-2">
              Complete Service & Information Directory
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={link.path === '/' ? scrollToTopHome : undefined}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive(link.path)
                      ? 'text-amber-700 bg-amber-50 font-bold border border-amber-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-2">
              <a
                href={`tel:${COMPANY_INFO.phoneEmergency}`}
                className="flex items-center justify-center gap-2 py-2 bg-rose-950/40 text-rose-300 border border-rose-800/60 rounded-xl text-xs font-semibold"
              >
                <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                Emergency Line: {COMPANY_INFO.phoneEmergency}
              </a>
              {user ? (
                <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-navy-900 border border-slate-800">
                  <span className="text-xs text-slate-300 font-semibold truncate">
                    {user.fullName || user.username}
                  </span>
                  <div className="flex items-center gap-2">
                    {isAdmin || isStaff ? (
                      <Link href="/admin/dashboard" className="text-xs text-gold-400 font-bold hover:underline">
                        Admin
                      </Link>
                    ) : (
                      <Link href="/portal" className="text-xs text-emerald-400 font-bold hover:underline">
                        My Portal
                      </Link>
                    )}
                    <button onClick={() => logout('/')} className="text-xs text-rose-400 font-semibold ml-2">
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="w-full">
                  <Button
                    variant="primary"
                    size="md"
                    icon={User}
                    className="w-full justify-center text-xs font-bold"
                  >
                    Login
                  </Button>
                </Link>
              )}
              <Link href="/request-quote" className="w-full">
                <Button variant="primary" size="md" className="w-full">
                  Request Security Quotation
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
