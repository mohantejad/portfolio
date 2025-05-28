import { defineField } from 'sanity';

const skillSchema = defineField({
    name: 'skill',
    title: 'Skills',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Skill Name',
            type: 'string',
          }),
          defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name' },
            validation: (rule) =>
              rule.required().error(`Required to generate a page on the website`),
            hidden: ({ document }) => !document?.name,
          }),
          defineField({
            name: 'icon',
            title: 'Skill Icon',
            type: 'image',
            options: { hotspot: true },
          }),
          defineField({
            name: 'percentage',
            title: 'Proficiency (%)',
            type: 'number',
            validation: (Rule) => Rule.min(0).max(100),
          }),
          defineField({
            name: 'relatedProjects',
            title: 'Related Projects',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'project' }] }], 
          }),
          defineField({
            name: 'relatedExperience',
            title: 'Related Experience',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'experience' }] }], 
          }),
      
    ]
})

export default skillSchema
