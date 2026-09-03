import { Screening, Product, TourPackage, GalleryItem, FanChant, TeamMember, MembershipConfig } from './types';

export const officialClubDetails = {
  name: 'MUSC Pune',
  fullName: 'Official Manchester United Supporters Club - Pune',
  establishedYear: 2011,
  tagline: "Pune’s Red Army",
  email: 'ebrahimmred@gmail.com',
  grievanceEmail: 'ebrahimmred@gmail.com',
  founderEmail: 'ebrahimmred@gmail.com',
  phone: '+91 7276735140',
  whatsapp: '+91 7276735140',
  socials: {
    instagram: 'https://www.instagram.com/musc_pune',
    facebook: 'https://www.facebook.com/MUSCP/',
    youtube: 'https://www.youtube.com/@MUSCPTV',
    twitter: 'https://x.com/manutd_pune',
  },
  regularVenue: {
    name: 'BIRA 91 Taproom, The Mills',
    area: 'THE MILLS, Pune',
    mapsUrl: 'https://maps.app.goo.gl/g1oSbXmi5YttqbjB6',
  },
  grievanceOfficer: 'Ebrahim Kondkar',
  founder: 'Ebrahim Kondkar',
};

export const officialLogoUrl = 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1787381769/WhatsApp_Image_2026-08-22_at_12.09.49_AM_cof7cr.jpg';
export const officialMembershipImageUrl = 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1787381769/WhatsApp_Image_2026-08-22_at_12.35.49_AM_ox8tpz.jpg';

export const defaultMembershipConfig: MembershipConfig = {
  basePrice: 999,
  sizePrices: {
    'S': 999,
    'M': 999,
    'L': 999,
    'XL': 999,
    'XXL': 1099,
    'XXXL': 1199,
  },
  taxRate: 0.18,
  platformFee: 30,
};

