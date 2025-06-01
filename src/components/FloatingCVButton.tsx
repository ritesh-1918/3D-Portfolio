import { motion } from 'framer-motion';
import { FaFileDownload } from 'react-icons/fa';

const FloatingCVButton = () => {
  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.a
        href="/assets/my-cv.pdf"
        download="Ritesh-Bonthalakoti-CV.pdf"
        className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary bg-opacity-20 text-white hover:bg-opacity-30 transition-all duration-300 shadow-lg shadow-primary/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaFileDownload className="w-5 h-5" />
        <span className="text-lg font-medium">Download CV</span>
      </motion.a>
    </motion.div>
  );
};

export default FloatingCVButton;