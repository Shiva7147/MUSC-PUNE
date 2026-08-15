'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { ScreeningTicketModal } from '@/components/ScreeningTicketModal';
import { merchandiseProducts, upcomingScreenings } from '@/lib/data';
import { CartItem, Product } from '@/lib/types';
import { ShoppingBag, ArrowLeft, Check, Truck, ShieldCheck, Heart } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const product: Product =
    merchandiseProducts.find((p) => p.id === id) || merchandiseProducts[0];

  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);

  const handleAddToCart = () => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === selectedSize
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === selectedSize
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, size: selectedSize, quantity }];
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setCartOpen(true);
    }, 600);
  };

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
        {/* Back Button */}
        <Link
          href="/#merchandise"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[#C8102E] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO STOREFRONT</span>
        </Link>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Product Image */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-850 rounded-3xl p-8 relative min-h-[420px] flex items-center justify-center shadow-2xl">
            <div className="w-full h-full min-h-[380px] relative rounded-2xl overflow-hidden border border-neutral-900">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            {product.badge && (
              <span className="absolute top-6 left-6 bg-[#C8102E] text-white text-xs font-mono font-bold px-3 py-1 rounded uppercase tracking-widest">
                {product.badge}
              </span>
            )}
          </div>

          {/* Product Purchasing Form */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono text-[#C8102E] font-bold uppercase tracking-widest">
                OFFICIAL APPAREL • {product.category}
              </span>
              <h1 className="font-display text-4xl font-bold text-white mt-1 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mt-3">
                <span className="font-display text-4xl font-bold text-[#C8102E]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-500 line-through font-mono">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral-300 mt-4 leading-relaxed font-sans">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            {product.availableSizes.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <label className="block text-xs font-mono text-neutral-400">SELECT SIZE</label>
                <div className="flex flex-wrap gap-3">
                  {product.availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 rounded-xl font-mono text-xs font-bold border transition-all ${
                        selectedSize === sz
                          ? 'bg-[#C8102E] text-white border-[#C8102E] shadow-lg shadow-[#C8102E]/30'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Product Feature Highlights */}
            <div className="space-y-2 pt-4 border-t border-neutral-800 text-xs font-mono text-neutral-300">
              {product.details.map((dt, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                  <span>{dt}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-neutral-800 space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full font-display text-base tracking-wider font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl transition-all ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#C8102E] hover:bg-[#870019] text-white shadow-[#C8102E]/30 hover:scale-[1.01]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>ADDED TO CART!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>ADD TO CART & CHECKOUT</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-neutral-500">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Free Pick Up Available at Next Screening Venue in Pune</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <ScreeningTicketModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        screening={upcomingScreenings[0]}
      />
    </div>
  );
}
