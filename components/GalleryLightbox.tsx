'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Play, Pause } from 'lucide-react';
import { GalleryItem } from '@/lib/types';

interface GalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
  isPlaying,
  onTogglePlay,
}) => {
  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex] || items[0];

  const handlePrev = () => {
    const newIdx = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    onNavigate(newIdx);
  };

  const handleNext = () => {
    const newIdx = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIdx);
  };

  // Keyboard Navigation: Arrow Left/Right, Space (Play/Pause), Escape (Close)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        onTogglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, isPlaying]);

  // Auto-Play Slideshow Timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      const newIdx = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
      onNavigate(newIdx);
    }, 3500);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, currentIndex, items.length]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between z-20 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-md bg-[#C8102E] text-white text-[11px] font-bold font-display uppercase tracking-wider">
            {currentItem.category || 'DOCUMENTARY'}
          </span>
          <span className="text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-md">
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Auto-Play Toggle Button */}
          <button
            onClick={onTogglePlay}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-display font-bold uppercase transition-all ${
              isPlaying
                ? 'bg-[#C8102E] border-[#C8102E] text-white shadow-lg shadow-[#C8102E]/30 animate-pulse'
                : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
            }`}
            title="Press Spacebar to toggle Auto-Play"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Auto-Play</span>
              </>
            )}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Container with Overlay Chevrons */}
      <div className="relative flex-1 my-2 sm:my-4 flex items-center justify-center min-h-0">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 p-3 sm:p-4 rounded-full bg-black/70 border border-neutral-800 text-white hover:bg-[#C8102E] hover:border-[#C8102E] transition-all z-20 shadow-xl group"
          aria-label="Previous photo (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Display Frame */}
        <div className="relative max-w-6xl max-h-full w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
          <Image
            src={currentItem.imageUrl}
            alt={currentItem.title || currentItem.caption}
            fill
            quality={100}
            priority
            className="object-contain"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 p-3 sm:p-4 rounded-full bg-black/70 border border-neutral-800 text-white hover:bg-[#C8102E] hover:border-[#C8102E] transition-all z-20 shadow-xl group"
          aria-label="Next photo (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Bottom Container: Caption & Interactive Scroller */}
      <div className="max-w-5xl mx-auto w-full space-y-3 z-20">
        {/* Caption Card */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 sm:p-4 text-white space-y-1.5 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <h4 className="font-display text-base sm:text-lg font-bold text-[#C8102E]">
              {currentItem.title}
            </h4>
            <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>{currentItem.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>{currentItem.date}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed font-sans">
            {currentItem.caption}
          </p>
        </div>

        {/* Filmstrip Thumbnail Scroller Inside Lightbox */}
        <div className="flex items-center gap-2 overflow-x-auto p-2 bg-neutral-950/80 border border-neutral-900 rounded-xl no-scrollbar">
          {items.map((item, idx) => (
            <button
              key={item.id || idx}
              onClick={() => onNavigate(idx)}
              className={`relative shrink-0 w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? 'border-[#C8102E] scale-105 shadow-md shadow-[#C8102E]/40 opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-100 hover:border-neutral-600'
              }`}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
