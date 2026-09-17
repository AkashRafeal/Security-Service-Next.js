'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { getServiceImage, handleImageError, DEFAULT_FALLBACK_IMAGE } from '../../utils/imageHelper';

export const ServiceCard = ({ service }) => {
  let features = [];
  if (service.featuresJson) {
    try {
      features = JSON.parse(service.featuresJson);
    } catch (e) {
      features = [];
    }
  }

  const imgSrc = getServiceImage(service);

  return (
    <div className="group rounded-2xl bg-navy-900 border border-slate-800 hover:border-gold-500/50 transition-all duration-300 overflow-hidden flex flex-col shadow-card hover:shadow-elevated hover:-translate-y-1">
      {/* Service Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-navy-950">
        <img
          src={imgSrc}
          alt={service.name}
          onError={(e) => handleImageError(e, DEFAULT_FALLBACK_IMAGE)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {service.categoryName && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-navy-950/80 backdrop-blur-md text-gold-400 border border-gold-500/30">
            {service.categoryName}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/20">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-gold-400 transition-colors">
            {service.name}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4 flex-grow">
          {service.shortDescription}
        </p>

        {/* Feature Highlights */}
        {features && features.length > 0 && (
          <div className="space-y-1.5 mb-6 pt-4 border-t border-slate-800/80">
            {features.slice(0, 2).map((f, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span className="truncate">{f}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-2 flex items-center justify-between mt-auto">
          <Link
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 hover:text-gold-300 transition-colors"
          >
            <span>Learn Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/request-quote"
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-navy-800 hover:bg-navy-700 transition-colors border border-slate-700/60"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
