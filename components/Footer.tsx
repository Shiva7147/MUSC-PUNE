'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { officialLogoUrl, officialClubDetails } from '@/lib/data';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-[#F5F5F5] border-t border-white/10 relative overflow-hidden pt-16 pb-8">
      {/* Background Subtle Watermark Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none overflow-hidden">
        <span className="font-display text-[14vw] font-bold text-white tracking-tighter uppercase whitespace-nowrap">
          PUNE&apos;S RED ARMY
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          {/* Brand Identity Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black border border-white/20 shrink-0">
                <Image src={officialLogoUrl} alt="MUSC Pune Official Logo" fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-[#F5F5F5] tracking-tight">MUSC PUNE</h3>
                <p className="text-xs font-sans text-white/60">MANCHESTER UNITED SUPPORTERS CLUB PUNE • EST. 2011</p>
              </div>
            </div>

            <p className="text-xs font-sans text-white/70 max-w-md leading-relaxed">
              {officialClubDetails.tagline}. The official Manchester United supporters club in Pune, Maharashtra. Connecting local supporters for matchday screenings, kit drops, and Old Trafford trips since 2011.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs font-sans">
              <a href={officialClubDetails.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#171717] border border-white/10 hover:border-[#E60012] text-white hover:text-[#E60012] transition-all">Instagram</a>
              <a href={officialClubDetails.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#171717] border border-white/10 hover:border-[#E60012] text-white hover:text-[#E60012] transition-all">Facebook</a>
              <a href={officialClubDetails.socials.youtube} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#171717] border border-white/10 hover:border-[#E60012] text-white hover:text-[#E60012] transition-all">YouTube</a>
              <a href={officialClubDetails.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#171717] border border-white/10 hover:border-[#E60012] text-white hover:text-[#E60012] transition-all">X / Twitter</a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-sm font-bold text-[#FFC400] uppercase tracking-wider">NAVIGATION</h4>
            <ul className="space-y-2 text-xs font-display text-white/80">
              <li><Link href="/" className="hover:text-[#E60012] transition-colors">HOME</Link></li>
              <li><Link href="/about" className="hover:text-[#E60012] transition-colors">ABOUT THE CLUB</Link></li>
              <li><Link href="/screenings" className="hover:text-[#E60012] transition-colors">MATCHDAY SCREENINGS</Link></li>
              <li><Link href="/merchandise" className="hover:text-[#E60012] transition-colors">OFFICIAL MERCHANDISE</Link></li>
              <li><Link href="/tours" className="hover:text-[#E60012] transition-colors">OLD TRAFFORD TOURS</Link></li>
              <li><Link href="/gallery" className="hover:text-[#E60012] transition-colors">DOCUMENTARY GALLERY</Link></li>
              <li><Link href="/chants" className="hover:text-[#E60012] transition-colors">FAN CHANTS</Link></li>
            </ul>
          </div>

          {/* Legal Policies Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-sm font-bold text-[#FFC400] uppercase tracking-wider">POLICIES</h4>
            <ul className="space-y-2 text-xs font-sans text-white/70">
              <li><Link href="/privacy-policy" className="hover:text-[#E60012] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-[#E60012] transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#E60012] transition-colors">Refund & Returns Policy</Link></li>
              <li><Link href="/cancellation-policy" className="hover:text-[#E60012] transition-colors">Cancellation Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-[#E60012] transition-colors">Shipping Policy</Link></li>
            </ul>
          </div>

          {/* Contact & Venue Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-sm font-bold text-[#FFC400] uppercase tracking-wider">CLUB CONTACT</h4>
            <p className="text-xs font-sans text-white/80 leading-relaxed">
              <strong>Regular Screening Venue:</strong><br />
              <a href={officialClubDetails.regularVenue.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-[#E60012] underline hover:text-[#FFC400]">
                {officialClubDetails.regularVenue.name}
              </a>
            </p>
            <p className="text-xs font-sans text-white/80">
              <strong>Email:</strong> <a href={`mailto:${officialClubDetails.email}`} className="hover:text-[#E60012]">{officialClubDetails.email}</a><br />
              <strong>Phone / WhatsApp:</strong> {officialClubDetails.phone}
            </p>
            <div className="pt-2 text-xs font-sans text-white/50">
              Grievance Officer: {officialClubDetails.grievanceOfficer} ({officialClubDetails.grievanceEmail})
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-white/50 gap-4">
          <div>© {new Date().getFullYear()} MUSC Pune (Est. 2011). All Rights Reserved.</div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-[#E60012] transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="hover:text-[#E60012] transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#E60012] transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
