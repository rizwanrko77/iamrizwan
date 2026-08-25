import { MetadataRoute } from 'next';
import { getAllResources } from '@/data/resources';

export const dynamic = 'force-static';

const siteUrl = "https://iamrizwan.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/bio',
    '/services',
    '/company',
    '/resources',
    '/reviews',
    '/contact'
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const resourceEntries: MetadataRoute.Sitemap = getAllResources().map((resource) => ({
    url: `${siteUrl}/resources/${resource.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...resourceEntries];
}

