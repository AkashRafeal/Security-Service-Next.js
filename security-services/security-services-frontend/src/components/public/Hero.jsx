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
    <section className="relative overflow-hidden bg-white pt-4 sm:pt-5 lg:pt-6 pb-6 sm:pb-8">

      <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
          {/* Left Column: Mission, Headline & Conversion Controls */}
          <div className="lg:col-span-5 space-y-5 text-left">
            {/* Certification & Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-[11px] sm:text-xs font-semibold shadow-sm"
            >
              <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>ISO 9001 & 27001 Certified | Licensed & Bonded Armed Corps</span>
            </motion.div>

            {/* Main Command Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-[2.65rem] font-black tracking-tight leading-tight hero-main-title text-[#0F172A]"
              style={{ color: '#0F172A' }}
            >
              <span className="text-[#0F172A] block font-black" style={{ color: '#0F172A' }}>
                Professional Security Services
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 font-black block">
                You Can Trust
              </span>
            </motion.h1>

            {/* Concise Mission Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs sm:text-sm text-[#334155] max-w-lg leading-relaxed font-semibold"
              style={{ color: '#334155' }}
            >
              Protecting corporate headquarters, public facilities, industrial complexes, and VIP principals with tactical discipline, vetted personnel, and 24/7 central dispatch.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-2.5 pt-1"
            >
              <Link href="/request-quote">
                <Button size="sm" variant="primary" className="shadow-md text-xs px-4 py-2 font-bold">
                  Get a Free Quote
                </Button>
              </Link>
              <Link href="/services">
                <Button size="sm" variant="secondary" icon={Shield} className="btn-secondary text-xs px-4 py-2 font-bold shadow-sm">
                  Our Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="sm" variant="outline" icon={PhoneCall} className="text-xs px-4 py-2 border-amber-600 text-amber-700 hover:bg-amber-50 font-bold">
                  Contact Dispatch
                </Button>
              </Link>
            </motion.div>

            {/* Live Operational Metrics in Compact Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5"
            >
              <div className="bg-white rounded-xl p-3 border border-slate-200 text-center shadow-sm">
                <span className="block text-lg sm:text-xl font-extrabold text-amber-600">24/7/365</span>
                <span className="text-[11px] font-bold text-[#334155] mt-0.5 block" style={{ color: '#334155' }}>Command Dispatch</span>
              </div>
              <div className="bg-white rounded-xl p-3 border border-slate-200 text-center shadow-sm">
                <span className="block text-lg sm:text-xl font-extrabold text-amber-600">99.8%</span>
                <span className="text-[11px] font-bold text-[#334155] mt-0.5 block" style={{ color: '#334155' }}>Client Retention</span>
              </div>
              <div className="bg-white rounded-xl p-3 border border-slate-200 text-center shadow-sm">
                <span className="block text-lg sm:text-xl font-extrabold text-amber-600">1,500+</span>
                <span className="text-[11px] font-bold text-[#334155] mt-0.5 block" style={{ color: '#334155' }}>Vetted Guards</span>
              </div>
              <div className="bg-white rounded-xl p-3 border border-slate-200 text-center shadow-sm">
                <span className="block text-lg sm:text-xl font-extrabold text-amber-600">20+ Yrs</span>
                <span className="text-[11px] font-bold text-[#334155] mt-0.5 block" style={{ color: '#334155' }}>Experience</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: React Bits Showcase - balanced alignment with left column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 w-full flex flex-col justify-center items-center"
          >
            {/* ScrollStack View Container - wide landscape rectangular showcase */}
            <div className="relative w-full h-[450px] sm:h-[465px] flex items-start justify-center bg-transparent px-0 sm:px-1">
              <ScrollStack
                autoPlay={true}
                autoPlayInterval={5000}
                pauseOnHover={true}
                className="w-full h-full flex items-start justify-center"
              >
                {TACTICAL_DIVISIONS.map((item) => (
                  <ScrollStackItem
                    key={item.id}
                    className={`relative w-full h-[405px] sm:h-[420px] overflow-hidden rounded-2xl border ${item.borderClass} bg-white shadow-xl p-3.5 sm:p-4 flex flex-col justify-end group`}
                  >
                    {/* Background Photo - 100% full clarity, zero white wash */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />

                    {/* Floating Bottom Card - Translucent frosted glass effect */}
                    <div className="relative z-10 w-full bg-white/75 backdrop-blur-md rounded-xl p-3 sm:p-3.5 border border-white/60 shadow-lg">
                      <div className="space-y-0.5 pb-2">
                        <h3
                          className="text-sm sm:text-base font-bold text-[#0F172A] transition-colors tracking-tight"
                          style={{ color: '#0F172A' }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="text-[11.5px] sm:text-xs text-[#334155] leading-relaxed max-w-lg font-medium line-clamp-2"
                          style={{ color: '#334155' }}
                        >
                          {item.desc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1.5">
                        <div className="flex flex-wrap items-center gap-1">
                          {item.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-md text-[10px] sm:text-[10.5px] font-semibold whitespace-nowrap border border-slate-200/70 bg-white/65 text-[#334155]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action controls: Explore button */}
                        <div className="flex items-center gap-1 shrink-0 ml-auto">
                          <Link
                            href={item.link}
                            className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors px-2.5 py-1 rounded-lg border shrink-0 whitespace-nowrap shadow-sm ${item.accentClass || 'text-amber-700 bg-amber-50 border-amber-300'}`}
                          >
                            <span>Explore</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </ScrollStackItem>
                ))}
              </ScrollStack>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
