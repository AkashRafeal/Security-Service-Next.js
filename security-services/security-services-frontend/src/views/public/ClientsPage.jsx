'use client';

import React, { useState, useEffect } from 'react';
import { publicService } from '../../services/publicService';
import { Loader } from '../../components/common/Loader';
import { Handshake, ShieldCheck, Building2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../components/common/Button';

export const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicService.getClients()
      .then((data) => setClients(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-20 py-12 lg:py-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-3">
          Our Institutional Partners
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto">
          Trusted by Premier Enterprises & Financial Institutions
        </h1>
        <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          From multi-tower corporate campuses to international hospital systems, learn why leading organizations place their safety in our hands.
        </p>
      </section>

      {/* Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center">
            <span className="text-3xl font-black text-gold-400">99.8%</span>
            <span className="text-xs text-slate-300 block mt-1">Client Contract Retention</span>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center">
            <span className="text-3xl font-black text-gold-400">18M+</span>
            <span className="text-xs text-slate-300 block mt-1">Sq. Ft. Commercial Space Secured</span>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center">
            <span className="text-3xl font-black text-gold-400">350+</span>
            <span className="text-xs text-slate-300 block mt-1">Enterprise Clients Nationwide</span>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center">
            <span className="text-3xl font-black text-gold-400">0%</span>
            <span className="text-xs text-slate-300 block mt-1">Critical Post Vacancy Rate</span>
          </div>
        </div>
      </section>

      {/* Client Logos Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8 text-center">
          Featured Commercial & Government Client Organizations
        </h3>
        {loading ? (
          <Loader message="Loading client directory..." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="p-6 rounded-2xl bg-navy-900 border border-slate-800 hover:border-gold-500/40 transition-all flex flex-col items-center text-center shadow-card"
              >
                <div className="w-16 h-16 rounded-2xl bg-navy-950 border border-slate-700 flex items-center justify-center p-2 mb-4">
                  <Building2 className="w-8 h-8 text-gold-400" />
                </div>
                <h4 className="text-base font-bold text-white">{client.name}</h4>
                <span className="text-xs text-slate-400 mt-1">{client.category}</span>
                <span className="mt-3 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Active Contract Partner
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-navy-900 border border-gold-500/40 shadow-elevated">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ready to Upgrade Your Corporate Security Contract?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Connect with our client services director to discuss transition timelines and dedicated commander assignment.
          </p>
          <Link href="/request-quote">
            <Button size="lg" variant="primary" className="shadow-gold-glow">
              Request Corporate Proposal
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
