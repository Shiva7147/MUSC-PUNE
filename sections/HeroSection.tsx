'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MessageCircle, Calendar } from 'lucide-react';
import { Screening } from '@/lib/types';

interface HeroSectionProps {
  featuredScreening?: Screening | null;
  onOpenScreeningModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden bg-[#050505] pt-32 sm:pt-36 pb-16">
      {/* 1. Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dy6mwk08r/image/upload/v1786868334/c70d2f41-c87c-4f09-ab1e-fbdd188940b4_y8odoa.png"
          alt="Manchester United Supporter Atmosphere"
          fill
          priority
          quality={95}
          unoptimized
          className="object-cover object-center opacity-80"
        />
        {/* Vignette & Lighting Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-radial from-[#E60012]/15 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        {/* Sub-Badge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717]/90 border border-white/20 text-[#F5F5F5] font-display text-xs sm:text-sm font-bold uppercase shadow-2xl backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E60012] animate-ping" />
          <span>MANCHESTER UNITED SUPPORTERS CLUB • PUNE</span>
        </div>

        {/* HINDI OFFICIAL SLOGAN HEADLINE (Replaces Pune United Always) */}
        <h1 className="font-devanagari text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-shimmer-hindi leading-tight tracking-normal drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)] max-w-3xl mx-auto px-2">
          एक शहर, एक क्लब, एक प्रेम, मैनचेस्टर यूनाइटेड
        </h1>

        {/* English Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-white/90 font-sans max-w-2xl mx-auto leading-relaxed font-medium px-2 drop-shadow-md">
          Manchester United Supporters Club Pune (MUSC Pune) is the official supporters club for Manchester United fans in Pune. We bring Reds together through screening tickets, community events, and Old Trafford group trips.
        </p>

        {/* 3 MUSCB BENGALURU PROPORTIONED CTA BUTTONS */}
        <div className="pt-4 flex flex-col items-center justify-center gap-3.5 max-w-md mx-auto w-full px-2">
          {/* Button 1: Become Official Member */}
          <Link
            href="/membership"
            className="w-full bg-[#B3000C] hover:bg-[#E60012] text-white font-sans text-base sm:text-lg font-bold py-3.5 px-6 rounded-2xl shadow-[0_8px_30px_rgba(179,0,12,0.5)] flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-95 border border-white/20"
          >
            <Star className="w-5 h-5 shrink-0 text-white fill-white" />
            <span>Become Official Member</span>
          </Link>

          {/* Button 2: Join WhatsApp Community */}
          <a
            href="https://chat.whatsapp.com/MUSCPuneOfficial"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#242424]/90 hover:bg-[#2F2F2F] text-white border border-white/20 font-sans text-base sm:text-lg font-bold py-3.5 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-95 backdrop-blur-md"
          >
            <MessageCircle className="w-5 h-5 shrink-0 text-white" />
            <span>Join WhatsApp Community</span>
          </a>

          {/* Button 3: View Upcoming Events */}
          <Link
            href="/screenings"
            className="w-full bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white font-sans text-base sm:text-lg font-bold py-3.5 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-95 backdrop-blur-sm"
          >
            <Calendar className="w-5 h-5 shrink-0 text-white" />
            <span>View Upcoming Events</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
