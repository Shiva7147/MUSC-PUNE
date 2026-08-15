'use client';

import React from 'react';
import Image from 'next/image';
import { Plane, Calendar, CheckCircle2, ShieldCheck, MapPin, Globe } from 'lucide-react';
import { TourPackage } from '@/lib/types';

interface OldTraffordToursSectionProps {
  tours: TourPackage[];
  onOpenEnquiryModal: (subject?: string) => void;
}

export const OldTraffordToursSection: React.FC<OldTraffordToursSectionProps> = ({
  tours,
  onOpenEnquiryModal,
}) => {
  const tour = tours[0];

  return (
    <section id="tours" className="py-24 bg-[#090909] relative border-t border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C8102E] font-bold tracking-widest uppercase">
            <Plane className="w-4 h-4" />
            <span>FLIGHT PATH & DELEGATION JOURNAL</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mt-1 uppercase">
            OLD TRAFFORD <span className="text-[#C8102E]">PASSPORT DECK</span>
          </h2>
          <p className="text-sm text-neutral-400 max-w-2xl mt-2 font-sans">
            Travel from Pune (PNQ) to Manchester (MAN) alongside fellow supporters. Guaranteed category-1 match tickets in Stretford End with visa support.
          </p>
        </div>

        {/* Passport & Travel Journal Container */}
        <div className="bg-neutral-900 border-2 border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Image & Immigration Seal Overlay */}
            <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-[520px]">
              <Image
                src="/images/tour.jpg"
                alt="Old Trafford Stadium Delegation"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
              
              {/* Immigration Stamp Badge Overlay */}
              <div className="absolute top-6 right-6 border-2 border-amber-400/80 rounded-2xl p-3 bg-black/70 backdrop-blur-md rotate-6 text-amber-300 font-mono text-[10px] uppercase font-bold text-center tracking-widest shadow-xl">
                <div>MANCHESTER IMMIGRATION</div>
                <div className="text-xs font-extrabold text-white">CLEARED • 2026</div>
                <div className="text-[8px] text-amber-400/80">ENTRY GATE: STRETFORD TIER 1</div>
              </div>

              {/* Flight Trajectory Pill */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-black/80 border border-neutral-700 backdrop-blur-md text-white text-xs font-mono mb-3">
                  <span className="font-bold text-[#C8102E]">PNQ (PUNE)</span>
                  <span className="text-neutral-500">✈️ 9,100 KM ➔</span>
                  <span className="font-bold text-amber-300">MAN (MANCHESTER)</span>
                </div>
                <h3 className="font-display text-3xl font-bold text-white drop-shadow-md">
                  {tour.title}
                </h3>
              </div>
            </div>

            {/* Right Passport Journal Details */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6 bg-gradient-to-br from-neutral-900 to-black">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                  <span>BATCH DATES: {tour.nextBatch}</span>
                  <span className="text-amber-400 font-bold">{tour.duration}</span>
                </div>

                <p className="text-xs text-neutral-300 mt-2 leading-relaxed font-sans">
                  {tour.description}
                </p>

                {/* Stretford End Seating Block Preview */}
                <div className="mt-6 p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-400">STADIUM BLOCK</span>
                    <span className="text-white font-bold">STRETFORD END • BLOCK 204</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-400">SEAT ALLOCATION</span>
                    <span className="text-[#C8102E] font-bold">CATEGORY 1 HOME END</span>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="mt-6 space-y-2 text-xs font-mono text-neutral-300">
                  <div className="font-display text-sm font-bold text-white uppercase tracking-wider mb-2">
                    PACKAGE INCLUSIONS
                  </div>
                  {tour.includedFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-neutral-800 space-y-3">
                <button
                  onClick={() => onOpenEnquiryModal(`Old Trafford Tour Enquiry — ${tour.nextBatch}`)}
                  className="w-full bg-[#C8102E] hover:bg-[#870019] text-white font-display text-base tracking-wider font-bold py-4 px-6 rounded-2xl shadow-xl glow-neon-red flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Plane className="w-5 h-5" />
                  <span>ENQUIRE ABOUT THE NEXT TOUR</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Official Group Delegation • Visa Assistance Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
