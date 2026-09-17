'use client';

import React, { useState, useEffect } from 'react';
import { publicService } from '../../services/publicService';
import { TeamCard } from '../../components/public/TeamCard';
import { Loader } from '../../components/common/Loader';

export const TeamPage = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicService.getTeam()
      .then((data) => setTeam(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-20 py-12 lg:py-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-3">
          Tactical & Executive Leadership
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto">
          Commanded by Seasoned Defense & Law Enforcement Veterans
        </h1>
        <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Meet the commanders, close-protection directors, and technology architects orchestrating ABC Security operations across the country.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <Loader message="Loading team roster..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
