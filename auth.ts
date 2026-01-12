import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as any, // <--- TAMBAHKAN 'as any' DISINI
  session: { strategy: "database" },
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async session({ session, user }: any) {
      if (session.user && user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
});
