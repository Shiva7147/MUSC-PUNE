'use client';

import React from 'react';
import Image from 'next/image';
import { Ticket, Calendar, MapPin, Flame, ArrowRight, Barcode, Sparkles, Users } from 'lucide-react';
import { Screening } from '@/lib/types';
import { upcomingScreenings } from '@/lib/data';

interface ScreeningsSectionProps {
  screenings: Screening[];
  onSelectScreening: (screening: Screening) => void;
}

export const ScreeningsSection: React.FC<ScreeningsSectionProps> = ({
  screenings,
  onSelectScreening,
}) => {
  const activeList = screenings && screenings.length > 0 ? screenings : upcomingScreenings;
  const featured = activeList.find((s) => s.featured) || activeList[0] || upcomingScreenings[0];
  const upcomingList = activeList.filter((s) => s.id !== featured.id);

  return (
    <section id="screenings" className="py-16 sm:py-24 bg-[#050505] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-display text-[#E60012] font-bold uppercase">
              <Flame className="w-4 h-4" />
              <span>OFFICIAL TICKET RELEASE ENGINE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mt-1 uppercase">
              SCREENING <span className="text-[#E60012]">TICKETS</span>
            </h2>
            <p className="text-sm text-white/70 max-w-xl mt-2 font-sans">
              Official matchday screening tickets for Manchester United fans in Pune. Guaranteed entry & F&B cover vouchers at BIRA 91 Taproom, The Mills.
            </p>
          </div>

          <div className="badge-pune text-xs font-display px-3 py-1 font-bold rounded-lg shrink-0 w-max">
            🔴 TICKET PORTAL LIVE
          </div>
        </div>

        {/* Featured Ticket Stub Card */}
        <div className="bg-[#171717] border-2 border-[#E60012]/60 rounded-3xl overflow-hidden shadow-2xl relative mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Poster / Match Image */}
            <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[320px] lg:min-h-[460px] overflow-hidden bg-black">
              <Image
                src="https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_1600/v1786865411/WhatsApp_Image_2026-08-16_at_11.53.51_AM_ddhmkc.jpg"
                alt={featured.matchTitle}
                fill
                quality={95}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#171717]/50 lg:to-[#171717]" />
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2">
                <span className="bg-[#E60012] text-white text-xs font-display font-bold px-3 py-1.5 rounded-md shadow-lg uppercase">
                  {featured.activePhaseName || 'PHASE 1'}
                </span>
                <span className="bg-black/80 border border-white/20 text-white text-xs font-display font-bold px-3 py-1.5 rounded-md">
                  FEATURED MATCHDAY
                </span>
              </div>
            </div>

            {/* Stub Specifications & Barcode */}
            <div className="lg:col-span-5 p-5 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-[#171717] to-[#050505]">
              <div>
                <div className="text-xs font-display text-[#E60012] uppercase font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{featured.competition}</span>
                </div>

                <h3 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight uppercase">
                  {featured.matchTitle}
                </h3>

                {/* Remaining Seats Tracker */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between text-xs font-display gap-1">
                    <span className="text-[#E60012] font-bold flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>REMAINING SEATS: {featured.remainingSeats ?? 42} / {featured.capacity ?? 250}</span>
                    </span>
                    <span className="text-white/60 font-mono">₹{featured.price}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#050505] overflow-hidden border border-white/10">
                    <div className="h-full bg-[#E60012] w-[82%]" />
                  </div>
                </div>

                <p className="text-xs text-white/80 mt-4 leading-relaxed font-sans">
                  {featured.description}
                </p>
              </div>

              {/* Match Stub Grid */}
              <div className="space-y-2.5 bg-[#050505] p-4 rounded-2xl border border-white/10 text-xs font-sans">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">DATE & TIME</span>
                  <span className="text-white font-bold">{featured.date} • {featured.time}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">VENUE</span>
                  <span className="text-[#E60012] font-bold">{featured.venueName}</span>
                </div>
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-white/60">TICKET PRICE</span>
                  <div className="text-right">
                    <span className="font-display text-2xl font-bold text-white">₹{featured.price}</span>
                    <span className="text-[10px] text-white/50 block font-mono">SCREENING TICKET</span>
                  </div>
                </div>
              </div>

              {/* Barcode Graphic */}
              <div className="pt-2 border-t border-dashed border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Barcode className="w-8 h-8 text-white/40" />
                  <span className="font-mono text-[10px] text-white/50">TICKET-2026-X89</span>
                </div>
                <span className="text-[10px] font-display text-emerald-400 font-bold">VERIFIED ENTRY</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onSelectScreening(featured)}
                  className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xl tracking-tight font-bold py-4 px-6 rounded-2xl shadow-[0_8px_30px_rgba(230,0,18,0.35)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] border border-white/20 uppercase"
                >
                  <Ticket className="w-5 h-5" />
                  <span>GET SCREENING TICKETS</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Upcoming Stub Grid */}
        <div>
          <h3 className="font-display text-3xl font-bold text-white mb-6 uppercase">
            MORE SCREENING TICKETS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingList.map((sc) => (
              <div
                key={sc.id}
                className="bg-[#171717] border border-white/10 hover:border-[#E60012]/60 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between space-y-4 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-display text-white/60 mb-2">
                    <span>{sc.competition}</span>
                    <span className="px-2.5 py-0.5 rounded bg-[#050505] text-[#E60012] border border-[#E60012]/30 font-bold uppercase">
                      REMAINING: {sc.remainingSeats ?? 88} SEATS
                    </span>
                  </div>

                  <h4 className="font-display text-3xl font-bold text-white group-hover:text-[#E60012] transition-colors uppercase">
                    {sc.matchTitle}
                  </h4>

                  <div className="mt-4 space-y-1.5 text-xs font-sans text-white/70">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#E60012]" />
                      <span>{sc.date} • {sc.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#E60012]" />
                      <span>{sc.venueName}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-dashed border-white/15 flex items-center justify-between">
                  <div className="font-display text-2xl font-bold text-[#E60012]">
                    ₹{sc.price} <span className="text-xs text-white/50 font-sans font-normal">/ ticket</span>
                  </div>

                  <button
                    onClick={() => onSelectScreening(sc)}
                    className="bg-[#050505] hover:bg-[#E60012] text-white font-display text-sm tracking-tight font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all border border-white/10 uppercase"
                  >
                    <span>SCREENING TICKETS</span>
                    <ArrowRight className="w-4 h-4" />
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
