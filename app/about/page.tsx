'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Ticket, Plane } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PuneManchesterStory } from '@/components/PuneManchesterStory';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <Navbar />

      <div className="pt-28 pb-20">
        {/* Page Hero */}
        <section className="relative py-16 overflow-hidden border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl space-y-4">
              <span className="badge-pune text-xs font-sans px-3 py-1 rounded font-bold uppercase tracking-wider">
                COMMUNITY STORY
              </span>
              <h1 className="font-display text-5xl sm:text-7xl font-bold text-[#F5F5F5] uppercase tracking-tight">
                FOOTBALL BROUGHT US TO <span className="text-[#E60012]">MANCHESTER UNITED.</span>
                <br />
                PUNE MADE US A COMMUNITY.
              </h1>
              <p className="text-base text-[#F5F5F5]/80 font-sans leading-relaxed">
                Founded in 2021 by lifelong Red Devils, Manchester United Supporters Club Pune (MUSC Pune) connects over 500+ fans across Maharashtra for stadium-like screening matchdays, Old Trafford group pilgrimages, and local terrace streetwear.
              </p>
            </div>
          </div>
        </section>

        {/* Real Photo Grid Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl bg-[#171717]">
              <Image
                src="https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_1600/v1786865408/WhatsApp_Image_2026-08-16_at_11.53.51_AM_3_eivq1o.jpg"
                alt="MUSC Pune Real Screening Night"
                fill
                quality={95}
                className="object-cover object-center"
              />
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-display text-[#E60012] font-bold tracking-wider uppercase">
                <MapPin className="w-4 h-4" />
                <span>PUNE TERRACE CULTURE</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#F5F5F5] uppercase tracking-tight">
                90 MINUTES. ONE ROOM. EVERYONE SINGING.
              </h2>
              <p className="text-sm text-[#F5F5F5]/80 font-sans leading-relaxed">
                Whether it is a 09:00 PM kickoff at Viman Nagar or a late midnight derby at Koregaon Park, Pune Reds turn local venues into Stretford End outposts with non-stop chants, high-decibel audio, and red club flags.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/screenings"
                  className="bg-[#E60012] hover:bg-[#C40010] text-white font-display text-sm font-bold px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-[0_8px_30px_rgba(230,0,18,0.25)] transition-all hover:scale-[1.02]"
                >
                  <Ticket className="w-4 h-4" />
                  <span>VIEW MATCHDAY SCREENINGS</span>
                </Link>
                <Link
                  href="/tours"
                  className="bg-[#171717] hover:bg-black border border-[#E60012] text-[#FFC400] font-display text-sm font-bold px-6 py-3.5 rounded-xl flex items-center gap-2 transition-all shadow-xl hover:scale-[1.02]"
                >
                  <Plane className="w-4 h-4 text-[#E60012]" />
                  <span>TRIP TO OLD TRAFFORD</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pune x Manchester Visual Storytelling */}
        <PuneManchesterStory />
      </div>

      <Footer />
    </main>
  );
}
