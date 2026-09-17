'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { publicService } from '../../services/publicService';
import { MOCK_FAQS } from '../../utils/mockData';
import { FAQAccordion } from '../../components/public/FAQAccordion';
import { SearchBar } from '../../components/common/SearchBar';
import { Loader } from '../../components/common/Loader';
import { HelpCircle, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../components/common/Button';

export const FaqPage = () => {
  const [faqs, setFaqs] = useState(MOCK_FAQS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    publicService.getFaqs()
      .then((data) => {
        if (data && data.length > 0) setFaqs(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const set = new Set(faqs.map((f) => f.category).filter(Boolean));
    return ['ALL', ...Array.from(set)];
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((f) => {
      const matchSearch =
        f.question.toLowerCase().includes(search.toLowerCase()) ||
        f.answer.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === 'ALL' || f.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [faqs, search, selectedCategory]);

  return (
    <div className="space-y-16 py-12 lg:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="text-center">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-3">
          Knowledge Base & Client Guidance
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Find transparent answers regarding our guard screening, emergency deployment timelines, SLA guarantees, and pricing models.
        </p>

        {/* Controls */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search questions or keywords..."
            className="w-full sm:w-80"
          />

          <div className="flex flex-wrap items-center gap-1.5 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gold-500 text-navy-950 font-bold'
                    : 'bg-navy-900 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {cat === 'ALL' ? 'All Questions' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion */}
      <section>
        {loading ? (
          <Loader message="Loading knowledge base..." />
        ) : filteredFaqs.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-base font-semibold text-white">No questions match your search.</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('ALL'); }}
              className="mt-3 text-xs font-bold text-gold-400 underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <FAQAccordion faqs={filteredFaqs} allowMultiple />
        )}
      </section>

      {/* Still need help */}
      <section className="p-8 rounded-3xl bg-navy-900 border border-slate-800 text-center shadow-card">
        <h3 className="text-xl font-bold text-white mb-2">Still Have Unanswered Questions?</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
          Our client advisory coordinators are available 24 hours a day to answer technical questions about your facility.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact">
            <Button size="md" variant="primary">
              Contact Us Directly
            </Button>
          </Link>
          <a href="tel:+18008264827">
            <Button size="md" variant="secondary" icon={PhoneCall}>
              Call Toll-Free: +1 (800) 826-4827
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};
