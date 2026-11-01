import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/profiles', '/offer', '/compare', '/favoritess', '/login'] }], sitemap: 'https://marketplacedeposit.com/sitemap.xml' };
}
