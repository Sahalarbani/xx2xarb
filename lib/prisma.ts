import { PrismaClient } from '@prisma/client';

// Use globalThis instead of global to avoid TypeScript errors in environments where 'global' is not recognized
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;