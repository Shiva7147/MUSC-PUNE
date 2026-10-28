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
  ShoppingBag as ShoppingIcon,
  DollarSign as PriceIcon,
  Trash2 as TrashIcon,
  Pencil as EditIcon,
  Clock as ClockIcon,
  X as CloseIcon,
} from 'lucide-react';
import {
  getTicketStore,
  verifyTicketScan,
  verifyTicketScanAsync,
  fetchRemoteTicketsAsync,
  getScreeningsStore,
  addScreeningToStore,
  updateScreeningInStore,
  deleteScreeningFromStore,
  updateScreeningPrice,
  getGalleryStore,
  addGalleryItemToStore,
  deleteGalleryItemFromStore,
  getProductsStore,
  addProductToStore,
  updateProductInStore,
  deleteProductFromStore,
  fetchScreeningsRemoteAsync,
  fetchProductsRemoteAsync,
  fetchGalleryRemoteAsync,
  fetchConfigRemoteAsync,
  getMembershipConfigStore,
  updateMembershipConfigStore,
  getTourConfigStore,
  updateTourConfigStore,
  getSiteTaxConfigStore,
  updateSiteTaxConfigStore,
  getProductOrdersStore,
  approveDebitedPayment,
  toggleCheckInTicket,
  updateTicketInStore,
  deleteTicketFromStore,
  subscribeStore,
  AdminTicketRecord,
} from '@/lib/ticketStore';
import { Screening, GalleryItem, Product, MembershipConfig, TourConfig, SiteTaxConfig, ProductOrderRecord } from '@/lib/types';

interface ImageUploadOrUrlFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  aspectRatio?: 'square' | 'video';
}

