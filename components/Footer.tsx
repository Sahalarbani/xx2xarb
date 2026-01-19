import React from 'react';
import { Youtube, Instagram, MessageSquare, Terminal, Shield, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-white/5 bg-[#0a0a0a]/60 backdrop-blur-2xl">
      {/* Top Glow Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent shadow-[0_0_10px_#00f0ff]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/5 pb-12">
          
          {/* Brand Column (Span 5) */}
          <div className="md:col-span-5 space-y-6">
            <div className="group cursor-default">
              <h2 className="font-oxanium text-2xl font-black tracking-tighter text-white">
                ARB<span className="text-[#00f0ff] drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">SKINZ</span>
              </h2>
              <p className="mt-4 text-gray-400 text-sm font-rajdhani font-medium leading-relaxed max-w-sm">
                Premium digital assets for the simulation racing ecosystem. 
                Forging the gap between virtual performance and visual dominance.
              </p>
            </div>
            
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/5 border border-[#00f0ff]/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
              <span className="text-[10px] font-bold text-[#00f0ff] uppercase tracking-wider">All Systems Operational</span>
            </div>
          </div>

          {/* Links Column (Span 3) */}
          <div className="md:col-span-3">
            <h3 className="font-oxanium text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <Terminal size={14} className="text-[#00f0ff]" /> Navigation
            </h3>
            <ul className="space-y-3">
              {['Home', 'Gallery', 'About', 'Dashboard'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/#${item.toLowerCase()}`}
                    className="text-gray-500 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-[#00f0ff] transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials Column (Span 4) */}
          <div className="md:col-span-4">
            <h3 className="font-oxanium text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <Shield size={14} className="text-[#00f0ff]" /> Network
            </h3>
            <div className="flex gap-4">
              {[
                { icon: MessageSquare, label: 'Discord' },
                { icon: Youtube, label: 'Youtube' },
                { icon: Instagram, label: 'Instagram' }
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-black hover:bg-[#00f0ff] hover:border-[#00f0ff] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-gray-600 font-rajdhani">
              Join the elite division. Get early access to confidential liveries.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 opacity-60">
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            &copy; {currentYear} ARBSKINZ INC.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] font-bold text-gray-500 hover:text-[#00f0ff] uppercase tracking-wider transition-colors">Privacy</a>
            <a href="#" className="text-[10px] font-bold text-gray-500 hover:text-[#00f0ff] uppercase tracking-wider transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
