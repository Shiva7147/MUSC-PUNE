import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MUSC Pune — Manchester United Supporters Club Pune | Official Platform',
  description:
    'The official home for Manchester United supporters in Pune. Watch live screenings at Viman Nagar & Koregaon Park, buy official Pune Reds merchandise, and join group tours to Old Trafford.',
  keywords: [
    'MUSC Pune',
    'Manchester United Supporters Club Pune',
    'Man Utd Pune Screening',
    'Pune Reds',
    'Old Trafford Tours India',
    'Football Screenings Pune',
    'The Irish House Pune Screening',
  ],
  authors: [{ name: 'MUSC Pune' }],
  openGraph: {
    title: 'MUSC Pune — Manchester United Supporters Club Pune',
    description: 'Where Pune Reds come together. Matchday screenings, merchandise, and Old Trafford group tours.',
    url: 'https://muscpune.in',
    siteName: 'MUSC Pune',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'MUSC Pune Supporter Crowd',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#090909] text-white antialiased selection:bg-[#C8102E] selection:text-white">
        {children}
      </body>
    </html>
  );
}
