"use client";

import { useState, useEffect } from "react";

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
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-brand-accent/30 p-6 z-[9999] backdrop-blur-lg animate-in slide-in-from-bottom-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left">
          <h3 className="text-brand-accent font-oxanium font-black text-lg mb-2 uppercase tracking-tighter">
            ⚙️ Protocol Authorization Required
          </h3>
          <p className="text-gray-400 text-xs font-medium max-w-2xl leading-relaxed">
            To maintain a stable encrypted connection and prevent session expiration during asset deployment, 
            this system requires local storage authorization. Failure to accept may result in "Unauthorized Operator" errors.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={acceptCookies}
            className="flex-grow md:flex-none px-8 py-3 rounded-sm bg-brand-accent text-black font-oxanium font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            Authorize Protocol
          </button>
        </div>
      </div>
    </div>
  );
}
