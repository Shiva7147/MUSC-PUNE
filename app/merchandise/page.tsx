'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MerchandiseSection } from '@/sections/MerchandiseSection';
import { CartDrawer } from '@/components/CartDrawer';
import { merchandiseProducts } from '@/lib/data';
import { Product, CartItem } from '@/lib/types';

export default function MerchandisePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

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
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setCartOpen(true)}
      />

      <div className="pt-20">
        <MerchandiseSection
          products={merchandiseProducts}
          onAddToCart={handleAddToCart}
        />
      </div>

      <Footer />

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
