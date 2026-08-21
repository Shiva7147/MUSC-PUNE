'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { RefreshCw } from 'lucide-react';
import { officialClubDetails } from '@/lib/data';

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <Navbar />

      <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-display text-[#FFC400] font-bold tracking-wider uppercase mb-2">
            <RefreshCw className="w-4 h-4 text-[#E60012]" />
            <span>STORE & EVENT POLICIES</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase">
            REFUND & <span className="text-[#E60012]">RETURNS POLICY</span>
          </h1>
          <p className="text-xs text-white/60 font-sans mt-2">
            Last Updated: August 2026 • Official Manchester United Supporters Club - Pune
          </p>
        </div>

        <div className="space-y-6 text-sm font-sans text-white/80 leading-relaxed bg-[#171717] p-8 rounded-3xl border border-white/10">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">1. MATCHDAY SCREENING TICKET REFUNDS</h2>
            <div className="bg-[#050505] p-4 rounded-xl border border-red-500/30 text-white/90">
              <strong className="text-[#E60012] font-display">STRICT EVENT POLICY:</strong> Confirmed matchday screening passes, live event tickets, or streaming passes cannot be cancelled, modified, or refunded once payment is completed.
            </div>
            <p className="text-xs text-white/70">
              In the rare event that a matchday screening is completely cancelled by MUSC Pune or venue management due to unforeseen circumstances, full ticket refunds will be processed automatically back to the original payment method within 5–7 business days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">2. PHYSICAL MERCHANDISE RETURNS</h2>
            <p>
              We accept return requests for physical merchandise (e.g. supporter scarves, mugs) within 7 days of delivery under the following conditions:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-white/70">
              <li>The item delivered is physically damaged, defective, or incorrect.</li>
              <li>The product must be unused, unwashed, and returned in original packaging with crest tags intact.</li>
              <li>Proof of unboxing video or damage photographs must be shared with <a href={`mailto:${officialClubDetails.email}`} className="text-[#E60012] underline">{officialClubDetails.email}</a>.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">3. REFUND PROCESSING TIME</h2>
            <p>
              Once your returned merchandise is received and inspected by our committee team, approved refunds will be credited via Razorpay back to your original source account (UPI, Credit Card, Netbanking) within 5–7 working days.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
