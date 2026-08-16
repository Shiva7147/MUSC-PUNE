'use client';

import React, { useState } from 'react';
import { Bell, Calendar, ArrowRight, X, Clock, Tag } from 'lucide-react';
import { Announcement } from '@/lib/types';

interface AnnouncementsSectionProps {
  announcements: Announcement[];
}

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({
  announcements,
}) => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const featured = announcements[0];
  const supporting = announcements.slice(1);

  return (
    <section id="announcements" className="py-24 bg-[#0A0A0E] relative border-t border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#DA020E] font-bold tracking-widest uppercase">
              <Bell className="w-4 h-4" />
              <span>LIVE SUPPORTERS FEED</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mt-1 uppercase">
              PUNE REDS <span className="text-[#DA020E]">DISPATCHES</span>
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl mt-2 font-sans">
              Official notices regarding matchday screenings, Old Trafford tour registrations, kit drops, and club news.
            </p>
          </div>

          <div className="badge-united text-xs font-mono px-3 py-1.5 rounded-lg font-bold">
            🔴 LIVE EDITORIAL TIMELINE
          </div>
        </div>

        {/* Editorial Feed Grid: 1 Large Feature + Supporting Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Large Hero Featured Announcement */}
          {featured && (
            <div className="lg:col-span-7 glass-card rounded-3xl p-8 flex flex-col justify-between space-y-6 relative overflow-hidden border-2 border-[#DA020E]/50 shadow-2xl">
              <div>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                  <span className="badge-united text-[10px] font-mono px-2.5 py-0.5 rounded font-bold uppercase">
                    {featured.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <Calendar className="w-3.5 h-3.5 text-[#DA020E]" />
                    <span>{featured.date}</span>
                  </div>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                  {featured.title}
                </h3>

                <p className="text-sm text-neutral-300 mt-4 leading-relaxed font-sans">
                  {featured.snippet}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-500">{featured.readTime || '2 min read'}</span>

                <button
                  onClick={() => setSelectedAnnouncement(featured)}
                  className="bg-[#DA020E] hover:bg-[#8C0008] text-white font-display text-xs tracking-wider font-bold py-3 px-5 rounded-xl flex items-center gap-1.5 transition-all shadow-lg glow-united"
                >
                  <span>READ FULL DISPATCH</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Supporting Side Timeline Stack */}
          <div className="lg:col-span-5 space-y-4">
            {supporting.map((ann) => (
              <div
                key={ann.id}
                onClick={() => setSelectedAnnouncement(ann)}
                className="glass-panel hover:border-[#DA020E]/60 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer space-y-3 group"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span className="badge-pune text-[9px] px-2 py-0.5 rounded font-bold uppercase">
                    {ann.category}
                  </span>
                  <span>{ann.date}</span>
                </div>

                <h4 className="font-display text-xl font-bold text-white group-hover:text-[#DA020E] transition-colors leading-snug">
                  {ann.title}
                </h4>

                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {ann.snippet}
                </p>

                <div className="pt-2 flex items-center gap-1 text-xs font-mono text-[#DA020E] font-bold">
                  <span>READ DISPATCH</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dispatch Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F0F14] border border-[#DA020E]/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-white">
            <button
              onClick={() => setSelectedAnnouncement(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="badge-united text-[10px] font-mono px-2.5 py-0.5 rounded uppercase font-bold">
                {selectedAnnouncement.category}
              </span>
              <div className="text-xs font-mono text-neutral-400">{selectedAnnouncement.date}</div>
              <h3 className="font-display text-3xl font-bold text-white leading-tight">
                {selectedAnnouncement.title}
              </h3>
            </div>

            <div className="text-xs text-neutral-300 font-sans space-y-3 leading-relaxed border-t border-neutral-800 pt-4">
              <p>{selectedAnnouncement.content}</p>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex justify-end">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="bg-[#DA020E] hover:bg-[#8C0008] text-white font-display text-xs font-bold px-6 py-2.5 rounded-xl"
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
