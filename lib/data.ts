import { Screening, Product, TourPackage, GalleryItem, Announcement, FanChant, TeamMember } from './types';

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
    venueName: 'The Irish House — Viman Nagar',
    venueAddress: 'Phoenix Marketcity, Viman Nagar, Pune',
    venueArea: 'Viman Nagar / East Pune',
    price: 350,
    featured: true,
    status: 'FILLING_FAST',
    description: 'The biggest fixture in world football! Join 300+ Pune Reds at The Irish House for an iconic stadium-like matchday screening with chant sessions, high-decibel surround audio, exclusive merchandise giveaways, and food vouchers.',
    gateOpening: '07:30 PM IST',
    inclusions: [
      'Guaranteed Entry to Main Stadium Screening Arena',
      '₹200 Redeemable Cover Voucher for Food & Beverage',
      'Official MUSC Pune Matchday Badge & Sticker Pack',
      'Entry into Half-time Jersey Giveaway Raffle'
    ],
    rules: [
      'Matchday scarves and red club wear strongly encouraged',
      'Please carry digital ticket QR code on smartphone',
      'Right of admission reserved by MUSC Pune & Venue Management',
      'Stag entries allowed subject to prior registration'
    ]
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
    venueName: 'High Spirit Cafe — Koregaon Park',
    venueAddress: '35A, Main Road, Koregaon Park, Pune',
    venueArea: 'Koregaon Park / Central Pune',
    price: 300,
    featured: false,
    status: 'UPCOMING',
    description: 'A classic rivalry under the night lights of Koregaon Park. Big screen projection, open-air garden matchday atmosphere, live DJ pre-match chant sets, and cold beverages.',
    gateOpening: '08:30 PM IST',
    inclusions: [
      'Access to Open-Air Garden Screening Zone',
      '₹150 Food & Drink Voucher Included',
      'Live Fan Chant Session Led by Pune Reds Ultra Group'
    ],
    rules: [
      'Valid ID required at entry (18+ venue)',
      'Digital QR code mandatory'
    ]
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
    venueName: 'Effingut Brewhouse — Baner',
    venueAddress: 'Deron Heights, Baner Road, Pune',
    venueArea: 'Baner / West Pune',
    price: 400,
    featured: false,
    status: 'UPCOMING',
    description: 'Derby Day in Pune! The city turns red as we battle for bragging rights. Massive LED screens, custom red stadium lighting, and 400+ passionate supporters singing loud and proud.',
    gateOpening: '06:30 PM IST',
    inclusions: [
      'Prime Seating with Unobstructed LED View',
      '₹250 Craft Beverage / Food Voucher',
      'Derby Special Commemorative Wristband'
    ],
    rules: [
      'Arrive at least 45 minutes prior to kickoff',
      'Non-refundable ticket passes'
    ]
  }
];

