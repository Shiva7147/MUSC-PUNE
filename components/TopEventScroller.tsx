'use client';

import React from 'react';
import Link from 'next/link';
import { Screening } from '@/lib/types';

interface TopEventScrollerProps {
  upcomingScreening?: Screening | null;
}

export const TopEventScroller: React.FC<TopEventScrollerProps> = ({ upcomingScreening }) => {
  const eventText = upcomingScreening
    ? `NEXT MATCHDAY: ${upcomingScreening.matchTitle.toUpperCase()} • ${upcomingScreening.venueName.toUpperCase()} • ${upcomingScreening.date.toUpperCase()} • ${upcomingScreening.time.toUpperCase()} • BOOK TICKETS NOW •`
    : `NEXT MATCHDAY: MANCHESTER UNITED vs LIVERPOOL • BIRA 91 TAPROOM, THE MILLS • BOOK TICKETS NOW •`;

  return (
    <div className="fixed top-0 left-0 right-0 h-9 bg-[#E60012] text-white text-[11px] sm:text-xs font-display font-bold flex items-center overflow-hidden z-50 border-b border-black/20 shadow-md">
      <div className="whitespace-nowrap flex animate-marquee-track">
        <Link href="/screenings" className="flex items-center gap-8 hover:underline uppercase tracking-tight px-4">
          <span>🔥 🔴 {eventText}</span>
          <span>🔥 🔴 {eventText}</span>
          <span>🔥 🔴 {eventText}</span>
          <span>🔥 🔴 {eventText}</span>
        </Link>
        <Link href="/screenings" className="flex items-center gap-8 hover:underline uppercase tracking-tight px-4">
          <span>🔥 🔴 {eventText}</span>
          <span>🔥 🔴 {eventText}</span>
          <span>🔥 🔴 {eventText}</span>
          <span>🔥 🔴 {eventText}</span>
        </Link>
      </div>
    </div>
  );
};
