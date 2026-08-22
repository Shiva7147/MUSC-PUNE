'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Plane, Camera, Bell } from 'lucide-react';
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
import {
  merchandiseProducts,
  oldTraffordTours,
} from '@/lib/data';
import { Screening, Product, CartItem } from '@/lib/types';
import { getScreeningsStore, subscribeStore } from '@/lib/ticketStore';

export default function Home() {
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [enquiryOpen, setEnquiryOpen] = useState<boolean>(false);

  const refreshScreeningsData = () => {
    setScreenings(getScreeningsStore());
  };

  useEffect(() => {
    refreshScreeningsData();
    const unsubscribe = subscribeStore(refreshScreeningsData);
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

  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      {/* 0. TOP EVENT TICKER SCROLLER */}
      <TopEventScroller upcomingScreening={featuredScreening} />

      {/* Floating Glass Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* 1. HERO SECTION WITH CLEAR OLD TRAFFORD BACKGROUND & IMPROVISED HEADLINE */}
      <HeroSection
        featuredScreening={featuredScreening}
        onOpenScreeningModal={() => setSelectedScreening(featuredScreening)}
      />

      {/* 2. SCROLLER 01 — HERO MARQUEE (1st of 2 Scrollers) */}
      <HeroMarquee variant="primary" />

      {/* 3. ABOUT THE CLUB */}
      <section className="py-20 sm:py-24 bg-[#050505] border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Visual Story Photo */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl group bg-[#171717]">
              <Image
                src="https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_1600/v1786865408/WhatsApp_Image_2026-08-16_at_11.53.51_AM_3_eivq1o.jpg"
                alt="MUSC Pune Supporters Group"
                fill
                quality={95}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-sans text-white font-semibold uppercase">
                📍 PUNE&apos;S RED ARMY • EST. 2011
              </div>
            </div>

            {/* Story Content */}
            <div className="lg:col-span-6 space-y-5">
              <span className="badge-pune text-xs font-display px-3 py-1 rounded font-bold uppercase tracking-wider">
                ABOUT MUSC PUNE
              </span>
              <h2 className="font-display text-5xl sm:text-7xl font-bold text-white uppercase tracking-tight leading-none">
                MORE THAN <span className="text-[#E60012]">90 MINUTES.</span>
              </h2>

              <p className="text-base sm:text-lg text-white/90 font-sans leading-relaxed font-normal">
                Manchester United is 90 minutes on the pitch. For us in Pune, it is everything around those 90 minutes too.
              </p>
              <p className="text-sm text-white/70 font-sans leading-relaxed">
                Founded in 2011, MUSC Pune connects 500+ supporters across Maharashtra for high-decibel screening matchdays at BIRA 91 Taproom, The Mills, terrace chant sessions, and group pilgrimages to Old Trafford.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-base font-display font-bold text-[#E60012] hover:text-white transition-colors uppercase tracking-wider"
                >
                  <span>READ FULL CLUB STORY</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SCROLLER 02 — PUNE × MANCHESTER (2nd of 2 Scrollers) */}
      <HeroMarquee variant="pune-manchester" />

      {/* 5. MATCHDAY SCREENINGS */}
      {featuredScreening && (
        <section className="py-20 sm:py-24 bg-[#171717] border-t border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="badge-united text-xs font-display font-bold px-3 py-1 rounded tracking-wider">
                  MATCHDAY TICKETING
                </span>
                <h2 className="font-display text-5xl sm:text-6xl font-bold text-white mt-2 uppercase tracking-tight">
                  NEXT <span className="text-[#E60012]">MATCHDAY TICKETS</span>
                </h2>
              </div>

              <Link
                href="/screenings"
                className="inline-flex items-center gap-2 text-base font-display font-bold text-[#E60012] hover:text-white transition-colors uppercase tracking-wider"
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
                  <div className="absolute top-6 left-6">
                    <span className="bg-[#E60012] text-white text-xs font-display font-bold px-3 py-1.5 rounded uppercase tracking-wider shadow">
                      FEATURED MATCHDAY
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-[#171717] to-[#050505]">
                  <div>
                    <div className="text-xs font-display font-bold text-[#E60012] uppercase tracking-wider">{featuredScreening.competition}</div>
                    <h3 className="font-display text-4xl sm:text-5xl font-bold text-white mt-1 tracking-tight uppercase">{featuredScreening.matchTitle}</h3>
                    <div className="mt-3 text-xs sm:text-sm font-sans text-white/80 space-y-1">
                      <div>📅 {featuredScreening.date} • {featuredScreening.time}</div>
                      <div>📍 {featuredScreening.venueName}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-display text-white/50 uppercase">STARTING FROM</div>
                      <div className="font-display text-4xl font-bold text-[#E60012]">₹{featuredScreening.price}</div>
                    </div>

                    <button
                      onClick={() => setSelectedScreening(featuredScreening)}
                      className="bg-[#E60012] hover:bg-[#C40010] text-white font-display text-base tracking-wider font-bold py-3.5 px-6 rounded-2xl flex items-center gap-2 shadow-[0_8px_30px_rgba(230,0,18,0.35)] transition-all hover:scale-[1.02] border border-white/20 uppercase"
                    >
                      <span>BOOK TICKETS</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. SPECTACULAR MEMBERSHIP SECTION */}
      <MembershipSection />

      {/* 7. TRIP TO OLD TRAFFORD */}
      <section className="py-20 sm:py-24 bg-[#050505] border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="badge-pune text-xs font-display font-bold px-3 py-1 rounded tracking-wider">
                THEATRE OF DREAMS PILGRIMAGE
              </span>
              <h2 className="font-display text-5xl sm:text-6xl font-bold text-white mt-2 uppercase tracking-tight">
                TRIP TO <span className="text-[#E60012]">OLD TRAFFORD</span>
              </h2>
            </div>

            <Link
              href="/tours"
              className="inline-flex items-center gap-2 text-base font-display font-bold text-[#E60012] hover:text-white transition-colors uppercase tracking-wider"
            >
              <span>VIEW TRIP DETAILS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-card rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 bg-[#171717]">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative min-h-[280px] lg:min-h-[380px]">
                <Image
                  src="https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_1600/v1786865422/WhatsApp_Image_2026-08-16_at_12.29.15_PM_kzh1u3.jpg"
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
                  <div className="text-xs font-display text-[#E60012] font-bold tracking-wider">{featuredTour.duration}</div>
                  <h3 className="font-display text-4xl font-bold text-white mt-1 tracking-tight uppercase">{featuredTour.title}</h3>
                  <p className="text-xs text-white/80 mt-2 font-sans line-clamp-3">
                    {featuredTour.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-3">
                  <button
                    onClick={() => setEnquiryOpen(true)}
                    className="w-full bg-[#171717] hover:bg-black border border-[#E60012] text-white font-display text-base tracking-wider font-bold py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] uppercase"
                  >
                    <Plane className="w-4 h-4 text-[#E60012]" />
                    <span>ENQUIRE ABOUT THE NEXT TRIP</span>
                  </button>
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
              <span className="badge-pune text-xs font-display font-bold px-3 py-1 rounded tracking-wider">
                OFFICIAL MERCHANDISE
              </span>
              <h2 className="font-display text-5xl sm:text-6xl font-bold text-white mt-2 uppercase tracking-tight">
                SHOP THE <span className="text-[#E60012]">SUPPORTER MERCH</span>
              </h2>
            </div>

            <Link
              href="/merchandise"
              className="inline-flex items-center gap-2 text-base font-display font-bold text-[#E60012] hover:text-white transition-colors uppercase tracking-wider"
            >
              <span>VIEW ALL MERCHANDISE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {merchandiseProducts.map((prod) => (
              <div key={prod.id} className="glass-card rounded-3xl p-6 flex gap-6 items-center shadow-xl bg-[#171717] border border-white/10">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-black shrink-0 border border-white/10">
                  <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                </div>
                <div className="space-y-2 flex-1">
                  <h4 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">{prod.name}</h4>
                  <div className="font-display text-3xl font-bold text-[#E60012]">₹{prod.price}</div>
                  <button
                    onClick={() => handleAddToCart(prod, 'ONE SIZE', 1)}
                    className="bg-[#E60012] hover:bg-[#C40010] text-white text-xs font-display font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all shadow-[0_4px_15px_rgba(230,0,18,0.25)] uppercase"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ADD TO CART</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. ANNOUNCEMENTS PREVIEW */}
      <section className="py-16 bg-[#171717] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="badge-pune text-xs font-display font-bold px-3 py-1 rounded tracking-wider">
              WHAT&apos;S HAPPENING
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase tracking-tight">
              LATEST <span className="text-[#E60012]">DISPATCHES</span>
            </h2>
            <p className="text-xs sm:text-sm font-sans text-white/70 max-w-lg">
              Official notices regarding screenings, Old Trafford trips, and club news.
            </p>
          </div>

          <Link
            href="/announcements"
            className="glass-panel border border-white/15 text-white hover:border-[#E60012] font-display text-base font-bold py-3.5 px-6 rounded-2xl flex items-center gap-2 transition-all shrink-0 uppercase tracking-wider"
          >
            <Bell className="w-4 h-4 text-[#E60012]" />
            <span>VIEW ALL ANNOUNCEMENTS</span>
          </Link>
        </div>
      </section>

      {/* 10. GALLERY PREVIEW */}
      <section className="py-16 bg-[#050505] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="badge-pune text-xs font-display font-bold px-3 py-1 rounded tracking-wider">
              INSIDE PUNE&apos;S RED ARMY
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase tracking-tight">
              DOCUMENTARY <span className="text-[#E60012]">ARCHIVE</span>
            </h2>
            <p className="text-xs sm:text-sm font-sans text-white/70 max-w-lg">
              Raw documentary photography across Pune screening nights and Old Trafford pilgrimages.
            </p>
          </div>

          <Link
            href="/gallery"
            className="glass-panel border border-white/15 text-white hover:border-[#E60012] font-display text-base font-bold py-3.5 px-6 rounded-2xl flex items-center gap-2 transition-all shrink-0 uppercase tracking-wider"
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
        defaultSubject="Old Trafford Group Trip Enquiry — Autumn 2026"
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
