import { defineLive } from "next-sanity/live";
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: 'vX' }),
  // Server token enables fetching draft documents during preview
  serverToken: process.env.SANITY_API_READ_TOKEN,
  // Browser token enables live updates in the Presentation tool iframe
  browserToken: process.env.SANITY_API_READ_TOKEN,
});
