'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Ticket, ShieldCheck, Plane } from 'lucide-react';
import { CartItem } from '@/lib/types';

interface NavbarProps {
  cartItems?: CartItem[];
  onOpenCart?: () => void;
  onOpenScreeningModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems = [],
  onOpenCart = () => {},
  onOpenScreeningModal = () => {},
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
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
    { name: 'ABOUT', href: '/#about' },
    { name: 'SCREENINGS', href: '/screenings' },
    { name: 'MERCH', href: '/merchandise' },
    { name: 'MEMBERSHIP', href: '/membership' },
    { name: 'TOURS', href: '/tours' },
    { name: 'GALLERY', href: '/#gallery' },
    { name: 'TEAM', href: '/team' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel bg-[#08080A]/90 border-b border-[#DA020E]/40 py-3 shadow-2xl glow-red'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Badge */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#DA020E] flex items-center justify-center font-display text-xl font-bold text-white shadow-lg shadow-[#DA020E]/50 group-hover:scale-105 transition-transform border border-white/20">
              MU
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display tracking-wider font-bold text-lg sm:text-xl text-white group-hover:text-[#DA020E] transition-colors leading-none">
                  MUSC PUNE
                </span>
                <span className="badge-pune text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                  पुणे
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-mono mt-0.5">
                Official Supporters Club
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-semibold tracking-wider text-neutral-300 hover:text-[#DA020E] transition-colors uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#DA020E] hover:after:w-full after:transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Secondary CTA: JOIN THE REDS */}
            <Link
              href="/membership"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-[#DA020E]/40 text-xs font-mono text-white hover:border-[#DA020E] transition-all shadow"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#DA020E]" />
              <span className="font-bold">JOIN THE REDS</span>
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl glass-panel border border-neutral-800 text-neutral-200 hover:text-white hover:border-[#DA020E] transition-all group"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform text-[#DA020E]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#DA020E] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Primary CTA: GET SCREENING TICKETS */}
            <Link
              href="/screenings"
              className="hidden sm:flex items-center gap-2 bg-[#DA020E] hover:bg-[#8C0008] text-white font-display text-sm tracking-wider font-semibold px-4 py-2.5 rounded-xl transition-all glow-united hover:scale-[1.03] active:scale-95 border border-white/20"
            >
              <Ticket className="w-4 h-4" />
              <span>GET SCREENING TICKETS</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-2.5 rounded-xl glass-panel border border-neutral-800 text-neutral-200 hover:text-white"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex flex-col bg-[#08080A]/98 backdrop-blur-2xl text-white animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#DA020E] flex items-center justify-center font-display text-lg font-bold">
                MU
              </div>
              <div>
                <div className="font-display tracking-wider font-bold text-lg">MUSC PUNE</div>
                <div className="text-[10px] font-mono text-neutral-400">पुणे युनायटED</div>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl glass-panel border border-neutral-800 text-neutral-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-2xl tracking-wide text-neutral-200 hover:text-[#DA020E] transition-colors py-2 flex items-center justify-between group border-b border-neutral-900"
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-neutral-600 group-hover:text-[#DA020E]">
                    0{idx + 1}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col gap-4">
              <Link
                href="/membership"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full glass-panel border border-[#DA020E] text-white font-display text-base tracking-wider font-bold py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5 text-[#DA020E]" />
                JOIN THE REDS
              </Link>

              <Link
                href="/screenings"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#DA020E] hover:bg-[#8C0008] text-white font-display text-lg tracking-wider font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg glow-united"
              >
                <Ticket className="w-5 h-5" />
                GET SCREENING TICKETS
              </Link>

              <div className="text-center text-xs font-mono text-neutral-500">
                MANCHESTER UNITED SUPPORTERS CLUB PUNE • 🔴
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
