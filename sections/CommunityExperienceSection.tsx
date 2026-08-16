'use client';

import React from 'react';
import Image from 'next/image';
import { Users, Tv, Mic2, Plane, Shirt } from 'lucide-react';

export const CommunityExperienceSection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'WATCH TOGETHER',
      icon: Tv,
      desc: '300+ Pune Reds packed into Viman Nagar and Koregaon Park screening arenas under high-decibel sound systems.',
      image: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865411/WhatsApp_Image_2026-08-16_at_11.53.51_AM_ddhmkc.jpg',
    },
    {
      num: '02',
      title: 'SING TOGETHER',
      icon: Mic2,
      desc: 'Terrace ultras chanting 20 Times and Glory Glory Man United till midnight.',
      image: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865423/WhatsApp_Image_2026-08-16_at_12.29.46_PM_m8ytoq.jpg',
    },
    {
      num: '03',
      title: 'TRAVEL TOGETHER',
      icon: Plane,
      desc: 'Group pilgrimages from Pune (PNQ) directly to Old Trafford and Sir Matt Busby Way.',
      image: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865406/WhatsApp_Image_2026-08-16_at_11.53.51_AM_13_arf4zr.jpg',
    },
    {
      num: '04',
      title: 'REPRESENT TOGETHER',
      icon: Shirt,
      desc: 'Wearing official MUSC Pune terrace scarves and supporters merchandise.',
      image: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865350/pune-mufc-scarf-600x600_q27exs.png',
    },
  ];

  return (
    <section className="py-24 bg-[#161513] relative border-t border-[#683F39]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C8102E] font-bold tracking-widest uppercase">
            <Users className="w-4 h-4" />
            <span>PUNE REDS CULTURE PILLARS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#E7E0CF] uppercase">
            ONE CLUB. <span className="text-[#C8102E]">ONE COMMUNITY.</span>
          </h2>
          <p className="text-sm text-[#E7E0CF]/70 font-sans">
            How Manchester United supporters come together across Pune, Maharashtra.
          </p>
        </div>

        {/* Asymmetrical Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const IconComp = p.icon;
            return (
              <div
                key={p.num}
                className="glass-card rounded-3xl p-6 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-[#C8102E]"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-[#683F39]/30">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 bg-[#C8102E] text-white font-mono text-xs font-bold px-2.5 py-0.5 rounded">
                    {p.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-display font-bold text-[#C8102E]">
                    <IconComp className="w-4 h-4" />
                    <span>{p.title}</span>
                  </div>
                  <p className="text-xs text-[#E7E0CF]/70 font-mono leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
