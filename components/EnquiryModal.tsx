'use client';

import React, { useState } from 'react';
import { X, Plane, Send, CheckCircle, User, Mail, Phone, MessageSquare } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultSubject = 'Old Trafford Tour Enquiry',
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: CONNECT RESEND / SUPABASE EMAIL NOTIFICATION BACKEND
    // // TODO: CONNECT ADMIN DASHBOARD ENQUIRY LIST

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
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

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="bg-[#870019] p-6 text-white relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase opacity-80">
                <Plane className="w-4 h-4 text-white" />
                <span>OFFICIAL TOUR DELEGATION</span>
              </div>
              <h3 className="font-display text-2xl font-bold mt-1">OLD TRAFFORD TOUR ENQUIRY</h3>
              <p className="text-xs text-white/80 font-mono mt-1">
                Travel from Pune to Manchester with fellow United Reds
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">ENQUIRY SUBJECT</label>
                <input
                  type="text"
                  disabled
                  value={defaultSubject}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-sm text-[#C8102E] font-bold font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">FULL NAME</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Shinde"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8102E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">EMAIL</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="vikram@example.com"
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

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">MESSAGE / TRAVEL DATES</label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                  <textarea
                    rows={3}
                    placeholder="Tell us how many travelers, preferred match fixture, or any visa questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8102E]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              {/* TODO: CONNECT RESEND EMAIL API */}
              <button
                type="submit"
                className="w-full bg-[#C8102E] hover:bg-[#870019] text-white font-display text-base tracking-wider font-bold py-3.5 rounded-xl shadow-lg shadow-[#C8102E]/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT TOUR ENQUIRY</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="font-display text-2xl font-bold text-white">ENQUIRY RECEIVED!</h3>
            <p className="text-xs text-neutral-300 font-mono leading-relaxed">
              Thank you, {name}. Our Old Trafford travel committee will get in touch with you shortly at {email} with batch details & itinerary.
            </p>

            <button
              onClick={handleReset}
              className="bg-[#C8102E] hover:bg-[#870019] text-white font-display text-sm font-bold px-8 py-3 rounded-xl transition-all"
            >
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
