'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Clock,
  Award,
  Users,
  Building2,
  ChevronRight,
  ArrowRight,
  Calculator,
  Lock,
  Radio,
  FileCheck
} from 'lucide-react';
import { Hero } from '../../components/public/Hero';
import { ServiceCard } from '../../components/public/ServiceCard';
import { TestimonialCard } from '../../components/public/TestimonialCard';
import { FAQAccordion } from '../../components/public/FAQAccordion';
import { ContactForm } from '../../components/public/ContactForm';
import { Button } from '../../components/common/Button';
import { publicService } from '../../services/publicService';
import { MOCK_SERVICES, MOCK_TESTIMONIALS, MOCK_FAQS } from '../../utils/mockData';

export const HomePage = () => {
  const [featuredServices, setFeaturedServices] = useState(MOCK_SERVICES.slice(0, 3));
  const [testimonials, setTestimonials] = useState(MOCK_TESTIMONIALS.slice(0, 3));
  const [faqs, setFaqs] = useState(MOCK_FAQS.slice(0, 5));

  useEffect(() => {
    publicService.getFeaturedServices()
      .then((data) => {
        if (data && data.length > 0) setFeaturedServices(data.slice(0, 3));
      })
      .catch(() => {});

    publicService.getTestimonials()
      .then((data) => {
        if (data && data.length > 0) setTestimonials(data.slice(0, 3));
      })
      .catch(() => {});

    publicService.getFaqs()
      .then((data) => {
        if (data && data.length > 0) setFaqs(data.slice(0, 5));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-10 sm:space-y-14 pb-16">
      {/* 1. Hero Section with Call to Actions & Metrics */}
      <Hero />

      {/* 4. Why Choose Us: Corporate Value Pillars */}
      <section className="bg-white py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-2">
              The ABC Security Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why Corporate Organizations Choose ABC Security
            </h2>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              We deploy tactically certified, background-scrutinized security professionals supported by real-time GPS patrol telemetry and 24/7 command center supervision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-hover-effect cursor-pointer p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition-all flex flex-col justify-between shadow-sm group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-gold-400 uppercase tracking-wider block">Pillar 01</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors">120-Hour Tactical Academy</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every officer graduates from our rigorous tactical curriculum covering de-escalation, active defense, CPR/AED, and hospitality.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
                10-Year Background Scrutiny
              </div>
            </div>

            <div className="card-hover-effect cursor-pointer p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition-all flex flex-col justify-between shadow-sm group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Radio className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Pillar 02</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">24/7 Live GPS Command Roving</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Electronic checkpoint wanding guarantees on-time rounds. Field supervisors conduct surprise post audits around the clock.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
                Live Telemetry & Field Audits
              </div>
            </div>

            <div className="card-hover-effect cursor-pointer p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition-all flex flex-col justify-between shadow-sm group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Pillar 03</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">Custom Post Orders & SOPs</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Facility-tailored operating procedures formulated for your turnstiles, loading bays, and emergency evacuation protocols.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
                Building-Specific Protocols
              </div>
            </div>

            <div className="card-hover-effect cursor-pointer p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition-all flex flex-col justify-between shadow-sm group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">Pillar 04</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">Guaranteed Post Fill & SLA</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Never face an uncovered shift. Reserve standby units dispatch replacements within 45 minutes with zero disruption.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
                45-Minute Rapid Relief SLA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Security Process (Visual Roadmap) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-2">
            Systematic Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our 7-Step Security Delivery Process
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            From initial threat assessment to continuous operational enhancement.
          </p>
        </div>

        {/* Continuous Process Chain Rail */}
        <div className="relative">
          {/* Connecting track passing behind nodes on desktop */}
          <div className="hidden lg:block absolute top-7 left-10 right-10 h-0.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 z-0 opacity-75" />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center relative z-10">
            {[
              { step: '01', title: 'Requirement', desc: 'Consultation & intake' },
              { step: '02', title: 'Site Assessment', desc: 'On-site perimeter survey' },
              { step: '03', title: 'Risk Analysis', desc: 'Vulnerability indexing' },
              { step: '04', title: 'Security Plan', desc: 'Post order formulation' },
              { step: '05', title: 'Deployment', desc: 'Officer staffing & post' },
              { step: '06', title: 'Monitoring', desc: '24/7 Command oversight' },
              { step: '07', title: 'Improvement', desc: 'Quarterly review drills' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="card-hover-effect cursor-pointer group p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-start relative hover:border-amber-400 transition-all min-h-[145px]"
              >
                {/* Chain Node Link */}
                <div className="w-8 h-8 rounded-full bg-amber-50 border-2 border-amber-400 text-amber-700 font-black text-xs flex items-center justify-center mb-2.5 shadow-xs group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 group-hover:scale-110 transition-all z-10">
                  {item.step}
                </div>

                <h4 className="text-xs sm:text-[13px] font-bold text-[#0F172A] group-hover:text-amber-700 transition-colors leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#475569] mt-1.5 leading-snug">
                  {item.desc}
                </p>

                {/* Interlocking Chain Connector Arrow between cards */}
                {idx < 6 && (
                  <div className="hidden lg:flex absolute -right-2.5 top-7 -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-white border border-amber-300 shadow-xs items-center justify-center text-amber-600 group-hover:scale-110 group-hover:bg-amber-50 transition-all">
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Security Services Overview (replaces Industries) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-2">
              Our Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Elite Security Services & Solutions
            </h2>
          </div>
          <Link href="/services">
            <Button variant="outline" size="sm" icon={Shield}>
              View All 13 Services &rarr;
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.slice(0, 3).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>


      {/* 8. Interactive FAQ Preview */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-2">
            Frequently Answered
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Security Contracting FAQs
          </h2>
        </div>
        <FAQAccordion faqs={faqs} />
        <div className="text-center mt-8">
          <Link href="/contact#faq" className="text-xs font-bold text-gold-400 hover:underline">
            Have more questions? Browse Full Knowledgebase &rarr;
          </Link>
        </div>
      </section>

      {/* 9. Client Testimonials / Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-2">
            Client Endorsements
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Facility Directors & C-Suite Executives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </section>

      {/* 10. Request Quote CTA Callout & Contact Form Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Direct Quote Callout */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-navy-900 via-navy-850 to-navy-900 border border-gold-500/40 shadow-elevated flex flex-col justify-between card-hover-effect">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-500/10 text-gold-400 border border-gold-500/30 uppercase tracking-wider inline-block mb-4">
                Fast Turnaround
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
                Need a Customized Security Proposal for Your Property?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Fill out our detailed quote request form with your guard count, location, and operational schedule to receive a binding proposal and free vulnerability audit.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 mb-8">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Transparent billing with zero hidden equipment charges</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Licensed, bonded, and verified guard placement within 48 hours</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dedicated operations commander assigned to your account</span>
                </div>
              </div>
            </div>

            <Link href="/request-quote">
              <Button size="lg" variant="primary" icon={Calculator} className="w-full shadow-gold-glow">
                Go to Detailed Quote Calculator
              </Button>
            </Link>
          </div>

          {/* Right Column: Quick Contact Form */}
          <div className="p-8 sm:p-10 rounded-3xl bg-navy-900 border border-slate-800 shadow-card card-hover-effect">
            <h3 className="text-xl font-bold text-white mb-2">Send an Instant Message</h3>
            <p className="text-xs text-slate-400 mb-6">
              Have a general inquiry or need rapid consultation? Leave a message below.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};
