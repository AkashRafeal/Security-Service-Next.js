'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { QuoteForm } from '../../components/public/QuoteForm';
import { ShieldCheck, CheckCircle2, Clock, Calculator, Award } from 'lucide-react';

export const RequestQuotePage = () => {
  const searchParams = useSearchParams();
  const preselectedService = searchParams?.get('service') || '';

  return (
    <div className="space-y-16 py-12 lg:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="text-center">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-3">
          Binding Corporate Proposals
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto">
          Request a Custom Security Quotation
        </h1>
        <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Provide your property details, guarding requirements, and schedule below to receive a formal contract SLA quotation and complimentary vulnerability audit.
        </p>
      </section>

      {/* Value Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 flex items-center gap-3">
          <Clock className="w-5 h-5 text-gold-400 shrink-0" />
          <span className="text-xs text-slate-300 font-medium">Guaranteed response within 2 business hours</span>
        </div>
        <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
          <span className="text-xs text-slate-300 font-medium">Transparent billing & clear post-order SLAs</span>
        </div>
        <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 flex items-center gap-3">
          <Award className="w-5 h-5 text-gold-400 shrink-0" />
          <span className="text-xs text-slate-300 font-medium">Free physical security gap analysis included</span>
        </div>
      </div>

      {/* Main Quote Form */}
      <div className="p-8 sm:p-10 rounded-3xl bg-navy-900 border border-slate-800 shadow-elevated">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-gold-400" />
          <span>Security Requirements Form</span>
        </h3>
        <p className="text-xs text-slate-400 mb-8">
          Fields marked with an asterisk (*) are required to calculate accurate staffing and supervisor schedules.
        </p>
        <QuoteForm preselectedService={preselectedService} />
      </div>
    </div>
  );
};

export default RequestQuotePage;
