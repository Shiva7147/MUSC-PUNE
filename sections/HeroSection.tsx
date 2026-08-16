'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Ticket, Volume2 } from 'lucide-react';
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
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-24 overflow-hidden bg-[#161513]">
      {/* Full Bleed REAL Photography Background Overlay — BRIGHT & VISIBLE (No Dark Tint!) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865411/WhatsApp_Image_2026-08-16_at_11.53.51_AM_ddhmkc.jpg"
          alt="MUSC Pune Real Matchday Crowd"
          fill
          priority
          className="object-cover object-center brightness-95 opacity-85 transition-transform duration-1000"
        />
        {/* Soft localized gradient at bottom and top for text readability without darkening image */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#161513]/70 via-transparent to-[#161513]/95" />
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 bg-grain opacity-15 pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-8 my-auto">
        {/* Dynamic Editorial Headline in Jersey Ivory */}
        <div className="space-y-4">
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-[#E7E0CF] leading-none uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
            PUNE. <span className="text-[#C8102E]">UNITED.</span> ALWAYS.
          </h1>

          <p className="text-base sm:text-xl text-[#E7E0CF] font-sans max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
            Where Manchester United supporters in Pune come together. High-decibel screening venues, official merchandise, and group trips to Old Trafford.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
          <Link
            href="/screenings"
            className="w-full sm:w-auto flex-1 bg-[#C8102E] hover:bg-[#A00C24] text-white font-display text-base tracking-wider font-bold py-4 px-8 rounded-2xl shadow-2xl glow-united flex items-center justify-center gap-2 transition-all hover:scale-[1.03]"
          >
            <Ticket className="w-5 h-5" />
            <span>GET SCREENING TICKETS</span>
          </Link>

          <Link
            href="/membership"
            className="w-full sm:w-auto flex-1 glass-panel border border-[#E7E0CF]/40 text-[#E7E0CF] font-display text-base tracking-wider font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-2 hover:border-[#C8102E] hover:bg-black/60 transition-all shadow-xl"
          >
            <span>JOIN MUSC PUNE</span>
          </Link>
        </div>

        {/* Audio Teaser */}
        <div className="pt-2">
          <button
            onClick={playCrowdRoar}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#E7E0CF]/30 hover:border-[#C8102E] text-xs font-mono text-[#E7E0CF] transition-all active:scale-95 shadow-lg"
          >
            <Volume2 className="w-4 h-4 text-[#C8102E] animate-bounce" />
            <span>TAP TO HEAR PUNE REDS ROAR</span>
          </button>
        </div>
      </div>
    </section>
  );
};
