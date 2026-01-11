import React from 'react';
import { Youtube, Instagram, MessageSquare, Terminal, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-brand-accent/20 bg-black/80 backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,240,255,0.05)]">
      {/* Top Laser Line Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[1px] bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Col 1: Brand HUD */}
          <div className="space-y-6">
            <div>
              <h2 className="font-oxanium text-3xl font-black tracking-tighter text-white">
                ARB<span className="text-brand-accent">SKINZ</span>
              </h2>
              <p className="mt-4 text-gray-500 font-medium uppercase tracking-widest text-xs leading-relaxed max-w-xs">
                Forged for the virtual roads. High-fidelity liveries for the elite sim-racing community.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-brand-accent/60 uppercase tracking-[0.2em]">
              <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></div>
              System Status: Active
            </div>
          </div>

          {/* Col 2: Tactical Links */}
          <div>
            <h3 className="font-oxanium text-sm font-bold text-white uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <Terminal size={16} className="text-brand-accent" />
              Quick Links
            </h3>
            <ul className="space-y-4">
              {['Home', 'Gallery', 'About', 'Dashboard'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className="group flex items-center gap-2 text-gray-500 hover:text-brand-accent transition-all duration-300 font-bold uppercase text-xs tracking-widest"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-brand-accent transition-all duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Community Uplink */}
          <div>
            <h3 className="font-oxanium text-sm font-bold text-white uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <Shield size={16} className="text-brand-accent" />
              Connect
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
                  className="w-12 h-12 flex items-center justify-center rounded-sm bg-brand-surface/50 border border-white/5 text-gray-400 hover:text-brand-accent hover:border-brand-accent/50 hover:bg-brand-accent/5 transition-all duration-300 group shadow-lg"
                >
                  <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
            <p className="mt-8 text-[10px] text-gray-600 uppercase font-bold tracking-widest leading-relaxed">
              Join our technical division for early access to new releases.
            </p>
          </div>
        </div>

        {/* Technical Footer Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-oxanium text-gray-600 uppercase tracking-[0.4em]">
            &copy; {currentYear} ARBSKINZ / TO3E DIVISION. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[9px] font-bold text-gray-700 hover:text-brand-accent uppercase tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-[9px] font-bold text-gray-700 hover:text-brand-accent uppercase tracking-widest transition-colors">Terms of Service</a>
            <a href="#" className="text-[9px] font-bold text-gray-700 hover:text-brand-accent uppercase tracking-widest transition-colors">Contact System</a>
          </div>
        </div>
      </div>

      {/* Aesthetic corner accents */}
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-accent/5 pointer-events-none" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}></div>
    </footer>
  );
};