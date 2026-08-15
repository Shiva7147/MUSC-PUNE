'use client';

import React from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '@/lib/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    alert(
      '// TODO: CONNECT RAZORPAY / SUPABASE CHECKOUT API\n\nDemo Order Initiated for ' +
        totalItems +
        ' items (Total: ₹' +
        subtotal +
        '). Backend persistence pending.'
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0D0D0D] border-l border-neutral-800 text-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="px-6 py-5 bg-[#121212] border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#C8102E]/20 text-[#C8102E]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold tracking-wide">SUPPORTERS CART</h3>
                <p className="text-xs font-mono text-neutral-400">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 divide-y divide-neutral-900">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 py-16">
                <ShoppingBag className="w-16 h-16 stroke-[1.2] mb-4 text-neutral-700 animate-pulse" />
                <h4 className="font-display text-lg font-bold text-neutral-300">YOUR CART IS EMPTY</h4>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                  Pick up official MUSC Pune matchday tees, scarves, caps, and jackets from our storefront.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="pt-4 first:pt-0 flex gap-4">
                  {/* Image */}
                  <div className="w-20 h-20 rounded-lg bg-neutral-900 border border-neutral-800 relative overflow-hidden shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display text-sm font-semibold text-white leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.size)}
                          className="text-neutral-500 hover:text-[#C8102E] transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs font-mono text-neutral-400 mt-1">
                        Size: <span className="text-white font-bold">{item.size}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 bg-neutral-900 rounded-md border border-neutral-800 px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                          className="text-neutral-400 hover:text-white"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-mono font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                          className="text-neutral-400 hover:text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="font-display text-sm font-bold text-[#C8102E]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#121212] border-t border-neutral-800 space-y-4">
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Pune Local Delivery / Pickup</span>
                  <span className="text-emerald-400 font-bold">FREE AT SCREENINGS</span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between text-base font-display text-white">
                  <span>TOTAL</span>
                  <span className="text-[#C8102E] font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              {/* TODO: CONNECT RAZORPAY PAYMENT FLOW & BACKEND PERSISTENCE */}
              <button
                onClick={handleCheckout}
                className="w-full bg-[#C8102E] hover:bg-[#870019] text-white font-display text-base tracking-wider font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-[#C8102E]/30 transition-all hover:scale-[1.01]"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Frontend Demo Cart • Backend Integration Pending</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
