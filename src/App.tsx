import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WorkExperience from './components/WorkExperience/WorkExperience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Featured from './components/Featured';
import Blog from './components/Blog';
import Contact from './components/Contact';
import BackgroundToggle from './components/BackgroundToggle';
import DownloadCV from './components/DownloadCV';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';
import DynamicGradient from './components/DynamicGradient';

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
        {viewMode === 'default' && <ThreeBackground />}
        {viewMode === 'ai' && <DynamicGradient />}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <WorkExperience />
        <Projects />
        <Featured />
        <Blog />
        <Contact />
        <BackgroundToggle onToggle={handleBackgroundToggle} currentType={viewMode} />
        <DownloadCV />
        <Footer />
      </div>
    </div>
  );
}

export default App;