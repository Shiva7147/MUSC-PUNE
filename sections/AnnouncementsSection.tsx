'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Bell, Calendar, ArrowRight, X } from 'lucide-react';
import { Announcement } from '@/lib/types';

interface AnnouncementsSectionProps {
  announcements: Announcement[];
}

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({
  announcements,
}) => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const featured = announcements[0];
  const supporting = announcements.slice(1, 3);

  const dispatchImages: Record<string, string> = {
    'ann-01': 'https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_1200/v1786865423/WhatsApp_Image_2026-08-16_at_12.29.46_PM_m8ytoq.jpg',
    'ann-02': 'https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_800/v1786865405/WhatsApp_Image_2026-08-16_at_11.53.51_AM_11_hyrhv3.jpg',
    'ann-03': 'https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_800/v1786865350/pune-mufc-scarf-600x600_q27exs.png',
  };

  return (
    <section id="announcements" className="py-24 bg-[#050505] relative border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans text-[#E60012] font-bold tracking-wider uppercase">
              <Bell className="w-4 h-4" />
              <span>LIVE SUPPORTERS FEED</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#F5F5F5] mt-1 uppercase">
              LATEST <span className="text-[#E60012]">DISPATCHES</span>
            </h2>
            <p className="text-sm text-[#F5F5F5]/70 max-w-xl mt-2 font-sans">
              Official notices regarding matchday screenings, Old Trafford tour registrations, and kit drops.
            </p>
          </div>

          <div className="badge-united text-xs font-display px-3 py-1.5 rounded-lg font-bold tracking-wider">
            🔴 EDITORIAL TIMELINE
          </div>
        </div>

        {/* Editorial Feed Grid: 1 Large Featured Dispatch + 2 Supporting Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 1. Featured Large Dispatch */}
          {featured && (
            <div className="lg:col-span-7 glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-white/10 hover:border-[#E60012] shadow-2xl group bg-[#171717]">
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/10">
                <Image
                  src={dispatchImages[featured.id] || dispatchImages['ann-01']}
                  alt={featured.title}
                  fill
                  quality={95}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent opacity-80" />
                <span className="absolute top-4 left-4 badge-united text-[10px] font-display px-3 py-1 rounded font-bold uppercase tracking-wider">
                  {featured.category}
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between bg-gradient-to-br from-[#171717] to-[#050505]">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-sans text-[#F5F5F5]/70">
                    <Calendar className="w-3.5 h-3.5 text-[#E60012]" />
                    <span>{featured.date}</span>
                  </div>

                  <h3 className="font-display text-3xl font-bold text-[#F5F5F5] leading-tight">
                    {featured.title}
                  </h3>

                  <p className="text-xs text-[#F5F5F5]/80 leading-relaxed font-sans">
                    {featured.snippet}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-sans text-[#F5F5F5]/50">{featured.readTime || '2 min read'}</span>

                  <button
                    onClick={() => setSelectedAnnouncement(featured)}
                    className="bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xs tracking-wider font-bold py-3 px-5 rounded-xl flex items-center gap-1.5 transition-all shadow-[0_4px_15px_rgba(230,0,18,0.25)]"
                  >
                    <span>READ FULL DISPATCH</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. Supporting Side Dispatches Stack */}
          <div className="lg:col-span-5 space-y-6">
            {supporting.map((ann) => (
              <div
                key={ann.id}
                onClick={() => setSelectedAnnouncement(ann)}
                className="glass-panel hover:border-[#E60012] rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex gap-5 group border border-white/10 bg-[#171717]"
              >
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-black shrink-0 border border-white/10">
                  <Image
                    src={dispatchImages[ann.id] || dispatchImages['ann-01']}
                    alt={ann.title}
                    fill
                    quality={90}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-sans text-[#F5F5F5]/60 mb-1">
                      <span className="badge-pune text-[9px] px-2 py-0.5 rounded font-bold uppercase">
                        {ann.category}
                      </span>
                      <span>{ann.date}</span>
                    </div>

                    <h4 className="font-display text-lg font-bold text-[#F5F5F5] group-hover:text-[#E60012] transition-colors leading-snug line-clamp-2">
                      {ann.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-display font-bold text-[#E60012]">
                    <span>READ DISPATCH</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dispatch Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#171717] border border-[#E60012]/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-[#F5F5F5]">
            <button
              onClick={() => setSelectedAnnouncement(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-[#050505] border border-white/10 text-[#F5F5F5]/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="badge-united text-[10px] font-display px-2.5 py-0.5 rounded uppercase font-bold">
                {selectedAnnouncement.category}
              </span>
              <div className="text-xs font-sans text-[#F5F5F5]/60">{selectedAnnouncement.date}</div>
              <h3 className="font-display text-3xl font-bold text-[#F5F5F5] leading-tight">
                {selectedAnnouncement.title}
              </h3>
            </div>

            <div className="text-xs text-[#F5F5F5]/80 font-sans space-y-3 leading-relaxed border-t border-white/10 pt-4">
              <p>{selectedAnnouncement.content}</p>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xs font-bold px-6 py-2.5 rounded-xl shadow-md"
              >
                CLOSE DISPATCH
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
