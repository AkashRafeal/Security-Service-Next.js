'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Award, PhoneCall, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import ScrollStack, { ScrollStackItem } from '../common/ScrollStack';

const TACTICAL_DIVISIONS = [
  {
    id: '01',
    badge: 'Perimeter Defense',
    title: 'Access Control & Gates',
    titleColor: 'text-slate-900',
    desc: 'Biometric authorization turnstiles, vehicle barrier gates, visitor logging kiosks, and contraband screening checkpoints.',
    image: '/images/service_campus_school.jpg',
    tags: ['Biometrics', 'Barrier Arms', 'Visitor Logs'],
    link: '/services',
    borderClass: 'border-slate-200 hover:border-slate-300',
    accentClass: 'text-amber-700 border-amber-300 bg-amber-50 hover:bg-amber-100'
  },
  {
    id: '02',
    badge: 'Executive Detail',
    title: 'VIP & Close Protection',
    titleColor: 'text-slate-900',
    desc: 'Low-profile tactical bodyguards, defensive motorcade drivers, and advance route scouts protecting executives and dignitaries.',
    image: '/images/hero_executive_protection.jpg',
    tags: ['Threat Scouting', 'Evasive Convoy', 'Close Escort'],
    link: '/services',
    borderClass: 'border-slate-200 hover:border-slate-300',
    accentClass: 'text-amber-700 border-amber-300 bg-amber-50 hover:bg-amber-100'
  },
  {
    id: '03',
    badge: 'Command & Control',
    title: '24/7 Surveillance Hub',
    titleColor: 'text-slate-900',
    desc: 'Round-the-clock video management room with automated AI intrusion detection and instantaneous field officer dispatching.',
    image: '/images/hero_command_center.jpg',
    tags: ['AI Tripwires', 'Instant Dispatch', '100% Redundant'],
    link: '/services',
    borderClass: 'border-slate-200 hover:border-slate-300',
    accentClass: 'text-amber-700 border-amber-300 bg-amber-50 hover:bg-amber-100'
  },
  {
    id: '04',
    badge: 'Static Guard Corps',
    title: 'Armed & Unarmed Officers',
    titleColor: 'text-slate-900',
    desc: 'Vetted, licensed security officers stationed at corporate turnstiles, loading docks, and facilities with 100% vigilance.',
    image: '/images/hero_security_officer.jpg',
    tags: ['120h Academy', 'De-escalation', 'Discreet Post'],
    link: '/services',
    borderClass: 'border-slate-200 hover:border-slate-300',
    accentClass: 'text-amber-700 border-amber-300 bg-amber-50 hover:bg-amber-100'
  },
  {
    id: '05',
    badge: 'Patrol Division',
    title: 'Tactical Armed Patrols',
    titleColor: 'text-slate-900',
    desc: 'Rapid-response mobile interceptors conducting randomized perimeter sweeps with real-time GPS telemetry and incident logging.',
    image: '/images/hero_tactical_patrol.jpg',
    tags: ['Armored Fleet', 'Rapid Interdiction', 'GPS Geo-Fence'],
    link: '/services',
    borderClass: 'border-slate-200 hover:border-slate-300',
    accentClass: 'text-amber-700 border-amber-300 bg-amber-50 hover:bg-amber-100'
  }
];

