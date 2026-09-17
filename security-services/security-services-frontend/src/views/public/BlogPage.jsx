'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { publicService } from '../../services/publicService';
import { Loader } from '../../components/common/Loader';
import { BookOpen, User, Calendar, ArrowRight } from 'lucide-react';
import { handleImageError } from '../../utils/imageHelper';

export const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicService.getBlogs()
      .then((data) => setBlogs(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-16 py-12 lg:py-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-3">
          Security Intelligence & Thought Leadership
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto">
          Security Insights, Regulations & Best Practices
        </h1>
        <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Operational guidance from our risk consultants covering access control vulnerabilities, AI video innovations, and regulatory compliance.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <Loader message="Loading intelligence briefings..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <div
                key={post.id}
                className="group rounded-2xl bg-navy-900 border border-slate-800 hover:border-gold-500/40 transition-all flex flex-col shadow-card overflow-hidden"
              >
                <div className="relative h-48 w-full overflow-hidden bg-navy-950">
                  <img
                    src={post.featuredImageUrl || '/images/hero_tactical_patrol.jpg'}
                    alt={post.title}
                    onError={(e) => handleImageError(e, '/images/hero_tactical_patrol.jpg')}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
                  {post.categoryName && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-navy-950/80 backdrop-blur-md text-gold-400 border border-gold-500/30">
                      {post.categoryName}
                    </span>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-gold-400" />
                      {post.authorName}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-gold-400 transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 hover:text-gold-300 mt-auto"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
