import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authConfig } from "./auth.config"; // <-- Kita import config yang tadi

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" }, // Pastikan pakai database strategy
  ...authConfig, // Gabungkan settingan dari auth.config.ts
  callbacks: {
    ...authConfig.callbacks,
    // Logic Tambahan: Masukkan Role User dari Database ke Session
    async session({ session, user }: any) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role; // <-- PENTING: Ambil role ADMIN/USER
      }
      return session;
    },
  },
});
