'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScreeningsSection } from '@/sections/ScreeningsSection';
import { ScreeningTicketModal } from '@/components/ScreeningTicketModal';
import { CartDrawer } from '@/components/CartDrawer';
import { upcomingScreenings } from '@/lib/data';
import { Screening, CartItem } from '@/lib/types';

export default function ScreeningsPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(null);

  return (
    <main className="min-h-screen bg-[#08080A] text-white">
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setCartOpen(true)}
        onOpenScreeningModal={() => setSelectedScreening(upcomingScreenings[0])}
      />

      <div className="pt-16">
        <ScreeningsSection
          screenings={upcomingScreenings}
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
