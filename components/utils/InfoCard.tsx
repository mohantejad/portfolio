// components/InfoCard.tsx
import { motion } from "framer-motion";
import { ReactElement, ReactNode } from "react";

interface InfoCardProps {
  icon: ReactElement;
  title: string;
  children: ReactNode;
  delay?: number;
  hiddenOnMobile?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, children, delay = 0, hiddenOnMobile = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay }}
      className={`p-4 border border-primary rounded-lg text-center ${hiddenOnMobile ? "hidden md:block" : ""}`}
    >
      <div className="flex items-center space-x-4">
        {icon}
        <h3 className="text-xl font-bold uppercase">{title}</h3>
      </div>
      <div className="mt-2 mb-2 border-t-2 border-primary w-full" />
      <div className="mt-2 text-left">{children}</div>
    </motion.div>
  );
};

export default InfoCard;
