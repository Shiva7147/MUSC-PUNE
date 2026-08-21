'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, X, Play, MapPin, Eye } from 'lucide-react';
import { galleryImages } from '@/lib/data';
import { GalleryItem } from '@/lib/types';

export const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // High-res optimized Cloudinary photography list
  const optimizedGallery = galleryImages.map((img) => ({
    ...img,
    imageUrl: img.imageUrl.replace('/image/upload/', '/image/upload/f_auto,q_auto:best,w_1200/'),
  }));

  const mainFeature = optimizedGallery[0];
  const supportingGrid = optimizedGallery.slice(1, 5);

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
              onClick={() => setSelectedImage(mainFeature)}
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
            {supportingGrid.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img)}
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

        {/* Film Strip Horizontal Track */}
        <div className="bg-[#171717] border border-white/10 rounded-2xl p-4 flex items-center gap-4 overflow-x-auto no-scrollbar shadow-inner">
          <div className="flex items-center gap-2 text-xs font-display font-bold text-[#FFC400] uppercase shrink-0">
            <Play className="w-4 h-4 text-[#E60012]" />
            <span>FULL ROLL:</span>
          </div>
          {optimizedGallery.map((img) => (
            <button
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-white/15 hover:border-[#E60012] transition-all group"
            >
              <Image src={img.imageUrl} alt={img.title} fill className="object-cover group-hover:scale-110 transition-transform" />
            </button>
          ))}
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-[#171717] border border-[#E60012]/40 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-6 text-[#F5F5F5]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/80 text-white hover:text-[#E60012]"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black">
              <Image src={selectedImage.imageUrl} alt={selectedImage.title} fill quality={100} className="object-contain" />
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div>
                <div className="text-xs font-display text-[#FFC400] font-bold uppercase">{selectedImage.location} • {selectedImage.date}</div>
                <h3 className="font-display text-2xl font-bold text-[#F5F5F5]">{selectedImage.title}</h3>
                <p className="text-xs font-sans text-[#F5F5F5]/80 mt-1">{selectedImage.caption}</p>
              </div>
              <span className="badge-united text-xs font-display px-3 py-1.5 rounded-xl font-bold">
                🔴 OFFICIAL ARCHIVE
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
