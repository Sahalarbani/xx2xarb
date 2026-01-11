import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ArrowLeft, Download, Calendar, User, Share2, Zap, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { SkinCard } from '@/components/SkinCard';

interface PageProps {
  params: { id: string };
}

export default async function SkinDetailPage({ params }: PageProps) {
  const { id } = await params;

  // 1. Fetch current skin using Prisma
  const skin = await prisma.skin.findUnique({
    where: { id },
  });

  if (!skin) {
    notFound();
  }

  // 2. Fetch related skins (3 items, prioritized by same category)
  let relatedSkins = await prisma.skin.findMany({
    where: {
      category: skin.category,
      NOT: { id: skin.id },
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  // Fallback: If category matches are insufficient, fetch latest assets
  if (relatedSkins.length < 3) {
    const additional = await prisma.skin.findMany({
      where: {
        NOT: {
          id: { in: [skin.id, ...relatedSkins.map((s) => s.id)] },
        },
      },
      take: 3 - relatedSkins.length,
      orderBy: { createdAt: 'desc' },
    });
    relatedSkins = [...relatedSkins, ...additional];
  }

  // Map Prisma data structure to the format expected by our UI components
  const mapToSkin = (s: any) => ({
    ...s,
    author: s.authorName || 'Authorized Operator',
    downloads: 1250, // Default mock for downloads count
  });

  return (
    <div className="min-h-screen bg-brand-dark pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Link 
          href="/#home"
          className="flex items-center gap-2 text-gray-500 hover:text-brand-accent mb-12 transition-all group font-bold uppercase text-xs tracking-[0.2em]"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Command Center
        </Link>

        {/* Tactical Asset Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Visual Sequence */}
          <div className="space-y-6">
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-brand-secondary opacity-20 blur group-hover:opacity-40 transition-opacity duration-1000"></div>
               <div className="relative aspect-video w-full gaming-card-clip overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black/50">
                 <img 
                   src={skin.imageUrl} 
                   alt={skin.title} 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                 
                 {/* Corner HUD Data */}
                 <div className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md border border-brand-accent/20 gaming-card-clip">
                    <Zap size={16} className="text-brand-accent animate-pulse" />
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="aspect-video gaming-card-clip bg-white/5 border border-white/10 overflow-hidden cursor-crosshair opacity-60 hover:opacity-100 transition-all hover:border-brand-accent/40 group">
                    <img 
                      src={skin.imageUrl} 
                      className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ${i === 2 ? 'scale-125' : i === 3 ? 'scale-150' : ''}`} 
                    />
                 </div>
               ))}
            </div>
          </div>

          {/* Information HUD Panel */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-brand-accent/10 text-brand-accent border border-brand-accent/30 font-oxanium font-black text-[10px] uppercase tracking-[0.3em] gaming-card-clip">
                {skin.category}
              </span>
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                VERIFICATION: SUCCESS
              </span>
            </div>
            
            <h1 className="font-oxanium text-5xl md:text-7xl font-black text-white mb-8 leading-none tracking-tighter uppercase italic drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              {skin.title}
            </h1>

            <div className="grid grid-cols-2 gap-8 mb-10 pb-10 border-b border-white/5">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-brand-accent uppercase tracking-widest flex items-center gap-2">
                  <User size={12} /> DEPLOYMENT OFFICER
                </p>
                <p className="font-oxanium text-lg text-white font-bold">{skin.authorName || 'OPERATOR'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-brand-accent uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={12} /> SYNC TIMESTAMP
                </p>
                <p className="font-oxanium text-lg text-white font-bold">
                  {new Date(skin.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                <LayoutGrid size={12} className="text-brand-accent" />
                MISSION PARAMETERS
              </h3>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-xl">
                {skin.description}
              </p>
            </div>

            <div className="mt-auto space-y-4">
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-brand-accent opacity-30 blur group-hover:opacity-100 transition duration-500"></div>
                <button 
                  onClick={() => window.open(skin.downloadUrl || '#', '_blank')}
                  className="relative w-full bg-brand-accent text-black font-oxanium font-black text-xl py-6 px-8 flex items-center justify-center gap-4 skew-x-[-10deg] transition-all overflow-hidden"
                >
                  <span className="skew-x-[10deg] flex items-center gap-4">
                    <Download size={28} strokeWidth={3} />
                    INITIATE DOWNLOAD
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </div>
              
              <button className="w-full bg-white/5 border border-white/10 hover:border-brand-accent/50 text-gray-400 hover:text-white font-bold py-4 px-8 skew-x-[-10deg] transition-all flex items-center justify-center gap-2 group">
                <span className="skew-x-[10deg] flex items-center gap-2">
                  <Share2 size={18} />
                  SHARE COORDINATES
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Tactical Recommendation HUD */}
        <div className="relative pt-24 border-t border-white/5">
          <div className="absolute top-0 left-0 w-32 h-[1px] bg-brand-accent"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-secondary/10 rounded-sm">
                  <LayoutGrid size={28} className="text-brand-secondary" />
                </div>
                <div>
                   <h2 className="font-oxanium text-3xl font-black text-white uppercase tracking-tighter">
                     TACTICAL <span className="text-brand-accent">RECOMMENDATIONS</span>
                   </h2>
                   <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Next deployment sequences available in current sector</p>
                </div>
             </div>
             <Link href="/#home" className="text-[10px] font-black text-brand-accent uppercase tracking-[0.4em] hover:text-white transition-all bg-brand-accent/5 px-4 py-2 border border-brand-accent/20 skew-x-[-12deg]">
                <span className="skew-x-[12deg] inline-block">BROWSE ALL ASSETS →</span>
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {relatedSkins.map((relatedSkin) => (
              <SkinCard 
                key={relatedSkin.id} 
                skin={mapToSkin(relatedSkin) as any} 
                href={`/skin/${relatedSkin.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}