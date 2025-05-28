'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Skill from './utils/Skill';
import SkillModal from './utils/SkillModal';
import { SkillType } from '@/types';

interface SkillProps {
  skillData: SkillType[];
}

const SkillsComponent: React.FC<SkillProps> = ({ skillData }) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillType | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className='relative h-screen flex flex-col items-center px-6 space-y-16 sm:space-y-10'
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
        className='text-xl md:text-2xl uppercase font-bold text-primary text-center mt-32 tracking-wide'
      >
        Skills that I have to build any AI software
      </motion.h1>

      <div className='grid grid-cols-5 md:grid-cols-6 gap-6 md:gap-8'>
        {skillData.map((skill) => (
          <Skill
            key={skill.name}
            icon={skill.icon}
            percentage={skill.percentage}
            name={skill.name}
            onClick={() => setSelectedSkill(skill)}
          />
        ))}
      </div>

      {selectedSkill && (
        <SkillModal
          onClose={() => setSelectedSkill(null)}
          project={selectedSkill.relatedProjects}
          experience={selectedSkill.relatedExperience}
          skill={selectedSkill.name}
          percentage={selectedSkill.percentage}
        />
      )}
    </motion.div>
  );
};

export default SkillsComponent;
