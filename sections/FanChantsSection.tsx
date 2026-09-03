'use client';

import React, { useState } from 'react';
import { Volume2, Play, Pause, Mic2 } from 'lucide-react';
import { FanChant } from '@/lib/types';

interface FanChantsSectionProps {
  chants: FanChant[];
}

export const FanChantsSection: React.FC<FanChantsSectionProps> = ({ chants }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeLineIdx, setActiveLineIdx] = useState<number>(0);

  // Web Audio API Synthesizer for Chant & Crowd Sounds
  const playSynthesizedChant = (chantId: string) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();

      // Referee Whistle synth
      const osc = ctx.createOscillator();
      const whistleGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.15);
      whistleGain.gain.setValueAtTime(0.3, ctx.currentTime);
      whistleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(whistleGain);
      whistleGain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);

      // Deep stadium crowd roar synth
      const bufferSize = ctx.sampleRate * 2.0;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime + 0.2);
      gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(ctx.currentTime + 0.2);
    } catch {
      // AudioContext fallback
    }
  };

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      playSynthesizedChant(id);

      let line = 0;
      const interval = setInterval(() => {
        line = (line + 1) % 6;
        setActiveLineIdx(line);
      }, 1200);

      setTimeout(() => clearInterval(interval), 7200);
    }
  };

  return (
    <section id="chants" className="py-24 bg-[#050505] relative border-t border-white/10 overflow-hidden">
      {/* Giant Typography Background Overlays */}
      <div
        className="absolute top-10 left-0 right-0 flex justify-between font-display text-8xl md:text-9xl font-bold text-white pointer-events-none select-none"
        style={{ opacity: 0.04 }}
      >
        <span>GGMU</span>
        <span>GLORY GLORY</span>
        <span>UNITED ROAD</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header & Soundwave Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-display text-[#E60012] font-bold uppercase">
              <Mic2 className="w-4 h-4" />
              <span>TERRACE NOISE VAULT</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mt-1 uppercase">
              MANCHESTER UNITED <span className="text-[#E60012]">FAN CHANTS</span>
            </h2>
            <p className="text-sm text-[#F5F5F5]/70 max-w-xl mt-2 font-sans">
              Learn the chant lyrics sung loudest at our Pune matchday screening.
            </p>
          </div>

          {/* Sound Wave Frequency Graphic */}
          <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center gap-4">
            <div className="flex items-end gap-1 h-8">
              <span className="w-1 bg-[#E60012] h-4 animate-pulse" />
              <span className="w-1 bg-[#E60012] h-7 animate-pulse" />
              <span className="w-1 bg-[#E60012] h-3 animate-pulse" />
              <span className="w-1 bg-[#E60012] h-8 animate-pulse" />
              <span className="w-1 bg-[#E60012] h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-display text-white/60 uppercase">MAX TERRACE NOISE</div>
              <div className="font-display text-xl font-bold text-white">
                118 dB <span className="text-xs font-sans text-[#E60012] font-normal">@ SCREENINGS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chants Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {chants.map((ch) => {
            const isPlaying = playingId === ch.id;
            return (
              <div
                key={ch.id}
                className={`glass-card rounded-3xl p-6 flex flex-col justify-between space-y-6 relative overflow-hidden bg-[#171717] ${
                  isPlaying ? 'border-[#E60012] shadow-2xl' : 'border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <span className="text-[10px] font-sans text-white/60 uppercase">
                      {ch.origin}
                    </span>

                    <button
                      onClick={() => togglePlay(ch.id)}
                      className={`p-3 rounded-full border transition-all ${
                        isPlaying
                          ? 'bg-[#E60012] text-white border-[#E60012] animate-pulse'
                          : 'bg-[#050505] text-white border-white/20 hover:border-[#E60012]'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-1 uppercase">{ch.title}</h3>
                  <p className="text-[11px] font-sans text-[#E60012] mb-4 font-medium">{ch.popularContext}</p>

                  <div className="bg-[#050505] p-4 rounded-2xl border border-white/10 space-y-2 font-mono text-xs text-white/90 italic">
                    {ch.lyrics.map((line, idx) => (
                      <p
                        key={idx}
                        className={`transition-colors ${
                          isPlaying && activeLineIdx === idx
                            ? 'text-[#E60012] font-bold not-italic scale-[1.02] bg-[#E60012]/10 p-1 rounded border-l-2 border-[#E60012]'
                            : idx % 2 === 0
                            ? 'text-white font-semibold'
                            : 'text-white/60'
                        }`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-sans text-white/50 pt-2 border-t border-white/10">
                  <span className="flex items-center gap-1.5 text-white/80">
                    <Volume2 className="w-3.5 h-3.5 text-[#E60012]" />
                    {isPlaying ? 'WEB AUDIO SYNTH PLAYING...' : 'AUDIO SYNTH READY'}
                  </span>
                  <span className="text-[#E60012] font-bold font-display">MUSC PUNE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
