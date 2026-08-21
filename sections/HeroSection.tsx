'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Ticket, ShieldCheck, MessageCircle, ArrowRight } from 'lucide-react';
import { Screening } from '@/lib/types';
import { HeroRotatingEmblem } from '@/components/HeroRotatingEmblem';

interface HeroSectionProps {
  featuredScreening?: Screening | null;
  onOpenScreeningModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenScreeningModal,
}) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden bg-[#050505] pt-24 pb-16">
      {/* 1. Realistic Old Trafford Night Matchday Crowd Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=2400&q=90"
          alt="Old Trafford Stadium Supporters Atmosphere"
          fill
          priority
          quality={95}
          className="object-cover object-center scale-105 opacity-45"
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-radial from-[#E60012]/15 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        {/* Rotating Circular Supporter Emblem */}
        <div className="pt-2">
          <HeroRotatingEmblem />
        </div>

        {/* Official Sub-Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717]/90 border border-white/20 text-[#F5F5F5] font-display text-xs font-bold tracking-widest uppercase shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#E60012] animate-ping" />
          <span>MANCHESTER UNITED SUPPORTERS CLUB • PUNE</span>
        </div>

        {/* Main Headline: Kit Typography */}
        <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-bold text-white uppercase tracking-tight leading-none">
          PUNE. <span className="text-[#E60012]">UNITED.</span> ALWAYS.
        </h1>

        {/* Subtitle text */}
        <p className="text-base sm:text-xl text-[#F5F5F5]/90 font-sans max-w-3xl mx-auto leading-relaxed font-normal">
          The home of Manchester United supporters in Pune. High-decibel screening venues, official merchandise drops, and group trips to Old Trafford.
        </p>

        {/* 3 PROMINENT HOMEPAGE CTAS */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto w-full">
          {/* CTA 1: Get Screening Tickets */}
          <button
            onClick={onOpenScreeningModal}
            className="w-full sm:w-auto flex-1 bg-[#E60012] hover:bg-[#C40010] text-white font-display text-lg tracking-wider font-bold py-4 px-8 rounded-2xl shadow-[0_8px_30px_rgba(230,0,18,0.4)] flex items-center justify-center gap-2.5 transition-all hover:scale-[1.03] active:scale-95 border border-white/20"
          >
            <Ticket className="w-5 h-5 shrink-0" />
            <span>BOOK TICKETS</span>
          </button>

          {/* CTA 2: Become an Official Member */}
          <Link
            href="/membership"
            className="w-full sm:w-auto flex-1 bg-[#171717] hover:bg-black text-[#F5F5F5] border border-white/20 hover:border-[#FFC400] font-display text-lg tracking-wider font-bold py-4 px-8 rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all hover:scale-[1.03] active:scale-95"
          >
            <ShieldCheck className="w-5 h-5 text-[#FFC400] shrink-0" />
            <span>BECOME AN OFFICIAL MEMBER</span>
          </Link>

          {/* CTA 3: Join WhatsApp Community */}
          <a
            href="https://wa.me/917276735140?text=Hi%20MUSC%20Pune,%20I%20want%20to%20join%20the%20official%20supporters%20group!"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 bg-[#171717] hover:bg-[#050505] text-[#25D366] border border-[#25D366]/40 hover:border-[#25D366] font-display text-lg tracking-wider font-bold py-4 px-8 rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all hover:scale-[1.03] active:scale-95"
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span>JOIN WHATSAPP COMMUNITY</span>
          </a>
        </div>
      </div>
    </section>
  );
};
