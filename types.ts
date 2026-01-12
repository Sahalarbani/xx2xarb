import NextAuth, { DefaultSession } from "next-auth";

// 🔥 INI KODE SAKTINYA: Kita inject 'role' ke dalam NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}

// --- Batas Kode Baru (Biarkan kode lama di bawah ini tetap ada) ---


export interface Skin {
  id: string;
  title: string;
  description: string;
  image: string;
  downloadUrl: string;
  category: string; // Prisma returns string, looser type helps compatibility
  author: string; // mapped from authorName
  downloads: number;
  createdAt: string | Date; // Allow Date objects from Prisma
  published?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
