'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AlertCircle } from 'lucide-react';
import { officialClubDetails } from '@/lib/data';

export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <Navbar />

      <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-display text-[#FFC400] font-bold tracking-wider uppercase mb-2">
            <AlertCircle className="w-4 h-4 text-[#E60012]" />
            <span>TERMS & CANCELLATIONS</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase">
            CANCELLATION <span className="text-[#E60012]">POLICY</span>
          </h1>
          <p className="text-xs text-white/60 font-sans mt-2">
            Last Updated: August 2026 • Official Manchester United Supporters Club - Pune
          </p>
        </div>

        <div className="space-y-6 text-sm font-sans text-white/80 leading-relaxed bg-[#171717] p-8 rounded-3xl border border-white/10">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">1. EVENT / SCREENING TICKET CANCELLATION</h2>
            <div className="bg-[#050505] p-5 rounded-xl border border-[#E60012]/40 text-white/90">
              <strong className="text-[#E60012] font-display">NO CANCELLATION FOR TICKET BOOKINGS:</strong> Confirmed event, screening, play, sport, or online-streaming bookings cannot be cancelled, transferred, or modified after completion of payment.
            </div>
            <p className="text-xs text-white/70">
              Passes are tied to individual QR codes generated upon booking confirmation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">2. PHYSICAL MERCHANDISE CANCELLATION</h2>
            <p>
              Cancellation of physical merchandise orders is allowed strictly before the order has been dispatched from our Pune fulfillment hub:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-white/70">
              <li>To cancel an order prior to shipment, contact our team immediately at <a href={`mailto:${officialClubDetails.email}`} className="text-[#E60012] underline">{officialClubDetails.email}</a> or WhatsApp <span className="text-white font-semibold">{officialClubDetails.phone}</span> with your order details.</li>
              <li>If the order has already been handed over to the courier partner, cancellation is no longer possible and standard returns policy rules apply.</li>
            </ul>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
