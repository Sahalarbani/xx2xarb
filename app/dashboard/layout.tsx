import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";
import { LayoutDashboard, PackagePlus, LogOut, ArrowLeft } from "lucide-react";
import { SignOutButton } from "@/components/SignOutButton"; // Asumsi ada komponen ini, atau bisa inline

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ambil sesi user dari server (paling aman & akurat)
  const session = await auth();

  // 🔒 CEK 1: Apakah user sudah login?
  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  // 🔒 CEK 2: Apakah role-nya ADMIN?
  if (session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col md:flex-row relative overflow-x-hidden">
      
      {/* FLOATING GLASS SIDEBAR (Desktop) 
        Mobile akan stack di atas
      */}
      <aside className="w-full md:w-80 p-6 md:h-screen sticky top-0 z-50">
        <div className="h-full bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 rounded-[32px] flex flex-col p-6 shadow-2xl relative overflow-hidden">
            
            {/* Ambient Glow di dalam sidebar */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#00f0ff]/5 to-transparent pointer-events-none"/>

            {/* Header Admin */}
            <div className="mb-10 relative z-10">
                <Link href="/" className="flex items-center gap-2 group mb-6 text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Mainframe
                </Link>
                <h1 className="font-oxanium text-2xl font-black text-white">
                    ARB<span className="text-[#00f0ff]">ADMIN</span>
                </h1>
                <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_8px_#00f0ff]" />
                    <span className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-wider">Secure Connection</span>
                </div>
            </div>

            {/* Navigasi Utama */}
            <nav className="flex-grow space-y-2 relative z-10">
                <Link href="/dashboard" className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[#00f0ff] font-oxanium font-bold uppercase text-sm tracking-wide shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all hover:scale-[1.02]">
                    <LayoutDashboard size={20} />
                    Overview
                </Link>
                <Link href="/dashboard/create" className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 border border-transparent text-gray-400 font-oxanium font-bold uppercase text-sm tracking-wide hover:bg-white/10 hover:text-white transition-all hover:scale-[1.02]">
                    <PackagePlus size={20} />
                    Deploy Asset
                </Link>
            </nav>

            {/* User Profile & Logout */}
            <div className="mt-auto pt-6 border-t border-white/5 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    {session.user.image ? (
                        <img src={session.user.image} alt="Admin" className="w-10 h-10 rounded-full border border-white/10" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-white/10" />
                    )}
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">{session.user.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Level 5 Access</p>
                    </div>
                </div>
                {/* Tombol Logout custom style */}
                <form action={async () => {
                    "use server"
                    // Import signOut dari auth di server action inline atau komponen terpisah
                    // Disini kita asumsi SignOutButton handle logic, atau kita redirect manual
                    // Agar simpel, kita pakai link ke api auth signout
                    redirect('/api/auth/signout')
                }}>
                     <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest">
                        <LogOut size={14} /> Terminate Session
                     </button>
                </form>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-8 md:pl-0 overflow-x-hidden">
        {/* Container Glass untuk konten */}
        <div className="bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/5 rounded-[40px] min-h-full p-8 relative overflow-hidden shadow-2xl">
            {/* Ambient background decoration */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#00f0ff]/5 blur-[120px] rounded-full pointer-events-none" />
            
            {children}
        </div>
      </main>
    </div>
  );
}
