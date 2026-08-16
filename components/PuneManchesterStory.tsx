'use client';

import React from 'react';
import Image from 'next/image';
import { Navigation, Plane, MapPin } from 'lucide-react';

export const PuneManchesterStory: React.FC = () => {
  const visualPairs = [
    {
      puneTag: 'PUNE',
      mufcTag: 'MANCHESTER',
      puneTitle: 'FC ROAD & KOREGAON PARK',
      mufcTitle: 'SIR MATT BUSBY WAY',
      subtitle: 'From Pune street meetups to Old Trafford matchday march',
      imagePune: '/images/hero.jpg',
      imageMufc: '/images/tour.jpg',
    },
    {
      puneTag: 'PUNE REDS',
      mufcTag: 'UNITED ROAD',
      puneTitle: 'VIMAN NAGAR ARENA',
      mufcTitle: 'STRETFORD END TIER 1',
      subtitle: 'High-decibel chant sessions echoing 8,000 miles across oceans',
      imagePune: '/images/screening.jpg',
      imageMufc: '/images/community.jpg',
    },
  ];

  return (
    <section className="py-24 bg-[#08080A] relative border-t border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#DA020E] font-bold tracking-widest uppercase mb-3">
            <Navigation className="w-4 h-4" />
            <span>PUNE × MANCHESTER CULTURAL BRIDGE</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-white uppercase leading-tight">
            MATCHDAY HERE <span className="text-[#DA020E]">➔ MATCHDAY THERE</span>
          </h2>
          <p className="text-sm text-neutral-400 mt-3 font-sans">
            Connecting Pune&apos;s urban football culture directly with Old Trafford&apos;s terrace traditions.
          </p>
        </div>

        {/* Comparative Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {visualPairs.map((pair, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <span className="badge-pune text-xs font-mono px-3 py-1 rounded font-bold">
                  📍 {pair.puneTag}
                </span>
                <Plane className="w-5 h-5 text-[#DA020E] animate-pulse" />
                <span className="badge-gold text-xs font-mono px-3 py-1 rounded font-bold">
                  📍 {pair.mufcTag}
                </span>
              </div>

              {/* Side by Side Split Photos */}
              <div className="grid grid-cols-2 gap-3 relative aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-800">
                <div className="relative h-full">
                  <Image
                    src={pair.imagePune}
                    alt={pair.puneTitle}
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono font-bold text-white bg-black/70 px-2 py-0.5 rounded">
                    {pair.puneTitle}
                  </span>
                </div>

                <div className="relative h-full">
                  <Image
                    src={pair.imageMufc}
                    alt={pair.mufcTitle}
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono font-bold text-amber-300 bg-black/70 px-2 py-0.5 rounded">
                    {pair.mufcTitle}
                  </span>
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <h3 className="font-display text-2xl font-bold text-white uppercase">
                  {pair.puneTitle} <span className="text-[#DA020E]">➔</span> {pair.mufcTitle}
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
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
