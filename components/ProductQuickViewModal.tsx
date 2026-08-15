'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ShoppingBag, Check, Shield, Truck } from 'lucide-react';
import { Product } from '@/lib/types';

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

  if (!isOpen || !product) return null;

  const currentSize = selectedSize || product.availableSizes[0] || 'M';

  const handleAdd = () => {
    onAddToCart(product, currentSize, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121212] border border-neutral-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-white relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="bg-neutral-950 p-6 flex items-center justify-center relative min-h-[300px]">
            <div className="w-full h-full min-h-[260px] relative rounded-xl overflow-hidden border border-neutral-900">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#C8102E] text-white text-[10px] font-bold px-2.5 py-1 rounded tracking-widest uppercase">
                {product.badge}
              </span>
            )}
          </div>

          {/* Product Details Form */}
          <div className="p-6 flex flex-col justify-between space-y-5">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#C8102E] uppercase">
                OFFICIAL STORE • {product.category}
              </div>
              <h3 className="font-display text-xl font-bold mt-1 text-white leading-snug">
                {product.name}
              </h3>
              <div className="flex items-center gap-3 mt-2">
                <span className="font-display text-2xl font-bold text-[#C8102E]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-neutral-500 line-through font-mono">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Sizing Selector */}
            {product.availableSizes.length > 0 && (
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-2">
                  SELECT SIZE
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold border transition-all ${
                        currentSize === size
                          ? 'bg-[#C8102E] text-white border-[#C8102E] shadow-md'
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
            <div className="space-y-1.5 text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>Free Pick Up at Matchday Screenings in Pune</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Authentic Supporters Club Merchandise</span>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAdd}
              disabled={added}
              className={`w-full font-display text-sm tracking-wider font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all ${
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
                  <span>ADD TO CART</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
