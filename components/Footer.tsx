'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { officialLogoUrl, officialClubDetails } from '@/lib/data';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-[#F5F5F5] border-t border-white/10 relative overflow-hidden">
      {/* 1. CONTINUOUS FOOTER MARQUEE TICKER TRACK */}
      <div className="w-full bg-[#E60012] text-white py-2.5 font-display text-sm sm:text-base font-bold tracking-tight uppercase overflow-hidden border-b border-black/20 shadow-md">
        <div className="animate-marquee-track flex items-center gap-6 whitespace-nowrap">
          <span>🔴 Glory Glory Man United • As the Reds Go Marching On, On, On •</span>
          <span>🔴 Glory Glory Man United • As the Reds Go Marching On, On, On •</span>
          <span>🔴 Glory Glory Man United • As the Reds Go Marching On, On, On •</span>
          <span>🔴 Glory Glory Man United • As the Reds Go Marching On, On, On •</span>
        </div>
      </div>

      {/* 2. BACKGROUND MANCHESTER UNITED DEVANAGARI WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="font-devanagari text-[16vw] font-black text-white tracking-tight uppercase whitespace-nowrap select-none">
          मैनचेस्टर यूनाइटेड
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-white/10 pb-10">
          {/* Brand & Club Details */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-black border-2 border-[#E60012] shrink-0 p-0.5">
                <Image src={officialLogoUrl} alt="MUSC Pune Logo" fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-display text-2xl font-bold text-[#F5F5F5] tracking-tight">MUSC PUNE</h4>
                <div className="text-xs font-sans text-white/60 uppercase">PUNE&apos;S RED ARMY • EST. 2011</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 font-sans max-w-md leading-relaxed">
              Official Manchester United Supporters Club Pune. Connecting 500+ passionate Reds across Pune for matchday screenings, turf games, and group pilgrimages to Old Trafford.
            </p>

            <div className="flex items-center gap-2 text-xs font-sans text-[#E60012]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>OFFICIAL SUPPORTERS CLUB RECOGNIZED BY MANCHESTER UNITED</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-display text-base font-bold text-[#E60012] uppercase tracking-tight">POLICIES & LEGAL</h5>
            <ul className="space-y-2 text-xs font-sans text-white/70">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund & Cancellation Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping & Delivery Policy</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-display text-base font-bold text-[#E60012] uppercase tracking-tight">CLUB CONTACT</h5>
            <ul className="space-y-2 text-xs font-sans text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E60012] shrink-0" />
                <span>{officialClubDetails.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E60012] shrink-0" />
                <a href={`mailto:${officialClubDetails.email}`} className="hover:text-white transition-colors">{officialClubDetails.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E60012] shrink-0 mt-0.5" />
                <span>{officialClubDetails.regularVenue.name}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Sign-off */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-white/50">
          <div>
            © {new Date().getFullYear()} MUSC Pune. All Rights Reserved. Not officially affiliated with Manchester United PLC unless noted.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-[#E60012] fill-[#E60012]" />
            <span>for Pune&apos;s Red Army</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
