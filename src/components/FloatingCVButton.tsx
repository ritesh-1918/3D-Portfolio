import { motion } from 'framer-motion';
import { FaFileDownload, FaEye } from 'react-icons/fa';
import { useState } from 'react';

const FloatingCVButton = () => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="flex gap-2">
          <motion.button
            onClick={() => setShowPreview(true)}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-primary bg-opacity-20 text-white hover:bg-opacity-30 transition-all duration-300 shadow-lg shadow-primary/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEye className="w-5 h-5" />
            <span className="text-lg font-medium">Preview CV</span>
          </motion.button>

          <motion.a
            href="/assets/my-cv.pdf"
            download="Ritesh-Bonthalakoti-CV.pdf"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-primary bg-opacity-20 text-white hover:bg-opacity-30 transition-all duration-300 shadow-lg shadow-primary/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFileDownload className="w-5 h-5" />
            <span className="text-lg font-medium">Download</span>
          </motion.a>
        </div>
      </motion.div>

      {/* CV Preview Modal */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowPreview(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <iframe
              src="/assets/my-cv.pdf"
              className="w-full h-full"
              title="CV Preview"
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default FloatingCVButton;