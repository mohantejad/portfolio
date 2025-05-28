'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { useMemo } from 'react';
import { HeroType } from '@/types/HeroType';

interface HeroProps {
  heroData: HeroType;
}

const Hero: React.FC<HeroProps> = ({ heroData }) => {
  const animatedTexts = useMemo(
    () => heroData.typographs.flatMap((text) => [text, 2000]),
    [heroData.typographs]
  );

  return (
    <div className='flex flex-col items-center'>
      <div className='flex items-center justify-evenly text-text w-screen mt-8 px-6 md:px-0'>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className='text-left max-w-lg'
        >
          <p className='text-text text-lg font-bold uppercase tracking-widest'>
            {heroData.title}
          </p>

          <h1 className='hidden md:block text-3xl md:text-5xl font-bold leading-tight md:min-h-[100px] my-2'>
            <TypeAnimation
              sequence={animatedTexts}
              wrapper='span'
              speed={10}
              repeat={Infinity}
              className='text-primary'
            />
          </h1>

          <p className='mt-4 md:mt-0text-gray-300 text-lg text-justify'>
            {heroData.description}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className='flex items-center gap-6 my-6'
          >
            <a
              href={heroData.resume}
              target='_blank'
              className='p-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-black transition duration-300 ease-in-out uppercase tracking-wide'
            >
              Download CV
            </a>
            <div className='flex gap-3 text-2xl text-primary'>
              {heroData.socials.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className='relative group hover:scale-104 hover:opacity-90'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image
                    src={item.icon}
                    alt={item.platform}
                    width={32}
                    height={32}
                    className='icon w-6 h-6'
                  />
                  <span className='absolute left-0 bottom-0 top-8 w-0 h-[2px] bg-primary transition-all duration-500 ease-in-out group-hover:w-full' />
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className='hidden md:block relative w-36 h-36 lg:w-80 lg:h-80'
        >
          <div className='absolute inset-0 rounded-full lg:rounded-lg border-4 border-primary animate-spin-slow'></div>
          <Image
            src='/myphoto.jpeg'
            alt='Profile Image'
            width={350}
            height={350}
            className='rounded-full lg:rounded-lg border-4 border-[#0f0f0f]'
          />
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='text-[16px] text-xl md:text-2xl font-medium whitespace-nowrap mt-4 md:mt-8'
      >
        <span className='text-text hidden md:inline'>
          If there is job opening with requirement of my skillset?{' '}
        </span>
        <Link
          href='#contact'
          className='relative group font-bold uppercase text-primary border-b-2 border-primary transition-all duration-300 hover:text-hover hover:border-hover'
        >
          {" "}Hire Me!
          <span className='absolute left-0 bottom-0 top-6 w-0 h-[2px] bg-hover transition-all duration-500 ease-in-out group-hover:w-full' />
        </Link>
      </motion.p>
    </div>
  );
};

export default Hero;
