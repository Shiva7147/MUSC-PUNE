'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Award, Sparkles, ShoppingBag } from 'lucide-react';

export const MembershipSection: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'>('L');
  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  const benefits = [
    'Exclusive merchandise (Official T-Shirt)',
    'Matchday experience',
    'Access to community events',
    'One free screening',
  ];

  return (
    <section id="membership" className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-display text-[#FFC400] font-bold tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4 text-[#E60012]" />
              <span>PUNE&apos;S RED ARMY OFFICIAL MEMBERSHIP</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-white mt-1 uppercase">
              MUSC PUNE <span className="text-[#E60012]">MEMBERSHIP</span>
            </h1>
            <p className="text-sm text-[#F5F5F5]/80 max-w-xl mt-2 font-sans">
              Join Pune&apos;s Red Army for matchday screenings, exclusive merchandise, and community privileges.
            </p>
          </div>

          <div className="badge-united text-xs font-display px-4 py-2 rounded-xl font-bold">
            🔴 2025/26 MEMBERSHIPS OPEN
          </div>
        </div>

        {/* Official Membership Card Visual */}
        <div className="max-w-3xl mx-auto glass-card rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#171717] via-[#050505] to-[#171717] border-2 border-[#E60012]/60 shadow-[0_15px_50px_rgba(230,0,18,0.25)] space-y-8 relative overflow-hidden">
          {/* Card Top Accent Badge */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E60012] text-white flex items-center justify-center font-display text-2xl font-bold shadow-lg">
                MU
              </div>
              <div>
                <span className="text-[#FFC400] font-display text-xs font-bold tracking-widest uppercase">
                  PUNE&apos;S RED ARMY
                </span>
                <h3 className="font-display text-3xl font-bold text-white uppercase leading-none">
                  MUSC PUNE MEMBERSHIP
                </h3>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-display text-white/50 uppercase">SEASON PASS</div>
              <div className="font-display text-3xl font-bold text-[#E60012]">₹999</div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="space-y-4">
            <div className="text-xs font-display text-[#FFC400] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#E60012]" />
              <span>OFFICIAL MEMBERSHIP BENEFITS:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-[#050505] border border-white/10 text-sm font-sans text-white/90">
                  <CheckCircle2 className="w-5 h-5 text-[#E60012] shrink-0" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Size Selector for T-Shirt */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-display text-[#FFC400] font-bold uppercase">
              SELECT T-SHIRT SIZE *
            </label>
            <div className="flex flex-wrap items-center gap-2.5">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size as any)}
                  className={`px-5 py-2.5 rounded-xl font-display text-sm font-bold border transition-all ${
                    selectedSize === size
                      ? 'bg-[#E60012] text-white border-[#E60012] shadow-lg shadow-[#E60012]/40 scale-105'
                      : 'bg-[#050505] text-white/70 border-white/15 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Checkout Breakdown */}
          <div className="p-4 rounded-2xl bg-[#050505] border border-white/10 space-y-1.5 text-xs font-sans">
            <div className="flex justify-between text-white/70">
              <span>Base Membership Price</span>
              <span className="font-mono">₹822</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Applicable Tax (18% GST)</span>
              <span className="font-mono">₹147</span>
            </div>
            <div className="flex justify-between text-white/70 pb-1.5 border-b border-white/10">
              <span>Platform & Processing Fee</span>
              <span className="font-mono">₹30</span>
            </div>
            <div className="flex justify-between font-display text-lg font-bold text-white pt-1">
              <span>TOTAL PAYABLE</span>
              <span className="text-[#E60012]">₹999</span>
            </div>
          </div>

          {/* CTA Button */}
          <div>
            <a
              href={`https://wa.me/917276735140?text=Hi%20MUSC%20Pune,%20I%20want%20to%20JOIN%20NOW%20for%20the%20Official%20₹999%20Membership!%20(Size:%20${selectedSize})`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xl tracking-wider font-bold py-4 px-8 rounded-2xl shadow-[0_8px_30px_rgba(230,0,18,0.4)] flex items-center justify-center gap-3 transition-all hover:scale-[1.02] border border-white/20 uppercase"
            >
              <Award className="w-6 h-6" />
              <span>JOIN NOW — ₹999</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
