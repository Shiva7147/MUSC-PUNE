'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Ticket, Volume2, VolumeX } from 'lucide-react';
import { Screening } from '@/lib/types';

interface HeroSectionProps {
  featuredScreening?: Screening | null;
  onOpenScreeningModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenScreeningModal,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden bg-[#050505] pt-32 sm:pt-36 pb-16">
      {/* 1. Crystal Clear HD Old Trafford Night Matchday Background Photograph */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/old_trafford_hero_night.jpg"
          alt="Old Trafford Stadium Matchday Atmosphere"
          fill
          priority
          quality={100}
          unoptimized
          className="object-cover object-center opacity-85"
        />
        {/* Subtle Vignette & Top/Bottom Lighting Overlays (Keeping Old Trafford Stadium Crystal Clear) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/75 via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-radial from-[#E60012]/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        {/* Official Sub-Badge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717]/90 border border-white/20 text-[#F5F5F5] font-display text-sm font-bold tracking-widest uppercase shadow-2xl backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E60012] animate-ping" />
          <span>MANCHESTER UNITED SUPPORTERS CLUB • PUNE</span>
        </div>

        {/* IMPROVISED HEADLINE: PUNE. UNITED. ALWAYS. */}
        <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-extrabold text-white uppercase tracking-tight leading-[0.9] drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)]">
          PUNE. <span className="text-[#E60012] drop-shadow-[0_0_35px_rgba(230,0,18,0.8)]">UNITED.</span><br />
          ALWAYS.
        </h1>

        {/* Subtitle text */}
        <p className="text-base sm:text-lg md:text-xl text-[#F5F5F5] font-sans max-w-2xl mx-auto leading-relaxed font-medium px-2 drop-shadow-md">
          The home of Manchester United supporters in Pune. High-decibel screening venues, official merchandise drops, and group trips to Old Trafford.
        </p>

        {/* 2 MAIN PROMINENT CTA BUTTONS */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-xl mx-auto w-full px-2">
          {/* Button 1: Get Screening Tickets */}
          <button
            onClick={onOpenScreeningModal}
            className="w-full sm:w-auto flex-1 bg-[#E60012] hover:bg-[#C40010] text-white font-display text-2xl sm:text-3xl tracking-wider font-bold py-4 px-8 rounded-3xl shadow-[0_10px_35px_rgba(230,0,18,0.5)] flex items-center justify-center gap-2.5 transition-all hover:scale-[1.03] active:scale-95 border border-white/20 uppercase"
          >
            <Ticket className="w-6 h-6 shrink-0" />
            <span>GET SCREENING TICKETS</span>
          </button>

          {/* Button 2: Discover MUSC Pune */}
          <Link
            href="/about"
            className="w-full sm:w-auto flex-1 bg-[#050505]/90 hover:bg-[#171717] text-[#F5F5F5] border border-white/30 hover:border-white font-display text-2xl sm:text-3xl tracking-wider font-bold py-4 px-8 rounded-3xl shadow-xl flex items-center justify-center gap-2.5 transition-all hover:scale-[1.03] active:scale-95 uppercase backdrop-blur-md"
          >
            <span>DISCOVER MUSC PUNE</span>
          </Link>
        </div>

        {/* Bottom Audio Chant Roar Bar */}
        <div className="pt-4">
          <button
            onClick={toggleAudio}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#171717]/90 border border-white/20 hover:border-[#E60012] text-[#F5F5F5] font-display text-xs sm:text-sm font-bold tracking-wider uppercase transition-all hover:scale-105 backdrop-blur-md shadow-lg"
          >
            {isPlayingAudio ? (
              <VolumeX className="w-4 h-4 text-[#E60012] animate-bounce" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#E60012]" />
            )}
            <span>TAP TO HEAR PUNE&apos;S RED ARMY ROAR</span>
          </button>
        </div>
      </div>
    </section>
  );
};
