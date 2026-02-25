"use client";

import { AboutType } from "@/types/AboutType";
import { motion, LazyMotion, domAnimation } from "framer-motion";
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
    <section className="text-text flex flex-col items-center justify-center px-6 pb-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="text-xl md:text-3xl uppercase font-bold text-primary text-center mt-28 md:mt-28 lg:mt-16 font-display tracking-[0.25em]"
      >
        Building Intelligent, Human‑Centered Products
      </motion.h1>

      <div className="mt-10 grid gap-6 md:grid-cols-3 max-w-6xl w-full">
        <InfoCard
          icon={<FaGraduationCap className="text-2xl text-primary" />}
          title="Education"
        >
          {aboutData.education.map((edu, index) => (
            <div key={`${edu.degree}-${edu.college}-${index}`} className="mb-2">
              <h4 className="text-md font-semibold text-primary">
                {edu.degree}
              </h4>
              <p className="text-sm text-muted">
                {edu.collegeLink ? (
                  <Link href={`${edu.collegeLink}`} className="hover:underline">
                    {edu.major} - {edu.college} ({edu.year})
                  </Link>
                ) : (
                  <span>
                    {edu.major} - {edu.college} ({edu.year})
                  </span>
                )}
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
            {projects.map((proj, index) =>
              proj.liveDemo ? (
                <Link
                  href={`${proj.liveDemo}`}
                  key={`${proj.name}-${index}`}
                  className="flex items-center gap-3 text-sm font-semibold hover:text-primary transition"
                >
                  {iconMap[proj.icon] || <FaProjectDiagram />} {proj.name}
                </Link>
              ) : (
                <div
                  key={`${proj.name}-${index}`}
                  className="flex items-center gap-3 text-sm font-semibold text-muted"
                >
                  {iconMap[proj.icon] || <FaProjectDiagram />} {proj.name}
                </div>
              )
            )}
          </div>
        </InfoCard>

        <InfoCard
          icon={<FaBriefcase className="text-2xl text-primary" />}
          title="Experience"
          delay={0.6}
          hiddenOnMobile
        >
          {aboutData.experience.map((exp, index) => (
            <div key={`${exp.role}-${exp.company}-${index}`} className="mb-2">
              <h4 className="text-md font-semibold text-primary">{exp.role}</h4>
              <p className="text-sm text-muted">
                {exp.companyLink ? (
                  <Link href={`${exp.companyLink}`} className="hover:underline">
                    {exp.company} ({exp.duration})
                  </Link>
                ) : (
                  <span>
                    {exp.company} ({exp.duration})
                  </span>
                )}
              </p>
            </div>
          ))}
        </InfoCard>
      </div>

      <LazyMotion features={domAnimation}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="hidden md:flex mt-14 flex-wrap justify-center gap-4"
        >
          {aboutData.skills
            .filter((skill) => skill.top)
            .map((skill, index) => (
              skill.link ? (
                <Link
                  key={index}
                  href={skill.link}
                  className="px-4 py-2 text-sm font-semibold border rounded-full transition-all duration-300 border-border text-text hover:bg-primary/10 hover:text-primary hover:border-primary"
                >
                  {skill.name}
                </Link>
              ) : (
                <span
                  key={index}
                  className="px-4 py-2 text-sm font-semibold border rounded-full border-border text-muted"
                >
                  {skill.name}
                </span>
              )
            ))}
        </motion.div>
      </LazyMotion>

      <LazyMotion features={domAnimation}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12 md:mt-16 lg-mt-20 text-center flex flex-wrap items-center justify-center gap-4"
        >
          <h2 className="text-xl md:text-2xl font-bold text-text whitespace-nowrap">
            Want to collaborate on an AI product?
          </h2>

          <Link
            href="#contact"
            className="relative inline-flex items-center gap-2 text-lg font-bold text-primary border-b-2 border-primary transition-all duration-300 hover:text-hover hover:border-hover group whitespace-nowrap"
          >
            Let&apos;s Connect <FaEnvelope />
            <span className="absolute top-6 left-0 bottom-0 w-0 h-[2px] bg-hover transition-all duration-500 ease-in-out group-hover:w-full" />
          </Link>
        </motion.div>
      </LazyMotion>
    </section>
  );
};

export default AboutComponent;
