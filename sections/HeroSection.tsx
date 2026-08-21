'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Ticket, Plane, Volume2 } from 'lucide-react';
import { Screening } from '@/lib/types';

interface HeroSectionProps {
  featuredScreening?: Screening;
  onOpenScreeningModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  // Native Web Audio API Synthesizer for Stadium Crowd Roar
  const playCrowdRoar = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      
      const bufferSize = ctx.sampleRate * 1.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.8);
      filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 1.5);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // AudioContext fallback
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-24 overflow-hidden bg-[#050505]">
      {/* Full Bleed Ultra High-Resolution Cloudinary Background Photography */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_2400/v1786865406/WhatsApp_Image_2026-08-16_at_11.53.51_AM_13_arf4zr.jpg"
          alt="MUSC Pune Old Trafford Delegation Hero"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-[center_60%] brightness-95 opacity-95 transition-transform duration-1000"
        />
        {/* Soft localized gradient overlay to ensure supporters & Indian flag remain clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/75 md:bg-gradient-to-r md:from-[#050505]/85 md:via-transparent md:to-transparent" />
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 bg-grain opacity-15 pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-3xl text-left space-y-8">
          {/* Dynamic Editorial Headline in Roboto Condensed 700 */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-white/15 text-xs font-sans text-white/80 uppercase tracking-wider font-semibold">
              <span>MANCHESTER UNITED SUPPORTERS CLUB PUNE</span>
              <span className="text-[#E60012]">🔴</span>
            </div>

            <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-[#F5F5F5] leading-none uppercase drop-shadow-[0_10px_25px_rgba(0,0,0,0.95)]">
              PUNE. <span className="text-[#E60012]">UNITED.</span> ALWAYS.
            </h1>

            <p className="text-base sm:text-xl text-[#F5F5F5]/90 font-sans max-w-xl font-normal leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
              Where Manchester United supporters in Pune come together. High-decibel screening venues, official merchandise, and group trips to Old Trafford.
            </p>
          </div>

          {/* Hero Action Buttons Sitting Together as One Visual Unit */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 max-w-lg">
            {/* Primary Button */}
            <Link
              href="/screenings"
              className="flex-1 bg-[#E60012] hover:bg-[#C40010] text-white font-display text-base tracking-wider font-bold h-14 px-6 rounded-2xl shadow-[0_8px_30px_rgba(230,0,18,0.25)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Ticket className="w-5 h-5 shrink-0" />
              <span>GET MATCHDAY TICKETS</span>
            </Link>

            {/* Secondary Button */}
            <Link
              href="/tours"
              className="flex-1 bg-[#171717] hover:bg-black border border-[#E60012] text-[#FFC400] font-display text-base tracking-wider font-bold h-14 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl hover:scale-[1.02]"
            >
              <Plane className="w-5 h-5 text-[#E60012] shrink-0" />
              <span>TRIP TO OLD TRAFFORD</span>
            </Link>
          </div>

          {/* Audio Teaser */}
          <div className="pt-1">
            <button
              onClick={playCrowdRoar}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/20 hover:border-[#E60012] text-xs font-sans font-semibold text-[#F5F5F5] transition-all active:scale-95 shadow-lg"
            >
              <Volume2 className="w-4 h-4 text-[#E60012] animate-bounce" />
              <span>TAP TO HEAR PUNE REDS ROAR</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
