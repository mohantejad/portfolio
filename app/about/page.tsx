import { AboutType } from '@/types/AboutType';
import { ProjectType } from '@/types/ProjectType';
import { getAboutData, getProjectsData } from '@/sanity/sanity-utils';
import AboutComponent from '@/components/AboutComponent';

const About = async () => {
  const aboutData: AboutType = await getAboutData();
  const projectData: ProjectType[] = await getProjectsData();

  return (
    <AboutComponent
      aboutData={aboutData}
      projects={projectData.map(({ name, icon, liveDemo, slug }) => ({
        name,
        icon,
        liveDemo,
        slug,
      }))}
    />
  );
};

export default About;
