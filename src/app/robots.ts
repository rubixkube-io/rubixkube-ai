import { MetadataRoute } from 'next'

/**
 * Allow all crawlers (including AI/answer-engine bots). Blocks were removed so
 * llms.txt, llms-full.txt, and on-page copy can be discovered and cited broadly.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://rubixkube.ai/sitemap.xml',
  }
}
