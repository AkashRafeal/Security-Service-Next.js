'use client';

import React from 'react';
import Link from 'next/link';
import { FolderKanban, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { handleImageError } from '../../utils/imageHelper';

export const ProjectCard = ({ project }) => {
  return (
    <div className="group rounded-2xl bg-navy-900 border border-slate-800 hover:border-gold-500/50 transition-all duration-300 overflow-hidden flex flex-col shadow-card hover:shadow-elevated hover:-translate-y-1">
      <div className="relative h-48 w-full overflow-hidden bg-navy-950">
        <img
          src={project.featuredImageUrl || '/images/hero_command_center.jpg'}
          alt={project.title}
          onError={(e) => handleImageError(e, '/images/hero_command_center.jpg')}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-navy-950/80 backdrop-blur-md text-gold-400 border border-gold-500/30">
          {project.clientType || 'Case Study'}
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <MapPin className="w-3.5 h-3.5 text-gold-400" />
          <span>{project.location}</span>
          <span className="text-slate-600">&bull;</span>
          <span className="font-medium text-slate-300">{project.clientName}</span>
        </div>

        <h3 className="text-base font-bold text-white group-hover:text-gold-400 transition-colors mb-3 line-clamp-2">
          {project.title}
        </h3>

        <div className="text-xs text-slate-400 space-y-2 mb-5 flex-grow">
          <p className="line-clamp-2">
            <span className="font-semibold text-slate-300">Challenge: </span>
            {project.securityRequirement}
          </p>
          <p className="line-clamp-2 text-emerald-400/90 font-medium">
            <span className="font-semibold text-emerald-400">Result: </span>
            {project.results}
          </p>
        </div>

        <Link
          href={`/projects/${project.id || project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 hover:text-gold-300 mt-auto"
        >
          <span>Read Full Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
