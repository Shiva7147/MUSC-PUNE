'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ShieldCheck,
  Sparkles,
  Shirt,
  Ticket,
  ExternalLink,
  CheckCircle2,
  Star,
  Globe,
  ShoppingBag,
  Gift,
  Armchair,
  MessageCircle,
  AlertCircle,
  Send,
} from 'lucide-react';
import { officialLogoUrl, officialMembershipImageUrl } from '@/lib/data';
import { Product, MembershipConfig } from '@/lib/types';
import { getMembershipConfigStore, subscribeStore } from '@/lib/ticketStore';

interface MembershipSectionProps {
  onAddToCart?: (product: Product, size: string, quantity: number) => void;
  onOpenCart?: () => void;
  isHomepage?: boolean;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({
  onAddToCart,
  onOpenCart,
  isHomepage = false,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [sizeError, setSizeError] = useState<boolean>(false);
  const [membershipConfig, setMembershipConfig] = useState<MembershipConfig>(getMembershipConfigStore());

  const whatsappNumberUrl = 'https://wa.me/917276735140';

  useEffect(() => {
    const handleStoreChange = () => {
      setMembershipConfig(getMembershipConfigStore());
    };
    const unsubscribe = subscribeStore(handleStoreChange);
    return () => {
      unsubscribe();
    };
  }, []);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const localTierFeatures = [
    { title: 'Official MUFC Pune T-Shirt', detail: 'Official supporter kit (Select size S to XXL)', icon: Shirt },
    { title: '100% Complimentary Screening Ticket', detail: '1 Free entry pass to any 1 matchday screening', icon: Ticket },
    { title: 'Priority Seating', detail: 'Reserved front-row seating at all Pune screenings', icon: Armchair },
    { title: 'Exclusive Member Privileges', detail: 'Access to member meetups, raffles & WhatsApp group', icon: Gift },
  ];

  const globalOumBenefits = [
    'Priority access to face-value home & away match tickets at Old Trafford',
    'Official Manchester United Membership Pack & Digital Crest Pass',
    '10% discount at official Megastore (online & Old Trafford)',
    'Exclusive access to digital yearbook & United media streams',
  ];

  const handleJoinClicked = () => {
    if (!selectedSize) {
      setSizeError(true);
      alert('Please select your official T-Shirt size (S, M, L, XL, XXL) before joining Pune’s Red Army.');
      return;
    }

    setSizeError(false);

    // Retrieve price dynamically set by Admin
    const dynamicPrice =
      membershipConfig.sizePrices && membershipConfig.sizePrices[selectedSize]
        ? membershipConfig.sizePrices[selectedSize]
        : membershipConfig.basePrice || 999;

    const membershipItem: Product = {
      id: 'musc-pune-membership',
      name: "Pune's Red Army Membership",
      category: 'Membership',
      price: dynamicPrice,
      image: officialMembershipImageUrl,
      description:
        "Official local supporters club membership for Pune's Red Army including Official T-Shirt, 1 Free Match Screening Ticket, Priority Seating, and WhatsApp Community Access.",
      availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      inStock: true,
      badge: '🔴 Official Local Membership',
      details: [
        'Official MUFC Pune T-Shirt Included',
        '1 Free Match Screening Ticket',
        'Priority Seating at Screenings',
        'Exclusive Member Meetups & Raffles',
        'WhatsApp Community Access',
      ],
    };

    if (onAddToCart) {
      onAddToCart(membershipItem, selectedSize, 1);
    } else {
      if (onOpenCart) onOpenCart();
    }
  };

  return (
    <section id="membership" className="py-16 sm:py-24 bg-[#050505] relative overflow-hidden border-t border-white/10 text-white">
      {/* Background Atmosphere Overlays */}
      <div className="absolute inset-0 bg-radial from-[#E60012]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* ONE CLEAN HEADING ONLY AS REQUESTED */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717] border border-white/15 text-xs font-display text-[#E60012] font-bold uppercase shadow-lg">
            <ShieldCheck className="w-4 h-4 text-[#E60012]" />
            <span>OFFICIAL MANCHESTER UNITED SUPPORTERS CLUB</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white uppercase leading-none">
            PUNE&apos;S RED ARMY <span className="text-[#E60012]">MEMBERSHIP</span>
          </h1>

          <p className="text-sm sm:text-base text-white/80 font-sans max-w-2xl mx-auto leading-relaxed">
            {isHomepage ? (
              <>Select your official T-Shirt size below to join Pune&apos;s Red Army and checkout directly.</>
            ) : (
              <>Explore our two official membership avenues: Official Local Supporters Club Membership and Global One United Membership (OUM).</>
            )}
          </p>
        </div>

        {/* 1. PUNE'S RED ARMY MEMBERSHIP BLOCK (LOCAL) */}
        <div className="space-y-6">
          <div className="plan-card max-w-5xl mx-auto glass-card rounded-[2.5rem] p-6 sm:p-10 bg-gradient-to-br from-[#1A1A1A] via-[#0E0E0E] to-[#141414] border-2 border-[#E60012]/70 shadow-[0_20px_60px_rgba(230,0,18,0.35)] space-y-8 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Official Membership Poster Image */}
              <div className="lg:col-span-5 relative w-full h-[360px] sm:h-[440px] rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-black group flex items-center justify-center p-2">
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

              {/* Right: Plan Card Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/15 pb-5 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-[#E60012] border-2 border-white/20 shrink-0 shadow-lg flex items-center justify-center p-1">
                      <Image src={officialLogoUrl} alt="MUSC Pune Logo" width={40} height={40} className="object-contain" />
                    </div>
                    <div>
                      <span className="bg-[#E60012] text-white text-[10px] font-display font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                        🔴 Official Local Membership
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase leading-none mt-1">
                        Pune&apos;s Red Army Membership
                      </h3>
                    </div>
                  </div>

                  <div className="bg-[#050505] p-3 px-4 rounded-2xl border border-white/15 w-full sm:w-auto flex sm:block items-center justify-between">
                    <span className="text-[10px] font-display text-white/50 uppercase block">STATUS</span>
                    <span className="font-display text-sm font-bold text-emerald-400">REGISTRATIONS OPEN</span>
                  </div>
                </div>

                {/* Included Local Membership Features */}
                <div className="space-y-3">
                  <div className="text-xs font-display text-white/90 font-bold uppercase flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E60012]" />
                    <span>INCLUDED MEMBERSHIP BENEFITS:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {localTierFeatures.map((f, idx) => {
                      const IconComp = f.icon;
                      return (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-[#050505] border border-white/10 text-xs font-sans text-white/90 shadow-md">
                          <div className="w-9 h-9 rounded-xl bg-[#E60012]/15 border border-[#E60012]/40 text-[#E60012] flex items-center justify-center shrink-0">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-white text-xs sm:text-sm">{f.title}</div>
                            <div className="text-white/60 text-[11px] mt-0.5">{f.detail}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Interactive T-Shirt Size Selector Component */}
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-display text-white/90 font-bold uppercase">
                      Select Official T-Shirt Size: *
                    </label>
                    {sizeError && (
                      <span className="text-xs font-display text-[#E60012] font-bold flex items-center gap-1 animate-pulse">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Size Required</span>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => {
                          setSelectedSize(sz);
                          setSizeError(false);
                        }}
                        className={`px-4 py-2.5 rounded-xl font-display text-base font-bold border transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-[#E60012] text-white border-[#E60012] shadow-lg shadow-[#E60012]/40 scale-105'
                            : 'bg-[#050505] text-white/70 border-white/15 hover:text-white hover:border-white/30'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Checkout CTA Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleJoinClicked}
                    className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xl sm:text-2xl font-bold py-4 px-8 rounded-2xl shadow-[0_10px_35px_rgba(230,0,18,0.45)] flex items-center justify-center gap-3 transition-all hover:scale-[1.02] border border-white/20 uppercase cursor-pointer"
                  >
                    <ShoppingBag className="w-6 h-6 shrink-0 text-white" />
                    <span>JOIN PUNE&apos;S RED ARMY</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. OUM (ONE UNITED MEMBERSHIP) BLOCK (GLOBAL) — DISPLAYED ON DEDICATED MEMBERSHIP PAGE */}
        {!isHomepage && (
          <div className="max-w-5xl mx-auto glass-card rounded-[2.5rem] p-6 sm:p-10 bg-[#171717] border border-white/15 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/15 pb-6 gap-4">
              <div>
                <span className="badge-pune text-xs font-display font-bold px-3 py-1 rounded uppercase">
                  GLOBAL MANCHESTER UNITED MEMBERSHIP
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2 uppercase flex items-center gap-2">
                  <Globe className="w-7 h-7 text-[#E60012]" />
                  <span>One United Membership (OUM)</span>
                </h2>
                <p className="text-xs sm:text-sm text-white/70 font-sans mt-1">
                  Official international membership purchased directly via Manchester United (<code className="text-[#E60012] font-mono">manutd.com</code>).
                </p>
              </div>

              <div className="bg-[#050505] p-3.5 px-5 rounded-2xl border border-white/15 shrink-0 text-left sm:text-right">
                <div className="text-[10px] font-display text-white/50 uppercase">MAN UTD PRICE</div>
                <div className="font-display text-2xl font-bold text-white">STARTS AT £37.50</div>
              </div>
            </div>

            {/* 3-Step OUM Onboarding Guide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="bg-[#050505] border border-white/10 rounded-2xl p-5 space-y-3 relative group hover:border-[#E60012]/60 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#E60012]/15 border border-[#E60012]/40 text-[#E60012] font-display font-bold text-lg flex items-center justify-center">
                  01
                </div>
                <h3 className="font-display text-lg font-bold text-white uppercase">Step 01: Buy Your OUM</h3>
                <p className="text-xs text-white/80 font-sans leading-relaxed">
                  Purchase your Official One United Membership (Full, Premium, or Junior) on <code className="text-[#E60012]">manutd.com</code>.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-[#050505] border border-white/10 rounded-2xl p-5 space-y-3 relative group hover:border-[#E60012]/60 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#E60012]/15 border border-[#E60012]/40 text-[#E60012] font-display font-bold text-lg flex items-center justify-center">
                  02
                </div>
                <h3 className="font-display text-lg font-bold text-white uppercase">Step 02: Pune Mailing Address</h3>
                <p className="text-xs text-white/80 font-sans leading-relaxed">
                  Use a <strong>Pune mailing address</strong> during checkout on <code className="text-[#E60012]">manutd.com</code> to map your membership to MUSC Pune.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-[#050505] border border-white/10 rounded-2xl p-5 space-y-3 relative group hover:border-[#E60012]/60 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#E60012]/15 border border-[#E60012]/40 text-[#E60012] font-display font-bold text-lg flex items-center justify-center">
                  03
                </div>
                <h3 className="font-display text-lg font-bold text-white uppercase">Step 03: Share Confirmation</h3>
                <p className="text-xs text-white/80 font-sans leading-relaxed">
                  Forward your OUM receipt email to <a href="mailto:manutdpune@gmail.com" className="text-[#E60012] underline">manutdpune@gmail.com</a> to register for Old Trafford ticket allocations.
                </p>
              </div>
            </div>

            {/* Global OUM Benefits List */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <h4 className="font-display text-xs font-bold text-white/90 uppercase tracking-wider">Global OUM Benefits Included:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-white/80">
                {globalOumBenefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* External Link Action */}
            <div className="pt-4 border-t border-white/15 flex items-center justify-center sm:justify-start">
              <a
                href="https://www.manutd.com/en/tickets-and-hospitality/membership"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E60012] hover:bg-[#C40010] text-white font-display text-base font-bold py-4 px-8 rounded-xl flex items-center gap-2 shadow-lg transition-all border border-white/20 uppercase cursor-pointer"
              >
                <span>Buy One United Membership on ManUtd.com</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