export const upcomingScreenings: Screening[] = [
  {
    id: 'screening-mufc-lfc',
    matchTitle: 'Manchester United vs Liverpool',
    competition: 'Premier League — Matchday 28',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool FC',
    homeLogo: '🔴',
    awayLogo: '🔴',
    date: 'Sunday, March 15, 2026',
    time: '09:00 PM IST',
    venueName: 'BIRA 91 Taproom, The Mills',
    venueAddress: 'THE MILLS, Pune, Maharashtra',
    venueArea: 'THE MILLS / Central Pune',
    price: 350,
    activePhaseName: 'PHASE 1 - REGULAR RELEASE',
    phases: [
      { phaseName: 'PHASE 1 - REGULAR RELEASE', price: 350, isActive: true },
      { phaseName: 'PHASE 2 - ADVANCE TICKETS', price: 400, isActive: false },
      { phaseName: 'PHASE 3 - FINAL RELEASE', price: 450, isActive: false }
    ],
    featured: true,
    status: 'FILLING_FAST',
    description: '90 minutes. One room. Everyone singing. Join MUSC Pune for an iconic match screening with high-decibel audio and chant sessions.',
    gateOpening: '07:30 PM IST',
    inclusions: [
      'Entry to Match Screening Arena',
      'Official MUSC Pune Matchday Badge & Sticker Pack',
      'Entry into Half-time Jersey Giveaway Raffle'
    ],
    rules: [
      'Matchday scarves and red club wear strongly encouraged',
      'Please carry digital ticket QR code on smartphone',
      'Right of admission reserved by MUSC Pune Management',
      'Stag entries allowed subject to prior registration'
    ],
    capacity: 250,
    remainingSeats: 42,
  },
  {
    id: 'screening-mufc-afc',
    matchTitle: 'Arsenal vs Manchester United',
    competition: 'Premier League — Matchday 30',
    homeTeam: 'Arsenal FC',
    awayTeam: 'Manchester United',
    homeLogo: '🔴',
    awayLogo: '🔴',
    date: 'Saturday, April 04, 2026',
    time: '10:00 PM IST',
    venueName: 'BIRA 91 Taproom, The Mills',
    venueAddress: 'THE MILLS, Pune, Maharashtra',
    venueArea: 'THE MILLS / Central Pune',
    price: 300,
    activePhaseName: 'PHASE 1 - REGULAR RELEASE',
    phases: [
      { phaseName: 'PHASE 1 - REGULAR RELEASE', price: 300, isActive: true },
      { phaseName: 'PHASE 2 - ADVANCE TICKETS', price: 350, isActive: false }
    ],
    featured: false,
    status: 'UPCOMING',
    description: 'A classic rivalry under the lights. Big screen projection, taproom atmosphere, and pre-match chant sets.',
    gateOpening: '08:30 PM IST',
    inclusions: [
      'Access to Match Screening Zone',
      'Live Fan Chant Session Led by MUSC Pune'
    ],
    rules: [
      'Valid ID required at entry (18+ venue)',
      'Digital QR code mandatory'
    ],
    capacity: 200,
    remainingSeats: 88,
  },
  {
    id: 'screening-mufc-mcfc',
    matchTitle: 'Manchester United vs Manchester City',
    competition: 'Manchester Derby',
    homeTeam: 'Manchester United',
    awayTeam: 'Manchester City',
    homeLogo: '🔴',
    awayLogo: '🔵',
    date: 'Sunday, April 26, 2026',
    time: '08:00 PM IST',
    venueName: 'BIRA 91 Taproom, The Mills',
    venueAddress: 'THE MILLS, Pune, Maharashtra',
    venueArea: 'THE MILLS / Central Pune',
    price: 400,
    activePhaseName: 'PHASE 1 - REGULAR RELEASE',
    phases: [
      { phaseName: 'PHASE 1 - REGULAR RELEASE', price: 400, isActive: true },
      { phaseName: 'PHASE 2 - ADVANCE TICKETS', price: 450, isActive: false },
      { phaseName: 'PHASE 3 - FINAL RELEASE', price: 500, isActive: false }
    ],
    featured: false,
    status: 'UPCOMING',
    description: 'Derby Day in Pune. The city turns red as we battle for bragging rights. Massive screens, custom stadium lighting, and passionate supporters.',
    gateOpening: '06:30 PM IST',
    inclusions: [
      'Prime Seating with Unobstructed View',
      'Derby Special Commemorative Wristband'
    ],
    rules: [
      'Arrive at least 45 minutes prior to kickoff',
      'Non-refundable ticket passes'
    ],
    capacity: 300,
    remainingSeats: 115,
  }
];

export const merchandiseProducts: Product[] = [
  {
    id: 'merch-scarf',
    name: 'Manchester United Supporter Scarf',
    category: 'Accessories',
    price: 799,
    originalPrice: 999,
    image: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865350/pune-mufc-scarf-600x600_q27exs.png',
    description: 'Classic football terrace scarf with red, black, and white detail. Dual-sided weave featuring "MANCHESTER UNITED SUPPORTERS CLUB PUNE". Essential matchday gear.',
    availableSizes: ['ONE SIZE'],
    inStock: true,
    badge: 'OFFICIAL MERCH • BESTSELLER',
    details: [
      'High-bulk soft acrylic Jacquard knit',
      'Traditional tassel finish',
      'Double-sided woven crest branding',
      'Essential matchday accessory for screenings'
    ]
  },
  {
    id: 'merch-mug',
    name: 'MUFC Mug',
    category: 'Accessories',
    price: 499,
    originalPrice: 649,
    image: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865356/IMG_8440-600x600_klqhi3.jpg',
    description: 'Official Supporters Club Pune ceramic mug with high-gloss finish, featuring the authentic emblem.',
    availableSizes: ['STANDARD'],
    inStock: true,
    badge: 'OFFICIAL MERCH',
    details: [
      'High-grade ceramic construction',
      'Fade-proof emblem print',
      'Official Supporters Club Pune seal'
    ]
  }
];

