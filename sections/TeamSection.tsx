'use client';

import React from 'react';
import Image from 'next/image';
import { Camera, Globe, Share2, Shield } from 'lucide-react';
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
    <section id="team" className="py-24 bg-[#070707] relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C8102E] font-bold tracking-widest uppercase mb-2">
            <Shield className="w-4 h-4" />
            <span>FUT ULTIMATE SQUAD TRADING CARDS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-white uppercase">
            PUNE REDS <span className="text-[#C8102E]">FUT COMMITTEE</span>
          </h2>
          <p className="text-sm text-neutral-400 mt-2 font-sans">
            The core organizers behind MUSC Pune. Hover over any squad trading card to flip and view supporter stats!
          </p>
        </div>

        {/* FUT Squad Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayMembers.map((m) => (
            <div key={m.id} className="fut-card-container h-[420px] perspective-1000 cursor-pointer">
              <div className="fut-card-inner relative w-full h-full">
                {/* FUT Card Front */}
                <div className="fut-card-front absolute inset-0 bg-gradient-to-b from-[#D4AF37] via-[#870019] to-[#070707] border-2 border-[#D4AF37] rounded-3xl p-5 shadow-2xl flex flex-col justify-between text-white overflow-hidden">
                  {/* Holographic Top Bar */}
                  <div className="flex items-center justify-between border-b border-[#D4AF37]/40 pb-3">
                    <div>
                      <div className="font-display text-4xl font-extrabold text-[#D4AF37] leading-none drop-shadow">
                        {m.ovr}
                      </div>
                      <div className="font-display text-xs font-bold text-white tracking-wider mt-0.5">
                        {m.position}
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-black/80 border border-[#D4AF37]/50 flex items-center justify-center font-display text-sm font-bold text-[#C8102E]">
                      MU
                    </div>
                  </div>

                  {/* Photo & Crest */}
                  <div className="my-auto text-center relative py-2">
                    <div className="w-28 h-28 rounded-full bg-black/80 border-2 border-[#D4AF37] mx-auto relative overflow-hidden shadow-xl">
                      <Image
                        src={m.photoUrl}
                        alt={m.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Card Name & Bio */}
                  <div className="text-center space-y-1.5 border-t border-[#D4AF37]/40 pt-3">
                    <h3 className="font-display text-xl font-bold tracking-wide text-white uppercase truncate">
                      {m.name}
                    </h3>
                    <div className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase truncate">
                      {m.role}
                    </div>
                    <div className="text-[9px] font-mono text-neutral-400">
                      HOVER TO VIEW SUPPORTER STATS ➔
                    </div>
                  </div>
                </div>

                {/* FUT Card Back (Stats & Details) */}
                <div className="fut-card-back absolute inset-0 bg-gradient-to-b from-[#141414] via-[#070707] to-black border-2 border-[#C8102E] rounded-3xl p-6 shadow-2xl flex flex-col justify-between text-white">
                  <div>
                    <div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-4">
                      <span className="font-display text-lg font-bold text-[#C8102E]">{m.name}</span>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">OVR {m.ovr}</span>
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
                        <span className="font-bold text-[#C8102E]">{m.stats?.psn || 99}</span>
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
