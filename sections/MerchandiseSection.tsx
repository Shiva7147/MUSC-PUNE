'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Eye, ShieldCheck, Tag } from 'lucide-react';
import { Product } from '@/lib/types';
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal';

interface MerchandiseSectionProps {
  products: Product[];
  onAddToCart: (product: Product, size: string, quantity: number) => void;
}

export const MerchandiseSection: React.FC<MerchandiseSectionProps> = ({
  products,
  onAddToCart,
}) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <section id="merchandise" className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-display text-[#E60012] font-bold tracking-wider uppercase">
              <Tag className="w-4 h-4" />
              <span>PUNE REDS OFFICIAL STORE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mt-1 uppercase">
              OFFICIAL <span className="text-[#E60012]">MERCHANDISE</span>
            </h2>
            <p className="text-sm text-[#F5F5F5]/70 max-w-xl mt-2 font-sans">
              Authentic matchday scarves, mugs, and crest apparel designed for Pune supporters. Pick up at screenings or receive home delivery.
            </p>
          </div>

          <div className="badge-united text-xs font-display px-3.5 py-1.5 rounded-lg font-bold">
            🛍️ FREE SCREENING PICKUP
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-[#E60012] shadow-2xl flex flex-col justify-between group bg-[#171717]"
            >
              <div>
                {/* Product Image Box */}
                <div className="relative aspect-square w-full bg-[#050505] p-6 overflow-hidden border-b border-white/10 flex items-center justify-center">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    quality={95}
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  {prod.badge && (
                    <span className="absolute top-4 left-4 bg-[#E60012] text-white text-[10px] font-display font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow">
                      {prod.badge}
                    </span>
                  )}
                </div>

                {/* Product Content */}
                <div className="p-6 space-y-3">
                  <div className="text-[10px] font-display text-[#FFC400] font-bold uppercase tracking-wider">
                    {prod.category}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#E60012] transition-colors leading-tight">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#F5F5F5]/80 font-sans line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              {/* Price & Cart Actions */}
              <div className="p-6 pt-0 space-y-4">
                <div className="flex items-baseline gap-2 pt-2 border-t border-white/10">
                  <span className="font-display text-2xl font-bold text-[#E60012]">₹{prod.price}</span>
                  {prod.originalPrice && (
                    <span className="text-xs text-white/60 font-sans line-through font-semibold">
                      ₹{prod.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onAddToCart(prod, prod.availableSizes[0] || 'ONE SIZE', 1)}
                    className="flex-1 bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xs tracking-wider font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(230,0,18,0.25)] transition-all hover:scale-[1.02]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART</span>
                  </button>

                  <button
                    onClick={() => setQuickViewProduct(prod)}
                    className="p-3.5 rounded-xl glass-panel border border-white/10 text-white hover:border-[#E60012] transition-all"
                    aria-label="Quick View Product"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {quickViewProduct && (
        <ProductQuickViewModal
          isOpen={true}
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
};
