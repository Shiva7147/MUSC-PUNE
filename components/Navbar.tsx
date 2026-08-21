'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X, Ticket, Plane, ShieldCheck } from 'lucide-react';
import { CartItem } from '@/lib/types';
import { officialLogoUrl } from '@/lib/data';

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
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clean, non-redundant nav links
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel bg-[#050505]/95 border-b border-white/10 py-3 shadow-2xl glow-red'
            : 'bg-gradient-to-b from-[#050505]/95 via-[#050505]/70 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Official Logo Badge */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-black border border-white/20 group-hover:scale-105 transition-transform shadow-lg shrink-0">
              <Image
                src={officialLogoUrl}
                alt="MUSC Pune Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-base sm:text-lg text-[#F5F5F5] group-hover:text-[#E60012] transition-colors leading-none tracking-tight">
                  MUSC PUNE
                </span>
                <span className="badge-pune text-[9px] font-sans px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                  पुणे
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-[#F5F5F5]/70 uppercase font-sans font-medium mt-0.5">
                Official Supporters Club
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-display text-xs lg:text-sm font-bold tracking-wider hover:text-[#E60012] transition-colors uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#E60012] hover:after:w-full after:transition-all whitespace-nowrap ${
                  link.name === 'ADMIN' ? 'text-[#FFC400]' : 'text-[#F5F5F5]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Action 1: Old Trafford Tour CTA */}
            <Link
              href="/tours"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#171717] border border-[#E60012] font-display text-xs font-bold text-[#FFC400] hover:bg-black transition-all shadow shrink-0 whitespace-nowrap"
            >
              <Plane className="w-3.5 h-3.5 text-[#E60012] shrink-0" />
              <span>TRIP TO OLD TRAFFORD</span>
            </Link>

            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl glass-panel border border-white/10 text-[#F5F5F5] hover:text-white hover:border-[#E60012] transition-all group shrink-0"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform text-[#E60012]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#E60012] text-white text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Action 2: Get Tickets Primary CTA */}
            <Link
              href="/screenings"
              className="hidden sm:flex items-center gap-1.5 bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xs tracking-wider font-bold px-3.5 py-2.5 rounded-xl transition-all shadow-[0_4px_20px_rgba(230,0,18,0.35)] hover:scale-[1.03] active:scale-95 border border-white/20 shrink-0 whitespace-nowrap"
            >
              <Ticket className="w-4 h-4 shrink-0" />
              <span>GET MATCHDAY TICKETS</span>
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-2.5 rounded-xl glass-panel border border-white/10 text-[#F5F5F5] hover:text-white shrink-0"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex flex-col bg-[#050505]/98 backdrop-blur-2xl text-[#F5F5F5] animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/20 shrink-0">
                <Image src={officialLogoUrl} alt="MUSC Pune Logo" fill className="object-cover" />
              </div>
              <div>
                <div className="font-display tracking-wider font-bold text-lg text-[#F5F5F5]">MUSC PUNE</div>
                <div className="text-[10px] font-sans text-white/60">पुणे युनायटED</div>
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
                  className="font-display text-2xl font-bold tracking-wide text-[#F5F5F5] hover:text-[#E60012] transition-colors py-2 flex items-center justify-between group border-b border-neutral-900"
                >
                  <span className={link.name === 'ADMIN' ? 'text-[#FFC400]' : ''}>{link.name}</span>
                  <span className="text-xs font-sans text-[#E60012] group-hover:text-white">
                    0{idx + 1}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col gap-4">
              <Link
                href="/tours"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#171717] border border-[#E60012] text-[#FFC400] font-display text-base tracking-wider font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
              >
                <Plane className="w-5 h-5 text-[#E60012]" />
                TRIP TO OLD TRAFFORD
              </Link>

              <Link
                href="/screenings"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-lg tracking-wider font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(230,0,18,0.25)]"
              >
                <Ticket className="w-5 h-5" />
                GET MATCHDAY TICKETS
              </Link>

              <div className="text-center text-xs font-sans text-white/50">
                MANCHESTER UNITED SUPPORTERS CLUB PUNE • <span className="text-[#E60012]">🔴</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
