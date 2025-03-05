"use client";

import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ExperienceType } from "@/types";

interface ExperinceProps {
  experienceData: ExperienceType[];
}


const Experience: React.FC<ExperinceProps> = ({ experienceData }) => {
  
  const groupedExperiences = experienceData.reduce(
    (acc, exp) => {
      const formatDate = (dateString: string | null) =>
        dateString
          ? new Date(dateString).toLocaleString("en-US", { month: "short", year: "numeric" })
          : "Present";
  
      const period = `${formatDate(exp.fromDate)} - ${formatDate(exp.toDate)}`;
      
      if (!acc[period]) acc[period] = [];
      acc[period].push(exp);
      
      return acc;
    },
    {} as Record<string, ExperienceType[]>
  );  

  return (
    <div className="relative h-screen flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="text-xl md:text-2xl uppercase font-bold text-primary text-center"
      >
        Industry Standard Experience with Amazing and Extrordinary Organizations
      </motion.h1>

      <TabGroup className="mt-12">
        <TabList className="flex w-full space-x-4 items-center justify-center">
          {Object.keys(groupedExperiences).map((period) => (
            <Tab
              key={period}
              className={({ selected }) =>
                `px-4 py-2 text-md font-bold rounded-lg focus:outline-none transition-all border border-primary ${
                  selected
                    ? "bg-primary text-navbar"
                    : "text-primary hover:scale-105 hover:opacity-9 hover:bg-primary/80 hover:text-navbar"
                }`
              }
            >
              {period}
            </Tab>
          ))}
        </TabList>

        <TabPanels className="mt-8 w-full px-6 md:px-0 flex items-center justify-center">
          {Object.keys(groupedExperiences).map((period) => (
            <TabPanel
              key={`${period}`}
              className="w-full items-center justify-center flex"
            >
              {groupedExperiences[period].map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-8 shadow-lg rounded-lg border border-primary hover:shadow-xl transition-shadow backdrop-blur-sm"
                >
                  <motion.img
                    src={exp.image}
                    alt={exp.title}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: [0, -20, 0], opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hidden sm:block w-32 h-32 object-contain mx-auto mb-2"
                  />
                  <h2 className="text-lg font-semibold text-primary">
                    {exp.title}
                  </h2>
                  <p className="text-sm font-medium text-text italic">
                    {exp.company}
                  </p>
                  <p className="text-xs text-text mb-2">
                    {exp.fromDate} - {exp.toDate}
                  </p>
                  <ul className="list-disc list-inside text-sm text-primary">
                    {exp.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  <div className="mt-3 text-center">
                    <div className="flex flex-wrap justify-center gap-2 mt-1">
                      {exp.skillsUsed.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs font-medium text-navbar bg-primary rounded-lg"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>

      <motion.button
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-primary text-xl cursor-pointer p-1 hover:border hover:border-primary rounded-full bg-opacity-0 transition-border duration-300 hover:bg-primary hover:text-black"
        onClick={() => {
          const nextSection = document.getElementById("contact");
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

export default Experience;
