'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {codeInput} from '@sanity/code-input'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  document: {
    productionUrl: async (prev, context) => {
      const doc = context.document
      const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
      const slug = (doc.slug as undefined | {current?: string})?.current
      if (!slug) return prev
      if (doc._type === 'post') return `${origin}/blog/${slug}`
      if (doc._type === 'referencePage') return `${origin}/${doc.category || 'learn'}/${slug}`
      return prev
    },
  },
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
    codeInput(),
  ],
})
