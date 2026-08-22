'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Ticket, Plane } from 'lucide-react';
import { CartItem } from '@/lib/types';

interface NavbarProps {
  cartItems?: CartItem[];
  onOpenCart?: () => void;
  onOpenScreeningModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems = [],
  onOpenCart = () => {},
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'SCREENINGS', href: '/screenings' },
    { name: 'MERCH', href: '/merchandise' },
    { name: 'MEMBERSHIP', href: '/membership' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'CHANTS', href: '/chants' },
    { name: 'ADMIN', href: '/admin' },
  ];

  return (
    <>
      <header
        className={`fixed top-9 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 py-2.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#050505]/95 via-[#050505]/75 to-transparent py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Official Red MU Logo Emblem Badge */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-10 h-10 rounded-2xl bg-[#E60012] border border-white/20 group-hover:scale-105 transition-transform shadow-lg flex items-center justify-center font-display text-xl font-bold text-white shrink-0">
              MU
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-lg sm:text-xl text-[#F5F5F5] group-hover:text-[#E60012] transition-colors leading-none tracking-tight">
                  MUSC PUNE
                </span>
                <span className="bg-[#171717] border border-white/20 text-[9px] font-sans px-1.5 py-0.5 rounded text-[#FFC400] uppercase font-bold tracking-wider">
                  पुणे
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-[#F5F5F5]/60 uppercase font-sans font-medium mt-0.5">
                OFFICIAL SUPPORTERS CLUB
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-display text-base font-bold tracking-wider hover:text-[#E60012] transition-colors uppercase relative py-1 ${
                  link.name === 'ADMIN' ? 'text-[#FFC400]' : 'text-[#F5F5F5]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Header Action Buttons (Matching Reference Screen) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-2xl bg-[#171717]/90 border border-white/15 text-[#F5F5F5] hover:text-white hover:border-[#E60012] transition-all group shrink-0"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform text-[#E60012]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#E60012] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Book Tickets CTA on Tablet & Desktop */}
            <Link
              href="/screenings"
              className="hidden sm:flex items-center gap-1.5 bg-[#E60012] hover:bg-[#C40010] text-white font-display text-sm tracking-wider font-bold px-4 py-2.5 rounded-2xl transition-all shadow-[0_4px_20px_rgba(230,0,18,0.35)] hover:scale-[1.03] active:scale-95 border border-white/20 shrink-0 whitespace-nowrap"
            >
              <Ticket className="w-4 h-4 shrink-0" />
              <span>BOOK TICKETS</span>
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-2.5 rounded-2xl bg-[#171717]/90 border border-white/15 text-[#F5F5F5] hover:text-white shrink-0"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex flex-col bg-[#050505]/98 backdrop-blur-2xl text-[#F5F5F5] animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E60012] border border-white/20 font-display text-xl font-bold text-white flex items-center justify-center shrink-0">
                MU
              </div>
              <div>
                <div className="font-display tracking-wider font-bold text-xl text-[#F5F5F5]">MUSC PUNE</div>
                <div className="text-[10px] font-sans text-white/60 uppercase">PUNE&apos;S RED ARMY</div>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-2xl bg-[#171717] border border-white/15 text-white/70 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-3xl font-bold tracking-wide text-[#F5F5F5] hover:text-[#E60012] transition-colors py-2 flex items-center justify-between border-b border-white/5"
                >
                  <span className={link.name === 'ADMIN' ? 'text-[#FFC400]' : ''}>{link.name}</span>
                  <span className="text-xs font-sans text-[#E60012]">
                    0{idx + 1}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex flex-col gap-3">
              <Link
                href="/screenings"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xl tracking-wider font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(230,0,18,0.35)] uppercase"
              >
                <Ticket className="w-5 h-5" />
                GET SCREENING TICKETS
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
