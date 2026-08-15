'use client';

import React from 'react';
import Image from 'next/image';
import { Ticket, Calendar, Clock, MapPin, Flame, ArrowRight, Barcode } from 'lucide-react';
import { Screening } from '@/lib/types';

interface ScreeningsSectionProps {
  screenings: Screening[];
  onSelectScreening: (screening: Screening) => void;
}

export const ScreeningsSection: React.FC<ScreeningsSectionProps> = ({
  screenings,
  onSelectScreening,
}) => {
  const featured = screenings.find((s) => s.featured) || screenings[0];
  const upcomingList = screenings.filter((s) => s.id !== featured.id);

  return (
    <section id="screenings" className="py-24 bg-[#08080A] relative overflow-hidden border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#DA020E] font-bold tracking-widest uppercase">
              <Flame className="w-4 h-4" />
              <span>PRIMARY MATCHDAY TICKET ENGINE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mt-1 uppercase">
              MATCHDAY <span className="text-[#DA020E]">TICKET STUBS</span>
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl mt-2 font-sans">
              Tactile perforated passes for Pune&apos;s biggest matchday screenings. Includes cover vouchers and official club badge giveaways.
            </p>
          </div>

          <div className="badge-pune text-xs font-mono px-3 py-1 font-bold rounded-lg">
            🔴 LIVE TICKETING SYSTEM ACTIVE
          </div>
        </div>

        {/* Featured Perforated Ticket Stub Card */}
        <div className="bg-neutral-900 border-2 border-[#DA020E]/60 rounded-3xl overflow-hidden shadow-2xl relative mb-16 ticket-notch-left ticket-notch-right">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Poster / Match Image */}
            <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[460px] overflow-hidden">
              <Image
                src="/images/screening.jpg"
                alt={featured.matchTitle}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-neutral-900/50 lg:to-neutral-900" />
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <span className="bg-[#DA020E] text-white text-xs font-mono font-bold px-3 py-1.5 rounded-md shadow-lg uppercase tracking-wider">
                  FEATURED MATCHDAY STUB
                </span>
                <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold px-3 py-1.5 rounded-md">
                  🌤️ 24°C • CLEAR NIGHT
                </span>
              </div>
            </div>

            {/* Stub Specifications & Barcode */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-neutral-900 to-black">
              <div>
                <div className="text-xs font-mono text-neutral-400 tracking-wider uppercase mb-1">
                  {featured.competition}
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                  {featured.matchTitle}
                </h3>

                {/* Real-time Booking Capacity Meter */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-amber-400 font-bold">🔥 85% BOOKED — ONLY 25 SEATS LEFT</span>
                    <span className="text-neutral-500">255 / 300</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-950 overflow-hidden border border-neutral-800">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-[#DA020E] w-[85%]" />
                  </div>
                </div>

                <p className="text-xs text-neutral-300 mt-4 leading-relaxed font-sans">
                  {featured.description}
                </p>
              </div>

              {/* Match Stub Grid */}
              <div className="space-y-2.5 bg-neutral-950 p-4 rounded-2xl border border-neutral-800 text-xs font-mono">
                <div className="flex items-center justify-between border-b border-neutral-850 pb-2">
                  <span className="text-neutral-500">DATE & TIME</span>
                  <span className="text-white font-bold">{featured.date} • {featured.time}</span>
                </div>
                <div className="flex items-center justify-between border-b border-neutral-850 pb-2">
                  <span className="text-neutral-500">VENUE</span>
                  <span className="text-[#DA020E] font-bold">{featured.venueName}</span>
                </div>
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-neutral-500">ENTRY PASS PRICE</span>
                  <span className="font-display text-xl font-bold text-white">₹{featured.price}</span>
                </div>
              </div>

              {/* Barcode Graphic */}
              <div className="pt-2 border-t border-dashed border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Barcode className="w-8 h-8 text-neutral-500" />
                  <span className="font-mono text-[10px] text-neutral-500">STUB-PASS-2026-X89</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">VERIFIED ENTRY</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onSelectScreening(featured)}
                  className="flex-1 bg-[#DA020E] hover:bg-[#99000A] text-white font-display text-base tracking-wider font-bold py-3.5 px-6 rounded-xl shadow-xl glow-united flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Ticket className="w-5 h-5" />
                  <span>GET YOUR TICKET</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Upcoming Stub Grid */}
        <div>
          <h3 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-wide">
            UPCOMING MATCHDAY STUBS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingList.map((sc) => (
              <div
                key={sc.id}
                className="bg-neutral-900 border border-neutral-800 hover:border-[#DA020E]/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between space-y-4 ticket-notch-left shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                    <span>{sc.competition}</span>
                    <span className="px-2.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-bold">
                      {sc.status}
                    </span>
                  </div>

                  <h4 className="font-display text-2xl font-bold text-white group-hover:text-[#DA020E] transition-colors">
                    {sc.matchTitle}
                  </h4>

                  <div className="mt-4 space-y-1.5 text-xs font-mono text-neutral-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#DA020E]" />
                      <span>{sc.date} • {sc.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#DA020E]" />
                      <span>{sc.venueName}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-dashed border-neutral-800 flex items-center justify-between">
                  <div className="font-display text-lg font-bold text-[#DA020E]">
                    ₹{sc.price} <span className="text-xs text-neutral-500 font-sans font-normal">/ pass</span>
                  </div>

                  <button
                    onClick={() => onSelectScreening(sc)}
                    className="bg-neutral-800 hover:bg-[#DA020E] text-white font-display text-xs tracking-wider font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all"
                  >
                    <span>BOOK STUB</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
