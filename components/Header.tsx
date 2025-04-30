'use client';

import { User, Code, Briefcase, Mail, LetterText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NavItem from './utils/NavItem';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useActiveSection from '@/hooks/use-active';

const navItems = [
  {
    href: '#about',
    text: 'About',
    icon: <User size={20} />,
    delay: 0.2,
    changable: false,
  },
  {
    href: '#projects',
    text: 'Projects',
    icon: <Code size={20} />,
    delay: 0.3,
    changable: false,
  },
  {
    href: '#skills',
    text: 'Skills',
    icon: <Code size={20} />,
    delay: 0.3,
    changable: false,
  },
  {
    href: '#experience',
    text: 'Experience',
    icon: <Briefcase size={20} />,
    delay: 0.4,
    changable: true,
  },
];

const dropdownItems = [
  {
    href: '#contact',
    text: 'Contact',
    icon: <Mail size={20} />,
    delay: 0.3,
  },
  {
    href: '#resume',
    text: 'Download Resume',
    icon: <LetterText size={20} />,
    delay: 0.3,
  },
];

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.header
      initial={{ transform: 'translateY(-50px)', opacity: 0 }}
      animate={{ transform: 'translateY(0px)', opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='py-4 px-8 fixed top-0 w-full bg-transparent backdrop-blur-md z-50'
    >
      <nav className='mx-auto flex justify-between items-center'>
        <motion.h1
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='text-primary text-lg font-bold tracking-wide uppercase'
        >
          <a href='#hero'>MOHANTEJA</a>
        </motion.h1>

        <div className='flex justify-between items-center space-x-6'>
          {navItems.map((item, index) => (
            <div
              key={index}
              className={`
                    items-center text-text h-12 hidden
                    ${item.changable ? 'lg:flex' : 'md:flex'}
                  `}
            >
              <NavItem
                href={item.href}
                text={item.text}
                icon={item.icon}
                delay={item.delay}
                variant='header'
                activeSection={activeSection}
              />
            </div>
          ))}

          <div className='relative' ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className='flex items-center focus:outline-none'
            >
              <Image
                src='/myphoto.jpeg'
                alt='Profile'
                width={40}
                height={40}
                className='rounded-full border border-gray-300'
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className='p-2 absolute right-0 mt-3 w-60 lg:w-68 bg-navbar shadow-lg rounded-lg overflow-hidden space-y-2'
                >
                  {navItems.map((item, index) => (
                    <div
                      key={index}
                      className={`
                          items-center text-text h-12 
                          ${item.changable ? 'lg:hidden' : 'md:hidden'}
                        `}
                    >
                      <NavItem
                        href={item.href}
                        text={item.text}
                        icon={item.icon}
                        delay={item.delay}
                        variant='dropdown'
                        activeSection={activeSection}
                      />
                    </div>
                  ))}

                  {dropdownItems.map((item, index) => (
                    <NavItem
                      key={`dropdown-${index}`}
                      href={item.href}
                      text={item.text}
                      icon={item.icon}
                      delay={item.delay}
                      variant='dropdown'
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
