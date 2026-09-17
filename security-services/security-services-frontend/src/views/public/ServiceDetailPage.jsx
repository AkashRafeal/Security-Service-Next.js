'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Shield, CheckCircle2, Calculator, PhoneCall, Award, Layers, Clock, Radio, ShieldCheck } from 'lucide-react';
import { publicService } from '../../services/publicService';
import { FAQAccordion } from '../../components/public/FAQAccordion';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { getServiceImage, handleImageError, DEFAULT_FALLBACK_IMAGE } from '../../utils/imageHelper';

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    publicService.getServiceBySlug(slug)
      .then(setService)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <Loader fullScreen message="Loading service dossier..." />;
  }

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Service Not Found</h2>
        <p className="text-sm text-slate-400 mb-6">The requested security capability does not exist or has been archived.</p>
        <Link href="/services">
          <Button variant="primary" size="md">Return to Services Directory</Button>
        </Link>
      </div>
    );
  }

  let features = [];
  let benefits = [];
  let processSteps = [];
  let faqs = [];

  try { if (service.featuresJson) features = JSON.parse(service.featuresJson); } catch (e) {}
  try { if (service.benefitsJson) benefits = JSON.parse(service.benefitsJson); } catch (e) {}
  try { if (service.processJson) processSteps = JSON.parse(service.processJson); } catch (e) {}
  try { if (service.faqJson) faqs = JSON.parse(service.faqJson); } catch (e) {}

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header with Prominent Showcase Image & Tactical Ribbon */}
      <section className="relative bg-navy-900 border-b border-slate-800 py-10 sm:py-12 lg:py-14 overflow-hidden">
        {/* Subtle Ambient Background */}
        <div className="absolute inset-0 z-0 opacity-15">
          <img
            src={getServiceImage(service)}
            alt=""
            onError={(e) => handleImageError(e, DEFAULT_FALLBACK_IMAGE)}
            className="w-full h-full object-cover filter brightness-50 blur-sm"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              {service.categoryName && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-500/10 text-gold-400 border border-gold-500/30 uppercase tracking-widest inline-block mb-3">
                  {service.categoryName}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {service.name}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                {service.shortDescription}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href={`/request-quote?service=${encodeURIComponent(service.name)}`}>
                  <Button size="lg" variant="primary" icon={Calculator} className="shadow-gold-glow">
                    Request Quotation for {service.name}
                  </Button>
                </Link>
                <a href="tel:+18008264827">
                  <Button size="lg" variant="secondary" icon={PhoneCall}>
                    Speak to Operations
                  </Button>
                </a>
              </div>
            </div>

            {/* Right: Prominent High-Resolution Service Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-navy-950 group h-64 sm:h-80 lg:h-[320px]">
                <img
                  src={getServiceImage(service)}
                  alt={service.name}
                  onError={(e) => handleImageError(e, DEFAULT_FALLBACK_IMAGE)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Clean image with full clarity */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-navy-950/90 backdrop-blur-md text-gold-400 border border-gold-500/40 truncate">
                    {service.name}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active Standard
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Operational Intelligence Ribbon */}
          <div className="mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Compliance</span>
                <span className="text-white font-semibold">ISO 9001 Certified</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Lead Time</span>
                <span className="text-white font-semibold">24 - 48h Deployment</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Dispatch</span>
                <span className="text-white font-semibold">24/7 SOC Command</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Personnel</span>
                <span className="text-white font-semibold">100% Vetted Guards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left 2 Cols: Details, Features, Benefits, Process */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Operational Overview</h2>
              <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-4">
                <p>{service.description || service.shortDescription}</p>
              </div>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Key Tactical Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feat, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-navy-900 border border-slate-800 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {benefits.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Organizational Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((ben, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-navy-900 border border-slate-800 flex items-start gap-3">
                      <Award className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200">{ben}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Process Steps */}
            {processSteps.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Deployment Protocol</h3>
                <div className="space-y-3">
                  {processSteps.map((step, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-navy-900 border border-slate-800 flex items-center gap-4">
                      <span className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-slate-200 font-semibold">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {faqs.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h3>
                <FAQAccordion
                  faqs={faqs.map((f, i) => ({ id: i, question: f.q, answer: f.a }))}
                />
              </div>
            )}
          </div>

          {/* Right Col: Service Sidebar Card */}
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Quick Summary Card */}
            <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 shadow-elevated space-y-5">
              <h4 className="text-base font-bold text-white pb-3 border-b border-slate-800">
                Deployment Specifications
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Typical Deployment Lead Time:</span>
                  <span className="text-white font-semibold">24 - 48 Hours</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Guarding Coverage:</span>
                  <span className="text-white font-semibold">24/7/365 or Custom Shift Orders</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Supervision:</span>
                  <span className="text-white font-semibold">GPS Patrol Wanding + Roving Commander</span>
                </div>
                {service.targetIndustries && (
                  <div>
                    <span className="text-slate-400 block">Recommended For:</span>
                    <span className="text-gold-400 font-medium">{service.targetIndustries}</span>
                  </div>
                )}
              </div>

              <Link href={`/request-quote?service=${encodeURIComponent(service.name)}`} className="block">
                <Button variant="primary" size="md" className="w-full shadow-gold-glow">
                  Request Quotation
                </Button>
              </Link>
            </div>

            {/* Need Immediate Help */}
            <div className="p-6 rounded-2xl bg-navy-850 border border-slate-800 text-center space-y-3">
              <PhoneCall className="w-8 h-8 text-gold-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">24/7 Dispatch Desk</h4>
              <p className="text-xs text-slate-400">Speak directly with an operations supervisor for urgent requirements.</p>
              <a
                href="tel:+18008264827"
                className="text-sm font-extrabold text-gold-400 block hover:underline"
              >
                +1 (800) 826-4827
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
