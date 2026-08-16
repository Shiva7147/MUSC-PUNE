'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ExternalLink, Award, CheckCircle2 } from 'lucide-react';

export const MembershipSection: React.FC = () => {
  return (
    <section id="membership" className="py-24 bg-[#161513] relative border-t border-[#683F39]/30 overflow-hidden">
      {/* Background Burgundy Haze */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#683F39]/15 blur-[160px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C8102E] font-bold tracking-widest uppercase">
            <Award className="w-4 h-4" />
            <span>OFFICIAL SUPPORTERS NETWORK</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#E7E0CF] uppercase">
            JOIN <span className="text-[#C8102E]">THE REDS</span>
          </h2>
          <p className="text-sm text-[#E7E0CF]/70 font-sans">
            Choose your membership tier to represent Manchester United locally in Pune and globally at Old Trafford.
          </p>
        </div>

        {/* Membership Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* 1. Official Manchester United Membership Card */}
          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between space-y-8 relative overflow-hidden border-2 border-[#E7E0CF]/40 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E7E0CF]/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-black border border-[#E7E0CF]/60 flex items-center justify-center font-display text-xl font-bold text-[#C8102E] shadow">
                    MU
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#E7E0CF] uppercase">
                      OFFICIAL MANCHESTER UNITED
                    </h3>
                    <div className="text-[10px] font-mono text-[#E7E0CF]/80 font-bold uppercase tracking-widest">
                      GLOBAL OFFICIAL CLUB MEMBERSHIP
                    </div>
                  </div>
                </div>

                <span className="badge-gold text-xs font-mono px-3 py-1 rounded uppercase font-bold">
                  GLOBAL TIER
                </span>
              </div>

              <div className="space-y-3 text-xs font-mono text-[#E7E0CF]/80">
                <div className="text-sm font-display text-[#E7E0CF] uppercase font-bold text-[#E7E0CF] mb-2">
                  MEMBERSHIP BENEFITS (PLACEHOLDER)
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E7E0CF] shrink-0 mt-0.5" />
                  <span>Access to official Manchester United match ticket ballots at Old Trafford</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E7E0CF] shrink-0 mt-0.5" />
                  <span>Digital United Membership Card & official club communications pack</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E7E0CF] shrink-0 mt-0.5" />
                  <span>10% discount at the Megastore online and Old Trafford Megastore</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E7E0CF] shrink-0 mt-0.5" />
                  <span>Exclusive access to MUTV audio streams & matchday programs</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#683F39]/40 space-y-3">
              <a
                href="https://www.manutd.com/en/memberships"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#E7E0CF] hover:bg-[#D8D0BE] text-[#161513] font-display text-base tracking-wider font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl transition-all"
              >
                <span>JOIN OFFICIAL MUFC GLOBAL</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="text-[10px] font-mono text-center text-[#E7E0CF]/50">
                Redirects to ManUtd.com official membership portal
              </div>
            </div>
          </div>

          {/* 2. Official MUSC Pune Membership Card */}
          <div className="glass-card rounded-3xl p-8 flex flex-col justify-between space-y-8 relative overflow-hidden border-2 border-[#C8102E]/60 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#C8102E]/40 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#C8102E] flex items-center justify-center font-display text-xl font-bold text-white shadow-lg">
                    MU
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#E7E0CF] uppercase">
                      OFFICIAL MUSC PUNE
                    </h3>
                    <div className="text-[10px] font-mono text-[#C8102E] font-bold uppercase tracking-widest">
                      LOCAL SUPPORTERS CLUB MEMBERSHIP
                    </div>
                  </div>
                </div>

                <span className="badge-united text-xs font-mono px-3 py-1 rounded uppercase font-bold">
                  LOCAL TIER
                </span>
              </div>

              <div className="space-y-3 text-xs font-mono text-[#E7E0CF]/80">
                <div className="text-sm font-display text-[#E7E0CF] uppercase font-bold text-[#C8102E] mb-2">
                  SUPPORTERS CLUB BENEFITS (PLACEHOLDER)
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                  <span>Priority gate entrance at all Pune screening matchdays (Viman Nagar, KP, Baner)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                  <span>15% discount on official MUSC Pune streetwear drops and terrace scarves</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                  <span>Priority registration for Old Trafford group pilgrimage tours (PNQ ➔ MAN)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                  <span>Verified Digital Red Card pass with instant QR code credential</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#683F39]/40 space-y-3">
              <Link
                href="/contact"
                className="w-full bg-[#C8102E] hover:bg-[#A00C24] text-white font-display text-base tracking-wider font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl glow-united transition-all"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>JOIN MUSC PUNE SUPPORTERS</span>
              </Link>

              <div className="text-[10px] font-mono text-center text-[#E7E0CF]/50">
                Instant digital Red Card pass generation
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
