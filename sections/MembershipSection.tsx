'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Award, Sparkles, Shirt, Ticket, Users, Calendar } from 'lucide-react';
import { officialLogoUrl, officialMembershipImageUrl } from '@/lib/data';

export const MembershipSection: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'>('L');
  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  const benefits = [
    { title: 'Exclusive Merchandise', detail: 'Official MUSC Pune Supporter T-Shirt included', icon: Shirt },
    { title: 'Matchday Experience', detail: 'Priority seating & chant zone at BIRA 91 Taproom', icon: Ticket },
    { title: 'Community Events', detail: 'Access to exclusive member meetups & raffles', icon: Users },
    { title: 'One Free Screening', detail: '100% complimentary entry ticket to any screening', icon: Calendar },
  ];

  return (
    <section id="membership" className="py-20 sm:py-28 bg-[#050505] relative overflow-hidden border-t border-white/10">
      {/* Background Subtle Red Atmosphere */}
      <div className="absolute inset-0 bg-radial from-[#E60012]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171717] border border-white/15 text-xs font-display text-[#E60012] font-bold tracking-widest uppercase shadow-lg">
            <ShieldCheck className="w-4 h-4 text-[#E60012]" />
            <span>PUNE&apos;S RED ARMY OFFICIAL MEMBERSHIP</span>
          </div>

          <h2 className="font-display text-5xl sm:text-7xl font-bold text-white uppercase tracking-tight leading-none">
            MUSC PUNE <span className="text-[#E60012]">MEMBERSHIP PASS</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 font-sans max-w-xl mx-auto leading-relaxed">
            The official supporters pass for Manchester United fans in Pune. Receive the official kit, matchday privileges, and community perks.
          </p>
        </div>

        {/* SPECTACULAR PHYSICAL-STYLE MEMBERSHIP CARD WITH 100% VISIBLE OFFICIAL IMAGE */}
        <div className="max-w-5xl mx-auto glass-card rounded-[2.5rem] p-6 sm:p-10 bg-gradient-to-br from-[#1A1A1A] via-[#0E0E0E] to-[#141414] border-2 border-[#E60012]/70 shadow-[0_20px_60px_rgba(230,0,18,0.3)] space-y-8 relative overflow-hidden">
          {/* Main Grid: Official Membership Image + Card Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: 100% Fully Visible Uncropped Membership Poster Container */}
            <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-black group flex items-center justify-center p-2">
              <Image
                src={officialMembershipImageUrl}
                alt="Official MUSC Pune Membership Card Poster"
                fill
                priority
                quality={100}
                unoptimized
                className="object-contain object-center group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            {/* Right: Membership Privileges & Form */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/15 pb-5 gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-[#E60012] border-2 border-white/20 shrink-0 shadow-lg flex items-center justify-center p-1">
                    <Image src={officialLogoUrl} alt="MUSC Pune Official Logo" width={40} height={40} className="object-contain" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-bold text-white uppercase tracking-wide leading-none">
                      PUNE&apos;S RED ARMY PASS
                    </h3>
                    <div className="text-xs font-display text-white/60 uppercase tracking-widest mt-1">
                      EST. 2011 • OFFICIAL SUPPORTERS CLUB
                    </div>
                  </div>
                </div>

                <div className="bg-[#050505] p-3 px-5 rounded-2xl border border-white/15 w-full sm:w-auto flex sm:block items-center justify-between">
                  <span className="text-[10px] font-display text-white/50 uppercase block">ALL-INCLUSIVE PRICE</span>
                  <span className="font-display text-3xl font-bold text-[#E60012]">₹999</span>
                </div>
              </div>

              {/* 4 Official Benefits Grid */}
              <div className="space-y-3">
                <div className="text-xs font-display text-white/90 font-bold uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E60012]" />
                  <span>INCLUDED MEMBERSHIP BENEFITS:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {benefits.map((b, idx) => {
                    const IconComponent = b.icon;
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#050505] border border-white/10 text-xs font-sans text-white/90 shadow-md">
                        <div className="w-9 h-9 rounded-xl bg-[#E60012]/15 border border-[#E60012]/40 text-[#E60012] flex items-center justify-center shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{b.title}</div>
                          <div className="text-white/60 text-xs mt-0.5">{b.detail}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector for Official Supporter T-Shirt */}
              <div className="space-y-2.5 pt-1">
                <label className="block text-xs font-display text-white/90 font-bold uppercase tracking-wider">
                  SELECT OFFICIAL T-SHIRT SIZE *
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size as any)}
                      className={`px-4 py-2.5 rounded-xl font-display text-base font-bold border transition-all ${
                        selectedSize === size
                          ? 'bg-[#E60012] text-white border-[#E60012] shadow-lg shadow-[#E60012]/40 scale-105'
                          : 'bg-[#050505] text-white/70 border-white/15 hover:text-white hover:border-white/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Checkout Breakdown */}
              <div className="p-3.5 rounded-2xl bg-[#050505] border border-white/10 space-y-1.5 text-xs font-sans">
                <div className="flex justify-between text-white/70">
                  <span>Base Membership Price</span>
                  <span className="font-mono text-white">₹822</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Applicable Tax (18% GST)</span>
                  <span className="font-mono text-white">₹147</span>
                </div>
                <div className="flex justify-between text-white/70 pb-1.5 border-b border-white/10">
                  <span>Platform & Processing Fee</span>
                  <span className="font-mono text-white">₹30</span>
                </div>
                <div className="flex justify-between font-display text-xl font-bold text-white pt-0.5">
                  <span>TOTAL PAYABLE</span>
                  <span className="text-[#E60012]">₹999</span>
                </div>
              </div>

              {/* Major High-Impact CTA Button */}
              <div>
                <a
                  href={`https://wa.me/917276735140?text=Hi%20MUSC%20Pune,%20I%20want%20to%20join%20Pune's%20Red%20Army%20with%20the%20Official%20₹999%20Membership!%20(T-Shirt%20Size:%20${selectedSize})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-2xl tracking-wider font-bold py-4 px-8 rounded-2xl shadow-[0_10px_35px_rgba(230,0,18,0.4)] flex items-center justify-center gap-3 transition-all hover:scale-[1.02] border border-white/20 uppercase"
                >
                  <Award className="w-6 h-6" />
                  <span>JOIN PUNE&apos;S RED ARMY — ₹999</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
