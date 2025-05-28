'use client';

import { User, Code, Briefcase, Mail, LetterText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NavItem from './utils/NavItem';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { href: '/about', text: 'About', icon: <User size={20} />, delay: 0.2, changable: false },
  { href: '/projects', text: 'Projects', icon: <Code size={20} />, delay: 0.3, changable: false },
  { href: '/skills', text: 'Skills', icon: <Code size={20} />, delay: 0.3, changable: false },
  { href: '/experience', text: 'Experience', icon: <Briefcase size={20} />, delay: 0.4, changable: true },
];

const dropdownItems = [
  { href: '/contact', text: 'Contact', icon: <Mail size={20} />, delay: 0.3 },
  {
    href: '/Mohanteja_Resume.pdf',
    text: 'Download Resume',
    icon: <LetterText size={20} />,
    delay: 0.3,
    target: '_blank',
  },
];

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderNavItems = (
    items: typeof navItems | typeof dropdownItems,
    variant: 'header' | 'dropdown',
    isDropdown = false
  ) =>
    items.map((item) => {

      if (!isDropdown && 'changable' in item) {
        const visibilityClass = item.changable ? 'lg:flex' : 'md:flex';
        return (
          <div key={item.href} className={`items-center text-text h-12 hidden ${visibilityClass}`}>
            <NavItem
              href={item.href}
              text={item.text}
              icon={item.icon}
              delay={item.delay}
              variant={variant}
              pathname={pathname}
            />
          </div>
        );
      }


      if (isDropdown && 'changable' in item) {

        const visibilityClass = item.changable ? 'lg:hidden' : 'md:hidden';
        return (
          <div key={item.href} className={`items-center text-text h-12 ${visibilityClass}`}>
            <NavItem
              href={item.href}
              text={item.text}
              icon={item.icon}
              delay={item.delay}
              variant={variant}
              pathname={pathname}
            />
          </div>
        );
      }


      return (
        <NavItem
          key={item.href}
          href={item.href}
          text={item.text}
          icon={item.icon}
          delay={item.delay}
          variant={variant}
        />
      );
    });

  return (
    <motion.header
      initial={{ transform: 'translateY(-50px)', opacity: 0 }}
      animate={{ transform: 'translateY(0px)', opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md py-8 px-12'
    >
      <nav className='mx-auto flex justify-between items-center'>
        <motion.h1
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='text-primary text-lg font-bold tracking-wider uppercase'
        >
          <Link href='/'>MOHANTEJA</Link>
        </motion.h1>

        <div className='flex items-center space-x-6'>

          {renderNavItems(navItems, 'header')}

          <div className='relative' ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className='flex items-center focus:outline-none'
              aria-label='Toggle menu'
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
                  className='absolute right-0 mt-3 w-60 lg:w-68 rounded-lg bg-navbar p-2 shadow-lg space-y-2 overflow-hidden'
                >

                  {renderNavItems(navItems, 'dropdown', true)}

                  {renderNavItems(dropdownItems, 'dropdown', true)}
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
