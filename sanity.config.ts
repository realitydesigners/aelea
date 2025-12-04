import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { deskStructure } from './src/sanity/deskStructure'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Area Site',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [structureTool({
    structure: deskStructure,
  })],

  schema: {
    types: schemaTypes,
  },
})

