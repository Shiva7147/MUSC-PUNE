'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { OldTraffordToursSection } from '@/sections/OldTraffordToursSection';
import { EnquiryModal } from '@/components/EnquiryModal';
import { oldTraffordTours } from '@/lib/data';

export default function ToursPage() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquirySubject, setEnquirySubject] = useState<string>('Old Trafford Group Trip Enquiry');

  const handleOpenEnquiry = (subject?: string) => {
    if (subject) setEnquirySubject(subject);
    setEnquiryModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#08080A] text-white">
      <Navbar />

      <div className="pt-16">
        <OldTraffordToursSection
          tours={oldTraffordTours}
          onOpenEnquiryModal={handleOpenEnquiry}
        />
      </div>

      <Footer />

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultSubject={enquirySubject}
      />
    </main>
  );
}
