import QRCode from 'qrcode';
import { Screening, GalleryItem, Product, MembershipConfig, TourConfig } from './types';
import { upcomingScreenings, galleryImages as defaultGallery, merchandiseProducts as defaultProducts, defaultMembershipConfig, defaultTourConfig } from './data';
import { supabase } from './supabaseClient';

export interface AdminTicketRecord {
  ticketId: string;
  screeningId: string;
  matchTitle: string;
  venue: string;
  date: string;
  time: string;
  quantity: number;
  totalAmount: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  bookingDate: string;
  qrDataUrl: string;
  checkedIn: boolean;
  checkedInAt?: string;
  checkedInBy?: string;
  paymentStatus?: 'SUCCESS' | 'FAILED' | 'DEBIT_VERIFICATION_REQUIRED';
}

// LocalStorage Persistence Keys
const TICKETS_STORAGE_KEY = 'musc_pune_tickets_v1';
const SCREENINGS_STORAGE_KEY = 'musc_pune_screenings_v1';
const SCREENINGS_EDITS_KEY = 'musc_pune_screenings_edits_v1';
const SCREENINGS_DELETED_KEY = 'musc_pune_screenings_deleted_v1';
const GALLERY_STORAGE_KEY = 'musc_pune_gallery_v1';
const PRODUCTS_STORAGE_KEY = 'musc_pune_products_v1';
const MEMBERSHIP_CONFIG_KEY = 'musc_pune_membership_config_v1';
const TOUR_CONFIG_KEY = 'musc_pune_tour_config_v1';

// Helper to safely load data from LocalStorage
const loadStorage = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

// Helper to save data to LocalStorage
const saveStorage = <T>(key: string, data: T) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore quota errors
  }
};

// INITIAL LOAD
let ticketsMemory: AdminTicketRecord[] = loadStorage(TICKETS_STORAGE_KEY, []);
let screeningEditsMemory: Record<string, Screening> = loadStorage(SCREENINGS_EDITS_KEY, {});
let screeningDeletedMemory: string[] = loadStorage(SCREENINGS_DELETED_KEY, []);
let screeningsMemory: Screening[] = loadStorage(SCREENINGS_STORAGE_KEY, upcomingScreenings);
let galleryMemory: GalleryItem[] = loadStorage(GALLERY_STORAGE_KEY, defaultGallery);
let productsMemory: Product[] = loadStorage(PRODUCTS_STORAGE_KEY, defaultProducts);
let membershipConfigMemory: MembershipConfig = loadStorage(MEMBERSHIP_CONFIG_KEY, defaultMembershipConfig);
let tourConfigMemory: TourConfig = loadStorage(TOUR_CONFIG_KEY, defaultTourConfig);

// Helper to apply user edits & deletions on top of base screenings list so edits NEVER get reverted
export const applyScreeningOverrides = (baseList: Screening[]): Screening[] => {
  const deletedSet = new Set(screeningDeletedMemory);
  let filtered = (baseList || []).filter((s) => !deletedSet.has(s.id));
  filtered = filtered.map((s) => (screeningEditsMemory[s.id] ? { ...s, ...screeningEditsMemory[s.id] } : s));
  const baseIds = new Set(filtered.map((s) => s.id));
  const additions = Object.values(screeningEditsMemory).filter((s) => !baseIds.has(s.id) && !deletedSet.has(s.id));
  return [...additions, ...filtered];
};

// LISTENERS FOR REACTIVE UPDATES ACROSS COMPONENTS
type Listener = () => void;
const listeners: Set<Listener> = new Set();

const notifyListeners = () => {
  listeners.forEach((cb) => cb());
};

