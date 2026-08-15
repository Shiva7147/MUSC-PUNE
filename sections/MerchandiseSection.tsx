'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Eye, Check, Tag } from 'lucide-react';
import { Product } from '@/lib/types';

interface MerchandiseSectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
}

export const MerchandiseSection: React.FC<MerchandiseSectionProps> = ({
  products,
  onQuickView,
  onAddToCart,
}) => {
  const [includeStickerPack, setIncludeStickerPack] = useState(true);

  return (
    <section id="merchandise" className="py-24 bg-[#070707] relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#C8102E] font-bold tracking-widest uppercase">
              <Tag className="w-4 h-4" />
              <span>TERRACE STREETWEAR STOREFRONT</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mt-1 uppercase">
              DROP 01: <span className="text-[#C8102E]">PUNE REDS STREETWEAR</span>
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl mt-2 font-sans">
              Heavyweight 300 GSM combed cotton tees, woven jacquard scarves, and matchday jackets engineered for Pune Reds.
            </p>
          </div>

          {/* Sticker Pack Add-on Selector */}
          <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center gap-3">
            <input
              type="checkbox"
              id="sticker-pack"
              checked={includeStickerPack}
              onChange={(e) => setIncludeStickerPack(e.target.checked)}
              className="w-4 h-4 accent-[#C8102E] rounded cursor-pointer"
            />
            <label htmlFor="sticker-pack" className="text-xs font-mono text-neutral-300 cursor-pointer">
              Add <span className="text-amber-300 font-bold">Pune Reds Sticker Pack</span> (+₹99) to cart
            </label>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-neutral-900 border border-neutral-800 hover:border-[#C8102E]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between shadow-xl relative"
            >
              {/* Product Image Container */}
              <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60" />

                {/* Sewn Cloth Badge */}
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#C8102E] text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded uppercase tracking-widest shadow-md">
                    {product.badge}
                  </span>
                )}

                {/* Sewn Fabric Label Tag */}
                <span className="absolute top-3 right-3 bg-neutral-950/90 border border-neutral-800 text-neutral-300 text-[9px] font-mono px-2 py-0.5 rounded font-bold">
                  300 GSM HEAVYWEIGHT
                </span>

                {/* Quick View Hover Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    className="bg-white text-black hover:bg-neutral-200 font-display text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105"
                  >
                    <Eye className="w-4 h-4" />
                    <span>QUICK VIEW & SIZING</span>
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                    {product.category}
                  </div>
                  <h3
                    onClick={() => onQuickView(product)}
                    className="font-display text-xl font-bold text-white mt-1 group-hover:text-[#C8102E] transition-colors cursor-pointer leading-tight"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed font-sans">
                    {product.description}
                  </p>
                </div>

                {/* Sizes & Price */}
                <div>
                  <div className="flex items-center gap-1.5 mb-4">
                    <span className="text-[10px] font-mono text-neutral-500">SIZES:</span>
                    {product.availableSizes.map((sz) => (
                      <span
                        key={sz}
                        className="px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 font-mono text-[10px] font-bold border border-neutral-800"
                      >
                        {sz}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <div>
                      <span className="font-display text-2xl font-bold text-[#C8102E]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-neutral-500 line-through font-mono ml-2">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onAddToCart(product, product.availableSizes[0] || 'M', 1)}
                      className="bg-[#C8102E] hover:bg-[#870019] text-white font-display text-xs tracking-wider font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>ADD TO CART</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
