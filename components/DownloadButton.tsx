"use client";

import React, { useState } from 'react';
import { Download, Loader2, CheckCircle, FileDown } from 'lucide-react';
import { incrementDownload } from '@/app/lib/actions';

interface DownloadButtonProps {
  skinId: string;
  downloadUrl: string;
  fileName: string;
}

export function DownloadButton({ skinId, downloadUrl, fileName }: DownloadButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready'>('idle');

  const getForceDownloadUrl = (url: string) => {
    if (!url) return "#";
    if (url.includes("cloudinary.com")) {
      return url.replace("/upload/", "/upload/fl_attachment/");
    }
    return url;
  };

  const handleInitiate = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('ready');
    }, 2000);
  };

  const handleDownload = async () => {
    await incrementDownload(skinId);
    
    const link = document.createElement('a');
    link.href = getForceDownloadUrl(downloadUrl);
    link.download = fileName || 'skin-file';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setStatus('idle'), 3000);
  };

  if (status === 'loading') {
    return (
      <button disabled className="w-full bg-white/5 border border-white/10 text-[#00f0ff] font-oxanium font-bold text-lg py-5 rounded-full flex items-center justify-center gap-4 cursor-wait backdrop-blur-md">
        <Loader2 className="animate-spin" size={24} />
        <span className="tracking-widest animate-pulse">ESTABLISHING UPLINK...</span>
      </button>
    );
  }

  if (status === 'ready') {
    return (
      <button 
        onClick={handleDownload}
        className="group w-full relative overflow-hidden bg-[#00ff66] hover:bg-[#00ff66]/90 text-black font-oxanium font-black text-xl py-5 rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(0,255,102,0.4)] hover:shadow-[0_0_60px_rgba(0,255,102,0.6)] animate-in zoom-in-95"
      >
        <div className="absolute inset-0 bg-white/40 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
        <FileDown className="relative z-10" strokeWidth={3} size={28} />
        <span className="relative z-10 tracking-wide">FILE READY // CLICK TO SAVE</span>
      </button>
    );
  }

  return (
    <button 
      onClick={handleInitiate}
      className="group w-full relative overflow-hidden bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-oxanium font-black text-xl py-5 rounded-full transition-all duration-300 flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_50px_rgba(0,240,255,0.5)] active:scale-95"
    >
      <div className="absolute inset-0 bg-white/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
      <Download className="relative z-10 group-hover:scale-110 transition-transform" strokeWidth={3} size={28} />
      <span className="relative z-10 tracking-widest">INITIATE DOWNLOAD SEQUENCE</span>
    </button>
  );
}
