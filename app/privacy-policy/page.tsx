'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Mail } from 'lucide-react';
import { officialClubDetails } from '@/lib/data';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <Navbar />

      <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-display text-[#FFC400] font-bold tracking-wider uppercase mb-2">
            <ShieldCheck className="w-4 h-4 text-[#E60012]" />
            <span>LEGAL & COMPLIANCE</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase">
            PRIVACY <span className="text-[#E60012]">POLICY</span>
          </h1>
          <p className="text-xs text-white/60 font-sans mt-2">
            Last Updated: August 2026 • Official Manchester United Supporters Club - Pune
          </p>
        </div>

        <div className="space-y-6 text-sm font-sans text-white/80 leading-relaxed bg-[#171717] p-8 rounded-3xl border border-white/10">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">1. OVERVIEW</h2>
            <p>
              MUSC Pune (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the official supporters club platform for Manchester United fans in Pune, Maharashtra. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website, book matchday screening passes, purchase merchandise, or register for Old Trafford trips.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">2. INFORMATION WE COLLECT</h2>
            <p>We may collect personal details including:</p>
            <ul className="list-disc pl-5 space-y-1 text-white/70">
              <li>Full Name, Email Address, Phone / WhatsApp Number</li>
              <li>Delivery Address, City, State, and Pincode for merchandise shipments</li>
              <li>Transaction & Payment details (processed securely via Razorpay)</li>
              <li>Ticket Booking IDs, QR Code verification logs, and event entry records</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">3. HOW WE USE YOUR INFORMATION</h2>
            <p>Your information is used strictly for:</p>
            <ul className="list-disc pl-5 space-y-1 text-white/70">
              <li>Issuing digital ticket stubs and scanning QR codes for screening venue entry</li>
              <li>Fulfilling official merchandise orders and dispatch notifications</li>
              <li>Organizing Old Trafford group trip visa assistance and travel logistics</li>
              <li>Sending essential screening updates via WhatsApp or Email</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">4. PAYMENT PROCESSING & SECURITY</h2>
            <p>
              All online payments are processed through Razorpay. MUSC Pune does not store your credit card numbers, debit card details, CVV, or net banking credentials on our servers. All payment transactions comply with PCI-DSS standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-white uppercase text-[#FFC400]">5. GRIEVANCE OFFICER</h2>
            <p>
              In accordance with Information Technology Act 2000 and rules made thereunder, the name and contact details of the Grievance Officer are provided below:
            </p>
            <div className="bg-[#050505] p-4 rounded-xl border border-white/10 text-xs space-y-1 font-mono text-white/90">
              <div><strong>Grievance Officer:</strong> {officialClubDetails.grievanceOfficer}</div>
              <div><strong>Organization:</strong> {officialClubDetails.fullName}</div>
              <div><strong>Email:</strong> {officialClubDetails.grievanceEmail}</div>
              <div><strong>Founder Email:</strong> {officialClubDetails.founderEmail}</div>
              <div><strong>Phone / WhatsApp:</strong> {officialClubDetails.phone}</div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
