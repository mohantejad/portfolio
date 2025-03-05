"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import Skill from "./cards/Skill";
import SkillModal from "./SkillModal";
import { SkillType } from "@/types";


interface SkillProps {
  skillData: SkillType[]
}


const Skills: React.FC<SkillProps> = ({ skillData }) => {

  const [selectedSkill, setSelectedSkill] = useState<SkillType | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative h-screen flex flex-col items-center px-6 space-y-16 sm:space-y-10"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="text-xl md:text-2xl uppercase font-bold text-primary text-center mt-32 tracking-wide"
      >
        Demanding Skills that I Possess in my Command
      </motion.h1>

      <div className="grid grid-cols-5 gap-6">
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

      <motion.button
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-primary text-xl cursor-pointer p-1 hover:border hover:border-primary rounded-full bg-opacity-0 transition-border duration-300 hover:bg-primary hover:text-black"
        onClick={() => {
          const nextSection = document.getElementById("experience");
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <FaChevronDown />
      </motion.button>

      {selectedSkill && <SkillModal 
                            onClose={() => setSelectedSkill(null)} 
                            project={selectedSkill.relatedProjects} 
                            experience={selectedSkill.relatedExperience} 
                            skill={selectedSkill.name}
                            percentage={selectedSkill.percentage}
                        />}
    </motion.div>
  );
};

export default Skills;
