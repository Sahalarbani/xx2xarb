import React from 'react';
import { prisma } from '@/lib/prisma';
import { SkinCard } from '@/components/SkinCard';
import { Search, Zap, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

// ✅ WAJIB: Biar halaman selalu update kalau ada kategori baru
export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }: { searchParams: { q?: string; category?: string } }) {
  const query = searchParams?.q || '';
  // Ubah undefined jadi 'ALL' biar gampang dicocokin
  const categoryFilter = searchParams?.category || 'ALL';

  // ---------------------------------------------------------
  // 1️⃣ LOGIKA DINAMIS: Ambil Kategori Aktif dari Database
  // (TIDAK DIUBAH SAMA SEKALI)
  // ---------------------------------------------------------
  const dbCategories = await prisma.skin.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ["category"], // Ambil yang unik aja
  });

  // Gabungin 'ALL' + Kategori dari DB (Diurutkan A-Z)
  const allCategories = [
    "ALL",
    ...dbCategories
      .map((c) => c.category)
      .filter(Boolean)
      .sort()
  ];

  // ---------------------------------------------------------
  // 2️⃣ QUERY DATA SKIN
  // (TIDAK DIUBAH SAMA SEKALI)
  // ---------------------------------------------------------
  const whereCondition: any = {
    published: true,
    AND: [
      {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
    ],
  };

  // Filter kategori (Kecuali kalau milih ALL)
  if (categoryFilter !== 'ALL') {
    whereCondition.AND.push({
      category: { equals: categoryFilter, mode: "insensitive" },
    });
  }

  const skins = await prisma.skin.findMany({
    where: whereCondition,
    orderBy: { createdAt: 'desc' },
  });

  // ---------------------------------------------------------
  // 3️⃣ RETURN UI (REFACTORED TO iOS 26 STYLE)
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* BACKGROUND AMBIENT (Untuk Hero Area) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00f0ff]/10 via-[#0a0a0a] to-[#050505] z-0 pointer-events-none" />

      {/* HERO SECTION */}
      <div className="relative z-10 pt-40 pb-20 px-4 text-center">
        
        {/* Version Badge - Glass Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-in fade-in zoom-in duration-700">
          <Zap size={14} className="text-[#00f0ff] fill-[#00f0ff]" />
          <span className="text-[11px] font-oxanium font-bold text-[#00f0ff] uppercase tracking-[0.2em] shadow-[0_0_10px_rgba(0,240,255,0.4)]">
            System V2.0 Online
          </span>
        </div>

        {/* Giant Title */}
        <h1 className="font-oxanium text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
          NEXT GEN <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600">
            LIVERIES
          </span>
        </h1>

        <p className="text-lg text-gray-400 font-rajdhani font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
          High-fidelity skins forged for the <span className="text-[#00f0ff]">TOE3</span> ecosystem. 
          <br className="hidden md:block"/> Dominance starts with visual superiority.
        </p>

        {/* GIANT GLASS SEARCH PILL */}
        <div className="max-w-xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00f0ff]/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-1000" />
          
          <form action="/" method="GET" className="relative flex items-center">
            <div className="absolute left-6 text-gray-400 group-focus-within:text-[#00f0ff] transition-colors">
              <Search size={24} />
            </div>
            
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="SEARCH ASSETS..."
              className="w-full bg-white/5 hover:bg-white/10 focus:bg-black/40 backdrop-blur-2xl border border-white/10 focus:border-[#00f0ff]/50 rounded-full py-5 pl-16 pr-8 text-white placeholder-gray-500 font-oxanium tracking-widest uppercase outline-none transition-all duration-300 shadow-2xl"
            />
          </form>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div id="gallery" className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        
        {/* SEPARATOR */}
        <div className="flex items-center justify-center gap-4 mb-12 opacity-30">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-white" />
          <LayoutGrid size={16} className="text-white" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-white" />
        </div>

        {/* CAPSULE TABS FILTERS */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {allCategories.map((cat) => {
            const isActive = categoryFilter.toUpperCase() === cat.toUpperCase();
            return (
              <Link
                key={cat}
                href={`/?category=${cat === 'ALL' ? '' : cat}&q=${query}`}
                className={`
                  relative px-6 py-2.5 rounded-full font-oxanium font-bold text-xs uppercase tracking-wider transition-all duration-300
                  ${isActive 
                    ? 'bg-[#00f0ff] text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105' 
                    : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white hover:border-white/20'
                  }
                `}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* GRID LAYOUT */}
        {skins.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white/5 rounded-[32px] border border-white/5 border-dashed backdrop-blur-sm">
            <Search size={48} className="text-gray-600 mb-4 opacity-50" />
            <p className="text-2xl font-oxanium font-bold text-gray-500 uppercase">No Data Found</p>
            <p className="text-gray-600 mt-2 font-rajdhani">Try adjusting your search parameters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
