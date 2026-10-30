export interface ScreeningPhase {
  phaseName: string; // e.g. "Phase 1 - Regular Release", "Phase 2", "Phase 3"
  price: number;
  isActive: boolean;
  redeemableAmount?: number;
  entryFeeAmount?: number;
  pricingSplitNotes?: string;
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
  redeemableAmount?: number; // Cover redeemable against Food & Beverages (e.g. 400)
  entryFeeAmount?: number;    // Entry charge (e.g. 100)
  pricingSplitNotes?: string; // e.g. "₹400 redeemable on F&B at bar + ₹100 match entry charge"
  activePhaseName?: string;
  phases?: ScreeningPhase[];
  taxRate?: number; // Configurable tax rate percentage (default 0.18 for 18%)
  platformFeeRate?: number; // Configurable platform fee percentage (default 0.03 for 3%)
  platformFee?: number; // Fallback flat fee
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
  category: 'Apparel' | 'Accessories' | 'Collectibles' | 'Membership';
  price: number;
  originalPrice?: number;
  taxRate?: number; // Configurable tax rate percentage (default 0.18)
  platformFeeRate?: number; // Configurable platform fee percentage (default 0.03)
  platformFee?: number;
  image: string;
  description: string;
  availableSizes: string[];
  sizePrices?: { [size: string]: number }; // Admin configurable price per size
  inStock: boolean;
  stockCount?: number; // Admin configurable stock inventory count
  badge?: string;
  details: string[];
}

export interface SiteTaxConfig {
  screeningsTaxRate: number;      // default 0.18 (18%)
  screeningsPlatformFeeRate: number; // default 0.03 (3%)
  productsTaxRate: number;        // default 0.18 (18%)
  productsPlatformFeeRate: number;   // default 0.03 (3%)
  membershipTaxRate: number;      // default 0.18 (18%)
  membershipPlatformFeeRate: number; // default 0.03 (3%)
  toursTaxRate: number;           // default 0.05 (5%)
  toursPlatformFeeRate: number;      // default 0.02 (2%)
  formspreeEndpoint: string;      // e.g. https://formspree.io/f/...
}

export interface ProductOrderRecord {
  orderId: string;
  paymentId: string;
  orderType: 'MERCHANDISE' | 'MEMBERSHIP' | 'TOUR';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryOption?: 'Free pickup at screening' | 'Home delivery' | string;
  shippingFee?: number;
  shippingAddress?: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: {
    id: string;
    name: string;
    size: string;
    quantity: number;
    price: number;
  }[];
  baseAmount: number;
  taxAmount: number;
  platformFee: number;
  totalAmount: number;
  notes?: string;
  createdAt: string;
  status: 'PAID' | 'DISPATCHED' | 'DELIVERED';
}

export interface MembershipConfig {
  basePrice: number;
  sizePrices: { [size: string]: number };
  taxRate: number; // e.g. 0.18 for 18%
  platformFeeRate: number; // e.g. 0.03 for 3% platform fee
  platformFee?: number;
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

export interface TourConfig {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  nextBatch: string;
  price?: number; // Configurable package price (default 125000)
  taxRate?: number; // Configurable tax rate percentage (default 0.05)
  platformFeeRate?: number; // Configurable platform fee percentage (default 0.02)
  platformFee?: number;
  matchHighlights: string[];
  includedFeatures: string[];
  image: string;
  galleryImages: string[];
  description: string;
  longDescription: string[];
  bookingUrl?: string;
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
  redeemableAmount?: number;
  entryFeeAmount?: number;
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
