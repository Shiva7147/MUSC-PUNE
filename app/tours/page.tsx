'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { OldTraffordToursSection } from '@/sections/OldTraffordToursSection';
import { oldTraffordTours } from '@/lib/data';

export default function ToursPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <Navbar />

      <div className="pt-20">
        <OldTraffordToursSection tours={oldTraffordTours} />
      </div>

      <Footer />
    </main>
  );
}
