'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import { officialClubDetails } from '@/lib/data';

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <Navbar />

      <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-display text-[#FFC400] font-bold tracking-wider uppercase mb-2">
            <ShieldCheck className="w-4 h-4 text-[#E60012]" />
            <span>TERMS OF SERVICE & CLUB POLICIES</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase">
            TERMS & <span className="text-[#E60012]">CONDITIONS</span>
          </h1>
          <p className="text-xs text-white/60 font-sans mt-2">
            Last Updated: August 2026 • Official Manchester United Supporters Club - Pune
          </p>
        </div>

        <div className="space-y-8 text-sm font-sans text-white/80 leading-relaxed bg-[#171717] p-6 sm:p-8 rounded-3xl border border-white/10">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">1. ACCEPTANCE OF TERMS</h2>
            <p>
              By accessing or using the official MUSC Pune platform (muscpune.in), purchasing matchday screening passes, acquiring official merchandise, or enrolling in supporters club memberships, you agree to be bound by these Terms and Conditions.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">2. MATCHDAY SCREENINGS & TICKETING</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-white/70">
              <li>Each matchday screening ticket pass is issued with a unique QR code valid for single entry per ticket.</li>
              <li>Admin scanners reserve the right to verify government photo ID alongside the digital QR code at screening entry gates.</li>
              <li>Right of admission is strictly reserved by venue management and MUSC Pune committee members.</li>
              <li>Unruly behavior, harassment, or damage to venue property will result in immediate ejection without refund.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">3. MERCHANDISE PURCHASES</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-white/70">
              <li>All merchandise product descriptions and prices are subject to availability.</li>
              <li>Orders are dispatched within 1–4 business days across valid Indian pincodes.</li>
              <li>Customers must provide accurate shipping details during checkout.</li>
            </ul>
          </section>

          {/* Section 4 - Refund & Cancellation Policy */}
          <section id="refund-policy" className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-[#FFC400]">
              <RefreshCw className="w-5 h-5 text-[#E60012]" />
              <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">
                4. REFUND & CANCELLATION POLICY
              </h2>
            </div>
            
            <div className="bg-[#050505] p-4 rounded-xl border border-red-500/30 text-white/90">
              <strong className="text-[#E60012] font-display">EVENT TICKETING POLICY:</strong> Confirmed matchday screening passes, live event tickets, or streaming passes cannot be cancelled, modified, or refunded once payment is completed.
            </div>
            <p className="text-xs text-white/70">
              In the rare event that a matchday screening is completely cancelled by MUSC Pune or venue management due to unforeseen circumstances, full ticket refunds will be processed automatically back to the original payment method within 5–7 business days.
            </p>
            <div className="space-y-2">
              <h3 className="font-bold text-white text-xs uppercase tracking-wider">Physical Merchandise Returns:</h3>
              <ul className="list-disc pl-5 space-y-1 text-white/70">
                <li>Return requests for physical merchandise (e.g. supporter scarves, mugs) are accepted within 7 days of delivery if damaged or defective.</li>
                <li>Items must be unused, unwashed, and returned in original packaging. Proof of unboxing video or damage photos must be emailed to <a href={`mailto:${officialClubDetails.email}`} className="text-[#E60012] underline">{officialClubDetails.email}</a>.</li>
                <li>Approved refunds are processed via Razorpay back to your original source account within 5–7 working days.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 - Shipping & Delivery Policy */}
          <section id="shipping-policy" className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-[#FFC400]">
              <Truck className="w-5 h-5 text-[#E60012]" />
              <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">
                5. SHIPPING & DELIVERY POLICY
              </h2>
            </div>

            <ul className="list-disc pl-5 space-y-1.5 text-white/70">
              <li>Orders are dispatched within <strong>1–4 business days</strong> following payment confirmation.</li>
              <li>During mega-sale events or new jersey drops, dispatch may take slightly longer.</li>
              <li>All merchandise orders above <strong>₹299</strong> qualify for free standard shipping across eligible Indian pincodes.</li>
              <li>Tracking links are sent via SMS/Email once packages are handed to courier partners.</li>
              <li>Local Pune supporters may also opt for complimentary pickup at official screening venues.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pt-4 border-t border-white/10">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">6. INTELLECTUAL PROPERTY & JURISDICTION</h2>
            <p className="text-white/70">
              &quot;MUSC Pune&quot; and associated logos are official trademarks of the Manchester United Supporters Club Pune (Est. 2011). Manchester United trademarks and club emblems are the property of Manchester United PLC. These Terms shall be governed by the laws of India, subject to the jurisdiction of courts in Pune, Maharashtra.
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
