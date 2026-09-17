'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Building2, Shield, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { publicService } from '../../services/publicService';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';

import { getIndustryImage, handleImageError } from '../../utils/imageHelper';


export const IndustriesPage = () => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicService.getIndustries()
      .then((data) => setIndustries(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-20 py-12 lg:py-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-3">
          Sector-Specific Risk Mitigation
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto">
          Tailored Security Frameworks for 11 Specialized Industries
        </h1>
        <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Every industry carries unique regulatory compliance and threat topologies. Explore how ABC Security engineers defenses for your sector.
        </p>
      </section>

      {/* Industries Detailed Roster */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {loading ? (
          <Loader message="Loading industry profiles..." />
        ) : (
          industries.map((ind, idx) => {
            let needs = [];
            let solutions = [];
            try { if (ind.keySecurityNeedsJson) needs = JSON.parse(ind.keySecurityNeedsJson); } catch (e) {}
            try { if (ind.solutionsJson) solutions = JSON.parse(ind.solutionsJson); } catch (e) {}

            return (
              <div
                key={ind.id || idx}
                id={ind.slug}
                className="scroll-mt-24 p-8 sm:p-10 rounded-3xl bg-navy-900 border border-slate-800 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Image */}
                <div className="lg:col-span-4 relative rounded-2xl overflow-hidden h-64 lg:h-full min-h-[220px] bg-navy-950">
                  <img
                    src={getIndustryImage(ind)}
                    alt={ind.name}
                    onError={(e) => handleImageError(e, '/images/hero_command_center.jpg')}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                </div>

                {/* Details */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/30 flex items-center justify-center font-bold text-xs">
                        0{idx + 1}
                      </span>
                      <h3 className="text-2xl font-bold text-white">{ind.name}</h3>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{ind.description || ind.shortDescription}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                    {/* Security Challenges */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        Critical Vulnerabilities
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {needs.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">&bull;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deployed Solutions */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ABC Deployed Solutions
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {solutions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">&bull;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <Link href={`/request-quote?industry=${encodeURIComponent(ind.name)}`}>
                      <Button size="sm" variant="primary">
                        Request {ind.name} Proposal
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};
