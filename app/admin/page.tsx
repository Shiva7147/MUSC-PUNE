'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Html5Qrcode } from 'html5-qrcode';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  ShieldCheck as ShieldIcon,
  QrCode as QrIcon,
  Calendar as CalIcon,
  Camera as CamIcon,
  Search as SearchIcon,
  CheckCircle2 as CheckIcon,
  AlertTriangle as AlertIcon,
  XCircle as XIcon,
  Plus as PlusIcon,
  Download as DownIcon,
  Lock as LockIcon,
  Sparkles as SparkIcon,
  Upload as UploadIcon,
  Layers as LayersIcon,
} from 'lucide-react';
import {
  getTicketStore,
  verifyTicketScan,
  getScreeningsStore,
  addScreeningToStore,
  updateScreeningPhase,
  getGalleryStore,
  addGalleryItemToStore,
  subscribeStore,
  AdminTicketRecord,
} from '@/lib/ticketStore';
import { Screening, GalleryItem } from '@/lib/types';

export default function AdminDashboardPage() {
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'SCANNER' | 'SCREENINGS' | 'GALLERY' | 'LEDGER'>('SCANNER');

  // Scanner states
  const [manualCode, setManualCode] = useState('');
  const [scanResult, setScanResult] = useState<{
    status: 'VALID' | 'ALREADY_USED' | 'INVALID' | 'IDLE';
    ticket?: AdminTicketRecord;
    checkedInAt?: string;
  }>({ status: 'IDLE' });
  const [cameraActive, setCameraActive] = useState(false);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  // Store data states
  const [tickets, setTickets] = useState<AdminTicketRecord[]>([]);
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);

  // New item form states
  const [newScreening, setNewScreening] = useState<Partial<Screening>>({
    matchTitle: '',
    competition: 'Premier League',
    date: '',
    time: '09:00 PM IST',
    venueName: 'BIRA 91 Taproom — The Mills',
    price: 350,
    activePhaseName: 'PHASE 1 - EARLY BIRD',
    status: 'UPCOMING',
  });

  const [newGal, setNewGal] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'Screenings',
    imageUrl: '',
    location: 'BIRA 91 Taproom, The Mills',
    caption: '',
  });

  // Sync state on load and on store changes
  const refreshStoreData = () => {
    setTickets(getTicketStore());
    setScreenings(getScreeningsStore());
    setGalleryList(getGalleryStore());
  };

  useEffect(() => {
    refreshStoreData();
    const unsubscribe = subscribeStore(refreshStoreData);
    return () => {
      unsubscribe();
    };
  }, []);

  // Handle PIN Login
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1999' || pinInput === '2011' || pinInput === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect Admin PIN. Try 1999 or 2011.');
    }
  };

  // Start Camera Scanner
  const startCameraScanner = async () => {
    try {
      if (html5QrCodeRef.current) {
        try {
          await html5QrCodeRef.current.stop();
        } catch {
          // ignore
        }
      }

      const scanner = new Html5Qrcode('qr-reader-viewport');
      html5QrCodeRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          handleVerifyCode(decodedText);
        },
        () => {
          // ignore scan frame errors
        }
      );
      setCameraActive(true);
    } catch (err) {
      console.error('Camera Scanner Error:', err);
      alert('Unable to access live camera. Please allow camera permissions or use the "SCAN IMAGE FILE" option below.');
    }
  };

  // Stop Camera Scanner
  const stopCameraScanner = async () => {
    if (html5QrCodeRef.current && cameraActive) {
      try {
        await html5QrCodeRef.current.stop();
        setCameraActive(false);
      } catch (err) {
        console.error('Stop camera error:', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current && cameraActive) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, [cameraActive]);

  // Execute Ticket Verification Logic
  const handleVerifyCode = (codeToTest: string) => {
    if (!codeToTest.trim()) return;
    const res = verifyTicketScan(codeToTest, 'Gate Admin 1');
    setScanResult(res);
  };

  // Handle File Upload QR Scanning
  const handleFileUploadScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const html5QrCode = new Html5Qrcode('qr-file-helper');
      const decodedText = await html5QrCode.scanFile(file, true);
      handleVerifyCode(decodedText);
    } catch (err) {
      console.error('File scan error:', err);
      alert('Could not decode a valid QR code from the uploaded image file. Try another image or use manual entry.');
    }
  };

  // Export Tickets to CSV
  const exportTicketsToCSV = () => {
    if (tickets.length === 0) {
      alert('No tickets generated yet to export!');
      return;
    }

    const headers = ['Ticket ID', 'Match Title', 'Holder Name', 'Email', 'Phone', 'Quantity', 'Amount', 'Checked In', 'Checked In At'];
    const rows = tickets.map((t) => [
      t.ticketId,
      `"${t.matchTitle}"`,
      `"${t.userName}"`,
      t.userEmail,
      t.userPhone,
      t.quantity,
      t.totalAmount,
      t.checkedIn ? 'YES' : 'NO',
      t.checkedInAt || 'N/A',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MUSC-Pune-Tickets-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handlers for dynamic admin additions
  const handleCreateScreening = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScreening.matchTitle || !newScreening.date) return;
    const initialPrice = Number(newScreening.price) || 350;
    const item: Screening = {
      id: `screening-${Date.now()}`,
      matchTitle: newScreening.matchTitle,
      competition: newScreening.competition || 'Premier League',
      homeTeam: 'Manchester United',
      awayTeam: 'Opponent',
      homeLogo: '🔴',
      awayLogo: '🔴',
      date: newScreening.date,
      time: newScreening.time || '09:00 PM IST',
      venueName: newScreening.venueName || 'BIRA 91 Taproom — The Mills',
      venueAddress: 'THE MILLS, Pune',
      venueArea: 'THE MILLS / Central Pune',
      price: initialPrice,
      activePhaseName: 'PHASE 1 - EARLY BIRD',
      phases: [
        { phaseName: 'PHASE 1 - EARLY BIRD', price: initialPrice, isActive: true },
        { phaseName: 'PHASE 2 - REGULAR PASS', price: initialPrice + 50, isActive: false },
        { phaseName: 'PHASE 3 - FINAL RELEASE', price: initialPrice + 100, isActive: false },
      ],
      featured: false,
      status: 'UPCOMING',
      description: 'Official MUSC Pune screening night at BIRA 91 Taproom, The Mills.',
      gateOpening: '07:30 PM IST',
      inclusions: ['Guaranteed Entry to Screening Arena', 'Redeemable Cover Voucher'],
      rules: ['Digital QR Ticket Pass required for gate entry'],
    };
    addScreeningToStore(item);
    setNewScreening({ matchTitle: '', competition: 'Premier League', date: '', price: 350 });
    alert('New screening with phase release system created successfully!');
  };

  const handlePhaseChange = (screeningId: string, phaseName: string, price: number) => {
    updateScreeningPhase(screeningId, phaseName, price);
  };

  const handleCreateGal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGal.title || !newGal.imageUrl) return;
    const item: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: newGal.title,
      category: (newGal.category as any) || 'Screenings',
      imageUrl: newGal.imageUrl,
      location: newGal.location || 'BIRA 91 Taproom, The Mills',
      date: new Date().toLocaleDateString(),
      caption: newGal.caption || newGal.title,
    };
    addGalleryItemToStore(item);
    setNewGal({ title: '', imageUrl: '', caption: '' });
    alert('New photo added to documentary gallery!');
  };

  // Stats
  const checkedInCount = tickets.filter((t) => t.checkedIn).length;

  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <Navbar />
      <div id="qr-file-helper" className="hidden" />

      <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-display text-[#E60012] font-bold tracking-wider uppercase mb-2">
              <ShieldIcon className="w-4 h-4 text-[#E60012]" />
              <span>ADMINISTRATOR CONTROL CENTER</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white uppercase">
              ADMIN <span className="text-[#E60012]">DASHBOARD & GATE SCANNER</span>
            </h1>
            <p className="text-xs text-white/60 font-sans mt-1">
              Live QR ticket verification, phase-wise ticket pricing releases & gallery management
            </p>
          </div>

          {isAuthenticated && (
            <div className="flex items-center gap-3">
              <span className="badge-united text-xs font-display px-3 py-1.5 rounded-lg font-bold">
                🟢 GATE ADMIN ACTIVE
              </span>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-xs font-display text-white/60 hover:text-[#E60012] underline uppercase"
              >
                LOCK ADMIN
              </button>
            </div>
          )}
        </div>

        {/* PIN Authentication Gate */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-16 px-8 glass-card rounded-3xl bg-[#171717] border border-white/10 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-[#050505] border border-[#E60012] text-[#E60012] mx-auto flex items-center justify-center">
              <LockIcon className="w-8 h-8" />
            </div>

            <div>
              <h2 className="font-display text-3xl font-bold text-white uppercase">ENTER ADMIN PASSCODE</h2>
              <p className="text-xs font-sans text-white/70 mt-1">
                Enter your 4-digit committee PIN to access the gate scanner & dashboard.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                required
                maxLength={8}
                placeholder="Enter PIN (e.g. 1999 or 2011)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3.5 text-center text-xl font-mono tracking-widest text-white focus:outline-none focus:border-[#E60012]"
              />

              <button
                type="submit"
                className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-sm tracking-wider font-bold py-4 rounded-xl shadow-[0_8px_30px_rgba(230,0,18,0.35)] transition-all uppercase"
              >
                UNLOCK ADMIN CONTROL CENTER
              </button>
            </form>
          </div>
        ) : (
          /* Main Authenticated Dashboard */
          <div className="space-y-8">
            {/* Admin Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
              <button
                onClick={() => setActiveTab('SCANNER')}
                className={`font-display text-xs sm:text-sm font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-all uppercase tracking-wider ${
                  activeTab === 'SCANNER'
                    ? 'bg-[#E60012] text-white shadow-lg'
                    : 'bg-[#171717] text-white/60 hover:text-white border border-white/10'
                }`}
              >
                <QrIcon className="w-4 h-4" />
                <span>📷 LIVE QR SCANNER</span>
              </button>

              <button
                onClick={() => setActiveTab('SCREENINGS')}
                className={`font-display text-xs sm:text-sm font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-all uppercase tracking-wider ${
                  activeTab === 'SCREENINGS'
                    ? 'bg-[#E60012] text-white shadow-lg'
                    : 'bg-[#171717] text-white/60 hover:text-white border border-white/10'
                }`}
              >
                <CalIcon className="w-4 h-4" />
                <span>🎟️ PHASE-WISE TICKET RELEASE ({screenings.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('GALLERY')}
                className={`font-display text-xs sm:text-sm font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-all uppercase tracking-wider ${
                  activeTab === 'GALLERY'
                    ? 'bg-[#E60012] text-white shadow-lg'
                    : 'bg-[#171717] text-white/60 hover:text-white border border-white/10'
                }`}
              >
                <CamIcon className="w-4 h-4" />
                <span>🖼️ GALLERY ({galleryList.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('LEDGER')}
                className={`font-display text-xs sm:text-sm font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-all uppercase tracking-wider ${
                  activeTab === 'LEDGER'
                    ? 'bg-[#E60012] text-white shadow-lg'
                    : 'bg-[#171717] text-white/60 hover:text-white border border-white/10'
                }`}
              >
                <SparkIcon className="w-4 h-4" />
                <span>📊 TICKET LEDGER ({tickets.length})</span>
              </button>
            </div>

            {/* TAB 1: LIVE QR SCANNER */}
            {activeTab === 'SCANNER' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Camera Viewport & Verification */}
                <div className="lg:col-span-7 glass-card rounded-3xl p-6 bg-[#171717] border border-white/10 space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-white uppercase">MATCHDAY GATE SCANNER</h2>
                      <p className="text-xs text-white/60 font-sans">Point camera at QR pass or upload a ticket image file</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {!cameraActive ? (
                        <button
                          onClick={startCameraScanner}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-display text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow"
                        >
                          <CamIcon className="w-4 h-4" />
                          <span>START CAMERA</span>
                        </button>
                      ) : (
                        <button
                          onClick={stopCameraScanner}
                          className="bg-red-600 hover:bg-red-700 text-white font-display text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow"
                        >
                          <XIcon className="w-4 h-4" />
                          <span>STOP CAMERA</span>
                        </button>
                      )}

                      <label className="bg-[#050505] hover:bg-black border border-white/20 text-white font-display text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow">
                        <UploadIcon className="w-4 h-4 text-[#E60012]" />
                        <span>SCAN IMAGE</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUploadScan}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* HTML5 Camera Viewport Box */}
                  <div className="relative aspect-video w-full bg-[#050505] rounded-2xl overflow-hidden border-2 border-dashed border-white/20 flex flex-col items-center justify-center p-2">
                    <div id="qr-reader-viewport" className="w-full h-full" />
                    {!cameraActive && (
                      <div className="text-center space-y-2 p-6">
                        <QrIcon className="w-16 h-16 text-[#E60012] mx-auto animate-pulse" />
                        <p className="text-xs font-sans text-white/70">
                          Click &quot;START CAMERA&quot; to scan passes live, or &quot;SCAN IMAGE&quot; to upload a saved ticket QR pass!
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Manual Entry Fallback */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <label className="text-xs font-display text-white/90 font-bold uppercase">
                      MANUAL ENTRY (TICKET ID OR PHONE NUMBER)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. MUSCPUN-849201 or 7276735140"
                        value={manualCode}
                        onChange={(e) => setManualCode(e.target.value)}
                        className="flex-1 bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-mono placeholder:text-neutral-400 focus:outline-none focus:border-[#E60012]"
                      />
                      <button
                        onClick={() => handleVerifyCode(manualCode)}
                        className="bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-1.5 shadow"
                      >
                        <SearchIcon className="w-4 h-4" />
                        <span>VERIFY</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Scan Result Visual Display */}
                <div className="lg:col-span-5 glass-card rounded-3xl p-6 bg-[#171717] border border-white/10 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white uppercase border-b border-white/10 pb-3">
                      GATE VERIFICATION RESULT
                    </h3>

                    {scanResult.status === 'IDLE' && (
                      <div className="py-16 text-center space-y-3">
                        <QrIcon className="w-12 h-12 text-white/20 mx-auto" />
                        <p className="text-xs text-white/50 font-sans">Awaiting QR scan or manual search...</p>
                      </div>
                    )}

                    {scanResult.status === 'VALID' && (
                      <div className="py-8 text-center space-y-4 animate-in fade-in duration-200 bg-emerald-950/40 p-6 rounded-2xl border border-emerald-500/50">
                        <CheckIcon className="w-20 h-20 text-emerald-400 mx-auto animate-bounce" />
                        <div>
                          <span className="bg-emerald-500 text-black text-xs font-display font-bold px-3 py-1 rounded uppercase tracking-wider">
                            🟢 ENTRY APPROVED (1ST TIME)
                          </span>
                          <h4 className="font-display text-3xl font-bold text-white mt-3">{scanResult.ticket?.userName}</h4>
                          <p className="text-xs text-emerald-300 font-mono mt-1">
                            {scanResult.ticket?.quantity} Pass(es) • {scanResult.ticket?.matchTitle}
                          </p>
                        </div>

                        <div className="text-left text-xs font-mono bg-[#050505] p-4 rounded-xl border border-white/10 space-y-1.5">
                          <div><strong>Ticket ID:</strong> {scanResult.ticket?.ticketId}</div>
                          <div><strong>Phone:</strong> {scanResult.ticket?.userPhone}</div>
                          <div><strong>Venue:</strong> {scanResult.ticket?.venue}</div>
                          <div><strong>Checked In At:</strong> {scanResult.checkedInAt}</div>
                        </div>
                      </div>
                    )}

                    {scanResult.status === 'ALREADY_USED' && (
                      <div className="py-8 text-center space-y-4 animate-in fade-in duration-200 bg-red-950/40 p-6 rounded-2xl border border-red-500/50">
                        <AlertIcon className="w-20 h-20 text-red-500 mx-auto animate-pulse" />
                        <div>
                          <span className="bg-red-600 text-white text-xs font-display font-bold px-3 py-1 rounded uppercase tracking-wider">
                            🔴 ALREADY CHECKED IN (INVALID RE-ENTRY)
                          </span>
                          <h4 className="font-display text-3xl font-bold text-white mt-3">{scanResult.ticket?.userName}</h4>
                          <p className="text-xs text-red-300 font-mono mt-1">
                            This QR code was already scanned at {scanResult.checkedInAt}
                          </p>
                        </div>

                        <div className="text-left text-xs font-mono bg-[#050505] p-4 rounded-xl border border-white/10 space-y-1.5 text-white/80">
                          <div><strong>Ticket ID:</strong> {scanResult.ticket?.ticketId}</div>
                          <div><strong>Phone:</strong> {scanResult.ticket?.userPhone}</div>
                          <div><strong>Scanned Previously At:</strong> {scanResult.checkedInAt}</div>
                        </div>
                      </div>
                    )}

                    {scanResult.status === 'INVALID' && (
                      <div className="py-12 text-center space-y-4 bg-amber-950/40 p-6 rounded-2xl border border-amber-500/50">
                        <XIcon className="w-20 h-20 text-amber-500 mx-auto" />
                        <div>
                          <span className="bg-amber-500 text-black text-xs font-display font-bold px-3 py-1 rounded uppercase tracking-wider">
                            ⚠️ TICKET NOT FOUND
                          </span>
                          <p className="text-xs text-amber-200 font-sans mt-3">
                            No matchday ticket found matching &quot;{manualCode}&quot;. Please verify the Ticket ID or phone number.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-between text-xs font-mono text-white/60">
                    <div>Live Gate Total: <strong>{checkedInCount} / {tickets.length} Checked In</strong></div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PHASE-WISE TICKET RELEASE CONTROL */}
            {activeTab === 'SCREENINGS' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Create Form */}
                <div className="lg:col-span-5 glass-card rounded-3xl p-6 bg-[#171717] border border-white/10 space-y-4">
                  <h3 className="font-display text-xl font-bold text-white uppercase border-b border-white/10 pb-3">
                    ADD NEW MATCHDAY SCREENING
                  </h3>

                  <form onSubmit={handleCreateScreening} className="space-y-4">
                    <div>
                      <label className="text-xs font-display text-white/90 font-bold uppercase">MATCH TITLE *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Manchester United vs Chelsea"
                        value={newScreening.matchTitle}
                        onChange={(e) => setNewScreening({ ...newScreening, matchTitle: e.target.value })}
                        className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-display text-white/90 font-bold uppercase">DATE *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sunday, May 10, 2026"
                          value={newScreening.date}
                          onChange={(e) => setNewScreening({ ...newScreening, date: e.target.value })}
                          className="w-full bg-[#050505] border border-white/15 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-display text-white/90 font-bold uppercase">STARTING PRICE (₹)</label>
                        <input
                          type="number"
                          value={newScreening.price}
                          onChange={(e) => setNewScreening({ ...newScreening, price: Number(e.target.value) })}
                          className="w-full bg-[#050505] border border-white/15 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-display text-white/90 font-bold uppercase">VENUE NAME</label>
                      <input
                        type="text"
                        value={newScreening.venueName}
                        onChange={(e) => setNewScreening({ ...newScreening, venueName: e.target.value })}
                        className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-sm font-bold py-3.5 rounded-xl shadow flex items-center justify-center gap-2 uppercase"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>PUBLISH SCREENING WITH PHASES</span>
                    </button>
                  </form>
                </div>

                {/* List & Phase Controller */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="font-display text-xl font-bold text-white uppercase flex items-center gap-2">
                      <LayersIcon className="w-5 h-5 text-[#E60012]" />
                      <span>LIVE SCREENINGS & PHASE RELEASES</span>
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {screenings.map((sc) => (
                      <div key={sc.id} className="glass-card p-6 rounded-3xl bg-[#171717] border border-white/10 space-y-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                          <div>
                            <div className="text-xs font-display text-[#E60012] font-bold uppercase">{sc.competition}</div>
                            <h4 className="font-display text-3xl font-bold text-white uppercase">{sc.matchTitle}</h4>
                            <div className="text-xs font-sans text-white/70 mt-0.5">
                              📍 {sc.venueName} • 📅 {sc.date}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-display text-white/60 uppercase">CURRENT TICKET PRICE</div>
                            <div className="font-display text-3xl font-bold text-[#E60012]">₹{sc.price}</div>
                            <span className="bg-[#050505] border border-[#E60012] text-[#E60012] text-[10px] font-display px-2 py-0.5 rounded font-bold uppercase">
                              {sc.activePhaseName || 'PHASE 1 LIVE'}
                            </span>
                          </div>
                        </div>

                        {/* Phase Selector Controls for Admin */}
                        <div className="space-y-2">
                          <label className="text-xs font-display text-white/90 font-bold uppercase tracking-wider block">
                            ADMIN: SWITCH ACTIVE TICKET RELEASE PHASE & PRICE
                          </label>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {(sc.phases || [
                              { phaseName: 'PHASE 1 - EARLY BIRD', price: sc.price, isActive: true },
                              { phaseName: 'PHASE 2 - REGULAR PASS', price: sc.price + 50, isActive: false },
                              { phaseName: 'PHASE 3 - FINAL RELEASE', price: sc.price + 100, isActive: false }
                            ]).map((phase, pIdx) => (
                              <button
                                key={pIdx}
                                type="button"
                                onClick={() => handlePhaseChange(sc.id, phase.phaseName, phase.price)}
                                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                                  sc.activePhaseName === phase.phaseName || (pIdx === 0 && !sc.activePhaseName)
                                    ? 'bg-[#E60012]/15 border-[#E60012] text-white shadow-lg'
                                    : 'bg-[#050505] border-white/15 text-white/70 hover:border-white/30 hover:text-white'
                                }`}
                              >
                                <div className="text-[10px] font-display font-bold uppercase tracking-wider text-white/80">
                                  {phase.phaseName}
                                </div>
                                <div className="font-display text-xl font-bold text-white mt-1">
                                  ₹{phase.price}
                                </div>
                                <div className="text-[9px] font-sans mt-1 uppercase font-bold text-[#E60012]">
                                  {sc.activePhaseName === phase.phaseName || (pIdx === 0 && !sc.activePhaseName) ? '🟢 CURRENTLY LIVE' : 'ACTIVATE PHASE'}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: GALLERY SETTINGS */}
            {activeTab === 'GALLERY' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 glass-card rounded-3xl p-6 bg-[#171717] border border-white/10 space-y-4">
                  <h3 className="font-display text-xl font-bold text-white uppercase border-b border-white/10 pb-3">
                    ADD PHOTO TO DOCUMENTARY ARCHIVE
                  </h3>

                  <form onSubmit={handleCreateGal} className="space-y-4">
                    <div>
                      <label className="text-xs font-display text-white/90 font-bold uppercase">PHOTO TITLE *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pune Reds Victory Roar"
                        value={newGal.title}
                        onChange={(e) => setNewGal({ ...newGal, title: e.target.value })}
                        className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-display text-white/90 font-bold uppercase">IMAGE URL (CLOUDINARY OR DIRECT LINK) *</label>
                      <input
                        type="url"
                        required
                        placeholder="https://res.cloudinary.com/..."
                        value={newGal.imageUrl}
                        onChange={(e) => setNewGal({ ...newGal, imageUrl: e.target.value })}
                        className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-sm font-bold py-3.5 rounded-xl shadow flex items-center justify-center gap-2 uppercase"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>ADD PHOTO TO GALLERY</span>
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-display text-xl font-bold text-white uppercase border-b border-white/10 pb-3">
                    GALLERY ARCHIVE ({galleryList.length} PHOTOS)
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {galleryList.slice(0, 9).map((g) => (
                      <div key={g.id} className="relative aspect-square rounded-xl overflow-hidden bg-black border border-white/10 group">
                        <Image src={g.imageUrl} alt={g.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-2 flex items-end">
                          <span className="text-[10px] font-display text-white truncate font-bold">{g.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: TICKET LEDGER & CSV EXPORT */}
            {activeTab === 'LEDGER' && (
              <div className="space-y-6 glass-card rounded-3xl p-6 bg-[#171717] border border-white/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white uppercase">MATCHDAY TICKET LEDGER</h2>
                    <p className="text-xs text-white/60 font-sans">
                      Complete real-time log of generated digital QR ticket passes & entry statuses
                    </p>
                  </div>

                  <button
                    onClick={exportTicketsToCSV}
                    className="bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 shadow"
                  >
                    <DownIcon className="w-4 h-4" />
                    <span>EXPORT TICKETS (CSV)</span>
                  </button>
                </div>

                {tickets.length === 0 ? (
                  <div className="py-12 text-center text-xs text-white/50 font-sans">
                    No tickets booked yet. Generate a test booking on the website to view ledger records!
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans border-collapse">
                      <thead>
                        <tr className="border-b border-white/15 text-[#E60012] font-display uppercase tracking-wider">
                          <th className="py-3 px-3">TICKET ID</th>
                          <th className="py-3 px-3">HOLDER NAME</th>
                          <th className="py-3 px-3">PHONE</th>
                          <th className="py-3 px-3">MATCH</th>
                          <th className="py-3 px-3">QTY</th>
                          <th className="py-3 px-3">TOTAL</th>
                          <th className="py-3 px-3">GATE STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 text-white/80 font-mono">
                        {tickets.map((t) => (
                          <tr key={t.ticketId} className="hover:bg-white/5 transition-colors">
                            <td className="py-3 px-3 font-bold text-white">{t.ticketId}</td>
                            <td className="py-3 px-3 font-sans text-white font-semibold">{t.userName}</td>
                            <td className="py-3 px-3">{t.userPhone}</td>
                            <td className="py-3 px-3 font-sans truncate max-w-[150px]">{t.matchTitle}</td>
                            <td className="py-3 px-3">{t.quantity}</td>
                            <td className="py-3 px-3 text-[#E60012] font-bold">₹{t.totalAmount}</td>
                            <td className="py-3 px-3">
                              {t.checkedIn ? (
                                <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-display px-2 py-0.5 rounded font-bold uppercase">
                                  CHECKED IN ({t.checkedInAt?.slice(11, 16)})
                                </span>
                              ) : (
                                <span className="bg-amber-950 text-amber-300 border border-amber-500/40 text-[10px] font-display px-2 py-0.5 rounded font-bold uppercase">
                                  UNCLAIMED
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
