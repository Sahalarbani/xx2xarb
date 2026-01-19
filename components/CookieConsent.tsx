"use client";

import { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Cek apakah user sudah pernah setuju sebelumnya
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setShow(false);
    // Refresh halaman agar session baru bisa tersimpan dengan benar
    window.location.reload();
  };

  if (!show) return null;

  return (
    // FLOATING GLASS BAR
    <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-4xl z-[9999] animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Glow Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-50" />
        
        <div className="text-left flex items-start gap-4">
          <div className="p-3 bg-[#00f0ff]/10 rounded-full text-[#00f0ff] hidden md:block">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="text-[#00f0ff] font-oxanium font-black text-sm mb-1 uppercase tracking-widest flex items-center gap-2">
              System Authorization Required
            </h3>
            <p className="text-gray-400 text-xs font-rajdhani font-medium max-w-xl leading-relaxed">
              This interface requires local storage access to maintain encrypted session tokens. 
              Declining may cause immediate session termination during asset deployment.
            </p>
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto flex-shrink-0">
          <button 
            onClick={acceptCookies}
            className="flex-grow md:flex-none px-8 py-3 rounded-full bg-[#00f0ff] text-black font-oxanium font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-105 active:scale-95"
          >
            Authorize Access
          </button>
        </div>
      </div>
    </div>
  );
}
