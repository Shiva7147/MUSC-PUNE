import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Official Manchester United Supporters Club - Pune',
  description:
    "The official home for Manchester United supporters in Pune (Est. 2011). Pune's Red Army watching live screenings at BIRA 91 Taproom - The Mills, buying official merchandise, and joining group tours to Old Trafford.",
  keywords: [
    'MUSC Pune',
    'Official Manchester United Supporters Club - Pune',
    'Man Utd Pune Screening',
    'Pune Reds',
    'Old Trafford Tours India',
    'Football Screenings Pune',
    'BIRA 91 Taproom The Mills Screening',
    'Ebrahim Kondkar MUSC Pune',
  ],
  authors: [{ name: 'MUSC Pune' }],
  openGraph: {
    title: 'Official Manchester United Supporters Club - Pune',
    description: "Pune's Red Army. Matchday screenings at BIRA 91 Taproom - The Mills, merchandise, and Old Trafford group trips.",
    url: 'https://muscpune.in',
    siteName: 'MUSC Pune',
    images: [
      {
        url: 'https://res.cloudinary.com/dy6mwk08r/image/upload/f_auto,q_auto:best,w_2400/v1786865406/WhatsApp_Image_2026-08-16_at_11.53.51_AM_13_arf4zr.jpg',
        width: 1200,
        height: 630,
        alt: 'MUSC Pune Supporter Crowd at Old Trafford',
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
      <body className="bg-[#050505] text-[#F5F5F5] antialiased selection:bg-[#E60012] selection:text-white">
        {children}
      </body>
    </html>
  );
}
