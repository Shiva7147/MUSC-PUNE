'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Ticket, ChevronRight, Volume2, Flame } from 'lucide-react';
import { Screening } from '@/lib/types';

interface HeroSectionProps {
  featuredScreening: Screening;
  onOpenScreeningModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredScreening,
  onOpenScreeningModal,
}) => {
  // Live Ticking Scoreboard Countdown State (Target: March 15, 2026 21:00 IST)
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, mins: 32, secs: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#08080A]">
      {/* Stadium Floodlight Sweep Lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[900px] bg-gradient-to-b from-[#DA020E]/30 via-[#DA020E]/10 to-transparent blur-3xl animate-floodlight pointer-events-none z-0" />
      <div className="absolute top-0 right-1/4 w-[450px] h-[850px] bg-gradient-to-b from-white/10 via-[#DA020E]/10 to-transparent blur-3xl animate-floodlight pointer-events-none z-0" />

      {/* Red Smoke Particle Glows */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#99000A]/40 rounded-full blur-[140px] animate-smoke pointer-events-none z-0" />

      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="MUSC Pune Crowd"
          fill
          priority
          className="object-cover object-center opacity-35 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/70 to-black/80" />
      </div>

      {/* Pitch Lines Vector Overlay */}
      <div className="absolute inset-0 bg-pitch-lines opacity-20 pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-between min-h-[78vh]">
        {/* Top Ticker Row & Web Audio Teaser */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black/80 border border-[#DA020E]/40 text-[11px] font-mono font-bold text-white">
            <span className="w-2 h-2 rounded-full bg-[#DA020E] animate-ping" />
            <span>OFFICIAL SUPPORTERS CLUB • PUNE, MAHARASHTRA</span>
          </div>

          {/* Web Audio Roar Teaser Button */}
          <button
            onClick={playCrowdRoar}
            className="px-4 py-1.5 rounded-full bg-neutral-900/90 border border-[#DA020E]/50 hover:border-[#DA020E] text-xs font-mono text-white flex items-center gap-2 hover:bg-[#DA020E]/20 transition-all shadow-md active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-[#DA020E] animate-bounce" />
            <span className="font-bold">TAP TO HEAR PUNE REDS ROAR</span>
          </button>
        </div>

        {/* Main Hero Headlines & Rivalry Scoreboard Widget */}
        <div className="my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 text-center sm:text-left space-y-6">
            <div className="inline-block">
              <span className="badge-united text-xs font-mono font-bold px-3.5 py-1.5 rounded-lg uppercase tracking-widest">
                लाल पुणे • MATCHDAY TERRACE EXPERIENCE
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white leading-none uppercase drop-shadow-xl">
              PUNE. <span className="text-[#DA020E]">UNITED.</span> ALWAYS.
            </h1>

            <p className="text-base sm:text-xl text-neutral-300 font-sans max-w-2xl font-light leading-relaxed">
              Where Manchester United supporters in Pune come together. High-decibel screening venues, official merchandise drops, and group trips to Old Trafford.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={onOpenScreeningModal}
                className="w-full sm:w-auto bg-[#DA020E] hover:bg-[#99000A] text-white font-display text-lg tracking-wider font-bold px-8 py-4 rounded-2xl shadow-2xl glow-united flex items-center justify-center gap-3 transition-all hover:scale-[1.03]"
              >
                <Ticket className="w-5 h-5" />
                <span>GET SCREENING TICKETS</span>
              </button>

              <a
                href="#about"
                className="w-full sm:w-auto bg-neutral-900 border border-neutral-700 text-white font-display text-lg tracking-wider font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 hover:border-[#DA020E] transition-all"
              >
                <span>DISCOVER MUSC PUNE</span>
              </a>
            </div>
          </div>

          {/* Scoreboard Countdown Widget */}
          <div className="lg:col-span-4 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 border-2 border-[#DA020E]/50 rounded-3xl p-6 shadow-2xl space-y-5 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 text-8xl font-display font-bold opacity-10 text-white select-none">
              VS
            </div>

            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="text-[10px] font-mono tracking-widest text-[#DA020E] font-bold uppercase flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> STADIUM SCOREBOARD
              </span>
              <span className="text-[10px] font-mono text-neutral-400">NEXT FIXTURE</span>
            </div>

            {/* Teams Clash Match Visual */}
            <div className="flex items-center justify-between py-2 text-center">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#DA020E] flex items-center justify-center text-xl font-bold font-display shadow-lg mx-auto">
                  MU
                </div>
                <div className="font-display text-sm font-bold text-white mt-1">MAN UTD</div>
              </div>

              <div className="font-display text-2xl font-bold text-[#DA020E] italic">VS</div>

              <div>
                <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xl font-bold font-display shadow-lg mx-auto text-red-500">
                  LFC
                </div>
                <div className="font-display text-sm font-bold text-white mt-1">LIVERPOOL</div>
              </div>
            </div>

            {/* Countdown Ticker Units */}
            <div className="grid grid-cols-4 gap-2 text-center pt-2">
              <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                <div className="font-display text-2xl font-bold text-white">{String(timeLeft.days).padStart(2, '0')}</div>
                <div className="text-[8px] font-mono text-neutral-500 uppercase">DAYS</div>
              </div>
              <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                <div className="font-display text-2xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-[8px] font-mono text-neutral-500 uppercase">HOURS</div>
              </div>
              <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                <div className="font-display text-2xl font-bold text-white">{String(timeLeft.mins).padStart(2, '0')}</div>
                <div className="text-[8px] font-mono text-neutral-500 uppercase">MINS</div>
              </div>
              <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                <div className="font-display text-2xl font-bold text-[#DA020E] animate-pulse">{String(timeLeft.secs).padStart(2, '0')}</div>
                <div className="text-[8px] font-mono text-neutral-500 uppercase">SECS</div>
              </div>
            </div>

            <button
              onClick={onOpenScreeningModal}
              className="w-full bg-[#DA020E] hover:bg-[#99000A] text-white font-display text-xs tracking-wider font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all"
            >
              <span>RESERVE MATCH PASS (₹350)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Pune Skyline & Network */}
        <div className="pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-neutral-400 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#DA020E]" />
            <span>Viman Nagar • Koregaon Park • Baner</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#DA020E]" />
            <span>Shaniwar Wada ➔ Old Trafford Route</span>
          </div>
          <div className="flex items-center gap-2 text-white font-bold">
            <span>पुणे युनायटED SUPPORTERS NETWORK</span>
          </div>
        </div>
      </div>
    </section>
  );
};
