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
} from "react-icons/fa";
import InfoCard from "./utils/InfoCard";
import Link from "next/link";

interface ProjectSummary {
  name: string;
  icon: string;
  liveDemo: string;
  slug: string;
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

const AboutComponent: React.FC<AboutProps> = ({ aboutData, projects }) => {

  return (
    <div className="text-text flex flex-col items-center justify-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="text-xl md:text-2xl uppercase font-bold text-primary text-center mt-8"
      >
        My Journey Towards Building Intellectual Solutions
      </motion.h1>

      <div className="mt-8 md:mt-10 grid gap-10 md:grid-cols-3">

        <InfoCard
          icon={<FaGraduationCap className="text-2xl text-primary" />}
          title="Education"
        >
          {aboutData.education.map((edu) => (
            <div key={edu.degree} className="mb-2">
              <h4 className="text-md font-semibold text-primary">
                {edu.degree}
              </h4>
              <p className="text-sm text-text">
                <Link href={`${edu.collegeLink}`} className="hover:underline">{edu.major} - {edu.college} ({edu.year})</Link>
              </p>
            </div>
          ))}
        </InfoCard>

        <InfoCard
          icon={<FaProjectDiagram className="text-2xl text-primary" />}
          title="Projects"
          delay={0.3}
        >
          <div className="flex flex-col space-y-2">
            {projects.map((proj) => (
              <Link
                href={`${proj.liveDemo}`}
                key={proj.name}
                className="flex items-center gap-3 text-sm font-semibold hover:underline"
              >
                {iconMap[proj.icon] || <FaProjectDiagram />} {proj.name}
              </Link>
            ))}
          </div>
        </InfoCard>

        <InfoCard
          icon={<FaBriefcase className="text-2xl text-primary" />}
          title="Experience"
          delay={0.6}
          hiddenOnMobile
        >
          {aboutData.experience.map((exp) => (
            <div key={exp.role} className="mb-2">
              <h4 className="text-md font-semibold text-primary">{exp.role}</h4>
              <p className="text-sm text-text">
                <Link href={`${exp.companyLink}`} className="hover:underline">{exp.company} ({exp.duration})</Link>
              </p>
            </div>
          ))}
        </InfoCard>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="hidden md:flex mt-14 flex-wrap justify-center gap-4"
      >
        {aboutData.skills
          .filter((skill) => skill.top)
          .map((skill, index) => (
            <Link
              key={index}
              href={skill.link}
              className="px-4 py-2 text-sm font-semibold border-2 rounded-full transition-all duration-300 border-text text-primary hover:bg-primary hover:text-black hover:shadow-lg hover:underline"
            >
              {skill.name}
            </Link>
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
          Let&apos;s Connect{" "} <FaEnvelope />
          <span className="absolute top-6 left-0 bottom-0 w-0 h-[2px] bg-hover transition-all duration-500 ease-in-out group-hover:w-full" />
        </a>
      </motion.div>
    </div>
  );
};

export default AboutComponent;
