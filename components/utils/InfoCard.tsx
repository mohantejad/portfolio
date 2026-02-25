import { motion } from 'framer-motion';
import { ReactElement, ReactNode } from 'react';

interface InfoCardProps {
  icon: ReactElement;
  title: string;
  children: ReactNode;
  delay?: number;
  hiddenOnMobile?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  children,
  delay = 0,
  hiddenOnMobile = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay }}
      className={`p-6 border border-border/70 rounded-2xl text-left bg-panel/40 backdrop-blur-sm shadow-card ${hiddenOnMobile ? 'hidden md:block' : ''}`}
    >
      <div className='flex items-center space-x-4'>
        {icon}
        <h3 className='text-lg font-bold uppercase tracking-widest text-text'>{title}</h3>
      </div>
      <div className='mt-3 mb-4 border-t border-border/70 w-full' />
      <div className='text-left'>{children}</div>
    </motion.div>
  );
};

export default InfoCard;
