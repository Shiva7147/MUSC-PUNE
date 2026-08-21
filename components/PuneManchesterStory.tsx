'use client';

import React from 'react';
import Image from 'next/image';
import { Navigation, Plane } from 'lucide-react';

export const PuneManchesterStory: React.FC = () => {
  const visualPairs = [
    {
      puneTag: 'PUNE',
      mufcTag: 'MANCHESTER',
      puneTitle: 'FC ROAD & KOREGAON PARK',
      mufcTitle: 'SIR MATT BUSBY WAY',
      subtitle: 'From Pune street meetups to Old Trafford matchday march',
      imagePune: 'https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_800/v1786865411/WhatsApp_Image_2026-08-16_at_11.53.51_AM_ddhmkc.jpg',
      imageMufc: 'https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_800/v1786865406/WhatsApp_Image_2026-08-16_at_11.53.51_AM_13_arf4zr.jpg',
    },
    {
      puneTag: 'PUNE REDS',
      mufcTag: 'UNITED ROAD',
      puneTitle: 'VIMAN NAGAR ARENA',
      mufcTitle: 'STRETFORD END TIER 1',
      subtitle: 'High-decibel chant sessions echoing 8,000 miles across oceans',
      imagePune: 'https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_800/v1786865423/WhatsApp_Image_2026-08-16_at_12.29.46_PM_m8ytoq.jpg',
      imageMufc: 'https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_800/v1786865422/WhatsApp_Image_2026-08-16_at_12.29.15_PM_kzh1u3.jpg',
    },
  ];

  return (
    <section className="py-24 bg-[#050505] relative border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-display text-[#E60012] font-bold tracking-wider uppercase mb-3">
            <Navigation className="w-4 h-4" />
            <span>PUNE × MANCHESTER CULTURAL BRIDGE</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#F5F5F5] uppercase leading-tight">
            MATCHDAY HERE <span className="text-[#E60012]">➔ MATCHDAY THERE</span>
          </h2>
          <p className="text-sm text-[#F5F5F5]/70 mt-3 font-sans">
            Connecting Pune&apos;s urban football culture directly with Old Trafford&apos;s terrace traditions.
          </p>
        </div>

        {/* Comparative Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {visualPairs.map((pair, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden flex flex-col justify-between bg-[#171717] border border-white/10"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="badge-pune text-xs font-sans px-3 py-1 rounded font-bold">
                  📍 {pair.puneTag}
                </span>
                <Plane className="w-5 h-5 text-[#E60012] animate-pulse" />
                <span className="badge-gold text-xs font-display px-3 py-1 rounded font-bold">
                  📍 {pair.mufcTag}
                </span>
              </div>

              {/* Side by Side Split Photos */}
              <div className="grid grid-cols-2 gap-3 relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
                <div className="relative h-full">
                  <Image
                    src={pair.imagePune}
                    alt={pair.puneTitle}
                    fill
                    quality={90}
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-display font-bold text-[#F5F5F5] bg-black/80 px-2 py-0.5 rounded">
                    {pair.puneTitle}
                  </span>
                </div>

                <div className="relative h-full">
                  <Image
                    src={pair.imageMufc}
                    alt={pair.mufcTitle}
                    fill
                    quality={90}
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-display font-bold text-[#F5F5F5] bg-black/80 px-2 py-0.5 rounded">
                    {pair.mufcTitle}
                  </span>
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <h3 className="font-display text-2xl font-bold text-[#F5F5F5] uppercase">
                  {pair.puneTitle} <span className="text-[#E60012]">➔</span> {pair.mufcTitle}
                </h3>
                <p className="text-xs text-[#F5F5F5]/70 font-sans">
                  {pair.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
