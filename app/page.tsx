'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Plane, Camera, Tv, Users } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TopEventScroller } from '@/components/TopEventScroller';
import { HeroMarquee } from '@/components/HeroMarquee';
import { HeroSection } from '@/sections/HeroSection';
import { MembershipSection } from '@/sections/MembershipSection';
import { ScreeningTicketModal } from '@/components/ScreeningTicketModal';
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal';
import { CartDrawer } from '@/components/CartDrawer';
import { EnquiryModal } from '@/components/EnquiryModal';
import { oldTraffordTours } from '@/lib/data';
import { Screening, Product, CartItem } from '@/lib/types';
import { getScreeningsStore, getProductsStore, subscribeStore } from '@/lib/ticketStore';

export default function Home() {
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [enquiryOpen, setEnquiryOpen] = useState<boolean>(false);

  const refreshStoreData = () => {
    setScreenings(getScreeningsStore());
    setProducts(getProductsStore());
  };

  useEffect(() => {
    refreshStoreData();
    const unsubscribe = subscribeStore(refreshStoreData);
    return () => {
      unsubscribe();
    };
  }, []);

  const featuredScreening = screenings.find((s) => s.featured) || screenings[0];
  const featuredTour = oldTraffordTours[0];

  const handleAddToCart = (product: Product, size: string, quantity: number) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id && item.size === size);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, size, quantity }];
    });
    setCartOpen(true);
  };

  const aboutCards = [
    {
      title: 'Match Screenings',
      detail: 'Every United match — Premier League, FA Cup, Champions League — watched live together with high-decibel audio and fan chants.',
      icon: Tv,
      href: '/screenings',
      cta: 'EXPLORE SCREENINGS',
    },
    {
      title: 'Community Events',
      detail: 'In-person meetups, WhatsApp community, football matchdays, FPL competitions, and exclusive member events across Pune.',
      icon: Users,
      href: '/about',
      cta: 'JOIN COMMUNITY',
    },
    {
      title: 'Trip to Old Trafford',
      detail: 'Group match trips to the Theatre of Dreams with match tickets, museum and stadium tour, and accommodation included.',
      icon: Plane,
      href: '/tours',
      cta: 'BOOK THE TRIP',
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      {/* 0. TOP EVENT TICKER SCROLLER */}
      <TopEventScroller upcomingScreening={featuredScreening} />

      {/* Floating Glass Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* 1. HERO SECTION WITH HINDI SLOGAN & 3 MUSCB BUTTONS */}
      <HeroSection
        featuredScreening={featuredScreening}
        onOpenScreeningModal={() => setSelectedScreening(featuredScreening)}
      />

      {/* 2. SCROLLER 01 — HERO MARQUEE (GLORY GLORY MAN UNITED) */}
      <HeroMarquee variant="primary" />

      {/* 3. ABOUT MUSC PUNE (Flow: Title -> Short Intro Text -> Photo -> 3 Visual Feature Cards) */}
      <section id="about" className="py-16 sm:py-24 bg-[#050505] border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          {/* Title & Short Intro Text */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="badge-pune text-xs font-display font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              ABOUT MUSC PUNE
            </span>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white uppercase leading-none">
              PUNE&apos;S <span className="text-[#E60012]">MANCHESTER UNITED HOME</span>
            </h2>
            <p className="text-base sm:text-lg text-white/80 font-sans leading-relaxed max-w-2xl mx-auto pt-2">
              Manchester United Supporters Club Pune (MUSC Pune) is the official supporters club for Manchester United fans in Pune. We bring Reds together through match screenings, community events, and Old Trafford group trips.
            </p>
          </div>

          {/* Photo */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-[#171717] group">
            <Image
              src="https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_1600/v1786865408/WhatsApp_Image_2026-08-16_at_11.53.51_AM_3_eivq1o.jpg"
              alt="MUSC Pune Supporters Group"
              fill
              quality={95}
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2">
              <span className="bg-[#E60012] text-white text-xs font-display font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-md">
                📍 PUNE&apos;S RED ARMY • EST. 2011
              </span>
            </div>
          </div>

          {/* 3 Visual Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {aboutCards.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="bg-[#171717] hover:bg-[#1C1C1C] border border-white/10 hover:border-[#E60012]/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 group shadow-xl hover:-translate-y-1 block"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#E60012]/15 border border-[#E60012]/30 flex items-center justify-center text-[#E60012] group-hover:scale-110 transition-transform">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-[#E60012] transition-colors uppercase leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                      {item.detail}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-display font-bold text-[#E60012] group-hover:text-white transition-colors uppercase tracking-tight">
                    <span>{item.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SCROLLER 02 — PUNE'S RED ARMY - LOUD AND PROUD */}
      <HeroMarquee variant="pune-manchester" />

      {/* 5. SCREENING TICKETS */}
      {featuredScreening && (
        <section className="py-20 sm:py-24 bg-[#171717] border-t border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="badge-united text-xs font-display font-bold px-3 py-1 rounded">
                  SCREENING TICKETING
                </span>
                <h2 className="font-display text-5xl sm:text-6xl font-bold text-white mt-2 uppercase">
                  SCREENING <span className="text-[#E60012]">TICKETS</span>
                </h2>
              </div>

              <Link
                href="/screenings"
                className="inline-flex items-center gap-2 text-base font-display font-bold text-[#E60012] hover:text-white transition-colors uppercase tracking-tight"
              >
                <span>EXPLORE ALL SCREENINGS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Ticket Card */}
            <div className="glass-card rounded-3xl overflow-hidden shadow-2xl relative border border-white/15 hover:border-[#E60012] bg-[#050505]">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative min-h-[280px] lg:min-h-[380px]">
                  <Image
                    src="https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_1600/v1786865411/WhatsApp_Image_2026-08-16_at_11.53.51_AM_ddhmkc.jpg"
                    alt={featuredScreening.matchTitle}
                    fill
                    quality={95}
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#050505]" />
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <span className="bg-[#E60012] text-white text-xs font-display font-bold px-3 py-1.5 rounded uppercase shadow">
                      {featuredScreening.activePhaseName || 'PHASE 1 LIVE'}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-[#171717] to-[#050505]">
                  <div>
                    <div className="text-xs font-display font-bold text-[#E60012] uppercase">{featuredScreening.competition}</div>
                    <h3 className="font-display text-4xl sm:text-5xl font-bold text-white mt-1 uppercase">{featuredScreening.matchTitle}</h3>
                    <div className="mt-3 text-xs sm:text-sm font-sans text-white/80 space-y-1">
                      <div>📅 {featuredScreening.date} • {featuredScreening.time}</div>
                      <div>📍 {featuredScreening.venueName}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="text-xs font-display font-bold text-white/70 uppercase">
                      🔴 TICKETS & ENTRY PASSES AVAILABLE
                    </div>

                    <button
                      onClick={() => setSelectedScreening(featuredScreening)}
                      className="bg-[#E60012] hover:bg-[#C40010] text-white font-display text-base sm:text-lg font-bold tracking-tight py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(230,0,18,0.35)] transition-all hover:scale-[1.02] border border-white/20 uppercase cursor-pointer"
                    >
                      <span>GET SCREENING TICKETS</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. DYNAMIC MEMBERSHIP SECTION */}
      <MembershipSection />

      {/* 7. TRIP TO OLD TRAFFORD */}
      <section className="py-20 sm:py-24 bg-[#050505] border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="badge-pune text-xs font-display font-bold px-3 py-1 rounded">
                THEATRE OF DREAMS PILGRIMAGE
              </span>
              <h2 className="font-display text-5xl sm:text-6xl font-bold text-white mt-2 uppercase">
                TRIP TO <span className="text-[#E60012]">OLD TRAFFORD</span>
              </h2>
            </div>

            <Link
              href="/tours"
              className="inline-flex items-center gap-2 text-base font-display font-bold text-[#E60012] hover:text-white transition-colors uppercase tracking-tight"
            >
              <span>VIEW TRIP DETAILS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-card rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 bg-[#171717]">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative min-h-[280px] lg:min-h-[380px]">
                <Image
                  src="https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865406/WhatsApp_Image_2026-08-16_at_11.53.51_AM_13_arf4zr.jpg"
                  alt="Old Trafford Delegation Photo"
                  fill
                  quality={95}
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="badge-pune text-xs font-display px-3 py-1 rounded font-bold">
                    ✈️ PNQ ➔ MANCHESTER (MAN)
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-gradient-to-br from-[#171717] to-[#050505]">
                <div>
                  <div className="text-xs font-display text-[#E60012] font-bold">{featuredTour.duration}</div>
                  <h3 className="font-display text-4xl font-bold text-white mt-1 uppercase">{featuredTour.title}</h3>
                  <p className="text-xs text-white/80 mt-2 font-sans line-clamp-3">
                    {featuredTour.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-3">
                  <Link
                    href="/tours"
                    className="w-full bg-[#E60012] hover:bg-[#C40010] border border-white/20 text-white font-display text-base font-bold tracking-tight py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] uppercase cursor-pointer"
                  >
                    <Plane className="w-4 h-4 text-white" />
                    <span>BOOK THE TRIP</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SHOP THE REDS TEASER */}
      <section className="py-20 bg-[#050505] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="badge-pune text-xs font-display font-bold px-3 py-1 rounded">
                OFFICIAL MERCHANDISE
              </span>
              <h2 className="font-display text-5xl sm:text-6xl font-bold text-white mt-2 uppercase">
                SHOP THE <span className="text-[#E60012]">SUPPORTER MERCH</span>
              </h2>
            </div>

            <Link
              href="/merchandise"
              className="inline-flex items-center gap-2 text-base font-display font-bold text-[#E60012] hover:text-white transition-colors uppercase tracking-tight"
            >
              <span>VIEW ALL MERCHANDISE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((prod) => (
              <div key={prod.id} className="glass-card rounded-3xl p-6 flex gap-6 items-center shadow-xl bg-[#171717] border border-white/10">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-black shrink-0 border border-white/10">
                  <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                </div>
                <div className="space-y-3 flex-1">
                  <h4 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase">{prod.name}</h4>
                  <Link
                    href={`/merchandise`}
                    className="bg-[#E60012] hover:bg-[#C40010] text-white text-xs sm:text-sm font-display font-bold tracking-tight py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_15px_rgba(230,0,18,0.25)] uppercase w-full sm:w-auto cursor-pointer inline-flex"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>VIEW MERCHANDISE</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. GALLERY PREVIEW */}
      <section className="py-16 bg-[#050505] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="badge-pune text-xs font-display font-bold px-3 py-1 rounded">
              INSIDE PUNE&apos;S RED ARMY
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase">
              DOCUMENTARY <span className="text-[#E60012]">ARCHIVE</span>
            </h2>
            <p className="text-xs sm:text-sm font-sans text-white/70 max-w-lg">
              Raw documentary photography across Pune screening nights and Old Trafford pilgrimages.
            </p>
          </div>

          <Link
            href="/gallery"
            className="glass-panel border border-white/15 text-white hover:border-[#E60012] font-display text-base font-bold tracking-tight py-3.5 px-6 rounded-2xl flex items-center gap-2 transition-all shrink-0 uppercase"
          >
            <Camera className="w-4 h-4 text-[#E60012]" />
            <span>OPEN GALLERY ARCHIVE</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Ticket Modal */}
      {selectedScreening && (
        <ScreeningTicketModal
          isOpen={true}
          screening={selectedScreening}
          onClose={() => setSelectedScreening(null)}
        />
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickViewModal
          isOpen={true}
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultSubject="Trip to Old Trafford Enquiry — Autumn 2026"
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={(productId, size, delta) => {
          setCartItems((prev) =>
            prev
              .map((item) =>
                item.product.id === productId && item.size === size
                  ? { ...item, quantity: item.quantity + delta }
                  : item
              )
              .filter((item) => item.quantity > 0)
          );
        }}
        onRemoveItem={(productId, size) => {
          setCartItems((prev) => prev.filter((item) => !(item.product.id === productId && item.size === size)));
        }}
      />
    </main>
  );
}
