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
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className='relative min-h-screen flex flex-col items-center px-6 space-y-10 sm:space-y-10 sm:px-8 pb-20 pt-36 md:pt-32 lg:pt-36'
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
        className='text-xl md:text-3xl uppercase font-bold text-primary text-center tracking-[0.2em] font-display'
      >
        Skills For AI‑Enabled Products
      </motion.h1>

      <p className='text-sm md:text-base text-muted text-center -mt-4'>
        Hover to see proficiency • Click a skill for details
      </p>

      <div className='grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-6 md:gap-8'>
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
    </motion.section>
  );
};

export default SkillsComponent;
