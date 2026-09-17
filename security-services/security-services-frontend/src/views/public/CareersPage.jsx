'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { publicService } from '../../services/publicService';
import { Loader } from '../../components/common/Loader';
import { Button } from '../../components/common/Button';
import { Briefcase, MapPin, IndianRupee, Clock, ArrowRight, ShieldCheck, Award } from 'lucide-react';

export const CareersPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicService.getJobs()
      .then((data) => setJobs(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-20 py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="text-center">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-3">
          Join the Elite Corps
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto">
          Careers & Guard Academy Opportunities
        </h1>
        <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Build a rewarding, respected career in corporate protection, tactical convoy operations, and electronic surveillance with industry-leading benefits and clear advancement.
        </p>
      </section>

      {/* Academy Benefits */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group p-6 rounded-2xl bg-navy-900 border border-slate-800 shadow-card card-hover-effect">
          <Award className="w-8 h-8 text-gold-400 mb-4 group-hover:scale-110 group-hover:text-gold-500 transition-transform duration-300" />
          <h3 className="text-base font-bold text-white mb-2 group-hover:text-gold-600 transition-colors">Paid 120-Hour Academy</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Receive full hourly pay while training in modern tactical defensive maneuvers, customer engagement, and state guard certifications.
          </p>
        </div>
        <div className="group p-6 rounded-2xl bg-navy-900 border border-slate-800 shadow-card card-hover-effect">
          <ShieldCheck className="w-8 h-8 text-gold-400 mb-4 group-hover:scale-110 group-hover:text-gold-500 transition-transform duration-300" />
          <h3 className="text-base font-bold text-white mb-2 group-hover:text-gold-600 transition-colors">Health, Dental & 401(k)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Comprehensive medical coverage, dental, vision, life insurance, and 401(k) retirement matching for full-time personnel.
          </p>
        </div>
        <div className="group p-6 rounded-2xl bg-navy-900 border border-slate-800 shadow-card card-hover-effect">
          <Clock className="w-8 h-8 text-gold-400 mb-4 group-hover:scale-110 group-hover:text-gold-500 transition-transform duration-300" />
          <h3 className="text-base font-bold text-white mb-2 group-hover:text-gold-600 transition-colors">Promote-from-Within Culture</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Over 85% of our field supervisors, commanders, and dispatch directors began their journey as uniformed security officers.
          </p>
        </div>
      </section>

      {/* Open Positions List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h2 className="text-2xl font-bold text-white">Current Open Positions ({jobs.length})</h2>
          <span className="text-xs text-slate-400">Applications reviewed daily</span>
        </div>

        {loading ? (
          <Loader message="Loading available positions..." />
        ) : jobs.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-12">No current job openings. Check back soon!</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="group p-6 rounded-2xl bg-navy-900 border border-slate-800 shadow-card card-hover-effect flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-gold-600 transition-colors">{job.title}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {job.employmentType}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gold-400" />
                      {job.location}
                    </span>
                    {job.salaryRange && (
                      <span className="flex items-center gap-1 text-slate-300 font-medium">
                        <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                        {job.salaryRange ? job.salaryRange.replace(/\$/g, '₹') : ''}
                      </span>
                    )}
                    {job.experienceRequired && (
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                        {job.experienceRequired}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 max-w-2xl pt-1">
                    {job.description}
                  </p>
                </div>

                <div className="shrink-0">
                  <Link href={`/careers/${job.id}`}>
                    <Button variant="primary" size="md" icon={ArrowRight}>
                      View Role & Apply
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
