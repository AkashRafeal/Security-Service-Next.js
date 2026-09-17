'use client';

import React, { useState, useEffect } from 'react';
import { publicService } from '../../services/publicService';
import { Loader } from '../../components/common/Loader';
import { Modal } from '../../components/common/Modal';
import { handleImageError } from '../../utils/imageHelper';
import { Image as ImageIcon, ZoomIn } from 'lucide-react';

export const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImage, setActiveImage] = useState(null);

  const categories = [
    'All',
    'Security Personnel',
    'Training',
    'Events',
    'Corporate Security',
    'Operations',
    'Equipment'
  ];

  useEffect(() => {
    setLoading(true);
    publicService.getGallery(selectedCategory === 'All' ? null : selectedCategory)
      .then(setImages)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <div className="space-y-16 py-12 lg:py-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-3">
          Field Operations & Capabilities
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto">
          Operational Security Photo Gallery
        </h1>
        <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Witness ABC Security officers, tactical training academy courses, central surveillance command centers, and specialized event details in action.
        </p>

        {/* Categories Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gold-500 text-navy-950 font-bold shadow-gold-glow'
                  : 'bg-navy-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <Loader message="Loading visual archives..." />
        ) : images.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-base font-semibold text-white">No images in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => (
              <div
                key={img.id}
                onClick={() => setActiveImage(img)}
                className="group relative rounded-2xl overflow-hidden bg-navy-900 border border-slate-800 hover:border-gold-500/50 cursor-pointer shadow-card transition-all duration-300 hover:-translate-y-1 h-64"
              >
                <img
                  src={img.imageUrl || '/images/hero_tactical_patrol.jpg'}
                  alt={img.title}
                  onError={(e) => handleImageError(e, '/images/hero_tactical_patrol.jpg')}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest block">
                    {img.category}
                  </span>
                  <h4 className="text-sm font-bold text-white leading-tight mt-1">{img.title}</h4>
                  {img.description && (
                    <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">{img.description}</p>
                  )}
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-gold-400 font-semibold">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Click to view full photo</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <Modal
          isOpen={!!activeImage}
          onClose={() => setActiveImage(null)}
          title={activeImage.title}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden max-h-[70vh] bg-navy-950 flex items-center justify-center">
              <img
                src={activeImage.imageUrl || '/images/hero_tactical_patrol.jpg'}
                alt={activeImage.title}
                onError={(e) => handleImageError(e, '/images/hero_tactical_patrol.jpg')}
                className="max-h-[65vh] w-auto object-contain mx-auto rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span className="px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-400 font-bold">
                {activeImage.category}
              </span>
              <p className="text-slate-300 italic">{activeImage.description || activeImage.title}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
