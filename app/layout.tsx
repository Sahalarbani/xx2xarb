import React from 'react';
import type { Metadata } from 'next';
import { Orbitron, Rajdhani, Oxanium } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { auth } from '@/auth';
import CookieConsent from '@/components/CookieConsent'; 

// 👇 1. IMPORT FITUR VERCEL
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
const rajdhani = Rajdhani({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani'
});
const oxanium = Oxanium({ subsets: ['latin'], variable: '--font-oxanium' });

export const metadata: Metadata = {
  title: 'Arbskinz - Premium Liveries',
  description: 'High-performance gaming skin and livery download platform.',
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
        
        {/* 👇 2. PASANG ALAT PELACAK DI SINI */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
