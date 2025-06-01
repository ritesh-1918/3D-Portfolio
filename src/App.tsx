import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WorkExperience from './components/WorkExperience/WorkExperience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import DynamicGradient from './components/DynamicGradient';
// import GlobalThreeBackground from './components/GlobalThreeBackground';
import Blog from './components/Blog';
import BackgroundToggle from './components/BackgroundToggle';
import Certificates from './components/Certificates';
import Education from './components/Education';
import Featured from './components/Featured';
import Footer from './components/Footer';


function App() {
  const [viewMode, setViewMode] = useState<'default' | 'ai' | 'dynamic'>('default');

  useEffect(() => {
    document.body.classList.add('dark');
  }, []);

  const handleBackgroundToggle = (type: 'default' | 'ai' | 'dynamic') => {
    setViewMode(type);
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-poppins text-white">
      {/* Background Component */}
      <div className="absolute inset-0 z-0">
        {viewMode === 'default' && <div className="w-full h-full bg-background" />}
        {viewMode === 'ai' && <DynamicGradient />}
        {/* {viewMode === 'dynamic' && <GlobalThreeBackground />} */}
      </div>

      {/* Main Content */}
      <div className={`relative z-10`}> {/* Removed viewMode conditional class */}
          
          <Navbar />
          
          <Hero />
          <About />
          <WorkExperience />
          <Projects />
          <Contact />
          <Blog />
          <Certificates />
          <Education />
          <Featured />
          <BackgroundToggle onToggle={handleBackgroundToggle} currentType={viewMode} />
          <Footer />
        </div>
      </div>
  );
}

export default App;
