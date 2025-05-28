import { motion } from 'framer-motion';

type Props = {
    icon: string;
    name: string;
    percentage: number;
    onClick: () => void;
};

const Skill = ({ icon, name, percentage, onClick }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className='group relative flex cursor-pointer'
      onClick={onClick}
      title={name}
    >
      <motion.img
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        src={icon}
        alt={name}
        className='rounded-full border border-primary object-fit w-16 h-16 md:w-20 md:h-20 filter group-hover:grayscale transition-all ease-in-out shadow-lg hover:shadow-primary/50 duration-300 group-hover:scale-110 bg-white'
        whileHover={{ scale: 1.1 }}
      />
      <div className='absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white w-16 h-16 z-0 rounded-full'>
        <div className='flex items-center justify-center h-full'>
          <p className='text-md sm:text-xl font-bold text-black opacity-100'>
            {percentage}%
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Skill;
