'use client';

import React from 'react';
import { Tv, Mic, Sparkles, Plane, ArrowUpRight } from 'lucide-react';

export const CommunityExperienceSection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'WATCH TOGETHER',
      icon: Tv,
      tag: 'SCREENINGS',
      desc: '300+ Reds packed under red-lit venues in Viman Nagar & Koregaon Park with dual projectors and surround audio.',
      accent: 'border-[#C8102E]/30 hover:border-[#C8102E]',
    },
    {
      num: '02',
      title: 'SING TOGETHER',
      icon: Mic,
      tag: 'FAN CHANTS',
      desc: 'From "20 Times" to "Glory Glory", chant loud and proud led by our Pune Ultra chant leaders every matchday.',
      accent: 'border-[#C8102E]/30 hover:border-[#C8102E]',
    },
    {
      num: '03',
      title: 'CELEBRATE TOGETHER',
      icon: Sparkles,
      tag: 'CULTURE & MERCH',
      desc: 'Exclusive matchday jersey giveaways, banner painting sessions, and limited Pune x United gear drops.',
      accent: 'border-[#C8102E]/30 hover:border-[#C8102E]',
    },
    {
      num: '04',
      title: 'TRAVEL TOGETHER',
      icon: Plane,
      tag: 'OLD TRAFFORD',
      desc: 'Fly out as an official Pune delegation to Manchester, walk down Sir Matt Busby Way, and take your seat in Stretford End.',
      accent: 'border-[#C8102E]/30 hover:border-[#C8102E]',
    },
  ];

  return (
    <section className="py-24 bg-[#0B0B0B] relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-[#C8102E] font-bold tracking-widest uppercase">
            THE FOUR PILLARS OF PUNE REDS
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mt-2 uppercase">
            SUPPORTERS <span className="text-[#C8102E]">MATCHDAY CULTURE</span>
          </h2>
          <p className="text-sm text-neutral-400 mt-3 font-sans">
            Built by supporters, for supporters. Here is how we live the Manchester United experience in Pune.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p) => {
            const IconComponent = p.icon;
            return (
              <div
                key={p.num}
                className={`bg-neutral-900/70 border ${p.accent} rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden`}
              >
                <div className="absolute right-4 top-4 font-display text-6xl font-bold text-neutral-800/40 select-none group-hover:text-[#C8102E]/10 transition-colors">
                  {p.num}
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#C8102E]/10 border border-[#C8102E]/30 flex items-center justify-center text-[#C8102E]">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                      {p.tag}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#C8102E] transition-colors mt-0.5">
                      {p.title}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white transition-colors relative z-10">
                  <span>MUSC PUNE EXPERIENCE</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C8102E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
