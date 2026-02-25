import { motion } from 'framer-motion';
import Link from 'next/link';

const NavItem = ({
  href,
  text,
  icon,
  delay,
  hide,
  variant = 'header',
  pathname,
  target
}: {
  href: string;
  text: string;
  icon?: React.ReactElement;
  delay?: number;
  hide?: boolean;
  variant?: 'header' | 'dropdown';
  pathname?: string;
  target?: '_blank' | '_self'
}) => {
  const isPathName = pathname?.toLowerCase() === href.toLowerCase();

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
      className={`
        ${hide && variant === 'header' ? 'hidden lg:block' : ''}
         ${hide && variant === 'dropdown' ? 'hidden lg:block' : ''}
      `}
    >
      <Link
        href={href}
        target={target}
        className={`group relative flex items-center gap-2 px-4 py-2 transition duration-300 uppercase text-xs md:text-sm rounded-full 
          ${
            variant === 'dropdown'
              ? `${isPathName ? 'bg-primary text-ink' : 'hover:bg-primary/20 hover:text-primary'}`
              : `${isPathName ? 'text-primary bg-primary/10 shadow-glow' : 'text-text hover:text-primary'}`
          }
        `}
      >
        {icon}
        <span className='tracking-widest'>{text}</span>

        {variant === 'header' && (
          <span
            className={`absolute left-4 bottom-0 w-0 h-[2px] bg-primary transition-all duration-500 ease-in-out
              ${isPathName ? 'w-[calc(100%-2rem)] scale-105' : 'w-0 group-hover:w-[calc(100%-2rem)]'}
            `}
          />
        )}
      </Link>
    </motion.div>
  );
};

export default NavItem;