export const subscribeStore = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (
      e.key === TICKETS_STORAGE_KEY ||
      e.key === SCREENINGS_STORAGE_KEY ||
      e.key === GALLERY_STORAGE_KEY ||
      e.key === PRODUCTS_STORAGE_KEY ||
      e.key === MEMBERSHIP_CONFIG_KEY ||
      e.key === TOUR_CONFIG_KEY
    ) {
      ticketsMemory = loadStorage(TICKETS_STORAGE_KEY, ticketsMemory);
      screeningsMemory = loadStorage(SCREENINGS_STORAGE_KEY, screeningsMemory);
      galleryMemory = loadStorage(GALLERY_STORAGE_KEY, galleryMemory);
      productsMemory = loadStorage(PRODUCTS_STORAGE_KEY, productsMemory);
      membershipConfigMemory = loadStorage(MEMBERSHIP_CONFIG_KEY, membershipConfigMemory);
      tourConfigMemory = loadStorage(TOUR_CONFIG_KEY, tourConfigMemory);
      notifyListeners();
    }
  });

  // Periodic polling every 4s to reflect admin edits across all devices live
  setInterval(() => {
    fetchScreeningsRemoteAsync();
    fetchProductsRemoteAsync();
    fetchGalleryRemoteAsync();
    fetchConfigRemoteAsync();
  }, 4000);
}

// Helper to sync ticket record to Supabase if configured
const syncTicketToSupabase = async (record: AdminTicketRecord) => {
  try {
    // 1. Dual Backup: Post to Next.js API endpoint
    fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    }).catch(() => {});

    // 2. Direct Supabase client upsert
    if (supabase) {
      await supabase.from('tickets').upsert({
        ticket_id: record.ticketId,
        screening_id: record.screeningId,
        match_title: record.matchTitle,
        venue: record.venue,
        date: record.date,
        time: record.time,
        quantity: record.quantity,
        total_amount: record.totalAmount,
        user_name: record.userName,
        user_email: record.userEmail,
        user_phone: record.userPhone,
        qr_data_url: record.qrDataUrl,
        payment_status: record.paymentStatus || 'SUCCESS',
        checked_in: record.checkedIn,
        checked_in_at: record.checkedInAt,
        checked_in_by: record.checkedInBy,
      });
    }
  } catch (err) {
    console.error('Supabase Sync Notice:', err);
  }
};

// -------------------------------------------------------------
// TICKET ENGINE FUNCTIONS
// -------------------------------------------------------------

export const generateTicketPass = async (
  screening: Screening,
  userName: string,
  userEmail: string,
  userPhone: string,
  quantity: number
): Promise<AdminTicketRecord> => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const ticketId = `MUSCPUN-${randomNum}`;
  const qrPayload = ticketId;

  // Generate ultra crisp high-contrast black/white QR code
  const qrDataUrl = await QRCode.toDataURL(qrPayload, {
    width: 450,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  });

  const record: AdminTicketRecord = {
    ticketId,
    screeningId: screening.id,
    matchTitle: screening.matchTitle,
    venue: screening.venueName,
    date: screening.date,
    time: screening.time,
    quantity,
    totalAmount: screening.price * quantity,
    userName,
    userEmail,
    userPhone,
    bookingDate: new Date().toLocaleString('en-IN'),
    qrDataUrl,
    paymentStatus: 'SUCCESS',
    checkedIn: false,
  };

  ticketsMemory = [record, ...ticketsMemory];
  saveStorage(TICKETS_STORAGE_KEY, ticketsMemory);
  syncTicketToSupabase(record);
  notifyListeners();

  return record;
};

