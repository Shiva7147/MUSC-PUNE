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
} from 'lucide-react';
import { officialLogoUrl, officialMembershipImageUrl } from '@/lib/data';
import { Product, MembershipConfig } from '@/lib/types';
import { getMembershipConfigStore, subscribeStore } from '@/lib/ticketStore';

interface MembershipSectionProps {
  onAddToCart?: (product: Product, size: string, quantity: number) => void;
  onOpenCart?: () => void;
  onJoinOverride?: () => void;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({
  onAddToCart,
  onOpenCart,
  onJoinOverride,
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

  const globalOumBenefits = [
    'Priority access to face value home & away match tickets at Old Trafford',
    'Priority invitations to official Manchester United events & Meet & Greets',
    'Member-only discounts on Old Trafford Museum & Stadium Tours',
    'Early purchase rights on official United merchandise drops',
    'Access to digital yearbook & exclusive premium media content',
  ];

  const localMuscPuneBenefits = [
    '100% Complimentary ticket to any one match screening of your choice',
    'Official MUFC Pune T-shirt included with every membership',
    'Priority seating at all matchday screenings in Pune',
    'Access to exclusive member-only meetups, events & raffles',
    'Access to the official MUSC Pune WhatsApp community',
  ];

  const localTierFeatures = [
    { title: 'Official T-Shirt', detail: 'Official MUFC Pune Supporter T-Shirt included', icon: Shirt },
    { title: '100% Complimentary Ticket', detail: 'Free entry ticket to any 1 matchday screening', icon: Ticket },
    { title: 'Matchday Experience', detail: 'Priority seating at all screenings in Pune', icon: Armchair },
    { title: 'Community Events', detail: 'Access to exclusive member meetups & raffles', icon: Gift },
    { title: 'WhatsApp Community', detail: 'Direct access to Pune’s Red Army group', icon: MessageCircle },
  ];

  const handleJoinClicked = () => {
    // If on homepage, redirect directly to dedicated membership page
    if (onJoinOverride) {
      onJoinOverride();
      return;
    }

    if (!selectedSize) {
      setSizeError(true);
      alert('Please select your official T-Shirt size before adding to cart.');
      return;
    }

    setSizeError(false);

    // Retrieve price dynamically set by Admin
    const dynamicPrice =
      membershipConfig.sizePrices && membershipConfig.sizePrices[selectedSize]
        ? membershipConfig.sizePrices[selectedSize]
        : membershipConfig.basePrice || 799;

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
      alert(`Pune's Red Army Membership (Size: ${selectedSize}) added to cart!`);
      if (onOpenCart) onOpenCart();
    }
  };

  return (
    <section id="membership" className="py-20 sm:py-28 bg-[#050505] relative overflow-hidden border-t border-white/10 text-white">
      {/* Background Atmosphere Overlays */}
      <div className="absolute inset-0 bg-radial from-[#E60012]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* 1. PAGE OVERVIEW & HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717] border border-white/15 text-xs font-display text-[#E60012] font-bold uppercase shadow-lg">
            <ShieldCheck className="w-4 h-4 text-[#E60012]" />
            <span>OFFICIAL SUPPORTERS CLUB MEMBERSHIP PORTAL</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl font-bold text-white uppercase leading-none">
            MUSC PUNE <span className="text-[#E60012]">MEMBERSHIP</span>
          </h1>

          <p className="text-sm sm:text-base text-white/80 font-sans max-w-2xl mx-auto leading-relaxed">
            Welcome to the official membership center for Manchester United fans in Pune. We offer two distinct membership options: official global membership through <strong className="text-white">One United Membership (OUM)</strong> and official local club membership through <strong className="text-[#E60012]">Pune&apos;s Red Army Membership</strong>.
          </p>
        </div>

        {/* 2. OUM (ONE UNITED MEMBERSHIP) SECTION */}
        <div className="glass-card rounded-[2.5rem] p-6 sm:p-10 bg-[#171717] border border-white/15 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/15 pb-6 gap-4">
            <div>
              <span className="badge-pune text-xs font-display font-bold px-3 py-1 rounded uppercase">
                GLOBAL RECOGNITION
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2 uppercase flex items-center gap-2">
                <Globe className="w-7 h-7 text-[#E60012]" />
                <span>01. Official One United Membership (OUM)</span>
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-sans mt-1">
                Purchased directly on Manchester United&apos;s official portal (<code className="text-[#E60012] font-mono">manutd.com</code>).
              </p>
            </div>

            <div className="bg-[#050505] p-3.5 px-5 rounded-2xl border border-white/15 shrink-0 text-left sm:text-right">
              <div className="text-[10px] font-display text-white/50 uppercase">OFFICIAL MAN UTD PRICE</div>
              <div className="font-display text-2xl font-bold text-white">STARTS AT £37.50</div>
            </div>
          </div>

          {/* 2-Step Onboarding Guide */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step 1 */}
            <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 space-y-3 relative group hover:border-[#E60012]/60 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#E60012]/15 border border-[#E60012]/40 text-[#E60012] font-display font-bold text-lg flex items-center justify-center">
                01
              </div>
              <h3 className="font-display text-xl font-bold text-white uppercase">Step 01: Buy Your OUM</h3>
              <p className="text-xs text-white/80 font-sans leading-relaxed">
                Purchase your One United Membership (Full, Premium, or Junior — <em>not Forwarding</em>) on <code className="text-[#E60012]">manutd.com</code>. Starts at £37.50.
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] text-amber-400 font-sans italic">
                * Forwarding memberships do not count towards official supporters club registration.
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 space-y-3 relative group hover:border-[#E60012]/60 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#E60012]/15 border border-[#E60012]/40 text-[#E60012] font-display font-bold text-lg flex items-center justify-center">
                02
              </div>
              <h3 className="font-display text-xl font-bold text-white uppercase">Step 02: Register with a Pune Address</h3>
              <p className="text-xs text-white/80 font-sans leading-relaxed">
                Use a <strong>Pune mailing address</strong> during checkout on <code className="text-[#E60012]">manutd.com</code> so you are mapped to MUSC Pune.
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] text-amber-400 font-sans italic">
                * Direct Debit is only available for eligible UK/US bank accounts.
              </div>
            </div>
          </div>

          {/* Single Redirection Action Link */}
          <div className="pt-4 border-t border-white/15 flex items-center justify-center sm:justify-start">
            <a
              href="https://www.manutd.com/en/tickets-and-hospitality/membership"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E60012] hover:bg-[#C40010] text-white font-display text-base font-bold py-4 px-8 rounded-xl flex items-center gap-2 shadow-lg transition-all border border-white/20 uppercase cursor-pointer"
            >
              <span>Buy One United Membership</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* 3. DUAL-COLUMN BENEFITS MATRIX */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="badge-united text-xs font-display font-bold px-3.5 py-1 rounded-full uppercase">
              COMPREHENSIVE BENEFIT COMPARISON
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white uppercase">
              DUAL-LAYER <span className="text-[#E60012]">BENEFITS MATRIX</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/70 font-sans max-w-xl mx-auto">
              Compare international Manchester United privileges with official local MUSC Pune community perks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Global Man United Benefits */}
            <div className="bg-[#171717] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-display text-white/60 font-bold uppercase tracking-wider block">OFFICIAL MAN UTD</span>
                    <h3 className="font-display text-2xl font-bold text-white uppercase">Global Man United Benefits</h3>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-[#050505] border border-white/20 flex items-center justify-center text-white">
                    <Globe className="w-5 h-5" />
                  </div>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm font-sans text-white/90">
                  {globalOumBenefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs font-mono text-white/50">
                Purchased directly on manutd.com
              </div>
            </div>

            {/* Right Column: Pune's Red Army Membership */}
            <div className="bg-gradient-to-br from-[#1F1415] via-[#171717] to-[#120B0C] border-2 border-[#E60012]/70 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div>
                    <span className="text-[10px] font-display text-[#E60012] font-bold uppercase tracking-wider block">OFFICIAL MUSC PUNE</span>
                    <h3 className="font-display text-2xl font-bold text-white uppercase">Pune&apos;s Red Army Membership</h3>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-[#E60012] text-white flex items-center justify-center shadow-lg">
                    <Star className="w-5 h-5 fill-white" />
                  </div>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm font-sans text-white/90">
                  {localMuscPuneBenefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-[#E60012] fill-[#E60012] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-xs font-mono text-[#E60012] font-bold uppercase">
                  Included with Pune&apos;s Red Army Membership
                </span>
                <a
                  href={whatsappNumberUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-sans text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Community</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. SINGLE LOCAL TIER: "PUNE'S RED ARMY MEMBERSHIP" */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="badge-pune text-xs font-display font-bold px-3.5 py-1 rounded-full uppercase">
              OFFICIAL LOCAL MEMBERSHIP
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white uppercase">
              02. PUNE&apos;S RED ARMY <span className="text-[#E60012]">MEMBERSHIP</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/70 font-sans max-w-xl mx-auto">
              Select your official T-Shirt size and click join to proceed to checkout with the active admin rate.
            </p>
          </div>

          {/* Card Component (.plan-card) */}
          <div className="plan-card max-w-5xl mx-auto glass-card rounded-[2.5rem] p-6 sm:p-10 bg-gradient-to-br from-[#1A1A1A] via-[#0E0E0E] to-[#141414] border-2 border-[#E60012]/70 shadow-[0_20px_60px_rgba(230,0,18,0.35)] space-y-8 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Official Membership Card Poster Image */}
              <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[460px] rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-black group flex items-center justify-center p-2">
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
                      <h3 className="font-display text-3xl font-bold text-white uppercase leading-none mt-1">
                        Pune&apos;s Red Army Membership
                      </h3>
                    </div>
                  </div>

                  <div className="bg-[#050505] p-3 px-5 rounded-2xl border border-white/15 w-full sm:w-auto flex sm:block items-center justify-between">
                    <span className="text-[10px] font-display text-white/50 uppercase block">MEMBERSHIP STATUS</span>
                    <span className="font-display text-lg font-bold text-emerald-400">REGISTRATIONS OPEN</span>
                  </div>
                </div>

                {/* Included Features List */}
                <div className="space-y-3">
                  <div className="text-xs font-display text-white/90 font-bold uppercase flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E60012]" />
                    <span>INCLUDED LOCAL MEMBERSHIP FEATURES:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {localTierFeatures.map((f, idx) => {
                      const IconComp = f.icon;
                      return (
                        <div key={idx} className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#050505] border border-white/10 text-xs font-sans text-white/90 shadow-md">
                          <div className="w-9 h-9 rounded-xl bg-[#E60012]/15 border border-[#E60012]/40 text-[#E60012] flex items-center justify-center shrink-0">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm">{f.title}</div>
                            <div className="text-white/60 text-xs mt-0.5">{f.detail}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Interactive T-Shirt Size Selector Component */}
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <label htmlFor="pune-tshirt-size" className="block text-xs font-display text-white/90 font-bold uppercase">
                      Select Official T-Shirt Size: *
                    </label>
                    {sizeError && (
                      <span className="text-xs font-display text-[#E60012] font-bold flex items-center gap-1 animate-pulse">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Size Selection Required</span>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        id={`size-btn-${sz}`}
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

                {/* Cart Add Action Button (onJoinClicked) */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleJoinClicked}
                    className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-2xl font-bold py-4 px-8 rounded-2xl shadow-[0_10px_35px_rgba(230,0,18,0.45)] flex items-center justify-center gap-3 transition-all hover:scale-[1.02] border border-white/20 uppercase cursor-pointer"
                  >
                    <ShoppingBag className="w-6 h-6 shrink-0 text-white" />
                    <span>JOIN PUNE&apos;S RED ARMY</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
