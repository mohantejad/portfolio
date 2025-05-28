import ProjectsComponent from '@/components/ProjectsComponent';
import { getProjectsData } from '@/sanity/sanity-utils';
import { ProjectType } from '@/types';

const Projects = async () => {
  const projectData: ProjectType[] = await getProjectsData();
  return <ProjectsComponent projectData={projectData} />;
};

export default Projects;
