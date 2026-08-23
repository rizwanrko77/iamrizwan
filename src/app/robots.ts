import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const siteUrl = "https://iamrizwan.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended'
        ],
        allow: '/',
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
