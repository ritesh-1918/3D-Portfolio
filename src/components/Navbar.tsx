import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassMorphism from '../components/GlassMorphism';
import { GlassOptions } from '../components/GlassMorphism.types';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'featured', label: 'Featured' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Determine active section based on scroll position
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      })).filter(section => section.element);

      if (sectionElements.length) {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        let currentSection = '';
        
        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const section = sectionElements[i];
          if (section.element) {
            const offsetTop = section.element.offsetTop;
            
            if (scrollPosition >= offsetTop) {
              currentSection = section.id;
              break;
            }
          }
        }
        
        if (activeSection !== currentSection) {
          setActiveSection(currentSection);
        }
      }
    };

    // Call once on mount to set initial active section
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, activeSection, sections]);

  return (
    <>
      {/* Top navigation - only visible when in home section (not scrolled) */}
      {!scrolled && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 w-full z-50 py-5"
        >
          <div className="container mx-auto px-4 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-white"
            >
              <span className="text-primary">Ritesh</span>
            </motion.div>

            {/* Desktop navigation */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden md:block"
            >
              <ul className="flex space-x-8">
                {sections.map((item) => (
                  <li key={item.id}>
                    <motion.a 
                      href={`#${item.id}`} 
                      className={`relative text-white navbar-link py-2 hover:text-primary transition-colors ${
                        activeSection === item.id ? 'text-primary' : ''
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>{item.label}</span>
                      {activeSection === item.id && (
                        <motion.span
                          className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary w-full"
                          layoutId="activeSection"
                        />
                      )}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.nav>

            {/* Mobile menu button - only visible in home section */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white focus:outline-none"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </motion.header>
      )}

      {/* Scrolled navbar with glass effect */}
      {scrolled && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full z-50 py-3"
        >
          <GlassMorphism 
            intensity={12}
            borderRadius="0"
            depth={2}
            className="w-full"
          >
            <div className="container mx-auto px-4 flex justify-between items-center py-2">
              <a href="#home" className="text-2xl font-bold gradient-text">Ritesh</a>
              
              {/* Desktop navigation */}
              <nav className="hidden md:block">
                <ul className="flex space-x-8">
                  {sections.map((item) => (
                    <li key={item.id}>
                      <motion.a 
                        href={`#${item.id}`} 
                        className={`relative text-white navbar-link py-2 ${
                          activeSection === item.id ? 'text-primary' : ''
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>{item.label}</span>
                        <motion.span
                          className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary ${
                            activeSection === item.id ? 'w-full' : 'w-0'
                          }`}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white focus:outline-none"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </GlassMorphism>
        </motion.header>
      )}

      {/* Side navigation dots - only visible when scrolled */}
      {scrolled && (
        <motion.div 
          className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center space-y-4">
            {sections.map((section) => (
              <motion.div
                key={section.id}
                className="relative group"
                whileHover={{ scale: 1.2 }}
              >
                <a 
                  href={`#${section.id}`}
                  className="block"
                >
                  <motion.div 
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeSection === section.id 
                        ? 'bg-primary scale-125' 
                        : 'bg-white bg-opacity-30 hover:bg-opacity-50'
                    }`}
                    animate={activeSection === section.id ? {
                      boxShadow: ['0 0 0px rgba(0, 255, 136, 0.5)', '0 0 8px rgba(0, 255, 136, 0.8)', '0 0 0px rgba(0, 255, 136, 0.5)']
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </a>
                <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  <span className="px-2 py-1 bg-background rounded text-sm text-primary">{section.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Mobile navigation - only shown when menu is open */}
      <div className={`md:hidden fixed inset-0 bg-background bg-opacity-95 z-50 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end p-4">
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="text-white focus:outline-none"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col items-center space-y-6 p-8">
          {sections.map((section) => (
            <li key={section.id}>
              <a 
                href={`#${section.id}`} 
                className={`text-2xl navbar-link ${
                  activeSection === section.id ? 'text-primary' : 'text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-64 bg-background overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="mb-8 text-white hover:text-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <nav>
                  <ul className="space-y-4">
                    {sections.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block py-2 text-lg ${activeSection === item.id ? 'text-primary' : 'text-white hover:text-primary'} transition-colors`}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;