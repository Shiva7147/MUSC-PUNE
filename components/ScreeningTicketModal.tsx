'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Ticket, Calendar, Clock, MapPin, CheckCircle, QrCode, AlertCircle, ArrowRight, User, Mail, Phone } from 'lucide-react';
import { Screening, TicketBooking } from '@/lib/types';

interface ScreeningTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  screening: Screening;
}

export const ScreeningTicketModal: React.FC<ScreeningTicketModalProps> = ({
  isOpen,
  onClose,
  screening,
}) => {
  const [step, setStep] = useState<'DETAILS' | 'CONFIRMATION'>('DETAILS');
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bookingData, setBookingData] = useState<TicketBooking | null>(null);

  if (!isOpen) return null;

  const totalAmount = screening.price * quantity;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: CONNECT RAZORPAY PAYMENT FLOW
    // TODO: SAVE SCREENING ORDER TO SUPABASE DATABASE
    // TODO: GENERATE UNIQUE TICKET QR VIA BACKEND

    const generatedId = `MUSCPUN-${Math.floor(100000 + Math.random() * 900000)}`;

    const newBooking: TicketBooking = {
      screeningId: screening.id,
      matchTitle: screening.matchTitle,
      venue: screening.venueName,
      date: screening.date,
      time: screening.time,
      ticketQuantity: quantity,
      totalAmount,
      userName: name || 'Pune Red Fan',
      userEmail: email || 'supporter@muscpune.in',
      userPhone: phone || '+91 98765 43210',
      ticketId: generatedId,
      bookingDate: new Date().toLocaleDateString(),
    };

    setBookingData(newBooking);
    setStep('CONFIRMATION');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C8102E', '#870019', '#FFFFFF', '#E65100'],
      });
    } catch {
      // fallback if canvas canvas-confetti environment varies
    }
  };

  const handleReset = () => {
    setStep('DETAILS');
    setQuantity(1);
    setName('');
    setEmail('');
    setPhone('');
    setBookingData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121212] border border-[#C8102E]/30 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-white relative">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'DETAILS' ? (
          <div>
            {/* Modal Header Banner */}
            <div className="bg-gradient-to-r from-[#870019] via-[#C8102E] to-[#870019] p-6 relative overflow-hidden">
              <div className="absolute right-2 -bottom-6 text-7xl font-bold font-display opacity-10 select-none">
                MATCHDAY
              </div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-white/80 uppercase">
                <Ticket className="w-4 h-4" />
                <span>OFFICIAL SCREENING PASS</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mt-1 leading-tight">
                {screening.matchTitle}
              </h3>
              <p className="text-xs text-white/90 font-mono mt-1">{screening.competition}</p>
            </div>

            {/* Event Info Brief */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Calendar className="w-4 h-4 text-[#C8102E] shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] text-neutral-500">DATE</div>
                    <div className="font-bold">{screening.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Clock className="w-4 h-4 text-[#C8102E] shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] text-neutral-500">KICKOFF</div>
                    <div className="font-bold">{screening.time}</div>
                  </div>
                </div>
                <div className="col-span-2 flex items-center gap-2 text-neutral-300 pt-2 border-t border-neutral-800/80">
                  <MapPin className="w-4 h-4 text-[#C8102E] shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] text-neutral-500">VENUE</div>
                    <div className="font-bold text-white">{screening.venueName}</div>
                    <div className="text-[11px] text-neutral-400">{screening.venueAddress}</div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Quantity Selector */}
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                    NUMBER OF TICKETS (₹{screening.price} / PASS)
                  </label>
                  <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-lg p-2">
                    <span className="text-xs text-neutral-300 px-2 font-mono">Select Quantity</span>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setQuantity(num)}
                          className={`w-8 h-8 rounded-md font-mono text-xs font-bold transition-all ${
                            quantity === num
                              ? 'bg-[#C8102E] text-white shadow-md'
                              : 'bg-neutral-800 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* User Info Fields */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1">FULL NAME</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8102E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-1">EMAIL ADDRESS</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          placeholder="rahul@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8102E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-1">PHONE NUMBER</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8102E]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-neutral-500">TOTAL PAYABLE</div>
                    <div className="font-display text-2xl font-bold text-[#C8102E]">
                      ₹{totalAmount.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Submit Button */}
                  {/* TODO: CONNECT RAZORPAY PAYMENT FLOW */}
                  <button
                    type="submit"
                    className="bg-[#C8102E] hover:bg-[#870019] text-white font-display text-base tracking-wider font-bold px-6 py-3 rounded-xl shadow-lg shadow-[#C8102E]/40 flex items-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    <span>PAY & BOOK TICKETS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Confirmation Pass Screen */
          <div className="p-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center animate-pulse">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                BOOKING CONFIRMED
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-2">YOU ARE GOING TO THE MATCH!</h3>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Your entry pass has been generated for {bookingData?.matchTitle}
              </p>
            </div>

            {/* Digital Ticket Visual Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 text-left space-y-4 relative overflow-hidden">
              <div className="flex justify-between items-start border-b border-neutral-800 pb-3">
                <div>
                  <div className="text-[10px] font-mono text-neutral-500 uppercase">TICKET ID</div>
                  <div className="font-mono text-sm font-bold text-[#C8102E]">{bookingData?.ticketId}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-neutral-500">STATUS</div>
                  <div className="font-mono text-xs font-bold text-emerald-400">CONFIRMED</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-neutral-500 text-[10px]">HOLDER</span>
                  <div className="font-bold text-white truncate">{bookingData?.userName}</div>
                </div>
                <div>
                  <span className="text-neutral-500 text-[10px]">QUANTITY</span>
                  <div className="font-bold text-white">{bookingData?.ticketQuantity} Pass(es)</div>
                </div>
                <div className="col-span-2 pt-1">
                  <span className="text-neutral-500 text-[10px]">VENUE</span>
                  <div className="font-bold text-white">{bookingData?.venue}</div>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="pt-3 border-t border-neutral-800 flex flex-col items-center justify-center">
                <div className="w-36 h-36 bg-white p-2 rounded-lg flex items-center justify-center shadow-inner">
                  {/* SVG Placeholder QR */}
                  <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M10 10h30v30H10zM15 15v20h20V15zM50 10h40v40H50zM55 15v30h30V15zM10 50h40v40H10zM15 55v30h30V55zM60 60h10v10H60zM80 60h10v10H80zM70 70h10v10H70zM60 80h10v10H60zM80 80h10v10H80z" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono text-[#C8102E] font-bold mt-2 bg-[#C8102E]/10 px-2 py-0.5 rounded border border-[#C8102E]/20">
                  DEMO QR — BACKEND CONNECTION PENDING
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="w-full bg-[#C8102E] hover:bg-[#870019] text-white font-display text-sm font-bold py-3 rounded-xl transition-all"
              >
                DONE & RETURN TO HOMEPAGE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
