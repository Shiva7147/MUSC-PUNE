'use client';

import React from 'react';
import { Flame, Shield } from 'lucide-react';

interface HeroMarqueeProps {
  variant?: 'primary' | 'pune-manchester' | 'culture';
}

export const HeroMarquee: React.FC<HeroMarqueeProps> = ({ variant = 'primary' }) => {
  if (variant === 'pune-manchester') {
    const marqueeItems = [
      "PUNE'S RED ARMY - LOUD AND PROUD",
      "PUNE'S RED ARMY - LOUD AND PROUD",
      "PUNE'S RED ARMY - LOUD AND PROUD",
      "PUNE'S RED ARMY - LOUD AND PROUD",
    ];

    return (
      <div className="w-full bg-[#171717] text-white py-3 font-display text-base sm:text-xl font-bold tracking-wider uppercase overflow-hidden border-y border-white/10 select-none">
        <div className="animate-marquee-track flex items-center gap-8 whitespace-nowrap">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <div key={idx} className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-[#E60012]">
                <Shield className="w-5 h-5 text-[#E60012] shrink-0" />
                <span className="text-white">{item}</span>
              </span>
              <span className="text-white/30">•</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Primary variant: GLORY GLORY MAN UNITED
  const marqueeItems = [
    'GLORY GLORY MAN UNITED',
    'GLORY GLORY MAN UNITED',
    'GLORY GLORY MAN UNITED',
    'GLORY GLORY MAN UNITED',
  ];

  return (
    <div className="w-full bg-[#E60012] text-white py-3 font-display text-lg sm:text-2xl font-bold tracking-wider uppercase overflow-hidden border-y border-black/20 shadow-2xl relative z-20 select-none">
      <div className="animate-marquee-track flex items-center gap-8 whitespace-nowrap">
        {marqueeItems.concat(marqueeItems).map((item, idx) => (
          <div key={idx} className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-white shrink-0 animate-pulse" />
              <span>{item}</span>
            </span>
            <span className="text-white/50">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
