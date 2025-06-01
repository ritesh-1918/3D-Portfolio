import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WorkExperience from './components/WorkExperience/WorkExperience';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Projects from './components/Projects';
import Featured from './components/Featured';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';

function App() {
  useEffect(() => {
    document.body.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden font-poppins text-white">
      {/* Background Component */}
      <div className="absolute inset-0 z-0">
        <ThreeBackground />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <WorkExperience />
        <Certificates />
        <Projects />
        <Featured />
        <Blog />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;