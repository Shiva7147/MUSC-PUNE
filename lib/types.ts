export interface ScreeningPhase {
  phaseName: string; // e.g. "Phase 1 - Regular Release", "Phase 2", "Phase 3"
  price: number;
  isActive: boolean;
}

export interface Screening {
  id: string;
  matchTitle: string;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  venueArea: string;
  price: number;
  activePhaseName?: string;
  phases?: ScreeningPhase[];
  taxRate?: number; // Configurable tax rate percentage (default 18%)
  platformFee?: number; // Configurable platform fee per ticket (default ₹30)
  featured: boolean;
  status: 'UPCOMING' | 'FILLING_FAST' | 'SOLD_OUT';
  description: string;
  gateOpening: string;
  inclusions: string[];
  rules: string[];
  capacity?: number;
  remainingSeats?: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'Apparel' | 'Accessories' | 'Collectibles';
  price: number;
  originalPrice?: number;
  taxRate?: number; // Configurable tax rate percentage (default 12%)
  platformFee?: number; // Configurable platform fee per product
  image: string;
  description: string;
  availableSizes: string[];
  sizePrices?: { [size: string]: number }; // Admin configurable price per size
  inStock: boolean;
  badge?: string;
  details: string[];
}

export interface MembershipConfig {
  basePrice: number;
  sizePrices: { [size: string]: number };
  taxRate: number; // e.g. 0.18 for 18% GST
  platformFee: number; // e.g. ₹30
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface TourPackage {
  id: string;
  title: string;
  duration: string;
  nextBatch: string;
  matchHighlights: string[];
  includedFeatures: string[];
  image: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Screenings' | 'Matchday Vibe' | 'Tours' | 'Community' | 'Legends';
  imageUrl: string;
  location: string;
  date: string;
  caption: string;
}

export interface FanChant {
  id: string;
  title: string;
  origin: string;
  popularContext: string;
  lyrics: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  bioPlaceholder: string;
  socials: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface TicketBooking {
  screeningId: string;
  matchTitle: string;
  venue: string;
  date: string;
  time: string;
  ticketQuantity: number;
  baseAmount: number;
  taxAmount: number;
  platformFee: number;
  totalAmount: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  ticketId: string;
  bookingDate: string;
}
