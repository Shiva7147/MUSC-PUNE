'use client';

import React from 'react';
import Image from 'next/image';
import { Camera, Globe, Share2, Shield, Flame } from 'lucide-react';
import { teamMembers } from '@/lib/data';
import { TeamMember } from '@/lib/types';

interface TeamSectionProps {
  members?: (TeamMember & {
    ovr: number;
    position: string;
    stats: { pac: number; cht: number; scr: number; psn: number };
  })[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ members = teamMembers }) => {
  const displayMembers = members && members.length > 0 ? members : teamMembers;

  return (
    <section id="team" className="py-24 bg-[#08080A] relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#DA020E] font-bold tracking-widest uppercase mb-2">
            <Shield className="w-4 h-4" />
            <span>AUTHENTIC FIFA FUT ULTIMATE TEAM CARDS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-white uppercase">
            PUNE REDS <span className="text-[#DA020E]">FUT COMMITTEE</span>
          </h2>
          <p className="text-sm text-neutral-400 mt-2 font-sans">
            The organizers driving MUSC Pune matchdays. Hover or tap any FUT card to reveal full supporter stats!
          </p>
        </div>

        {/* FUT Squad Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayMembers.map((m) => (
            <div key={m.id} className="fut-card-container h-[460px] perspective-1000 cursor-pointer">
              <div className="fut-card-inner relative w-full h-full">
                {/* FUT Card Front (Authentic Gold Shield Layout) */}
                <div className="fut-card-front absolute inset-0 fut-shield-shape p-5 text-black flex flex-col justify-between overflow-hidden relative border-2 border-[#D4AF37]/80">
                  {/* Top Bar: Rating, Position, Flag & Badge */}
                  <div className="flex items-start justify-between relative z-10 border-b border-[#8C641D]/30 pb-2">
                    <div className="flex flex-col items-center leading-none">
                      <span className="font-display text-4xl font-extrabold text-[#1A1405] drop-shadow-sm">
                        {m.ovr || 99}
                      </span>
                      <span className="font-display text-xs font-bold text-[#4D3605] tracking-wider uppercase mt-0.5">
                        {m.position || 'PRES'}
                      </span>

                      {/* Indian Flag & Crest Badges */}
                      <div className="mt-2 flex flex-col gap-1 items-center">
                        <span className="text-xs" title="India">🇮🇳</span>
                        <div className="w-6 h-6 rounded-full bg-[#DA020E] flex items-center justify-center font-display text-[9px] font-bold text-white shadow">
                          MU
                        </div>
                      </div>
                    </div>

                    {/* Cutout Photo Frame */}
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#1A1405]/30 shadow-lg bg-black/40">
                      <Image
                        src={m.photoUrl}
                        alt={m.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  </div>

                  {/* Player Name Banner on Gold Ribbon */}
                  <div className="relative z-10 text-center my-2">
                    <div className="bg-[#1A1405] text-[#F3E0AA] font-display text-xl font-bold py-1 px-3 rounded uppercase tracking-wider shadow-md truncate">
                      {m.name}
                    </div>
                    <div className="text-[10px] font-mono text-[#3D2B05] font-bold uppercase tracking-widest mt-1">
                      {m.role}
                    </div>
                  </div>

                  {/* FUT Stat Matrix Grid */}
                  <div className="relative z-10 bg-[#1A1405]/95 text-[#F3E0AA] p-3 rounded-xl border border-[#D4AF37]/50 grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">PAC</span>
                      <span className="font-bold text-white">{m.stats?.pac || 95}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">CHT</span>
                      <span className="font-bold text-[#DA020E]">{m.stats?.cht || 98}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">SCR</span>
                      <span className="font-bold text-white">{m.stats?.scr || 97}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">PSN</span>
                      <span className="font-bold text-amber-400">{m.stats?.psn || 99}</span>
                    </div>
                  </div>

                  <div className="text-[9px] font-mono text-center text-[#4D3605] font-bold uppercase tracking-widest pt-1">
                    HOVER FOR SUPPORTER BIO ➔
                  </div>
                </div>

                {/* FUT Card Back (Stats & Details) */}
                <div className="fut-card-back absolute inset-0 bg-gradient-to-b from-[#141414] via-[#08080A] to-black border-2 border-[#DA020E] rounded-3xl p-6 shadow-2xl flex flex-col justify-between text-white">
                  <div>
                    <div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-4">
                      <span className="font-display text-lg font-bold text-[#DA020E]">{m.name}</span>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">OVR {m.ovr || 99}</span>
                    </div>

                    {/* Stats Matrix Grid */}
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono mb-4">
                      <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-850 flex justify-between">
                        <span className="text-neutral-500">PAC (PACE)</span>
                        <span className="font-bold text-white">{m.stats?.pac || 95}</span>
                      </div>
                      <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-850 flex justify-between">
                        <span className="text-neutral-500">CHT (CHANTS)</span>
                        <span className="font-bold text-amber-400">{m.stats?.cht || 98}</span>
                      </div>
                      <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-850 flex justify-between">
                        <span className="text-neutral-500">SCR (SCREEN)</span>
                        <span className="font-bold text-white">{m.stats?.scr || 97}</span>
                      </div>
                      <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-850 flex justify-between">
                        <span className="text-neutral-500">PSN (PASSION)</span>
                        <span className="font-bold text-[#DA020E]">{m.stats?.psn || 99}</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-400 font-mono italic leading-relaxed">
                      &quot;{m.bioPlaceholder}&quot;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex justify-center gap-3">
                    <a href="#" className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white">
                      <Camera className="w-4 h-4" />
                    </a>
                    <a href="#" className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white">
                      <Globe className="w-4 h-4" />
                    </a>
                    <a href="#" className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white">
                      <Share2 className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
