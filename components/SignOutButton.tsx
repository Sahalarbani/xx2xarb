"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="
        flex items-center gap-3 px-4 py-3 w-full
        bg-red-500/10 hover:bg-red-500/20 
        border border-red-500/20 hover:border-red-500/50
        backdrop-blur-xl rounded-full
        text-red-400 hover:text-red-300
        transition-all duration-300 group
        mt-auto
      "
    >
      <div className="p-1.5 bg-red-500/10 rounded-full group-hover:bg-red-500/20 transition-colors">
        <LogOut size={16} />
      </div>
      <span className="font-oxanium font-bold text-sm tracking-widest">DISCONNECT</span>
    </button>
  );
}
