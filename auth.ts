import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
// ✅ FIX: Gunakan kurung kurawal agar tidak error build
import { authConfig } from "./auth.config"; 

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "database" },
  // ✅ FIX: Biar login awet di Vercel (Tidak logout sendiri)
  trustHost: true, 
  ...authConfig,
  callbacks: {
    async session({ session, user }: any) {
      if (session.user && user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
});
