import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const siteUrl = "https://iamrizwan.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/bio',
    '/company',
    '/contact'
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
