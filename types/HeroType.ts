export type HeroType = {
  title: string;
  description: string;
  typographs: string[];
  stats: {
    label: string;
    value: number;
  }[];
  socials: {
    platform: string;
    url: string;
    icon: string;
  }[];
  resume: string;
};
