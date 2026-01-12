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
    authorized({ auth, request: { nextUrl } }) {
      // 🟢 STRATEGI AMAN:
      // Kita return true (izinkan lewat) di sini untuk menghindari error Edge Runtime.
      // Pengecekan keamanan 'SIAPA YANG BOLEH MASUK' dipindah ke app/dashboard/layout.tsx
      // yang berjalan di Server (Node.js) dan aman mengakses Database.
      return true;
    },
  },
} satisfies NextAuthConfig;
