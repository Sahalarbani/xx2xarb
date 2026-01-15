import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/api/'], // ⛔ Area Terlarang buat Google
    },
    sitemap: 'https://arbskin.vercel.app/sitemap.xml',
  };
}
