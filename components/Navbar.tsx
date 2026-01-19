"use client";

import React, { useState } from 'react';
import { User } from '../types';
import { Menu, X, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';

interface NavbarProps {
  user: User | null;
  onLogin?: () => void;
  onLogout?: () => void;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: any;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, icon: Icon }) => (
  <Link 
    href={href} 
    className="group relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white transition-all duration-300 rounded-full hover:bg-white/5"
  >
    {Icon && <Icon size={16} className="text-[#00f0ff] group-hover:scale-110 transition-transform" />}
    <span className="relative z-10 font-rajdhani tracking-wide text-base">{children}</span>
  </Link>
);

export const Navbar: React.FC<NavbarProps> = ({ user, onLogin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => {
    if (onLogin) onLogin();
    else signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    else signOut();
  };

  return (
    // GLASS HEADER: Ultra blur & transparan
    <nav className="fixed w-full z-[100] top-0 left-0 border-b border-white/5 bg-[#0a0a0a]/60 backdrop-blur-2xl supports-[backdrop-filter]:bg-[#0a0a0a]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* LOGO AREA */}
          <Link href="/" className="flex-shrink-0 cursor-pointer group relative">
            <div className="absolute -inset-4 bg-[#00f0ff]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h1 className="relative font-oxanium text-3xl font-black tracking-tighter text-white">
              ARB<span className="text-[#00f0ff] drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">SKINZ</span>
            </h1>
          </Link>

          {/* DESKTOP MENU - PILL SHAPE */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-1 bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/#about">About</NavLink>
              {user?.role === 'admin' && (
                <NavLink href="/dashboard" icon={LayoutDashboard}>
                  Dashboard
                </NavLink>
              )}
            </div>
          </div>

          {/* DESKTOP AUTH - CIRCULAR & GLOW */}
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] uppercase font-bold text-[#00f0ff] tracking-widest">Online</span>
                  <span className="text-sm font-oxanium text-white/90">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-3 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="group relative flex items-center gap-3 bg-white/5 hover:bg-[#00f0ff] text-white hover:text-black px-8 py-3 rounded-full border border-white/10 hover:border-[#00f0ff] transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-105 active:scale-95"
              >
                <ShieldCheck size={18} className="group-hover:animate-bounce" />
                <span className="font-oxanium font-bold uppercase text-sm tracking-wider">System Login</span>
                <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-transparent transition-all" />
              </button>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 rounded-full bg-white/5 text-white hover:bg-white/10 active:scale-90 transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU - FLOATING SHEET STYLE */}
      {isOpen && (
        <div className="md:hidden absolute top-24 left-4 right-4 bg-[#121212]/90 backdrop-blur-3xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl animate-in slide-in-from-top-5 fade-in duration-300">
          <div className="p-6 space-y-2">
            <Link href="/" className="block px-6 py-4 rounded-2xl text-lg font-oxanium font-bold text-white hover:bg-white/5 transition-colors">Home</Link>
            <Link href="/#about" className="block px-6 py-4 rounded-2xl text-lg font-oxanium font-bold text-white hover:bg-white/5 transition-colors">About</Link>
            
            {user?.role === 'admin' && (
               <Link href="/dashboard" className="block px-6 py-4 rounded-2xl text-lg font-oxanium font-bold text-[#00f0ff] bg-[#00f0ff]/5 border border-[#00f0ff]/20">
                 Admin Dashboard
               </Link>
            )}
            
            <div className="h-px bg-white/5 my-4" />
            
            <div className="px-2">
               {user ? (
                 <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-4 font-bold rounded-2xl hover:bg-red-500 hover:text-white transition-colors">
                   <LogOut size={18} /> Logout
                 </button>
               ) : (
                 <button onClick={handleLogin} className="w-full bg-[#00f0ff] text-black py-4 font-bold font-oxanium uppercase tracking-widest rounded-2xl shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                   Access System
                 </button>
               )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
