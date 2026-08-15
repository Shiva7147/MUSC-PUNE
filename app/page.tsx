'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/sections/HeroSection';
import { ScreeningsSection } from '@/sections/ScreeningsSection';
import { MerchandiseSection } from '@/sections/MerchandiseSection';
import { OldTraffordToursSection } from '@/sections/OldTraffordToursSection';
import { AboutSection } from '@/sections/AboutSection';
import { CommunityExperienceSection } from '@/sections/CommunityExperienceSection';
import { GallerySection } from '@/sections/GallerySection';
import { AnnouncementsSection } from '@/sections/AnnouncementsSection';
import { FanChantsSection } from '@/sections/FanChantsSection';
import { TeamSection } from '@/sections/TeamSection';
import { ContactSection } from '@/sections/ContactSection';
import { CartDrawer } from '@/components/CartDrawer';
import { ScreeningTicketModal } from '@/components/ScreeningTicketModal';
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal';
import { GalleryLightbox } from '@/components/GalleryLightbox';
import { EnquiryModal } from '@/components/EnquiryModal';
import {
  upcomingScreenings,
  merchandiseProducts,
  oldTraffordTours,
  galleryImages,
  announcements,
  fanChants,
  teamMembers,
} from '@/lib/data';
import { CartItem, Product, Screening } from '@/lib/types';

export default function Home() {
  // Global State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modal States
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(null);
  const [isScreeningModalOpen, setIsScreeningModalOpen] = useState(false);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquirySubject, setEnquirySubject] = useState('Old Trafford Tour Enquiry');

  // Cart Operations
  const handleAddToCart = (product: Product, size: string, quantity: number) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.product.id === product.id && i.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, size, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.size === size))
    );
  };

  // Screening Ticket Modal Handlers
  const handleOpenScreeningModal = (screening?: Screening) => {
    setSelectedScreening(screening || upcomingScreenings[0]);
    setIsScreeningModalOpen(true);
  };

  // Quick View Handlers
  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  // Enquiry Handlers
  const handleOpenEnquiry = (subject?: string) => {
    if (subject) setEnquirySubject(subject);
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-[#C8102E] selection:text-white">
      {/* Sticky Global Navigation */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenScreeningModal={() => handleOpenScreeningModal()}
      />

      <main>
        {/* Hero Section */}
        <HeroSection
          featuredScreening={upcomingScreenings[0]}
          onOpenScreeningModal={() => handleOpenScreeningModal()}
        />

        {/* Primary Feature 1: Matchday Screenings */}
        <ScreeningsSection
          screenings={upcomingScreenings}
          onSelectScreening={(sc) => handleOpenScreeningModal(sc)}
        />

        {/* Primary Feature 2: Official Merchandise */}
        <MerchandiseSection
          products={merchandiseProducts}
          onQuickView={handleOpenQuickView}
          onAddToCart={handleAddToCart}
        />

        {/* Primary Feature 3: Old Trafford Group Tours */}
        <OldTraffordToursSection
          tours={oldTraffordTours}
          onOpenEnquiryModal={handleOpenEnquiry}
        />

        {/* Community Narrative & Stats */}
        <AboutSection />

        {/* Supporters Matchday Culture Pillars */}
        <CommunityExperienceSection />

        {/* Gallery */}
        <GallerySection
          galleryItems={galleryImages}
          onOpenLightbox={(idx) => setLightboxIndex(idx)}
        />

        {/* Live Bulletin & Announcements */}
        <AnnouncementsSection announcements={announcements} />

        {/* Fan Chants Marquee & Lyrics Vault */}
        <FanChantsSection chants={fanChants} />

        {/* Committee & Team */}
        <TeamSection members={teamMembers} />

        {/* Contact & Enquiries Form */}
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Screening Ticket Booking Modal */}
      {selectedScreening && (
        <ScreeningTicketModal
          isOpen={isScreeningModalOpen}
          onClose={() => setIsScreeningModalOpen(false)}
          screening={selectedScreening}
        />
      )}

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={quickViewProduct}
        onAddToCart={handleAddToCart}
      />

      {/* Full-Screen Gallery Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          items={galleryImages}
          currentIndex={lightboxIndex}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}

      {/* Tour / General Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        defaultSubject={enquirySubject}
      />
    </div>
  );
}