export const merchandiseProducts: Product[] = [
  {
    id: 'merch-01',
    name: 'MUSC Pune "Pune is Red" Matchday Tee',
    category: 'Apparel',
    price: 899,
    originalPrice: 1199,
    image: '/images/merchandise.jpg',
    description: 'Official Supporters Club Pune premium 300 GSM combed heavyweight cotton matchday t-shirt. Features minimal front crest print and dramatic typography on back: "LAL PUNE, UNITED ALWAYS".',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    badge: 'DROP 01 • BESTSELLER',
    details: [
      '300 GSM Heavyweight Combed Cotton',
      'Breathable screen print with high-density red rubber finish',
      'Regular athletic fit for matchday comfort',
      'Sewn-in woven Pune Reds authenticity label'
    ]
  },
  {
    id: 'merch-02',
    name: 'MUSC Pune Heritage Woven Supporter Scarf',
    category: 'Accessories',
    price: 649,
    originalPrice: 799,
    image: '/images/merchandise.jpg',
    description: 'Heavy knit classic football scarf with red and black fringe detail. Dual-sided weave featuring "MANCHESTER UNITED SUPPORTERS CLUB PUNE" on one side and Marathi typography on reverse.',
    availableSizes: ['ONE SIZE'],
    inStock: true,
    badge: 'TERRACE ESSENTIAL',
    details: [
      '100% High-bulk soft acrylic yarn',
      '145 cm length with 8 cm traditional tassels',
      'Double-sided Jacquard woven design',
      'Essential matchday accessory for screenings'
    ]
  },
  {
    id: 'merch-03',
    name: 'MUSC Pune Training Jersey 2026/27',
    category: 'Apparel',
    price: 1199,
    originalPrice: 1499,
    image: '/images/merchandise.jpg',
    description: 'High-performance moisture-wicking micro-polyester kit with subtle Pune city street map geometric pattern sublimated into the fabric.',
    availableSizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    badge: 'NEW KIT DROP',
    details: [
      'Quick-dry anti-odor DRI-FIT polyester',
      'Sublimated Pune urban grid design',
      'Silicone heat-pressed club emblem',
      'Lightweight athletic performance cut'
    ]
  },
  {
    id: 'merch-04',
    name: 'MUSC Pune Crest Curved Cap',
    category: 'Accessories',
    price: 499,
    originalPrice: 699,
    image: '/images/merchandise.jpg',
    description: 'Classic 6-panel unstructured dad cap in matte black cotton twill with 3D raised red embroidered club logo and adjustable brass strap.',
    availableSizes: ['ONE SIZE'],
    inStock: true,
    details: [
      '100% Premium Cotton Twill',
      'High-density 3D embroidery',
      'Custom metal buckle slider strap',
      'Structured visor curve'
    ]
  },
  {
    id: 'merch-05',
    name: 'MUSC Pune All-Weather Stadium Windbreaker',
    category: 'Apparel',
    price: 1899,
    originalPrice: 2499,
    image: '/images/merchandise.jpg',
    description: 'Matte black water-resistant lightweight windbreaker jacket built for Pune monsoon screening nights and late night match commutes.',
    availableSizes: ['M', 'L', 'XL'],
    inStock: true,
    badge: 'LIMITED EDITION',
    details: [
      'Waterproof nylon shell with soft mesh lining',
      'Reflective rear safety strip with "PUNE REDS"',
      'Dual zip pockets and adjustable hood cinch',
      'Folds into internal compact pouch'
    ]
  }
];

export const oldTraffordTours: TourPackage[] = [
  {
    id: 'tour-autumn-2026',
    title: 'Old Trafford Pilgrimage — Autumn 2026',
    duration: '7 Days / 6 Nights',
    nextBatch: 'October 18 – 24, 2026',
    matchHighlights: ['Stretford End Tier 1 Ticket', 'Private Museum & Stadium Tour', 'First-Team Training Session Access'],
    includedFeatures: [
      'Guaranteed Category-1 Match Ticket for Premier League Fixture',
      'Group Flight Trajectory Assistance (PNQ ➔ BOM ➔ MAN)',
      '4-Star Hotel Stay at Salford Quays near Old Trafford',
      'Exclusive Access to Manchester Local Supporters Meet',
      'Guided City Tour & National Football Museum Pass'
    ],
    image: '/images/tour.jpg',
    description: 'Fly out with fellow Pune Reds from PNQ to Manchester to witness United live at the Theatre of Dreams. From singing in the Stretford End to exploring Sir Matt Busby Way, experience the ultimate football pilgrimage.'
  }
];

export const galleryImages: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Derby Night Screening Roar',
    category: 'Screenings',
    imageUrl: '/images/screening.jpg',
    location: 'The Irish House, Viman Nagar',
    date: '15.09.2026',
    caption: '300+ Pune Reds celebrating a last-minute winner in the Premier League!'
  },
  {
    id: 'gal-02',
    title: 'Old Trafford Group Delegation',
    category: 'Tours',
    imageUrl: '/images/tour.jpg',
    location: 'Old Trafford, Manchester',
    date: '10.11.2025',
    caption: 'Pune Reds standing tall outside the Holy Trinity statue at Old Trafford.'
  },
  {
    id: 'gal-03',
    title: 'Koregaon Park Pre-Match Warmup',
    category: 'Matchday Vibe',
    imageUrl: '/images/hero.jpg',
    location: 'FC Road / Koregaon Park, Pune',
    date: '04.12.2025',
    caption: 'Matchday evening meetup at Koregaon Park before kickoff.'
  },
  {
    id: 'gal-04',
    title: 'Terrace Banner Crafting Session',
    category: 'Community',
    imageUrl: '/images/community.jpg',
    location: 'Baner, Pune',
    date: '20.02.2026',
    caption: 'Supporters crafting new matchday banners for the upcoming derby screening.'
  }
];

