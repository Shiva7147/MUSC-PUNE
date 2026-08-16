'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Camera, Globe, Share2, Heart } from 'lucide-react';
import { officialLogoUrl } from '@/lib/data';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#161513] text-[#E7E0CF] pt-20 pb-12 border-t border-[#683F39]/30 relative overflow-hidden">
      {/* Background Subtle Marathi Typography Texture - Soft Watermark */}
      <div
        className="absolute top-10 right-6 font-display text-8xl md:text-9xl font-bold select-none pointer-events-none text-[#E7E0CF]/5 z-0"
        style={{ opacity: 0.04 }}
      >
        पुणे युनायटED
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#683F39]/20">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black border border-[#E7E0CF]/30 shadow-lg shrink-0">
                <Image src={officialLogoUrl} alt="MUSC Pune Logo" fill className="object-cover" />
              </div>
              <div>
                <span className="font-display tracking-wider font-bold text-2xl text-[#E7E0CF] block leading-none">
                  MUSC PUNE
                </span>
                <span className="text-xs font-mono text-[#E7E0CF]/70">
                  Manchester United Supporters Club Pune • EST. 2021
                </span>
              </div>
            </div>

            <p className="text-xs text-[#E7E0CF]/70 font-mono leading-relaxed max-w-sm">
              The official gathering ground for Red Devils fans living across Pune. Matchday screenings, Old Trafford group trips, and local terrace streetwear.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2.5 rounded-xl glass-panel text-[#E7E0CF]/70 hover:text-white hover:border-[#C8102E] transition-all">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl glass-panel text-[#E7E0CF]/70 hover:text-white hover:border-[#C8102E] transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl glass-panel text-[#E7E0CF]/70 hover:text-white hover:border-[#C8102E] transition-all">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold tracking-wider uppercase text-[#C8102E]">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#E7E0CF]/70">
              <li><Link href="/" className="hover:text-[#E7E0CF] transition-colors">Home</Link></li>
              <li><Link href="/#about" className="hover:text-[#E7E0CF] transition-colors">About Community</Link></li>
              <li><Link href="/screenings" className="hover:text-[#E7E0CF] transition-colors">Matchday Screenings</Link></li>
              <li><Link href="/tours" className="hover:text-[#E7E0CF] transition-colors">Trip to Old Trafford</Link></li>
              <li><Link href="/merchandise" className="hover:text-[#E7E0CF] transition-colors">Streetwear Merch</Link></li>
            </ul>
          </div>

          {/* Supporters Club */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold tracking-wider uppercase text-[#C8102E]">
              RED NETWORK
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#E7E0CF]/70">
              <li><Link href="/membership" className="hover:text-[#E7E0CF] transition-colors">Join The Reds (Membership)</Link></li>
              <li><Link href="/chants" className="hover:text-[#E7E0CF] transition-colors">Terrace Fan Chants</Link></li>
              <li><Link href="/team" className="hover:text-[#E7E0CF] transition-colors">FUT Squad Committee</Link></li>
              <li><Link href="/contact" className="hover:text-[#E7E0CF] transition-colors">Digital Red Card Pass</Link></li>
            </ul>
          </div>

          {/* Screening Hubs */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold tracking-wider uppercase text-[#C8102E]">
              PUNE ARENAS
            </h4>
            <div className="space-y-2 text-xs font-mono text-[#E7E0CF]/70">
              <div>Viman Nagar Hub (Phoenix)</div>
              <div>Koregaon Park Hub (High Spirits)</div>
              <div>Baner Brewhouse (Deron Heights)</div>
              <div className="text-emerald-400 font-bold pt-1">📍 PUNE, MAHARASHTRA</div>
            </div>
          </div>
        </div>

        {/* Large Outlined Brand Statement Banner */}
        <div className="pt-12 text-center">
          <div
            className="font-display text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tighter text-[#E7E0CF]/5 uppercase select-none"
            style={{ opacity: 0.05 }}
          >
            PUNE IS UNITED
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#E7E0CF]/50 pt-6 border-t border-[#683F39]/20 gap-4">
            <div>© 2026 Manchester United Supporters Club Pune. All rights reserved.</div>
            <div className="flex items-center gap-1 text-[#E7E0CF]">
              <span>MADE WITH</span>
              <Heart className="w-3.5 h-3.5 text-[#C8102E] fill-current" />
              <span>FOR PUNE REDS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
