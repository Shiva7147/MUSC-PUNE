'use client';

import React from 'react';
import { Flame } from 'lucide-react';

export const HeroMarquee: React.FC = () => {
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
    <div className="w-full bg-[#DA020E] text-white py-3 font-display text-lg sm:text-xl font-bold tracking-wider uppercase overflow-hidden border-y border-white/20 shadow-xl relative z-20 select-none">
      <div className="animate-marquee-track flex items-center gap-8 whitespace-nowrap">
        {marqueeItems.concat(marqueeItems).map((item, idx) => (
          <div key={idx} className="flex items-center gap-6">
            <span className="hover:text-amber-300 transition-colors flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-300 shrink-0 animate-pulse" />
              <span>{item}</span>
            </span>
            <span className="text-white/40 font-mono text-sm">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
