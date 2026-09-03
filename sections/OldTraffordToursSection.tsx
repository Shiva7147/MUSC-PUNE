'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plane, Calendar, CheckCircle, ShieldCheck } from 'lucide-react';
import { TourPackage } from '@/lib/types';
import { EnquiryModal } from '@/components/EnquiryModal';

interface OldTraffordToursSectionProps {
  tours: TourPackage[];
}

export const OldTraffordToursSection: React.FC<OldTraffordToursSectionProps> = ({
  tours,
}) => {
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const featured = tours[0];

  return (
    <section id="tours" className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-display text-[#FFC400] font-bold tracking-wider uppercase">
              <Plane className="w-4 h-4 text-[#E60012]" />
              <span>THEATRE OF DREAMS PILGRIMAGE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mt-1 uppercase">
              TRIP TO <span className="text-[#E60012]">OLD TRAFFORD</span>
            </h2>
            <p className="text-sm text-[#F5F5F5]/70 max-w-xl mt-2 font-sans">
              Fly directly out of Pune (PNQ) with fellow supporters to Manchester for Premier League match tickets, stadium and museum tour, and accommodation.
            </p>
          </div>

          <div className="badge-gold text-xs font-display px-3.5 py-1.5 rounded-lg font-bold">
            ✈️ PNQ ➔ MANCHESTER (MAN)
          </div>
        </div>

        {/* Main Tour Showcase Card */}
        {featured && (
          <div className="glass-card rounded-3xl overflow-hidden shadow-2xl border border-white/10 hover:border-[#E60012] bg-[#171717]">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Tour Photo */}
              <div className="lg:col-span-7 relative min-h-[340px] lg:min-h-[480px] bg-black">
                <Image
                  src="https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_1600/v1786865422/WhatsApp_Image_2026-08-16_at_12.29.15_PM_kzh1u3.jpg"
                  alt={featured.title}
                  fill
                  quality={95}
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#171717]/60 lg:to-[#171717]" />
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <span className="bg-[#E60012] text-white text-xs font-display font-bold px-3 py-1.5 rounded-md shadow-lg uppercase tracking-wider">
                    AUTUMN 2026 DELEGATION
                  </span>
                </div>
              </div>

              {/* Package Details & Inclusions */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-[#171717] to-[#050505]">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-display text-[#FFC400] font-bold">
                    <Calendar className="w-4 h-4 text-[#E60012]" />
                    <span>NEXT BATCH: {featured.nextBatch} ({featured.duration})</span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight uppercase">
                    {featured.title}
                  </h3>

                  <p className="text-xs text-[#F5F5F5]/80 leading-relaxed font-sans">
                    {featured.description}
                  </p>

                  {/* Included Features List */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="text-xs font-display text-[#FFC400] font-bold uppercase tracking-wider">
                      INCLUDED IN PILGRIMAGE:
                    </div>
                    <div className="space-y-2 text-xs font-sans text-[#F5F5F5]/90">
                      {featured.includedFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#E60012] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                  <button
                    onClick={() => setSelectedTour(featured)}
                    className="w-full bg-[#E60012] hover:bg-[#C40010] border border-white/20 text-white font-display text-base tracking-wider font-bold py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] uppercase cursor-pointer"
                  >
                    <Plane className="w-4 h-4 text-white" />
                    <span>BOOK THE TRIP</span>
                  </button>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-sans text-white/50">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>OFFICIAL SUPPORTERS CLUB VISA GUIDANCE INCLUDED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedTour && (
        <EnquiryModal
          isOpen={true}
          onClose={() => setSelectedTour(null)}
          defaultSubject={`Old Trafford Tour Registration — ${selectedTour.title}`}
        />
      )}
    </section>
  );
};
