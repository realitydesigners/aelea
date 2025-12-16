'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { deskStructure } from '@/sanity/deskStructure'
import { schemaTypes } from '@/sanity/schemaTypes'
import dynamic from 'next/dynamic'

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  {
    ssr: false,
  }
)

const config = defineConfig({
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

export default function StudioPage() {
  return <NextStudio config={config} />
}

