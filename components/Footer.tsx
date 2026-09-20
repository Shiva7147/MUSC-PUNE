'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-[#F5F5F5] border-t border-white/10 py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-sans text-white/70">
        <div>
          © {new Date().getFullYear()} MUSC Pune • Established 2011 • All rights reserved.
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3.5 text-xs sm:text-sm">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span className="text-[#E60012] font-bold">•</span>
          <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
          <span className="text-[#E60012] font-bold">•</span>
          <Link href="/refund-policy" className="hover:text-white transition-colors">Refund & Cancellation Policy</Link>
          <span className="text-[#E60012] font-bold">•</span>
          <Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping & Delivery Policy</Link>
          <span className="text-[#E60012] font-bold">•</span>
          <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};
