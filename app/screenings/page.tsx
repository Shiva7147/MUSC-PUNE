'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScreeningsSection } from '@/sections/ScreeningsSection';
import { ScreeningTicketModal } from '@/components/ScreeningTicketModal';
import { CartDrawer } from '@/components/CartDrawer';
import { Screening, CartItem } from '@/lib/types';
import { getScreeningsStore, subscribeStore } from '@/lib/ticketStore';

export default function ScreeningsPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(null);

  const refreshScreenings = () => {
    setScreenings(getScreeningsStore());
  };

  useEffect(() => {
    refreshScreenings();
    const unsubscribe = subscribeStore(refreshScreenings);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setCartOpen(true)}
        onOpenScreeningModal={() => setSelectedScreening(screenings[0] || null)}
      />

      <div className="pt-16">
        <ScreeningsSection
          screenings={screenings}
          onSelectScreening={(sc) => setSelectedScreening(sc)}
        />
      </div>

      <Footer />

      {selectedScreening && (
        <ScreeningTicketModal
          isOpen={true}
          screening={selectedScreening}
          onClose={() => setSelectedScreening(null)}
        />
      )}

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={() => {}}
        onRemoveItem={() => {}}
      />
    </main>
  );
}
