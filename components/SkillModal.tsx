import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

interface ProjectsType {
  name: string;
  liveDemo: string;
}

interface ExperienceType {
  company: string;
  role: string;
}

type SkillModalProps = {
  project?: ProjectsType[];
  experience?: ExperienceType[];
  skill: string;
  percentage: number;
  onClose: () => void;
};

const SkillModal = ({
  project,
  experience,
  skill,
  percentage,
  onClose,
}: SkillModalProps) => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-navbar p-6 rounded-lg shadow-xl w-96 border"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-bold text-primary uppercase">{skill}</h2>
          <button
            onClick={onClose}
            className="transform -translate-x-1/2 text-primary text-xl cursor-pointer hover:border hover:border-primary rounded-full bg-opacity-0 transition-border duration-300 hover:bg-primary hover:text-black"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <p className="text-text text-sm">
          <strong className="uppercase text-primary">Proficiency:</strong>{" "}
          {percentage}%
        </p>

        {project && project.length > 0 && (
          <div className="mt-3">
            <p className="text-primary uppercase">Projects:</p>
            <ul className="list-disc list-inside text-text/90">
              {project.map((proj, index) => (
                <li key={index}>{proj.name}</li>
              ))}
            </ul>
          </div>
        )}

        {experience && experience.length > 0 && (
          <div className="mt-3">
            <p className="text-primary uppercase">Experience:</p>
            <ul className="list-disc list-inside text-text/90">
              {experience.map((exp, index) => (
                <li key={index}>{exp.company}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="w-full flex justify-center items-center">
          <button
            onClick={onClose}
            className="mt-3 mx-2 py-3 px-10 border border-primary text-primary rounded-lg hover:bg-primary hover:text-black transition duration-300 ease-in-out uppercase tracking-widest w-fit items-center justify-center"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillModal;
