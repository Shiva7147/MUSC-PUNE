'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MembershipSection } from '@/sections/MembershipSection';

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-[#08080A] text-white">
      <Navbar />

      <div className="pt-16">
        <MembershipSection />
      </div>

      <Footer />
    </main>
  );
}
