import { generateOGImage } from '@/lib/og-image'

export const alt = 'RubixKube Resources - Site Reliability Intelligence'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return generateOGImage({
    title: 'Resources',
    description: 'Whitepapers, guides, and insights for modern SRE teams',
    stats: '50+ Resources'
  })
}
