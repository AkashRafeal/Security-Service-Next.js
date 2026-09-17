'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  UserCheck,
  Clock,
  Radio,
  FileText,
  AlertOctagon,
  Cctv,
  Award,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export const WhyChooseUsPage = () => {
  const pillars = [
    {
      icon: Award,
      title: 'Trained Security Professionals',
      desc: 'All officers complete mandatory 120-hour tactical academy training in conflict de-escalation, CPR/AED, crowd control, and asset defense before assignment.',
    },
    {
      icon: UserCheck,
      title: 'Comprehensive Background Verification',
      desc: 'Multi-state criminal history, 10-panel drug screens, psychological temperament evaluations, and strict license authentication on every guard.',
    },
    {
      icon: Clock,
      title: '24/7/365 Operational Availability',
      desc: 'Our Central Operations Dispatch Center maintains around-the-clock staffing with live dispatchers and standby tactical backup forces.',
    },
    {
      icon: Radio,
      title: 'Professional Field Supervision',
      desc: 'Roving field supervisors perform unannounced day and night post audits, validating uniform presentation, post order logs, and vigilant focus.',
    },
    {
      icon: FileText,
      title: 'Customized Security Operating Plans',
      desc: 'No generic solutions. We author property-specific Post Orders addressing your access turnstiles, loading bays, key controls, and emergency exits.',
    },
    {
      icon: AlertOctagon,
      title: 'Rapid Emergency Response Guarantee',
      desc: 'Direct priority communications link to local police, fire, and paramedic departments with immediate on-site evacuation lane preservation.',
    },
    {
      icon: Cctv,
      title: 'Technology-Enabled Monitoring',
      desc: 'Real-time GPS patrol wanding checkpoints, digital visitor badging tablets, and automated cloud incident reporting delivered straight to facility managers.',
    },
    {
      icon: ShieldCheck,
      title: 'Continuous Refresher Drills',
      desc: 'Officers undergo mandatory quarterly drills covering active shooter defense, bomb threat containment, industrial fire, and evacuation protocols.',
    },
    {
      icon: CheckCircle,
      title: 'Reliable Operations & Zero Post Vacancy',
      desc: 'Automated scheduling algorithms flag unconfirmed check-ins 30 minutes in advance, guaranteeing immediate relief guard dispatch with 100% post fill.',
    },
  ];

  return (
    <div className="space-y-20 py-12 lg:py-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-3">
          The ABC Security Difference
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
          Nine Reasons Why Leading Enterprises Rely on ABC Security
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          From multi-million dollar asset logistics to corporate boardrooms, discover the operational pillars that set our security corps apart.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-navy-900 border border-slate-800 hover:border-gold-500/40 transition-all flex flex-col justify-between shadow-card"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center border border-gold-500/20 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-800/80 text-[11px] font-bold text-gold-400 uppercase tracking-wider">
                  Pillar 0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-navy-900 border border-gold-500/40 text-center shadow-elevated">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Experience Security Elevated to an Executive Standard
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Get a tailored proposal and schedule an inspection of your property by our operations director.
          </p>
          <Link href="/request-quote">
            <Button size="lg" variant="primary" className="shadow-gold-glow">
              Request Your Proposal
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
