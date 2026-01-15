import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://arbskin.vercel.app'\;

  const skins = await prisma.skin.findMany({
    select: { id: true, updatedAt: true },
  });

  const skinUrls = skins.map((skin) => ({
    url: `${baseUrl}/skin/${skin.id}`,
    lastModified: skin.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

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
