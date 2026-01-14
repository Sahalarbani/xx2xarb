import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      // Tetap true sesuai strategi aman lu di layout.tsx
      return true;
    },
    // ✅ TAMBAHKAN DUA BARIS INI: Ini jembatan dari 112B ke Dashboard
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
