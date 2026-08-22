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
    // Supporter chant audio feedback
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden bg-[#050505] pt-32 sm:pt-36 pb-16">
      {/* 1. Cinematic Old Trafford Stadium Match Night Generated Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/old_trafford_hero_night.jpg"
          alt="Old Trafford Stadium Supporters Atmosphere"
          fill
          priority
          quality={95}
          className="object-cover object-center scale-105 opacity-55"
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-radial from-[#E60012]/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        {/* Official Sub-Badge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717]/90 border border-white/20 text-[#F5F5F5] font-display text-xs font-bold tracking-widest uppercase shadow-2xl backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#E60012] animate-ping" />
          <span>MANCHESTER UNITED SUPPORTERS CLUB • PUNE</span>
        </div>

        {/* Headline: Exact typography and layout matching reference screenshot */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white uppercase tracking-tight leading-[0.92]">
          PUNE. <span className="text-[#E60012]">UNITED.</span><br />
          ALWAYS.
        </h1>

        {/* Subtitle text */}
        <p className="text-sm sm:text-base md:text-lg text-[#F5F5F5]/85 font-sans max-w-2xl mx-auto leading-relaxed font-normal px-2">
          The home of Manchester United supporters in Pune. High-decibel screening venues, official merchandise drops, and group trips to Old Trafford.
        </p>

        {/* 2 MAIN PROMINENT CTA BUTTONS (Matching Reference Screenshot 100%) */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md sm:max-w-xl mx-auto w-full px-2">
          {/* Button 1: Get Screening Tickets */}
          <button
            onClick={onOpenScreeningModal}
            className="w-full sm:w-auto flex-1 bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xl sm:text-2xl tracking-wider font-bold py-4 px-8 rounded-3xl shadow-[0_10px_30px_rgba(230,0,18,0.45)] flex items-center justify-center gap-2.5 transition-all hover:scale-[1.03] active:scale-95 border border-white/20 uppercase"
          >
            <Ticket className="w-6 h-6 shrink-0" />
            <span>GET SCREENING TICKETS</span>
          </button>

          {/* Button 2: Discover MUSC Pune */}
          <Link
            href="/about"
            className="w-full sm:w-auto flex-1 bg-[#050505]/80 hover:bg-[#171717] text-[#F5F5F5] border border-white/30 hover:border-white font-display text-xl sm:text-2xl tracking-wider font-bold py-4 px-8 rounded-3xl shadow-xl flex items-center justify-center gap-2.5 transition-all hover:scale-[1.03] active:scale-95 uppercase backdrop-blur-md"
          >
            <span>DISCOVER MUSC PUNE</span>
          </Link>
        </div>

        {/* Bottom Audio Chant Roar Bar */}
        <div className="pt-6">
          <button
            onClick={toggleAudio}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#171717]/80 border border-white/15 hover:border-[#E60012] text-[#F5F5F5] font-display text-xs font-bold tracking-wider uppercase transition-all hover:scale-105 backdrop-blur-md"
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
