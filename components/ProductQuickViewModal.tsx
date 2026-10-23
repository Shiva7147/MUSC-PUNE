'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ShoppingBag, Check, Shield, Truck, Zap } from 'lucide-react';
import { Product } from '@/lib/types';
import { UniversalCheckoutModal } from './UniversalCheckoutModal';

interface ProductQuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isDirectCheckoutOpen, setIsDirectCheckoutOpen] = useState(false);

  if (!isOpen || !product) return null;

  const currentSize = selectedSize || product.availableSizes[0] || 'M';
  const isOutOfStock = !product.inStock || (product.stockCount !== undefined && product.stockCount <= 0);

  const handleAdd = () => {
    if (isOutOfStock) return;
    onAddToCart(product, currentSize, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    setIsDirectCheckoutOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
        <div className="bg-[#121212] border border-neutral-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-white relative my-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white/90 hover:text-white z-10 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close Quick View"
          >
            <X className="w-5 h-5 text-[#E60012]" />
          </button>

          <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2">
            {/* Product Image */}
            <div className="bg-neutral-950 p-6 flex items-center justify-center relative min-h-[280px]">
              <div className="w-full h-full min-h-[240px] relative rounded-xl overflow-hidden border border-neutral-900">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#E60012] text-white text-xs font-bold px-2.5 py-1 rounded tracking-widest uppercase shadow">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Product Details Form */}
            <div className="p-6 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono tracking-widest text-[#E60012] uppercase font-bold">
                    OFFICIAL STORE • {product.category}
                  </div>
                  {isOutOfStock ? (
                    <span className="text-[10px] font-display font-bold uppercase bg-red-950/80 text-red-400 border border-red-500/40 px-2.5 py-0.5 rounded-full">
                      SOLD OUT
                    </span>
                  ) : product.stockCount !== undefined && product.stockCount <= 10 ? (
                    <span className="text-[10px] font-display font-bold uppercase bg-amber-950/80 text-amber-400 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
                      ONLY {product.stockCount} LEFT
                    </span>
                  ) : (
                    <span className="text-[10px] font-display font-bold uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                      IN STOCK
                    </span>
                  )}
                </div>
                <h3 className="font-display text-xl font-bold mt-1 text-white leading-snug">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-display text-2xl font-bold text-[#E60012]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-neutral-500 line-through font-mono">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Sizing Selector */}
              {product.availableSizes.length > 0 && (
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-2 font-bold">
                    SELECT SIZE:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-2 rounded-xl font-mono text-xs font-bold border transition-all min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer ${
                          currentSize === size
                            ? 'bg-[#E60012] text-white border-[#E60012] shadow-md'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions / Highlights */}
              <div className="space-y-1.5 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#E60012]" />
                  <span>Free Pick Up at Matchday Screenings in Pune</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Authentic Supporters Club Merchandise</span>
                </div>
              </div>

              {/* Dual Action Buttons: Add to Cart and Buy Now */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={handleAdd}
                  disabled={added || isOutOfStock}
                  className={`w-full font-display text-xs tracking-wider font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 border border-white/20 transition-all min-h-[44px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#171717] hover:bg-[#202020] text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>ADDED!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO CART</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xs tracking-wider font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(230,0,18,0.4)] transition-all min-h-[44px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed uppercase"
                >
                  <Zap className="w-4 h-4" />
                  <span>BUY NOW</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Universal Direct Checkout Modal */}
      {isDirectCheckoutOpen && (
        <UniversalCheckoutModal
          isOpen={isDirectCheckoutOpen}
          onClose={() => setIsDirectCheckoutOpen(false)}
          mode="MERCHANDISE"
          cartItems={[
            {
              product,
              size: currentSize,
              quantity: 1,
            },
          ]}
          onSuccess={() => {
            onClose();
          }}
        />
      )}
    </>
  );
};
