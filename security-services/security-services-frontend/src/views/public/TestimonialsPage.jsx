'use client';

import React, { useState, useEffect } from 'react';
import { publicService } from '../../services/publicService';
import { TestimonialCard } from '../../components/public/TestimonialCard';
import { Loader } from '../../components/common/Loader';
import { Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../components/common/Button';

export const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicService.getTestimonials()
      .then((data) => setTestimonials(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-20 py-12 lg:py-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-3">
          Client Feedback & Reviews
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto">
          What Facility Directors & Board Members Say About Us
        </h1>
        <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Real feedback from healthcare executives, tech campus facility managers, residential HOA boards, and retail directors.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <Loader message="Loading client reviews..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-navy-900 border border-gold-500/40 shadow-elevated">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Experience the Service Our Clients Rave About
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Join hundreds of satisfied enterprise customers who rely on ABC Security for day-and-night peace of mind.
          </p>
          <Link href="/request-quote">
            <Button size="lg" variant="primary" className="shadow-gold-glow">
              Request Your Free Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
