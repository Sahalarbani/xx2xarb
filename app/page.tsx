import React from 'react';
import { prisma } from '@/lib/prisma';
import { SkinCard } from '@/components/SkinCard';
import { Search, Zap, Crosshair } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage({ searchParams }: { searchParams: { q?: string; category?: string } }) {
  const query = searchParams?.q || '';
  const category = searchParams?.category || undefined;

  // Fetch published skins from Database
  const skins = await prisma.skin.findMany({
    where: {
      published: true,
      title: { contains: query, mode: 'insensitive' },
      category: category ? { equals: category } : undefined,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen">
      {/* 2025 Next-Gen Hero Section */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547919307-1ecb10702e6f?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/80 to-brand-dark"></div>
        </div>

        {/* Animated Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] animate-pulse"></div>
        
        {/* HUD Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          {/* Headline Group */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 mb-6 animate-bounce">
              <Zap size={14} className="text-brand-accent" />
              <span className="text-[10px] font-oxanium font-black text-brand-accent uppercase tracking-[0.3em]">Version 2.0 Deployment</span>
            </div>
            
            <h1 className="font-oxanium text-6xl md:text-9xl font-black text-white mb-4 leading-[0.85] tracking-tighter uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
              NEXT GEN <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-[#a855f7] to-brand-secondary animate-gradient-x italic">
                LIVERIES
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-400 font-light max-w-3xl mx-auto uppercase tracking-wider">
              Dominasi jalanan dengan skin kualitas tertinggi untuk <span className="text-brand-accent font-bold">TOE3</span>
            </p>
          </div>
          
          {/* HUD Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-brand-secondary rounded-sm opacity-20 blur"></div>
            
            <form action="/" method="GET" className="relative flex items-center bg-black/60 backdrop-blur-2xl border border-white/10 rounded-sm overflow-hidden gaming-card-clip">
              <div className="pl-6 flex items-center text-brand-accent">
                <Crosshair size={24} />
              </div>
              
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="TARGET SKIN PARAMETERS..."
                className="block w-full pl-4 pr-6 py-6 bg-transparent leading-5 text-white font-oxanium placeholder-gray-600 focus:outline-none sm:text-lg tracking-widest uppercase"
              />

              <div className="absolute right-0 top-0 bottom-0 px-4 flex items-center gap-2 bg-brand-accent/5 pointer-events-none">
                <div className="flex flex-col items-end opacity-40">
                  <span className="text-[8px] font-bold text-brand-accent">STATUS</span>
                  <span className="text-[10px] font-bold text-white uppercase">Scanning</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent"></div>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          <Link href="/" className={`px-8 py-3 font-oxanium font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 skew-x-[-15deg] border ${!category ? 'bg-brand-accent text-black border-brand-accent' : 'bg-brand-surface/50 text-gray-500 border-white/5'}`}>
             <span className="inline-block skew-x-[15deg]">ALL</span>
          </Link>
          {['racing', 'street', 'drift', 'rally'].map((cat) => (
            <Link
              key={cat}
              href={`/?category=${cat}`}
              className={`relative px-8 py-3 font-oxanium font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 skew-x-[-15deg] ${
                category === cat 
                  ? 'bg-brand-accent text-black shadow-[0_0_25px_rgba(0,240,255,0.4)] border-brand-accent' 
                  : 'bg-brand-surface/50 text-gray-500 border border-white/5 hover:border-brand-accent/50 hover:text-brand-accent'
              } border`}
            >
              <span className="inline-block skew-x-[15deg]">{cat}</span>
            </Link>
          ))}
        </div>

        {skins.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl">
            <p className="text-3xl font-oxanium font-black text-gray-700 uppercase italic">Target Not Found</p>
            <p className="text-gray-500 mt-4 tracking-widest uppercase text-sm">Modify search parameters and re-scan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {skins.map(skin => (
              <SkinCard 
                key={skin.id} 
                skin={skin as any} 
                href={`/skin/${skin.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}