'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TeamSection } from '@/sections/TeamSection';
import { teamMembers } from '@/lib/data';

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#08080A] text-white">
      <Navbar />

      <div className="pt-16">
        <TeamSection members={teamMembers} />
      </div>

      <Footer />
    </main>
  );
}
