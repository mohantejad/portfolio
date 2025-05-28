'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import ParallaxTilt from 'react-parallax-tilt';
import {
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
} from 'react-icons/fa';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { ProjectType } from '@/types/ProjectType';


interface ProjectProps {
  projectData: ProjectType[]
}

const ProjectsComponent: React.FC<ProjectProps> = ({ projectData }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  if (!projectData || projectData.length === 0) {
    return <p className='text-center'>No projects found.</p>;
  }


  const nextProject = () => {
    if (currentIndex < projectData.length - 1) {
      setDirection(1);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevProject = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };


  return (
    <div className='flex flex-col items-center justify-center space-y-10 md:space-y-12 mt-12 md:mt-8'>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
        className='text-xl md:text-2xl uppercase font-bold text-primary text-center'
      >
        Projects that helped me to learn in demanding skills
      </motion.h1>

      <div className='relative flex items-center w-full max-w-5xl justify-center px-4 md:px-0'>
        <button
          onClick={prevProject}
          disabled={currentIndex === 0}
          title='Previous Project'
          className={`absolute left-4 md:left-0 p-2 backdrop-blur-md rounded-full hover:bg-primary z-10 text-white hover:text-black transform -translate-x-1/2 text-xl cursor-pointer hover:border hover:border-primary bg-opacity-0 transition-border duration-300 ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <FaChevronLeft className='text-xl' />
        </button>
        <AnimatePresence mode='wait' custom={direction}>
          <motion.div
            key={currentIndex}
            initial='enter'
            animate='center'
            exit='exit'
            className='w-[80vw] flex justify-center h-[40vh]'
          >
            <ParallaxTilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              scale={1.03}
              transitionSpeed={200}
              className='w-[90%] sm:w-3/4 md:w-2/3 lg:w-1/2 backdrop-blur-sm rounded-3xl p-8 border border-primary shadow-lg hover:shadow-primary/50 transition-shadow duration-300 flex flex-col items-center justify-between'
            >
              <Link
                href={`${projectData[currentIndex]?.liveDemo || '#'}`}
                className='group relative inline-block w-full mx-auto'
              >
                <h2 className='text-xl font-semibold text-primary mb-2 text-center cursor-pointer relative inline-block w-full'>
                  <span className='relative group'>
                    {projectData[currentIndex]?.name}
                    <span className='absolute top-6 left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 ease-in-out group-hover:w-full' />
                  </span>
                </h2>
              </Link>
              <div className='flex items-center justify-center text-center'>
                <PortableText value={projectData[currentIndex]?.description} />
              </div>
              <div className='flex flex-wrap justify-center gap-2 mt-4'>
                {projectData[currentIndex]?.tech.map((tech, index) => (
                  <Link
                    key={index}
                    href={`${tech?.link || '#'}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='px-3 py-1 text-sm bg-primary text-navbar rounded-full hover:underline'
                  >
                    {tech.name}
                  </Link>
                ))}
              </div>
              <div className='flex justify-center gap-6 mt-6'>
                <Link
                  href={`${projectData[currentIndex]?.liveDemo || '#'}`}
                  className='inline-block px-4 py-2 bg-green-600 text-primary rounded-full hover:bg-green-700 transition uppercase'
                >
                  Live Demo
                </Link>
                <Link
                  href={`${projectData[currentIndex]?.viewCode || '#'}`}
                  className='inline-block px-4 py-2  text-primary rounded-full hover:bg-primary hover:text-black border border-primary transition uppercase'
                >
                  View Code
                </Link>
              </div>
            </ParallaxTilt>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={nextProject}
          disabled={currentIndex === projectData.length - 1}
          title='Next Project'
          className={`absolute -right-6 md:-right-10 p-2 backdrop-blur-md rounded-full hover:bg-primary z-10 text-white hover:text-black transform -translate-x-1/2 text-xl cursor-pointer hover:border hover:border-primary bg-opacity-0 transition-border duration-300 ${
            currentIndex === projectData.length - 1
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          <FaChevronRight className='text-xl' />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.9 }}
        className='mt-20 md:mt-28 lg:mt-28 pt-6 md:pt-10 text-center flex flex-wrap items-center justify-center gap-4'
      >
        <h2 className='text-xl md:text-2xl font-bold text-text whitespace-nowrap'>
          Let&apos;s make your Dream to Reality together
        </h2>

        <a
          href='#contact'
          className='relative inline-flex items-center gap-2 text-lg font-bold text-primary border-b-2 border-primary transition-all duration-300 hover:text-hover hover:border-hover group whitespace-nowrap'
        >
          Let&apos;s Connect{' '}
          <FaEnvelope className='text-xl transition-all duration-300 group-hover:text-hover' />
          <span className='absolute top-6 left-0 bottom-0 w-0 h-[2px] bg-hover transition-all duration-500 ease-in-out group-hover:w-full' />
        </a>
      </motion.div>
    </div>
  );
};

export default ProjectsComponent;
