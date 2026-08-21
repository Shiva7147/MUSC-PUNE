'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-display text-[#FFC400] font-bold tracking-wider uppercase">
              <MessageSquare className="w-4 h-4 text-[#E60012]" />
              <span>OFFICIAL SUPPORTERS CLUB CONTACT</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white mt-1 uppercase">
              GET IN <span className="text-[#E60012]">TOUCH</span>
            </h2>
            <p className="text-sm text-[#F5F5F5]/70 max-w-xl mt-2 font-sans">
              Have questions about matchday screening passes, Old Trafford tour registrations, or local membership? Reach out to the committee directly.
            </p>
          </div>

          <div className="badge-united text-xs font-display px-3.5 py-1.5 rounded-lg font-bold">
            🔴 RESPONDING WITHIN 24 HOURS
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8 glass-card rounded-3xl p-8 bg-[#171717] border border-white/10">
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-white uppercase">COMMUNITY HUB HEADQUARTERS</h3>
              
              <div className="space-y-4 font-sans text-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[#050505] text-[#E60012] border border-white/10 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Screening Venue</div>
                    <p className="text-xs text-white/70 mt-0.5">The Irish House, Phoenix Marketcity, Viman Nagar, Pune, Maharashtra 411014</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[#050505] text-[#E60012] border border-white/10 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Email Desk</div>
                    <p className="text-xs text-[#FFC400] mt-0.5">contact@muscpune.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[#050505] text-[#E60012] border border-white/10 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">WhatsApp Desk</div>
                    <p className="text-xs text-white/70 mt-0.5">+91 98765 43210 (Pune Reds Helpline)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column with High Contrast Inputs */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-8 bg-[#171717] border border-white/10">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="font-display text-3xl font-bold text-white uppercase">ENQUIRY SENT SUCCESSFULLY!</h3>
                <p className="text-xs font-sans text-white/80 max-w-md mx-auto">
                  Thank you for reaching out. A committee member will get back to you shortly on WhatsApp or Email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-display text-[#FFC400] font-bold uppercase">YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#050505] border border-white/15 text-white text-sm font-sans placeholder:text-neutral-400 focus:outline-none focus:border-[#E60012]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-display text-[#FFC400] font-bold uppercase">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#050505] border border-white/15 text-white text-sm font-sans placeholder:text-neutral-400 focus:outline-none focus:border-[#E60012]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-display text-[#FFC400] font-bold uppercase">PHONE / WHATSAPP *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#050505] border border-white/15 text-white text-sm font-sans placeholder:text-neutral-400 focus:outline-none focus:border-[#E60012]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-display text-[#FFC400] font-bold uppercase">ENQUIRY TYPE</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#050505] border border-white/15 text-white text-sm font-sans focus:outline-none focus:border-[#E60012]"
                    >
                      <option value="Matchday Screening Pass">Matchday Screening Pass</option>
                      <option value="Old Trafford Group Trip">Old Trafford Group Trip</option>
                      <option value="Official Merchandise">Official Merchandise</option>
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-display text-[#FFC400] font-bold uppercase">MESSAGE / DETAILS *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you'd like to know..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#050505] border border-white/15 text-white text-sm font-sans placeholder:text-neutral-400 focus:outline-none focus:border-[#E60012]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-sm tracking-wider font-bold py-4 rounded-xl shadow-[0_8px_30px_rgba(230,0,18,0.25)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>SEND ENQUIRY TO COMMITTEE</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
