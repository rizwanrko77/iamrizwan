import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const siteUrl = "https://iamrizwan.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/bio',
    '/projects',
    '/contact',
    '/my-time'
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
