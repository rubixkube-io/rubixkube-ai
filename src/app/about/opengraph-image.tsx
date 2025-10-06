import { generateOGImage } from '@/lib/og-image'

export const alt = 'RubixKube About - Site Reliability Intelligence'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return generateOGImage({
    title: 'About',
    description: 'Pioneering the future of autonomous site reliability engineering',
    stats: 'Founded 2024'
  })
}
