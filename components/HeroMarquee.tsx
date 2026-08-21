'use client';

import React from 'react';
import { Flame, Plane, Users } from 'lucide-react';

interface HeroMarqueeProps {
  variant?: 'primary' | 'pune-manchester' | 'culture';
}

export const HeroMarquee: React.FC<HeroMarqueeProps> = ({ variant = 'primary' }) => {
  if (variant === 'pune-manchester') {
    const marqueeItems = [
      'PUNE ➔ MANCHESTER',
      'FC ROAD ➔ OLD TRAFFORD',
      'PUNE REDS ➔ UNITED ROAD',
      'MATCHDAY IN PUNE',
      'STRETFORD END TIER 1',
    ];

    return (
      <div className="w-full bg-[#171717] text-[#F5F5F5] py-2.5 font-display text-sm font-bold tracking-wider uppercase overflow-hidden border-y border-white/10 select-none">
        <div className="animate-marquee-track flex items-center gap-8 whitespace-nowrap">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <div key={idx} className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-[#FFC400]">
                <Plane className="w-4 h-4 text-[#E60012] shrink-0" />
                <span>{item}</span>
              </span>
              <span className="text-white/30">•</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'culture') {
    const marqueeItems = [
      'WATCH TOGETHER',
      'SING TOGETHER',
      'TRAVEL TOGETHER',
      'CELEBRATE TOGETHER',
      'ONE CLUB',
      'ONE COMMUNITY',
    ];

    return (
      <div className="w-full bg-[#050505] text-[#F5F5F5] py-3 font-display text-sm font-bold tracking-wider uppercase overflow-hidden border-y border-white/10 select-none">
        <div className="animate-marquee-track flex items-center gap-10 whitespace-nowrap">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <div key={idx} className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-[#F5F5F5]">
                <Users className="w-4 h-4 text-[#E60012] shrink-0" />
                <span>{item}</span>
              </span>
              <span className="text-white/20">•</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Primary variant
  const marqueeItems = [
    'PUNE IS UNITED',
    'GLORY GLORY MAN UNITED',
    'PUNE REDS',
    'UNITED ROAD',
    'MATCHDAY IN PUNE',
    'OLD TRAFFORD',
    'RED TILL WE DIE',
    'GGMU',
    'MANCHESTER IS RED',
    'PUNE IS RED',
    'ONE CLUB',
    'ONE COMMUNITY',
  ];

  return (
    <div className="w-full bg-[#171717] text-[#F5F5F5] py-3.5 font-display text-lg sm:text-xl font-bold tracking-wider uppercase overflow-hidden border-y border-white/15 shadow-2xl relative z-20 select-none">
      <div className="animate-marquee-track flex items-center gap-8 whitespace-nowrap">
        {marqueeItems.concat(marqueeItems).map((item, idx) => (
          <div key={idx} className="flex items-center gap-6">
            <span className="hover:text-[#FFC400] transition-colors flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#E60012] shrink-0 animate-pulse" />
              <span>{item}</span>
            </span>
            <span className="text-[#E60012]">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
