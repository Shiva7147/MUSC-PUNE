'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Ticket, Award, Star } from 'lucide-react';

export const MembershipSection: React.FC = () => {
  const tiers = [
    {
      id: 'basic',
      name: 'LOCAL RED PASS',
      price: '₹499',
      period: '/ year',
      badge: 'SEASON PASS',
      badgeClass: 'badge-pune',
      description: 'Essential membership for Pune-based supporters attending local matchday screenings.',
      features: [
        'Priority Screening Ticket Access (24h early)',
        '₹100 Voucher for every Pune Screening',
        'Official MUSC Pune Sticker & Badge Pack',
        'Access to Private Pune Reds WhatsApp Community'
      ],
      highlight: false,
      ctaText: 'JOIN LOCAL REDS'
    },
    {
      id: 'official-red',
      name: 'OFFICIAL MUSC PUNE',
      price: '₹1,299',
      period: '/ year',
      badge: 'MOST POPULAR',
      badgeClass: 'badge-united',
      description: 'Complete membership with official physical membership kit and Old Trafford tour eligibility.',
      features: [
        'All Local Red Pass Privileges Included',
        'Official MUSC Pune Physical Membership Kit',
        'Old Trafford Group Pilgrimage Tour Eligibility',
        '10% Discount on Official Supporter Merch',
        'Exclusive Entry into Season Jersey Raffles'
      ],
      highlight: true,
      ctaText: 'BECOME OFFICIAL MEMBER'
    },
    {
      id: 'gold-tier',
      name: 'GOLD PATRON PASS',
      price: '₹2,499',
      period: '/ year',
      badge: 'PATRON TIER',
      badgeClass: 'badge-gold',
      description: 'VIP patron pass for dedicated supporters seeking VIP screening access and travel priority.',
      features: [
        'All Official MUSC Pune Privileges Included',
        'VIP Reserved Seating at All Screenings',
        'Priority Match Ticket Allocation for Old Trafford Tours',
        'Complimentary Matchday Supporter Scarf',
        'Invitation to Annual Legends Gala Dinner'
      ],
      highlight: false,
      ctaText: 'JOIN AS GOLD PATRON'
    }
  ];

  return (
    <section id="membership" className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-display text-[#FFC400] font-bold tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4 text-[#E60012]" />
              <span>OFFICIAL SUPPORTERS CLUB PASS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mt-1 uppercase">
              MEMBERSHIP <span className="text-[#E60012]">TIERS</span>
            </h2>
            <p className="text-sm text-[#F5F5F5]/70 max-w-xl mt-2 font-sans">
              Join 500+ supporters across Pune. Receive priority screening tickets, physical membership kits, and Old Trafford tour access.
            </p>
          </div>

          <div className="badge-united text-xs font-display px-3.5 py-1.5 rounded-lg font-bold">
            🔴 2025/26 MEMBERSHIPS OPEN
          </div>
        </div>

        {/* Tier Cards Grid with Equal Heights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative border ${
                tier.highlight
                  ? 'border-[#E60012] bg-[#171717] shadow-[0_8px_30px_rgba(230,0,18,0.25)] scale-[1.02]'
                  : 'border-white/10 bg-[#171717]/80'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`${tier.badgeClass} text-[10px] font-display px-3 py-1 rounded font-bold uppercase tracking-wider`}>
                    {tier.badge}
                  </span>
                  {tier.highlight && <Star className="w-5 h-5 text-[#FFC400] fill-[#FFC400]" />}
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="font-display text-4xl font-bold text-[#E60012]">{tier.price}</span>
                    <span className="text-xs text-white/60 font-sans">{tier.period}</span>
                  </div>
                </div>

                <p className="text-xs text-[#F5F5F5]/80 font-sans leading-relaxed pt-2 border-t border-white/10">
                  {tier.description}
                </p>

                {/* Features Checklist with High Contrast Text */}
                <div className="space-y-2.5 pt-4">
                  <div className="text-[10px] font-display text-[#FFC400] font-bold uppercase tracking-wider">
                    TIER BENEFITS:
                  </div>
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-sans text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-[#E60012] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Button Aligned across all cards */}
              <div className="pt-6 border-t border-white/10">
                <Link
                  href="/membership"
                  className={`w-full py-4 px-6 rounded-xl font-display text-xs tracking-wider font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] ${
                    tier.highlight
                      ? 'bg-[#E60012] hover:bg-[#C40010] text-white shadow-[0_4px_20px_rgba(230,0,18,0.35)]'
                      : 'bg-[#050505] hover:bg-[#E60012] text-white border border-white/10'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>{tier.ctaText}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
