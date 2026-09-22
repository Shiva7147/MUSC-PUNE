'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Ticket, Plane, Users, Camera } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <Navbar />

      <div className="pt-28 pb-20">
        {/* Page Hero */}
        <section className="relative py-16 overflow-hidden border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <span className="badge-pune text-xs font-sans px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
              OFFICIAL SUPPORTERS CLUB STORY
            </span>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-[#F5F5F5] uppercase tracking-tight leading-none">
              ABOUT <span className="text-[#E60012]">MUSC PUNE</span>
            </h1>

            {/* EXACT DESCRIPTION WORDING REQUESTED */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 font-sans leading-relaxed max-w-3xl mx-auto font-medium">
              Manchester United Supporters Club Pune is the official supporters club of Manchester United. We bring Reds together through matches, screening, community events, and Old Trafford group trips.
            </p>
          </div>
        </section>

        {/* LONG-FORM EDITORIAL STORYTELLING WITH EMBEDDED PHOTOS */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 font-sans text-white/80 text-base leading-relaxed">
          {/* Paragraph 1 */}
          <div className="space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight text-[#FFC400]">
              1. BORN IN PUNE, BOUND BY MANCHESTER
            </h2>
            <p>
              Founded in 2011 by passionate Manchester United supporters, Manchester United Supporters Club Pune (MUSC Pune) was built on a simple belief: football should never be experienced alone in silence. Over the past decade, what began as a small gathering of diehard Reds in Pune coffee shops has transformed into Maharashtra’s largest, loudest official Manchester United fan community.
            </p>
            <p>
              Whether it is a Saturday 5:00 PM Premier League kickoff or a midnight Champions League clash under lights, MUSC Pune brings together hundreds of supporters across Pune to recreate the electrifying matchday atmosphere of the Stretford End.
            </p>
          </div>

          {/* Embedded Photo 1: Pune Matchday Screening Night */}
          <div className="space-y-2">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-[#171717] group">
              <Image
                src="https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_1600/v1786865408/WhatsApp_Image_2026-08-16_at_11.53.51_AM_3_eivq1o.jpg"
                alt="MUSC Pune Matchday Screening Atmosphere"
                fill
                quality={95}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-sans text-white">
                <span className="bg-[#E60012] font-display font-bold px-3 py-1 rounded uppercase">
                  📍 PUNE MATCHDAY SCREENING NIGHT
                </span>
                <span className="text-white/70 hidden sm:inline">Stretford End Terrace Atmosphere in Pune</span>
              </div>
            </div>
            <p className="text-xs text-white/50 text-center font-mono italic">
              Above: Pune supporters gathered for a Premier League matchday screening.
            </p>
          </div>

          {/* Paragraph 2 */}
          <div className="space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight text-[#FFC400]">
              2. THE TERRACE CULTURE & COMMUNITY MATCHES
            </h2>
            <p>
              Match screenings are only one part of the MUSC Pune experience. Beyond the 90 minutes on screen, the club organizes regular community football matches, FPL leagues, kit reveal celebrations, and charity initiatives.
            </p>
            <p>
              Every Pune screening features official United chant circles, banner displays, priority seating for official members, and authentic matchday energy. Through our active WhatsApp community, local Reds stay connected 365 days a year.
            </p>
          </div>

          {/* Embedded Photo 2: Old Trafford Delegation Trip */}
          <div className="space-y-2">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-[#171717] group">
              <Image
                src="https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865406/WhatsApp_Image_2026-08-16_at_11.53.51_AM_13_arf4zr.jpg"
                alt="MUSC Pune Old Trafford Delegation"
                fill
                quality={95}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-sans text-white">
                <span className="bg-[#E60012] font-display font-bold px-3 py-1 rounded uppercase">
                  ✈️ THEATRE OF DREAMS PILGRIMAGE
                </span>
                <span className="text-white/70 hidden sm:inline">MUSC Pune Delegation at Old Trafford</span>
              </div>
            </div>
            <p className="text-xs text-white/50 text-center font-mono italic">
              Above: Official MUSC Pune members representing the club live at Old Trafford, Manchester.
            </p>
          </div>

          {/* Paragraph 3 */}
          <div className="space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight text-[#FFC400]">
              3. GROUP PILGRIMAGES TO OLD TRAFFORD
            </h2>
            <p>
              For every true Manchester United fan, visiting Old Trafford is the ultimate dream. MUSC Pune facilitates official group trips from Pune to Manchester, securing official matchday tickets, stadium and museum tours, and accommodation for members.
            </p>
            <p>
              From walking down Sir Matt Busby Way to chanting in the Stretford End, our group pilgrimages offer Pune Reds the experience of a lifetime.
            </p>
          </div>

          {/* CTAs */}
          <div className="pt-8 border-t border-white/15 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/screenings"
              className="bg-[#E60012] hover:bg-[#C40010] text-white font-display text-sm font-bold px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-[0_8px_30px_rgba(230,0,18,0.25)] transition-all hover:scale-[1.02] uppercase"
            >
              <Ticket className="w-4 h-4" />
              <span>EXPLORE MATCH SCREENINGS</span>
            </Link>
            <Link
              href="/membership"
              className="bg-[#171717] hover:bg-black border border-white/20 text-white font-display text-sm font-bold px-6 py-3.5 rounded-xl flex items-center gap-2 transition-all shadow-xl hover:scale-[1.02] uppercase"
            >
              <Users className="w-4 h-4 text-[#E60012]" />
              <span>JOIN PUNE&apos;S RED ARMY</span>
            </Link>
            <Link
              href="/gallery"
              className="bg-[#171717] hover:bg-black border border-white/20 text-white font-display text-sm font-bold px-6 py-3.5 rounded-xl flex items-center gap-2 transition-all shadow-xl hover:scale-[1.02] uppercase"
            >
              <Camera className="w-4 h-4 text-[#FFC400]" />
              <span>VIEW GALLERY ARCHIVE</span>
            </Link>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}
