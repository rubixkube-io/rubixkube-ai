import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // AI/LLM Training Crawlers - Block model training
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
      {
        userAgent: 'Applebot-Extended',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      
      // Chat/Search Bots - Allow discovery and citation
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      
      // Default rule - Allow everything else (search, social, etc.)
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://rubixkube.ai/sitemap.xml',
  }
}
