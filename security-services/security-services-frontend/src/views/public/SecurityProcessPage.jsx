'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileSearch,
  Scan,
  ShieldAlert,
  FileCheck,
  Users,
  Cctv,
  TrendingUp,
  ArrowDown,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export const SecurityProcessPage = () => {
  const steps = [
    {
      step: '01',
      name: 'Requirement',
      icon: FileSearch,
      desc: 'We conduct an intake interview with your facilities and executive leadership to understand asset values, daily footfall, shifts, and specific risk concerns.',
      deliverables: ['Intake Questionnaire', 'Threat Scope Matrix', 'Budget & Staffing Guidelines']
    },
    {
      step: '02',
      name: 'Site Assessment',
      icon: Scan,
      desc: 'Senior security engineers walk your property to inspect access points, fence lines, blind spots in CCTV coverage, lighting adequacy, and key management locks.',
      deliverables: ['Perimeter Survey Blueprint', 'Lighting & Blindspot Map', 'Access Control Check']
    },
    {
      step: '03',
      name: 'Risk Analysis',
      icon: ShieldAlert,
      desc: 'We calculate threat probability vs vulnerability impact across potential scenarios: unauthorized trespass, intellectual property theft, crowd surge, and fire emergencies.',
      deliverables: ['Vulnerability Scoring Index', 'Threat Likelihood Matrix', 'Mitigation Priority List']
    },
    {
      step: '04',
      name: 'Security Planning',
      icon: FileCheck,
      desc: 'Formulation of bespoke Post Orders. We document standard guard duties, access authorization badges, emergency response steps, and escalation chains.',
      deliverables: ['Official Standard Operating Manual (SOP)', 'Guard Post Orders', 'Emergency Call Trees']
    },
    {
      step: '05',
      name: 'Deployment',
      icon: Users,
      desc: 'Assignment of vetted, certified personnel who undergo on-site orientation, uniform inspection, radio check-in, and equipment calibration before the initial shift.',
      deliverables: ['Officer Badge Credentials', 'Shift Schedule Roster', 'Guard Tour Wanding Setup']
    },
    {
      step: '06',
      name: 'Monitoring',
      icon: Cctv,
      desc: 'Live 24/7 Operations Command oversight. Officers check in digitally at predetermined GPS wanding points. Roving supervisors perform unannounced audits.',
      deliverables: ['Daily Digital Incident Logs', 'Real-time GPS Checkpoint Reports', 'Supervisor Audit Sheets']
    },
    {
      step: '07',
      name: 'Continuous Improvement',
      icon: TrendingUp,
      desc: 'Quarterly review meetings with your facility managers. We assess incident trends, test active emergency drills, and refine guard orders as your operations grow.',
      deliverables: ['Quarterly Performance Review (QPR)', 'Refresher Drill Certifications', 'SLA Optimization Updates']
    },
  ];

  return (
    <div className="space-y-20 py-12 lg:py-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-3">
          Proven Methodological Rigor
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
          The 7-Phase Security Delivery Process
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          How we transform abstract security requirements into an airtight, disciplined, and monitored physical defense reality.
        </p>
      </section>

      {/* Vertical Interactive Stepper */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative space-y-12">
          {/* Vertical connecting line */}
          <div className="hidden sm:block absolute top-6 bottom-6 left-8 w-0.5 bg-gradient-to-b from-gold-500 via-slate-700 to-emerald-500" />

          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="relative flex flex-col sm:flex-row items-start gap-6">
                {/* Node circle */}
                <div className="w-16 h-16 rounded-2xl bg-navy-900 border-2 border-gold-500 flex items-center justify-center text-gold-400 font-extrabold text-base shrink-0 shadow-gold-glow z-10">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Content Card */}
                <div className="flex-1 p-6 sm:p-8 rounded-3xl bg-navy-900 border border-slate-800 shadow-card">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
                      Phase {s.step}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Step {idx + 1} of 7</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{s.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">{s.desc}</p>

                  <div className="pt-4 border-t border-slate-800/80">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Key Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {s.deliverables.map((del, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-navy-950 border border-slate-700/60 text-xs text-slate-300 font-medium"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                          <span>{del}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-navy-900 border border-gold-500/40 text-center shadow-elevated">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Initiate Phase 01: Request Your Site Assessment
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Our assessment team is available across regional hubs to begin surveying your facilities within 48 hours.
          </p>
          <Link href="/request-quote">
            <Button size="lg" variant="primary" className="shadow-gold-glow">
              Begin Assessment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
