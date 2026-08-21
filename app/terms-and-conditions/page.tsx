'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShieldCheck } from 'lucide-react';
import { officialClubDetails } from '@/lib/data';

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <Navbar />

      <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-display text-[#FFC400] font-bold tracking-wider uppercase mb-2">
            <ShieldCheck className="w-4 h-4 text-[#E60012]" />
            <span>TERMS OF SERVICE</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase">
            TERMS & <span className="text-[#E60012]">CONDITIONS</span>
          </h1>
          <p className="text-xs text-white/60 font-sans mt-2">
            Last Updated: August 2026 • Official Manchester United Supporters Club - Pune
          </p>
        </div>

        <div className="space-y-6 text-sm font-sans text-white/80 leading-relaxed bg-[#171717] p-8 rounded-3xl border border-white/10">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">1. ACCEPTANCE OF TERMS</h2>
            <p>
              By accessing or using the official MUSC Pune platform (muscpune.in), purchasing matchday screening passes, acquiring official merchandise, or enrolling in supporters club memberships, you agree to be bound by these Terms and Conditions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">2. MATCHDAY SCREENINGS & TICKETING</h2>
            <ul className="list-disc pl-5 space-y-1 text-white/70">
              <li>Each matchday screening ticket pass is issued with a unique QR code valid for single entry per ticket.</li>
              <li>Admin scanners reserve the right to verify government photo ID alongside the digital QR code at screening entry gates (e.g. BIRA 91 Taproom, The Mills).</li>
              <li>Right of admission is strictly reserved by venue management and MUSC Pune committee members.</li>
              <li>Unruly behavior, harassment, or damage to venue property will result in immediate ejection without refund.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">3. MERCHANDISE PURCHASES</h2>
            <ul className="list-disc pl-5 space-y-1 text-white/70">
              <li>All merchandise product descriptions and prices are subject to availability.</li>
              <li>Orders are dispatched within 1–4 business days across valid Indian pincodes.</li>
              <li>Customers must provide accurate shipping details during checkout.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">4. INTELLECTUAL PROPERTY</h2>
            <p>
              &quot;MUSC Pune&quot; and associated logos are official trademarks of the Manchester United Supporters Club Pune (Est. 2011). Manchester United trademarks and club emblems are the property of Manchester United PLC.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">5. GOVERNING LAW & JURISDICTION</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of these Terms shall be subject to the exclusive jurisdiction of the courts in Pune, Maharashtra.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-white/10 text-xs font-mono text-white/60">
            <div>Final Approval Contact: {officialClubDetails.founder} (Founder)</div>
            <div>Contact Email: {officialClubDetails.founderEmail} • Phone: {officialClubDetails.phone}</div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
