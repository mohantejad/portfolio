import { motion } from "framer-motion";
import Link from "next/link";

const NavItem = ({
  href,
  text,
  icon,
  delay,
  hide,
  variant = "header",
  activeSection,
}: {
  href: string;
  text: string;
  icon?: React.ReactElement;
  delay?: number;
  hide?: boolean;
  variant?: "header" | "dropdown";
  activeSection?: string;
}) => {
  const isActive = activeSection?.toLowerCase() === href.toLowerCase();

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
      className={`
        ${hide && variant === 'header' ? 'hidden lg:block': ''}
         ${hide && variant === 'dropdown' ? 'hidden lg:block': ''}
      `}
    >
      <Link
        href={href}
        className={`group relative flex items-center gap-2 p-3 transition duration-300 uppercase text-sm md:text-md rounded-lg 
          ${
            variant === "dropdown"
              ? "hover:bg-gray-200 hover:text-gray-900"
              : ""
          }
          ${isActive ? "scale-105 font-bold" : ""}
          
        `}
      >
        {icon}
        <span className="tracking-widest">{text}</span>

        {variant === "header" && (
          <span
            className={`absolute left-2 bottom-0 w-0 h-[2px] bg-text transition-all duration-500 ease-in-out
              ${isActive ? "w-full scale-105" : "w-0 group-hover:w-full"}
            `}
          />
        )}
      </Link>
    </motion.div>
  );
};

export default NavItem;
