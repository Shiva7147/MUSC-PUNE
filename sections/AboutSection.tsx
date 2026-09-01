'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tv, Users, Plane, ArrowRight, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const featureTabs = [
    {
      title: 'Match Screenings',
      detail: 'High-decibel screening matchdays for Premier League, Champions League, and FA Cup at BIRA 91 Taproom, The Mills.',
      icon: Tv,
      href: '/screenings',
      tag: 'SCREENING TICKETS',
    },
    {
      title: 'Community Events',
      detail: 'Football matchdays, turf tournaments, WhatsApp community meetups, and exclusive supporter gatherings across Pune.',
      icon: Users,
      href: '/about',
      tag: 'COMMUNITY PERKS',
    },
    {
      title: 'Old Trafford Group Trips',
      detail: 'Group pilgrimages to Manchester, matchday tickets at the Theatre of Dreams, stadium tours, and museum access.',
      icon: Plane,
      href: '/tours',
      tag: 'PILGRIMAGE TRIP',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-24 bg-[#050505] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header & Short Introduction Text */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-white/15 text-xs font-display text-[#E60012] font-bold uppercase shadow-lg">
            <ShieldCheck className="w-4 h-4 text-[#E60012]" />
            <span>EST. 2011 • OFFICIAL MANCHESTER UNITED SUPPORTERS CLUB PUNE</span>
          </div>

          <h2 className="font-display text-5xl sm:text-7xl font-bold text-white uppercase leading-none">
            ABOUT <span className="text-[#E60012]">MUSC PUNE</span>
          </h2>

          <p className="text-base sm:text-lg text-white/90 font-sans leading-relaxed">
            Manchester United Supporters Club Pune (MUSC Pune) brings Reds together through screening tickets, community events, and Old Trafford group trips. Founded in 2011, we are the home of Manchester United supporters in Pune.
          </p>
        </div>

        {/* Large High-Quality Photograph */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-[#171717] group">
          <Image
            src="https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_1600/v1786865408/WhatsApp_Image_2026-08-16_at_11.53.51_AM_3_eivq1o.jpg"
            alt="MUSC Pune Supporters Group Photo"
            fill
            priority
            quality={95}
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs sm:text-sm font-sans text-white font-semibold uppercase">
            <span>📍 PUNE&apos;S RED ARMY • MATCHDAY AT THE MILLS</span>
            <span className="hidden sm:inline-block bg-black/80 px-3 py-1 rounded-full border border-white/20">EST. 2011</span>
          </div>
        </div>

        {/* Three Visual Feature Tabs/Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureTabs.map((tab, idx) => {
            const IconComp = tab.icon;
            return (
              <Link
                key={idx}
                href={tab.href}
                className="bg-[#171717] hover:bg-[#1F1F1F] border border-white/10 hover:border-[#E60012] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 group shadow-xl block"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#E60012]/15 border border-[#E60012]/30 flex items-center justify-center text-[#E60012] group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-display font-bold px-2.5 py-1 rounded bg-[#050505] text-white/60 border border-white/10 uppercase">
                      {tab.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl font-bold text-white group-hover:text-[#E60012] transition-colors uppercase">
                    {tab.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                    {tab.detail}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-display font-bold text-[#E60012] group-hover:text-white transition-colors uppercase">
                  <span>EXPLORE {tab.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
