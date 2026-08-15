'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Camera, MapPin, Mail, Globe, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070707] text-white border-t border-neutral-900 pt-16 pb-12 relative overflow-hidden">
      {/* Background Subtle Marathi Watermark */}
      <div className="absolute right-4 bottom-10 text-[120px] font-bold text-neutral-900/30 select-none pointer-events-none font-display">
        पुणे युनायटेड
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-900">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#C8102E] flex items-center justify-center font-display text-2xl font-bold shadow-lg shadow-[#C8102E]/30">
                MU
              </div>
              <div>
                <h3 className="font-display tracking-wider text-xl font-bold">MUSC PUNE</h3>
                <p className="text-xs text-[#F5F1E8]/60 font-mono">Manchester United Supporters Club Pune</p>
              </div>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              The official home for Manchester United supporters across Pune. Bringing fans together for matchday screenings, merchandise drops, and group trips to Old Trafford.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#C8102E] transition-all">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#C8102E] transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#C8102E] transition-all">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm tracking-widest text-[#C8102E] font-semibold uppercase mb-4">
              Pillars
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-neutral-400">
              <li><a href="#screenings" className="hover:text-white transition-colors">Matchday Screenings</a></li>
              <li><a href="#merchandise" className="hover:text-white transition-colors">Official Merchandise</a></li>
              <li><a href="#tours" className="hover:text-white transition-colors">Old Trafford Tours</a></li>
              <li><a href="#chants" className="hover:text-white transition-colors">Fan Chants Vault</a></li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-display text-sm tracking-widest text-[#C8102E] font-semibold uppercase mb-4">
              Community
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-neutral-400">
              <li><a href="#about" className="hover:text-white transition-colors">About MUSC Pune</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Supporters Gallery</a></li>
              <li><a href="#announcements" className="hover:text-white transition-colors">Club Announcements</a></li>
              <li><a href="#team" className="hover:text-white transition-colors">Executive Committee</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display text-sm tracking-widest text-[#C8102E] font-semibold uppercase mb-4">
              Pune Venues
            </h4>
            <div className="flex flex-col gap-3 text-xs text-neutral-400 font-mono">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                <span>Viman Nagar • Koregaon Park • Baner</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C8102E] shrink-0" />
                <span>connect@muscpune.in</span>
              </div>
              <div className="pt-2">
                <span className="px-2.5 py-1 rounded bg-[#C8102E]/10 border border-[#C8102E]/30 text-[#C8102E] text-[10px] font-bold">
                  OFFICIAL SUPPORTERS CLUB
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div>
            © {new Date().getFullYear()} Manchester United Supporters Club Pune. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-300 transition-colors">Privacy Policy</span>
            <span className="hover:text-neutral-300 transition-colors">Terms of Service</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#C8102E] transition-all flex items-center gap-1"
            >
              <ArrowUp className="w-4 h-4" />
              <span>TOP</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
