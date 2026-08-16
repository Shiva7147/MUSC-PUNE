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
  featured: boolean;
  status: 'UPCOMING' | 'FILLING_FAST' | 'SOLD_OUT';
  description: string;
  gateOpening: string;
  inclusions: string[];
  rules: string[];
}

export interface Product {
  id: string;
  name: string;
  category: 'Apparel' | 'Accessories' | 'Collectibles';
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  availableSizes: string[];
  inStock: boolean;
  badge?: string;
  details: string[];
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

export interface Announcement {
  id: string;
  category: 'NEXT SCREENING' | 'COMMUNITY UPDATE' | 'OLD TRAFFORD TOUR' | 'MERCH DROP';
  date: string;
  title: string;
  snippet: string;
  content: string;
  readTime: string;
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
  totalAmount: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  ticketId: string;
  bookingDate: string;
}
