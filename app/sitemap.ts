import type { MetadataRoute } from 'next';
import { CITIES } from '@/components/v2/cities';

const BASE = 'https://marketplacedeposit.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['', '/arenda-s-vykupom', '/catalog', '/start', '/about', '/legal', '/reviews', '/investors', '/messages', '/refinance', '/mortgage', '/teaser'];
  return [
    ...pages.map(p => ({ url: `${BASE}${p}`, lastModified: now, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.8 })),
    ...CITIES.map(c => ({ url: `${BASE}/gorod/${c.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 })),
  ];
}