export const Hero = () => {

  return (
    <section className="relative overflow-hidden bg-white pt-3 sm:pt-5 lg:pt-6 pb-2 sm:pb-6">

      <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 items-center">
          {/* Left Column: Mission, Headline & Conversion Controls */}
          <div className="lg:col-span-5 space-y-5 text-left">
            {/* Certification & Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[11px] sm:text-xs font-semibold shadow-sm">
              <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>ISO 9001 & 27001 Certified | Licensed & Bonded Armed Corps</span>
            </div>

            {/* Main Command Heading */}
            <h1
              className="text-2xl sm:text-3xl lg:text-[2.65rem] font-black tracking-tight leading-tight hero-main-title text-[#0F172A]"
              style={{ color: '#0F172A' }}
            >
              <span className="text-[#0F172A] block font-black" style={{ color: '#0F172A' }}>
                Professional Security Services
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 font-black block">
                You Can Trust
              </span>
            </h1>

            {/* Concise Mission Subtitle */}
            <p
              className="text-xs sm:text-sm text-[#334155] max-w-lg leading-relaxed font-semibold"
              style={{ color: '#334155' }}
            >
              Protecting corporate headquarters, public facilities, industrial complexes, and VIP principals with tactical discipline, vetted personnel, and 24/7 central dispatch.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Link href="/request-quote" className="flex-1 min-w-[130px] sm:flex-initial">
                <Button size="sm" variant="primary" className="w-full justify-center shadow-md text-xs px-3.5 py-2 font-bold">
                  Get a Free Quote
                </Button>
              </Link>
              <Link href="/services" className="flex-1 min-w-[120px] sm:flex-initial">
                <Button size="sm" variant="secondary" icon={Shield} className="w-full justify-center btn-secondary text-xs px-3.5 py-2 font-bold shadow-xs">
                  Our Services
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="sm" variant="outline" icon={PhoneCall} className="w-full justify-center text-xs px-3.5 py-2 border-amber-600 text-amber-700 hover:bg-amber-50 font-bold">
                  Contact Dispatch
                </Button>
              </Link>
            </div>

            {/* Live Operational Metrics in Compact Grid */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
              <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200 text-center shadow-xs">
                <span className="block text-base sm:text-xl font-extrabold text-amber-600">24/7/365</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#334155] mt-0.5 block leading-tight" style={{ color: '#334155' }}>Command Dispatch</span>
              </div>
              <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200 text-center shadow-xs">
                <span className="block text-base sm:text-xl font-extrabold text-amber-600">99.8%</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#334155] mt-0.5 block leading-tight" style={{ color: '#334155' }}>Client Retention</span>
              </div>
              <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200 text-center shadow-xs">
                <span className="block text-base sm:text-xl font-extrabold text-amber-600">1,500+</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#334155] mt-0.5 block leading-tight" style={{ color: '#334155' }}>Vetted Guards</span>
              </div>
              <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200 text-center shadow-xs">
                <span className="block text-base sm:text-xl font-extrabold text-amber-600">20+ Yrs</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#334155] mt-0.5 block leading-tight" style={{ color: '#334155' }}>Experience</span>
              </div>
            </div>
          </div>

          {/* Right Column: React Bits Showcase */}
          <div className="lg:col-span-7 w-full flex flex-col justify-center items-center">
            {/* ScrollStack View Container - responsive rectangular showcase */}
            <div className="relative w-full h-[375px] sm:h-[435px] lg:h-[455px] flex items-start justify-center bg-transparent px-0 sm:px-1">
              <ScrollStack
                autoPlay={true}
                autoPlayInterval={5000}
                pauseOnHover={true}
                className="w-full h-full flex items-start justify-center"
              >
                {TACTICAL_DIVISIONS.map((item) => (
                  <ScrollStackItem
                    key={item.id}
                    className={`relative w-full h-full overflow-hidden rounded-2xl border ${item.borderClass} bg-white shadow-xl p-2 sm:p-4 flex flex-col justify-end group`}
                  >
                    {/* Background Photo */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />

                    {/* Floating Bottom Card - Translucent frosted glass effect */}
                    <div className="relative z-10 w-full bg-white/90 sm:bg-white/80 backdrop-blur-md rounded-xl p-2 sm:p-3.5 border border-white/70 shadow-lg">
                      <div className="space-y-0.5 pb-1 sm:pb-1.5">
                        <h3
                          className="text-xs sm:text-base font-bold text-[#0F172A] transition-colors tracking-tight truncate"
                          style={{ color: '#0F172A' }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="text-[10.5px] sm:text-xs text-[#334155] leading-snug font-medium line-clamp-1 sm:line-clamp-2"
                          style={{ color: '#334155' }}
                        >
                          {item.desc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-slate-100 sm:border-transparent">
                        <div className="flex flex-wrap items-center gap-1 min-w-0">
                          {item.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className={`px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10.5px] font-semibold whitespace-nowrap border border-slate-200/70 bg-white/80 text-[#334155] ${tIdx > 1 ? 'hidden min-[420px]:inline-block' : 'inline-block'}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action controls: Explore button */}
                        <div className="flex items-center gap-1 shrink-0 ml-auto">
                          <Link
                            href={item.link}
                            className={`inline-flex items-center gap-1 text-[10.5px] sm:text-xs font-bold transition-colors px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border shrink-0 whitespace-nowrap shadow-xs ${item.accentClass || 'text-amber-700 bg-amber-50 border-amber-300'}`}
                          >
                            <span>Explore</span>
                            <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </ScrollStackItem>
                ))}
              </ScrollStack>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
