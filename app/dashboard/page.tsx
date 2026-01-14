import React from 'react';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { Plus, Database, Activity, Clock, Box, Search, ChevronLeft, ChevronRight, Filter, Globe, Lock } from 'lucide-react';
import Link from 'next/link';
import { PostActions } from '@/components/dashboard/PostActions';

interface PageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const session = await auth();
  
  const query = searchParams?.q || '';
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 10;

  const where = {
    title: {
      contains: query,
      mode: 'insensitive' as const,
    },
  };

  const [totalSkins, lastSkin, allSkins, totalFiltered] = await Promise.all([
    prisma.skin.count(),
    prisma.skin.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true }
    }),
    prisma.skin.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
    prisma.skin.count({ where }),
  ]);

  const totalPages = Math.ceil(totalFiltered / itemsPerPage);
  const timeSinceLastUpdate = lastSkin 
    ? new Date(lastSkin.createdAt).toLocaleDateString() 
    : 'N/A';

  return (
    <div className="min-h-screen bg-brand-dark pt-28 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header HUD */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="font-oxanium text-4xl font-black text-white uppercase tracking-tighter">
              Command <span className="text-brand-accent">Center</span>
            </h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.4em] mt-1">
              Sequence Matrix / {session?.user?.name || 'Authorized Operator'}
            </p>
          </div>
          
          <Link 
            href="/dashboard/create"
            className="group relative px-10 py-5 bg-brand-accent text-black font-oxanium font-black uppercase text-sm skew-x-[-12deg] transition-all hover:shadow-[0_0_40px_rgba(0,240,255,0.4)]"
          >
            <div className="flex items-center gap-2 skew-x-[12deg]">
              <Plus size={20} strokeWidth={3} />
              Deploy New Sequence
            </div>
          </Link>
        </div>

        {/* Stats Section - Tetap sama kayak yg lama */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="relative p-6 bg-white/5 border border-white/10 gaming-card-clip backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-accent/10 rounded-sm text-brand-accent border border-brand-accent/20">
                <Box size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Assets</p>
                <p className="font-oxanium text-3xl font-black text-white">{totalSkins}</p>
              </div>
            </div>
          </div>

          <div className="relative p-6 bg-white/5 border border-white/10 gaming-card-clip backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-sm text-green-500 border border-green-500/20">
                <Activity size={24} className="animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Uplink Status</p>
                <p className="font-oxanium text-3xl font-black text-green-500 uppercase">Secure</p>
              </div>
            </div>
          </div>

          <div className="relative p-6 bg-white/5 border border-white/10 gaming-card-clip backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-secondary/10 rounded-sm text-brand-secondary border border-brand-secondary/20">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Last Sync</p>
                <p className="font-oxanium text-3xl font-black text-white">{timeSinceLastUpdate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-6">
          <div className="relative flex-grow group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-600 group-focus-within:text-brand-accent transition-colors">
              <Search size={20} />
            </div>
            <form action="/dashboard" method="GET">
              <input 
                type="text"
                name="q"
                defaultValue={query}
                placeholder="EXECUTE DATABASE QUERY..."
                className="w-full bg-black/40 border border-white/10 rounded-xl py-5 pl-14 pr-6 text-white font-oxanium text-xs font-bold uppercase tracking-[0.2em] focus:border-brand-accent/50 focus:outline-none focus:ring-1 focus:ring-brand-accent/20 transition-all placeholder-gray-800"
              />
            </form>
          </div>
        </div>

        {/* Main Data Matrix */}
        <div className="relative bg-black/40 border border-white/5 gaming-card-clip backdrop-blur-2xl overflow-hidden shadow-3xl">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent"></div>
          
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <Database size={20} className="text-brand-accent" />
              <h2 className="font-oxanium font-bold text-white uppercase tracking-[0.2em] text-sm">Asset Manifest</h2>
            </div>
            <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse shadow-[0_0_8px_#00f0ff]"></span>
                LIVE SCAN: {totalFiltered} ENTITIES
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            {allSkins.length === 0 ? (
              <div className="p-32 text-center">
                 <h3 className="font-oxanium text-3xl font-black text-gray-700 uppercase italic">Null Result Matrix</h3>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.03]">
                    <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Designation</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Protocol</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Class</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Sync Date</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {allSkins.map((skin) => (
                    <tr key={skin.id} className="group hover:bg-brand-accent/[0.02] transition-colors duration-300">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-5">
                          <div className="w-24 aspect-video rounded-md overflow-hidden border border-white/10 relative shadow-lg group-hover:border-brand-accent/40 transition-all duration-500 bg-white/5">
                            {/* ✅ FIX GAMBAR: Tambahkan referrerPolicy biar gak diblokir */}
                            <img 
                                src={skin.image || ''} 
                                alt="" 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                          </div>
                          <div>
                            <p className="font-oxanium text-sm font-black text-white uppercase tracking-tight group-hover:text-brand-accent transition-colors line-clamp-1">{skin.title}</p>
                            <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em] mt-1.5 flex items-center gap-2">
                               HEX: {skin.id.substring(0,8).toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </td>
                      {/* Sisanya sama kayak file lama lu, gw singkat biar muat */}
                      <td className="px-8 py-6">
                         <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[9px] font-black uppercase tracking-widest border ${skin.published ? 'bg-brand-accent/10 border-brand-accent/30 text-brand-accent' : 'bg-white/5 border-white/10 text-gray-600'}`}>
                           {skin.published ? 'Published' : 'Draft'}
                         </span>
                      </td>
                      <td className="px-8 py-6"><span className="text-[9px] font-black uppercase text-gray-500">{skin.category}</span></td>
                      <td className="px-8 py-6"><p className="text-[10px] text-gray-500 font-bold">{new Date(skin.createdAt).toLocaleDateString()}</p></td>
                      <td className="px-8 py-6 text-right">
                        <PostActions id={skin.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination HUD */}
          <div className="p-6 bg-white/[0.03] border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
             <div className="flex gap-2">
               <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Page {currentPage} of {totalPages || 1}</span>
             </div>
             <div className="flex gap-3">
                <Link href={`/dashboard?page=${Math.max(1, currentPage - 1)}${query ? `&q=${query}` : ''}`} className="p-3 bg-black/40 border border-white/10 rounded-lg hover:bg-brand-accent hover:text-black transition-all"><ChevronLeft size={18} /></Link>
                <Link href={`/dashboard?page=${Math.min(totalPages, currentPage + 1)}${query ? `&q=${query}` : ''}`} className="p-3 bg-black/40 border border-white/10 rounded-lg hover:bg-brand-accent hover:text-black transition-all"><ChevronRight size={18} /></Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
