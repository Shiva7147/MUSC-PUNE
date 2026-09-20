'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Play, MapPin, Eye, Pause } from 'lucide-react';
import { galleryImages } from '@/lib/data';
import { GalleryItem } from '@/lib/types';
import { GalleryLightbox } from '@/components/GalleryLightbox';

export const GallerySection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // High-res optimized Cloudinary photography list
  const optimizedGallery = galleryImages.map((img) => ({
    ...img,
    imageUrl: img.imageUrl.replace('/image/upload/', '/image/upload/f_auto,q_auto:best,w_1200/'),
  }));

  const mainFeature = optimizedGallery[0];
  const supportingGrid = optimizedGallery.slice(1, 5);

  const openLightbox = (index: number, startPlaying: boolean = false) => {
    setSelectedIndex(index);
    setIsPlaying(startPlaying);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setIsPlaying(false);
  };

  return (
    <section id="gallery" className="py-24 bg-[#050505] relative border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-display font-bold text-[#FFC400] tracking-wider uppercase">
              <Camera className="w-4 h-4 text-[#E60012]" />
              <span>RAW DOCUMENTARY ARCHIVE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#F5F5F5] mt-1 uppercase">
              DOCUMENTARY <span className="text-[#E60012]">ARCHIVE</span>
            </h2>
            <p className="text-sm text-[#F5F5F5]/70 max-w-xl mt-2 font-sans">
              High-resolution archive across Pune screening nights, chant circles, and Old Trafford pilgrimages.
            </p>
          </div>

          <div className="badge-gold text-xs font-display px-3.5 py-1.5 rounded-lg font-bold tracking-wider">
            🎞️ 35MM FILM CONTACT SHEET
          </div>
        </div>

        {/* Asymmetrical Documentary Photo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Feature Frame */}
          {mainFeature && (
            <div
              onClick={() => openLightbox(0)}
              className="lg:col-span-7 relative aspect-[16/10] rounded-3xl overflow-hidden glass-card border border-white/10 hover:border-[#E60012] group cursor-pointer shadow-2xl bg-[#171717]"
            >
              <Image
                src={mainFeature.imageUrl}
                alt={mainFeature.caption}
                fill
                quality={95}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px] font-sans font-bold text-[#FFC400] uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-[#E60012]" />
                    <span>{mainFeature.location} • {mainFeature.date}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#F5F5F5]">
                    {mainFeature.title}
                  </h3>
                  <p className="text-xs text-[#F5F5F5]/80 font-sans line-clamp-1 max-w-md">
                    {mainFeature.caption}
                  </p>
                </div>

                <div className="bg-[#E60012] text-white p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
            </div>
          )}

          {/* 4 Supporting Frames Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {supportingGrid.map((img, idx) => (
              <div
                key={img.id || idx}
                onClick={() => openLightbox(idx + 1)}
                className="relative aspect-square rounded-2xl overflow-hidden glass-card border border-white/10 hover:border-[#E60012] group cursor-pointer shadow-lg bg-[#171717]"
              >
                <Image
                  src={img.imageUrl}
                  alt={img.caption}
                  fill
                  quality={90}
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="absolute bottom-3 left-3 right-3 text-[#F5F5F5]">
                  <div className="text-[9px] font-display text-[#FFC400] font-bold uppercase">{img.date}</div>
                  <h4 className="font-display text-xs font-bold truncate">{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Film Strip Horizontal Track with Play Slideshow Control */}
        <div className="bg-[#171717] border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar shadow-inner">
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => openLightbox(0, true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#E60012] hover:bg-[#c80010] text-white font-display text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>PLAY SLIDESHOW</span>
            </button>
            <span className="text-xs font-display font-bold text-[#FFC400] uppercase hidden sm:inline">
              FULL ROLL ({optimizedGallery.length} PHOTOS)
            </span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {optimizedGallery.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => openLightbox(idx)}
                className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-white/15 hover:border-[#E60012] transition-all group"
                title={`Click to view: ${img.title}`}
              >
                <Image src={img.imageUrl} alt={img.title} fill className="object-cover group-hover:scale-110 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Lightbox with Auto-Play and Arrow Key Controls */}
      <GalleryLightbox
        isOpen={selectedIndex !== null}
        onClose={closeLightbox}
        items={optimizedGallery}
        currentIndex={selectedIndex ?? 0}
        onNavigate={(newIdx) => setSelectedIndex(newIdx)}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying((prev) => !prev)}
      />
    </section>
  );
};
