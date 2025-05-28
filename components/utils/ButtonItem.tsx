import { motion } from 'framer-motion';
import Link from 'next/link';

const ButtonItem = ({
  href,
  text,
  icon,
  delay,
  variant = 'header',
  activeSection,
}: {
  href: string;
  text: string;
  icon?: React.ReactElement;
  delay: number;
  variant?: 'header' | 'dropdown';
  activeSection?: string;
}) => {
  const isActive = activeSection?.toLowerCase() === href.toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      <Link
        href={href}
        className={`group relative flex items-center gap-2 p-3 transition duration-300 uppercase text-sm md:text-md rounded-lg 
          ${variant === 'dropdown' ? 'hover:bg-gray-200 hover:text-gray-900' : ''}
        `}
      >
        {icon}
        <span className='tracking-widest'>{text}</span>

        {variant === 'header' && (
          <span
            className={`mb-2 absolute left-2 bottom-0 w-0 h-[2px] bg-text transition-all duration-500 ease-in-out
              ${isActive ? 'w-full scale-105' : 'w-0 group-hover:w-full'}
            `}
          />
        )}
      </Link>
    </motion.div>
  );
};

export default ButtonItem;
