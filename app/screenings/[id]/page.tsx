'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScreeningTicketModal } from '@/components/ScreeningTicketModal';
import { CartDrawer } from '@/components/CartDrawer';
import { upcomingScreenings, merchandiseProducts } from '@/lib/data';
import { CartItem, Screening } from '@/lib/types';
import { Calendar, Clock, MapPin, Ticket, ArrowLeft, ShieldCheck, CheckCircle2, HelpCircle } from 'lucide-react';

export default function ScreeningDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const screening: Screening =
    upcomingScreenings.find((s) => s.id === id) || upcomingScreenings[0];

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)));
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col justify-between">
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setCartOpen(true)}
        onOpenScreeningModal={() => setBookingModalOpen(true)}
      />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Back Link */}
        <Link
          href="/#screenings"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[#C8102E] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ALL SCREENINGS</span>
        </Link>

        {/* Screening Detail Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Poster & Venue Map Brief */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-[#C8102E]/30 shadow-2xl">
              <Image
                src="/images/screening.jpg"
                alt={screening.matchTitle}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-[#C8102E] text-white text-xs font-mono font-bold px-3 py-1 rounded uppercase tracking-wider">
                  {screening.competition}
                </span>
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2">
                  {screening.matchTitle}
                </h1>
              </div>
            </div>

            {/* Event Description */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-2xl font-bold text-white uppercase">MATCHDAY EVENT DETAILS</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">{screening.description}</p>

              <div className="pt-4 border-t border-neutral-800 space-y-2">
                <h4 className="font-display text-base font-bold text-[#C8102E] uppercase">PASS INCLUSIONS</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-neutral-300">
                  {screening.inclusions.map((inc, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-3">
              <h3 className="font-display text-xl font-bold text-white uppercase flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#C8102E]" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </h3>
              <div className="space-y-3 text-xs font-mono text-neutral-400">
                <div>
                  <div className="text-white font-bold">Q: How do I redeem my pass at the venue?</div>
                  <p className="mt-0.5">A: Present your digital confirmation QR code at the entry gate of the venue.</p>
                </div>
                <div>
                  <div className="text-white font-bold">Q: Can I get physical tickets?</div>
                  <p className="mt-0.5">A: Digital passes are issued instantly. Physical wristbands will be assigned upon entry.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Ticket Purchasing Summary Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-900 border border-[#C8102E]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl sticky top-28">
              <div>
                <div className="text-xs font-mono text-neutral-400 uppercase">TICKET PRICING</div>
                <div className="font-display text-4xl font-bold text-[#C8102E] mt-1">
                  ₹{screening.price} <span className="text-xs text-neutral-400 font-sans font-normal">/ PASS</span>
                </div>
              </div>

              <div className="space-y-3 text-xs font-mono bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">DATE</span>
                  <span className="text-white font-bold">{screening.date}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">KICKOFF</span>
                  <span className="text-white font-bold">{screening.time}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-500">VENUE</span>
                  <span className="text-[#C8102E] font-bold">{screening.venueName}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-neutral-500">LOCATION</span>
                  <span className="text-neutral-300">{screening.venueArea}</span>
                </div>
              </div>

              {/* Booking Trigger CTA */}
              {/* TODO: CONNECT RAZORPAY PAYMENT FLOW */}
              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full bg-[#C8102E] hover:bg-[#870019] text-white font-display text-lg tracking-wider font-bold py-4 rounded-xl shadow-xl shadow-[#C8102E]/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Ticket className="w-5 h-5" />
                <span>BOOK SCREENING TICKET NOW</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant QR Generation • Verified Entry Pass</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ScreeningTicketModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        screening={screening}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
