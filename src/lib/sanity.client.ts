import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false, // Set to true for production
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: { _type?: string; asset?: { _ref: string; _type?: string } }) {
  return builder.image(source)
}
