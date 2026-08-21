'use client';

import React from 'react';
import Image from 'next/image';
import { Shield, Award, Globe, Share2, ExternalLink } from 'lucide-react';
import { teamMembers } from '@/lib/data';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-display text-[#FFC400] font-bold tracking-wider uppercase">
              <Shield className="w-4 h-4 text-[#E60012]" />
              <span>CLUB LEADERSHIP & DELEGATION</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mt-1 uppercase">
              PUNE REDS <span className="text-[#E60012]">DELEGATION</span>
            </h2>
            <p className="text-sm text-[#F5F5F5]/70 max-w-xl mt-2 font-sans">
              Meet the team driving screening matchdays, Old Trafford pilgrimages, and terrace culture across Pune.
            </p>
          </div>

          <div className="badge-gold text-xs font-display px-3.5 py-1.5 rounded-lg font-bold">
            🛡️ ULTRAS EXECUTIVE COMMITTEE
          </div>
        </div>

        {/* FUT-Style 3D Flip Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="fut-card-container h-[420px] cursor-pointer">
              <div className="fut-card-inner">
                {/* Front Card Face */}
                <div className="fut-card-front bg-[#171717] border-2 border-[#FFC400]/40 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-1">
                      <span className="font-display text-2xl font-bold text-[#FFC400]">{member.ovr}</span>
                      <span className="font-display text-xs text-white/70 uppercase font-bold">{member.position}</span>
                    </div>
                    <span className="badge-united text-[9px] font-display px-2 py-0.5 rounded uppercase font-bold">
                      🔴 MUSC
                    </span>
                  </div>

                  <div className="relative w-full aspect-square my-2 rounded-2xl overflow-hidden bg-black border border-white/10">
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      fill
                      quality={90}
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="text-center space-y-1">
                    <h3 className="font-display text-xl font-bold text-white tracking-tight truncate">{member.name}</h3>
                    <p className="text-xs font-sans text-[#FFC400] font-semibold truncate">{member.role}</p>
                  </div>

                  {/* FUT Stats Bar */}
                  <div className="grid grid-cols-4 gap-1 text-center pt-2 border-t border-white/10 text-[10px] font-display text-white/80">
                    <div><span className="text-[#FFC400]">{member.stats.pac}</span> PAC</div>
                    <div><span className="text-[#FFC400]">{member.stats.cht}</span> CHT</div>
                    <div><span className="text-[#FFC400]">{member.stats.scr}</span> SCR</div>
                    <div><span className="text-[#FFC400]">{member.stats.psn}</span> PSN</div>
                  </div>
                </div>

                {/* Back Card Face (Revealed on Hover) */}
                <div className="fut-card-back bg-[#171717] border-2 border-[#E60012] p-6 flex flex-col justify-between shadow-2xl relative text-white">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-display text-[#FFC400] font-bold">
                      <Award className="w-4 h-4 text-[#E60012]" />
                      <span>OFFICIAL BIO</span>
                    </div>

                    <h4 className="font-display text-xl font-bold text-white">{member.name}</h4>
                    <p className="text-xs font-sans text-white/80 leading-relaxed">
                      {member.bioPlaceholder}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="text-[10px] font-display text-white/60 font-bold uppercase">CONNECT:</div>
                    <div className="flex items-center gap-3">
                      <a href="#" className="p-2 rounded-xl bg-[#050505] text-white hover:text-[#E60012] transition-colors border border-white/10">
                        <Globe className="w-4 h-4" />
                      </a>
                      <a href="#" className="p-2 rounded-xl bg-[#050505] text-white hover:text-[#E60012] transition-colors border border-white/10">
                        <Share2 className="w-4 h-4" />
                      </a>
                      <a href="#" className="p-2 rounded-xl bg-[#050505] text-white hover:text-[#E60012] transition-colors border border-white/10">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
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
