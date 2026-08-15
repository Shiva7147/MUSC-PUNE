'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { MemberPass } from '@/components/MemberPass';

export const ContactSection: React.FC = () => {
  const [category, setCategory] = useState<string>('General Enquiries');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const categories = [
    'General Enquiries',
    'Screening Enquiries',
    'Merchandise Enquiries',
    'Old Trafford Tour Enquiries',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#08080A] relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & Live MemberPass Card */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#DA020E] font-bold tracking-widest uppercase">
                <Mail className="w-4 h-4" />
                <span>OFFICIAL MEMBERSHIP PASS</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mt-1 uppercase">
                JOIN <span className="text-[#DA020E]">PUNE REDS</span>
              </h2>
              <p className="text-sm text-neutral-400 mt-2 font-sans">
                Fill out your details to generate your official digital Red Card pass live in real-time.
              </p>
            </div>

            {/* Live Member Pass Card Component */}
            <div className="pt-2">
              <MemberPass
                name={name}
                phone={phone}
                email={email}
                category={category}
              />
            </div>

            {/* Venue Location Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#DA020E] shrink-0 mt-0.5" />
                <div>
                  <div className="font-display text-sm font-bold text-white">THE IRISH HOUSE — VIMAN NAGAR</div>
                  <div className="text-xs text-neutral-400 font-mono mt-0.5">
                    Phoenix Marketcity • Main Screening Arena
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#DA020E] shrink-0 mt-0.5" />
                <div>
                  <div className="font-display text-sm font-bold text-white">HIGH SPIRITS CAFE — KOREGAON PARK</div>
                  <div className="text-xs text-neutral-400 font-mono mt-0.5">
                    35A Main Road • Screening Hub
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Category Pills */}
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-2">ENQUIRY CATEGORY</label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`p-2.5 rounded-xl font-mono text-xs font-bold border transition-all text-left truncate ${
                          category === cat
                            ? 'bg-[#DA020E] text-white border-[#DA020E]'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1">YOUR NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvi Joshi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#DA020E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      placeholder="tanvi@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#DA020E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">PHONE NUMBER</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#DA020E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">YOUR MESSAGE</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#DA020E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#DA020E] hover:bg-[#99000A] text-white font-display text-base tracking-wider font-bold py-4 rounded-xl shadow-xl glow-united flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>SUBMIT & GENERATE MEMBER PASS</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">ENQUIRY SENT & MEMBER CARD GENERATED!</h3>
                <p className="text-xs text-neutral-400 font-mono">
                  Thank you, {name}. Your digital Red Card membership pass has been generated. Our committee will contact you shortly at {email}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white font-display text-xs font-bold px-6 py-2.5 rounded-xl"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
