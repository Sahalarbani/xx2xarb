import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";
import { LayoutDashboard, PackagePlus, LogOut, ArrowLeft, Menu } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  return (
    // PARENT WRAPPER
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#050505] overflow-hidden text-gray-100 font-sans">
      
      {/* SIDEBAR SECTION */}
      <aside className="flex-shrink-0 w-full md:w-80 z-50 p-2 md:p-4 h-auto md:h-full">
        {/* INNER GLASS PANEL */}
        <div className="w-full h-full bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/5 rounded-3xl md:rounded-[32px] flex flex-col p-4 md:p-6 shadow-2xl overflow-hidden relative">
            
            {/* Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#00f0ff]/10 to-transparent pointer-events-none opacity-50"/>

            {/* Header Brand */}
            <div className="flex items-center justify-between mb-4 md:mb-8 relative z-10">
                <div>
                    <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest mb-1 group">
                        <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Mainframe
                    </Link>
                    <h1 className="font-oxanium text-xl md:text-2xl font-black text-white leading-none">
                        ARB<span className="text-[#00f0ff]">ADMIN</span>
                    </h1>
                </div>
                {/* Mobile Menu Icon */}
                <div className="md:hidden p-2 bg-white/5 rounded-full text-[#00f0ff]">
                    <Menu size={20} />
                </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex flex-col gap-3 flex-1 overflow-y-auto custom-scrollbar relative z-10">
                <Link href="/dashboard" className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[#00f0ff] font-oxanium font-bold uppercase text-sm tracking-wide shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all hover:scale-[1.02]">
                    <LayoutDashboard size={18} />
                    <span>Overview</span>
                </Link>
                <Link href="/dashboard/create" className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 border border-transparent text-gray-400 font-oxanium font-bold uppercase text-sm tracking-wide hover:bg-white/10 hover:text-white transition-all hover:scale-[1.02]">
                    <PackagePlus size={18} />
                    <span>Deploy Asset</span>
                </Link>
            </nav>

            {/* Mobile Nav (Horizontal Scroll) */}
            <nav className="flex md:hidden gap-2 overflow-x-auto pb-0 relative z-10 scrollbar-hide">
                 <Link href="/dashboard" className="flex-shrink-0 px-4 py-2 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20 text-xs font-bold uppercase whitespace-nowrap">
                    Overview
                 </Link>
                 <Link href="/dashboard/create" className="flex-shrink-0 px-4 py-2 rounded-full bg-white/5 text-gray-300 border border-white/5 text-xs font-bold uppercase whitespace-nowrap">
                    Deploy
                 </Link>
            </nav>

            {/* User Profile (Desktop) */}
            <div className="hidden md:block mt-auto pt-6 border-t border-white/5 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00f0ff] to-purple-600 p-[1px]">
                         <div className="w-full h-full rounded-full bg-black overflow-hidden">
                            {session.user.image && <img src={session.user.image} alt="User" className="w-full h-full object-cover" />}
                         </div>
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white truncate max-w-[120px]">{session.user.name}</p>
                        <div className="flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
                           <p className="text-[9px] text-gray-500 uppercase tracking-wider">Level 5 Access</p>
                        </div>
                    </div>
                </div>
                
                <form action={async () => {
                    "use server"
                    redirect('/api/auth/signout')
                }}>
                      <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest group">
                         <LogOut size={14} className="group-hover:-translate-x-1 transition-transform"/> Terminate Session
                      </button>
                </form>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT SECTION */}
      {/* UPDATE: Padding dikurangi di mobile (p-2) biar konten lebih lebar */}
      <main className="flex-1 flex flex-col h-full overflow-hidden p-2 pt-0 md:p-4 md:pl-0">
        
        {/* INNER CONTENT CONTAINER */}
        {/* UPDATE: Rounded dikurangi di mobile (rounded-2xl) biar gak motong konten di pojok */}
        <div className="flex-1 bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/5 rounded-2xl md:rounded-[40px] relative overflow-hidden flex flex-col w-full">
            
            {/* Scrollable Content Area */}
            {/* UPDATE: Padding dalam dikurangi (p-3) biar form 'Upload' punya ruang napas */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-10 custom-scrollbar w-full">
                 
                 {/* Decorative Background Blob */}
                 <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#00f0ff]/5 blur-[150px] rounded-full pointer-events-none" />
                 
                 {/* Render Page Content */}
                 <div className="relative z-10 pb-20 w-full max-w-full">
                    {children}
                 </div>
            </div>

        </div>
      </main>

    </div>
  );
}
