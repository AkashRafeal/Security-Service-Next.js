'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { COMPANY_INFO } from '../../utils/constants';
import { ContactForm } from '../../components/public/ContactForm';
import { FAQAccordion } from '../../components/public/FAQAccordion';
import { SearchBar } from '../../components/common/SearchBar';
import { Loader } from '../../components/common/Loader';
import { publicService } from '../../services/publicService';
import { MapPin, PhoneCall, Mail, Clock, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../components/common/Button';

const FALLBACK_FAQS = [
  {
    id: 1,
    category: 'Deployment & SLA',
    question: 'How quickly can security guards be deployed to our facility?',
    answer: 'Standard deployments are typically finalized within 48 to 72 hours following a physical site assessment. For emergency situations, our Rapid Response Units can be mobilized on-site within 2 to 4 hours.'
  },
  {
    id: 2,
    category: 'Vetting & Credentials',
    question: 'Are your security officers licensed, bonded, and insured?',
    answer: 'Yes, 100% of our security personnel are licensed under state security regulatory acts, fully bonded, and covered by comprehensive multi-million dollar general liability and commercial insurance.'
  },
  {
    id: 3,
    category: 'Vetting & Credentials',
    question: 'What background verification and screening do your guards undergo?',
    answer: 'Every candidate undergoes multi-state criminal background scrutiny, 10-panel drug screenings, employment history audits, and psychological temperament evaluations before graduating from our 120-hour tactical academy.'
  },
  {
    id: 4,
    category: 'Operations & Monitoring',
    question: 'Can we request armed versus unarmed security officers?',
    answer: 'Yes. We deploy both armed and unarmed certified security officers based on your corporate risk profile, physical site vulnerabilities, and executive protection requirements.'
  },
  {
    id: 5,
    category: 'Operations & Monitoring',
    question: 'How do you monitor and supervise security guards while on duty?',
    answer: 'Officers check in digitally at predetermined GPS wanding checkpoints with real-time incident logging. Dedicated field supervisors perform unannounced day and night roving audits.'
  },
  {
    id: 6,
    category: 'Deployment & SLA',
    question: 'What happens if an assigned security officer fails to show up for a shift?',
    answer: 'Our automated scheduling platform flags unconfirmed posts 30 minutes in advance, immediately dispatching a reserve relief guard to ensure 100% post fill with zero shift vacancy.'
  },
  {
    id: 7,
    category: 'Surveillance & Tech',
    question: 'Can you integrate with our existing CCTV and electronic access controls?',
    answer: 'Yes, our electronic security division integrates directly with all major ONVIF-compliant IP camera systems, access turnstiles, biometric gates, and perimeter sensor networks.'
  },
  {
    id: 8,
    category: 'Contracts & Pricing',
    question: 'What are your contract duration and cancellation terms?',
    answer: 'We provide flexible agreement structures from short-term event details to multi-year enterprise SLAs, with transparent 30-day performance review clauses.'
  }
];

export const ContactPage = () => {
  const [faqs, setFaqs] = useState(FALLBACK_FAQS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    publicService.getFaqs()
      .then((data) => {
        if (data && data.length > 0) {
          setFaqs(data);
        }
      })
      .catch(() => {
        // Keep fallback FAQs if API call fails
      });
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
    <div className="space-y-16 py-8 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* 2. Integrated Frequently Asked Questions Section */}
      <section id="faq" className="max-w-5xl mx-auto scroll-mt-24 space-y-12">
        <div className="text-center">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-3">
            Knowledge Base & Client Guidance
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Find clear answers regarding our guard screening, emergency deployment timelines, SLA guarantees, and pricing models.
          </p>

          {/* Search & Category Filter Controls */}
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
                      ? 'bg-gold-500 text-navy-950 font-bold shadow-sm'
                      : 'bg-navy-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat === 'ALL' ? 'All Questions' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div>
          {loading ? (
            <Loader message="Loading knowledge base..." />
          ) : filteredFaqs.length === 0 ? (
            <div className="text-center py-16 text-slate-400 bg-navy-900/60 rounded-3xl border border-slate-800">
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
        </div>
      </section>

      {/* 3. Contact Grid: Details + Message Form */}
      <section id="contact-form" className="scroll-mt-24 pt-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-2">
            Direct Inquiry
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Connect With Our Operations Team
          </h2>
          <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto">
            Still have questions or need an immediate deployment? Send a message or call our dispatch lines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Info & Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-navy-900 border border-slate-800 shadow-card space-y-6 card-hover-effect">
              <h3 className="text-xl font-bold text-white pb-3 border-b border-slate-800">
                Headquarters & Dispatch
              </h3>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Corporate Headquarters</span>
                    <span className="text-xs text-slate-400">{COMPANY_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneCall className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">General Inquiries</span>
                    <a href={`tel:${COMPANY_INFO.phonePrimary}`} className="text-xs text-gold-400 hover:underline">
                      {COMPANY_INFO.phonePrimary}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">24/7 Rapid Emergency Dispatch</span>
                    <a href={`tel:${COMPANY_INFO.phoneEmergency}`} className="text-xs text-rose-400 font-bold hover:underline">
                      {COMPANY_INFO.phoneEmergency}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Central Operations Email</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-xs text-slate-400 hover:underline">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Operational Hours</span>
                    <span className="text-xs text-slate-400">{COMPANY_INFO.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Operational Map */}
            <div className="rounded-3xl overflow-hidden border border-slate-800 bg-navy-900 h-64 flex flex-col items-center justify-center p-6 text-center shadow-card relative card-hover-effect">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 text-gold-400 flex items-center justify-center mb-2">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Interactive Operational Map</h4>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                750 Sentinel Plaza, Defense Tower, Suite 1800, New York, NY 10005
              </p>
              <span className="text-[10px] text-gold-400 uppercase tracking-widest font-bold mt-3">
                Google Maps Live Satellite Integration
              </span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-navy-900 border border-slate-800 shadow-elevated card-hover-effect">
            <h3 className="text-2xl font-bold text-white mb-2">Send an Operational Message</h3>
            <p className="text-xs text-slate-400 mb-6">
              Leave your contact details and requirements below. An account director will respond promptly.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
