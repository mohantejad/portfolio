import ExperienceComponent from '@/components/ExperienceComponent';
import { getExperiencData } from '@/sanity/sanity-utils';
import { ExperienceType } from '@/types/ExperienceType';

const Experience = async () => {
  const experienceData: ExperienceType[] = await getExperiencData();
  return <ExperienceComponent experienceData={experienceData} />;
};

export default Experience;
