import { defineField, defineType } from "sanity";

const aboutSchema = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "degree", title: "Degree", type: "string" }),
            defineField({ name: "college", title: "College", type: "string" }),
            defineField({ name: "major", title: "Major", type: "string" }),
            defineField({ name: "year", title: "Year", type: "string" }),
            defineField({ name: "collegeLink", title: "College Link", type: "url" }),
          ],
        },
      ],
    }),

    defineField({
      name: "experience",
      title: "Experience",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({ name: "company", title: "Company", type: "string" }),
            defineField({
              name: "duration",
              title: "Duration",
              type: "string",
            }),
            defineField({ name: "companyLink", title: "Company Link", type: "url" }), 
          ],
        },
      ],
    }),

    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Skill Name", type: "string" }),
            defineField({ name: "link", title: "Link", type: "string" }),
            defineField({ name: "top", title: "Top Skill", type: "boolean" }),
          ],
        },
      ],
    }),
  ],
});

export default aboutSchema
