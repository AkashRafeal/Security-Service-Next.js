'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, PhoneCall, Mail, MapPin, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { COMPANY_INFO } from '../../utils/constants';

export const Footer = () => {
  return (
    <footer className="bg-white text-slate-600 text-sm">
      {/* 24/7 Rapid Emergency Response Banner - Compact */}
      <div
        className="py-4 sm:py-5 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#F8FAFC' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
              style={{ backgroundColor: '#FEF3C7', borderColor: '#FCD34D' }}
            >
              <ShieldCheck className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h4 className="font-bold text-sm" style={{ color: '#0F172A' }}>Facing an Urgent Security Crisis or Need Rapid Post Deployment?</h4>
              <p className="text-[11px]" style={{ color: '#475569' }}>Our Operations Command Center dispatches armed and unarmed units 24/7/365.</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phoneEmergency}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-white" />
              <span>Emergency: {COMPANY_INFO.phoneEmergency}</span>
            </a>
            <Link
              href="/request-quote"
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold text-xs shadow-sm transition-all border border-amber-600/30"
            >
              <span>Request Quote</span>
              <ChevronRight className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links - Compact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1: Brand & Credentials */}
        <div className="lg:col-span-2 space-y-3">
          <Link
            href="/"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                document.body.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                window.dispatchEvent(new CustomEvent('reset-hero-card'));
              }
            }}
            className="flex items-center gap-2.5 group"
            title="Go to top of Home page"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-amber-500 to-amber-600 flex items-center justify-center shadow-sm border border-amber-400/40 shrink-0 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" style={{ color: '#FFFFFF', stroke: '#FFFFFF', fill: 'none' }} />
            </div>
            <div>
              <span className="text-base font-extrabold text-slate-900 tracking-wider block leading-tight">
                ABC <span className="text-amber-600 font-semibold">SECURITY</span>
              </span>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-medium">
                Security Solutions
              </span>
            </div>
          </Link>
          <p className="text-xs leading-relaxed text-slate-600 max-w-sm">
            Setting the benchmark in physical security personnel, executive VIP protection, and AI-enabled surveillance operations for over two decades.
          </p>

          <div className="pt-1 space-y-1.5 text-xs text-slate-600">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>{COMPANY_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <a href={`tel:${COMPANY_INFO.phonePrimary}`} className="hover:text-amber-700 transition-colors">
                {COMPANY_INFO.phonePrimary}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-amber-700 transition-colors">
                {COMPANY_INFO.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{COMPANY_INFO.hours}</span>
            </div>
          </div>
        </div>

        {/* Col 2: Services */}
        <div>
          <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1.5">
            Security Services
          </h5>
          <ul className="space-y-1.5 text-xs">
            <li><Link href="/services/security-guard-services" className="hover:text-amber-600 transition-colors">Security Guard Services</Link></li>
            <li><Link href="/services/corporate-security" className="hover:text-amber-600 transition-colors">Corporate Security</Link></li>
            <li><Link href="/services/residential-security" className="hover:text-amber-600 transition-colors">Residential Security</Link></li>
            <li><Link href="/services/event-security" className="hover:text-amber-600 transition-colors">Event Security</Link></li>
            <li><Link href="/services/vip-protection" className="hover:text-amber-600 transition-colors">VIP & Close Protection</Link></li>
            <li><Link href="/services/cctv-monitoring" className="hover:text-amber-600 transition-colors">24/7 CCTV Monitoring</Link></li>
            <li><Link href="/services/bank-security" className="hover:text-amber-600 transition-colors">Bank & Vault Defense</Link></li>
            <li><Link href="/services" className="text-amber-600 font-semibold inline-flex items-center gap-1 mt-0.5">View All Services &rarr;</Link></li>
          </ul>
        </div>

        {/* Col 3: Company & Trust */}
        <div>
          <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1.5">
            Company & Trust
          </h5>
          <ul className="space-y-1.5 text-xs">
            <li><Link href="/about" className="hover:text-amber-600 transition-colors">About Us</Link></li>
            <li><Link href="/about#why-choose-us" className="hover:text-amber-600 transition-colors">Why Choose Us</Link></li>
            <li><Link href="/about#process" className="hover:text-amber-600 transition-colors">Our Security Process</Link></li>
            <li><Link href="/services#clients" className="hover:text-amber-600 transition-colors">Clients & Partners</Link></li>
            <li><Link href="/careers" className="hover:text-amber-600 transition-colors">Careers & Guard Academy</Link></li>
            <li><Link href="/contact#faq" className="hover:text-amber-600 transition-colors">FAQs & Knowledgebase</Link></li>
            <li><Link href="/contact" className="hover:text-amber-600 transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      {/* Clean Copyright Line */}
      <div className="border-t border-slate-200 bg-slate-50 py-3.5 px-4 text-center text-xs text-slate-500">
        <span>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
