type EducationType = {
  degree: string;
  college: string;
  major: string;
  year: string;
};

type ExperienceType = {
  role: string;
  company: string;
  duration: string;
};

type ProjectType = {
  name: string;
  icon: string;
};

type SkillType = {
  name: string;
  link: string;
  top: boolean;
};

export type AboutType = {
  education: EducationType[];
  experience: ExperienceType[];
  projects: ProjectType[];
  skills: SkillType[];
};