// Record a failed / interrupted payment attempt with unique reference ID
export const recordFailedPaymentAttempt = async (
  screening: Screening,
  userName: string,
  userEmail: string,
  userPhone: string,
  quantity: number
): Promise<AdminTicketRecord> => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const ticketId = `MUSCPUN-FAIL-${randomNum}`;
  const qrPayload = ticketId;

  const qrDataUrl = await QRCode.toDataURL(qrPayload, {
    width: 450,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#990000',
      light: '#FFFFFF',
    },
  });

  const record: AdminTicketRecord = {
    ticketId,
    screeningId: screening.id,
    matchTitle: screening.matchTitle,
    venue: screening.venueName,
    date: screening.date,
    time: screening.time,
    quantity,
    totalAmount: screening.price * quantity,
    userName,
    userEmail,
    userPhone,
    bookingDate: new Date().toLocaleString('en-IN'),
    qrDataUrl,
    paymentStatus: 'DEBIT_VERIFICATION_REQUIRED',
    checkedIn: false,
  };

  ticketsMemory = [record, ...ticketsMemory];
  saveStorage(TICKETS_STORAGE_KEY, ticketsMemory);
  syncTicketToSupabase(record);
  notifyListeners();

  return record;
};

// Admin Manual Approval for Debited Payments
export const approveDebitedPayment = async (ticketId: string) => {
  const allTickets = getTicketStore();
  const foundIndex = allTickets.findIndex((t) => t.ticketId === ticketId);
  if (foundIndex === -1) return;

  const target = allTickets[foundIndex];
  target.paymentStatus = 'SUCCESS';
  // Upgrade ID from FAIL to valid pass if needed
  if (target.ticketId.includes('-FAIL-')) {
    target.ticketId = target.ticketId.replace('-FAIL-', '-APPROVED-');
  }

  allTickets[foundIndex] = target;
  ticketsMemory = allTickets;
  saveStorage(TICKETS_STORAGE_KEY, ticketsMemory);
  syncTicketToSupabase(target);
  notifyListeners();
};

export const getTicketStore = (): AdminTicketRecord[] => {
  return loadStorage(TICKETS_STORAGE_KEY, ticketsMemory);
};

export const fetchRemoteTicketsAsync = async (): Promise<AdminTicketRecord[]> => {
  try {
    const res = await fetch('/api/tickets');
    if (res.ok) {
      const json = await res.json();
      if (json.tickets && Array.isArray(json.tickets)) {
        const remoteIds = new Set(json.tickets.map((t: AdminTicketRecord) => t.ticketId));
        const localOnly = ticketsMemory.filter((t) => !remoteIds.has(t.ticketId));
        const merged = [...json.tickets, ...localOnly];
        ticketsMemory = merged;
        saveStorage(TICKETS_STORAGE_KEY, merged);
        notifyListeners();
        return merged;
      }
    }
  } catch (err) {
    console.error('Fetch remote tickets error:', err);
  }
  return ticketsMemory;
};

