'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Shield, Search, Filter, Building2, Handshake, ShieldCheck } from 'lucide-react';
import { ServiceCard } from '../../components/public/ServiceCard';
import { SearchBar } from '../../components/common/SearchBar';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { publicService } from '../../services/publicService';

export const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    publicService.getServices()
      .then((data) => setServices(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));

    publicService.getClients()
      .then((data) => setClients(data || []))
      .catch(() => {});
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(services.map((s) => s.categoryName).filter(Boolean));
    return ['ALL', ...Array.from(cats)];
  }, [services]);

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        (s.shortDescription && s.shortDescription.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory =
        selectedCategory === 'ALL' || s.categoryName === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [services, search, selectedCategory]);

  return (
    <div className="space-y-16 py-12 lg:py-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-3">
          Specialized Protection Capabilities
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto">
          Comprehensive Corporate & Tactical Security Services
        </h1>
        <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Explore our tailored solutions spanning static guarding, close VIP protection, AI surveillance networks, and regulatory risk advisory.
        </p>

        {/* Filter & Search Bar */}
        <div className="mt-10 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search security services by keyword..."
            className="w-full sm:w-80"
          />

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gold-500 text-navy-950 font-bold'
                    : 'bg-navy-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat === 'ALL' ? 'All Services' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <Loader message="Loading service portfolio..." />
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-base font-semibold text-white">No security services match your criteria.</p>
            <p className="text-xs mt-1">Try searching with a different term or resetting the filter.</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('ALL'); }}
              className="mt-4 text-xs font-bold text-gold-400 underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>

      {/* Institutional Clients & Partners Section */}
      <section id="clients" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-2">
            Institutional Partners & Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Organizations Protected by Our Security Services
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            From multi-tower corporate headquarters to high-threat industrial logistics centers, learn why leading enterprises place their safety in our hands.
          </p>
        </div>

        {/* Operational Trust Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 text-center shadow-card">
            <span className="text-2xl sm:text-3xl font-black text-gold-400">99.8%</span>
            <span className="text-xs text-slate-300 block mt-1 font-medium">Client Contract Retention</span>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 text-center shadow-card">
            <span className="text-2xl sm:text-3xl font-black text-gold-400">18M+</span>
            <span className="text-xs text-slate-300 block mt-1 font-medium">Sq. Ft. Space Secured</span>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 text-center shadow-card">
            <span className="text-2xl sm:text-3xl font-black text-gold-400">350+</span>
            <span className="text-xs text-slate-300 block mt-1 font-medium">Enterprise Clients</span>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 text-center shadow-card">
            <span className="text-2xl sm:text-3xl font-black text-gold-400">0%</span>
            <span className="text-xs text-slate-300 block mt-1 font-medium">Critical Post Vacancy Rate</span>
          </div>
        </div>

        {/* Client Partner Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="p-6 rounded-2xl bg-navy-900 border border-slate-800 hover:border-gold-500/40 transition-all flex flex-col items-center text-center shadow-card hover:shadow-elevated hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-navy-950 border border-slate-700 flex items-center justify-center p-2 mb-4 group-hover:scale-105 transition-transform">
                <Building2 className="w-7 h-7 text-gold-400" />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-gold-300 transition-colors">
                {client.name}
              </h4>
              <span className="text-xs text-slate-400 mt-1">{client.category}</span>
              <span className="mt-3 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active Contract Partner
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-navy-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-card">
          <div>
            <h3 className="text-xl font-bold text-white">Need a Customized Service Combination?</h3>
            <p className="text-xs text-slate-400 mt-1">Our commanders architect combined static guarding, mobile roving, and CCTV packages.</p>
          </div>
          <Link href="/request-quote" className="shrink-0">
            <Button size="md" variant="primary">
              Build Custom Package
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
