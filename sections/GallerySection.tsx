'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Maximize2 } from 'lucide-react';
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

  const categories = ['ALL', 'Screenings', 'Tours', 'Legends'];

  const filteredItems =
    selectedFilter === 'ALL'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedFilter);

  const filmStripTracks = [
    { label: 'MATCHDAY SCREENING ROAR', loc: 'VIMAN NAGAR', img: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865411/WhatsApp_Image_2026-08-16_at_11.53.51_AM_ddhmkc.jpg' },
    { label: 'OLD TRAFFORD DELEGATION', loc: 'MANCHESTER', img: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865406/WhatsApp_Image_2026-08-16_at_11.53.51_AM_13_arf4zr.jpg' },
    { label: 'UNITED DRESSING ROOM', loc: 'OLD TRAFFORD', img: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865408/WhatsApp_Image_2026-08-16_at_11.53.51_AM_1_eibvrj.jpg' },
    { label: 'WITH UNITED LEGENDS', loc: 'MANCHESTER', img: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865408/WhatsApp_Image_2026-08-16_at_11.53.51_AM_3_eivq1o.jpg' },
    { label: 'PUNE ULTRAS CHANTING', loc: 'KOREGAON PARK', img: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865423/WhatsApp_Image_2026-08-16_at_12.29.46_PM_m8ytoq.jpg' },
  ];

  return (
    <section id="gallery" className="py-24 bg-[#161513] relative border-t border-[#683F39]/30 overflow-hidden">
      {/* 1. Continuous Supporters Film Strip Track */}
      <div className="w-full bg-[#1C1B18] border-y border-[#683F39]/30 py-4 overflow-hidden mb-16 select-none relative">
        <div className="animate-film-strip flex items-center gap-6 whitespace-nowrap">
          {filmStripTracks.concat(filmStripTracks).map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl glass-panel border border-[#683F39]/40 shrink-0"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black shrink-0 border border-[#C8102E]/50">
                <Image src={item.img} alt={item.label} fill className="object-cover" />
              </div>
              <div>
                <div className="font-display text-sm font-bold text-[#E7E0CF] uppercase">{item.label}</div>
                <div className="text-[10px] font-mono text-[#C8102E] font-bold">📍 {item.loc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#C8102E] font-bold tracking-widest uppercase">
              <Camera className="w-4 h-4" />
              <span>AUTHENTIC DOCUMENTARY ARCHIVE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#E7E0CF] mt-1 uppercase">
              SUPPORTERS <span className="text-[#C8102E]">FILM STRIPS</span>
            </h2>
            <p className="text-sm text-[#E7E0CF]/70 max-w-xl mt-2 font-sans">
              Raw documentary photography captured across Pune screening nights, Old Trafford dressing room tours, and legend meetups.
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
                    ? 'bg-[#C8102E] text-white shadow-lg glow-united'
                    : 'glass-panel border border-[#683F39]/40 text-[#E7E0CF]/70 hover:text-[#E7E0CF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 12-Column Asymmetrical Editorial Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredItems.map((item, idx) => {
            const colSpanClass =
              idx % 5 === 0
                ? 'lg:col-span-8 aspect-[16/9]'
                : idx % 5 === 1
                ? 'lg:col-span-4 aspect-[4/5]'
                : idx % 5 === 2
                ? 'lg:col-span-5 aspect-[4/3]'
                : idx % 5 === 3
                ? 'lg:col-span-7 aspect-[16/9]'
                : 'lg:col-span-6 aspect-[4/3]';

            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(galleryItems.findIndex((g) => g.id === item.id))}
                className={`group relative rounded-3xl overflow-hidden bg-black border-2 border-[#683F39]/30 cursor-pointer shadow-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C8102E] ${colSpanClass}`}
              >
                {/* Sprocket Hole Accents */}
                <div className="absolute top-2 left-3 right-3 flex justify-between z-10 pointer-events-none opacity-40">
                  <span className="w-2 h-1.5 bg-[#E7E0CF]/40 rounded-xs" />
                  <span className="w-2 h-1.5 bg-[#E7E0CF]/40 rounded-xs" />
                  <span className="w-2 h-1.5 bg-[#E7E0CF]/40 rounded-xs" />
                </div>

                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                <span className="absolute top-4 left-4 badge-united text-[9px] font-mono px-2.5 py-0.5 rounded uppercase font-bold tracking-wider z-10">
                  {item.category}
                </span>

                <div className="absolute top-4 right-4 p-2 rounded-full glass-panel text-[#E7E0CF] opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-[#E7E0CF] z-10">
                  <div className="text-[10px] font-mono text-[#E7E0CF] font-bold tracking-widest uppercase">
                    {item.date} • {item.location}
                  </div>
                  <h4 className="font-display text-xl font-bold group-hover:text-[#C8102E] transition-colors mt-0.5">
                    {item.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
