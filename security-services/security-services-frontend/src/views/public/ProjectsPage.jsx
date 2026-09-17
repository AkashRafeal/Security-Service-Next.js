'use client';

import React, { useState, useEffect } from 'react';
import { publicService } from '../../services/publicService';
import { MOCK_PROJECTS } from '../../utils/mockData';
import { ProjectCard } from '../../components/public/ProjectCard';
import { Loader } from '../../components/common/Loader';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    publicService.getProjects()
      .then((data) => {
        if (data && data.length > 0) setProjects(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-16 py-12 lg:py-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-3">
          Field Case Studies & Deployment Results
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto">
          Demonstrated Results in Real-World Security Operations
        </h1>
        <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Examine documented case studies detailing the challenge, custom strategy, deployment protocol, and measurable security outcomes.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <Loader message="Loading case studies..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
