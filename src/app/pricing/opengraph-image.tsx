import { generateOGImage } from '@/lib/og-image'

export const alt = 'RubixKube Pricing'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return generateOGImage({
    title: 'Pricing',
    description: 'Start free. Scale when you are ready. Enterprise when reliability is mission-critical.',
  })
}
