import { generateOGImage } from '@/lib/og-image'

export const alt = 'RubixKube Blog'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return generateOGImage({
    title: 'Blog',
    description: 'Deep dives into AI-native infrastructure, SRE, and autonomous reliability.',
  })
}
