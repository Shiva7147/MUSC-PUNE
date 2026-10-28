'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Ticket, Calendar, Clock, MapPin, CheckCircle, ArrowRight, User, Mail, Phone, Download, Minus, Plus, MessageCircle, FileText, AlertTriangle, Camera, ShieldCheck, CheckCircle2, CreditCard } from 'lucide-react';
import { Screening, SiteTaxConfig } from '@/lib/types';
import { officialLogoUrl } from '@/lib/data';
import { generateTicketPass, recordFailedPaymentAttempt, AdminTicketRecord, getMembershipConfigStore, getSiteTaxConfigStore, fetchConfigRemoteAsync, subscribeStore } from '@/lib/ticketStore';
import { generatePDFTicketPass } from '@/lib/pdfTicketGenerator';
import { dispatchWhatsAppTicketMessage } from '@/lib/whatsappService';

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
  const [step, setStep] = useState<'DETAILS' | 'CONFIRMATION' | 'INTERRUPTED'>('DETAILS');
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState<AdminTicketRecord | null>(null);
  const [showSafetyPopup, setShowSafetyPopup] = useState(false);
  const [siteTaxConfig, setSiteTaxConfig] = useState<SiteTaxConfig>(getSiteTaxConfigStore());

  // Safely record pending debit attempt if payment is interrupted or fails
  const handlePaymentInterrupted = async (reason?: string) => {
    setLoading(false);
    try {
      const pendingRecord = await recordFailedPaymentAttempt(
        screening,
        name || 'Pune Red Supporter',
        email || 'supporter@muscpune.in',
        phone || '+91 7276735140',
        quantity,
        totalAmount
      );
      setBookingData(pendingRecord);
      setStep('INTERRUPTED');

      // Dispatch pending/interrupted record to Formspree
      try {
        const endpoint = getSiteTaxConfigStore().formspreeEndpoint || 'https://formspree.io/f/xrppgvbv';
        await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            _subject: `⚠️ Screening Payment Interrupted / Attention: ${screening.matchTitle} - ${name || 'Supporter'}`,
            status: 'PAYMENT_INTERRUPTED_CHECK_SCREENING_GATE',
            matchTitle: screening.matchTitle,
            quantity,
            supporterName: name || 'Supporter',
            supporterEmail: email || 'supporter@muscpune.in',
            supporterPhone: phone || '+91 7276735140',
            totalAmount: `₹${totalAmount}`,
            interruptionReason: reason || 'Transaction window closed or interrupted',
            screeningDate: screening.date,
            venue: screening.venueName,
          }),
        });
      } catch (fErr) {
        console.warn('Formspree dispatch warning:', fErr);
      }
    } catch (err) {
      console.error('Failed to log interrupted payment attempt:', err);
    }
  };

  // Close modal safely & reset state
  const handleResetAndClose = () => {
    setStep('DETAILS');
    setQuantity(1);
    setName('');
    setEmail('');
    setPhone('');
    setBookingData(null);
    setShowSafetyPopup(false);
    onClose();
  };

  // ESC Key listener & overflow lock cleanup
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleResetAndClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Refresh remote tax & platform fee configuration when opened & listen for live store changes
  useEffect(() => {
    if (isOpen) {
      setSiteTaxConfig(getSiteTaxConfigStore());
      fetchConfigRemoteAsync()
        .then((res) => {
          if (res?.taxConfig) setSiteTaxConfig(res.taxConfig);
        })
        .catch(() => {});

      const unsubscribe = subscribeStore(() => {
        setSiteTaxConfig(getSiteTaxConfigStore());
      });
      return () => {
        unsubscribe();
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Dynamic Taxes & Fees Calculation (Percentage Based from Live Admin Store)
  const baseAmount = screening.price * quantity;
  const taxRate = siteTaxConfig.screeningsTaxRate ?? screening.taxRate ?? 0.18; // Applicable screening tax percentage
  const taxAmount = Math.round(baseAmount * taxRate);
  const platformFeeRate = siteTaxConfig.screeningsPlatformFeeRate ?? screening.platformFeeRate ?? 0.03; // Applicable screening platform fee percentage
  const platformFeeAmount = Math.round(baseAmount * platformFeeRate);
  const totalAmount = baseAmount + taxAmount + platformFeeAmount;

  const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
      if (typeof window === 'undefined') return resolve(false);
      if ((window as any).Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const completeTicketGeneration = async (paymentRefId?: string, orderId?: string) => {
    const record = await generateTicketPass(
      screening,
      name || 'Pune Red Supporter',
      email || 'supporter@muscpune.in',
      phone || '+91 7276735140',
      quantity,
      totalAmount,
      paymentRefId,
      orderId
    );

    setBookingData(record);
    setStep('CONFIRMATION');

    // Instant Formspree Ticket Dispatch
    try {
      const endpoint = getSiteTaxConfigStore().formspreeEndpoint || 'https://formspree.io/f/xrppgvbv';
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `🎟️ New Match Screening Ticket: ${record.matchTitle} (${record.quantity} passes) - ${record.userName}`,
          orderType: 'MATCH_SCREENING_TICKET',
          ticketId: record.ticketId,
          matchTitle: record.matchTitle,
          quantity: record.quantity,
          supporterName: record.userName,
          supporterEmail: record.userEmail,
          supporterPhone: record.userPhone,
          totalAmount: `₹${record.totalAmount}`,
          paymentId: record.paymentId || paymentRefId || 'Confirmed',
          orderId: record.orderId || orderId || 'Confirmed',
          bookingDate: record.bookingDate,
          venue: record.venue || screening.venueName,
        }),
      });
    } catch (fErr) {
      console.warn('Formspree ticket dispatch warning:', fErr);
    }

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
  };

  const handleFormPreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert('Please fill in your name, email, and phone number.');
      return;
    }
    // Trigger the requested safety notice pop-up before proceeding to the payment gateway
    setShowSafetyPopup(true);
  };

  const handleExecutePayment = async () => {
    setShowSafetyPopup(false);
    await handleBookingSubmit();
  };

  const handleBookingSubmit = async () => {
    setLoading(true);

    try {
      // 1. Initialize order via Razorpay API route
      const safeReceipt = `rcpt_${screening.id}_${Date.now()}`.slice(0, 40);
      const res = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          currency: 'INR',
          receipt: safeReceipt,
          notes: {
            screeningId: screening.id,
            matchTitle: screening.matchTitle,
            quantity,
            userName: name,
            userEmail: email,
            userPhone: phone,
          },
        }),
      });

      const orderData = await res.json().catch(() => ({}));
      const hasLiveRazorpay = !orderData.simulated && orderData.key && !orderData.key.includes('rzp_test_musc_pune');

      if (hasLiveRazorpay) {
        const loaded = await loadRazorpayScript();
        if (loaded && (window as any).Razorpay) {
          const options = {
            key: orderData.key,
            amount: orderData.amount,
            currency: orderData.currency || 'INR',
            name: 'MUSC Pune',
            description: `${screening.matchTitle} (${quantity} Pass${quantity > 1 ? 'es' : ''})`,
            image: officialLogoUrl,
            order_id: orderData.orderId,
            prefill: {
              name: name || 'Pune Red Supporter',
              email: email || 'supporter@muscpune.in',
              contact: phone || '+91 7276735140',
            },
            theme: {
              color: '#E60012',
            },
            handler: async (response: any) => {
              // Server-side cryptographic signature verification
              try {
                const verifyRes = await fetch('/api/razorpay', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  }),
                });
                const verifyData = await verifyRes.json().catch(() => ({}));
                if (!verifyRes.ok || verifyData.error) {
                  console.error('Signature verification warning:', verifyData);
                  alert('Payment verification warning: Signature mismatch. If money was debited, please contact ebrahimmred@gmail.com.');
                }
              } catch (verifyErr) {
                console.error('Signature verification network error:', verifyErr);
              }

              await completeTicketGeneration(response.razorpay_payment_id, response.razorpay_order_id);
              setLoading(false);
            },
            modal: {
              ondismiss: () => {
                setLoading(false);
              },
            },
          };
          const rzp = new (window as any).Razorpay(options);
          rzp.on('payment.failed', async function (failResp: any) {
            console.error('Razorpay payment failed:', failResp);
            await handlePaymentInterrupted(failResp.error?.description);
          });
          rzp.open();
          return;
        }
      }

      // 2. Direct simulation / Instant confirmation mode
      await completeTicketGeneration(orderData.orderId || `pay_direct_${Date.now()}`);
    } catch (err) {
      console.error('Failed to initialize or process payment:', err);
      await handlePaymentInterrupted('Payment process interrupted');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleResetAndClose}
      className="fixed inset-0 z-[60] overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#171717] border border-[#E60012]/40 rounded-3xl max-w-lg w-full max-h-[92vh] sm:max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-white relative my-auto"
      >
        {/* Safety Pop-up Notice for Match Screening Tickets */}
        {showSafetyPopup && (
          <div className="absolute inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl flex flex-col justify-center items-center p-4 sm:p-6 text-center animate-in fade-in zoom-in-95 duration-200 overflow-y-auto">
            <div className="max-w-md w-full space-y-4 my-auto">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#E60012]/15 border-2 border-[#E60012] flex items-center justify-center mx-auto text-[#E60012] shadow-[0_0_25px_rgba(230,0,18,0.3)]">
                <Camera className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171717] border border-white/15 text-[11px] font-display font-bold uppercase tracking-wider text-[#FFC400]">
                  <span>IMPORTANT VENUE ENTRY NOTICE</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase leading-tight">
                  PLEASE TAKE A SCREENSHOT OF YOUR TICKET
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
                  Before you continue to the payment gateway, please note: <strong className="text-white">you must take a screenshot of your ticket pass & QR code</strong> immediately after payment is confirmed.
                </p>
              </div>

              <div className="bg-[#171717] p-3 sm:p-3.5 rounded-2xl border border-white/10 text-left text-xs space-y-2 text-white/80 font-sans">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>The gate marshals will scan your QR code pass directly from your phone screen.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                  <span>Your booking will also be safely registered in the official MUSC Pune gate ledger.</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleExecutePayment}
                  className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-sm sm:text-base font-bold py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl shadow-[0_8px_30px_rgba(230,0,18,0.4)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 uppercase cursor-pointer"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>I UNDERSTAND, CONTINUE TO PAYMENT</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSafetyPopup(false)}
                  className="w-full bg-transparent hover:bg-white/5 text-white/60 hover:text-white font-display text-xs font-bold py-2 rounded-xl uppercase transition-colors cursor-pointer"
                >
                  GO BACK & REVIEW DETAILS
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Prominent High-Visibility Sticky Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-3 right-3 p-2.5 rounded-2xl bg-[#050505]/90 border border-white/20 text-white/90 hover:text-white hover:border-[#E60012] z-30 shadow-xl transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close Ticket Modal"
        >
          <X className="w-5 h-5 text-[#E60012]" />
        </button>

        <div className="flex-1 overflow-y-auto">
          {step === 'DETAILS' ? (
            <div>
              {/* Modal Header Banner */}
              <div className="bg-gradient-to-r from-[#99000A] via-[#E60012] to-[#99000A] p-6 relative overflow-hidden">
                <div className="absolute right-2 -bottom-6 text-7xl font-bold font-display opacity-10 select-none">
                  MATCHDAY
                </div>
                <div className="flex items-center gap-2 text-xs font-display tracking-tight text-white/90 uppercase font-bold">
                  <Ticket className="w-4 h-4 text-white" />
                  <span>OFFICIAL SCREENING TICKETS</span>
                </div>
                <h3 className="font-display text-3xl font-bold text-white mt-1 leading-none uppercase pr-14 sm:pr-16">
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
                      <div className="font-display text-xs text-white/60">DATE</div>
                      <div className="font-bold">{screening.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <Clock className="w-4 h-4 text-[#E60012] shrink-0" />
                    <div>
                      <div className="font-display text-xs text-white/60">KICKOFF</div>
                      <div className="font-bold">{screening.time}</div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center gap-2 text-white/90 pt-2 border-t border-white/10">
                    <MapPin className="w-4 h-4 text-[#E60012] shrink-0" />
                    <div>
                      <div className="font-display text-xs text-white/60">VENUE</div>
                      <div className="font-bold text-white">{screening.venueName}</div>
                    </div>
                  </div>
                </div>

                {/* Live Seat Availability */}
                {(() => {
                  const totalCap = screening.capacity ?? 250;
                  const remSeats = Math.max(0, screening.remainingSeats ?? 42);
                  const filledPct = Math.min(100, Math.round(((totalCap - remSeats) / totalCap) * 100));
                  return (
                    <div className="p-3 bg-[#050505] rounded-xl border border-white/10 space-y-1.5">
                      <div className="flex justify-between text-xs font-display">
                        <span className="text-[#E60012] font-bold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#E60012] animate-ping" />
                          <span>🔥 LIVE SEATS: {filledPct}% BOOKED ({remSeats} SEATS LEFT)</span>
                        </span>
                        <span className="text-white/60 font-mono font-bold text-[11px]">{remSeats} / {totalCap} REMAINING</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#171717] overflow-hidden border border-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 via-[#E60012] to-red-600 transition-all duration-500"
                          style={{ width: `${filledPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })()}

                {/* Form */}
                <form onSubmit={handleFormPreSubmit} className="space-y-4">
                  {/* Quantity Stepper (1 to 10) */}
                  <div>
                    <label className="block text-xs font-display text-white/90 font-bold uppercase mb-1.5">
                      NUMBER OF TICKETS (MAX 10 / BOOKING)
                    </label>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#050505] border border-white/15 rounded-xl p-3">
                      <span className="text-xs text-white/80 font-sans font-medium">Select Quantity (₹{screening.price} / ticket)</span>
                      <div className="flex items-center gap-3 justify-end">
                        <button
                          type="button"
                          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                          disabled={quantity <= 1}
                          className="w-9 h-9 rounded-lg bg-[#171717] border border-white/20 text-white font-bold flex items-center justify-center hover:bg-[#E60012] transition-colors disabled:opacity-30 min-w-[44px] min-h-[44px]"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-display text-2xl font-bold text-white w-6 text-center">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                          disabled={quantity >= 10}
                          className="w-9 h-9 rounded-lg bg-[#171717] border border-white/20 text-white font-bold flex items-center justify-center hover:bg-[#E60012] transition-colors disabled:opacity-30 min-w-[44px] min-h-[44px]"
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
                  <div className="p-4 rounded-xl bg-[#050505] border border-white/10 space-y-2 text-xs font-sans">
                    <div className="flex justify-between text-white/70">
                      <span>Base Ticket Price ({quantity} Ticket{quantity > 1 ? 's' : ''})</span>
                      <span className="font-mono">₹{baseAmount.toLocaleString('en-IN')}</span>
                    </div>

                    {(screening.redeemableAmount !== undefined || screening.entryFeeAmount !== undefined) && (
                      <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-[11px] space-y-1">
                        <div className="text-white/60 uppercase font-display font-bold text-[10px] tracking-wider">Per-Ticket Pricing Split</div>
                        <div className="flex justify-between text-emerald-400 font-medium">
                          <span>🍽️ Redeemable on Food & Beverages:</span>
                          <span className="font-mono font-bold">₹{((screening.redeemableAmount ?? Math.max(0, screening.price - (screening.entryFeeAmount ?? 0))) * quantity).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-white/80 font-medium">
                          <span>🎟️ Match Entry Charge:</span>
                          <span className="font-mono font-bold">₹{((screening.entryFeeAmount ?? Math.max(0, screening.price - (screening.redeemableAmount ?? 0))) * quantity).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between text-white/70">
                      <span>Screening Tax Rate ({Math.round(taxRate * 100)}%)</span>
                      <span className="font-mono">₹{taxAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-white/70 pb-1.5 border-b border-white/10">
                      <span>Screening Platform Fees ({Math.round(platformFeeRate * 100)}%)</span>
                      <span className="font-mono">₹{platformFeeAmount.toLocaleString('en-IN')}</span>
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
                    className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-lg tracking-tight font-bold py-4 px-6 rounded-2xl shadow-[0_8px_30px_rgba(230,0,18,0.35)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50 uppercase cursor-pointer min-h-[44px]"
                  >
                    <span>{loading ? 'PROCESSING PAYMENT...' : `PAY & CONFIRM PASS (₹${totalAmount.toLocaleString('en-IN')})`}</span>
                    <Ticket className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          ) : step === 'CONFIRMATION' ? (
            /* Confirmation Screen with QR Code */
            <div className="p-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-display font-bold uppercase tracking-tight">
                  ✓ SCREENING TICKETS BOOKED
                </span>
                <h3 className="font-display text-3xl font-bold text-white mt-2 uppercase">YOU ARE GOING TO THE MATCH!</h3>
                <p className="text-xs text-white/70 font-sans mt-1">
                  Present this QR code to the gate admin scanner at {bookingData?.venue}
                </p>
              </div>

              {/* Zero-Cost Screenshot Notice Banner */}
              <div className="bg-[#171717] border-2 border-[#FFC400] p-4 rounded-2xl text-left space-y-1.5 shadow-xl">
                <div className="flex items-center gap-2 text-[#FFC400] font-display text-xs font-bold uppercase">
                  <span>📸 TAKE A SCREENSHOT OR DOWNLOAD TICKET NOW</span>
                </div>
                <p className="text-xs font-sans text-white/90 leading-relaxed">
                  Please take a screenshot of this card or click <strong>DOWNLOAD PDF PASS</strong> below! Your unique Ticket ID is <code className="text-[#E60012] font-mono font-bold bg-black px-1.5 py-0.5 rounded">{bookingData?.ticketId}</code>. No WhatsApp or SMS dispatch required — simply show this screenshot or Ticket ID at the gate.
                </p>
              </div>

              {/* Ticket Card Visual */}
              <div className="bg-[#050505] border-2 border-[#E60012]/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-left space-y-4 relative overflow-hidden shadow-2xl">
                <div className="flex justify-between items-start border-b border-white/10 pb-3">
                  <div>
                    <div className="text-xs font-display text-white/60 font-bold uppercase">TICKET ID</div>
                    <div className="font-mono text-base font-bold text-white">{bookingData?.ticketId}</div>
                    {bookingData?.paymentId && (
                      <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
                        REF: {bookingData.paymentId}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-display text-white/50 uppercase">GATE STATUS</div>
                    <div className="font-display text-xs font-bold text-emerald-400 uppercase">UNCHECKED (ACTIVE)</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-sans text-white/80">
                  <div>
                    <span className="text-white/40 text-xs font-display uppercase font-bold">MATCHDAY HOLDER</span>
                    <div className="font-bold text-white truncate">{bookingData?.userName}</div>
                  </div>
                  <div>
                    <span className="text-white/40 text-xs font-display uppercase font-bold">TICKETS</span>
                    <div className="font-bold text-white">{bookingData?.quantity} Ticket(s)</div>
                  </div>
                  <div className="col-span-2 pt-1">
                    <span className="text-white/40 text-xs font-display uppercase font-bold">VENUE</span>
                    <div className="font-bold text-[#E60012]">{bookingData?.venue}</div>
                  </div>
                </div>

                {/* Real Authentic QR Code Image */}
                {bookingData?.qrDataUrl && (
                  <div className="pt-4 border-t border-dashed border-white/20 flex flex-col items-center justify-center space-y-2">
                    <div className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-2xl border-4 border-[#E60012]">
                      <img
                        src={bookingData.qrDataUrl}
                        alt={`Ticket QR Code ${bookingData.ticketId}`}
                        className="w-36 h-36 sm:w-44 sm:h-44 object-contain max-w-full"
                      />
                    </div>
                    <div className="text-xs font-mono text-white font-bold bg-[#171717] px-3 py-1 rounded-lg border border-white/10 text-center">
                      SCAN AT GATE FOR INSTANT ENTRY
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons: Download Image & Download PDF Pass */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={bookingData?.qrDataUrl}
                  download={`${bookingData?.ticketId}-QR.png`}
                  className="bg-[#171717] hover:bg-black border border-white/20 text-white font-display text-xs font-bold py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all min-h-[44px]"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>DOWNLOAD PNG QR CODE</span>
                </a>

                <button
                  type="button"
                  onClick={() => bookingData && generatePDFTicketPass(bookingData)}
                  className="bg-[#E60012] hover:bg-[#C40010] border border-white/20 text-white font-display text-xs font-bold py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px] shadow-lg"
                >
                  <FileText className="w-4 h-4 text-white" />
                  <span>DOWNLOAD PDF TICKET PASS</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-sm font-bold py-4 rounded-xl shadow-lg transition-all uppercase cursor-pointer min-h-[44px]"
              >
                DONE & CLOSE
              </button>
            </div>
          ) : step === 'INTERRUPTED' ? (
            /* Reassuring Payment Interruption / Pending Gate Verification Screen */
            <div className="p-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-400 mx-auto flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-10 h-10 text-amber-400" />
              </div>

              <div>
                <span className="px-3.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-display font-bold uppercase tracking-tight inline-block">
                  ⚠️ PAYMENT INTERRUPTED / STATUS PENDING
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2 uppercase">
                  DO NOT WORRY! WE HAVE YOUR DETAILS.
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-sans mt-2 max-w-md mx-auto leading-relaxed">
                  If money was debited from your bank or UPI, <strong>do not pay again</strong>.
                  We have safely saved your booking details under your mobile number.
                </p>
              </div>

              <div className="bg-[#050505] border-2 border-amber-500/50 rounded-2xl p-5 text-left space-y-3 shadow-xl">
                <div className="flex items-center gap-2 text-amber-400 font-display text-xs font-bold uppercase border-b border-white/10 pb-2">
                  <span>MATCHDAY GATE VERIFICATION INSTRUCTIONS</span>
                </div>
                <div className="space-y-2 text-xs font-sans text-white/90">
                  <p>
                    1. <strong>At the Screening Gate:</strong> Simply tell the gate marshal your registered phone number (<strong className="text-amber-300 font-mono">{bookingData?.userPhone || phone}</strong>) or booking reference (<strong className="text-amber-300 font-mono">{bookingData?.ticketId}</strong>).
                  </p>
                  <p>
                    2. <strong>Bank Verification:</strong> Show your UPI / NetBanking debit SMS or app confirmation. The gate admin will verify it on their live scanner and grant you instant entry.
                  </p>
                  <p>
                    3. <strong>If No Money was Debited:</strong> You can safely click <strong>TRY BOOKING AGAIN</strong> below to re-attempt checkout.
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[11px] font-mono text-white/70">
                  <div>Ref ID: <span className="text-white font-bold break-all">{bookingData?.ticketId}</span></div>
                  <div>Quantity: <span className="text-white font-bold">{quantity} Pass(es)</span></div>
                  <div>Amount: <span className="text-white font-bold">₹{totalAmount}</span></div>
                  <div>Match: <span className="text-white font-bold truncate block">{screening.matchTitle}</span></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('DETAILS')}
                  className="bg-[#171717] hover:bg-black border border-white/20 text-white font-display text-xs font-bold py-3.5 px-4 rounded-xl uppercase transition-all min-h-[44px] cursor-pointer"
                >
                  TRY BOOKING AGAIN
                </button>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-display text-xs font-bold py-3.5 px-4 rounded-xl uppercase transition-all shadow-lg min-h-[44px] cursor-pointer"
                >
                  GOT IT, I&apos;LL VERIFY AT GATE
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
