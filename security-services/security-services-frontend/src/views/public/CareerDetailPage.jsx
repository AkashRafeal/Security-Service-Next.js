'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { publicService } from '../../services/publicService';
import { Loader } from '../../components/common/Loader';
import { JobApplicationForm } from '../../components/public/JobApplicationForm';
import { Briefcase, MapPin, IndianRupee, Calendar, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const CareerDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    publicService.getJobById(id)
      .then(setJob)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader fullScreen message="Loading position description..." />;

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Position Not Found</h2>
        <Link href="/careers" className="text-gold-400 font-bold underline">
          Return to Careers Directory
        </Link>
      </div>
    );
  }

  let responsibilities = [];
  let requirements = [];
  try { if (job.responsibilitiesJson) responsibilities = JSON.parse(job.responsibilitiesJson); } catch (e) {}
  try { if (job.requirementsJson) requirements = JSON.parse(job.requirementsJson); } catch (e) {}

  return (
    <div className="space-y-16 py-12 lg:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-gold-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Openings</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {job.employmentType}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-gold-400" />
            {job.location}
          </span>
          {job.salaryRange && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <IndianRupee className="w-3.5 h-3.5" />
              {job.salaryRange ? job.salaryRange.replace(/\$/g, '₹') : ''}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          {job.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Job Details */}
        <div className="lg:col-span-7 space-y-10">
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Position Overview</h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {responsibilities.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Core Operational Responsibilities</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {requirements.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Candidate Requirements & Qualifications</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-gold-400 font-bold">&bull;</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: Interactive Application Form */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-navy-900 border border-slate-800 shadow-elevated card-hover-effect">
          <h3 className="text-lg font-bold text-white mb-1">Apply for this Role</h3>
          <p className="text-xs text-slate-400 mb-6">
            Upload your resume and license details to fast-track your review.
          </p>
          <JobApplicationForm jobPostId={job.id} jobTitle={job.title} />
        </div>
      </div>
    </div>
  );
};
