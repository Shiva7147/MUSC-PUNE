'use client';

import React from 'react';
import Image from 'next/image';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
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

  const baseTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const taxRate = 0.12; // 12% apparel GST
  const taxAmount = Math.round(baseTotal * taxRate);
  const finalTotal = baseTotal + taxAmount;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const itemsSummary = cartItems
      .map((item) => `${item.product.name} (Size: ${item.size}, Qty: ${item.quantity}) - ₹${item.product.price * item.quantity}`)
      .join('%0A');

    const whatsappMessage = `Hi MUSC Pune, I want to order the following official merchandise:%0A%0A${itemsSummary}%0A%0ATotal Payable (incl. GST): ₹${finalTotal}%0A%0APlease assist with payment & shipping!`;
    window.open(`https://wa.me/917276735140?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#171717] border-l border-white/10 text-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#E60012]" />
              <h3 className="font-display text-2xl font-bold tracking-tight uppercase">YOUR MERCH CART</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#050505] border border-white/10 text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-16 h-16 text-white/20 mx-auto" />
                <p className="font-display text-xl font-bold uppercase text-white/60">YOUR CART IS EMPTY</p>
                <p className="text-xs font-sans text-white/50">Explore official scarves, mugs, and kit releases!</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="bg-[#050505] border border-white/10 rounded-2xl p-4 flex gap-4 items-center relative group"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-display text-lg font-bold truncate text-white uppercase">{item.product.name}</h4>
                    <div className="text-xs font-sans text-white/60">Size: <strong className="text-white">{item.size}</strong></div>
                    <div className="font-display text-lg font-bold text-[#E60012]">₹{item.product.price}</div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex items-center bg-[#171717] rounded-lg border border-white/15">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                          className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-display text-sm font-bold px-2">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                          className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id, item.size)}
                        className="text-white/40 hover:text-[#E60012] transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#050505] space-y-4">
              <div className="space-y-1.5 text-xs font-sans">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{baseTotal}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>GST (12%)</span>
                  <span className="font-mono">₹{taxAmount}</span>
                </div>
                <div className="flex justify-between font-display text-xl font-bold text-white pt-2 border-t border-white/10">
                  <span>TOTAL</span>
                  <span className="text-[#E60012]">₹{finalTotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-base font-bold tracking-tight py-4 rounded-2xl shadow-[0_8px_30px_rgba(230,0,18,0.35)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] uppercase border border-white/20"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
