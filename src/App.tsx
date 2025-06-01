import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WorkExperience from './components/WorkExperience/WorkExperience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Blog from './components/Blog';
import BackgroundToggle from './components/BackgroundToggle';
import Certificates from './components/Certificates';
import Education from './components/Education';
import Featured from './components/Featured';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';
import CustomCursor from './components/CustomCursor';

function App() {
  const [viewMode, setViewMode] = useState<'default' | 'ai' | 'dynamic'>('default');
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    document.body.classList.add('dark');
    
    // Initialize Web Audio API
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(context);

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const handleBackgroundToggle = (type: 'default' | 'ai' | 'dynamic') => {
    setViewMode(type);
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-poppins text-white">
      <CustomCursor />
      
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