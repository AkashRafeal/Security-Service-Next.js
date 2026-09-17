'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQAccordion = ({ faqs, allowMultiple = false }) => {
  const [expandedIndices, setExpandedIndices] = useState([0]);

  const toggleIndex = (idx) => {
    if (allowMultiple) {
      setExpandedIndices((prev) =>
        prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
      );
    } else {
      setExpandedIndices((prev) => (prev.includes(idx) ? [] : [idx]));
    }
  };

  if (!faqs || faqs.length === 0) {
    return <p className="text-sm text-slate-400 text-center py-6">No FAQs available at this time.</p>;
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isExpanded = expandedIndices.includes(idx);
        return (
          <div
            key={faq.id || idx}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isExpanded
                ? 'bg-navy-900/90 border-gold-500/50 shadow-card'
                : 'bg-navy-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <button
              onClick={() => toggleIndex(idx)}
              className="w-full px-6 py-4 flex items-center justify-between text-left gap-4"
            >
              <span className="text-sm sm:text-base font-semibold text-white flex items-center gap-3">
                <HelpCircle className={`w-4 h-4 shrink-0 ${isExpanded ? 'text-gold-400' : 'text-slate-400'}`} />
                <span>{faq.question}</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gold-400 shrink-0 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