function ImageUploadOrUrlField({
  label,
  value,
  onChange,
  required = false,
  aspectRatio = 'square',
}: ImageUploadOrUrlFieldProps) {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('File size exceeds 8MB limit. Please select a smaller image.');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          onChange(data.url);
          setIsUploading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('UploadThing upload failed, falling back to local reader:', err);
    }

    // Fallback to local Data URL
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-display text-white/90 font-bold uppercase block">
          {label} {required && '*'}
        </label>
        <div className="inline-flex rounded-lg bg-[#050505] p-0.5 border border-white/10 text-[10px] font-display">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              mode === 'upload' ? 'bg-[#E60012] text-white font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            Direct Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              mode === 'url' ? 'bg-[#E60012] text-white font-bold' : 'text-white/60 hover:text-white'
            }`}
          >
            Image Link / URL
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div className="space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className="w-full bg-[#050505] hover:bg-black border-2 border-dashed border-white/20 hover:border-[#E60012] rounded-xl p-4 text-center cursor-pointer transition-colors space-y-1"
          >
            <UploadIcon className={`w-6 h-6 text-[#E60012] mx-auto ${isUploading ? 'animate-bounce' : ''}`} />
            <p className="text-xs font-display font-bold text-white uppercase">
              {isUploading ? 'Uploading to UploadThing CDN...' : 'Click to browse or upload image directly'}
            </p>
            <p className="text-[10px] text-white/50 font-sans">
              {isUploading ? 'Please wait a moment while your image is secured on CDN' : 'Fast UploadThing CDN • Supports JPG, PNG, WEBP, SVG'}
            </p>
          </div>
        </div>
      ) : (
        <input
          type="url"
          required={required && !value}
          placeholder="https://res.cloudinary.com/... or direct image link"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
        />
      )}

      {/* Live Preview with established Aspect Ratio & Clear button */}
      {value && (
        <div className="relative rounded-xl overflow-hidden border border-white/20 bg-black mt-2 group p-1.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={aspectRatio === 'square' ? 'relative w-16 h-16 rounded-lg overflow-hidden bg-black shrink-0 border border-white/15' : 'relative w-28 h-16 rounded-lg overflow-hidden bg-black shrink-0 border border-white/15'}>
              <Image
                src={value}
                alt="Preview"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="text-[11px] font-sans text-white/70 truncate max-w-[200px] sm:max-w-[280px]">
              <span className="text-emerald-400 font-display font-bold block">✓ Image Ready & Ratio Set</span>
              <span className="truncate block opacity-60">{value.startsWith('data:') ? 'Uploaded image file' : value}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="bg-red-950 hover:bg-red-900 border border-red-500/50 text-red-300 text-[10px] font-display font-bold px-2.5 py-1.5 rounded-lg shadow cursor-pointer uppercase shrink-0"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

interface AdminAccount {
  email: string;
  pin: string;
  role: 'SUPER_ADMIN' | 'GATE_MARSHAL';
  displayName: string;
}

const AUTHORIZED_ACCOUNTS: AdminAccount[] = [
  {
    email: 'ebrahimred@gmail.com',
    pin: '1999',
    role: 'SUPER_ADMIN',
    displayName: 'Ebrahim Kondkar (Super Admin)',
  },
  {
    email: 'ebrahimmred@gmail.com',
    pin: '1999',
    role: 'SUPER_ADMIN',
    displayName: 'Ebrahim Kondkar (Super Admin)',
  },
  {
    email: 'ibrahimred@gmail.com',
    pin: '1999',
    role: 'SUPER_ADMIN',
    displayName: 'Ebrahim Kondkar (Super Admin)',
  },
  {
    email: 'manunitedpune@gmail.com',
    pin: '1999',
    role: 'SUPER_ADMIN',
    displayName: 'Committee HQ (Super Admin)',
  },
  {
    email: 'admin',
    pin: '1999',
    role: 'SUPER_ADMIN',
    displayName: 'Super Admin',
  },
  {
    email: 'gate1@manutdpune.com',
    pin: '1101',
    role: 'GATE_MARSHAL',
    displayName: 'Gate 1 Marshal (North Turnstile)',
  },
  {
    email: 'gate2@manutdpune.com',
    pin: '1102',
    role: 'GATE_MARSHAL',
    displayName: 'Gate 2 Marshal (South Turnstile)',
  },
  {
    email: 'gate3@manutdpune.com',
    pin: '1103',
    role: 'GATE_MARSHAL',
    displayName: 'Gate 3 Marshal (Taproom Entry)',
  },
];

export default function AdminDashboardPage() {
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'SUPER_ADMIN' | 'GATE_MARSHAL'>('SUPER_ADMIN');
  const [userDisplayName, setUserDisplayName] = useState<string>('Super Admin');
  const [activeTab, setActiveTab] = useState<'SCANNER' | 'SCREENINGS' | 'PRODUCTS' | 'GALLERY' | 'LEDGER' | 'TOURS'>('SCANNER');
  const [siteTaxConfig, setSiteTaxConfig] = useState<SiteTaxConfig>(getSiteTaxConfigStore());
  const [productOrders, setProductOrders] = useState<ProductOrderRecord[]>([]);
  const [ledgerSubTab, setLedgerSubTab] = useState<'TICKETS' | 'MERCH_ORDERS'>('TICKETS');

  // Scanner states
  const [manualCode, setManualCode] = useState('');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<{
    status: 'VALID' | 'ALREADY_USED' | 'INVALID' | 'WRONG_MATCH' | 'DEBIT_VERIFICATION_REQUIRED' | 'IDLE';
    ticket?: AdminTicketRecord;
    checkedInAt?: string;
    expectedMatchTitle?: string;
  }>({ status: 'IDLE' });
  const [selectedScreeningId, setSelectedScreeningId] = useState<string>('');
  const [gateSearchQuery, setGateSearchQuery] = useState('');
  const [gateFilter, setGateFilter] = useState<'ALL' | 'CHECKED_IN' | 'AWAITING'>('ALL');
  const [cameraActive, setCameraActive] = useState(false);
  const [scanPaused, setScanPaused] = useState(false);
  const isProcessingScanRef = useRef(false);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  // Store data states
  const [tickets, setTickets] = useState<AdminTicketRecord[]>([]);
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [membershipConfig, setMembershipConfig] = useState<MembershipConfig>(getMembershipConfigStore());
  const [tourConfig, setTourConfig] = useState<TourConfig>(getTourConfigStore());
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [editingScreening, setEditingScreening] = useState<Screening | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingTicket, setEditingTicket] = useState<AdminTicketRecord | null>(null);

  // New item form states
  const [newScreening, setNewScreening] = useState<Partial<Screening>>({
    matchTitle: '',
    competition: 'Premier League',
    date: '',
    time: '09:00 PM IST',
    venueName: 'BIRA 91 Taproom, The Mills',
    price: 350,
    redeemableAmount: 250,
    entryFeeAmount: 100,
    status: 'UPCOMING',
    capacity: 250,
    remainingSeats: 250,
  });

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'Apparel',
    price: 799,
    originalPrice: 999,
    stockCount: 50,
    taxRate: 0.18,
    platformFeeRate: 0.03,
    image: '',
    description: '',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    badge: 'NEW ARRIVAL',
  });

  const [newGal, setNewGal] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'Screenings',
    imageUrl: '',
    location: 'BIRA 91 Taproom, The Mills',
    caption: '',
  });

  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;
  const editingProductRef = useRef(editingProduct);
  editingProductRef.current = editingProduct;
  const editingScreeningRef = useRef(editingScreening);
  editingScreeningRef.current = editingScreening;

  // Sync state on load and on store changes
  const refreshStoreData = () => {
    setTickets(getTicketStore());
    setProductOrders(getProductOrdersStore());
    if (!editingScreeningRef.current) {
      setScreenings(getScreeningsStore());
    }
    if (!editingProductRef.current) {
      setProducts(getProductsStore());
    }
    setMembershipConfig(getMembershipConfigStore());
    setSiteTaxConfig(getSiteTaxConfigStore());
    if (activeTabRef.current !== 'TOURS') {
      setTourConfig(getTourConfigStore());
    }
    setGalleryList(getGalleryStore());
  };

  useEffect(() => {
    refreshStoreData();
    // Fetch latest remote state from server & Supabase on mount
    fetchConfigRemoteAsync().then((res) => {
      if (res.membership) setMembershipConfig(res.membership);
      if (activeTabRef.current !== 'TOURS' && res.tour) setTourConfig(res.tour);
      if (res.taxConfig) setSiteTaxConfig(res.taxConfig);
    });
    fetchScreeningsRemoteAsync().then((sc) => {
      if (sc && sc.length > 0 && !editingScreeningRef.current) setScreenings(sc);
    });
    fetchProductsRemoteAsync().then((pr) => {
      if (pr && pr.length > 0 && !editingProductRef.current) setProducts(pr);
    });
    fetchGalleryRemoteAsync().then((gl) => {
      if (gl && gl.length > 0) setGalleryList(gl);
    });
    fetchRemoteTicketsAsync().then((remote) => {
      if (remote && remote.length > 0) setTickets(remote);
    });

    // Check session auth on load
    if (typeof window !== 'undefined') {
      const savedAuth = sessionStorage.getItem('musc_admin_auth');
      const savedRole = sessionStorage.getItem('musc_admin_role') as 'SUPER_ADMIN' | 'GATE_MARSHAL';
      const savedName = sessionStorage.getItem('musc_admin_name');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
        if (savedRole) setUserRole(savedRole);
        if (savedName) setUserDisplayName(savedName);
      }
    }

    const unsubscribe = subscribeStore(refreshStoreData);
    return () => {
      unsubscribe();
    };
  }, []);

  // Handle Admin Email + 4-Digit Passcode Login
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const cleanEmail = adminEmailInput.trim().toLowerCase();
    const cleanPin = pinInput.trim();

    // Find account by exact email or prefix match
    const account = AUTHORIZED_ACCOUNTS.find((acc) => {
      const emailMatches =
        acc.email.toLowerCase() === cleanEmail ||
        (cleanEmail === 'admin' && acc.email === 'admin') ||
        (cleanEmail === 'ebrahim' && acc.email.includes('ebrahim')) ||
        (cleanEmail === 'ibrahim' && acc.email.includes('ibrahim'));
      return emailMatches && acc.pin === cleanPin;
    });

    if (account) {
      setLoginError(null);
      setIsAuthenticated(true);
      setUserRole(account.role);
      setUserDisplayName(account.displayName);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('musc_admin_auth', 'true');
        sessionStorage.setItem('musc_admin_role', account.role);
        sessionStorage.setItem('musc_admin_name', account.displayName);
      }
      if (account.role === 'GATE_MARSHAL') {
        setActiveTab('SCANNER');
      }
    } else {
      setLoginError('Invalid login credentials. Please check your email and passcode PIN.');
    }
  };

  // Start Camera Scanner with multi-lens fallback and single-scan mutex
  const startCameraScanner = async () => {
    setScanPaused(false);
    setCameraError(null);
    isProcessingScanRef.current = false;
    try {
      if (html5QrCodeRef.current) {
        try {
          if (html5QrCodeRef.current.isScanning) {
            await html5QrCodeRef.current.stop();
          }
          await html5QrCodeRef.current.clear();
        } catch (cleanupErr) {
          console.warn('Camera pre-cleanup warning:', cleanupErr);
        }
        html5QrCodeRef.current = null;
      }

      const scanner = new Html5Qrcode('qr-reader-viewport');
      html5QrCodeRef.current = scanner;

      let cameraConfig: any = { facingMode: 'environment' };
      try {
        const cameras = await Html5Qrcode.getCameras();
        if (cameras && cameras.length > 0) {
          const backCam = cameras.find((c) => /back|rear|environment|wide/i.test(c.label)) || cameras[cameras.length - 1];
          if (backCam) {
            cameraConfig = backCam.id;
          }
        }
      } catch {
        // use default facingMode
      }

      const qrConfig = {
        fps: 12,
        qrbox: (w: number, h: number) => ({
          width: Math.floor(Math.min(w * 0.85, 320)),
          height: Math.floor(Math.min(h * 0.85, 320)),
        }),
      };

      const onScanSuccess = (decodedText: string) => {
        if (isProcessingScanRef.current) return;
        isProcessingScanRef.current = true;
        handleVerifyCode(decodedText);
      };

      try {
        await scanner.start(cameraConfig, qrConfig, onScanSuccess, () => {});
      } catch (firstErr) {
        console.warn('Camera ID start failed, trying fallback to environment facingMode:', firstErr);
        await scanner.start({ facingMode: 'environment' }, qrConfig, onScanSuccess, () => {});
      }

      setCameraActive(true);
    } catch (err: any) {
      console.error('Camera Scanner Error:', err);
      setCameraActive(false);
      setCameraError(
        'Camera could not be accessed. This can happen if permissions are blocked or when using an insecure HTTP address. You can always use the Phone / Ticket ID box below for instant verification!'
      );
    }
  };

  // Stop Camera Scanner safely
  const stopCameraScanner = async () => {
    isProcessingScanRef.current = true;
    if (html5QrCodeRef.current) {
      try {
        if (html5QrCodeRef.current.isScanning) {
          await html5QrCodeRef.current.stop();
        }
        await html5QrCodeRef.current.clear();
      } catch (err) {
        console.error('Stop camera error:', err);
      }
      setCameraActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current && cameraActive) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, [cameraActive]);

  // Execute Ticket Verification Logic (Auto-stops camera immediately to lock the single scan)
  const handleVerifyCode = async (codeToTest: string) => {
    if (!codeToTest.trim()) return;
    isProcessingScanRef.current = true;

    // Immediately stop camera scanner to avoid duplicate frame triggers
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
      } catch {
        // ignore
      }
      setCameraActive(false);
      setScanPaused(true);
    }

    const res = await verifyTicketScanAsync(codeToTest, 'Gate Admin 1');

    // Cross-check if ticket is for the selected gate screening
    const activeSc = screenings.find((s) => s.id === selectedScreeningId) || screenings[0];
    if (res.ticket && selectedScreeningId && selectedScreeningId !== 'ALL' && activeSc) {
      const ticketMatch = (res.ticket.matchTitle || '').toLowerCase();
      const currentMatch = (activeSc.matchTitle || '').toLowerCase();
      const isMatch =
        res.ticket.screeningId === activeSc.id ||
        ticketMatch.includes(currentMatch) ||
        currentMatch.includes(ticketMatch);

      if (!isMatch) {
        setScanResult({
          status: 'WRONG_MATCH',
          ticket: res.ticket,
          checkedInAt: res.checkedInAt,
          expectedMatchTitle: activeSc.matchTitle,
        });
        return;
      }
    }

    setScanResult(res);
  };

  // Reset and resume scanning for next supporter
  const handleApproveAndScanNext = async () => {
    setScanResult({ status: 'IDLE' });
    setManualCode('');
    isProcessingScanRef.current = false;
    await startCameraScanner();
  };

  // Manual Check-In toggle from inline gate ledger
  const handleToggleGateCheckIn = async (ticketId: string) => {
    await toggleCheckInTicket(ticketId, 'Gate Admin 1');
    const updated = await fetchRemoteTicketsAsync();
    if (updated) setTickets(updated);
  };

  // Instant Gate Approval & Check-In for Interrupted / Debited Payments
  const handleApproveDebitAndAdmit = async (ticket: AdminTicketRecord) => {
    await approveDebitedPayment(ticket.ticketId);
    await toggleCheckInTicket(ticket.ticketId, 'Gate Admin 1');
    const nowStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setScanResult({
      status: 'VALID',
      ticket: { ...ticket, paymentStatus: 'SUCCESS', checkedIn: true, checkedInAt: nowStr },
      checkedInAt: nowStr,
    });
    const updated = await fetchRemoteTicketsAsync();
    if (updated) setTickets(updated);
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

  // Export Tickets to CSV (overall or filtered by match title)
  const exportTicketsToCSV = (matchFilter?: string) => {
    let list = tickets;
    if (matchFilter && matchFilter !== 'ALL') {
      list = tickets.filter((t) => t.matchTitle.toLowerCase().includes(matchFilter.toLowerCase()));
    }

    if (list.length === 0) {
      alert('No tickets generated for this selection to export!');
      return;
    }

    const headers = [
      'Ticket ID',
      'Match Title',
      'Venue',
      'Match Date',
      'Kickoff Time',
      'Holder Name',
      'Email',
      'Phone',
      'Quantity',
      'Total Amount (INR)',
      'Payment Status',
      'Razorpay Payment ID',
      'Gate Checked In',
      'Checked In Time',
      'Booking Date',
    ];

    const rows = list.map((t) => [
      t.ticketId,
      `"${t.matchTitle.replace(/"/g, '""')}"`,
      `"${t.venue.replace(/"/g, '""')}"`,
      `"${t.date}"`,
      `"${t.time}"`,
      `"${t.userName.replace(/"/g, '""')}"`,
      t.userEmail,
      t.userPhone,
      t.quantity,
      t.totalAmount,
      t.paymentStatus || 'SUCCESS',
      t.paymentId || 'N/A',
      t.checkedIn ? 'YES' : 'NO',
      t.checkedInAt || 'N/A',
      `"${t.bookingDate}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const fileName = matchFilter && matchFilter !== 'ALL'
      ? `MUSC-Pune-${matchFilter.replace(/[^a-zA-Z0-9]/g, '-')}-Report.csv`
      : `MUSC-Pune-All-Tickets-${new Date().toISOString().slice(0, 10)}.csv`;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Merchandise & Member Orders to CSV
  const exportProductOrdersToCSV = () => {
    if (productOrders.length === 0) {
      alert('No merchandise or member orders placed yet!');
      return;
    }

    const headers = [
      'Order ID',
      'Type',
      'Order Date',
      'Customer Name',
      'Email',
      'Phone',
      'Shipping Address',
      'City',
      'Pincode',
      'Passport Name',
      'Items Summary',
      'Subtotal (INR)',
      'Tax Amount (INR)',
      'Platform Fee (INR)',
      'Total Amount (INR)',
      'Payment ID',
      'Payment Status',
      'Formspree Dispatched',
    ];

    const rows = productOrders.map((o) => {
      const addrStr = o.shippingAddress
        ? `${o.shippingAddress.address}, ${o.shippingAddress.city}, ${o.shippingAddress.state} - ${o.shippingAddress.pincode}`
        : '';
      const itemsStr = (o.items || []).map((i) => `${i.name} (${i.size}) x${i.quantity}`).join('; ');

      return [
        o.orderId,
        o.orderType,
        `"${o.createdAt}"`,
        `"${(o.customerName || '').replace(/"/g, '""')}"`,
        o.customerEmail,
        o.customerPhone,
        `"${addrStr.replace(/"/g, '""')}"`,
        `"${(o.shippingAddress?.city || '').replace(/"/g, '""')}"`,
        o.shippingAddress?.pincode || '',
        `"${(o.notes || '').replace(/"/g, '""')}"`,
        `"${itemsStr.replace(/"/g, '""')}"`,
        o.baseAmount,
        o.taxAmount,
        o.platformFee,
        o.totalAmount,
        o.paymentId || 'N/A',
        o.status,
        'YES',
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MUSC-Pune-Orders-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Quick adjust stock count for products
  const handleAdjustStock = async (product: Product, delta: number) => {
    const currentCount = product.stockCount !== undefined ? product.stockCount : 50;
    const newCount = Math.max(0, currentCount + delta);
    const updated = {
      ...product,
      stockCount: newCount,
      inStock: newCount > 0,
    };
    await updateProductInStore(updated);
    await fetchProductsRemoteAsync();
  };

  // Toggle in-stock status for products
  const handleToggleInStock = async (product: Product) => {
    const willBeInStock = !product.inStock;
    const updated = {
      ...product,
      inStock: willBeInStock,
      stockCount: willBeInStock ? (product.stockCount && product.stockCount > 0 ? product.stockCount : 25) : 0,
    };
    await updateProductInStore(updated);
    await fetchProductsRemoteAsync();
  };

  // Handlers for dynamic admin additions
  const handleCreateScreening = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScreening.matchTitle || !newScreening.date) return;
    const initialPrice = Number(newScreening.price) || 350;
    const redeemable = newScreening.redeemableAmount !== undefined ? Number(newScreening.redeemableAmount) : Math.max(0, initialPrice - 100);
    const entryFee = newScreening.entryFeeAmount !== undefined ? Number(newScreening.entryFeeAmount) : Math.max(0, initialPrice - redeemable);
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
      venueName: newScreening.venueName || 'BIRA 91 Taproom, The Mills',
      venueAddress: 'THE MILLS, Pune',
      venueArea: 'THE MILLS / Central Pune',
      price: initialPrice,
      redeemableAmount: redeemable,
      entryFeeAmount: entryFee,
      pricingSplitNotes: `₹${redeemable} Redeemable on F&B + ₹${entryFee} Entry Fee`,
      activePhaseName: 'PHASE 1 - REGULAR RELEASE',
      phases: [
        { phaseName: 'PHASE 1 - REGULAR RELEASE', price: initialPrice, isActive: true, redeemableAmount: redeemable, entryFeeAmount: entryFee } as any,
        { phaseName: 'PHASE 2 - ADVANCE TICKETS', price: initialPrice + 50, isActive: false, redeemableAmount: redeemable, entryFeeAmount: entryFee + 50 } as any,
        { phaseName: 'PHASE 3 - FINAL RELEASE', price: initialPrice + 100, isActive: false, redeemableAmount: redeemable, entryFeeAmount: entryFee + 100 } as any,
      ],
      featured: false,
      status: 'UPCOMING',
      description: 'Official MUSC Pune screening event at BIRA 91 Taproom, The Mills.',
      gateOpening: '07:30 PM IST',
      inclusions: ['Guaranteed Entry to Screening Arena', `₹${redeemable} Redeemable on Food & Beverages`, 'Official Matchday Atmosphere'],
      rules: ['Digital QR Ticket Pass required for gate entry'],
      capacity: Number(newScreening.capacity) || 250,
      remainingSeats: Number(newScreening.capacity) || 250,
    };
    await addScreeningToStore(item);
    await fetchScreeningsRemoteAsync();
    setNewScreening({ matchTitle: '', competition: 'Premier League', date: '', price: 350, redeemableAmount: 250, entryFeeAmount: 100, time: '09:00 PM IST', venueName: 'BIRA 91 Taproom, The Mills' });
    alert('New event / screening created and saved to database successfully!');
  };

  const handleUpdateScreening = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScreening || !editingScreening.matchTitle || !editingScreening.date) return;
    await updateScreeningInStore(editingScreening);
    await fetchScreeningsRemoteAsync();
    setEditingScreening(null);
    alert(`Screening event "${editingScreening.matchTitle}" updated and synced live across the entire website!`);
  };

  const handleUpdateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTicket) return;
    await updateTicketInStore(editingTicket);
    await fetchRemoteTicketsAsync();
    setEditingTicket(null);
    alert(`Ticket #${editingTicket.ticketId} updated successfully and saved to Supabase!`);
  };

  const handleDeleteTicket = async (ticketId: string) => {
    if (confirm(`Are you sure you want to permanently delete transaction #${ticketId}? This will remove the ticket from Supabase and the gate ledger.`)) {
      await deleteTicketFromStore(ticketId);
      await fetchRemoteTicketsAsync();
      alert(`Transaction #${ticketId} deleted successfully.`);
    }
  };

  const formatDateFromPicker = (isoDate: string): string => {
    if (!isoDate) return '';
    try {
      const parts = isoDate.split('-');
      if (parts.length === 3) {
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });
        }
      }
      return isoDate;
    } catch {
      return isoDate;
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.image) return;
    const item: Product = {
      id: `product-${Date.now()}`,
      name: newProduct.name,
      category: (newProduct.category as any) || 'Apparel',
      price: Number(newProduct.price) || 799,
      originalPrice: Number(newProduct.originalPrice) || 999,
      stockCount: Number(newProduct.stockCount) !== undefined ? Number(newProduct.stockCount) : 50,
      taxRate: Number(newProduct.taxRate) || 0.18,
      platformFeeRate: Number(newProduct.platformFeeRate) || 0.03,
      image: newProduct.image,
      description: newProduct.description || newProduct.name,
      availableSizes: newProduct.availableSizes || ['S', 'M', 'L', 'XL', 'XXL'],
      inStock: newProduct.inStock !== false,
      badge: newProduct.badge || 'NEW ARRIVAL',
      details: ['Official Supporter Merchandise', 'High-quality print & fabric'],
    };
    await addProductToStore(item);
    await fetchProductsRemoteAsync();
    setNewProduct({ name: '', image: '', price: 799, stockCount: 50, description: '' });
    alert('New product added and saved to shop database with inventory stock tracking!');
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name) return;
    await updateProductInStore(editingProduct);
    await fetchProductsRemoteAsync();
    setEditingProduct(null);
    alert(`Product "${editingProduct.name}" updated successfully across the website!`);
  };

  const handleSaveScreeningsTax = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteTaxConfigStore(siteTaxConfig);
    await fetchConfigRemoteAsync();
    alert('Screening Tax Rate and Screening Platform Fee saved and live across all match screening passes!');
  };

  const handleSaveMerchandiseTax = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteTaxConfigStore(siteTaxConfig);
    await fetchConfigRemoteAsync();
    alert('Merchandise Tax Rate and Platform Fee saved and live across shop checkout!');
  };

  const handleSaveMembershipTaxAndPricing = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateMembershipConfigStore(membershipConfig);
    await updateSiteTaxConfigStore(siteTaxConfig);
    await fetchConfigRemoteAsync();
    alert('Membership Size Pricing, Tax Rate, and Platform Fee saved and live across membership checkout!');
  };

  const handleSaveFormspreeEndpoint = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteTaxConfigStore(siteTaxConfig);
    await fetchConfigRemoteAsync();
    alert('Formspree order dispatch endpoint saved successfully!');
  };

  const handleSaveTourConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTourConfigStore(tourConfig);
    await updateSiteTaxConfigStore(siteTaxConfig);
    await fetchConfigRemoteAsync();
    alert('Old Trafford Group Trip configuration, price, tax rate, and platform fee saved live!');
  };

  const handleCreateGal = async (e: React.FormEvent) => {
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
    await addGalleryItemToStore(item);
    await fetchGalleryRemoteAsync();
    setNewGal({ title: '', imageUrl: '', caption: '' });
    alert('New photo added and saved to documentary gallery database!');
  };

  // Overall Stats
  const checkedInCount = tickets.filter((t) => t.checkedIn).length;

  // Active screening selection & live gate computations
  const activeGateScreening = screenings.find((s) => s.id === selectedScreeningId) || screenings[0];
  const activeGateScreeningId = selectedScreeningId || activeGateScreening?.id || 'ALL';

  const gateTickets = tickets.filter((t) => {
    if (activeGateScreeningId === 'ALL') return true;
    if (t.screeningId && t.screeningId === activeGateScreeningId) return true;
    if (activeGateScreening?.matchTitle && t.matchTitle) {
      const tm = t.matchTitle.toLowerCase();
      const sm = activeGateScreening.matchTitle.toLowerCase();
      return tm.includes(sm) || sm.includes(tm);
    }
    return false;
  });

  const gateCapacity = activeGateScreening?.capacity || 250;
  const gateTicketsSold = gateTickets.reduce((sum, t) => sum + (Number(t.quantity) || 1), 0);
  const gateCheckedInCount = gateTickets.filter((t) => t.checkedIn).reduce((sum, t) => sum + (Number(t.quantity) || 1), 0);
  const gateTurnstilePercent = gateTicketsSold > 0 ? Math.round((gateCheckedInCount / gateTicketsSold) * 100) : 0;

  const filteredGateAttendees = gateTickets.filter((t) => {
    const matchesFilter =
      gateFilter === 'ALL'
        ? true
        : gateFilter === 'CHECKED_IN'
        ? t.checkedIn
        : !t.checkedIn;

    if (!matchesFilter) return false;

    if (!gateSearchQuery.trim()) return true;
    const q = gateSearchQuery.toLowerCase();
    return (
      t.ticketId.toLowerCase().includes(q) ||
      t.userName.toLowerCase().includes(q) ||
      (t.userPhone && t.userPhone.toLowerCase().includes(q)) ||
      (t.userEmail && t.userEmail.toLowerCase().includes(q)) ||
      (t.paymentId && t.paymentId.toLowerCase().includes(q))
    );
  });

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
              ADMIN <span className="text-[#E60012]">DASHBOARD</span>
            </h1>
            <p className="text-xs text-white/60 font-sans mt-1">
              Live QR ticket verification, admin-controlled pricing, events, products & gallery management
            </p>
          </div>

          {isAuthenticated && (
            <div className="flex flex-wrap items-center gap-3">
              <span className={`text-xs font-display px-3 py-1.5 rounded-lg font-bold shadow ${
                userRole === 'SUPER_ADMIN' ? 'bg-[#E60012] text-white' : 'bg-emerald-600 text-white'
              }`}>
                {userRole === 'SUPER_ADMIN' ? '👑 SUPER ADMIN' : '🛡️ GATE MARSHAL'}: {userDisplayName}
              </span>
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  if (typeof window !== 'undefined') {
                    sessionStorage.removeItem('musc_admin_auth');
                    sessionStorage.removeItem('musc_admin_role');
                    sessionStorage.removeItem('musc_admin_name');
                  }
                }}
                className="text-xs font-display text-white/60 hover:text-[#E60012] underline uppercase cursor-pointer"
              >
                SWITCH / LOCK
              </button>
            </div>
          )}
        </div>

        {/* PIN & Email Authentication Gate */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-12 px-6 sm:px-8 glass-card rounded-3xl bg-[#171717] border-2 border-white/15 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-[#050505] border-2 border-[#E60012] text-[#E60012] mx-auto flex items-center justify-center shadow-lg">
              <LockIcon className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="bg-[#E60012]/15 text-[#E60012] border border-[#E60012]/30 text-[10px] font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                COMMITTEE GATE ACCESS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase mt-1">OFFICIAL ADMIN LOGIN</h2>
              <p className="text-xs font-sans text-white/70">
                Authorized credentials for Super Admin & Matchday Gate Marshals.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4 text-left">
              {loginError && (
                <div className="p-3.5 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 text-xs font-sans animate-in fade-in">
                  {loginError}
                </div>
              )}
              <div>
                <label className="block text-xs font-display text-white/90 font-bold uppercase mb-1.5">
                  ADMIN / MARSHAL EMAIL ADDRESS
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter authorized email address"
                  value={adminEmailInput}
                  onChange={(e) => setAdminEmailInput(e.target.value)}
                  className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3.5 text-sm font-sans text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#E60012]"
                  autoFocus
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-display text-white/90 font-bold uppercase">
                    PASSCODE PIN
                  </label>
                  <span className="text-[10px] font-mono text-white/40">SECURE ACCESS</span>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3.5 text-center text-2xl font-mono tracking-[0.5em] text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#E60012]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-sm tracking-wider font-bold py-4 rounded-xl shadow-[0_8px_30px_rgba(230,0,18,0.35)] transition-all uppercase cursor-pointer"
              >
                UNLOCK ADMIN CONTROL CENTER
              </button>
            </form>
          </div>
        ) : (
          /* Main Authenticated Dashboard */
          <div className="space-y-8">
            {/* Admin Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar flex-nowrap sm:flex-wrap">
              <button
                onClick={() => setActiveTab('SCANNER')}
                className={`font-display text-xs sm:text-sm font-bold px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl flex items-center gap-2 transition-all uppercase tracking-tight ${
                  activeTab === 'SCANNER'
                    ? 'bg-[#E60012] text-white shadow-lg'
                    : 'bg-[#171717] text-white/60 hover:text-white border border-white/10'
                }`}
              >
                <QrIcon className="w-4 h-4" />
                <span>📷 GATE SCANNER</span>
              </button>

              {userRole === 'SUPER_ADMIN' && (
                <>
                  <button
                    onClick={() => setActiveTab('SCREENINGS')}
                    className={`font-display text-xs sm:text-sm font-bold px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl flex items-center gap-2 transition-all uppercase tracking-tight ${
                      activeTab === 'SCREENINGS'
                        ? 'bg-[#E60012] text-white shadow-lg'
                        : 'bg-[#171717] text-white/60 hover:text-white border border-white/10'
                    }`}
                  >
                    <CalIcon className="w-4 h-4" />
                    <span>🎟️ ADD/MANAGE EVENTS ({screenings.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('PRODUCTS')}
                    className={`font-display text-xs sm:text-sm font-bold px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl flex items-center gap-2 transition-all uppercase tracking-tight ${
                      activeTab === 'PRODUCTS'
                        ? 'bg-[#E60012] text-white shadow-lg'
                        : 'bg-[#171717] text-white/60 hover:text-white border border-white/10'
                    }`}
                  >
                    <ShoppingIcon className="w-4 h-4" />
                    <span>🛍️ ADD/MANAGE PRODUCTS ({products.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('GALLERY')}
                    className={`font-display text-xs sm:text-sm font-bold px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl flex items-center gap-2 transition-all uppercase tracking-tight ${
                      activeTab === 'GALLERY'
                        ? 'bg-[#E60012] text-white shadow-lg'
                        : 'bg-[#171717] text-white/60 hover:text-white border border-white/10'
                    }`}
                  >
                    <CamIcon className="w-4 h-4" />
                    <span>🖼️ GALLERY ({galleryList.length})</span>
                  </button>
                </>
              )}

              <button
                onClick={() => setActiveTab('LEDGER')}
                className={`font-display text-xs sm:text-sm font-bold px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl flex items-center gap-2 transition-all uppercase tracking-tight ${
                  activeTab === 'LEDGER'
                    ? 'bg-[#E60012] text-white shadow-lg'
                    : 'bg-[#171717] text-white/60 hover:text-white border border-white/10'
                }`}
              >
                <SparkIcon className="w-4 h-4" />
                <span>📊 {userRole === 'GATE_MARSHAL' ? 'ATTENDEE ENTRY LIST' : `TICKET LEDGER (${tickets.length})`}</span>
              </button>

              {userRole === 'SUPER_ADMIN' && (
                <button
                  onClick={() => setActiveTab('TOURS')}
                  className={`font-display text-xs sm:text-sm font-bold px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl flex items-center gap-2 transition-all uppercase tracking-tight ${
                    activeTab === 'TOURS'
                      ? 'bg-[#E60012] text-white shadow-lg'
                      : 'bg-[#171717] text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  <ShieldIcon className="w-4 h-4" />
                  <span>✈️ OLD TRAFFORD TRIP MANAGER</span>
                </button>
              )}
            </div>

            {/* TAB 1: LIVE QR SCANNER */}
            {activeTab === 'SCANNER' && (
              <div className="space-y-8">
                {/* 1. MATCHDAY SCREENING GATE PICKER & LIVE METRICS BAR */}
                <div className="glass-card rounded-3xl p-6 sm:p-8 bg-[#171717] border border-white/10 space-y-6 shadow-2xl">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-display text-[#E60012] font-bold tracking-wider uppercase mb-1">
                        <CalIcon className="w-4 h-4 text-[#E60012]" />
                        <span>SELECT ACTIVE GATE SCREENING</span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                        {activeGateScreening?.matchTitle || 'ALL SCREENINGS'}
                      </h2>
                      <p className="text-xs text-white/60 font-sans mt-0.5">
                        {activeGateScreening?.venueName || 'Pune Venue'} • {activeGateScreening?.date || 'Matchday'}
                      </p>
                    </div>

                    {/* Quick Screening Dropdown */}
                    <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <label htmlFor="screening-picker" className="text-xs font-display text-white/70 uppercase font-bold shrink-0 self-center">
                        Active Screening:
                      </label>
                      <select
                        id="screening-picker"
                        value={activeGateScreeningId}
                        onChange={(e) => {
                          setSelectedScreeningId(e.target.value);
                          setScanResult({ status: 'IDLE' });
                        }}
                        className="bg-[#050505] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white font-display font-bold uppercase focus:outline-none focus:border-[#E60012] cursor-pointer"
                      >
                        {screenings.map((sc) => (
                          <option key={sc.id} value={sc.id}>
                            {sc.matchTitle} ({sc.competition || 'Match'})
                          </option>
                        ))}
                        <option value="ALL">All Screenings (Global Gate)</option>
                      </select>
                    </div>
                  </div>

                  {/* 4 Real-Time Gate Counters for Selected Screening */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
                    <div className="bg-[#050505] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 space-y-1">
                      <span className="text-[10px] font-display text-white/50 uppercase block font-bold truncate">🏟️ CAPACITY</span>
                      <div className="text-xl sm:text-3xl font-display font-bold text-white">{gateCapacity}</div>
                      <span className="text-[10px] text-white/40 font-mono block">Total Seats</span>
                    </div>

                    <div className="bg-[#050505] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 space-y-1">
                      <span className="text-[10px] font-display text-white/50 uppercase block font-bold truncate">🎟️ SOLD (LIVE)</span>
                      <div className="text-xl sm:text-3xl font-display font-bold text-[#FFC400]">{gateTicketsSold}</div>
                      <span className="text-[10px] text-white/40 font-mono block">Booked Passes</span>
                    </div>

                    <div className="bg-[#050505] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 space-y-1">
                      <span className="text-[10px] font-display text-white/50 uppercase block font-bold truncate">👥 ADMITTED</span>
                      <div className="text-xl sm:text-3xl font-display font-bold text-emerald-400">
                        {gateCheckedInCount} <span className="text-xs text-white/50 font-normal">/ {gateTicketsSold}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400/70 font-mono block">
                        {gateTicketsSold - gateCheckedInCount} Remaining
                      </span>
                    </div>

                    <div className="bg-[#050505] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 space-y-1">
                      <span className="text-[10px] font-display text-white/50 uppercase block font-bold truncate">📊 ATTENDANCE</span>
                      <div className="text-xl sm:text-3xl font-display font-bold text-[#E60012]">{gateTurnstilePercent}%</div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1">
                        <div
                          className="bg-[#E60012] h-full transition-all duration-500 rounded-full"
                          style={{ width: `${Math.min(100, gateTurnstilePercent)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. CAMERA SCANNER & REAL-TIME VERIFICATION RESULTS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Camera Viewport & Verification */}
                  <div className="lg:col-span-7 glass-card rounded-3xl p-6 bg-[#171717] border border-white/10 space-y-6">
                    {/* 1. High-Priority Manual Number / Ticket ID Input */}
                    <div className="bg-[#050505] p-5 rounded-2xl border-2 border-white/15 space-y-3 shadow-xl">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-display text-white font-bold uppercase tracking-wider flex items-center gap-2">
                          <SearchIcon className="w-4 h-4 text-[#E60012]" />
                          <span>INSTANT PHONE NUMBER / TICKET ID VERIFICATION</span>
                        </label>
                        <span className="text-[10px] text-white/50 font-mono">Mobile Quick-Entry</span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          placeholder="Enter 10-digit Phone (e.g. 7276735140) or Ticket ID"
                          value={manualCode}
                          onChange={(e) => setManualCode(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleVerifyCode(manualCode);
                            }
                          }}
                          className="flex-1 bg-[#171717] border border-white/20 rounded-xl px-4 py-3.5 text-base text-white font-mono placeholder:text-neutral-500 focus:outline-none focus:border-[#E60012]"
                        />
                        <button
                          onClick={() => handleVerifyCode(manualCode)}
                          className="bg-[#E60012] hover:bg-[#C40010] text-white font-display text-sm font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-1.5 shadow-lg cursor-pointer uppercase transition-all hover:scale-[1.02] shrink-0"
                        >
                          <SearchIcon className="w-4 h-4" />
                          <span>VERIFY PASS</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-white/60 font-sans">
                        💡 Supporters without a QR code can simply state their mobile number.
                      </p>
                    </div>

                    {/* Camera Scanner Header & Controls */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                      <div>
                        <h3 className="font-display text-xl font-bold text-white uppercase">LIVE CAMERA SCANNER</h3>
                        <p className="text-xs text-white/60 font-sans">Point phone camera at attendee QR pass</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {!cameraActive ? (
                          <button
                            onClick={startCameraScanner}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-display text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow cursor-pointer transition-all hover:scale-105"
                          >
                            <CamIcon className="w-4 h-4" />
                            <span>START CAMERA</span>
                          </button>
                        ) : (
                          <button
                            onClick={stopCameraScanner}
                            className="bg-red-600 hover:bg-red-700 text-white font-display text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow cursor-pointer"
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

                    {/* Camera Permission / Device Fallback Banner */}
                    {cameraError && (
                      <div className="bg-amber-950/80 border border-amber-500/50 p-4 rounded-2xl text-left space-y-2">
                        <div className="flex items-center gap-2 text-amber-300 font-display text-xs font-bold uppercase">
                          <AlertIcon className="w-4 h-4 text-amber-400" />
                          <span>CAMERA ACCESS NOTICE</span>
                        </div>
                        <p className="text-xs text-white/90 font-sans leading-relaxed">
                          {cameraError}
                        </p>
                        <div className="flex gap-2 pt-1">
                          <button
                            type="button"
                            onClick={startCameraScanner}
                            className="bg-amber-600 hover:bg-amber-500 text-white font-display text-xs font-bold px-3.5 py-1.5 rounded-xl uppercase cursor-pointer"
                          >
                            RETRY CAMERA
                          </button>
                        </div>
                      </div>
                    )}

                    {/* HTML5 Camera Viewport Box */}
                    <div className="relative min-h-[340px] sm:min-h-[420px] w-full bg-[#050505] rounded-2xl overflow-hidden border-2 border-dashed border-white/20 flex flex-col items-center justify-center p-2 shadow-2xl">
                      <div id="qr-reader-viewport" className="w-full h-full min-h-[340px] sm:min-h-[420px] [&_video]:max-w-full [&_video]:object-cover [&_canvas]:max-w-full" />
                      {!cameraActive && (
                        <div className="text-center space-y-4 p-6 my-auto z-10">
                          <QrIcon className="w-20 h-20 text-[#E60012] mx-auto animate-pulse" />
                          <div className="space-y-2">
                            {scanPaused ? (
                              <div className="space-y-2">
                                <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-xs font-display px-3 py-1 rounded-full font-bold uppercase inline-block">
                                  ✓ TICKET SCANNED — CAMERA AUTO-PAUSED
                                </span>
                                <p className="text-xs font-sans text-white/80">
                                  Camera paused to prevent duplicate scans. Admit supporter and click below to scan next!
                                </p>
                              </div>
                            ) : (
                              <p className="text-xs font-sans text-white/70">
                                Click &quot;START CAMERA&quot; or use the quick Phone / Ticket ID entry above!
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={handleApproveAndScanNext}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-display text-sm font-bold py-3.5 px-8 rounded-xl shadow-lg uppercase transition-all hover:scale-105 cursor-pointer min-h-[44px]"
                          >
                            {scanPaused ? '📷 APPROVE & SCAN NEXT SUPPORTER' : '📷 START LIVE CAMERA SCANNER'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Scan Result Visual Card */}
                  <div className="lg:col-span-5 glass-card rounded-3xl p-6 bg-[#171717] border border-white/10 flex flex-col justify-between space-y-6">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white uppercase border-b border-white/10 pb-3">
                        GATE VERIFICATION RESULT
                      </h3>

                      {scanResult.status === 'IDLE' && (
                        <div className="py-20 text-center space-y-3">
                          <QrIcon className="w-16 h-16 text-white/20 mx-auto" />
                          <p className="text-sm font-display font-bold uppercase text-white/60">AWAITING QR PASS SCAN</p>
                          <p className="text-xs text-white/40 font-sans max-w-xs mx-auto">
                            Point camera at ticket QR pass or enter supporter phone number above.
                          </p>
                        </div>
                      )}

                      {scanResult.status === 'VALID' && (
                        <div className="py-6 text-center space-y-4 animate-in fade-in duration-200 bg-emerald-950/60 p-6 rounded-2xl border-2 border-emerald-500 shadow-2xl">
                          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                            <CheckIcon className="w-10 h-10" />
                          </div>
                          <div>
                            <span className="bg-emerald-500 text-black text-xs font-display font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block shadow">
                              🟢 ENTRY APPROVED • 1ST TIME ENTRY
                            </span>
                            <h4 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2 leading-tight">
                              {scanResult.ticket?.userName}
                            </h4>
                            <p className="text-xs text-emerald-300 font-display font-bold mt-1 uppercase">
                              {scanResult.ticket?.matchTitle}
                            </p>
                          </div>

                          {/* Live Ticket Count / Breakdown Display */}
                          <div className="bg-black/70 border-2 border-emerald-500/50 rounded-2xl p-4 my-2 text-center space-y-1">
                            <div className="text-[11px] font-display text-emerald-400 font-bold uppercase tracking-wider">
                              PASS BREAKDOWN • TURNSTILE ADMITTED
                            </div>
                            <div className="font-display text-4xl sm:text-5xl font-bold text-white">
                              {scanResult.ticket?.quantity} <span className="text-xl sm:text-2xl text-emerald-400 font-bold">OF</span> {scanResult.ticket?.quantity}
                            </div>
                            <div className="text-xs text-white/90 font-bold uppercase">
                              {scanResult.ticket?.quantity === 1
                                ? '1 PERSON ADMITTED (SINGLE PASS)'
                                : `${scanResult.ticket?.quantity} PERSONS ADMITTED (GROUP PASS)`}
                            </div>
                          </div>

                          <div className="text-left text-xs font-mono bg-[#050505] p-4 rounded-xl border border-white/10 space-y-1.5">
                            <div><strong>Ticket ID:</strong> <span className="text-[#E60012] font-bold">{scanResult.ticket?.ticketId}</span></div>
                            <div><strong>Phone / WhatsApp:</strong> {scanResult.ticket?.userPhone}</div>
                            {scanResult.ticket?.paymentId && (
                              <div><strong>Razorpay Ref:</strong> <span className="text-emerald-400">{scanResult.ticket.paymentId}</span></div>
                            )}
                            <div><strong>Venue:</strong> {scanResult.ticket?.venue}</div>
                            <div><strong>Admitted Timestamp:</strong> {scanResult.checkedInAt}</div>
                          </div>

                          <button
                            type="button"
                            onClick={handleApproveAndScanNext}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-display text-base font-bold py-4 px-6 rounded-xl shadow-xl uppercase transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <CamIcon className="w-5 h-5" />
                            <span>APPROVE & SCAN NEXT SUPPORTER</span>
                          </button>
                        </div>
                      )}

                      {scanResult.status === 'ALREADY_USED' && (
                        <div className="py-6 text-center space-y-4 animate-in fade-in duration-200 bg-red-950/60 p-6 rounded-2xl border-2 border-red-500 shadow-2xl">
                          <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 text-red-500 mx-auto flex items-center justify-center animate-pulse">
                            <AlertIcon className="w-10 h-10" />
                          </div>
                          <div>
                            <span className="bg-red-600 text-white text-xs font-display font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block shadow">
                              🔴 ALREADY CHECKED IN (INVALID RE-ENTRY)
                            </span>
                            <h4 className="font-display text-3xl font-bold text-white mt-2">
                              {scanResult.ticket?.userName}
                            </h4>
                            <p className="text-xs text-red-300 font-sans mt-1">
                              This QR pass was already admitted at <strong>{scanResult.checkedInAt}</strong>
                            </p>
                          </div>

                          <div className="bg-black/70 border border-red-500/50 rounded-2xl p-4 text-center">
                            <div className="text-[11px] font-display text-red-400 font-bold uppercase tracking-wider">
                              PREVIOUS ADMISSION RECORD
                            </div>
                            <div className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
                              {scanResult.ticket?.quantity} <span className="text-lg text-red-400 font-bold">OF</span> {scanResult.ticket?.quantity} ALREADY INSIDE
                            </div>
                            <div className="text-xs text-red-300 font-sans mt-1">
                              All {scanResult.ticket?.quantity} pass holders for this booking were admitted earlier
                            </div>
                          </div>

                          <div className="text-left text-xs font-mono bg-[#050505] p-4 rounded-xl border border-white/10 space-y-1.5 text-white/80">
                            <div><strong>Ticket ID:</strong> {scanResult.ticket?.ticketId}</div>
                            <div><strong>Phone:</strong> {scanResult.ticket?.userPhone}</div>
                            <div><strong>First Admitted At:</strong> {scanResult.checkedInAt}</div>
                          </div>

                          <button
                            type="button"
                            onClick={handleApproveAndScanNext}
                            className="w-full bg-red-600 hover:bg-red-500 text-white font-display text-sm font-bold py-3.5 px-6 rounded-xl shadow-xl uppercase transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <CamIcon className="w-4 h-4" />
                            <span>SCAN NEXT SUPPORTER</span>
                          </button>
                        </div>
                      )}

                      {scanResult.status === 'DEBIT_VERIFICATION_REQUIRED' && (
                        <div className="py-6 text-center space-y-4 animate-in fade-in duration-200 bg-amber-950/70 p-6 rounded-2xl border-2 border-amber-500 shadow-2xl">
                          <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-400 mx-auto flex items-center justify-center animate-pulse">
                            <AlertIcon className="w-10 h-10 text-amber-400" />
                          </div>

                          <div>
                            <span className="bg-amber-500 text-black text-xs font-display font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block shadow">
                              ⚠️ DEBIT VERIFICATION REQUIRED
                            </span>
                            <h4 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2">
                              {scanResult.ticket?.userName}
                            </h4>
                            <p className="text-xs text-amber-300 font-sans mt-1">
                              Payment was interrupted during online booking. Verify bank debit SMS/app.
                            </p>
                          </div>

                          <div className="bg-black/70 border border-amber-500/50 rounded-2xl p-4 text-center">
                            <div className="text-[11px] font-display text-amber-400 font-bold uppercase tracking-wider">
                              PENDING BOOKING DETAILS
                            </div>
                            <div className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
                              {scanResult.ticket?.quantity} <span className="text-lg text-amber-400 font-bold">PASS(ES)</span>
                            </div>
                            <div className="text-xs text-amber-300 font-mono mt-1">
                              Total Amount: ₹{scanResult.ticket?.totalAmount}
                            </div>
                          </div>

                          <div className="bg-[#050505] p-4 rounded-xl border border-white/10 text-left text-xs font-mono space-y-1.5">
                            <div><strong>Holder:</strong> {scanResult.ticket?.userName}</div>
                            <div><strong>Phone:</strong> {scanResult.ticket?.userPhone}</div>
                            <div><strong>Match:</strong> {scanResult.ticket?.matchTitle}</div>
                            <div><strong>Ref ID:</strong> {scanResult.ticket?.ticketId}</div>
                          </div>

                          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 text-left leading-relaxed">
                            💡 <strong>Gate Instructions:</strong> Check supporter&apos;s phone for UPI / Bank debit SMS of ₹{scanResult.ticket?.totalAmount}. If debited, click below to admit them immediately!
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            <button
                              type="button"
                              onClick={handleApproveAndScanNext}
                              className="flex-1 bg-[#171717] hover:bg-black border border-white/20 text-white font-display text-xs font-bold py-3.5 rounded-xl uppercase cursor-pointer"
                            >
                              REJECT / NOT DEBITED
                            </button>

                            <button
                              type="button"
                              onClick={() => scanResult.ticket && handleApproveDebitAndAdmit(scanResult.ticket)}
                              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-display text-xs font-bold py-3.5 rounded-xl uppercase shadow-lg cursor-pointer"
                            >
                              ✓ VERIFY DEBIT & ADMIT ({scanResult.ticket?.quantity} PERSONS)
                            </button>
                          </div>
                        </div>
                      )}

                      {scanResult.status === 'WRONG_MATCH' && (
                        <div className="py-6 text-center space-y-4 animate-in fade-in duration-200 bg-amber-950/60 p-6 rounded-2xl border-2 border-amber-500 shadow-2xl">
                          <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-400 mx-auto flex items-center justify-center animate-pulse">
                            <AlertIcon className="w-10 h-10" />
                          </div>
                          <div>
                            <span className="bg-amber-500 text-black text-xs font-display font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block shadow">
                              ⚠️ TICKET IS FOR A DIFFERENT MATCH
                            </span>
                            <h4 className="font-display text-2xl font-bold text-white mt-2">
                              {scanResult.ticket?.userName}
                            </h4>
                            <p className="text-xs text-amber-200 font-sans mt-1">
                              Ticket belongs to: <strong>{scanResult.ticket?.matchTitle}</strong>
                            </p>
                            <p className="text-xs text-white/70 font-sans mt-0.5">
                              Gate is currently admitting for: <strong>{scanResult.expectedMatchTitle}</strong>
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            <button
                              type="button"
                              onClick={handleApproveAndScanNext}
                              className="flex-1 bg-[#171717] hover:bg-black border border-white/20 text-white font-display text-xs font-bold py-3 rounded-xl uppercase cursor-pointer"
                            >
                              REJECT & SCAN NEXT
                            </button>
                            <button
                              type="button"
                              onClick={async () => {
                                if (scanResult.ticket) {
                                  await handleToggleGateCheckIn(scanResult.ticket.ticketId);
                                }
                                await handleApproveAndScanNext();
                              }}
                              className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-display text-xs font-bold py-3 rounded-xl uppercase shadow cursor-pointer"
                            >
                              OVERRIDE & ADMIT
                            </button>
                          </div>
                        </div>
                      )}

                      {scanResult.status === 'INVALID' && (
                        <div className="py-8 text-center space-y-4 bg-red-950/40 p-6 rounded-2xl border-2 border-red-500/50 shadow-2xl animate-in fade-in duration-200">
                          <XIcon className="w-16 h-16 text-red-500 mx-auto" />
                          <div>
                            <span className="bg-red-600 text-white text-xs font-display font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block shadow">
                              ❌ TICKET NOT BOUGHT
                            </span>
                            <h4 className="font-display text-2xl font-bold text-white mt-2 uppercase">
                              NO TICKET RECORD FOUND
                            </h4>
                            <p className="text-xs sm:text-sm text-white/80 font-sans mt-2 max-w-sm mx-auto leading-relaxed">
                              No matchday tickets were purchased under &quot;<strong className="text-white font-mono">{manualCode || 'this number'}</strong>&quot; for this fixture.
                            </p>
                          </div>
                          <div className="text-xs text-white/60 font-mono bg-black/60 p-3 rounded-xl border border-white/10 max-w-xs mx-auto">
                            Please verify the phone number or ask supporter to purchase a pass online.
                          </div>
                          <button
                            type="button"
                            onClick={handleApproveAndScanNext}
                            className="bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xs font-bold py-3.5 px-6 rounded-xl uppercase transition-all shadow-lg cursor-pointer"
                          >
                            TRY AGAIN / SCAN NEXT
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex justify-between text-xs font-mono text-white/60">
                      <div>Screening Gate Attendance: <strong>{gateCheckedInCount} / {gateTicketsSold} Admitted</strong></div>
                      <div>Total All Events: {checkedInCount} / {tickets.length}</div>
                    </div>
                  </div>
                </div>

                {/* 3. DEDICATED INLINE ATTENDEE LEDGER FOR THIS SCREENING */}
                <div className="glass-card rounded-3xl p-6 sm:p-8 bg-[#171717] border border-white/10 space-y-6 shadow-2xl">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-5 gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-display text-[#E60012] font-bold tracking-wider uppercase mb-1">
                        <SparkIcon className="w-4 h-4 text-[#E60012]" />
                        <span>MATCHDAY TURNSTILE ATTENDEE LIST</span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
                        LIVE ATTENDEE LEDGER — {activeGateScreening?.matchTitle}
                      </h3>
                      <p className="text-xs text-white/60 font-sans mt-0.5">
                        Verify attendees, manually admit fans without QR codes, and export gate manifests
                      </p>
                    </div>

                    <button
                      onClick={() => exportTicketsToCSV(activeGateScreening?.matchTitle)}
                      className="bg-[#050505] hover:bg-black border border-white/20 text-white font-display text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow cursor-pointer shrink-0 uppercase"
                    >
                      <DownIcon className="w-4 h-4 text-[#E60012]" />
                      <span>EXPORT SCREENING CSV</span>
                    </button>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                    {/* Search Field */}
                    <div className="relative flex-1">
                      <SearchIcon className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="Search by attendee name, ticket ID, phone, or email..."
                        value={gateSearchQuery}
                        onChange={(e) => setGateSearchQuery(e.target.value)}
                        className="w-full bg-[#050505] border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#E60012] font-mono"
                      />
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setGateFilter('ALL')}
                        className={`text-xs font-display font-bold px-3.5 py-2 rounded-xl transition-all uppercase cursor-pointer ${
                          gateFilter === 'ALL'
                            ? 'bg-[#E60012] text-white shadow'
                            : 'bg-[#050505] text-white/60 hover:text-white border border-white/10'
                        }`}
                      >
                        ALL ({gateTickets.length})
                      </button>
                      <button
                        onClick={() => setGateFilter('CHECKED_IN')}
                        className={`text-xs font-display font-bold px-3.5 py-2 rounded-xl transition-all uppercase cursor-pointer ${
                          gateFilter === 'CHECKED_IN'
                            ? 'bg-emerald-600 text-white shadow'
                            : 'bg-[#050505] text-white/60 hover:text-white border border-white/10'
                        }`}
                      >
                        ADMITTED ({gateTickets.filter((t) => t.checkedIn).length})
                      </button>
                      <button
                        onClick={() => setGateFilter('AWAITING')}
                        className={`text-xs font-display font-bold px-3.5 py-2 rounded-xl transition-all uppercase cursor-pointer ${
                          gateFilter === 'AWAITING'
                            ? 'bg-amber-600 text-white shadow'
                            : 'bg-[#050505] text-white/60 hover:text-white border border-white/10'
                        }`}
                      >
                        AWAITING ({gateTickets.filter((t) => !t.checkedIn).length})
                      </button>
                    </div>
                  </div>

                  {/* Attendees Table */}
                  <div className="overflow-x-auto rounded-2xl border border-white/10">
                    <table className="w-full min-w-[620px] text-left text-xs font-sans">
                      <thead className="bg-[#050505] text-white/60 uppercase font-display border-b border-white/10">
                        <tr>
                          <th className="p-4">Ticket ID</th>
                          <th className="p-4">Supporter</th>
                          <th className="p-4">Phone</th>
                          <th className="p-4">Passes</th>
                          <th className="p-4">Gate Status</th>
                          <th className="p-4 text-right">Quick Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredGateAttendees.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-10 text-center text-white/50 font-sans">
                              No attendees matching your search for this screening.
                            </td>
                          </tr>
                        ) : (
                          filteredGateAttendees.map((t) => (
                            <tr key={t.ticketId} className="hover:bg-white/[0.02] transition-colors">
                              <td className="p-4 font-mono font-bold text-[#E60012] whitespace-nowrap">
                                {t.ticketId}
                              </td>
                              <td className="p-4">
                                <div className="font-bold text-white text-sm">{t.userName}</div>
                                <div className="text-[11px] text-white/50">{t.userEmail}</div>
                              </td>
                              <td className="p-4 font-mono text-white/80 whitespace-nowrap">
                                {t.userPhone || 'N/A'}
                              </td>
                              <td className="p-4 font-display font-bold text-white whitespace-nowrap">
                                {t.quantity} Pass{t.quantity > 1 ? 'es' : ''}
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                {t.checkedIn ? (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[11px] font-display font-bold uppercase">
                                    <CheckIcon className="w-3.5 h-3.5" />
                                    <span>Admitted @ {t.checkedInAt || 'Gate'}</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/40 text-[11px] font-display font-bold uppercase">
                                    <ClockIcon className="w-3.5 h-3.5" />
                                    <span>Awaiting Entry</span>
                                  </span>
                                )}
                              </td>
                              <td className="p-4 text-right whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => handleToggleGateCheckIn(t.ticketId)}
                                  className={`text-xs font-display font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer uppercase ${
                                    t.checkedIn
                                      ? 'bg-neutral-800 hover:bg-neutral-700 text-white/70 hover:text-white border border-white/10'
                                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
                                  }`}
                                >
                                  {t.checkedIn ? 'Undo Check-In' : 'Admit Supporter'}
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SCREENINGS TAB */}
            {activeTab === 'SCREENINGS' && (
              <div className="space-y-8">
                {/* Screening Tax & Platform Fee Slab */}
                <div className="glass-card rounded-3xl p-6 sm:p-8 bg-[#171717] border border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-display uppercase tracking-widest text-[#E60012] font-bold block">
                        SCREENINGS FINANCIAL SETTINGS
                      </span>
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-white uppercase mt-0.5">
                        SCREENING TAX & PLATFORM FEE SETTINGS
                      </h2>
                    </div>
                    <span className="text-xs font-mono text-[#E60012] bg-[#E60012]/15 px-3 py-1 rounded-lg border border-[#E60012]/30 w-fit">
                      APPLIES TO ALL MATCH SCREENING TICKETS
                    </span>
                  </div>

                  <form onSubmit={handleSaveScreeningsTax} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-display text-white/90 font-bold uppercase">SCREENING TAX RATE (%)</label>
                        <input
                          type="number"
                          step="1"
                          value={Math.round(((siteTaxConfig.screeningsTaxRate ?? 0.18) * 100))}
                          onChange={(e) => {
                            const val = e.target.value === '' ? 0 : Number(e.target.value);
                            setSiteTaxConfig({ ...siteTaxConfig, screeningsTaxRate: val / 100 });
                          }}
                          className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-mono mt-1 focus:outline-none focus:border-[#E60012]"
                        />
                        <span className="text-[10px] text-white/50 font-sans mt-0.5 block">Standard: 18%</span>
                      </div>

                      <div>
                        <label className="text-xs font-display text-white/90 font-bold uppercase">SCREENING PLATFORM FEES (%)</label>
                        <input
                          type="number"
                          step="1"
                          value={Math.round(((siteTaxConfig.screeningsPlatformFeeRate ?? 0.03) * 100))}
                          onChange={(e) => {
                            const val = e.target.value === '' ? 0 : Number(e.target.value);
                            setSiteTaxConfig({ ...siteTaxConfig, screeningsPlatformFeeRate: val / 100 });
                          }}
                          className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-mono mt-1 focus:outline-none focus:border-[#E60012]"
                        />
                        <span className="text-[10px] text-white/50 font-sans mt-0.5 block">Standard: 3% Convenience Fee</span>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xs font-bold px-6 py-3 rounded-xl transition-all uppercase cursor-pointer"
                      >
                        SAVE SCREENING TAX SETTINGS
                      </button>
                    </div>
                  </form>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Create Form */}
                <div className="lg:col-span-5 glass-card rounded-3xl p-6 bg-[#171717] border border-white/10 space-y-4">
                  <h3 className="font-display text-xl font-bold text-white uppercase border-b border-white/10 pb-3 flex items-center gap-2">
                    <PlusIcon className="w-5 h-5 text-[#E60012]" />
                    <span>ADD NEW SCREENING TICKET EVENT</span>
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

                    <div>
                      <label className="text-xs font-display text-white/90 font-bold uppercase">COMPETITION</label>
                      <select
                        value={newScreening.competition || 'Premier League'}
                        onChange={(e) => setNewScreening({ ...newScreening, competition: e.target.value })}
                        className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                      >
                        <option value="Premier League">Premier League</option>
                        <option value="FA Cup">FA Cup</option>
                        <option value="UEFA Champions League">UEFA Champions League</option>
                        <option value="EFL Cup">EFL Cup</option>
                        <option value="Pre-Season Tour">Pre-Season Tour</option>
                      </select>
                    </div>

                    {/* Date with Calendar Picker Button */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-display text-white/90 font-bold uppercase">MATCH DATE *</label>
                        <span className="text-[10px] text-white/50 font-sans">Pick via calendar ➔</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sunday, May 10, 2026"
                          value={newScreening.date || ''}
                          onChange={(e) => setNewScreening({ ...newScreening, date: e.target.value })}
                          className="flex-1 bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                        />
                        <div className="relative shrink-0">
                          <label className="bg-[#050505] hover:bg-black border border-white/20 text-[#E60012] p-3 rounded-xl flex items-center justify-center cursor-pointer shadow">
                            <CalIcon className="w-5 h-5" />
                            <input
                              type="date"
                              onChange={(e) => {
                                if (e.target.value) {
                                  setNewScreening({ ...newScreening, date: formatDateFromPicker(e.target.value) });
                                }
                              }}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Time Input & Quick Presets */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-display text-white/90 font-bold uppercase">KICKOFF TIME *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 09:00 PM IST"
                        value={newScreening.time || '09:00 PM IST'}
                        onChange={(e) => setNewScreening({ ...newScreening, time: e.target.value })}
                        className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                      />
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {['05:30 PM IST', '07:30 PM IST', '08:00 PM IST', '09:00 PM IST', '11:30 PM IST'].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setNewScreening({ ...newScreening, time: t })}
                            className="text-[10px] font-display bg-[#050505] hover:bg-[#E60012] border border-white/10 text-white/80 px-2 py-1 rounded"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-display text-white/90 font-bold uppercase">VENUE NAME</label>
                        <input
                          type="text"
                          value={newScreening.venueName || 'BIRA 91 Taproom, The Mills'}
                          onChange={(e) => setNewScreening({ ...newScreening, venueName: e.target.value })}
                          className="w-full bg-[#050505] border border-white/15 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-display text-white/90 font-bold uppercase">PRICE (₹)</label>
                        <input
                          type="number"
                          value={newScreening.price || 350}
                          onChange={(e) => {
                            const p = Number(e.target.value);
                            const rem = Math.max(0, p - 100);
                            setNewScreening({
                              ...newScreening,
                              price: p,
                              redeemableAmount: rem,
                              entryFeeAmount: Math.min(100, p),
                            });
                          }}
                          className="w-full bg-[#050505] border border-white/15 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                        />
                      </div>
                    </div>

                    {/* Ticket Price Split Breakdown */}
                    <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                      <div className="text-xs font-display font-bold text-amber-400 uppercase flex items-center justify-between">
                        <span>🍽️ TICKET PRICE BREAKDOWN / SPLIT</span>
                        <span className="text-[10px] text-white/50 lowercase font-sans">e.g. ₹400 F&B + ₹100 entry</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-display text-white/90 font-bold uppercase block">
                            REDEEMABLE ON F&B (₹)
                          </label>
                          <input
                            type="number"
                            min={0}
                            placeholder="e.g. 250"
                            value={newScreening.redeemableAmount ?? ''}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setNewScreening({
                                ...newScreening,
                                redeemableAmount: val,
                                entryFeeAmount: newScreening.price ? Math.max(0, Number(newScreening.price) - val) : newScreening.entryFeeAmount
                              });
                            }}
                            className="w-full bg-[#050505] border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-display text-white/90 font-bold uppercase block">
                            ENTRY CHARGE (₹)
                          </label>
                          <input
                            type="number"
                            min={0}
                            placeholder="e.g. 100"
                            value={newScreening.entryFeeAmount ?? ''}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setNewScreening({
                                ...newScreening,
                                entryFeeAmount: val,
                                redeemableAmount: newScreening.price ? Math.max(0, Number(newScreening.price) - val) : newScreening.redeemableAmount
                              });
                            }}
                            className="w-full bg-[#050505] border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white mt-1"
                          />
                        </div>
                      </div>
                      <div className="text-[11px] font-sans text-white/60">
                        Total Price: ₹{newScreening.price || 0} = ₹{newScreening.redeemableAmount ?? 0} (F&B Cover) + ₹{newScreening.entryFeeAmount ?? 0} (Entry Fee)
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-display text-white/90 font-bold uppercase">TOTAL CAPACITY (SEATS)</label>
                      <input
                        type="number"
                        placeholder="e.g. 250"
                        value={newScreening.capacity || 250}
                        onChange={(e) => {
                          const cap = Number(e.target.value);
                          setNewScreening({ ...newScreening, capacity: cap, remainingSeats: cap });
                        }}
                        className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-sm font-bold py-3.5 rounded-xl shadow flex items-center justify-center gap-2 uppercase"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>PUBLISH SCREENING TICKET EVENT</span>
                    </button>
                  </form>
                </div>

                {/* List & Edit/Delete Controls */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="font-display text-xl font-bold text-white uppercase flex items-center gap-2">
                      <LayersIcon className="w-5 h-5 text-[#E60012]" />
                      <span>LIVE SCREENINGS ({screenings.length})</span>
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {screenings.map((sc) => (
                      <div key={sc.id} className="glass-card p-6 rounded-3xl bg-[#171717] border border-white/10 space-y-4 shadow-xl">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-display text-[#E60012] font-bold uppercase bg-[#050505] px-2 py-0.5 rounded border border-[#E60012]/30">
                                {sc.competition}
                              </span>
                              <span className="text-[10px] font-display text-emerald-400 font-bold uppercase bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                                {sc.status || 'UPCOMING'}
                              </span>
                            </div>
                            <h4 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase">{sc.matchTitle}</h4>
                            <div className="text-xs font-sans text-white/80 space-y-1 pt-1">
                              <div className="flex items-center gap-2">
                                <CalIcon className="w-3.5 h-3.5 text-[#E60012]" />
                                <span>📅 {sc.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <ClockIcon className="w-3.5 h-3.5 text-[#E60012]" />
                                <span>⏰ {sc.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>📍 {sc.venueName}</span>
                              </div>
                              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                                <span className="bg-[#050505] border border-white/15 px-2.5 py-1 rounded-lg text-white font-bold">
                                  🪑 Total Capacity: <strong className="text-white">{sc.capacity || 250}</strong>
                                </span>
                                <span className="bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-lg text-emerald-400 font-bold">
                                  ✓ Remaining: {sc.remainingSeats !== undefined ? sc.remainingSeats : (sc.capacity || 250)}
                                </span>
                                <span className="bg-[#E60012]/20 border border-[#E60012]/40 px-2.5 py-1 rounded-lg text-[#E60012] font-bold">
                                  🔥 Sold: {Math.max(0, (sc.capacity || 250) - (sc.remainingSeats !== undefined ? sc.remainingSeats : (sc.capacity || 250)))}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-left sm:text-right space-y-3 shrink-0">
                            <div>
                              <span className="text-[10px] font-display text-white/60 uppercase block">TICKET PRICE</span>
                              <span className="font-display text-2xl font-bold text-[#E60012]">₹{sc.price}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingScreening(sc)}
                                className="bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 font-display text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors shadow"
                              >
                                <EditIcon className="w-3.5 h-3.5" />
                                <span>EDIT SCREENING</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete screening "${sc.matchTitle}"?`)) {
                                    deleteScreeningFromStore(sc.id);
                                  }
                                }}
                                className="bg-red-950/60 hover:bg-red-900 border border-red-500/50 text-red-300 font-display text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors shadow"
                              >
                                <TrashIcon className="w-3.5 h-3.5" />
                                <span>DELETE</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* EDIT SCREENING MODAL */}
                {editingScreening && (
                  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-[#171717] border border-white/20 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                          <div className="text-xs font-display text-[#E60012] font-bold uppercase">EDIT SCREENING EVENT</div>
                          <h3 className="font-display text-2xl font-bold text-white uppercase">{editingScreening.matchTitle}</h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditingScreening(null)}
                          className="text-white/60 hover:text-white p-2 rounded-lg bg-[#050505]"
                        >
                          <CloseIcon className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleUpdateScreening} className="space-y-4">
                        <div>
                          <label className="text-xs font-display text-white/90 font-bold uppercase block">MATCH TITLE *</label>
                          <input
                            type="text"
                            required
                            value={editingScreening.matchTitle}
                            onChange={(e) => setEditingScreening({ ...editingScreening, matchTitle: e.target.value })}
                            className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white mt-1 focus:outline-none focus:border-[#E60012]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-display text-white/90 font-bold uppercase block">COMPETITION</label>
                            <select
                              value={editingScreening.competition || 'Premier League'}
                              onChange={(e) => setEditingScreening({ ...editingScreening, competition: e.target.value })}
                              className="w-full bg-[#050505] border border-white/20 rounded-xl px-3 py-3 text-sm text-white mt-1"
                            >
                              <option value="Premier League">Premier League</option>
                              <option value="FA Cup">FA Cup</option>
                              <option value="UEFA Champions League">UEFA Champions League</option>
                              <option value="EFL Cup">EFL Cup</option>
                              <option value="Pre-Season Tour">Pre-Season Tour</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-xs font-display text-white/90 font-bold uppercase block">STATUS</label>
                            <select
                              value={editingScreening.status || 'UPCOMING'}
                              onChange={(e) => setEditingScreening({ ...editingScreening, status: e.target.value as any })}
                              className="w-full bg-[#050505] border border-white/20 rounded-xl px-3 py-3 text-sm text-white mt-1"
                            >
                              <option value="UPCOMING">UPCOMING</option>
                              <option value="LIVE NOW">LIVE NOW</option>
                              <option value="SOLD OUT">SOLD OUT</option>
                              <option value="COMPLETED">COMPLETED</option>
                            </select>
                          </div>
                        </div>

                        {/* Edit Date with Calendar Picker */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-display text-white/90 font-bold uppercase block">MATCH DATE *</label>
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              required
                              value={editingScreening.date}
                              onChange={(e) => setEditingScreening({ ...editingScreening, date: e.target.value })}
                              className="flex-1 bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                            />
                            <div className="relative shrink-0">
                              <label className="bg-[#050505] hover:bg-black border border-white/20 text-[#E60012] p-3 rounded-xl flex items-center justify-center cursor-pointer shadow">
                                <CalIcon className="w-5 h-5" />
                                <input
                                  type="date"
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      setEditingScreening({ ...editingScreening, date: formatDateFromPicker(e.target.value) });
                                    }
                                  }}
                                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Edit Time */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-display text-white/90 font-bold uppercase block">KICKOFF TIME *</label>
                          <input
                            type="text"
                            required
                            value={editingScreening.time}
                            onChange={(e) => setEditingScreening({ ...editingScreening, time: e.target.value })}
                            className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                          />
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {['05:30 PM IST', '07:30 PM IST', '08:00 PM IST', '09:00 PM IST', '11:30 PM IST'].map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setEditingScreening({ ...editingScreening, time: t })}
                                className="text-[10px] font-display bg-[#050505] hover:bg-[#E60012] border border-white/10 text-white/80 px-2 py-1 rounded"
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-display text-white/90 font-bold uppercase block">VENUE NAME *</label>
                            <input
                              type="text"
                              required
                              value={editingScreening.venueName}
                              onChange={(e) => setEditingScreening({ ...editingScreening, venueName: e.target.value })}
                              className="w-full bg-[#050505] border border-white/20 rounded-xl px-3 py-3 text-sm text-white mt-1"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-display text-white/90 font-bold uppercase block">PRICE (₹) *</label>
                            <input
                              type="number"
                              required
                              value={editingScreening.price}
                              onChange={(e) => {
                                const p = Number(e.target.value);
                                const rem = Math.max(0, p - 100);
                                setEditingScreening({
                                  ...editingScreening,
                                  price: p,
                                  redeemableAmount: rem,
                                  entryFeeAmount: Math.min(100, p),
                                });
                              }}
                              className="w-full bg-[#050505] border border-white/20 rounded-xl px-3 py-3 text-sm text-white mt-1"
                            />
                          </div>
                        </div>

                        {/* Ticket Price Split Breakdown */}
                        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                          <div className="text-xs font-display font-bold text-amber-400 uppercase flex items-center justify-between">
                            <span>🍽️ TICKET PRICE BREAKDOWN / SPLIT</span>
                            <span className="text-[10px] text-white/50 lowercase font-sans">e.g. ₹400 F&B + ₹100 entry</span>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs font-display text-white/90 font-bold uppercase block">
                                REDEEMABLE ON F&B (₹)
                              </label>
                              <input
                                type="number"
                                min={0}
                                placeholder="e.g. 400"
                                value={editingScreening.redeemableAmount ?? ''}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  setEditingScreening({
                                    ...editingScreening,
                                    redeemableAmount: val,
                                    entryFeeAmount: editingScreening.price ? Math.max(0, Number(editingScreening.price) - val) : editingScreening.entryFeeAmount,
                                  });
                                }}
                                className="w-full bg-[#050505] border border-white/20 rounded-xl px-3 py-2.5 text-sm text-white mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-display text-white/90 font-bold uppercase block">
                                ENTRY CHARGE (₹)
                              </label>
                              <input
                                type="number"
                                min={0}
                                placeholder="e.g. 100"
                                value={editingScreening.entryFeeAmount ?? ''}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  setEditingScreening({
                                    ...editingScreening,
                                    entryFeeAmount: val,
                                    redeemableAmount: editingScreening.price ? Math.max(0, Number(editingScreening.price) - val) : editingScreening.redeemableAmount,
                                  });
                                }}
                                className="w-full bg-[#050505] border border-white/20 rounded-xl px-3 py-2.5 text-sm text-white mt-1"
                              />
                            </div>
                          </div>
                          <div className="text-[11px] font-sans text-white/60">
                            Total Price: ₹{editingScreening.price || 0} = ₹{editingScreening.redeemableAmount ?? 0} (F&B Cover) + ₹{editingScreening.entryFeeAmount ?? 0} (Entry Fee)
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-display text-white/90 font-bold uppercase block">TOTAL CAPACITY *</label>
                            <input
                              type="number"
                              required
                              value={editingScreening.capacity ?? 250}
                              onChange={(e) => setEditingScreening({ ...editingScreening, capacity: Number(e.target.value) })}
                              className="w-full bg-[#050505] border border-white/20 rounded-xl px-3 py-3 text-sm text-white mt-1"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-display text-white/90 font-bold uppercase block">REMAINING SEATS *</label>
                            <input
                              type="number"
                              required
                              value={editingScreening.remainingSeats ?? 250}
                              onChange={(e) => setEditingScreening({ ...editingScreening, remainingSeats: Number(e.target.value) })}
                              className="w-full bg-[#050505] border border-white/20 rounded-xl px-3 py-3 text-sm text-white mt-1"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <button
                            type="button"
                            onClick={() => setEditingScreening(null)}
                            className="flex-1 bg-[#050505] hover:bg-black border border-white/20 text-white font-display text-xs font-bold py-3.5 rounded-xl uppercase"
                          >
                            CANCEL
                          </button>
                          <button
                            type="submit"
                            className="flex-1 bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xs font-bold py-3.5 rounded-xl uppercase shadow"
                          >
                            SAVE & UPDATE SCREENING
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

            {/* PRODUCTS TAB */}
            {activeTab === 'PRODUCTS' && (
              <div className="space-y-8">
                {/* Merchandise Tax & Platform Fee Slab */}
                <div className="glass-card rounded-3xl p-6 sm:p-8 bg-[#171717] border border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-display uppercase tracking-widest text-[#E60012] font-bold block">
                        MERCHANDISE FINANCIAL SETTINGS
                      </span>
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-white uppercase mt-0.5">
                        MERCHANDISE TAX & PLATFORM FEE SETTINGS
                      </h2>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-500/30 w-fit">
                      APPLIES TO SHOPPING CART & STORE
                    </span>
                  </div>

                  <form onSubmit={handleSaveMerchandiseTax} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-display text-white/90 font-bold uppercase">MERCHANDISE TAX RATE (%)</label>
                        <input
                          type="number"
                          step="1"
                          value={Math.round(((siteTaxConfig.productsTaxRate ?? 0.18) * 100))}
                          onChange={(e) => {
                            const val = e.target.value === '' ? 0 : Number(e.target.value);
                            setSiteTaxConfig({ ...siteTaxConfig, productsTaxRate: val / 100 });
                          }}
                          className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-mono mt-1 focus:outline-none focus:border-[#E60012]"
                        />
                        <span className="text-[10px] text-white/50 font-sans mt-0.5 block">Standard: 18%</span>
                      </div>

                      <div>
                        <label className="text-xs font-display text-white/90 font-bold uppercase">MERCHANDISE PLATFORM FEE (%)</label>
                        <input
                          type="number"
                          step="1"
                          value={Math.round(((siteTaxConfig.productsPlatformFeeRate ?? 0.03) * 100))}
                          onChange={(e) => {
                            const val = e.target.value === '' ? 0 : Number(e.target.value);
                            setSiteTaxConfig({ ...siteTaxConfig, productsPlatformFeeRate: val / 100 });
                          }}
                          className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-mono mt-1 focus:outline-none focus:border-[#E60012]"
                        />
                        <span className="text-[10px] text-white/50 font-sans mt-0.5 block">Standard: 3% Convenience Fee</span>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xs font-bold px-6 py-3 rounded-xl transition-all uppercase cursor-pointer"
                      >
                        SAVE MERCHANDISE TAX SETTINGS
                      </button>
                    </div>
                  </form>
                </div>

                {/* Membership Sizing Pricing & Tax Settings */}
                <div className="glass-card rounded-3xl p-6 sm:p-8 bg-[#171717] border border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-display uppercase tracking-widest text-[#E60012] font-bold block">
                        SUPPORTERS CLUB MEMBERSHIP
                      </span>
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-white uppercase mt-0.5">
                        MEMBERSHIP SIZING & TAX SLAB
                      </h2>
                    </div>
                    <span className="text-xs font-mono text-amber-400 bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-500/30 w-fit">
                      APPLIES TO PUNE&apos;S RED ARMY PASS
                    </span>
                  </div>

                  <form onSubmit={handleSaveMembershipTaxAndPricing} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-display text-white/80 font-bold uppercase block">
                        SIZE-BASED T-SHIRT PRICING (S THROUGH 5XL)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {(['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'] as const).map((size) => (
                          <div key={size} className="bg-[#050505] p-3 rounded-xl border border-white/10 space-y-1">
                            <label className="text-[10px] font-display text-white/70 font-bold uppercase">SIZE {size} (₹)</label>
                            <input
                              type="number"
                              value={membershipConfig?.sizePrices?.[size] ?? 999}
                              onChange={(e) => {
                                const val = e.target.value === '' ? 0 : Number(e.target.value);
                                const updatedPrices = { ...(membershipConfig?.sizePrices || {}), [size]: val };
                                setMembershipConfig({ ...membershipConfig, sizePrices: updatedPrices });
                              }}
                              className="w-full bg-[#121212] border border-white/20 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#E60012]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="text-xs font-display text-white/90 font-bold uppercase">MEMBERSHIP TAX RATE (%)</label>
                        <input
                          type="number"
                          step="1"
                          value={Math.round(((membershipConfig?.taxRate ?? siteTaxConfig.membershipTaxRate ?? 0.18) * 100))}
                          onChange={(e) => {
                            const val = e.target.value === '' ? 0 : Number(e.target.value);
                            setMembershipConfig({ ...membershipConfig, taxRate: val / 100 });
                            setSiteTaxConfig({ ...siteTaxConfig, membershipTaxRate: val / 100 });
                          }}
                          className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-mono mt-1 focus:outline-none focus:border-[#E60012]"
                        />
                        <span className="text-[10px] text-white/50 font-sans mt-0.5 block">Standard: 18%</span>
                      </div>

                      <div>
                        <label className="text-xs font-display text-white/90 font-bold uppercase">MEMBERSHIP PLATFORM FEE (%)</label>
                        <input
                          type="number"
                          step="1"
                          value={Math.round(((membershipConfig?.platformFeeRate ?? siteTaxConfig.membershipPlatformFeeRate ?? 0.03) * 100))}
                          onChange={(e) => {
                            const val = e.target.value === '' ? 0 : Number(e.target.value);
                            setMembershipConfig({ ...membershipConfig, platformFeeRate: val / 100 });
                            setSiteTaxConfig({ ...siteTaxConfig, membershipPlatformFeeRate: val / 100 });
                          }}
                          className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-mono mt-1 focus:outline-none focus:border-[#E60012]"
                        />
                        <span className="text-[10px] text-white/50 font-sans mt-0.5 block">Standard: 3% Convenience Fee</span>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xs font-bold px-6 py-3 rounded-xl transition-all uppercase cursor-pointer"
                      >
                        SAVE MEMBERSHIP PRICING & TAX SETTINGS
                      </button>
                    </div>
                  </form>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 glass-card rounded-3xl p-6 bg-[#171717] border border-white/10 space-y-4">
                  <h3 className="font-display text-xl font-bold text-white uppercase border-b border-white/10 pb-3">
                    ADD NEW MERCHANDISE PRODUCT
                  </h3>

                  <form onSubmit={handleCreateProduct} className="space-y-4">
                    <div>
                      <label className="text-xs font-display text-white/90 font-bold uppercase">PRODUCT NAME *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Official MUSC Pune Track Jacket"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-display text-white/90 font-bold uppercase">PRICE (₹) *</label>
                        <input
                          type="number"
                          required
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                          className="w-full bg-[#050505] border border-white/15 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-display text-white/90 font-bold uppercase">CATEGORY</label>
                        <select
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                          className="w-full bg-[#050505] border border-white/15 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                        >
                          <option value="Apparel">Apparel</option>
                          <option value="Accessories">Accessories</option>
                          <option value="Collectibles">Collectibles</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-display text-white/90 font-bold uppercase">STOCK COUNT *</label>
                        <input
                          type="number"
                          required
                          min={0}
                          value={newProduct.stockCount ?? 50}
                          onChange={(e) => setNewProduct({ ...newProduct, stockCount: Math.max(0, Number(e.target.value)) })}
                          className="w-full bg-[#050505] border border-white/15 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-display text-white/90 font-bold uppercase">AVAILABILITY</label>
                        <div className="flex items-center h-[46px]">
                          <label className="flex items-center gap-2 cursor-pointer text-xs text-white/80">
                            <input
                              type="checkbox"
                              checked={newProduct.inStock !== false}
                              onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
                              className="w-4 h-4 accent-[#E60012] rounded cursor-pointer"
                            />
                            <span>Available in Store</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-display text-white/90 font-bold uppercase block">PRODUCT DESCRIPTION</label>
                      <textarea
                        rows={3}
                        placeholder="Describe the merchandise features, fabric, sizing advice, etc..."
                        value={newProduct.description || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-display text-white/90 font-bold uppercase block">HIGHLIGHTS / DETAILS (Comma-separated)</label>
                      <input
                        type="text"
                        placeholder="e.g. 100% Breathable Cotton, Official Club Crest, Regular Fit"
                        value={Array.isArray(newProduct.details) ? newProduct.details.join(', ') : (newProduct.details || '')}
                        onChange={(e) => setNewProduct({ ...newProduct, details: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                        className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                      />
                    </div>

                    <ImageUploadOrUrlField
                      label="PRODUCT IMAGE"
                      value={newProduct.image || ''}
                      onChange={(img) => setNewProduct({ ...newProduct, image: img })}
                      required
                      aspectRatio="square"
                    />

                    <button
                      type="submit"
                      className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-sm font-bold py-3.5 rounded-xl shadow flex items-center justify-center gap-2 uppercase"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>ADD PRODUCT TO SHOP</span>
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-display text-xl font-bold text-white uppercase border-b border-white/10 pb-3">
                    LIVE PRODUCTS ({products.length})
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    {products.map((p) => {
                      const currentStock = p.stockCount !== undefined ? p.stockCount : 50;
                      const isSoldOut = currentStock === 0 || p.inStock === false;
                      const isLowStock = !isSoldOut && currentStock <= 5;

                      return (
                        <div key={p.id} className="bg-[#171717] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                              <Image src={p.image} alt={p.name} fill unoptimized className="object-cover" />
                            </div>
                            <div className="min-w-0 space-y-1">
                              <h4 className="font-display text-lg font-bold text-white uppercase truncate">{p.name}</h4>
                              <div className="flex items-center gap-2">
                                <span className="font-display text-base font-bold text-[#E60012]">₹{p.price}</span>
                                <span className="text-[10px] font-sans text-white/50">• {p.category}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {isSoldOut ? (
                                  <span className="text-[10px] font-mono bg-red-950/80 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-bold uppercase">
                                    SOLD OUT
                                  </span>
                                ) : isLowStock ? (
                                  <span className="text-[10px] font-mono bg-amber-950/80 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-bold uppercase">
                                    ONLY {currentStock} LEFT
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold uppercase">
                                    IN STOCK ({currentStock})
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Quick Inventory Controls */}
                          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                            <div className="flex items-center bg-[#050505] border border-white/15 rounded-xl p-1 gap-1">
                              <button
                                type="button"
                                onClick={() => handleAdjustStock(p, -5)}
                                className="px-2 py-1 bg-white/5 hover:bg-white/10 text-[10px] font-mono text-white/70 rounded"
                                title="Reduce stock by 5"
                              >
                                -5
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAdjustStock(p, -1)}
                                className="px-2 py-1 bg-white/5 hover:bg-white/10 text-xs font-mono font-bold text-white/90 rounded"
                                title="Reduce stock by 1"
                              >
                                -1
                              </button>
                              <span className="px-2 text-xs font-mono font-bold text-white min-w-[32px] text-center">
                                {currentStock}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleAdjustStock(p, 1)}
                                className="px-2 py-1 bg-white/5 hover:bg-white/10 text-xs font-mono font-bold text-white/90 rounded"
                                title="Add 1 to stock"
                              >
                                +1
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAdjustStock(p, 5)}
                                className="px-2 py-1 bg-white/5 hover:bg-white/10 text-[10px] font-mono text-white/70 rounded"
                                title="Add 5 to stock"
                              >
                                +5
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleToggleInStock(p)}
                              className={`text-[10px] font-display font-bold px-2.5 py-2 rounded-xl border transition-colors ${
                                isSoldOut
                                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900'
                                  : 'bg-neutral-800 border-white/15 text-white/70 hover:bg-neutral-700'
                              }`}
                            >
                              {isSoldOut ? 'RESTOCK' : 'MARK SOLD OUT'}
                            </button>

                            <button
                              type="button"
                              onClick={() => setEditingProduct(p)}
                              className="bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 font-display text-xs font-bold p-2.5 rounded-xl flex items-center gap-1 cursor-pointer transition-colors shrink-0"
                              title="Edit Product"
                            >
                              <EditIcon className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete product "${p.name}"?`)) {
                                  deleteProductFromStore(p.id);
                                }
                              }}
                              className="bg-red-950/60 hover:bg-red-900 border border-red-500/50 text-red-300 font-display text-xs font-bold p-2.5 rounded-xl flex items-center gap-1 cursor-pointer transition-colors shrink-0"
                              title="Delete Product"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* EDIT PRODUCT MODAL */}
                {editingProduct && (
                  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-[#171717] border border-white/20 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                          <div className="text-xs font-display text-[#E60012] font-bold uppercase">EDIT PRODUCT</div>
                          <h3 className="font-display text-2xl font-bold text-white uppercase">{editingProduct.name}</h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditingProduct(null)}
                          className="text-white/60 hover:text-white p-2 rounded-lg bg-[#050505]"
                        >
                          <CloseIcon className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleUpdateProduct} className="space-y-4">
                        <div>
                          <label className="text-xs font-display text-white/90 font-bold uppercase block">PRODUCT NAME *</label>
                          <input
                            type="text"
                            required
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white mt-1 focus:outline-none focus:border-[#E60012]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-display text-white/90 font-bold uppercase block">PRICE (₹) *</label>
                            <input
                              type="number"
                              required
                              value={editingProduct.price}
                              onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                              className="w-full bg-[#050505] border border-white/20 rounded-xl px-3 py-3 text-sm text-white mt-1"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-display text-white/90 font-bold uppercase block">CATEGORY</label>
                            <select
                              value={editingProduct.category}
                              onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                              className="w-full bg-[#050505] border border-white/20 rounded-xl px-3 py-3 text-sm text-white mt-1"
                            >
                              <option value="Apparel">Apparel</option>
                              <option value="Accessories">Accessories</option>
                              <option value="Collectibles">Collectibles</option>
                              <option value="Membership">Membership</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-display text-white/90 font-bold uppercase block">STOCK COUNT *</label>
                            <input
                              type="number"
                              required
                              min={0}
                              value={editingProduct.stockCount !== undefined ? editingProduct.stockCount : 50}
                              onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: Math.max(0, Number(e.target.value)) })}
                              className="w-full bg-[#050505] border border-white/20 rounded-xl px-3 py-3 text-sm text-white mt-1"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-display text-white/90 font-bold uppercase block">STOCK STATUS</label>
                            <div className="flex items-center h-[46px] mt-1">
                              <label className="flex items-center gap-2 cursor-pointer text-xs text-white/80">
                                <input
                                  type="checkbox"
                                  checked={editingProduct.inStock !== false}
                                  onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                                  className="w-4 h-4 accent-[#E60012] rounded cursor-pointer"
                                />
                                <span>Available in Store</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-display text-white/90 font-bold uppercase block">PRODUCT DESCRIPTION</label>
                          <textarea
                            rows={3}
                            placeholder="Describe the merchandise features, fabric, sizing advice, etc..."
                            value={editingProduct.description || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                            className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white mt-1 focus:outline-none focus:border-[#E60012]"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-display text-white/90 font-bold uppercase block">HIGHLIGHTS / DETAILS (Comma-separated)</label>
                          <input
                            type="text"
                            placeholder="e.g. 100% Breathable Cotton, Official Club Crest, Regular Fit"
                            value={Array.isArray(editingProduct.details) ? editingProduct.details.join(', ') : (editingProduct.details || '')}
                            onChange={(e) => setEditingProduct({ ...editingProduct, details: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                            className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white mt-1 focus:outline-none focus:border-[#E60012]"
                          />
                        </div>

                        <ImageUploadOrUrlField
                          label="PRODUCT IMAGE"
                          value={editingProduct.image || ''}
                          onChange={(img) => setEditingProduct({ ...editingProduct, image: img })}
                          required
                          aspectRatio="square"
                        />

                        <div className="flex gap-3 pt-4">
                          <button
                            type="button"
                            onClick={() => setEditingProduct(null)}
                            className="flex-1 bg-[#050505] hover:bg-black border border-white/20 text-white font-display text-xs font-bold py-3.5 rounded-xl uppercase"
                          >
                            CANCEL
                          </button>
                          <button
                            type="submit"
                            className="flex-1 bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xs font-bold py-3.5 rounded-xl uppercase shadow"
                          >
                            SAVE & UPDATE PRODUCT
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

            {/* TAB 5: GALLERY ARCHIVE */}
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
                        placeholder="e.g. MUSC Pune Victory Roar"
                        value={newGal.title}
                        onChange={(e) => setNewGal({ ...newGal, title: e.target.value })}
                        className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E60012]"
                      />
                    </div>

                    <ImageUploadOrUrlField
                      label="GALLERY PHOTO"
                      value={newGal.imageUrl || ''}
                      onChange={(img) => setNewGal({ ...newGal, imageUrl: img })}
                      required
                      aspectRatio="square"
                    />

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
                    {galleryList.map((g) => (
                      <div key={g.id} className="relative aspect-square rounded-xl overflow-hidden bg-black border border-white/10 group">
                        <Image src={g.imageUrl} alt={g.title} fill unoptimized className="object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-2 flex items-end justify-between gap-1">
                          <span className="text-[10px] font-display text-white truncate font-bold">{g.title}</span>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete photo "${g.title}" from gallery archive?`)) {
                                deleteGalleryItemFromStore(g.id);
                              }
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white p-1 rounded transition-colors shrink-0"
                            title="Delete Photo"
                          >
                            <TrashIcon className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: TICKET & MERCHANDISE LEDGER */}
            {activeTab === 'LEDGER' && (
              <div className="space-y-6 glass-card rounded-3xl p-6 bg-[#171717] border border-white/10">
                {/* Ledger Header & Sub-Navigation */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white uppercase">
                      {userRole === 'GATE_MARSHAL' ? 'GATE ATTENDEE ENTRY LIST' : 'ADMIN TRANSACTION & ORDER LEDGER'}
                    </h2>
                    <p className="text-xs text-white/60 font-sans">
                      {userRole === 'GATE_MARSHAL'
                        ? 'Gate Turnstile validation list — attendee verification & manual check-in'
                        : 'Real-time log of matchday tickets, merchandise orders, memberships, and trip bookings'}
                    </p>
                  </div>

                  {/* Super Admin Sub-Tabs & Export Controls */}
                  {userRole === 'SUPER_ADMIN' ? (
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex bg-[#050505] p-1 rounded-xl border border-white/15">
                        <button
                          type="button"
                          onClick={() => setLedgerSubTab('TICKETS')}
                          className={`px-3 py-1.5 text-xs font-display font-bold rounded-lg uppercase transition-all ${
                            ledgerSubTab === 'TICKETS' ? 'bg-[#E60012] text-white' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          TICKETS ({tickets.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => setLedgerSubTab('MERCH_ORDERS')}
                          className={`px-3 py-1.5 text-xs font-display font-bold rounded-lg uppercase transition-all ${
                            ledgerSubTab === 'MERCH_ORDERS' ? 'bg-[#E60012] text-white' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          ORDERS & MEMBERS ({productOrders.length})
                        </button>
                      </div>

                      {ledgerSubTab === 'TICKETS' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => exportTicketsToCSV('ALL')}
                            className="bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow cursor-pointer uppercase"
                          >
                            <DownIcon className="w-3.5 h-3.5" />
                            <span>CSV EXPORT</span>
                          </button>
                          {screenings.length > 0 && (
                            <select
                              onChange={(e) => {
                                if (e.target.value) exportTicketsToCSV(e.target.value);
                              }}
                              defaultValue=""
                              className="bg-[#050505] border border-white/20 text-white font-display text-xs font-bold px-2.5 py-2 rounded-xl cursor-pointer"
                            >
                              <option value="" disabled>BY MATCH ▾</option>
                              {screenings.map((sc) => (
                                <option key={sc.id} value={sc.matchTitle}>
                                  {sc.matchTitle}
                                </option>
                              ))}
                            </select>
                          )}
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={exportProductOrdersToCSV}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-display text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow cursor-pointer uppercase"
                        >
                          <DownIcon className="w-3.5 h-3.5" />
                          <span>EXPORT ORDERS CSV</span>
                        </button>
                      )}
                    </div>
                  ) : null}
                </div>

                {/* FORMSPREE ORDER DISPATCH ENDPOINT SETTING */}
                {userRole === 'SUPER_ADMIN' && (
                  <div className="bg-[#050505] p-5 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <div className="flex items-center gap-2 text-xs font-display text-white font-bold uppercase">
                        <SparkIcon className="w-4 h-4 text-[#E60012]" />
                        <span>FORMSPREE ORDER NOTIFICATION ENDPOINT</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">
                        LIVE DISPATCH
                      </span>
                    </div>
                    <form onSubmit={handleSaveFormspreeEndpoint} className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="url"
                        value={siteTaxConfig.formspreeEndpoint || 'https://formspree.io/f/xrppgvbv'}
                        onChange={(e) => {
                          setSiteTaxConfig({ ...siteTaxConfig, formspreeEndpoint: e.target.value });
                        }}
                        placeholder="https://formspree.io/f/xrppgvbv"
                        className="flex-1 bg-[#121212] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#E60012]"
                      />
                      <button
                        type="submit"
                        className="bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xs font-bold px-5 py-2.5 rounded-xl uppercase transition-all whitespace-nowrap cursor-pointer"
                      >
                        SAVE ENDPOINT
                      </button>
                    </form>
                    <p className="text-[10px] text-white/50 font-sans">
                      All completed orders, member t-shirt sizing, phone numbers, and addresses are instantly dispatched to this endpoint.
                    </p>
                  </div>
                )}

                {/* VIEW 1: GATE MARSHAL SANITIZED ATTENDEE LIST */}
                {userRole === 'GATE_MARSHAL' && (
                  <div>
                    {tickets.length === 0 ? (
                      <div className="py-12 text-center text-xs text-white/50 font-sans">
                        No attendees registered yet.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[680px] text-left text-xs font-sans border-collapse">
                          <thead>
                            <tr className="border-b border-white/15 text-[#E60012] font-display uppercase tracking-wider">
                              <th className="py-3 px-3">TICKET ID</th>
                              <th className="py-3 px-3">HOLDER NAME</th>
                              <th className="py-3 px-3">PHONE</th>
                              <th className="py-3 px-3">MATCH</th>
                              <th className="py-3 px-3">SEATS</th>
                              <th className="py-3 px-3">STATUS</th>
                              <th className="py-3 px-3 text-right">ACTION</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10 text-white/80 font-mono">
                            {tickets.map((t) => (
                              <tr key={t.ticketId} className="hover:bg-white/5 transition-colors">
                                <td className="py-3 px-3 font-bold text-white">{t.ticketId}</td>
                                <td className="py-3 px-3 font-sans text-white font-semibold">{t.userName}</td>
                                <td className="py-3 px-3">{t.userPhone}</td>
                                <td className="py-3 px-3 font-sans truncate max-w-[160px]">{t.matchTitle}</td>
                                <td className="py-3 px-3 font-bold text-white">{t.quantity}</td>
                                <td className="py-3 px-3">
                                  {t.checkedIn ? (
                                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-display px-2 py-0.5 rounded font-bold uppercase">
                                      CHECKED IN ({t.checkedInAt?.slice(11, 16) || 'ADMITTED'})
                                    </span>
                                  ) : (
                                    <span className="bg-amber-950 text-amber-300 border border-amber-500/40 text-[10px] font-display px-2 py-0.5 rounded font-bold uppercase">
                                      UNCLAIMED
                                    </span>
                                  )}
                                </td>
                                <td className="py-3 px-3 text-right">
                                  <button
                                    type="button"
                                    onClick={() => handleToggleGateCheckIn(t.ticketId)}
                                    className={`px-3 py-1.5 rounded-lg font-display text-[11px] font-bold uppercase cursor-pointer transition-all ${
                                      t.checkedIn
                                        ? 'bg-neutral-800 text-white/60 hover:bg-neutral-700'
                                        : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow'
                                    }`}
                                  >
                                    {t.checkedIn ? 'UNDO' : 'ADMIT'}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* VIEW 2: SUPER ADMIN - SCREENING TICKETS TABLE */}
                {userRole === 'SUPER_ADMIN' && ledgerSubTab === 'TICKETS' && (
                  <div>
                    {tickets.length === 0 ? (
                      <div className="py-12 text-center text-xs text-white/50 font-sans">
                        No tickets booked yet. Generate a test booking on the website to view ledger records!
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left text-xs font-sans border-collapse">
                          <thead>
                            <tr className="border-b border-white/15 text-[#E60012] font-display uppercase tracking-wider">
                              <th className="py-3 px-3">TICKET ID</th>
                              <th className="py-3 px-3">HOLDER NAME</th>
                              <th className="py-3 px-3">PHONE</th>
                              <th className="py-3 px-3">MATCH</th>
                              <th className="py-3 px-3">QTY</th>
                              <th className="py-3 px-3">TOTAL</th>
                              <th className="py-3 px-3">PAYMENT / DEBIT STATUS</th>
                              <th className="py-3 px-3">GATE STATUS</th>
                              <th className="py-3 px-3 text-right">ACTIONS</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10 text-white/80 font-mono">
                            {tickets.map((t) => (
                              <tr key={t.ticketId} className="hover:bg-white/5 transition-colors">
                                <td className="py-3 px-3 font-bold text-white">
                                  {t.ticketId}
                                  {t.paymentStatus === 'DEBIT_VERIFICATION_REQUIRED' && (
                                    <span className="block text-[9px] text-amber-400 font-sans font-semibold">DEBIT VERIFICATION</span>
                                  )}
                                </td>
                                <td className="py-3 px-3 font-sans text-white font-semibold">{t.userName}</td>
                                <td className="py-3 px-3">{t.userPhone}</td>
                                <td className="py-3 px-3 font-sans truncate max-w-[150px]">{t.matchTitle}</td>
                                <td className="py-3 px-3">{t.quantity}</td>
                                <td className="py-3 px-3 text-[#E60012] font-bold">₹{t.totalAmount}</td>
                                <td className="py-3 px-3">
                                  {t.paymentStatus === 'DEBIT_VERIFICATION_REQUIRED' ? (
                                    <div className="space-y-1">
                                      <span className="bg-amber-950 text-amber-300 border border-amber-500/40 text-[10px] font-display px-2 py-0.5 rounded font-bold uppercase block">
                                        ⚠️ DEBIT VERIFICATION
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          approveDebitedPayment(t.ticketId);
                                          alert(`Payment approved & ticket activated for ${t.userName}!`);
                                        }}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-display font-bold px-2 py-1 rounded cursor-pointer uppercase block"
                                      >
                                        ✓ APPROVE DEBIT
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="space-y-0.5">
                                      <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-display px-2 py-0.5 rounded font-bold uppercase inline-block">
                                        ✓ PAID (SUCCESS)
                                      </span>
                                      {t.paymentId && (
                                        <span className="block text-[9px] font-mono text-emerald-400 truncate max-w-[140px]" title={t.paymentId}>
                                          REF: {t.paymentId}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </td>
                                <td className="py-3 px-3">
                                  {t.checkedIn ? (
                                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-display px-2 py-0.5 rounded font-bold uppercase">
                                      CHECKED IN ({t.checkedInAt?.slice(11, 16) || 'ADMITTED'})
                                    </span>
                                  ) : (
                                    <span className="bg-amber-950 text-amber-300 border border-amber-500/40 text-[10px] font-display px-2 py-0.5 rounded font-bold uppercase">
                                      UNCLAIMED
                                    </span>
                                  )}
                                </td>
                                <td className="py-3 px-3 text-right whitespace-nowrap">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => setEditingTicket(t)}
                                      className="bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 font-display text-[11px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow"
                                      title="Edit Transaction"
                                    >
                                      <EditIcon className="w-3.5 h-3.5" />
                                      <span>EDIT</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteTicket(t.ticketId)}
                                      className="bg-red-950/70 hover:bg-red-900 border border-red-500/50 text-red-300 font-display text-[11px] font-bold p-1.5 rounded-lg flex items-center cursor-pointer transition-colors"
                                      title="Delete Transaction"
                                    >
                                      <TrashIcon className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* EDIT TICKET TRANSACTION MODAL */}
                {editingTicket && (
                  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-[#171717] border border-white/20 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                          <div className="text-xs font-display text-[#E60012] font-bold uppercase">EDIT TRANSACTION</div>
                          <h3 className="font-display text-2xl font-bold text-white uppercase">{editingTicket.ticketId}</h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditingTicket(null)}
                          className="text-white/60 hover:text-white p-2 rounded-lg bg-[#050505]"
                        >
                          <CloseIcon className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleUpdateTicket} className="space-y-4">
                        <div>
                          <label className="text-xs font-display text-white/90 font-bold uppercase block">HOLDER NAME *</label>
                          <input
                            type="text"
                            required
                            value={editingTicket.userName}
                            onChange={(e) => setEditingTicket({ ...editingTicket, userName: e.target.value })}
                            className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white mt-1 focus:outline-none focus:border-[#E60012]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-display text-white/90 font-bold uppercase block">PHONE NUMBER *</label>
                            <input
                              type="text"
                              required
                              value={editingTicket.userPhone}
                              onChange={(e) => setEditingTicket({ ...editingTicket, userPhone: e.target.value })}
                              className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-display text-white/90 font-bold uppercase block">EMAIL ADDRESS</label>
                            <input
                              type="email"
                              value={editingTicket.userEmail || ''}
                              onChange={(e) => setEditingTicket({ ...editingTicket, userEmail: e.target.value })}
                              className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white mt-1"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-display text-white/90 font-bold uppercase block">TICKET QUANTITY *</label>
                            <input
                              type="number"
                              required
                              min={1}
                              value={editingTicket.quantity}
                              onChange={(e) => setEditingTicket({ ...editingTicket, quantity: Number(e.target.value) })}
                              className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-display text-white/90 font-bold uppercase block">TOTAL AMOUNT (₹) *</label>
                            <input
                              type="number"
                              required
                              value={editingTicket.totalAmount}
                              onChange={(e) => setEditingTicket({ ...editingTicket, totalAmount: Number(e.target.value) })}
                              className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white mt-1"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-display text-white/90 font-bold uppercase block">PAYMENT STATUS</label>
                            <select
                              value={editingTicket.paymentStatus || 'SUCCESS'}
                              onChange={(e) => setEditingTicket({ ...editingTicket, paymentStatus: e.target.value as any })}
                              className="w-full bg-[#050505] border border-white/20 rounded-xl px-3 py-3 text-sm text-white mt-1"
                            >
                              <option value="SUCCESS">PAID (SUCCESS)</option>
                              <option value="DEBIT_VERIFICATION_REQUIRED">DEBIT VERIFICATION</option>
                              <option value="REFUNDED">REFUNDED</option>
                              <option value="FAILED">FAILED</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-display text-white/90 font-bold uppercase block">GATE CHECK-IN STATUS</label>
                            <div className="flex items-center h-[46px] mt-1">
                              <label className="flex items-center gap-2 cursor-pointer text-xs text-white/80">
                                <input
                                  type="checkbox"
                                  checked={Boolean(editingTicket.checkedIn)}
                                  onChange={(e) => setEditingTicket({
                                    ...editingTicket,
                                    checkedIn: e.target.checked,
                                    checkedInAt: e.target.checked ? (editingTicket.checkedInAt || new Date().toLocaleTimeString('en-IN')) : undefined
                                  })}
                                  className="w-4 h-4 accent-[#E60012] rounded cursor-pointer"
                                />
                                <span>Admitted / Checked In</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <button
                            type="button"
                            onClick={() => setEditingTicket(null)}
                            className="flex-1 bg-[#050505] hover:bg-black border border-white/20 text-white font-display text-xs font-bold py-3.5 rounded-xl uppercase"
                          >
                            CANCEL
                          </button>
                          <button
                            type="submit"
                            className="flex-1 bg-[#E60012] hover:bg-[#C40010] text-white font-display text-xs font-bold py-3.5 rounded-xl uppercase shadow"
                          >
                            SAVE & SYNC TO SUPABASE
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* VIEW 3: SUPER ADMIN - MERCHANDISE, MEMBERSHIP & TOUR ORDERS */}
                {userRole === 'SUPER_ADMIN' && ledgerSubTab === 'MERCH_ORDERS' && (
                  <div>
                    {productOrders.length === 0 ? (
                      <div className="py-12 text-center text-xs text-white/50 font-sans space-y-2">
                        <p className="text-white/70 font-semibold">No merchandise, membership, or tour orders recorded yet.</p>
                        <p className="text-[11px] text-white/40">
                          Whenever supporters purchase merchandise through the shopping cart, join the Red Army membership, or book the Old Trafford trip, their full delivery addresses and Razorpay payment details will display here!
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left text-xs font-sans border-collapse">
                          <thead>
                            <tr className="border-b border-white/15 text-[#E60012] font-display uppercase tracking-wider">
                              <th className="py-3 px-3">ORDER ID</th>
                              <th className="py-3 px-3">TYPE</th>
                              <th className="py-3 px-3">CUSTOMER</th>
                              <th className="py-3 px-3">SHIPPING ADDRESS / DETAILS</th>
                              <th className="py-3 px-3">ITEMS / SIZES</th>
                              <th className="py-3 px-3">TOTAL</th>
                              <th className="py-3 px-3">PAYMENT / FORMSPREE</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10 text-white/80 font-mono">
                            {productOrders.map((o) => {
                              const itemsStr = (o.items || []).map((i) => `${i.name} (${i.size}) x${i.quantity}`).join(', ');

                              return (
                                <tr key={o.orderId} className="hover:bg-white/5 transition-colors">
                                  <td className="py-3 px-3 font-bold text-white">
                                    {o.orderId}
                                    <span className="block text-[10px] text-white/40 font-sans">{o.createdAt}</span>
                                  </td>
                                  <td className="py-3 px-3">
                                    <span className={`text-[10px] font-display px-2 py-0.5 rounded font-bold uppercase ${
                                      o.orderType === 'MERCHANDISE'
                                        ? 'bg-blue-950 text-blue-300 border border-blue-500/30'
                                        : o.orderType === 'MEMBERSHIP'
                                        ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                                        : 'bg-purple-950 text-purple-300 border border-purple-500/30'
                                    }`}>
                                      {o.orderType}
                                    </span>
                                  </td>
                                  <td className="py-3 px-3 font-sans">
                                    <div className="font-semibold text-white">{o.customerName}</div>
                                    <div className="text-[11px] text-white/60">{o.customerPhone}</div>
                                    <div className="text-[10px] text-white/40">{o.customerEmail}</div>
                                  </td>
                                  <td className="py-3 px-3 font-sans max-w-[220px]">
                                    {o.shippingAddress ? (
                                      <div className="text-[11px] text-white/80 line-clamp-2">
                                        {o.shippingAddress.address}, {o.shippingAddress.city} {o.shippingAddress.pincode && `- ${o.shippingAddress.pincode}`}
                                      </div>
                                    ) : o.notes ? (
                                      <div className="text-[11px] text-purple-300">
                                        Details: {o.notes}
                                      </div>
                                    ) : (
                                      <span className="text-white/40 text-[10px]">Digital Pass / No Physical Shipping</span>
                                    )}
                                  </td>
                                  <td className="py-3 px-3 font-sans max-w-[200px]">
                                    <div className="text-[11px] text-white/90 line-clamp-2 font-mono">
                                      {itemsStr || 'Order Items'}
                                    </div>
                                  </td>
                                  <td className="py-3 px-3 text-[#E60012] font-bold">
                                    ₹{o.totalAmount}
                                    <span className="block text-[9px] text-white/40 font-mono font-normal">
                                      Tax: ₹{o.taxAmount} | Fee: ₹{o.platformFee}
                                    </span>
                                  </td>
                                  <td className="py-3 px-3">
                                    <div className="space-y-0.5">
                                      <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-display px-2 py-0.5 rounded font-bold uppercase inline-block">
                                        ✓ PAID
                                      </span>
                                      {o.paymentId && (
                                        <span className="block text-[9px] font-mono text-emerald-400 truncate max-w-[130px]" title={o.paymentId}>
                                          {o.paymentId}
                                        </span>
                                      )}
                                      <span className="block text-[9px] font-sans text-emerald-400/80">
                                        ✉️ Formspree Dispatched
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 7: OLD TRAFFORD TRIP MANAGER */}
            {activeTab === 'TOURS' && (
              <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-8 bg-[#171717] border border-white/10 space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="font-display text-2xl font-bold text-white uppercase flex items-center gap-2">
                    <ShieldIcon className="w-6 h-6 text-[#E60012]" />
                    <span>OLD TRAFFORD GROUP TRIP MANAGER</span>
                  </h2>
                  <p className="text-xs text-white/60 font-sans mt-1">
                    Edit text content, dates, banner photos, highlights, inclusions, and registration links for the Old Trafford Group Trip.
                  </p>
                </div>

                <form onSubmit={handleSaveTourConfig} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-display text-white/90 font-bold uppercase block">TRIP TITLE *</label>
                      <input
                        type="text"
                        required
                        value={tourConfig.title}
                        onChange={(e) => setTourConfig({ ...tourConfig, title: e.target.value })}
                        className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-sans mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-display text-white/90 font-bold uppercase block">NEXT BATCH DATES *</label>
                      <input
                        type="text"
                        required
                        value={tourConfig.nextBatch}
                        onChange={(e) => setTourConfig({ ...tourConfig, nextBatch: e.target.value })}
                        className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-sans mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-display text-white/90 font-bold uppercase block">TRIP DURATION *</label>
                    <input
                      type="text"
                      required
                      value={tourConfig.duration}
                      onChange={(e) => setTourConfig({ ...tourConfig, duration: e.target.value })}
                      className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-sans mt-1"
                    />
                  </div>

                  <ImageUploadOrUrlField
                    label="FEATURED BANNER IMAGE"
                    value={tourConfig.image || ''}
                    onChange={(img) => setTourConfig({ ...tourConfig, image: img })}
                    required
                    aspectRatio="video"
                  />

                  {/* Trip Pricing, Tax Rate & Platform Fee Slab */}
                  <div className="bg-[#050505] p-5 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2 text-xs font-display text-white font-bold uppercase">
                        <PriceIcon className="w-4 h-4 text-[#E60012]" />
                        <span>OLD TRAFFORD TRIP PRICING & TAX SLAB</span>
                      </div>
                      <span className="text-[10px] font-mono text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded">
                        PILGRIMAGE BOOKING
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-display text-white/90 font-bold uppercase block">PACKAGE PRICE (₹)</label>
                        <input
                          type="number"
                          value={tourConfig.price ?? 125000}
                          onChange={(e) => {
                            const val = e.target.value === '' ? 0 : Number(e.target.value);
                            setTourConfig({ ...tourConfig, price: val });
                          }}
                          className="w-full bg-[#121212] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-mono mt-1 focus:outline-none focus:border-[#E60012]"
                        />
                        <span className="text-[10px] text-white/50 font-sans mt-0.5 block">Default: ₹1,25,000 per supporter</span>
                      </div>

                      <div>
                        <label className="text-xs font-display text-white/90 font-bold uppercase block">TOUR TAX RATE (%)</label>
                        <input
                          type="number"
                          step="1"
                          value={Math.round(((tourConfig.taxRate ?? siteTaxConfig.toursTaxRate ?? 0.05) * 100))}
                          onChange={(e) => {
                            const val = e.target.value === '' ? 0 : Number(e.target.value);
                            setTourConfig({ ...tourConfig, taxRate: val / 100 });
                            setSiteTaxConfig({ ...siteTaxConfig, toursTaxRate: val / 100 });
                          }}
                          className="w-full bg-[#121212] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-mono mt-1 focus:outline-none focus:border-[#E60012]"
                        />
                        <span className="text-[10px] text-white/50 font-sans mt-0.5 block">Standard: 5%</span>
                      </div>

                      <div>
                        <label className="text-xs font-display text-white/90 font-bold uppercase block">TOUR PLATFORM FEE (%)</label>
                        <input
                          type="number"
                          step="1"
                          value={Math.round(((tourConfig.platformFeeRate ?? siteTaxConfig.toursPlatformFeeRate ?? 0.02) * 100))}
                          onChange={(e) => {
                            const val = e.target.value === '' ? 0 : Number(e.target.value);
                            setTourConfig({ ...tourConfig, platformFeeRate: val / 100 });
                            setSiteTaxConfig({ ...siteTaxConfig, toursPlatformFeeRate: val / 100 });
                          }}
                          className="w-full bg-[#121212] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-mono mt-1 focus:outline-none focus:border-[#E60012]"
                        />
                        <span className="text-[10px] text-white/50 font-sans mt-0.5 block">Standard: 2% Booking Fee</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-display text-white/90 font-bold uppercase block">SHORT SUBTITLE DESCRIPTION</label>
                    <input
                      type="text"
                      value={tourConfig.subtitle}
                      onChange={(e) => setTourConfig({ ...tourConfig, subtitle: e.target.value })}
                      className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-sans mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-display text-white/90 font-bold uppercase block">MAIN TRIP DESCRIPTION</label>
                    <textarea
                      rows={3}
                      value={tourConfig.description}
                      onChange={(e) => setTourConfig({ ...tourConfig, description: e.target.value })}
                      className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-sans mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-display text-white/90 font-bold uppercase block">
                      INCLUDED PILGRIMAGE FEATURES (ONE PER LINE)
                    </label>
                    <textarea
                      rows={4}
                      value={tourConfig.includedFeatures?.join('\n') || ''}
                      onChange={(e) => setTourConfig({ ...tourConfig, includedFeatures: e.target.value.split('\n').filter(Boolean) })}
                      className="w-full bg-[#050505] border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-sans mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#E60012] hover:bg-[#C40010] text-white font-display text-base font-bold py-4 rounded-xl shadow-lg uppercase"
                  >
                    SAVE & PUBLISH OLD TRAFFORD TRIP CHANGES
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