export const verifyTicketScanAsync = async (
  scannedCode: string,
  adminName: string = 'Gate Admin 1'
): Promise<{ status: 'VALID' | 'ALREADY_USED' | 'INVALID'; ticket?: AdminTicketRecord; checkedInAt?: string }> => {
  if (!scannedCode) return { status: 'INVALID' };

  const rawText = scannedCode.trim();
  let ticketId = rawText;

  const match = rawText.match(/MUSCPUN-(?:FAIL-|APPROVED-)?\d+/i);
  if (match) {
    ticketId = match[0].toUpperCase();
  }

  // 1. Check local memory first
  let allTickets = getTicketStore();
  let foundIndex = allTickets.findIndex(
    (t) => t.ticketId.toUpperCase() === ticketId.toUpperCase() || (t.userPhone && t.userPhone.includes(ticketId))
  );

  // 2. If not found in local memory, query Supabase database in real-time!
  if (foundIndex === -1 && supabase) {
    try {
      const { data } = await supabase
        .from('tickets')
        .select('*')
        .or(`ticket_id.ilike.${ticketId},user_phone.ilike.%${ticketId}%`)
        .limit(1);

      if (data && data.length > 0) {
        const row = data[0];
        const remoteRecord: AdminTicketRecord = {
          ticketId: row.ticket_id,
          screeningId: row.screening_id,
          matchTitle: row.match_title,
          venue: row.venue,
          date: row.date,
          time: row.time,
          quantity: row.quantity,
          totalAmount: Number(row.total_amount),
          userName: row.user_name,
          userEmail: row.user_email,
          userPhone: row.user_phone,
          bookingDate: row.booking_date ? new Date(row.booking_date).toLocaleString('en-IN') : new Date().toLocaleString('en-IN'),
          qrDataUrl: row.qr_data_url || '',
          paymentStatus: row.payment_status || 'SUCCESS',
          checkedIn: Boolean(row.checked_in),
          checkedInAt: row.checked_in_at,
          checkedInBy: row.checked_in_by,
        };

        ticketsMemory = [remoteRecord, ...ticketsMemory];
        saveStorage(TICKETS_STORAGE_KEY, ticketsMemory);
        allTickets = ticketsMemory;
        foundIndex = 0;
      }
    } catch (err) {
      console.error('Supabase query error during scan:', err);
    }
  }

  if (foundIndex === -1) {
    return { status: 'INVALID' };
  }

  const target = allTickets[foundIndex];

  if (target.checkedIn) {
    return {
      status: 'ALREADY_USED',
      ticket: target,
      checkedInAt: target.checkedInAt,
    };
  }

  const nowStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  target.checkedIn = true;
  target.checkedInAt = nowStr;
  target.checkedInBy = adminName;

  allTickets[foundIndex] = target;
  ticketsMemory = allTickets;
  saveStorage(TICKETS_STORAGE_KEY, ticketsMemory);
  syncTicketToSupabase(target);
  notifyListeners();

  return {
    status: 'VALID',
    ticket: target,
    checkedInAt: nowStr,
  };
};

export const verifyTicketScan = (
  scannedCode: string,
  adminName: string = 'Gate Admin 1'
): { status: 'VALID' | 'ALREADY_USED' | 'INVALID'; ticket?: AdminTicketRecord; checkedInAt?: string } => {
  if (!scannedCode) return { status: 'INVALID' };

  const rawText = scannedCode.trim();
  let ticketId = rawText;

  const match = rawText.match(/MUSCPUN-(?:FAIL-|APPROVED-)?\d+/i);
  if (match) {
    ticketId = match[0].toUpperCase();
  }

  const allTickets = getTicketStore();
  const foundIndex = allTickets.findIndex(
    (t) => t.ticketId.toUpperCase() === ticketId.toUpperCase() || (t.userPhone && t.userPhone.includes(ticketId))
  );

  if (foundIndex === -1) {
    return { status: 'INVALID' };
  }

  const target = allTickets[foundIndex];

  if (target.checkedIn) {
    return {
      status: 'ALREADY_USED',
      ticket: target,
      checkedInAt: target.checkedInAt,
    };
  }

  const nowStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  target.checkedIn = true;
  target.checkedInAt = nowStr;
  target.checkedInBy = adminName;

  allTickets[foundIndex] = target;
  ticketsMemory = allTickets;
  saveStorage(TICKETS_STORAGE_KEY, ticketsMemory);
  syncTicketToSupabase(target);
  notifyListeners();

  return {
    status: 'VALID',
    ticket: target,
    checkedInAt: nowStr,
  };
};

// -------------------------------------------------------------
// DYNAMIC SCREENINGS ADMIN MANAGEMENT (FULL CRUD)
// -------------------------------------------------------------

