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
    <section className='relative w-full pt-28 md:pt-36 pb-16 px-6 md:px-10'>
      <div className='mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center'>
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className='space-y-6'
        >
          <span className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/70 bg-panel/40 text-xs uppercase tracking-[0.3em] text-primary'>
            {heroData.title}
          </span>

          <div className='min-h-[5.65rem] md:min-h-[6.5rem] lg:min-h-[8rem]'>
            <h1 className='font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-text'>
              <TypeAnimation
                sequence={animatedTexts}
                wrapper='span'
                speed={12}
                repeat={Infinity}
                className='text-primary'
              />
            </h1>
          </div>

          <p className='text-lg md:text-xl text-muted leading-relaxed max-w-2xl'>
            {heroData.description}
          </p>

          <div className='flex flex-wrap items-center gap-4'>
            <a
              href={heroData.resume}
              target='_blank'
              className='px-6 py-3 rounded-full bg-primary text-ink font-semibold uppercase tracking-wide shadow-glow hover:bg-primaryStrong transition'
            >
              Download CV
            </a>
            <Link
              href='#contact'
              className='px-6 py-3 rounded-full border border-border/80 text-text hover:text-primary hover:border-primary transition uppercase tracking-wide'
            >
              Let&apos;s Talk
            </Link>
            <div className='flex gap-3 text-2xl text-primary'>
              {heroData.socials.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className='group hover:scale-105 transition'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image
                    src={item.icon}
                    alt={item.platform}
                    width={24}
                    height={24}
                    className='icon w-5 h-5 opacity-80 group-hover:opacity-100'
                  />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className='relative flex items-center justify-center'
        >
          <div className='absolute -inset-6 rounded-full bg-primary/10 blur-3xl' />
          <div className='relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-3xl border border-border/70 bg-panel/50 backdrop-blur-xl shadow-card flex items-center justify-center'>
            <Image
              src='/myphoto.jpeg'
              alt='Profile Image'
              width={320}
              height={320}
              className='rounded-2xl border border-border/60'
            />
          </div>
          <div className='absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-panel/70 border border-border/70 text-sm text-muted shadow-card'>
            AI + Full‑Stack • Product‑Driven Engineering
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
