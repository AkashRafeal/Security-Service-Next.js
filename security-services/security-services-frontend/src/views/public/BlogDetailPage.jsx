'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { publicService } from '../../services/publicService';
import { Loader } from '../../components/common/Loader';
import { Button } from '../../components/common/Button';
import { handleImageError } from '../../utils/imageHelper';
import { Calendar, User, Eye, ArrowLeft, Share2, Tag } from 'lucide-react';

export const BlogDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    publicService.getBlogBySlug(slug)
      .then(setPost)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader fullScreen message="Loading security analysis..." />;

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Article Not Found</h2>
        <Link href="/blog">
          <Button variant="primary" size="md">Return to Blog</Button>
        </Link>
      </div>
    );
  }

  const tags = post.tags ? post.tags.split(',').map((t) => t.trim()) : [];

  return (
    <article className="space-y-12 py-12 lg:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-gold-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        {post.categoryName && (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-500/10 text-gold-400 border border-gold-500/30 uppercase tracking-widest inline-block mb-3">
            {post.categoryName}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pb-6 border-b border-slate-800">
          <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
            <User className="w-4 h-4 text-gold-400" />
            {post.authorName}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Recent'}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            {post.viewsCount || 0} reads
          </span>
        </div>
      </div>

      {post.featuredImageUrl && (
        <div className="rounded-3xl overflow-hidden border border-slate-800 bg-navy-950 h-80 sm:h-96 w-full shadow-elevated">
          <img
            src={post.featuredImageUrl}
            alt={post.title}
            onError={(e) => handleImageError(e, '/images/hero_command_center.jpg')}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Body */}
      <div className="text-base text-slate-200 leading-relaxed space-y-6 prose prose-invert max-w-none">
        <div className="whitespace-pre-line leading-loose">
          {post.content}
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-gold-400" />
          {tags.map((t, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg bg-navy-900 border border-slate-700/60 text-xs text-slate-300"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* Author Card */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30 flex items-center justify-center font-bold text-lg shrink-0">
          {post.authorName?.charAt(0) || 'A'}
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">{post.authorName}</h4>
          <p className="text-xs text-slate-400 mt-1">
            Senior Security Analyst at ABC Security Services. Specializing in physical risk assessments and institutional defense planning.
          </p>
        </div>
      </div>
    </article>
  );
};

export default BlogDetailPage;
