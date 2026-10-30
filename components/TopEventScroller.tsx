'use client';

import React from 'react';
import Link from 'next/link';
import { Screening } from '@/lib/types';

interface TopEventScrollerProps {
  upcomingScreening?: Screening | null;
}

export const TopEventScroller: React.FC<TopEventScrollerProps> = ({ upcomingScreening }) => {
  const match = upcomingScreening;
  const capacity = match?.capacity ?? 50;
  const remaining = match?.remainingSeats ?? 47;
  const sold = Math.max(0, capacity - remaining);
  const filledPct = Math.min(100, Math.round((sold / capacity) * 100)) || 6;
  const availPct = 100 - filledPct;

  const eventText = match
    ? `NEXT MATCHDAY SCREENING: ${match.matchTitle.toUpperCase()} • ${match.date.toUpperCase()} • ${match.time.toUpperCase()} • ${match.venueName.toUpperCase()} • 🎟️ ${filledPct}% SEATS FILLED (${availPct}% AVAILABLE) • GET SCREENING TICKETS •`
    : `NEXT MATCHDAY SCREENING: CHELSEA vs MANCHESTER UNITED • SATURDAY, OCTOBER 31, 2026 • 6:00 PM IST • BIRA 91 TAPROOM, THE MILLS • 🎟️ 6% SEATS FILLED (94% AVAILABLE) • GET SCREENING TICKETS •`;

  return (
    <div className="w-full h-9 bg-[#E60012] text-white text-[11px] sm:text-xs font-display font-bold flex items-center overflow-hidden border-b border-black/20 shadow-md">
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
