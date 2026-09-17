'use client';

import React from 'react';
import { COMPANY_INFO } from '../../utils/constants';

export const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-8 text-slate-300 text-sm leading-relaxed">
      <h1 className="text-3xl sm:text-4xl font-black text-white">Privacy Policy</h1>
      <p className="text-xs text-slate-400">Effective Date: January 1, 2026 | Last Updated: September 12, 2026</p>

      <div className="space-y-6 pt-4 border-t border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white mb-2">1. Information We Collect</h2>
          <p>
            ABC Security Services Inc. ("ABC Security", "we", "us") collects personal information you provide when requesting quotations, submitting employment applications, or contacting our command dispatch. This information includes your name, email address, telephone number, business address, and resume documents.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-2">2. How We Use Collected Data</h2>
          <p>
            We use your data solely for delivering physical and electronic security services, communicating operational proposals, processing employment applications through background vetting authorities, and ensuring compliance with federal and state private security regulations.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-2">3. Video Surveillance & Checkpoint Telemetry</h2>
          <p>
            In facilities where ABC Security provides electronic monitoring and guard tour wanding, visual data and access badge logs are retained strictly in accordance with client contract SLAs and applicable privacy legislation.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-2">4. Contacting Our Data Privacy Officer</h2>
          <p>
            If you have questions regarding this Privacy Policy, contact our compliance team at <span className="text-gold-400">{COMPANY_INFO.email}</span> or by mail at {COMPANY_INFO.address}.
          </p>
        </div>
      </div>
    </div>
  );
};
