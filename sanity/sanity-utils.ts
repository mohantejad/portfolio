import { createClient, groq } from 'next-sanity';
import { AboutType, HeroType, ProjectType, ExperienceType, SkillType } from '@/types';

const hasSanityEnv =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
  Boolean(process.env.NEXT_PUBLIC_SANITY_DATASET) &&
  Boolean(process.env.NEXT_PUBLIC_SANITY_API_VERSION);

const getClient = () => {
  if (!hasSanityEnv) return null;
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
    useCdn: false,
  });
};

const mockAbout: AboutType = {
  education: [
    {
      degree: 'Master of Information Technology',
      college: 'University of New South Wales',
      major: 'AI Specialization',
      year: '2022',
      collegeLink: 'https://www.unsw.edu.au',
    },
    {
      degree: 'Bachelor of Technology',
      college: 'GITAM University',
      major: 'Computer Science & Engineering',
      year: '2019',
      collegeLink: 'https://www.gitam.edu',
    },
  ],
  experience: [
    {
      role: 'Software Engineer Intern',
      company: 'Tipaload',
      duration: 'Nov 2025 – Jan 2026',
      companyLink: 'https://www.tipaload.com',
    },
    {
      role: 'Software Engineer',
      company: 'BarNet (OpenLaw)',
      duration: 'Oct 2023 – Feb 2024',
      companyLink: 'https://openlaw.com.au',
    },
  ],
  projects: [
    { name: 'CareerIDream', icon: 'FaRocket', link: 'https://careeridream-private.vercel.app/' },
    { name: 'EventHub', icon: 'FaShoppingCart', link: 'https://eventhub-alpha.vercel.app/' },
  ],
  skills: [
    { name: 'Python', link: 'https://www.python.org', top: true },
    { name: 'Django', link: 'https://www.djangoproject.com', top: true },
    { name: 'React', link: 'https://react.dev', top: true },
    { name: 'PostgreSQL', link: 'https://www.postgresql.org', top: true },
    { name: 'LLM APIs', link: 'https://platform.openai.com', top: true },
  ],
};

export async function getHeroData(): Promise<HeroType> {
  if (!hasSanityEnv) throw new Error('Sanity env not configured');
  const client = getClient()!;
  const data = await client.fetch(
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
  if (!data) {
    throw new Error('Hero content not found in Sanity');
  }
  return data;
}

export async function getAboutData(): Promise<AboutType> {
  if (!hasSanityEnv) throw new Error('Sanity env not configured');
  const client = getClient()!;
  const data = await client.fetch(`
    *[_type == "about"][0] {
      education,
      experience,
      skills
    }
  `);
  if (!data) {
    throw new Error('About content not found in Sanity');
  }
  return data;
}

export async function getProjectsData(): Promise<ProjectType[]> {
  if (!hasSanityEnv) throw new Error('Sanity env not configured');
  const client = getClient()!;
  const data = await client.fetch(
    groq`*[_type == "project"] | order(_createdAt asc) {
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
  if (!data) {
    throw new Error('Projects content not found in Sanity');
  }
  return data;
}

export async function getSkillsData(): Promise<SkillType[]> {
  if (!hasSanityEnv) throw new Error('Sanity env not configured');
  const client = getClient()!;
  const data = await client.fetch(
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
  );
  if (!data) {
    throw new Error('Skills content not found in Sanity');
  }
  return data;
}

export async function getExperiencData(): Promise<ExperienceType[]> {
  if (!hasSanityEnv) throw new Error('Sanity env not configured');
  const client = getClient()!;
  const data = await client.fetch(
    groq`*[_type == 'experience'] | order(toDate desc){
      title,
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
  );
  if (!data) {
    throw new Error('Experience content not found in Sanity');
  }
  return data;
}
