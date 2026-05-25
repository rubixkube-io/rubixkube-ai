import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {schemaTypes} from './schemas'
import {previewAction} from './actions/previewAction'

export default defineConfig({
  name: 'default',
  title: 'RubixKube Blog',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: '/studio',

  plugins: [
    structureTool(),
    visionTool(),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, { schemaType }) => {
      if (schemaType === 'post' || schemaType === 'referencePage' || schemaType === 'podcastEpisode') {
        return [previewAction, ...prev]
      }
      return prev
    },
  },
})
