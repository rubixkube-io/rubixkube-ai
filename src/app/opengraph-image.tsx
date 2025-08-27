import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'RubixKube - Site Reliability Intelligence'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  // Read the existing og.png file from the public directory
  const imageData = await readFile(join(process.cwd(), 'public/og.png'))
  
  return new Response(imageData, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
