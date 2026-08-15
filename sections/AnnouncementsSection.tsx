'use client';

import React, { useState } from 'react';
import { Bell, ArrowRight, X, Clock, Calendar } from 'lucide-react';
import { Announcement } from '@/lib/types';

interface AnnouncementsSectionProps {
  announcements: Announcement[];
}

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({
  announcements,
}) => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  return (
    <section id="announcements" className="py-24 bg-[#0B0B0B] relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C8102E] font-bold tracking-widest uppercase">
            <Bell className="w-4 h-4" />
            <span>CLUB BULLETIN</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mt-1 uppercase">
            COMMUNITY <span className="text-[#C8102E]">ANNOUNCEMENTS</span>
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mt-2 font-sans">
            Stay updated with official matchday screening dates, merchandise drops, and tour applications.
          </p>
        </div>

        {/* Announcements Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="bg-neutral-900 border border-neutral-800 hover:border-[#C8102E]/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="px-2.5 py-1 rounded bg-[#C8102E]/10 border border-[#C8102E]/30 text-[#C8102E] font-bold uppercase">
                    {ann.category}
                  </span>
                  <span className="text-neutral-500">{ann.date}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-white group-hover:text-[#C8102E] transition-colors leading-snug">
                  {ann.title}
                </h3>

                <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed font-sans">
                  {ann.snippet}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-400" />
                  {ann.readTime}
                </span>

                <button
                  onClick={() => setSelectedAnnouncement(ann)}
                  className="text-xs font-mono font-bold text-[#C8102E] hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>READ MORE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-neutral-800 rounded-2xl max-w-lg w-full p-6 text-white space-y-4 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedAnnouncement(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="px-2.5 py-1 rounded bg-[#C8102E] text-white font-bold uppercase">
                {selectedAnnouncement.category}
              </span>
              <span className="text-neutral-500">{selectedAnnouncement.date}</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white leading-tight">
              {selectedAnnouncement.title}
            </h3>

            <div className="text-xs text-neutral-300 leading-relaxed font-sans border-t border-b border-neutral-800 py-4 my-2">
              {selectedAnnouncement.content}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="bg-[#C8102E] hover:bg-[#870019] text-white font-display text-xs font-bold px-6 py-2.5 rounded-lg"
              >
                CLOSE BULLETIN
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
