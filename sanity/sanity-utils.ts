import { createClient, groq } from "next-sanity";
import { AboutType, HeroType, ProjectType, ExperienceType, SkillType } from "@/types";


const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false,
});

export async function getHeroData(): Promise<HeroType> {
  return client.fetch(
    groq`*[_type=='hero'][0]{
        title,
        description,
        typographs,
        stats[] {
            label,
            value
        },
        socials[] {
            platform,
            url,
            "icon": icon.asset->url
        },
        "resume": resume.asset->url
    }`
  );
}

export async function getAboutData(): Promise<AboutType> {
  return client.fetch(`
    *[_type == "about"][0] {
      education,
      experience,
      skills
    }
  `);
}

export async function getProjectsData(): Promise<ProjectType[]> {
  return client.fetch(
    groq`*[_type == "project"]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      icon,
      description,
      liveDemo,
      viewCode,
      "tech": tech[]->{name, link}
  }`
  );
}

export async function getSkillsData(): Promise<SkillType[]> {
  return client.fetch(
    groq`*[_type == "skill"]{
      name,
      "icon": icon.asset->url,
      percentage,
      relatedProjects[]->{
        name,
        "liveDemo": liveDemo
      },
      relatedExperience[]->{
        company,
        role
      }
    }`
  )
}

export async function getExperiencData(): Promise<ExperienceType[]> {
  return client.fetch(
    groq`*[_type == 'experience']{
      company,
      role,
      fromDate,
      toDate,
      description,
      "image": image.asset->url,
      skillsUsed[]->{
        name,
        "icon": icon.asset->url
      }
    }`
  )
}
