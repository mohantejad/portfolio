import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import schemas from './schemas'


export const config = defineConfig({
    title: 'Mohanteja | Portfolio',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
    basePath: process.env.NEXT_PUBLIC_SANITY_BASE_PATH!,
    useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true',
    plugins: [structureTool()],
    schema: { types: schemas }
})

console.log('API Version:', process.env.NEXT_PUBLIC_SANITY_API_VERSION);