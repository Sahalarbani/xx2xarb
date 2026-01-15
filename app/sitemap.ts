import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ✅ Ganti ini kalau nanti lu beli domain sendiri (.com)
  const baseUrl = 'https://arbskin.vercel.app'\; 

  // 1. Ambil semua ID skin dari database
  const skins = await prisma.skin.findMany({
    select: { id: true, updatedAt: true },
  });

  // 2. Bikin daftar link untuk setiap skin
  const skinUrls = skins.map((skin) => ({
    url: `${baseUrl}/skin/${skin.id}`,
    lastModified: skin.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Gabungin halaman utama + halaman skin
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...skinUrls,
  ];
}
