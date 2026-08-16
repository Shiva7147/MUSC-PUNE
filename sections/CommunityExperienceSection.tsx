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
      image: '/images/screening.jpg',
    },
    {
      num: '02',
      title: 'SING TOGETHER',
      icon: Mic2,
      desc: 'Terrace ultras chanting 20 Times and Glory Glory Man United till midnight.',
      image: '/images/hero.jpg',
    },
    {
      num: '03',
      title: 'TRAVEL TOGETHER',
      icon: Plane,
      desc: 'Group pilgrimages from Pune (PNQ) directly to Old Trafford and Sir Matt Busby Way.',
      image: '/images/tour.jpg',
    },
    {
      num: '04',
      title: 'REPRESENT TOGETHER',
      icon: Shirt,
      desc: 'Wearing the official 300 GSM heavyweight Pune Reds matchday streetwear kit.',
      image: '/images/merchandise.jpg',
    },
  ];

  return (
    <section className="py-24 bg-[#0A0A0E] relative border-t border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#DA020E] font-bold tracking-widest uppercase">
            <Users className="w-4 h-4" />
            <span>PUNE REDS CULTURE PILLARS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-white uppercase">
            ONE CLUB. <span className="text-[#DA020E]">ONE COMMUNITY.</span>
          </h2>
          <p className="text-sm text-neutral-400 font-sans">
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
                className="glass-card rounded-3xl p-6 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-[#DA020E]"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-neutral-800">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 bg-[#DA020E] text-white font-mono text-xs font-bold px-2.5 py-0.5 rounded">
                    {p.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-display font-bold text-[#DA020E]">
                    <IconComp className="w-4 h-4" />
                    <span>{p.title}</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-mono leading-relaxed">
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
