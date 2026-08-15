'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Ticket, ArrowRight, ShoppingBag, Music, Plane } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/sections/HeroSection';
import { AboutSection } from '@/sections/AboutSection';
import { AnnouncementsSection } from '@/sections/AnnouncementsSection';
import { GallerySection } from '@/sections/GallerySection';
import { ScreeningTicketModal } from '@/components/ScreeningTicketModal';
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal';
import { GalleryLightbox } from '@/components/GalleryLightbox';
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
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
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
    <main className="min-h-screen bg-[#08080A] text-white">
      {/* Top Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setCartOpen(true)}
        onOpenScreeningModal={() => setSelectedScreening(featuredScreening)}
      />

      {/* 1. Hero Section (Cleaned & De-cluttered with Crest Watermark & Red Atmosphere) */}
      <HeroSection
        featuredScreening={featuredScreening}
        onOpenScreeningModal={() => setSelectedScreening(featuredScreening)}
      />

      {/* 2. About MUSC Pune Section */}
      <AboutSection />

      {/* 3. Screenings Highlight Slide (Perforated Ticket Stub Card) */}
      <section className="py-20 bg-[#0A0A0E] border-t border-neutral-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="badge-united text-xs font-mono font-bold px-3 py-1 rounded">
                MATCHDAY SCREENING TICKET STUB
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2 uppercase">
                NEXT <span className="text-[#DA020E]">MATCHDAY PASS</span>
              </h2>
            </div>

            <Link
              href="/screenings"
              className="inline-flex items-center gap-2 text-sm font-mono font-bold text-[#DA020E] hover:text-white transition-colors"
            >
              <span>EXPLORE ALL SCREENINGS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Perforated Ticket Stub Card */}
          <div className="bg-neutral-900 border-2 border-[#DA020E]/60 rounded-3xl overflow-hidden shadow-2xl relative ticket-notch-left ticket-notch-right">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[400px]">
                <Image
                  src="/images/screening.jpg"
                  alt={featuredScreening.matchTitle}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-neutral-900" />
                <div className="absolute top-6 left-6">
                  <span className="bg-[#DA020E] text-white text-xs font-mono font-bold px-3 py-1.5 rounded uppercase shadow">
                    FEATURED STUB
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-neutral-900 to-black">
                <div>
                  <div className="text-xs font-mono text-neutral-400 uppercase">{featuredScreening.competition}</div>
                  <h3 className="font-display text-3xl font-bold text-white mt-1">{featuredScreening.matchTitle}</h3>
                  <div className="mt-3 text-xs font-mono text-neutral-300 space-y-1">
                    <div>📅 {featuredScreening.date} • {featuredScreening.time}</div>
                    <div>📍 {featuredScreening.venueName}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <div className="font-display text-2xl font-bold text-[#DA020E]">₹{featuredScreening.price}</div>
                  <button
                    onClick={() => setSelectedScreening(featuredScreening)}
                    className="bg-[#DA020E] hover:bg-[#99000A] text-white font-display text-xs tracking-wider font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg glow-united transition-all"
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

      {/* 4. Trip to Old Trafford Highlight Slide */}
      <section className="py-20 bg-[#08080A] border-t border-neutral-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="badge-pune text-xs font-mono font-bold px-3 py-1 rounded">
                THEATRE OF DREAMS PILGRIMAGE
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2 uppercase">
                TRIP TO <span className="text-[#DA020E]">OLD TRAFFORD</span>
              </h2>
            </div>

            <Link
              href="/tours"
              className="inline-flex items-center gap-2 text-sm font-mono font-bold text-[#DA020E] hover:text-white transition-colors"
            >
              <span>VIEW FULL TOUR DETAILS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Tour Passport Card */}
          <div className="bg-neutral-900 border-2 border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[380px]">
                <Image
                  src="/images/tour.jpg"
                  alt="Old Trafford Trip"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold px-3 py-1 rounded">
                    ✈️ PNQ ➔ MANCHESTER (MAN)
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-gradient-to-br from-neutral-900 to-black">
                <div>
                  <div className="text-xs font-mono text-amber-400 font-bold">{featuredTour.duration}</div>
                  <h3 className="font-display text-2xl font-bold text-white mt-1">{featuredTour.title}</h3>
                  <p className="text-xs text-neutral-300 mt-2 font-sans line-clamp-3">
                    {featuredTour.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800 space-y-3">
                  <button
                    onClick={() => setEnquiryOpen(true)}
                    className="w-full bg-[#DA020E] hover:bg-[#99000A] text-white font-display text-sm tracking-wider font-bold py-3.5 px-6 rounded-xl shadow-xl glow-united flex items-center justify-center gap-2 transition-all"
                  >
                    <Plane className="w-4 h-4" />
                    <span>ENQUIRE ABOUT OLD TRAFFORD TRIP</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Merchandise Preview Slide */}
      <section className="py-20 bg-[#0A0A0E] border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="badge-pune text-xs font-mono font-bold px-3 py-1 rounded">
                OFFICIAL STREETWEAR
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2 uppercase">
                FEATURED <span className="text-[#DA020E]">MERCH DROP</span>
              </h2>
            </div>

            <Link
              href="/merchandise"
              className="inline-flex items-center gap-2 text-sm font-mono font-bold text-[#DA020E] hover:text-white transition-colors"
            >
              <span>VISIT MERCH STORE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {merchandiseProducts.slice(0, 2).map((prod) => (
              <div key={prod.id} className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 flex gap-6 items-center shadow-xl">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-black shrink-0">
                  <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                </div>
                <div className="space-y-2 flex-1">
                  <h4 className="font-display text-xl font-bold text-white">{prod.name}</h4>
                  <div className="font-display text-lg font-bold text-[#DA020E]">₹{prod.price}</div>
                  <button
                    onClick={() => handleAddToCart(prod, 'M', 1)}
                    className="bg-[#DA020E] hover:bg-[#99000A] text-white text-xs font-display font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all"
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

      {/* 6. Announcements Section */}
      <AnnouncementsSection announcements={announcements} />

      {/* 7. Gallery Section */}
      <GallerySection
        galleryItems={galleryImages}
        onOpenLightbox={(index) => setLightboxIdx(index)}
      />

      {/* 8. Fan Chants Preview Slide */}
      <section className="py-20 bg-[#0A0A0E] border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="badge-united text-xs font-mono font-bold px-3 py-1 rounded">
              TERRACE NOISE VAULT
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase">
              LEARN THE <span className="text-[#DA020E]">PUNE REDS CHANTS</span>
            </h2>
            <p className="text-xs text-neutral-400 font-mono max-w-xl">
              Listen to native Web Audio crowd synthesizers and practice matchday chant lyrics.
            </p>
          </div>

          <Link
            href="/chants"
            className="bg-[#DA020E] hover:bg-[#99000A] text-white font-display text-base tracking-wider font-bold py-4 px-8 rounded-2xl shadow-xl glow-united flex items-center gap-2 transition-all hover:scale-105 shrink-0"
          >
            <Music className="w-5 h-5" />
            <span>OPEN CHANTS VAULT</span>
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

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <GalleryLightbox
          isOpen={true}
          items={galleryImages}
          currentIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNavigate={(newIdx) => setLightboxIdx(newIdx)}
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
