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
    className="group relative flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-brand-accent transition-all duration-300"
  >
    {Icon && <Icon size={16} className="group-hover:animate-pulse" />}
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-accent shadow-[0_0_10px_#00f0ff] transition-all duration-300 group-hover:w-full" />
  </Link>
);

export const Navbar: React.FC<NavbarProps> = ({ user, onLogin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      // ✅ Login langsung ke Dashboard
      signIn("google", { callbackUrl: "/dashboard" });
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      signOut();
    }
  };

  return (
    <nav className="fixed w-full z-[100] top-0 left-0 border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0 cursor-pointer group">
            <h1 className="font-oxanium text-3xl font-black tracking-tighter text-white transition-all group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
              ARB<span className="text-brand-accent">SKINZ</span>
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-2">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/#about">About</NavLink>
              
              {/* ✅ FIX: Cek role 'admin' (huruf kecil) */}
              {user?.role === 'admin' && (
                <NavLink href="/dashboard" icon={LayoutDashboard}>
                  Dashboard
                </NavLink>
              )}
            </div>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter">Authorized User</span>
                  <span className="text-sm font-oxanium text-white">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500/5 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-sm border border-red-500/30 transition-all font-bold uppercase text-xs tracking-widest"
                >
                  <LogOut size={14} />
                  Terminate
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="group relative flex items-center gap-2 bg-brand-accent/10 hover:bg-brand-accent text-brand-accent hover:text-black px-6 py-2 border border-brand-accent/30 transition-all duration-500 font-oxanium font-bold uppercase text-sm skew-x-[-15deg] overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="flex items-center gap-2 skew-x-[15deg]">
                  <ShieldCheck size={18} />
                  System Login
                </span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-accent hover:text-white transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-dark/95 backdrop-blur-2xl border-b border-brand-accent/20">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <Link href="/" className="block py-3 text-lg font-oxanium font-bold uppercase tracking-widest text-white border-b border-white/5">Home</Link>
            <Link href="/#about" className="block py-3 text-lg font-oxanium font-bold uppercase tracking-widest text-white border-b border-white/5">About</Link>
            
            {/* ✅ FIX: Cek role 'admin' (huruf kecil) di Mobile */}
            {user?.role === 'admin' && (
               <Link href="/dashboard" className="block py-3 text-lg font-oxanium font-bold uppercase tracking-widest text-brand-accent border-b border-brand-accent/10">Admin Control</Link>
            )}
            
            <div className="pt-4">
               {user ? (
                 <button onClick={handleLogout} className="w-full text-center bg-red-500/10 text-red-500 py-4 font-bold uppercase tracking-widest rounded-lg">Logout Session</button>
               ) : (
                 <button onClick={handleLogin} className="w-full text-center bg-brand-accent text-black py-4 font-bold uppercase tracking-widest rounded-lg">Access System</button>
               )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
