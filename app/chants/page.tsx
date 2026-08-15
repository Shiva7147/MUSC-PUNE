'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FanChantsSection } from '@/sections/FanChantsSection';
import { fanChants } from '@/lib/data';

export default function ChantsPage() {
  return (
    <main className="min-h-screen bg-[#08080A] text-white">
      <Navbar />

      <div className="pt-16">
        <FanChantsSection chants={fanChants} />
      </div>

      <Footer />
    </main>
  );
}
