'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AnnouncementsSection } from '@/sections/AnnouncementsSection';
import { announcements } from '@/lib/data';

export default function AnnouncementsPage() {
  return (
    <main className="min-h-screen bg-[#161513] text-[#E7E0CF]">
      <Navbar />

      <div className="pt-20">
        <AnnouncementsSection announcements={announcements} />
      </div>

      <Footer />
    </main>
  );
}