// Helper to sync screening record to Supabase
const syncScreeningToSupabase = async (item: Screening) => {
  try {
    fetch('/api/screenings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    }).catch(() => {});

    if (supabase) {
      await supabase.from('screenings').upsert({
        id: item.id,
        match_title: item.matchTitle,
        competition: item.competition || 'Premier League',
        home_team: item.homeTeam || 'Manchester United',
        away_team: item.awayTeam || 'Opponent',
        home_logo: item.homeLogo || '🔴',
        away_logo: item.awayLogo || '🔴',
        date: item.date,
        time: item.time,
        venue_name: item.venueName,
        venue_address: item.venueAddress || item.venueName,
        venue_area: item.venueArea || 'Central Pune',
        price: item.price,
        active_phase_name: item.activePhaseName || 'PHASE 1',
        phases: item.phases || [],
        tax_rate: item.taxRate ?? 0.18,
        platform_fee_rate: item.platformFeeRate ?? 0.03,
        featured: Boolean(item.featured),
        status: item.status || 'UPCOMING',
        description: item.description || '',
        gate_opening: item.gateOpening || '07:30 PM IST',
        inclusions: item.inclusions || [],
        rules: item.rules || [],
        capacity: item.capacity || 250,
        remaining_seats: item.remainingSeats || 250,
      });
    }
  } catch (err) {
    console.error('Supabase screening sync error:', err);
  }
};

export const getScreeningsStore = (): Screening[] => {
  const stored = loadStorage(SCREENINGS_STORAGE_KEY, screeningsMemory);
  return applyScreeningOverrides(stored);
};

export const fetchScreeningsRemoteAsync = async (): Promise<Screening[]> => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('screenings').select('*');
      if (!error && data && data.length > 0) {
        const remoteScreenings: Screening[] = data.map((row: any) => ({
          id: row.id,
          matchTitle: row.match_title,
          competition: row.competition || 'Premier League',
          homeTeam: row.home_team || 'Manchester United',
          awayTeam: row.away_team || 'Opponent',
          homeLogo: row.home_logo || '🔴',
          awayLogo: row.away_logo || '🔴',
          date: row.date,
          time: row.time,
          venueName: row.venue_name,
          venueAddress: row.venue_address || row.venue_name,
          venueArea: row.venue_area || 'Central Pune',
          price: Number(row.price),
          activePhaseName: row.active_phase_name || 'PHASE 1',
          phases: row.phases || [],
          taxRate: row.tax_rate ? Number(row.tax_rate) : 0.18,
          platformFeeRate: row.platform_fee_rate ? Number(row.platform_fee_rate) : 0.03,
          featured: Boolean(row.featured),
          status: row.status || 'UPCOMING',
          description: row.description || '',
          gateOpening: row.gate_opening || '07:30 PM IST',
          inclusions: row.inclusions || [],
          rules: row.rules || [],
          capacity: row.capacity || 250,
          remainingSeats: row.remaining_seats || 250,
        }));

        const merged = applyScreeningOverrides(remoteScreenings);
        screeningsMemory = merged;
        saveStorage(SCREENINGS_STORAGE_KEY, merged);
        notifyListeners();
        return merged;
      }
    }

    const res = await fetch('/api/screenings');
    if (res.ok) {
      const json = await res.json();
      if (json && json.screenings && Array.isArray(json.screenings) && json.screenings.length > 0) {
        const merged = applyScreeningOverrides(json.screenings);
        screeningsMemory = merged;
        saveStorage(SCREENINGS_STORAGE_KEY, merged);
        notifyListeners();
        return merged;
      }
    }
  } catch (err) {
    console.error('Fetch remote screenings error:', err);
  }
  return applyScreeningOverrides(screeningsMemory);
};

export const addScreeningToStore = (newScreening: Screening) => {
  screeningEditsMemory[newScreening.id] = newScreening;
  saveStorage(SCREENINGS_EDITS_KEY, screeningEditsMemory);
  // Ensure it's un-deleted if re-added
  screeningDeletedMemory = screeningDeletedMemory.filter((id) => id !== newScreening.id);
  saveStorage(SCREENINGS_DELETED_KEY, screeningDeletedMemory);

  screeningsMemory = applyScreeningOverrides([newScreening, ...screeningsMemory]);
  saveStorage(SCREENINGS_STORAGE_KEY, screeningsMemory);
  notifyListeners();
  syncScreeningToSupabase(newScreening);
};