export const oldTraffordTours: TourPackage[] = [
  {
    id: 'tour-autumn-2026',
    title: 'Trip to Old Trafford',
    duration: '7 Days / 6 Nights',
    nextBatch: 'October 18 – 24, 2026',
    matchHighlights: ['Match Tickets', 'Stadium and Museum Tour', 'Accommodation'],
    includedFeatures: [
      'Guaranteed Match Ticket for Premier League Fixture',
      'Group Flight Assistance (PNQ ➔ MAN)',
      'Hotel Accommodation near Old Trafford',
      'Exclusive Manchester Supporters Meetup',
      'Guided Stadium and Museum Tour'
    ],
    image: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865406/WhatsApp_Image_2026-08-16_at_11.53.51_AM_13_arf4zr.jpg',
    description: 'From Pune to Old Trafford. Fly out with fellow Pune supporters from PNQ to Manchester to witness United live at the Theatre of Dreams with match tickets, stadium and museum tour, and accommodation included.'
  }
];

export const galleryImages: GalleryItem[] = [
  {
    id: 'gal-ot-main',
    title: 'Trip to Old Trafford Pilgrimage',
    category: 'Tours',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865406/WhatsApp_Image_2026-08-16_at_11.53.51_AM_13_arf4zr.jpg',
    location: 'Old Trafford, Manchester',
    date: '10.11.2025',
    caption: 'MUSC Pune delegation standing outside the Holy Trinity statue at Old Trafford.'
  },
  {
    id: 'gal-ot-team',
    title: 'MUSC Pune Team at Old Trafford',
    category: 'Tours',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865422/WhatsApp_Image_2026-08-16_at_12.29.15_PM_kzh1u3.jpg',
    location: 'Sir Matt Busby Way, Manchester',
    date: '10.11.2025',
    caption: 'Group trip delegation representing MUSC Pune outside the stadium.'
  },
  {
    id: 'gal-dressing-room',
    title: 'Inside Old Trafford Dressing Room',
    category: 'Tours',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865408/WhatsApp_Image_2026-08-16_at_11.53.51_AM_1_eibvrj.jpg',
    location: 'First-Team Dressing Room, Old Trafford',
    date: '11.11.2025',
    caption: 'MUSC Pune members inside the sacred United dressing room.'
  },
  {
    id: 'gal-legend-1',
    title: 'Meeting United Legends',
    category: 'Legends',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865408/WhatsApp_Image_2026-08-16_at_11.53.51_AM_3_eivq1o.jpg',
    location: 'Manchester, UK',
    date: '12.11.2025',
    caption: 'MUSC Pune members alongside Manchester United club legends.'
  },
  {
    id: 'gal-legend-2',
    title: 'United Legend Interaction',
    category: 'Legends',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865410/WhatsApp_Image_2026-08-16_at_11.53.51_AM_7_jjrpdm.jpg',
    location: 'Manchester, UK',
    date: '12.11.2025',
    caption: 'Exclusive meet and greet with United legends.'
  },
  {
    id: 'gal-legend-3',
    title: 'Matchday Lounge with Legends',
    category: 'Legends',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865410/WhatsApp_Image_2026-08-16_at_11.53.51_AM_9_grsajx.jpg',
    location: 'Old Trafford Executive Suites',
    date: '12.11.2025',
    caption: 'Unforgettable moments with Manchester United icons.'
  },
  {
    id: 'gal-legend-4',
    title: 'Supporters Club Legend Meet',
    category: 'Legends',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865423/WhatsApp_Image_2026-08-16_at_12.29.36_PM_mwibep.jpg',
    location: 'Old Trafford, Manchester',
    date: '12.11.2025',
    caption: 'Representing Pune with Manchester United legends.'
  },
  {
    id: 'gal-legend-5',
    title: 'Terrace Stories with Legends',
    category: 'Legends',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865423/WhatsApp_Image_2026-08-16_at_12.31.36_PM_y5q6c3.jpg',
    location: 'Manchester, UK',
    date: '12.11.2025',
    caption: 'Sharing matchday passion with United greats.'
  },
  {
    id: 'gal-screening-1',
    title: 'Pune Match Screenings Roar',
    category: 'Screenings',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865411/WhatsApp_Image_2026-08-16_at_11.53.51_AM_ddhmkc.jpg',
    location: 'BIRA 91 Taproom, The Mills',
    date: '15.09.2026',
    caption: '300+ Pune supporters celebrating United in action.'
  },
  {
    id: 'gal-screening-2',
    title: 'Screening Night Chant Session',
    category: 'Screenings',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865423/WhatsApp_Image_2026-08-16_at_12.29.46_PM_m8ytoq.jpg',
    location: 'BIRA 91 Taproom, The Mills',
    date: '04.12.2025',
    caption: 'High-decibel chant sessions echoing through the night.'
  },
  {
    id: 'gal-screening-3',
    title: 'Matchday Crowd Atmosphere',
    category: 'Screenings',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865407/WhatsApp_Image_2026-08-16_at_11.53.50_AM_w0didk.jpg',
    location: 'BIRA 91 Taproom, The Mills',
    date: '20.01.2026',
    caption: 'Packed venue singing Glory Glory Man United.'
  },
  {
    id: 'gal-screening-4',
    title: 'Pune Terrace Passion',
    category: 'Screenings',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865407/WhatsApp_Image_2026-08-16_at_11.53.53_AM_yo00ls.jpg',
    location: 'The Mills, Pune',
    date: '01.02.2026',
    caption: 'Unmatched energy at our official screening venue.'
  },
  {
    id: 'gal-screening-5',
    title: 'Post-Match Victory Celebration',
    category: 'Screenings',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865407/WhatsApp_Image_2026-08-16_at_11.53.52_AM_zynksd.jpg',
    location: 'The Mills, Pune',
    date: '10.02.2026',
    caption: 'Red Devils fans celebrating another glorious win.'
  },
  {
    id: 'gal-tour-1',
    title: 'Old Trafford Museum Exploration',
    category: 'Tours',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865405/WhatsApp_Image_2026-08-16_at_11.53.51_AM_11_hyrhv3.jpg',
    location: 'United Museum, Old Trafford',
    date: '10.11.2025',
    caption: 'Walking through United history at the club museum.'
  },
  {
    id: 'gal-tour-2',
    title: 'Pitchside at the Theatre of Dreams',
    category: 'Tours',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865406/WhatsApp_Image_2026-08-16_at_11.53.51_AM_12_uiaixq.jpg',
    location: 'Pitchside, Old Trafford',
    date: '10.11.2025',
    caption: 'Standing by the pitch where legends have walked.'
  },
  {
    id: 'gal-tour-3',
    title: 'Manchester City Center Delegation',
    category: 'Tours',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865407/WhatsApp_Image_2026-08-16_at_11.53.53_AM_1_mqldzl.jpg',
    location: 'Manchester, UK',
    date: '11.11.2025',
    caption: 'Pune members exploring the streets of Manchester.'
  },
  {
    id: 'gal-tour-4',
    title: 'Sir Alex Ferguson Stand Experience',
    category: 'Tours',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865407/WhatsApp_Image_2026-08-16_at_11.53.54_AM_1_plh32w.jpg',
    location: 'Old Trafford, Manchester',
    date: '11.11.2025',
    caption: 'Standing below the iconic Sir Alex Ferguson Stand.'
  },
  {
    id: 'gal-tour-5',
    title: 'Old Trafford Megastore Visit',
    category: 'Tours',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865407/WhatsApp_Image_2026-08-16_at_11.53.53_AM_2_mfgcqv.jpg',
    location: 'Megastore, Old Trafford',
    date: '11.11.2025',
    caption: 'Official merchandise shopping at the Old Trafford Megastore.'
  },
  {
    id: 'gal-tour-6',
    title: 'Matchday Tunnel Walk',
    category: 'Tours',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865407/WhatsApp_Image_2026-08-16_at_11.53.54_AM_kypxsg.jpg',
    location: 'Player Tunnel, Old Trafford',
    date: '11.11.2025',
    caption: 'Walking out of the player tunnel onto the pitch perimeter.'
  },
  {
    id: 'gal-tour-7',
    title: 'Old Trafford Press Room Seat',
    category: 'Tours',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865410/WhatsApp_Image_2026-08-16_at_11.53.51_AM_4_ptnbsy.jpg',
    location: 'Press Room, Old Trafford',
    date: '11.11.2025',
    caption: 'Inside the press conference room at Old Trafford.'
  },
  {
    id: 'gal-tour-8',
    title: 'Stretford End Stand View',
    category: 'Tours',
    imageUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865408/WhatsApp_Image_2026-08-16_at_11.53.51_AM_2_g2oiht.jpg',
    location: 'Stretford End, Old Trafford',
    date: '11.11.2025',
    caption: 'Taking in the view from the famous Stretford End.'
  }
];

