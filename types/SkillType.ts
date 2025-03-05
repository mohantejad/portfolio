export type SkillType = {
    name: string;
    icon: string;
    percentage: number;
    relatedProjects: { name: string; liveDemo: string }[];
    relatedExperience: { company: string; role: string }[];
  };
  