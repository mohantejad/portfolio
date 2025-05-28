import SkillsComponent from '@/components/SkillsComponent';
import { getSkillsData } from '@/sanity/sanity-utils';
import { SkillType } from '@/types/SkillType';

const Skills = async () => {
  const skillData: SkillType[] = await getSkillsData();
  return <SkillsComponent skillData={skillData} />;
};

export default Skills;
