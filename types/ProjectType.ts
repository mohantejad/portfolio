import { PortableTextBlock } from "sanity";

export type ProjectType = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: PortableTextBlock[];
  tech: {
    name: string;
    link: string;
  }[];
  liveDemo: string;
  viewCode: string;
};