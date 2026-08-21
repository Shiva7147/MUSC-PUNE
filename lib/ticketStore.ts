import QRCode from 'qrcode';
import { Screening, Announcement, GalleryItem, TicketBooking } from './types';
import { upcomingScreenings, announcements as defaultAnnouncements, galleryImages as defaultGallery } from './data';

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
const ANNOUNCEMENTS_STORAGE_KEY = 'musc_pune_announcements_v1';
const GALLERY_STORAGE_KEY = 'musc_pune_gallery_v1';

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
let announcementsMemory: Announcement[] = loadStorage(ANNOUNCEMENTS_STORAGE_KEY, defaultAnnouncements);
let galleryMemory: GalleryItem[] = loadStorage(GALLERY_STORAGE_KEY, defaultGallery);

// LISTENERS FOR REACTIVE UPDATES ACROSS COMPONENTS
type Listener = () => void;
const listeners: Set<Listener> = new Set();

const notifyListeners = () => {
  listeners.forEach((cb) => cb());
};

export const subscribeStore = (listener: Listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
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

  // Embedded QR Payload Data Structure
  const qrPayload = JSON.stringify({
    ticketId,
    screeningId: screening.id,
    matchTitle: screening.matchTitle,
    userName,
    userPhone,
    quantity,
    issuedAt: new Date().toISOString(),
  });

  // Generate authentic high-res QR Data URL
  const qrDataUrl = await QRCode.toDataURL(qrPayload, {
    width: 400,
    margin: 2,
    color: {
      dark: '#E60012',
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
    bookingDate: new Date().toLocaleString(),
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
  let ticketId = scannedCode.trim();

  // Try parsing JSON payload if scanned from camera
  try {
    if (scannedCode.startsWith('{')) {
      const parsed = JSON.parse(scannedCode);
      if (parsed.ticketId) {
        ticketId = parsed.ticketId;
      }
    }
  } catch {
    // use raw string
  }

  const allTickets = getTicketStore();
  const foundIndex = allTickets.findIndex(
    (t) => t.ticketId.toUpperCase() === ticketId.toUpperCase() || t.userPhone.includes(ticketId)
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

  // Mark as checked in
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

// -------------------------------------------------------------
// DYNAMIC ANNOUNCEMENTS ADMIN MANAGEMENT
// -------------------------------------------------------------

export const getAnnouncementsStore = (): Announcement[] => {
  return loadStorage(ANNOUNCEMENTS_STORAGE_KEY, announcementsMemory);
};

export const addAnnouncementToStore = (newAnn: Announcement) => {
  announcementsMemory = [newAnn, ...announcementsMemory];
  saveStorage(ANNOUNCEMENTS_STORAGE_KEY, announcementsMemory);
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