export const announcements: Announcement[] = [
  {
    id: 'ann-01',
    category: 'NEXT SCREENING',
    date: 'March 01, 2026',
    title: 'Ticket Bookings Live: Manchester United vs Liverpool at Viman Nagar',
    snippet: 'Passes for the biggest screening of the season are now live! Early bird tickets include complimentary food & beverage vouchers.',
    content: 'We are back at The Irish House, Viman Nagar for the epic clash against Liverpool. Expect a massive 300+ crowd, dual projector setup, high-wattage sound, and raffle prizes including official kit jerseys. Secure your passes early as venue capacity is strictly limited.',
    readTime: '2 min read'
  },
  {
    id: 'ann-02',
    category: 'OLD TRAFFORD TOUR',
    date: 'February 20, 2026',
    title: 'Applications Open for Autumn 2026 Old Trafford Group Tour Batch 2',
    snippet: 'Want to watch United live in Manchester with Pune Reds? Registration for group visa guidance and match ticket priority is now open.',
    content: 'Our official group tour to Manchester for Autumn 2026 is officially accepting enquiries. Members will receive assistance with UK visa documentation, group flight bookings, and guaranteed category-1 ticket allocations.',
    readTime: '3 min read'
  },
  {
    id: 'ann-03',
    category: 'MERCH DROP',
    date: 'February 10, 2026',
    title: 'New Drop: 2026/27 Training Kit & "Pune is Red" Supporter Tees',
    snippet: 'The new collection featuring custom Pune urban grid motifs and heavyweight cotton scarves has dropped on our official storefront.',
    content: 'Designed in Pune for Pune Reds. Our latest merch line celebrates the intersection of Red Football heritage and Pune city youth culture. Available for pickup at screenings or home delivery across Pune pin codes.',
    readTime: '1 min read'
  }
];

export const fanChants: FanChant[] = [
  {
    id: 'chant-01',
    title: '20 Times (Pune Terrace Edition)',
    origin: 'Stretford End / Adapted by Pune Reds',
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
    name: 'Rohan Deshmukh',
    role: 'Club President & Community Lead',
    ovr: 99,
    position: 'PRES',
    stats: { pac: 98, cht: 99, scr: 97, psn: 99 },
    photoUrl: '/images/community.jpg',
    bioPlaceholder: 'Building Maharashtra&apos;s most energetic football supporters club since 2021.',
    socials: { instagram: '#', twitter: '#', linkedin: '#' }
  },
  {
    id: 'team-02',
    name: 'Aditya Kulkarni',
    role: 'Screening Operations & Venue Lead',
    ovr: 97,
    position: 'OPS',
    stats: { pac: 95, cht: 96, scr: 99, psn: 98 },
    photoUrl: '/images/community.jpg',
    bioPlaceholder: 'Managing screening venue partnerships across Koregaon Park, Baner, and Viman Nagar.',
    socials: { instagram: '#', twitter: '#' }
  },
  {
    id: 'team-03',
    name: 'Tanvi Joshi',
    role: 'Merchandise & Creative Director',
    ovr: 96,
    position: 'MERCH',
    stats: { pac: 94, cht: 95, scr: 93, psn: 99 },
    photoUrl: '/images/community.jpg',
    bioPlaceholder: 'Crafting unique Pune x Manchester United apparel and supporters terrace gear.',
    socials: { instagram: '#', linkedin: '#' }
  },
  {
    id: 'team-04',
    name: 'Vikram Shinde',
    role: 'Old Trafford Tours & Travel Admin',
    ovr: 98,
    position: 'TOURS',
    stats: { pac: 96, cht: 97, scr: 95, psn: 99 },
    photoUrl: '/images/community.jpg',
    bioPlaceholder: 'Coordinating group travel logistics for Pune Reds visiting Manchester.',
    socials: { twitter: '#', linkedin: '#' }
  }
];
