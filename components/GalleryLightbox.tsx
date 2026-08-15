'use client';

import React from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { GalleryItem } from '@/lib/types';

interface GalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}) => {
  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  const handlePrev = () => {
    const newIdx = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    onNavigate(newIdx);
  };

  const handleNext = () => {
    const newIdx = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIdx);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-[#C8102E] text-white text-[10px] font-bold font-mono tracking-wider">
            {currentItem.category}
          </span>
          <span className="text-xs font-mono text-neutral-400">
            {currentIndex + 1} / {items.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative flex-1 my-4 flex items-center justify-center">
        {/* Prev Navigation */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 p-3 rounded-full bg-neutral-900/80 border border-neutral-800 text-white hover:bg-[#C8102E] transition-all z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Image Display */}
        <div className="relative max-w-5xl max-h-[70vh] w-full h-full rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
          <Image
            src={currentItem.imageUrl}
            alt={currentItem.title}
            fill
            className="object-contain"
          />
        </div>

        {/* Next Navigation */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 p-3 rounded-full bg-neutral-900/80 border border-neutral-800 text-white hover:bg-[#C8102E] transition-all z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Metadata Bar */}
      <div className="max-w-3xl mx-auto w-full bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 text-white space-y-2 z-10">
        <h4 className="font-display text-lg font-bold text-[#C8102E]">{currentItem.title}</h4>
        <p className="text-xs text-neutral-300 leading-relaxed">{currentItem.caption}</p>
        <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-400 pt-1 border-t border-neutral-800">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>{currentItem.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>{currentItem.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
