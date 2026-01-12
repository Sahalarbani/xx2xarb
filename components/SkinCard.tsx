"use client";

import React from 'react';
import { Skin } from '../types';
import Link from 'next/link';

interface SkinCardProps {
  skin: Skin;
  onClick?: () => void;
  href?: string;
}

// ✅ HELPER: Fungsi ajaib buat mengecilkan gambar Cloudinary secara otomatis
const getOptimizedUrl = (url: string) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  // Trik: Selipkan parameter w_600 (lebar 600px), q_auto (kualitas cerdas), f_auto (format ringan)
  // Ini bikin gambar jadi ringan banget buat preview, tapi aslinya tetap HD.
  return url.replace("/upload/", "/upload/w_600,q_auto,f_auto/");
};

export const SkinCard: React.FC<SkinCardProps> = ({ skin, onClick, href }) => {
  const CardContent = (
    <div className="relative bg-brand-dark/40 backdrop-blur-xl gaming-card-clip border border-white/5 group-hover:border-brand-accent/30 overflow-hidden h-full flex flex-col">
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={getOptimizedUrl(skin.image)} // ✅ Panggil fungsi optimasi di sini
          alt={skin.title} 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Subtle Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-brand-accent/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-brand-accent/20 text-[10px] font-bold text-brand-accent uppercase tracking-[0.1em] shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            {skin.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-oxanium text-xl font-extrabold text-white leading-tight uppercase tracking-tight group-hover:text-brand-accent transition-colors duration-300 mb-3">
          {skin.title}
        </h3>
        
        <p className="text-gray-400 text-sm font-light line-clamp-2 mb-6 leading-relaxed flex-grow">
          {skin.description}
        </p>
        
        {/* Footer with Actions */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div className="flex items-center gap-4 text-gray-500 text-xs font-semibold uppercase tracking-widest">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-600 font-bold uppercase">Uplinks</span>
              <span className="text-gray-300">{(skin.downloads || 0).toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-brand-accent/10 group-hover:bg-brand-accent text-brand-accent group-hover:text-brand-dark px-4 py-2 rounded-sm skew-x-[-12deg] transition-all duration-300 border border-brand-accent/20 font-oxanium font-bold text-xs uppercase shadow-[0_0_15px_rgba(0,240,255,0.1)]">
            <span className="skew-x-[12deg] flex items-center gap-2">
              Inspect
            </span>
          </div>
        </div>
      </div>

      {/* Technical Decorative Element */}
      <div className="absolute bottom-0 right-0 w-8 h-8 bg-brand-accent/5 pointer-events-none transition-all duration-500 group-hover:bg-brand-accent/20" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
    </div>
  );

  const wrapperClass = "group relative cursor-pointer transition-all duration-500 hover:-translate-y-2 active:scale-95 block h-full";

  if (href) {
    return (
      <Link href={href} className={wrapperClass}>
        <div className="absolute -inset-[1px] bg-gradient-to-br from-brand-accent/20 via-transparent to-brand-secondary/20 gaming-card-clip transition-all duration-500 group-hover:from-brand-accent group-hover:to-brand-secondary group-hover:blur-[2px] opacity-50 group-hover:opacity-100" />
        {CardContent}
      </Link>
    );
  }

  return (
    <div onClick={onClick} className={wrapperClass}>
      <div className="absolute -inset-[1px] bg-gradient-to-br from-brand-accent/20 via-transparent to-brand-secondary/20 gaming-card-clip transition-all duration-500 group-hover:from-brand-accent group-hover:to-brand-secondary group-hover:blur-[2px] opacity-50 group-hover:opacity-100" />
      {CardContent}
    </div>
  );
};
