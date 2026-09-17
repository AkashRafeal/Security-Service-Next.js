import React from 'react';
import { Star } from 'lucide-react';
import { handleImageError, DEFAULT_AVATAR_IMAGE } from '../../utils/imageHelper';

export const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="rounded-2xl bg-navy-900 border border-slate-800 p-6 flex flex-col justify-between shadow-card hover:border-gold-500/40 transition-all">
      <div>
        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < (testimonial.rating || 5)
                  ? 'text-gold-400 fill-gold-400'
                  : 'text-slate-600'
              }`}
            />
          ))}
        </div>

        <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
          "{testimonial.review}"
        </p>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
        <img
          src={testimonial.avatarUrl || DEFAULT_AVATAR_IMAGE}
          alt={testimonial.customerName}
          onError={(e) => handleImageError(e, DEFAULT_AVATAR_IMAGE)}
          className="w-11 h-11 rounded-full object-cover border border-slate-700"
        />
        <div>
          <h4 className="text-sm font-bold text-white leading-tight">
            {testimonial.customerName}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {testimonial.designation ? `${testimonial.designation}, ` : ''}
            <span className="text-gold-400/90 font-medium">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
