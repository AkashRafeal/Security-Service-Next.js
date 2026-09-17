'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, ArrowRight } from 'lucide-react';
import { getIndustryImage, handleImageError } from '../../utils/imageHelper';

export const IndustryCard = ({ industry }) => {
  const imgSrc = getIndustryImage(industry);

  return (
    <div className="group rounded-2xl bg-navy-900 border border-slate-800 hover:border-gold-500/50 transition-all duration-300 overflow-hidden flex flex-col shadow-card hover:shadow-elevated hover:-translate-y-1">
      <div className="relative h-44 w-full overflow-hidden bg-navy-950">
        <img
          src={imgSrc}
          alt={industry.name}
          onError={(e) => handleImageError(e, '/images/hero_command_center.jpg')}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/20">
            <Building2 className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-gold-400 transition-colors">
            {industry.name}
          </h3>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4 flex-grow">
          {industry.shortDescription}
        </p>

        <Link
          href={`/industries#${industry.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 mt-auto"
        >
          <span>Explore Solutions</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default IndustryCard;
