import { generateOGImage } from '@/lib/og-image'

export const alt = 'RubixKube Platform - Site Reliability Intelligence'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return generateOGImage({
    title: 'Platform',
    description: 'AI-native platform for autonomous site reliability engineering',
    stats: 'Time saved: 90%'
  })
}
