'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Truck } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <Navbar />

      <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-display text-[#FFC400] font-bold tracking-wider uppercase mb-2">
            <Truck className="w-4 h-4 text-[#E60012]" />
            <span>FULFILLMENT & DELIVERY</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase">
            SHIPPING <span className="text-[#E60012]">POLICY</span>
          </h1>
          <p className="text-xs text-white/60 font-sans mt-2">
            Last Updated: August 2026 • Official Manchester United Supporters Club - Pune
          </p>
        </div>

        <div className="space-y-6 text-sm font-sans text-white/80 leading-relaxed bg-[#171717] p-8 rounded-3xl border border-white/10">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">1. DISPATCH TIMELINES</h2>
            <ul className="list-disc pl-5 space-y-1 text-white/70">
              <li>Orders are generally dispatched within <strong>1–4 business days</strong> following confirmation of payment.</li>
              <li>During mega-sale events, new jersey drops, or derby screening weeks, dispatch may take slightly longer due to high volume.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">2. FREE SHIPPING THRESHOLD</h2>
            <div className="bg-[#050505] p-4 rounded-xl border border-emerald-500/30 text-white/90">
              <strong className="text-emerald-400 font-display">FREE DELIVERY:</strong> All merchandise orders above <strong>₹299</strong> qualify for free standard shipping across eligible Indian pincodes.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">3. CASH ON DELIVERY (COD) & TRACKING</h2>
            <ul className="list-disc pl-5 space-y-1 text-white/70">
              <li>COD availability is subject to pincode eligibility and order verification.</li>
              <li>Once your package is handed over to our courier partner, a tracking link will be sent to your registered mobile number and email address.</li>
              <li>Local Pune supporters may also choose complimentary pickup at official screening venues (e.g. BIRA 91 Taproom, The Mills).</li>
            </ul>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
