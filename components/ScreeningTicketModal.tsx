'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Ticket, Calendar, Clock, MapPin, CheckCircle, ArrowRight, User, Mail, Phone, Download, Minus, Plus } from 'lucide-react';
import { Screening } from '@/lib/types';
import { generateTicketPass, AdminTicketRecord } from '@/lib/ticketStore';

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
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState<AdminTicketRecord | null>(null);

  if (!isOpen) return null;

  // Dynamic Taxes & Fees Calculation
  const baseAmount = screening.price * quantity;
  const taxRate = screening.taxRate ?? 0.18; // 18% GST
  const taxAmount = Math.round(baseAmount * taxRate);
  const platformFee = screening.platformFee ?? 30; // ₹30 platform fee
  const totalAmount = baseAmount + taxAmount + platformFee;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate real QR code and ticket stub in local store
      const record = await generateTicketPass(
        screening,
        name || 'Pune Red Supporter',
        email || 'supporter@muscpune.in',
        phone || '+91 7276735140',
        quantity
      );

      setBookingData(record);
      setStep('CONFIRMATION');

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E60012', '#FFFFFF', '#171717'],
        });
      } catch {
        // fallback
      }
    } catch (err) {
      console.error('Failed to generate ticket:', err);
    } finally {
      setLoading(false);
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
      <div className="bg-[#171717] border border-[#E60012]/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-white relative">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2.5 rounded-xl bg-[#050505] border border-white/10 text-white/70 hover:text-white z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'DETAILS' ? (
          <div>
            {/* Modal Header Banner */}
            <div className="bg-gradient-to-r from-[#99000A] via-[#E60012] to-[#99000A] p-6 relative overflow-hidden">
              <div className="absolute right-2 -bottom-6 text-7xl font-bold font-display opacity-10 select-none">
                MATCHDAY
              </div>
              <div className="flex items-center gap-2 text-xs font-display tracking-tight text-white/90 uppercase font-bold">
                <Ticket className="w-4 h-4 text-white" />
                <span>OFFICIAL MATCHDAY TICKETING</span>
              </div>
              <h3 className="font-display text-3xl font-bold text-white mt-1 leading-none uppercase">
                {screening.matchTitle}
              </h3>
              <p className="text-xs text-white/80 font-display font-bold mt-1 uppercase">{screening.competition}</p>
            </div>

            {/* Event Info Brief */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#050505] border border-white/10 text-xs">
                <div className="flex items-center gap-2 text-white/90">
                  <Calendar className="w-4 h-4 text-[#E60012] shrink-0" />
                  <div>
                    <div className="font-display text-[10px] text-white/60">DATE</div>
                    <div className="font-bold">{screening.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Clock className="w-4 h-4 text-[#E60012] shrink-0" />
                  <div>
                    <div className="font-display text-[10px] text-white/60">KICKOFF</div>
                    <div className="font-bold">{screening.time}</div>
                  </div>
                </div>
                <div className="col-span-2 flex items-center gap-2 text-white/90 pt-2 border-t border-white/10">
                  <MapPin className="w-4 h-4 text-[#E60012] shrink-0" />
                  <div>
                    <div className="font-display text-[10px] text-white/60">VENUE</div>
                    <div className="font-bold text-white">{screening.venueName}</div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Quantity Stepper (1 to 10) */}
                <div>
                  <label className="block text-xs font-display text-white/90 font-bold uppercase mb-1.5">
                    NUMBER OF TICKETS (MAX 10 / BOOKING)
                  </label>
                  <div className="flex items-center justify-between bg-[#050505] border border-white/15 rounded-xl p-3">
                    <span className="text-xs text-white/80 font-sans font-medium">Select Quantity (₹{screening.price} / ticket)</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        disabled={quantity <= 1}
                        className="w-9 h-9 rounded-lg bg-[#171717] border border-white/20 text-white font-bold flex items-center justify-center hover:bg-[#E60012] transition-colors disabled:opacity-30"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-display text-2xl font-bold text-white w-6 text-center">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                        disabled={quantity >= 10}
                        className="w-9 h-9 rounded-lg bg-[#171717] border border-white/20 text-white font-bold flex items-center justify-center hover:bg-[#E60012] transition-colors disabled:opacity-30"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* User Info Fields */}
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-display text-white/90 font-bold uppercase mb-1">FULL NAME *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#050505] border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#E60012] placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-display text-white/90 font-bold uppercase mb-1">EMAIL ADDRESS *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          required
                          placeholder="rahul@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#050505] border border-white/15 rounded-xl pl-10 pr-3 py-3 text-sm text-white focus:outline-none focus:border-[#E60012] placeholder:text-neutral-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-display text-white/90 font-bold uppercase mb-1">PHONE / WHATSAPP *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          required
                          placeholder="+91 7276735140"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#050505] border border-white/15 rounded-xl pl-10 pr-3 py-3 text-sm text-white focus:outline-none focus:border-[#E60012] placeholder:text-neutral-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Taxes & Platform Fee Detailed Breakdown */}
                <div className="p-4 rounded-xl bg-[#050505] border border-white/10 space-y-1.5 text-xs font-sans">
                  <div className="flex justify-between text-white/70">
                    <span>Base Price ({quantity} Ticket{quantity > 1 ? 's' : ''})</span>
                    <span className="font-mono">₹{baseAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Applicable Tax (18% GST)</span>
                    <span className="font-mono">₹{taxAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-white/70 pb-1.5 border-b border-white/10">
                    <span>Platform & Booking Fee</span>
                    <span className="font-mono">₹{platformFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-display text-base font-bold text-white pt-1">
                    <span>TOTAL PAYABLE</span>
                    <span className="text-[#E60012]">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-lg tracking-tight font-bold py-4 px-6 rounded-2xl shadow-[0_8px_30px_rgba(230,0,18,0.35)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50 uppercase"
                >
                  <span>{loading ? 'GENERATING TICKETS...' : 'BOOK TICKETS'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Confirmation Screen with QR Code */
          <div className="p-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-display font-bold uppercase tracking-tight">
                ✓ TICKETS BOOKED SUCCESSFULLY
              </span>
              <h3 className="font-display text-3xl font-bold text-white mt-2 uppercase">YOU ARE GOING TO THE MATCH!</h3>
              <p className="text-xs text-white/70 font-sans mt-1">
                Present this QR code to the gate admin scanner at {bookingData?.venue}
              </p>
            </div>

            {/* Ticket Card Visual */}
            <div className="bg-[#050505] border-2 border-[#E60012]/60 rounded-3xl p-6 text-left space-y-4 relative overflow-hidden shadow-2xl ticket-notch-left ticket-notch-right">
              <div className="flex justify-between items-start border-b border-white/10 pb-3">
                <div>
                  <div className="text-[10px] font-display text-white/60 font-bold uppercase">TICKET ID</div>
                  <div className="font-mono text-base font-bold text-white">{bookingData?.ticketId}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-display text-white/50 uppercase">GATE STATUS</div>
                  <div className="font-display text-xs font-bold text-emerald-400 uppercase">UNCHECKED (ACTIVE)</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-sans text-white/80">
                <div>
                  <span className="text-white/40 text-[10px] font-display uppercase font-bold">MATCHDAY HOLDER</span>
                  <div className="font-bold text-white truncate">{bookingData?.userName}</div>
                </div>
                <div>
                  <span className="text-white/40 text-[10px] font-display uppercase font-bold">TICKETS</span>
                  <div className="font-bold text-white">{bookingData?.quantity} Ticket(s)</div>
                </div>
                <div className="col-span-2 pt-1">
                  <span className="text-white/40 text-[10px] font-display uppercase font-bold">VENUE</span>
                  <div className="font-bold text-[#E60012]">{bookingData?.venue}</div>
                </div>
              </div>

              {/* Real Authentic QR Code Image */}
              {bookingData?.qrDataUrl && (
                <div className="pt-4 border-t border-dashed border-white/20 flex flex-col items-center justify-center space-y-2">
                  <div className="bg-white p-3 rounded-2xl shadow-2xl border-4 border-[#E60012]">
                    <img
                      src={bookingData.qrDataUrl}
                      alt={`Ticket QR Code ${bookingData.ticketId}`}
                      className="w-44 h-44 object-contain"
                    />
                  </div>
                  <div className="text-[11px] font-mono text-white font-bold bg-[#171717] px-3 py-1 rounded-lg border border-white/10">
                    SCAN AT GATE FOR INSTANT ENTRY
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={bookingData?.qrDataUrl}
                download={`${bookingData?.ticketId}-QR.png`}
                className="flex-1 bg-[#171717] hover:bg-black border border-white/20 text-white font-display text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4 text-white" />
                <span>DOWNLOAD TICKET QR</span>
              </a>

              <button
                onClick={handleReset}
                className="flex-1 bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xs font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all uppercase"
              >
                DONE & CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
