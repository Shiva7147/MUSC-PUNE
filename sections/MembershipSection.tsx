'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, CheckCircle2, Award, Sparkles, Shirt, Ticket, Users, Calendar } from 'lucide-react';
import { officialLogoUrl } from '@/lib/data';

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

        {/* SPECTACULAR PHYSICAL-STYLE MEMBERSHIP CARD */}
        <div className="max-w-4xl mx-auto glass-card rounded-[2.5rem] p-6 sm:p-10 bg-gradient-to-br from-[#1A1A1A] via-[#0E0E0E] to-[#141414] border-2 border-[#E60012]/70 shadow-[0_20px_60px_rgba(230,0,18,0.3)] space-y-8 relative overflow-hidden">
          {/* Card Top Brand & Holo Badge Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/15 pb-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-[#E60012] border-2 border-white/20 shrink-0 shadow-lg flex items-center justify-center p-1">
                <Image src={officialLogoUrl} alt="MUSC Pune Official Logo" width={48} height={48} className="object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide leading-none">
                    MUSC PUNE MEMBERSHIP
                  </span>
                  <span className="bg-[#E60012] text-white text-[10px] font-display font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    2025/26
                  </span>
                </div>
                <div className="text-xs font-display text-white/60 uppercase tracking-widest mt-1">
                  OFFICIAL SUPPORTERS CLUB • PUNE&apos;S RED ARMY
                </div>
              </div>
            </div>

            <div className="sm:text-right bg-[#050505] p-3 px-5 rounded-2xl border border-white/15 w-full sm:w-auto flex sm:block items-center justify-between">
              <span className="text-[10px] font-display text-white/50 uppercase block">ALL-INCLUSIVE PRICE</span>
              <span className="font-display text-3xl sm:text-4xl font-bold text-[#E60012]">₹999</span>
            </div>
          </div>

          {/* 4 Official Benefits Grid */}
          <div className="space-y-3">
            <div className="text-xs font-display text-white/90 font-bold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E60012]" />
              <span>INCLUDED MEMBERSHIP BENEFITS:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, idx) => {
                const IconComponent = b.icon;
                return (
                  <div key={idx} className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#050505] border border-white/10 text-xs font-sans text-white/90 shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-[#E60012]/15 border border-[#E60012]/40 text-[#E60012] flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5" />
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
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-display text-white/90 font-bold uppercase tracking-wider">
              SELECT OFFICIAL T-SHIRT SIZE *
            </label>
            <div className="flex flex-wrap items-center gap-2.5">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size as any)}
                  className={`px-5 py-3 rounded-xl font-display text-base font-bold border transition-all ${
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
          <div className="p-4 rounded-2xl bg-[#050505] border border-white/10 space-y-2 text-xs font-sans">
            <div className="flex justify-between text-white/70">
              <span>Base Membership Price</span>
              <span className="font-mono text-white">₹822</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Applicable Tax (18% GST)</span>
              <span className="font-mono text-white">₹147</span>
            </div>
            <div className="flex justify-between text-white/70 pb-2 border-b border-white/10">
              <span>Platform & Processing Fee</span>
              <span className="font-mono text-white">₹30</span>
            </div>
            <div className="flex justify-between font-display text-xl font-bold text-white pt-1">
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
    </section>
  );
};
