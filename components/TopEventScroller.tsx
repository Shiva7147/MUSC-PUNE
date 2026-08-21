'use client';

import React from 'react';
import Link from 'next/link';
import { Screening } from '@/lib/types';

interface TopEventScrollerProps {
  upcomingScreening?: Screening | null;
}

export const TopEventScroller: React.FC<TopEventScrollerProps> = ({ upcomingScreening }) => {
  const eventText = upcomingScreening
    ? `NEXT EVENT • ${upcomingScreening.matchTitle.toUpperCase()} • ${upcomingScreening.venueName.toUpperCase()} • ${upcomingScreening.date.toUpperCase()} • ${upcomingScreening.time.toUpperCase()} • BOOK TICKETS NOW •`
    : `NEXT EVENT • MUSC PUNE MATCHDAY SCREENING • COMING SOON •`;

  return (
    <div className="w-full bg-[#E60012] text-white text-xs font-display font-bold py-2 overflow-hidden relative z-50 border-b border-black/20 shadow-md">
      <div className="whitespace-nowrap flex animate-marquee-track">
        <Link href="/screenings" className="flex items-center gap-8 hover:underline uppercase tracking-wider px-4">
          <span>🔥 🔴 {eventText}</span>
          <span>🔥 🔴 {eventText}</span>
          <span>🔥 🔴 {eventText}</span>
          <span>🔥 🔴 {eventText}</span>
        </Link>
        <Link href="/screenings" className="flex items-center gap-8 hover:underline uppercase tracking-wider px-4">
          <span>🔥 🔴 {eventText}</span>
          <span>🔥 🔴 {eventText}</span>
          <span>🔥 🔴 {eventText}</span>
          <span>🔥 🔴 {eventText}</span>
        </Link>
      </div>
    </div>
  );
};
