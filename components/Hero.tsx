"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { HeroType } from "@/types/HeroType";

interface HeroProps {
  heroData: HeroType;
}

const Hero: React.FC<HeroProps> = ({ heroData }) => {
  const stats = useMemo(() => heroData?.stats || [], [heroData.stats]);
  const [animatedStats, setAnimatedStats] = useState<number[]>([]);
  const animatedTexts = useMemo(
    () => heroData.typographs.flatMap((text) => [text, 2000]),
    [heroData.typographs]
  );
  
  useEffect(() => {
    if (stats.length === 0) return;
    setAnimatedStats(stats.map(() => 0));
    const intervals: NodeJS.Timeout[] = [];
    stats.forEach((stat, index) => {
      let count = 0;
      const increment = Math.ceil(stat.value / 100);
      const interval = setInterval(() => {
        count += increment;
        if (count >= stat.value) {
          count = stat.value;
          clearInterval(interval);
        }
        setAnimatedStats((prev) => {
          const newStats = [...prev];
          newStats[index] = count;
          return newStats;
        });
      }, 20);
      intervals.push(interval);
    });
    return () => {
      intervals.forEach(clearInterval);
    };
  }, [stats]);

  return (
    <div id="hero" className="relative">
      <div className="relative flex flex-col-reverse md:flex-row items-center md:justify-evenly justify-center h-screen px-6 md:px-16 text-text -space-y-12 gap-12 md:gap-0 md:space-y-0 -top-20 sm:-top-12">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-left max-w-lg"
        >
          <p className="text-text text-lg font-bold uppercase tracking-widest">
            {heroData.title}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-2 md:min-h-[120px] sm:min-h-[0px] min-h-[90px]">
            <TypeAnimation
              sequence={animatedTexts}
              wrapper="span"
              speed={10}
              repeat={Infinity}
              className="text-primary"
            />
          </h1>
          <p className="text-gray-300 text-lg mt-4">{heroData.description}</p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="mt-6 flex items-center gap-4"
          >
            <a
              href={heroData.resume}
              target="_blank"
              className="p-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-black transition duration-300 ease-in-out uppercase tracking-wide"
            >
              Download CV
            </a>
            <div className="flex gap-3 text-2xl text-primary">
              {heroData.socials.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="relative group hover:scale-104 hover:opacity-90"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={item.icon}
                    alt={item.platform}
                    width={32}
                    height={32}
                    className="icon w-6 h-6"
                  />
                  <span className="absolute left-0 bottom-0 top-8 w-0 h-[2px] bg-primary transition-all duration-500 ease-in-out group-hover:w-full" />
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="hidden md:block relative w-48 h-48 md:w-36 md:h-36 lg:w-80 lg:h-80 md:mt-0"
        >
          <div className="absolute inset-0 rounded-full border-4 border-primary animate-spin-slow"></div>
          <Image
            src="/myphoto.jpeg"
            alt="Profile Image"
            width={350}
            height={350}
            className="rounded-full border-4 border-[#0f0f0f]"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute bottom-44 sm:bottom-44 md:bottom-40 left-1/2 transform -translate-x-1/2 flex gap-8 text-center"
      >
        {heroData.stats.map((stat, index) => (
          <div key={index}>
            <h2 className="text-3xl font-bold text-text">
              {animatedStats[index]}
            </h2>
            <p className="text-primary text-sm lg:text-md">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      <div className="absolute bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2 flex gap-8 text-center text-md">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[16px] md:text-lg font-medium"
        >
          <span className="text-text">If there is job opening with requirement of my skillset? </span>
          <a
            href="#contact"
            className="relative group font-bold uppercase whitespace-nowrap text-primary mt-4 border-b-2 border-primary transition-all duration-300 hover:text-hover hover:border-hover group"
          >
            Hire Me!
            <span className="absolute top-6 left-0 bottom-0 w-0 h-[2px] bg-hover transition-all duration-500 ease-in-out group-hover:w-full" />
          </a>
        </motion.p>
      </div>

      <motion.button
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-primary text-xl cursor-pointer p-1 hover:border hover:border-primary rounded-full bg-opacity-0 transition-border duration-300 hover:bg-primary hover:text-black"
        onClick={() => {
          const nextSection = document.getElementById("about");
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

export default Hero;
