'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TeamSection } from '@/sections/TeamSection';

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <Navbar />

      <div className="pt-20">
        <TeamSection />
      </div>

      <Footer />
    </main>
  );
}
