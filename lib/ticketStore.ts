import QRCode from 'qrcode';
import { Screening, GalleryItem, Product, MembershipConfig, TourConfig } from './types';
import { upcomingScreenings, galleryImages as defaultGallery, merchandiseProducts as defaultProducts, defaultMembershipConfig, defaultTourConfig } from './data';

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

// Helper to sync ticket record via API route (which uses supabaseAdmin - bypasses RLS)
const syncTicketToSupabase = async (record: AdminTicketRecord) => {
  try {
    fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    }).catch(() => {});
  } catch (err) {
    console.error('Ticket sync error:', err);
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

  // Automatically update the counter for total number of seats filled/remaining
  try {
    const currentScreenings = getScreeningsStore();
    const targetSc = currentScreenings.find((s) => s.id === screening.id || s.matchTitle.toLowerCase() === screening.matchTitle.toLowerCase());
    if (targetSc) {
      const currentRemaining = targetSc.remainingSeats !== undefined ? targetSc.remainingSeats : (targetSc.capacity || 250);
      const updatedRemaining = Math.max(0, currentRemaining - quantity);
      const updatedSc: Screening = {
        ...targetSc,
        remainingSeats: updatedRemaining,
      };
      updateScreeningInStore(updatedSc);
    }
  } catch (err) {
    console.error('Failed to update screening seats remaining:', err);
  }

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
    const res = await fetch('/api/tickets', { cache: 'no-store' });
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

  // 2. If not found in local memory, query via API route (uses supabaseAdmin - bypasses RLS)
  if (foundIndex === -1) {
    try {
      const res = await fetch('/api/tickets', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.tickets && Array.isArray(json.tickets)) {
          const remoteMatch = json.tickets.find(
            (t: AdminTicketRecord) =>
              t.ticketId.toUpperCase() === ticketId.toUpperCase() ||
              (t.userPhone && t.userPhone.includes(ticketId))
          );
          if (remoteMatch) {
            ticketsMemory = [remoteMatch, ...ticketsMemory];
            saveStorage(TICKETS_STORAGE_KEY, ticketsMemory);
            allTickets = ticketsMemory;
            foundIndex = 0;
          }
        }
      }
    } catch (err) {
      console.error('API query error during scan:', err);
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

// Helper to sync screening via API route (which uses supabaseAdmin - bypasses RLS)
const syncScreeningToSupabase = async (item: Screening, method: 'POST' | 'PUT' = 'PUT') => {
  try {
    fetch('/api/screenings', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    }).catch(() => {});
  } catch (err) {
    console.error('Screening sync error:', err);
  }
};

export const getScreeningsStore = (): Screening[] => {
  const stored = loadStorage(SCREENINGS_STORAGE_KEY, screeningsMemory);
  return applyScreeningOverrides(stored);
};

export const fetchScreeningsRemoteAsync = async (): Promise<Screening[]> => {
  try {
    // Always use the API route - it uses supabaseAdmin which bypasses RLS
    const res = await fetch('/api/screenings', { cache: 'no-store' });
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
  // Use POST for new screenings
  syncScreeningToSupabase(newScreening, 'POST');
};

export const updateScreeningInStore = (updatedScreening: Screening) => {
  screeningEditsMemory[updatedScreening.id] = updatedScreening;
  saveStorage(SCREENINGS_EDITS_KEY, screeningEditsMemory);

  screeningsMemory = applyScreeningOverrides(screeningsMemory.map((s) => (s.id === updatedScreening.id ? { ...s, ...updatedScreening } : s)));
  saveStorage(SCREENINGS_STORAGE_KEY, screeningsMemory);
  notifyListeners();
  // Use PUT for updates
  syncScreeningToSupabase(updatedScreening, 'PUT');
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
  // API route DELETE uses supabaseAdmin - bypasses RLS
  fetch(`/api/screenings?id=${screeningId}`, { method: 'DELETE' }).catch(() => {});
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
    const res = await fetch('/api/products', { cache: 'no-store' });
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
    const res = await fetch('/api/gallery', { cache: 'no-store' });
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
    const res = await fetch('/api/config', { cache: 'no-store' });
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
