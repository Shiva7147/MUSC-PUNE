'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Ticket, ArrowRight, ShoppingBag, Music, Plane, ShieldCheck, Camera, Bell } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroMarquee } from '@/components/HeroMarquee';
import { HeroSection } from '@/sections/HeroSection';
import { ScreeningTicketModal } from '@/components/ScreeningTicketModal';
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal';
import { CartDrawer } from '@/components/CartDrawer';
import { EnquiryModal } from '@/components/EnquiryModal';
import {
  upcomingScreenings,
  merchandiseProducts,
  announcements,
  galleryImages,
  oldTraffordTours,
} from '@/lib/data';
import { Screening, Product, CartItem } from '@/lib/types';

export default function Home() {
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [enquiryOpen, setEnquiryOpen] = useState<boolean>(false);

  const featuredScreening = upcomingScreenings.find((s) => s.featured) || upcomingScreenings[0];
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
    <main className="min-h-screen bg-[#161513] text-[#E7E0CF]">
      {/* Floating Glass Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* 1. HERO SECTION (Clear real background photo without dark tint) */}
      <HeroSection
        featuredScreening={featuredScreening}
        onOpenScreeningModal={() => setSelectedScreening(featuredScreening)}
      />

      {/* 2. HERO SCROLLER MARQUEE */}
      <HeroMarquee />

      {/* 3. SECTION 2: ABOUT THE CLUB (Concise Editorial Human Intro) */}
      <section className="py-20 bg-[#161513] border-t border-[#683F39]/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="badge-pune text-xs font-mono px-3 py-1 rounded font-bold uppercase">
            ABOUT MUSC PUNE
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#E7E0CF] uppercase leading-tight">
            FOOTBALL BROUGHT US TO <span className="text-[#C8102E]">MANCHESTER UNITED.</span>
            <br />
            PUNE MADE US A COMMUNITY.
          </h2>
          <p className="text-base text-[#E7E0CF]/80 font-sans max-w-2xl mx-auto leading-relaxed">
            Founded in 2021, MUSC Pune brings together Red Devils from across the city for matchday screenings, terrace chant sessions, and group pilgrimages to Old Trafford.
          </p>

          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-mono font-bold text-[#C8102E] hover:text-[#E7E0CF] transition-colors"
            >
              <span>DISCOVER OUR STORY</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SECTION 3: MATCHDAY SCREENINGS (Major Action Area) */}
      <section className="py-20 bg-[#1C1B18] border-t border-[#683F39]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="badge-united text-xs font-mono font-bold px-3 py-1 rounded">
                MATCHDAY SCREENING PASS
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#E7E0CF] mt-2 uppercase">
                NEXT <span className="text-[#C8102E]">MATCHDAY PASS</span>
              </h2>
            </div>

            <Link
              href="/screenings"
              className="inline-flex items-center gap-2 text-sm font-mono font-bold text-[#C8102E] hover:text-[#E7E0CF] transition-colors"
            >
              <span>EXPLORE ALL SCREENINGS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Ticket Stub Pass Card */}
          <div className="glass-card rounded-3xl overflow-hidden shadow-2xl relative ticket-notch-left ticket-notch-right border-2 border-[#C8102E]/60">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[380px]">
                <Image
                  src="https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865411/WhatsApp_Image_2026-08-16_at_11.53.51_AM_ddhmkc.jpg"
                  alt={featuredScreening.matchTitle}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161513] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#161513]" />
                <div className="absolute top-6 left-6">
                  <span className="bg-[#C8102E] text-white text-xs font-mono font-bold px-3 py-1.5 rounded uppercase shadow">
                    FEATURED STUB
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-[#1C1B18] to-[#161513]">
                <div>
                  <div className="text-xs font-mono text-[#E7E0CF]/60 uppercase">{featuredScreening.competition}</div>
                  <h3 className="font-display text-3xl font-bold text-[#E7E0CF] mt-1">{featuredScreening.matchTitle}</h3>
                  <div className="mt-3 text-xs font-mono text-[#E7E0CF]/80 space-y-1">
                    <div>📅 {featuredScreening.date} • {featuredScreening.time}</div>
                    <div>📍 {featuredScreening.venueName}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#683F39]/30 flex items-center justify-between">
                  <div className="font-display text-2xl font-bold text-[#C8102E]">₹{featuredScreening.price}</div>
                  <button
                    onClick={() => setSelectedScreening(featuredScreening)}
                    className="bg-[#C8102E] hover:bg-[#A00C24] text-white font-display text-xs tracking-wider font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg glow-united transition-all"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>BOOK TICKET STUB</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION 4: OLD TRAFFORD GROUP TRIP */}
      <section className="py-20 bg-[#161513] border-t border-[#683F39]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="badge-gold text-xs font-mono font-bold px-3 py-1 rounded">
                THEATRE OF DREAMS PILGRIMAGE
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#E7E0CF] mt-2 uppercase">
                TRIP TO <span className="text-[#C8102E]">OLD TRAFFORD</span>
              </h2>
            </div>

            <Link
              href="/tours"
              className="inline-flex items-center gap-2 text-sm font-mono font-bold text-[#C8102E] hover:text-[#E7E0CF] transition-colors"
            >
              <span>VIEW TRIP DETAILS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="glass-card rounded-3xl overflow-hidden shadow-2xl relative border border-[#683F39]/40">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[380px]">
                <Image
                  src={featuredTour.image}
                  alt="Old Trafford Group Trip"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="badge-gold text-xs font-mono px-3 py-1 rounded font-bold">
                    ✈️ PNQ ➔ MANCHESTER (MAN)
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-gradient-to-br from-[#1C1B18] to-[#161513]">
                <div>
                  <div className="text-xs font-mono text-[#E7E0CF] font-bold">{featuredTour.duration}</div>
                  <h3 className="font-display text-2xl font-bold text-[#E7E0CF] mt-1">{featuredTour.title}</h3>
                  <p className="text-xs text-[#E7E0CF]/80 mt-2 font-sans line-clamp-3">
                    {featuredTour.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#683F39]/30 space-y-3">
                  <button
                    onClick={() => setEnquiryOpen(true)}
                    className="w-full bg-[#C8102E] hover:bg-[#A00C24] text-white font-display text-sm tracking-wider font-bold py-3.5 px-6 rounded-xl shadow-xl glow-united flex items-center justify-center gap-2 transition-all"
                  >
                    <Plane className="w-4 h-4" />
                    <span>ENQUIRE ABOUT THE NEXT TRIP</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION 5: JOIN THE REDS (Compact Membership Teaser) */}
      <section className="py-16 bg-[#1C1B18] border-t border-[#683F39]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 glass-card rounded-3xl p-8 border border-[#683F39]/40">
          <div className="space-y-2">
            <span className="badge-united text-xs font-mono font-bold px-3 py-1 rounded">
              MEMBERSHIPS OPEN NOW
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#E7E0CF] uppercase">
              JOIN <span className="text-[#C8102E]">THE REDS</span>
            </h2>
            <p className="text-xs font-mono text-[#E7E0CF]/70 max-w-lg">
              Official Manchester United & MUSC Pune local supporters club membership passes.
            </p>
          </div>

          <Link
            href="/membership"
            className="bg-[#C8102E] hover:bg-[#A00C24] text-white font-display text-sm font-bold py-3.5 px-8 rounded-xl shadow-lg glow-united flex items-center gap-2 shrink-0 transition-all hover:scale-105"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>EXPLORE MEMBERSHIP</span>
          </Link>
        </div>
      </section>

      {/* 7. SECTION 6: SHOP THE REDS TEASER (Corrected Product Names) */}
      <section className="py-20 bg-[#161513] border-t border-[#683F39]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="badge-pune text-xs font-mono font-bold px-3 py-1 rounded">
                SHOP THE REDS
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#E7E0CF] mt-2 uppercase">
                FEATURED <span className="text-[#C8102E]">MERCHANDISE</span>
              </h2>
            </div>

            <Link
              href="/merchandise"
              className="inline-flex items-center gap-2 text-sm font-mono font-bold text-[#C8102E] hover:text-[#E7E0CF] transition-colors"
            >
              <span>VIEW MERCHANDISE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {merchandiseProducts.map((prod) => (
              <div key={prod.id} className="glass-card rounded-3xl p-6 flex gap-6 items-center shadow-xl">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-black shrink-0 border border-[#683F39]/30">
                  <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                </div>
                <div className="space-y-2 flex-1">
                  <h4 className="font-display text-xl font-bold text-[#E7E0CF]">{prod.name}</h4>
                  <div className="font-display text-lg font-bold text-[#C8102E]">₹{prod.price}</div>
                  <button
                    onClick={() => handleAddToCart(prod, 'ONE SIZE', 1)}
                    className="bg-[#C8102E] hover:bg-[#A00C24] text-white text-xs font-display font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all"
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

      {/* 8. SECTION 7: ANNOUNCEMENTS PREVIEW */}
      <section className="py-16 bg-[#1C1B18] border-t border-[#683F39]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="badge-pune text-xs font-mono font-bold px-3 py-1 rounded">
              WHAT&apos;S HAPPENING
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#E7E0CF] uppercase">
              LATEST <span className="text-[#C8102E]">DISPATCHES</span>
            </h2>
            <p className="text-xs font-mono text-[#E7E0CF]/70 max-w-lg">
              Official notices regarding screenings, Old Trafford trips, and club news.
            </p>
          </div>

          <Link
            href="/announcements"
            className="glass-panel border border-[#683F39] text-[#E7E0CF] hover:border-[#C8102E] font-display text-sm font-bold py-3.5 px-6 rounded-xl flex items-center gap-2 transition-all shrink-0"
          >
            <Bell className="w-4 h-4 text-[#C8102E]" />
            <span>VIEW ALL ANNOUNCEMENTS</span>
          </Link>
        </div>
      </section>

      {/* 9. SECTION 8: GALLERY PREVIEW */}
      <section className="py-16 bg-[#161513] border-t border-[#683F39]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="badge-gold text-xs font-mono font-bold px-3 py-1 rounded">
              INSIDE PUNE REDS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#E7E0CF] uppercase">
              DOCUMENTARY <span className="text-[#C8102E]">ARCHIVE</span>
            </h2>
            <p className="text-xs font-mono text-[#E7E0CF]/70 max-w-lg">
              Raw documentary photography across Pune screening nights and Old Trafford pilgrimages.
            </p>
          </div>

          <Link
            href="/gallery"
            className="glass-panel border border-[#683F39] text-[#E7E0CF] hover:border-[#C8102E] font-display text-sm font-bold py-3.5 px-6 rounded-xl flex items-center gap-2 transition-all shrink-0"
          >
            <Camera className="w-4 h-4 text-[#C8102E]" />
            <span>OPEN GALLERY ARCHIVE</span>
          </Link>
        </div>
      </section>

      {/* Campaign Film Footer */}
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