export const updateScreeningInStore = (updatedScreening: Screening) => {
  screeningEditsMemory[updatedScreening.id] = updatedScreening;
  saveStorage(SCREENINGS_EDITS_KEY, screeningEditsMemory);

  screeningsMemory = applyScreeningOverrides(screeningsMemory.map((s) => (s.id === updatedScreening.id ? { ...s, ...updatedScreening } : s)));
  saveStorage(SCREENINGS_STORAGE_KEY, screeningsMemory);
  notifyListeners();
  syncScreeningToSupabase(updatedScreening);
};

export const deleteScreeningFromStore = (screeningId: string) => {
  if (!screeningDeletedMemory.includes(screeningId)) {
    screeningDeletedMemory = [...screeningDeletedMemory, screeningId];
    saveStorage(SCREENINGS_DELETED_KEY, screeningDeletedMemory);
  }
  delete screeningEditsMemory[screeningId];
  saveStorage(SCREENINGS_EDITS_KEY, screeningEditsMemory);

  screeningsMemory = applyScreeningOverrides(screeningsMemory.filter((s) => s.id !== screeningId));
  saveStorage(SCREENINGS_STORAGE_KEY, screeningsMemory);
  notifyListeners();
  fetch(`/api/screenings?id=${screeningId}`, { method: 'DELETE' }).catch(() => {});
  if (supabase) {
    Promise.resolve(supabase.from('screenings').delete().eq('id', screeningId)).catch(() => {});
  }
};

export const updateScreeningPrice = (screeningId: string, price: number, taxRate?: number, platformFee?: number) => {
  const current = getScreeningsStore();
  const found = current.find((sc) => sc.id === screeningId);
  if (found) {
    const updated = {
      ...found,
      price,
      taxRate: taxRate !== undefined ? taxRate : found.taxRate,
      platformFee: platformFee !== undefined ? platformFee : found.platformFee,
    };
    updateScreeningInStore(updated);
  }
};

// -------------------------------------------------------------
// DYNAMIC PRODUCTS ADMIN MANAGEMENT (FULL CRUD)
// -------------------------------------------------------------

export const getProductsStore = (): Product[] => {
  return loadStorage(PRODUCTS_STORAGE_KEY, productsMemory);
};

export const fetchProductsRemoteAsync = async (): Promise<Product[]> => {
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      const json = await res.json();
      if (json && json.products && Array.isArray(json.products)) {
        productsMemory = json.products;
        saveStorage(PRODUCTS_STORAGE_KEY, productsMemory);
        notifyListeners();
        return productsMemory;
      }
    }
  } catch (err) {
    console.error('Fetch remote products error:', err);
  }
  return productsMemory;
};

export const addProductToStore = (newProduct: Product) => {
  productsMemory = [newProduct, ...productsMemory.filter((p) => p.id !== newProduct.id)];
  saveStorage(PRODUCTS_STORAGE_KEY, productsMemory);
  notifyListeners();
  fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  }).catch(() => {});
};

export const updateProductInStore = (updatedProduct: Product) => {
  productsMemory = productsMemory.map((p) => (p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p));
  saveStorage(PRODUCTS_STORAGE_KEY, productsMemory);
  notifyListeners();
  fetch('/api/products', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedProduct),
  }).catch(() => {});
};

export const deleteProductFromStore = (productId: string) => {
  productsMemory = productsMemory.filter((p) => p.id !== productId);
  saveStorage(PRODUCTS_STORAGE_KEY, productsMemory);
  notifyListeners();
  fetch(`/api/products?id=${productId}`, {
    method: 'DELETE',
  }).catch(() => {});
};

// -------------------------------------------------------------
// DYNAMIC MEMBERSHIP CONFIG ADMIN MANAGEMENT
// -------------------------------------------------------------

export const getMembershipConfigStore = (): MembershipConfig => {
  return loadStorage(MEMBERSHIP_CONFIG_KEY, membershipConfigMemory);
};

