'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { publicService } from '../../services/publicService';
import { Loader } from '../../components/common/Loader';
import { Button } from '../../components/common/Button';
import { handleImageError } from '../../utils/imageHelper';
import { MapPin, Building2, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';

export const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    publicService.getProject(id)
      .then(setProject)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader fullScreen message="Loading case study details..." />;

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Case Study Not Found</h2>
        <Link href="/services">
          <Button variant="primary" size="md">Return to Services Directory</Button>
        </Link>
      </div>
    );
  }

  let galleryImages = [];
  try {
    if (project.galleryUrlsJson) galleryImages = JSON.parse(project.galleryUrlsJson);
  } catch (e) {}

  return (
    <div className="space-y-16 py-12 lg:py-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/services" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-gold-400 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-500/10 text-gold-400 border border-gold-500/30">
              {project.clientType}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              {project.location}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Building2 className="w-3.5 h-3.5 text-gold-400" />
              {project.clientName}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {project.title}
          </h1>
        </div>

        {/* Featured Image */}
        <div className="mt-8 rounded-3xl overflow-hidden border border-slate-800 bg-navy-950 h-80 sm:h-96 w-full shadow-elevated">
          <img
            src={project.featuredImageUrl || '/images/hero_command_center.jpg'}
            alt={project.title}
            onError={(e) => handleImageError(e, '/images/hero_command_center.jpg')}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Challenge, Solution & Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>The Challenge</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.securityRequirement}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-400" />
              <span>Tactical Solution</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.solutionProvided}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Measurable Outcome</span>
            </h3>
            <p className="text-xs text-emerald-300/90 leading-relaxed font-medium">
              {project.results}
            </p>
          </div>
        </div>

        {/* Full Case Study Breakdown */}
        {project.caseStudyContent && (
          <div className="mt-12 p-8 rounded-3xl bg-navy-900 border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white">Full Engagement Narrative</h3>
            <div className="text-sm text-slate-300 leading-relaxed space-y-4 whitespace-pre-line">
              {project.caseStudyContent}
            </div>
          </div>
        )}

        {/* Gallery if present */}
        {galleryImages && galleryImages.length > 0 && (
          <div className="mt-12 space-y-4">
            <h3 className="text-xl font-bold text-white">Operational Photos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-slate-800 h-48 bg-navy-950">
                  <img
                    src={img}
                    alt={`Photo ${i + 1}`}
                    onError={(e) => handleImageError(e, '/images/hero_command_center.jpg')}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-8 rounded-3xl bg-navy-900 border border-gold-500/40 text-center shadow-card mt-12">
          <h3 className="text-xl font-bold text-white mb-2">Face Similar Facility Challenges?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
            Our specialized consulting team can duplicate these defense protocols at your location.
          </p>
          <Link href="/request-quote">
            <Button variant="primary" size="md" className="shadow-gold-glow">
              Request Customized Assessment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