export const fanChants: FanChant[] = [
  {
    id: 'chant-01',
    title: '20 Times (Terrace Edition)',
    origin: 'Stretford End / Adapted by MUSC Pune',
    popularContext: 'Sung standing at kickoff & after every United goal at screenings',
    lyrics: [
      '20 Times, 20 Times, Man United!',
      '20 Times, 20 Times, I say!',
      '20 Times, 20 Times, Man United!',
      'Playing football the Red Devils way!',
      'From Old Trafford to the streets of Pune,',
      'We are Red, through and through!'
    ]
  },
  {
    id: 'chant-02',
    title: 'Glory Glory Manchester United',
    origin: 'Official Club Anthem',
    popularContext: 'Chorus anthem sung standing with scarves raised high',
    lyrics: [
      'Glory, glory, Man United,',
      'Glory, glory, Man United,',
      'Glory, glory, Man United,',
      'As the Reds go marching ON, ON, ON!'
    ]
  },
  {
    id: 'chant-03',
    title: 'Take Me Home, Country Roads',
    origin: 'Matchday Terrace Anthem',
    popularContext: 'Sung during half-time and after big victories',
    lyrics: [
      'Take me home, United road,',
      'To the place, I belong,',
      'To Old Trafford, to see United,',
      'Take me home, United road!'
    ]
  }
];

