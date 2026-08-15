'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContactSection } from '@/sections/ContactSection';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#08080A] text-white">
      <Navbar />

      <div className="pt-16">
        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}
