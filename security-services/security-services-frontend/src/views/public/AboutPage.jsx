'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Award,
  CheckCircle2,
  Users,
  Target,
  Eye,
  Compass,
  ShieldAlert,
  ArrowRight,
  UserCheck,
  Clock,
  Radio,
  FileText,
  AlertOctagon,
  Cctv,
  ShieldCheck,
  CheckCircle,
  FileSearch,
  Scan,
  TrendingUp
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { handleImageError } from '../../utils/imageHelper';

export const AboutPage = () => {
  const whyChooseUsPillars = [
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

  const securityProcessSteps = [
    {
      step: '01',
      name: 'Requirement Intake',
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
      icon: FileText,
      desc: 'Formulation of bespoke Post Orders. We document standard guard duties, access authorization badges, emergency response steps, and escalation chains.',
      deliverables: ['Standard Operating Manual (SOP)', 'Guard Post Orders', 'Emergency Call Trees']
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
      name: 'Monitoring & Telemetry',
      icon: Cctv,
      desc: 'Live 24/7 Operations Command oversight. Officers check in digitally at predetermined GPS wanding points. Roving supervisors perform unannounced audits.',
      deliverables: ['Daily Incident Logs', 'Real-time GPS Checkpoint Reports', 'Supervisor Audit Sheets']
    },
    {
      step: '07',
      name: 'Continuous Improvement',
      icon: TrendingUp,
      desc: 'Quarterly review meetings with your facility managers. We assess incident trends, test active emergency drills, and refine guard orders as your operations grow.',
      deliverables: ['Quarterly Review (QPR)', 'Refresher Drill Certifications', 'SLA Optimization Updates']
    },
  ];
  return (
    <div className="space-y-24 py-12 lg:py-20">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-500/10 text-gold-400 border border-gold-500/30 uppercase tracking-widest inline-block mb-4">
          Corporate & Tactical Heritage
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Elite Protection Since 2004
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Founded by seasoned law enforcement executives and military veterans, ABC Security Services delivers ISO 9001-certified tactical guard forces, electronic intelligence, and threat mitigation.
        </p>
      </section>

      {/* Experience & Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-elevated">
            <img
              src="/images/hero_security_officer.jpg"
              alt="Security Training Academy"
              onError={(e) => handleImageError(e, '/images/hero_security_officer.jpg')}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-panel border border-slate-700/80">
              <span className="text-2xl font-black text-gold-400 block">20+ Years</span>
              <span className="text-xs text-slate-300 font-medium">Protecting High-Threat Corporate & Government Assets</span>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block">
              Our Heritage & Leadership
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              A Company Built by Veterans & Law Enforcement Professionals
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              ABC Security was founded in 2004 by former military commanders who recognized critical flaws in conventional contract guarding: high guard turnover, non-existent post training, and superficial supervision.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              We replaced that outdated model with our 120-hour Tactical Training Academy, live GPS checkpoint tracking, and continuous supervisor audits. Today, we protect over 18 million square feet of commercial property daily.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div>
                <span className="text-2xl font-extrabold text-white">1,500+</span>
                <span className="text-xs text-slate-400 block mt-0.5">Uniformed Officers</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-white">99.8%</span>
                <span className="text-xs text-slate-400 block mt-0.5">SLA Compliance Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Core Values */}
      <section className="bg-navy-900/60 py-20 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-2xl border border-slate-800 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center border border-gold-500/20 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                To provide impenetrable, ethical, and customized security operations that empower our clients to operate freely and fearlessly, protected by elite human vigilance and advanced technology.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-slate-800 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center border border-gold-500/20 mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                To redefine the global security standards by pioneering the seamless convergence of armed physical deterrence and artificial intelligence surveillance telemetry.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-slate-800 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center border border-gold-500/20 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Core Values</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Uncompromising Integrity, Tactical Preparedness, Client Confidentiality, Relentless Vigilance, and Empathy in High-Stress Crisis De-escalation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Standards & Certifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-2">
            Rigorous Credentials
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Certified & Licensed by National Security Authorities
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Every operational protocol complies with international management and cyber-physical security frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'ISO 9001:2015', desc: 'Certified Quality Management in Security Guard Operations & Patrols' },
            { title: 'ISO 27001', desc: 'Certified Information Security for CCTV telemetry & access control' },
            { title: 'PSARA & State Licensed', desc: 'Full federal and state private security agency authorization' },
            { title: 'Comprehensive Fidelity Bond', desc: 'Multi-million dollar general liability and commercial insurance protection' },
          ].map((cert, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-navy-900 border border-slate-800 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 text-gold-400 flex items-center justify-center mb-4 border border-gold-500/30">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{cert.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{cert.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us / The Tactical Advantage */}
      <section id="why-choose-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-2">
            The Tactical Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Corporate Organizations Choose Us
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            From multi-million dollar asset logistics to corporate boardrooms, discover the nine operational pillars that set our security corps apart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUsPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-navy-900 border border-slate-800 hover:border-gold-500/40 transition-all flex flex-col justify-between shadow-card hover:shadow-elevated hover:-translate-y-1"
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

      {/* 7-Phase Security Delivery Process - Timeline Format */}
      <section id="process" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-2">
            Proven Methodological Rigor
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The 7-Phase Security Delivery Process
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            A chronological timeline of how we transform complex corporate requirements into an airtight, disciplined, and monitored physical defense reality.
          </p>
        </div>

        {/* Vertical Interactive Timeline */}
        <div className="relative">
          {/* Glowing Central Spine Line */}
          <div className="absolute top-6 bottom-12 left-6 md:left-1/2 md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-gold-500 via-amber-400 via-50% to-emerald-400 opacity-80" />

          <div className="space-y-12 sm:space-y-16">
            {securityProcessSteps.map((s, idx) => {
              const Icon = s.icon;
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Content Card */}
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:pl-10 text-left' : 'md:pr-10 text-left'}`}>
                    <div className="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-slate-800 hover:border-gold-500/50 transition-all shadow-card hover:shadow-elevated hover:-translate-y-1 group">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-gold-500/10 text-gold-400 border border-gold-500/30 uppercase tracking-widest shadow-sm">
                          Phase {s.step}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 font-semibold">
                          Step {idx + 1} of 7
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 group-hover:text-gold-300 transition-colors">
                        {s.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                        {s.desc}
                      </p>

                      <div className="pt-4 border-t border-slate-800/80">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                          Key Deliverables:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {s.deliverables.map((del, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy-950 border border-slate-700/60 text-xs text-slate-300 font-medium"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                              <span>{del}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Centered Timeline Milestone Node */}
                  <div className="absolute top-6 md:top-auto left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-navy-950 border-2 border-gold-500 flex items-center justify-center text-gold-400 shadow-gold-glow hover:scale-110 transition-transform z-10">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-gold-400" />
                    </div>
                  </div>

                  {/* Balancing Spacer for Desktop */}
                  <div className="hidden md:block md:w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-navy-900 via-navy-850 to-navy-900 border border-gold-500/50 text-center shadow-elevated">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Partner With a Security Provider That Never Blinks
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto mb-8">
            Schedule a complimentary vulnerability audit with our senior security consultants to evaluate gaps in your current perimeter or guard deployment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/request-quote">
              <Button size="lg" variant="primary" className="shadow-gold-glow">
                Schedule Security Audit & Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Talk to Operations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
