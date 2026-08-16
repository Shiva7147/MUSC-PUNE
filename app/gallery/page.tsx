'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GallerySection } from '@/sections/GallerySection';
import { GalleryLightbox } from '@/components/GalleryLightbox';
import { galleryImages } from '@/lib/data';

export default function GalleryPage() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#161513] text-[#E7E0CF]">
      <Navbar />

      <div className="pt-20">
        <GallerySection
          galleryItems={galleryImages}
          onOpenLightbox={(idx) => setLightboxIdx(idx)}
        />
      </div>

      <Footer />

      {lightboxIdx !== null && (
        <GalleryLightbox
          isOpen={true}
          items={galleryImages}
          currentIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNavigate={(newIdx) => setLightboxIdx(newIdx)}
        />
      )}
    </main>
  );
}
