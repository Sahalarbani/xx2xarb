import React from 'react';
import type { Metadata } from 'next';
import { Orbitron, Rajdhani, Oxanium } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { auth } from '@/auth';
import CookieConsent from '@/components/CookieConsent'; 

// Import Fitur Vercel (Tetap Aman)
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
const rajdhani = Rajdhani({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani'
});
const oxanium = Oxanium({ subsets: ['latin'], variable: '--font-oxanium' });

// ✅ BAGIAN INI YANG BIKIN GAMBARNYA MUNCUL DI WA
export const metadata: Metadata = {
  // 1. PENTING: Alamat asli web lu (Tanpa ini, gambar dianggap hoax sama WA)
  metadataBase: new URL('https://arbskin.vercel.app'), 

  // 2. Judul & Deskripsi
  title: {
    default: 'ArbSkinz - Premium Liveries',
    template: '%s | ArbSkinz'
  },
  description: 'High-performance gaming skin and livery download platform. Dominasi jalanan dengan aset kualitas HD.',

  // 3. Settingan Open Graph (Buat WhatsApp/Facebook)
  openGraph: {
    title: 'ArbSkinz - Premium Liveries',
    description: 'Download livery & skin game bus simulator, truck, dan racing kualitas HD terbaik.',
    url: 'https://arbskin.vercel.app',
    siteName: 'ArbSkinz',
    locale: 'id_ID',
    type: 'website',
  },

  // 4. Settingan Twitter/X
  twitter: {
    card: 'summary_large_image', // Ini biar gambarnya GEDE
    title: 'ArbSkinz',
    description: 'Premium assets for simulation games.',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} ${oxanium.variable}`}>
      <body className="font-sans antialiased bg-brand-dark text-gray-200 min-h-screen flex flex-col">
        <Navbar user={session?.user as any} />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
        
        {/* Komponen Tambahan */}
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
