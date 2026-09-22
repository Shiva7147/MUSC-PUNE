'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Ticket, Plane, Users, Camera, Heart, Sparkles } from 'lucide-react';
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717] border border-white/15 text-xs font-display text-[#E60012] font-bold uppercase shadow-lg">
              <Sparkles className="w-4 h-4 text-[#FFC400]" />
              <span>THE OFFICIAL MUSC PUNE STORY</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-[#F5F5F5] uppercase tracking-tight leading-none">
              ABOUT <span className="text-[#E60012]">THE CLUB</span>
            </h1>

            {/* Introductory Summary Paragraph */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 font-sans leading-relaxed max-w-3xl mx-auto font-medium">
              With 1,000+ passionate members and 100+ supporters coming together at our regular match screenings, we bring the spirit of Old Trafford to Pune. From unforgettable match nights and football meets to special events and group trips to the Theatre of Dreams, we are more than just a supporters club — we are a family united by our love for Manchester United.
            </p>

            <div className="inline-block bg-[#E60012] text-white font-display text-xs sm:text-sm font-bold px-4 py-2 rounded-xl uppercase tracking-wider shadow-lg">
              One club. One city. One passion. Glory, Glory Man United!
            </div>
          </div>
        </section>

        {/* LONG-FORM CLUB STORY WITH EMBEDDED PHOTOGRAPHY */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 font-sans text-white/85 text-base sm:text-lg leading-relaxed">
          {/* Paragraph 1 */}
          <div className="space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight text-[#FFC400]">
              WELCOME TO MANCHESTER UNITED SUPPORTERS CLUB PUNE
            </h2>
            <p>
              Welcome to Manchester United Supporters Club Pune, home to one of Pune&apos;s most passionate communities of Manchester United fans.
            </p>
            <p>
              What started as a shared love for the Red Devils has grown into a thriving community of 1,000+ members, brought together by football, friendship and an unwavering passion for Manchester United. Whether it&apos;s a Premier League classic, a European night under the lights or a cup final, our match screenings regularly bring together 100+ Reds, creating an atmosphere filled with chants, celebrations, nerves and unforgettable moments.
            </p>
          </div>

          {/* Embedded Photo 1: Pune Matchday Screening Night */}
          <div className="space-y-2">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-[#171717] group">
              <Image
                src="https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_1600/v1786865408/WhatsApp_Image_2026-08-16_at_11.53.51_AM_3_eivq1o.jpg"
                alt="MUSC Pune 100+ Reds Matchday Screening Atmosphere"
                fill
                quality={95}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-sans text-white">
                <span className="bg-[#E60012] font-display font-bold px-3 py-1 rounded uppercase">
                  📍 100+ REDS MATCHDAY SCREENING
                </span>
                <span className="text-white/70 hidden sm:inline">Chants, Celebrations & Unforgettable Moments</span>
              </div>
            </div>
            <p className="text-xs text-white/50 text-center font-mono italic">
              Above: 100+ Pune Reds coming together for a live matchday screening.
            </p>
          </div>

          {/* Paragraph 2 */}
          <div className="space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight text-[#FFC400]">
              MORE THAN JUST FOOTBALL
            </h2>
            <p>
              But we&apos;re about much more than watching football. Our community comes together through football meets, special events, fan gatherings and shared experiences, giving supporters the chance to build friendships that go far beyond the final whistle.
            </p>
          </div>

          {/* Embedded Photo 2: Old Trafford Delegation Trip */}
          <div className="space-y-2">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-[#171717] group">
              <Image
                src="https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_1600/v1786865406/WhatsApp_Image_2026-08-16_at_11.53.51_AM_13_arf4zr.jpg"
                alt="MUSC Pune Old Trafford Delegation Trip"
                fill
                quality={95}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-sans text-white">
                <span className="bg-[#E60012] font-display font-bold px-3 py-1 rounded uppercase">
                  ✈️ THEATRE OF DREAMS PILGRIMAGE
                </span>
                <span className="text-white/70 hidden sm:inline">Turning Dreams into Memories for Life</span>
              </div>
            </div>
            <p className="text-xs text-white/50 text-center font-mono italic">
              Above: MUSC Pune members on an official group trip to Old Trafford, Manchester.
            </p>
          </div>

          {/* Paragraph 3 */}
          <div className="space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight text-[#FFC400]">
              PILGRIMAGES TO THE THEATRE OF DREAMS
            </h2>
            <p>
              And for those who dream of experiencing Manchester United at its home, we also organise and support Old Trafford group trips, helping our members turn the dream of visiting the Theatre of Dreams into a memory for life.
            </p>
            <p>
              At Manchester United Supporters Club Pune, every goal is celebrated together, every defeat is felt together, and every new season begins with the same belief.
            </p>
            <p className="text-xl font-bold text-white pt-2 border-t border-white/10">
              We&apos;re not just supporters watching a club. We&apos;re a community living the passion — together.
            </p>
          </div>

          {/* Slogan Banner Card */}
          <div className="bg-gradient-to-r from-[#171717] via-[#1A0A0C] to-[#171717] border-2 border-[#E60012]/60 rounded-3xl p-8 text-center space-y-3 shadow-2xl">
            <Heart className="w-8 h-8 text-[#E60012] mx-auto animate-pulse" />
            <div className="font-display text-2xl sm:text-4xl font-bold text-white uppercase">
              One club. One family. One passion.
            </div>
            <div className="font-display text-lg sm:text-xl text-[#FFC400] font-bold uppercase tracking-wider">
              Manchester United Supporters Club Pune
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
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