export const teamMembers: (TeamMember & {
  ovr: number;
  position: string;
  stats: { pac: number; cht: number; scr: number; psn: number };
})[] = [
  {
    id: 'team-01',
    name: 'Ebrahim Kondkar',
    role: 'Founder & Club President',
    ovr: 99,
    position: 'PRES',
    stats: { pac: 98, cht: 99, scr: 97, psn: 99 },
    photoUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865422/WhatsApp_Image_2026-08-16_at_12.29.15_PM_kzh1u3.jpg',
    bioPlaceholder: 'Founder of MUSC Pune. Leading Maharashtra&apos;s official Manchester United supporters club since 2011.',
    socials: { instagram: 'https://www.instagram.com/musc_pune', twitter: 'https://x.com/manutd_pune' }
  },
  {
    id: 'team-02',
    name: 'Trip to Old Trafford Squad',
    role: 'Travel & Operations',
    ovr: 97,
    position: 'OPS',
    stats: { pac: 95, cht: 96, scr: 99, psn: 98 },
    photoUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865406/WhatsApp_Image_2026-08-16_at_11.53.51_AM_13_arf4zr.jpg',
    bioPlaceholder: 'Managing Old Trafford pilgrimages and screening partnerships.',
    socials: { instagram: 'https://www.instagram.com/musc_pune' }
  },
  {
    id: 'team-03',
    name: 'Screenings Lead',
    role: 'Match Atmosphere & Chants',
    ovr: 96,
    position: 'MERCH',
    stats: { pac: 94, cht: 95, scr: 93, psn: 99 },
    photoUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865411/WhatsApp_Image_2026-08-16_at_11.53.51_AM_ddhmkc.jpg',
    bioPlaceholder: 'Leading Pune chants and terrace soundscapes during match screenings.',
    socials: { instagram: 'https://www.instagram.com/musc_pune' }
  },
  {
    id: 'team-04',
    name: 'Dressing Room Delegation',
    role: 'Legends & Heritage Admin',
    ovr: 98,
    position: 'TOURS',
    stats: { pac: 96, cht: 97, scr: 95, psn: 99 },
    photoUrl: 'https://res.cloudinary.com/dy6mwk08r/image/upload/v1786865408/WhatsApp_Image_2026-08-16_at_11.53.51_AM_1_eibvrj.jpg',
    bioPlaceholder: 'Connecting Pune supporters with Manchester United club legends.',
    socials: { twitter: 'https://x.com/manutd_pune' }
  }
];
