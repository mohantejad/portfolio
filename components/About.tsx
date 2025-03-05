"use client";

import { AboutType } from "@/types/AboutType";
import { motion } from "framer-motion";
import { ReactElement } from "react";
import {
  FaGraduationCap,
  FaProjectDiagram,
  FaBriefcase,
  FaEnvelope,
  FaRocket,
  FaShoppingCart,
  FaFileAlt,
  FaFlask,
  FaChevronDown,
} from "react-icons/fa";

interface ProjectSummary {
  name: string;
  icon: string;
  liveDemo: string;
}


interface AboutProps {
  aboutData: AboutType;
  projects: ProjectSummary[];
}

const iconMap: Record<string, ReactElement> = {
  FaRocket: <FaRocket />,
  FaShoppingCart: <FaShoppingCart />,
  FaFileAlt: <FaFileAlt />,
  FaFlask: <FaFlask />,
};



const About: React.FC<AboutProps> = ({ aboutData, projects }) => {

  return (
    <div className="relative h-screen text-text snap-start snap-mandatory overflow-y-scroll flex flex-col items-center justify-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="text-xl md:text-2xl uppercase font-bold text-primary text-center mt-8"
      >
        My Journey Towards Building Intelligent Solutions
      </motion.h1>

      <div className="mt-8 md:mt-10 grid gap-10 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="p-6 border border-primary rounded-lg text-center"
        >
          <div className="flex items-center space-x-4">
            <FaGraduationCap className="text-2xl text-primary" />
            <h3 className="text-xl font-bold uppercase">Education</h3>
          </div>
          <div className="mt-2 text-left">
            {aboutData.education.map((edu) => (
              <div key={edu.degree} className="mb-2">
                <h4 className="text-md font-semibold text-primary">{edu.degree}</h4>
                <p className="text-sm text-text">{edu.major} - {edu.college} ({edu.year})</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="p-6 border border-primary rounded-lg text-center"
        >
          <div className="flex items-center space-x-4">
            <FaProjectDiagram className="text-2xl text-primary" />
            <h3 className="text-xl font-bold uppercase">Projects</h3>
          </div>
          <div className="mt-2 text-left flex flex-col space-y-1">
            {projects.map((proj) => (
              <div key={proj.name} className="flex items-center gap-3 text-sm font-semibold">
                {iconMap[proj.icon] || <FaProjectDiagram />} {proj.name}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="p-6 border border-primary rounded-lg text-center hidden md:block"
        >
          <div className="flex items-center space-x-4">
            <FaBriefcase className="text-2xl text-primary" />
            <h3 className="text-xl font-bold uppercase">Experience</h3>
          </div>
          <div className="mt-2 text-left">
            {aboutData.experience.map((exp) => (
              <div key={exp.role} className="mb-2">
                <h4 className="text-md font-semibold text-primary">{exp.role}</h4>
                <p className="text-sm text-text">{exp.company} ({exp.duration})</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="hidden md:flex mt-12 flex-wrap justify-center gap-4"
      >
        {aboutData.skills
          .filter((skill) => skill.top)
          .map((skill, index) => (
            <a
              key={index}
              href={skill.link}
              className="px-4 py-2 text-sm font-semibold border-2 rounded-full transition-all duration-300 border-text text-primary hover:bg-primary hover:text-black hover:shadow-lg"
            >
              {skill.name}
            </a>
          ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="mt-12 md:mt-16 lg-mt-20 text-center flex flex-wrap items-center justify-center gap-4"
      >
        <h2 className="text-xl md:text-2xl font-bold text-text whitespace-nowrap">
          Want to collaborate or discuss an AI idea?
        </h2>

        <a
          href="#contact"
          className="relative inline-flex items-center gap-2 text-lg font-bold text-primary border-b-2 border-primary transition-all duration-300 hover:text-hover hover:border-hover group whitespace-nowrap"
        >
          Get in Touch <FaEnvelope />
          <span className="absolute top-6 left-0 bottom-0 w-0 h-[2px] bg-hover transition-all duration-500 ease-in-out group-hover:w-full" />
        </a>
      </motion.div>

      <motion.button
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-primary text-xl cursor-pointer p-1 hover:border hover:border-primary rounded-full bg-opacity-0 transition-border duration-300 hover:bg-primary hover:text-black"
        onClick={() => {
          const nextSection = document.getElementById("projects");
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <FaChevronDown />
      </motion.button>
    </div>
  );
};

export default About;
