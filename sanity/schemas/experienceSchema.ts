import { defineField, defineType } from "sanity";

const experienceScema = defineType({
    name: 'experience',
    title: 'Experience',
    type: 'document',
    fields: [
          defineField({
            name: "title",
            title: "Job Title",
            type: "string",
          }),
          defineField({
            name: "company",
            title: "Company / Organization",
            type: "string",
          }),
          defineField({
            name: "fromDate",
            title: "From Date",
            type: "date",
          }),
          defineField({
            name: "toDate",
            title: "To Date",
            type: "date",
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "array",
            of: [{ type: "string" }],
          }),
          defineField({
            name: "image",
            title: "Experience Image",
            type: "image",
            options: { hotspot: true },
          }),
          defineField({
            name: "skillsUsed",
            title: "Skills Used",
            type: "array",
            of: [{ type: "reference", to: [{ type: "skill" }] }], // Many-to-Many Relationship with Skills
          }),
    ]
})

export default experienceScema