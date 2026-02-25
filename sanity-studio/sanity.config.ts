import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Mohanteja',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'lf6dynn4',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: process.env.SANITY_STUDIO_API_VERSION || '2025-02-24',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
