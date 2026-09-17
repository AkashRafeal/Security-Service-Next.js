'use client';

import React from 'react';
import { COMPANY_INFO } from '../../utils/constants';

export const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-8 text-slate-300 text-sm leading-relaxed">
      <h1 className="text-3xl sm:text-4xl font-black text-white">Terms of Service</h1>
      <p className="text-xs text-slate-400">Effective Date: January 1, 2026 | Last Updated: September 12, 2026</p>

      <div className="space-y-6 pt-4 border-t border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white mb-2">1. Scope of Agreement</h2>
          <p>
            By accessing the ABC Security website or contracting our security personnel, electronic surveillance, or risk advisory services, you agree to be bound by these Terms of Service and applicable Master Services Agreements (MSA).
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-2">2. Licensing & Regulatory Standards</h2>
          <p>
            All security services are performed by vetted, licensed personnel operating under {COMPANY_INFO.license}. Armed personnel carry state-certified firearms endorsements and adhere strictly to legal rules of engagement and property defense statutes.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-2">3. Limitation of Liability</h2>
          <p>
            ABC Security maintains comprehensive commercial general liability, errors & omissions, and fidelity insurance bonds. Specific indemnity and liability caps are governed by executed client service agreements.
          </p>
        </div>
      </div>
    </div>
  );
};