export const updateMembershipConfigStore = (newConfig: MembershipConfig) => {
  membershipConfigMemory = newConfig;
  saveStorage(MEMBERSHIP_CONFIG_KEY, membershipConfigMemory);
  notifyListeners();
  fetch('/api/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: 'membership', value: newConfig }),
  }).catch(() => {});
};

// -------------------------------------------------------------
// DYNAMIC GALLERY ADMIN MANAGEMENT (FULL CRUD)
// -------------------------------------------------------------

export const getGalleryStore = (): GalleryItem[] => {
  const stored = loadStorage(GALLERY_STORAGE_KEY, galleryMemory);
  const cleanStored = stored.filter((g) => !g.id.startsWith('gal-pune-2026-'));
  const storedIds = new Set(cleanStored.map((g) => g.id));
  const missingDefaults = defaultGallery.filter((g) => !storedIds.has(g.id));
  if (missingDefaults.length > 0 || cleanStored.length !== stored.length) {
    const merged = [...missingDefaults, ...cleanStored];
    saveStorage(GALLERY_STORAGE_KEY, merged);
    galleryMemory = merged;
    return merged;
  }
  return stored;
};

export const fetchGalleryRemoteAsync = async (): Promise<GalleryItem[]> => {
  try {
    const res = await fetch('/api/gallery');
    if (res.ok) {
      const json = await res.json();
      if (json && json.gallery && Array.isArray(json.gallery)) {
        galleryMemory = json.gallery;
        saveStorage(GALLERY_STORAGE_KEY, galleryMemory);
        notifyListeners();
        return galleryMemory;
      }
    }
  } catch (err) {
    console.error('Fetch remote gallery error:', err);
  }
  return galleryMemory;
};

export const addGalleryItemToStore = (newItem: GalleryItem) => {
  galleryMemory = [newItem, ...galleryMemory.filter((g) => g.id !== newItem.id)];
  saveStorage(GALLERY_STORAGE_KEY, galleryMemory);
  notifyListeners();
  fetch('/api/gallery', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem),
  }).catch(() => {});
};

export const deleteGalleryItemFromStore = (galleryId: string) => {
  galleryMemory = galleryMemory.filter((g) => g.id !== galleryId);
  saveStorage(GALLERY_STORAGE_KEY, galleryMemory);
  notifyListeners();
  fetch(`/api/gallery?id=${galleryId}`, {
    method: 'DELETE',
  }).catch(() => {});
};

// -------------------------------------------------------------
// DYNAMIC TOUR CONFIG ADMIN MANAGEMENT
// -------------------------------------------------------------

export const getTourConfigStore = (): TourConfig => {
  return loadStorage(TOUR_CONFIG_KEY, tourConfigMemory);
};

export const updateTourConfigStore = (newConfig: TourConfig) => {
  tourConfigMemory = newConfig;
  saveStorage(TOUR_CONFIG_KEY, tourConfigMemory);
  notifyListeners();
  fetch('/api/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: 'tour', value: newConfig }),
  }).catch(() => {});
};

export const fetchConfigRemoteAsync = async (): Promise<{ membership?: MembershipConfig; tour?: TourConfig }> => {
  try {
    const res = await fetch('/api/config');
    if (res.ok) {
      const json = await res.json();
      if (json && json.membership) {
        membershipConfigMemory = json.membership;
        saveStorage(MEMBERSHIP_CONFIG_KEY, membershipConfigMemory);
      }
      if (json && json.tour) {
        tourConfigMemory = json.tour;
        saveStorage(TOUR_CONFIG_KEY, tourConfigMemory);
      }
      notifyListeners();
      return { membership: membershipConfigMemory, tour: tourConfigMemory };
    }
  } catch (err) {
    console.error('Fetch remote config error:', err);
  }
  return { membership: membershipConfigMemory, tour: tourConfigMemory };
};
