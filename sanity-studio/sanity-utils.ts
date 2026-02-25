import { createClient, groq } from "next-sanity";
import { AboutType, HeroType, ProjectType, ExperienceType, SkillType } from "../types";

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

const mockHero: HeroType = {
  title: "AI + Full-Stack Engineer",
  description:
    "I design and build AI-enabled products, shipping production APIs, data pipelines, and modern web experiences. Focused on real-world impact, reliability, and clean UX.",
  typographs: [
    "AI-Enabled Full-Stack Engineering",
    "LLM API Integration",
    "Data Pipelines & Automation",
  ],
  socials: [
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/mohantejad/", icon: "/globe.svg" },
    { platform: "GitHub", url: "https://github.com/mohantejad", icon: "/next.svg" },
    { platform: "Portfolio", url: "https://mohantejad.vercel.app/", icon: "/vercel.svg" },
  ],
  resume: "/Mohanteja_Resume.pdf",
};

const mockAbout: AboutType = {
  education: [
    {
      degree: "Master of Information Technology",
      college: "University of New South Wales",
      major: "AI Specialization",
      year: "2022",
      collegeLink: "https://www.unsw.edu.au",
    },
    {
      degree: "Bachelor of Technology",
      college: "GITAM University",
      major: "Computer Science & Engineering",
      year: "2019",
      collegeLink: "https://www.gitam.edu",
    },
  ],
  experience: [
    {
      role: "Software Engineer Intern",
      company: "Tipaload",
      duration: "Nov 2025 – Jan 2026",
      companyLink: "https://www.tipaload.com",
    },
    {
      role: "Software Engineer",
      company: "BarNet (OpenLaw)",
      duration: "Oct 2023 – Feb 2024",
      companyLink: "https://openlaw.com.au",
    },
  ],
  projects: [
    { name: "CareerIDream", icon: "FaRocket", link: "https://careeridream-private.vercel.app/" },
    { name: "EventHub", icon: "FaShoppingCart", link: "https://eventhub-alpha.vercel.app/" },
  ],
  skills: [
    { name: "Python", link: "https://www.python.org", top: true },
    { name: "Django", link: "https://www.djangoproject.com", top: true },
    { name: "React", link: "https://react.dev", top: true },
    { name: "PostgreSQL", link: "https://www.postgresql.org", top: true },
    { name: "LLM APIs", link: "https://platform.openai.com", top: true },
  ],
};

const mockProjects: ProjectType[] = [
  {
    id: "careeridream",
    name: "CareerIDream",
    slug: "careeridream",
    icon: "FaRocket",
    description: [
      {
        _type: "block",
        children: [
          { _type: "span", text: "AI-assisted resume and job matching with structured outputs and export to DOCX/PDF." },
        ],
      },
    ],
    tech: [
      { name: "Django REST", link: "https://www.django-rest-framework.org" },
      { name: "PostgreSQL", link: "https://www.postgresql.org" },
      { name: "Next.js", link: "https://nextjs.org" },
    ],
    liveDemo: "https://careeridream-private.vercel.app/",
    viewCode: "https://github.com/mohantejad/careeridream",
  },
  {
    id: "eventhub",
    name: "EventHub",
    slug: "eventhub",
    icon: "FaShoppingCart",
    description: [
      {
        _type: "block",
        children: [
          { _type: "span", text: "End-to-end event management platform with full-stack deployment." },
        ],
      },
    ],
    tech: [
      { name: "Django REST", link: "https://www.django-rest-framework.org" },
      { name: "Next.js", link: "https://nextjs.org" },
      { name: "Supabase", link: "https://supabase.com" },
    ],
    liveDemo: "https://eventhub-alpha.vercel.app/",
    viewCode: "https://github.com/mohantejad/eventhub",
  },
];

const mockSkills: SkillType[] = [
  {
    name: "Python",
    icon: "/globe.svg",
    percentage: 85,
    relatedProjects: [{ name: "CareerIDream", liveDemo: "https://careeridream-private.vercel.app/" }],
    relatedExperience: [{ company: "BarNet (OpenLaw)", role: "Software Engineer" }],
  },
  {
    name: "Django",
    icon: "/globe.svg",
    percentage: 80,
    relatedProjects: [{ name: "CareerIDream", liveDemo: "https://careeridream-private.vercel.app/" }],
    relatedExperience: [{ company: "Cognizant", role: "Software Engineer" }],
  },
  {
    name: "React",
    icon: "/globe.svg",
    percentage: 75,
    relatedProjects: [{ name: "EventHub", liveDemo: "https://eventhub-alpha.vercel.app/" }],
    relatedExperience: [{ company: "Cognizant", role: "Software Engineer" }],
  },
];

const mockExperience: ExperienceType[] = [
  {
    title: "Software Engineer Intern",
    company: "Tipaload",
    role: "Testing & Data Analysis",
    fromDate: "2025-11-01",
    toDate: "2026-01-01",
    description: [
      "Performed functional and regression testing across web workflows.",
      "Documented bugs and usability issues to improve platform stability.",
      "Analyzed public datasets to identify business trends.",
    ],
    image: "/globe.svg",
    skillsUsed: [{ name: "Python", icon: "/globe.svg" }],
  },
  {
    title: "Software Engineer",
    company: "BarNet (OpenLaw)",
    role: "Full Stack",
    fromDate: "2023-10-01",
    toDate: "2024-02-01",
    description: [
      "Built full-stack apps with Django/FastAPI and Next.js.",
      "Designed REST APIs and data ingestion pipelines.",
      "Structured large datasets for backend services.",
    ],
    image: "/globe.svg",
    skillsUsed: [{ name: "Django", icon: "/globe.svg" }],
  },
];

export async function getHeroData(): Promise<HeroType> {
  if (!hasSanityEnv) return mockHero;
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
  return data ?? mockHero;
}

export async function getAboutData(): Promise<AboutType> {
  if (!hasSanityEnv) return mockAbout;
  const client = getClient()!;
  const data = await client.fetch(`
    *[_type == "about"][0] {
      education,
      experience,
      skills
    }
  `);
  return data ?? mockAbout;
}

export async function getProjectsData(): Promise<ProjectType[]> {
  if (!hasSanityEnv) return mockProjects;
  const client = getClient()!;
  const data = await client.fetch(
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
  return data ?? mockProjects;
}

export async function getSkillsData(): Promise<SkillType[]> {
  if (!hasSanityEnv) return mockSkills;
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
  )
  return data ?? mockSkills;
}

export async function getExperiencData(): Promise<ExperienceType[]> {
  if (!hasSanityEnv) return mockExperience;
  const client = getClient()!;
  const data = await client.fetch(
    groq`*[_type == 'experience']{
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
  )
  return data ?? mockExperience;
}
