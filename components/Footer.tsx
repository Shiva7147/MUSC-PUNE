'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Globe, Share2, Mail, MapPin, Heart, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050507] text-white pt-20 pb-12 border-t border-neutral-900 relative overflow-hidden">
      {/* Background Subtle Marathi Typography Texture */}
      <div className="absolute top-10 right-10 font-display text-9xl font-bold opacity-05 select-none pointer-events-none text-white">
        पुणे युनायटED
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-neutral-850">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#DA020E] flex items-center justify-center font-display text-xl font-bold text-white shadow-lg shadow-[#DA020E]/40 border border-white/20">
                MU
              </div>
              <div>
                <span className="font-display tracking-wider font-bold text-2xl text-white block leading-none">
                  MUSC PUNE
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  Manchester United Supporters Club Pune • EST. 2021
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 font-mono leading-relaxed max-w-sm">
              The official gathering ground for Red Devils fans living across Pune. Matchday screenings, Old Trafford group trips, and local terrace streetwear.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2.5 rounded-xl glass-panel text-neutral-400 hover:text-white hover:border-[#DA020E] transition-all">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl glass-panel text-neutral-400 hover:text-white hover:border-[#DA020E] transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl glass-panel text-neutral-400 hover:text-white hover:border-[#DA020E] transition-all">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase text-[#DA020E]">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-mono text-neutral-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#about" className="hover:text-white transition-colors">About Community</Link></li>
              <li><Link href="/screenings" className="hover:text-white transition-colors">Matchday Screenings</Link></li>
              <li><Link href="/tours" className="hover:text-white transition-colors">Trip to Old Trafford</Link></li>
              <li><Link href="/merchandise" className="hover:text-white transition-colors">Streetwear Merch</Link></li>
            </ul>
          </div>

          {/* Supporters Club */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase text-[#DA020E]">
              RED NETWORK
            </h4>
            <ul className="space-y-2 text-xs font-mono text-neutral-400">
              <li><Link href="/membership" className="hover:text-white transition-colors">Join The Reds (Membership)</Link></li>
              <li><Link href="/chants" className="hover:text-white transition-colors">Terrace Fan Chants</Link></li>
              <li><Link href="/team" className="hover:text-white transition-colors">FUT Squad Committee</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Digital Red Card Pass</Link></li>
            </ul>
          </div>

          {/* Screening Hubs */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase text-[#DA020E]">
              PUNE ARENAS
            </h4>
            <div className="space-y-2 text-xs font-mono text-neutral-400">
              <div>Viman Nagar Hub (Phoenix)</div>
              <div>Koregaon Park Hub (High Spirits)</div>
              <div>Baner Brewhouse (Deron Heights)</div>
              <div className="text-emerald-400 font-bold pt-1">📍 PUNE, MAHARASHTRA</div>
            </div>
          </div>
        </div>

        {/* Large Outlined Brand Statement Banner */}
        <div className="pt-12 text-center">
          <div className="font-display text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tighter text-white/05 uppercase select-none">
            PUNE IS UNITED
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500 pt-6 border-t border-neutral-900 gap-4">
            <div>© 2026 Manchester United Supporters Club Pune. All rights reserved.</div>
            <div className="flex items-center gap-1 text-white">
              <span>MADE WITH</span>
              <Heart className="w-3.5 h-3.5 text-[#DA020E] fill-current" />
              <span>FOR PUNE REDS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
