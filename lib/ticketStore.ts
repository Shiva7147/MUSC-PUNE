import QRCode from 'qrcode';
import { Screening, GalleryItem, Product, MembershipConfig } from './types';
import { upcomingScreenings, galleryImages as defaultGallery, merchandiseProducts as defaultProducts, defaultMembershipConfig } from './data';

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
}

// LocalStorage Persistence Keys
const TICKETS_STORAGE_KEY = 'musc_pune_tickets_v1';
const SCREENINGS_STORAGE_KEY = 'musc_pune_screenings_v1';
const GALLERY_STORAGE_KEY = 'musc_pune_gallery_v1';
const PRODUCTS_STORAGE_KEY = 'musc_pune_products_v1';
const MEMBERSHIP_CONFIG_KEY = 'musc_pune_membership_config_v1';

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
let screeningsMemory: Screening[] = loadStorage(SCREENINGS_STORAGE_KEY, upcomingScreenings);
let galleryMemory: GalleryItem[] = loadStorage(GALLERY_STORAGE_KEY, defaultGallery);
let productsMemory: Product[] = loadStorage(PRODUCTS_STORAGE_KEY, defaultProducts);
let membershipConfigMemory: MembershipConfig = loadStorage(MEMBERSHIP_CONFIG_KEY, defaultMembershipConfig);

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
    checkedIn: false,
  };

  ticketsMemory = [record, ...ticketsMemory];
  saveStorage(TICKETS_STORAGE_KEY, ticketsMemory);
  notifyListeners();

  return record;
};

export const getTicketStore = (): AdminTicketRecord[] => {
  return loadStorage(TICKETS_STORAGE_KEY, ticketsMemory);
};

export const verifyTicketScan = (
  scannedCode: string,
  adminName: string = 'Gate Admin 1'
): { status: 'VALID' | 'ALREADY_USED' | 'INVALID'; ticket?: AdminTicketRecord; checkedInAt?: string } => {
  if (!scannedCode) return { status: 'INVALID' };

  const rawText = scannedCode.trim();
  let ticketId = rawText;

  const match = rawText.match(/MUSCPUN-\d+/i);
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
  notifyListeners();

  return {
    status: 'VALID',
    ticket: target,
    checkedInAt: nowStr,
  };
};

// -------------------------------------------------------------
// DYNAMIC SCREENINGS ADMIN MANAGEMENT
// -------------------------------------------------------------

export const getScreeningsStore = (): Screening[] => {
  return loadStorage(SCREENINGS_STORAGE_KEY, screeningsMemory);
};

export const addScreeningToStore = (newScreening: Screening) => {
  screeningsMemory = [newScreening, ...screeningsMemory];
  saveStorage(SCREENINGS_STORAGE_KEY, screeningsMemory);
  notifyListeners();
};

export const updateScreeningPrice = (screeningId: string, price: number, taxRate?: number, platformFee?: number) => {
  const current = getScreeningsStore();
  const updated = current.map((sc) => {
    if (sc.id === screeningId) {
      return {
        ...sc,
        price,
        taxRate: taxRate !== undefined ? taxRate : sc.taxRate,
        platformFee: platformFee !== undefined ? platformFee : sc.platformFee,
      };
    }
    return sc;
  });
  screeningsMemory = updated;
  saveStorage(SCREENINGS_STORAGE_KEY, screeningsMemory);
  notifyListeners();
};

// -------------------------------------------------------------
// DYNAMIC PRODUCTS ADMIN MANAGEMENT
// -------------------------------------------------------------

export const getProductsStore = (): Product[] => {
  return loadStorage(PRODUCTS_STORAGE_KEY, productsMemory);
};

export const addProductToStore = (newProduct: Product) => {
  productsMemory = [newProduct, ...productsMemory];
  saveStorage(PRODUCTS_STORAGE_KEY, productsMemory);
  notifyListeners();
};

export const updateProductInStore = (updatedProduct: Product) => {
  const current = getProductsStore();
  const updated = current.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
  productsMemory = updated;
  saveStorage(PRODUCTS_STORAGE_KEY, productsMemory);
  notifyListeners();
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
};

// -------------------------------------------------------------
// DYNAMIC GALLERY ADMIN MANAGEMENT
// -------------------------------------------------------------

export const getGalleryStore = (): GalleryItem[] => {
  return loadStorage(GALLERY_STORAGE_KEY, galleryMemory);
};

export const addGalleryItemToStore = (newItem: GalleryItem) => {
  galleryMemory = [newItem, ...galleryMemory];
  saveStorage(GALLERY_STORAGE_KEY, galleryMemory);
  notifyListeners();
};
