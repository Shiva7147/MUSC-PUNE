'use client';

import React from 'react';
import Image from 'next/image';
import { officialLogoUrl } from '@/lib/data';

export const HeroRotatingEmblem: React.FC = () => {
  return (
    <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 mx-auto flex items-center justify-center select-none group">
      {/* Outer Rotating Text Circle */}
      <div className="absolute inset-0 animate-spin-slow pointer-events-none">
        <svg className="w-full h-full text-[#E60012]" viewBox="0 0 200 200">
          <path
            id="textPathCircle"
            d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            fill="none"
          />
          <text className="font-display text-[12.5px] font-bold fill-white tracking-[0.25em] uppercase">
            <textPath href="#textPathCircle" startOffset="0%">
              MANCHESTER UNITED SUPPORTERS CLUB • PUNE • EST. 2011 •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Center Crest Emblem Badge */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-[#E60012] shadow-[0_0_30px_rgba(230,0,18,0.5)] bg-[#050505] p-1.5 transition-transform group-hover:scale-105">
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            src={officialLogoUrl}
            alt="MUSC Pune Official Emblem"
            fill
            quality={100}
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};
