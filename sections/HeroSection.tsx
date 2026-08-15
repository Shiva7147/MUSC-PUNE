'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Ticket, ChevronRight, Volume2, Shield } from 'lucide-react';
import { Screening } from '@/lib/types';

interface HeroSectionProps {
  featuredScreening?: Screening;
  onOpenScreeningModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenScreeningModal,
}) => {
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
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#08080A]">
      {/* Stadium Spotlight Sweeps */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[900px] bg-gradient-to-b from-[#DA020E]/25 via-[#DA020E]/08 to-transparent blur-3xl animate-floodlight pointer-events-none z-0" />

      {/* Large Soft Watermark Manchester United Crest Graphic Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0 select-none overflow-hidden">
        <svg className="w-[650px] h-[650px] text-white" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 5 L85 20 L85 55 C85 75 50 95 50 95 C50 95 15 75 15 55 L15 20 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M30 40 L70 40 M35 55 L65 55 M50 25 L50 75" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="MUSC Pune Crowd"
          fill
          priority
          className="object-cover object-center opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/75 to-black/85" />
      </div>

      {/* Pitch Lines Grid */}
      <div className="absolute inset-0 bg-pitch-lines opacity-15 pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-8 my-auto">
        {/* Single Clean Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 border border-[#DA020E]/40 text-xs font-mono font-bold text-white shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#DA020E] animate-pulse" />
          <span>MANCHESTER UNITED SUPPORTERS CLUB • PUNE</span>
        </div>

        {/* Clean Hero Headline */}
        <div className="space-y-4">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white leading-none uppercase drop-shadow-2xl">
            PUNE. <span className="text-[#DA020E]">UNITED.</span> ALWAYS.
          </h1>

          <p className="text-base sm:text-xl text-neutral-300 font-sans max-w-2xl mx-auto font-light leading-relaxed">
            The home of Manchester United supporters in Pune. High-decibel screening venues, official merchandise drops, and group trips to Old Trafford.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
          <Link
            href="/screenings"
            className="w-full sm:w-auto flex-1 bg-[#DA020E] hover:bg-[#99000A] text-white font-display text-base tracking-wider font-bold py-4 px-8 rounded-2xl shadow-xl glow-united flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Ticket className="w-5 h-5" />
            <span>GET SCREENING TICKETS</span>
          </Link>

          <a
            href="#about"
            className="w-full sm:w-auto flex-1 bg-neutral-900/90 border border-neutral-700 text-white font-display text-base tracking-wider font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-2 hover:border-[#DA020E] transition-all"
          >
            <span>DISCOVER MUSC PUNE</span>
          </a>
        </div>

        {/* Sound Synth Audio Teaser Pill */}
        <div className="pt-6">
          <button
            onClick={playCrowdRoar}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/90 border border-neutral-800 hover:border-[#DA020E] text-xs font-mono text-neutral-300 hover:text-white transition-all active:scale-95 shadow-md"
          >
            <Volume2 className="w-4 h-4 text-[#DA020E] animate-bounce" />
            <span>TAP TO HEAR PUNE REDS ROAR</span>
          </button>
        </div>
      </div>
    </section>
  );
};
