'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Maximize2, MapPin } from 'lucide-react';
import { GalleryItem } from '@/lib/types';

interface GallerySectionProps {
  galleryItems: GalleryItem[];
  onOpenLightbox: (index: number) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  galleryItems,
  onOpenLightbox,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const categories = ['ALL', 'Screenings', 'Matchday Vibe', 'Tours', 'Community'];

  const filteredItems =
    selectedFilter === 'ALL'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedFilter);

  return (
    <section id="gallery" className="py-24 bg-[#070707] relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#C8102E] font-bold tracking-widest uppercase">
              <Camera className="w-4 h-4" />
              <span>35MM FILM DOCUMENTARY</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mt-1 uppercase">
              SUPPORTERS <span className="text-[#C8102E]">FILM STRIPS</span>
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl mt-2 font-sans">
              Raw documentary photography captured at matchday screenings and Old Trafford trips.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
                  selectedFilter === cat
                    ? 'bg-[#C8102E] text-white shadow-lg glow-neon-red'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 35mm Negative Film Roll Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(galleryItems.findIndex((g) => g.id === item.id))}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-950 border-4 border-neutral-900 cursor-pointer shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C8102E]"
            >
              {/* Film Sprocket Holes Edge Graphics */}
              <div className="absolute top-1 left-2 right-2 flex justify-between z-10 pointer-events-none opacity-40">
                <span className="w-2 h-1.5 bg-neutral-700 rounded-xs" />
                <span className="w-2 h-1.5 bg-neutral-700 rounded-xs" />
                <span className="w-2 h-1.5 bg-neutral-700 rounded-xs" />
                <span className="w-2 h-1.5 bg-neutral-700 rounded-xs" />
              </div>

              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Category Badge */}
              <span className="absolute top-4 left-3 bg-[#C8102E] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider z-10">
                {item.category}
              </span>

              <div className="absolute top-4 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Handwritten Felt-Tip Date Stamp */}
              <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                <div className="text-[10px] font-mono text-amber-400 font-bold tracking-widest uppercase">
                  {item.date} • {item.location}
                </div>
                <h4 className="font-display text-lg font-bold group-hover:text-[#C8102E] transition-colors leading-snug mt-0.5">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
