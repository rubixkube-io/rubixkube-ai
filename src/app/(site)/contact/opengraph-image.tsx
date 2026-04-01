import { generateOGImage } from '@/lib/og-image'
import { dynamicOgPageContent } from '@/lib/og-dynamic-page-content'

export const alt = 'Contact RubixKube'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return generateOGImage({ ...dynamicOgPageContent.contact })
}
