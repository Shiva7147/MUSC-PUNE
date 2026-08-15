'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, MapPin, Navigation, Quote } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const stats = [
    { label: 'REGISTERED PUNE REDS', value: '1,200+' },
    { label: 'MATCHDAY SCREENINGS HELD', value: '85+' },
    { label: 'YEARS OF COMMUNITY IN PUNE', value: '6+' },
    { label: 'OLD TRAFFORD TOURS COMPLETED', value: '12+' },
  ];

  const roadmapSteps = [
    { location: 'FC ROAD & DECCAN', role: 'Original Supporters Meetups (2021)' },
    { location: 'KOREGAON PARK (KP)', role: 'Derby Screening Hubs' },
    { location: 'VIMAN NAGAR', role: 'Main Stadium Screening Arena' },
    { location: 'OLD TRAFFORD (MANCHESTER)', role: 'Stretford End Delegation' },
  ];

  return (
    <section id="about" className="py-24 bg-[#070707] relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & FC Road to OT Roadmap */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#C8102E]/20 border border-[#C8102E]/40 text-[#C8102E] text-xs font-mono font-bold tracking-widest uppercase">
              <Heart className="w-3.5 h-3.5" />
              <span>SUPPORTERS COMMUNITY IDENTITY</span>
            </div>

            <h2 className="font-display text-5xl sm:text-7xl font-bold text-white uppercase leading-none">
              MORE THAN <br />
              <span className="text-[#C8102E]">A MATCH</span>
            </h2>

            <p className="text-base text-neutral-300 font-sans leading-relaxed">
              Manchester United Supporters Club Pune (MUSC Pune) is the official gathering ground for Red Devils fans living across Maharashtra&apos;s cultural capital.
            </p>

            {/* FC Road to Old Trafford Roadmap */}
            <div className="pt-2">
              <h4 className="font-display text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#C8102E]" />
                <span>FC ROAD TO OLD TRAFFORD ROADMAP</span>
              </h4>
              <div className="space-y-3 font-mono text-xs border-l-2 border-[#C8102E] pl-4">
                {roadmapSteps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C8102E] absolute -left-[21px] top-1" />
                    <div className="font-bold text-white">{step.location}</div>
                    <div className="text-neutral-400 text-[11px]">{step.role}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wall of Red Sticky Note Quote */}
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 relative mt-6">
              <Quote className="w-8 h-8 text-[#C8102E]/40 absolute top-3 right-3" />
              <div className="text-xs font-mono text-neutral-300 italic leading-relaxed">
                &quot;Standing alongside 300 Pune Reds at 10 PM shouting 20 Times at The Irish House feels just like being in the Stretford End!&quot;
              </div>
              <div className="mt-2 text-[10px] font-mono text-[#C8102E] font-bold">
                — Rohan D., Member #004 (Viman Nagar)
              </div>
            </div>
          </div>

          {/* Right Column: Visual Image + Stats Counters */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
              <Image
                src="/images/community.jpg"
                alt="MUSC Pune Supporters Community"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <span className="text-xs font-mono text-neutral-400 uppercase">LOCATION</span>
                  <div className="font-display text-lg font-bold">PUNE, MAHARASHTRA • INDIA</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#C8102E] flex items-center justify-center font-display font-bold text-lg">
                  MU
                </div>
              </div>
            </div>

            {/* Numeric Typography Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((st, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-center hover:border-[#C8102E]/40 transition-colors">
                  <div className="font-display text-4xl sm:text-5xl font-bold text-[#C8102E] tracking-tight">
                    {st.value}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase mt-1">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
