import { defineType, defineField } from 'sanity';

const projectSchema = defineType({
  name: 'project',
  title: 'projects',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'icon',
      title: 'Icon Class Name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'string',
        }),
      ],
    }),
    
    defineField({
      name: 'liveDemo',
      title: 'Live Demo',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'viewCode',
      title: 'View Code',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'tech',
      title: 'Skills Used',
      type: 'array',
      of: [{ type: 'reference', to: [{type: 'skill' }] }]
    })
  ],
});

export default projectSchema;
