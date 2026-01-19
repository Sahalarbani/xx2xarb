"use client";

import React from 'react';
import { Skin } from '../types';
import Link from 'next/link';
import { Eye, Download } from 'lucide-react'; // Menggunakan icon Lucide agar konsisten

interface SkinCardProps {
  skin: Skin;
  onClick?: () => void;
  href?: string;
}

const getOptimizedUrl = (url: string) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/w_600,q_auto,f_auto/");
};

export const SkinCard: React.FC<SkinCardProps> = ({ skin, onClick, href }) => {
  
  // LOGIC & CONTENT WRAPPER
  const CardContent = (
    <div className="group relative h-full flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(0,240,255,0.15)] hover:bg-white/10 hover:border-[#00f0ff]/30">
      
      {/* 1. IMAGE AREA - Rounded Top Internal */}
      <div className="relative aspect-[16/10] m-2 rounded-[24px] overflow-hidden">
        <img 
          src={getOptimizedUrl(skin.image)} 
          alt={skin.title} 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Glass Overlay on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
        
        {/* Category Pill - Floating Top Left */}
        <div className="absolute top-3 left-3">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-[#00f0ff] uppercase tracking-wider shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_8px_#00f0ff]" />
            {skin.category}
          </span>
        </div>
      </div>

      {/* 2. TEXT CONTENT AREA */}
      <div className="px-6 pb-6 pt-2 flex flex-col flex-grow">
        <h3 className="font-oxanium text-xl font-bold text-white leading-tight mb-2 group-hover:text-[#00f0ff] transition-colors">
          {skin.title}
        </h3>
        
        <p className="text-gray-400 text-sm font-light font-rajdhani line-clamp-2 mb-6 flex-grow leading-relaxed">
          {skin.description}
        </p>
        
        {/* 3. FOOTER ACTION */}
        <div className="flex items-center justify-between mt-auto">
          {/* Stats */}
          <div className="flex items-center gap-2 text-gray-500">
            <div className="p-1.5 rounded-full bg-white/5">
              <Download size={12} />
            </div>
            <span className="text-xs font-mono text-gray-400">{(skin.downloads || 0).toLocaleString()}</span>
          </div>
          
          {/* Action Button - Pill Shape */}
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20 transition-all duration-300 group-hover:bg-[#00f0ff] group-hover:text-black group-hover:shadow-[0_0_15px_#00f0ff]">
            <span className="font-oxanium font-bold text-xs uppercase tracking-wider">Inspect</span>
            <Eye size={14} />
          </div>
        </div>
      </div>
    </div>
  );

  // WRAPPER LOGIC (Link vs Div)
  const containerClasses = "block h-full w-full focus:outline-none";

  if (href) {
    return (
      <Link href={href} className={containerClasses}>
        {CardContent}
      </Link>
    );
  }

  return (
    <div onClick={onClick} className={`${containerClasses} cursor-pointer`}>
      {CardContent}
    </div>
  );
};
