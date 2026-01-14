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

  // Helper: Paksa Cloudinary buat download (bukan view)
  const getForceDownloadUrl = (url: string) => {
    if (!url) return "#";
    // Kalau link Cloudinary, selipin 'fl_attachment' biar otomatis ke-download
    if (url.includes("cloudinary.com")) {
      return url.replace("/upload/", "/upload/fl_attachment/");
    }
    return url;
  };

  const handleInitiate = () => {
    setStatus('loading');
    // Simulasi proses "Establishing Uplink..." (biar keren)
    setTimeout(() => {
      setStatus('ready');
    }, 2000);
  };

  const handleDownload = async () => {
    // 1. Update counter di database
    await incrementDownload(skinId);
    
    // 2. Trigger download
    const link = document.createElement('a');
    link.href = getForceDownloadUrl(downloadUrl);
    link.download = fileName || 'skin-file';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 3. Reset state (opsional, atau biarin ready)
    setTimeout(() => setStatus('idle'), 3000);
  };

  if (status === 'loading') {
    return (
      <button disabled className="w-full bg-brand-accent/10 border border-brand-accent/30 text-brand-accent font-oxanium font-bold text-xl py-5 rounded-lg flex items-center justify-center gap-3 cursor-wait">
        <Loader2 className="animate-spin" />
        ESTABLISHING UPLINK...
      </button>
    );
  }

  if (status === 'ready') {
    return (
      <button 
        onClick={handleDownload}
        className="w-full relative overflow-hidden bg-green-500 hover:bg-green-400 text-black font-oxanium font-bold text-xl py-5 rounded-lg transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,255,0,0.4)] animate-in fade-in zoom-in duration-300"
      >
        <FileDown className="relative z-10" strokeWidth={3} />
        <span className="relative z-10">FILE READY // CLICK TO SAVE</span>
      </button>
    );
  }

  return (
    <button 
      onClick={handleInitiate}
      className="w-full relative group overflow-hidden bg-brand-accent hover:bg-brand-accent/90 text-black font-oxanium font-bold text-xl py-5 rounded-lg transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] active:scale-95"
    >
      <div className="absolute inset-0 bg-white/40 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
      <Download className="relative z-10" strokeWidth={3} />
      <span className="relative z-10">INITIATE DOWNLOAD SEQUENCE</span>
    </button>
  );
}
