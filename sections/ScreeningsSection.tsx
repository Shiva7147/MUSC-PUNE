'use client';

import React from 'react';
import Image from 'next/image';
import { Ticket, Calendar, MapPin, Flame, ArrowRight, Barcode } from 'lucide-react';
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
    <section id="screenings" className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-display text-[#E60012] font-bold tracking-wider uppercase">
              <Flame className="w-4 h-4" />
              <span>PRIMARY MATCHDAY TICKET ENGINE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mt-1 uppercase">
              MATCHDAY <span className="text-[#E60012]">TICKET STUBS</span>
            </h2>
            <p className="text-sm text-[#F5F5F5]/70 max-w-xl mt-2 font-sans">
              Tactile perforated passes for Pune&apos;s biggest matchday screenings. Includes cover vouchers and official club badge giveaways.
            </p>
          </div>

          <div className="badge-pune text-xs font-display px-3 py-1 font-bold rounded-lg">
            🔴 LIVE TICKETING SYSTEM ACTIVE
          </div>
        </div>

        {/* Featured Perforated Ticket Stub Card */}
        <div className="bg-[#171717] border-2 border-[#E60012]/60 rounded-3xl overflow-hidden shadow-2xl relative mb-16 ticket-notch-left ticket-notch-right">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Poster / Match Image */}
            <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[460px] overflow-hidden bg-black">
              <Image
                src="https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_1600/v1786865411/WhatsApp_Image_2026-08-16_at_11.53.51_AM_ddhmkc.jpg"
                alt={featured.matchTitle}
                fill
                quality={95}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#171717]/50 lg:to-[#171717]" />
              <div className="absolute top-6 left-6 flex flex-wrap items-center gap-2">
                <span className="bg-[#E60012] text-white text-xs font-display font-bold px-3 py-1.5 rounded-md shadow-lg uppercase tracking-wider">
                  FEATURED MATCHDAY STUB
                </span>
                <span className="bg-[#FFC400]/20 border border-[#FFC400]/40 text-[#FFC400] text-xs font-display font-bold px-3 py-1.5 rounded-md">
                  🌤️ 24°C • CLEAR NIGHT
                </span>
              </div>
            </div>

            {/* Stub Specifications & Barcode */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-[#171717] to-[#050505]">
              <div>
                <div className="text-xs font-display text-[#FFC400] tracking-wider uppercase mb-1 font-bold">
                  {featured.competition}
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                  {featured.matchTitle}
                </h3>

                {/* Real-time Booking Capacity Meter */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between text-xs font-display gap-1">
                    <span className="text-[#FFC400] font-bold">🔥 85% BOOKED — ONLY 25 SEATS LEFT</span>
                    <span className="text-white/60 font-mono">255 / 300</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#050505] overflow-hidden border border-white/10">
                    <div className="h-full bg-gradient-to-r from-[#FFC400] to-[#E60012] w-[85%]" />
                  </div>
                </div>

                <p className="text-xs text-[#F5F5F5]/80 mt-4 leading-relaxed font-sans">
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
                  <span className="text-white/60">ENTRY PASS PRICE</span>
                  <span className="font-display text-xl font-bold text-white">₹{featured.price}</span>
                </div>
              </div>

              {/* Barcode Graphic */}
              <div className="pt-2 border-t border-dashed border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Barcode className="w-8 h-8 text-white/40" />
                  <span className="font-mono text-[10px] text-white/50">STUB-PASS-2026-X89</span>
                </div>
                <span className="text-[10px] font-display text-emerald-400 font-bold tracking-wider">VERIFIED ENTRY</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onSelectScreening(featured)}
                  className="flex-1 bg-[#E60012] hover:bg-[#C40010] text-white font-display text-base tracking-wider font-bold py-3.5 px-6 rounded-xl shadow-[0_8px_30px_rgba(230,0,18,0.25)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
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
                className="bg-[#171717] border border-white/10 hover:border-[#E60012]/60 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between space-y-4 ticket-notch-left shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-display text-white/60 mb-2">
                    <span>{sc.competition}</span>
                    <span className="px-2.5 py-0.5 rounded bg-[#050505] text-[#FFC400] font-bold">
                      {sc.status}
                    </span>
                  </div>

                  <h4 className="font-display text-2xl font-bold text-white group-hover:text-[#E60012] transition-colors">
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
                  <div className="font-display text-xl font-bold text-[#E60012]">
                    ₹{sc.price} <span className="text-xs text-white/50 font-sans font-normal">/ pass</span>
                  </div>

                  <button
                    onClick={() => onSelectScreening(sc)}
                    className="bg-[#050505] hover:bg-[#E60012] text-white font-display text-xs tracking-wider font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all border border-white/10"
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
