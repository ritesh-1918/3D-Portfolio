import { motion } from 'framer-motion';
import { useGlassMorphism } from '../context/GlassMorphismProvider';
import { useState } from 'react';
import { FaCode, FaTools, FaBrain } from 'react-icons/fa';
import { SiArduino, SiRaspberrypi, SiPython, SiReact, SiNodedotjs, SiTailwindcss, SiGithub, SiFigma, SiVisualstudiocode, SiPostman } from 'react-icons/si';
import { GiCircuitry, GiProcessor } from 'react-icons/gi';

interface Skill {
  name: string;
  level: number;
  icon: JSX.Element;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: JSX.Element;
  skills: Skill[];
}

const Skills = () => {
  const { applyGlass } = useGlassMorphism();
  const [activeCategory, setActiveCategory] = useState('Software Skills');
  const [activeSection, setActiveSection] = useState('Technical');

  const skillCategories: SkillCategory[] = [
    {
      title: 'Technical',
      icon: <FaCode className="w-6 h-6" />,
      skills: {
        'Software Skills': [
          { name: 'Python', level: 85, icon: <SiPython />, color: '#3776AB' },
          { name: 'React', level: 80, icon: <SiReact />, color: '#61DAFB' },
          { name: 'Node.js', level: 78, icon: <SiNodedotjs />, color: '#339933' },
          { name: 'TypeScript', level: 75, icon: <SiNodedotjs />, color: '#3178C6' },
          { name: 'Tailwind CSS', level: 88, icon: <SiTailwindcss />, color: '#06B6D4' }
        ],
        'Hardware Skills': [
          { name: 'Arduino', level: 92, icon: <SiArduino />, color: '#00979D' },
          { name: 'Raspberry Pi', level: 88, icon: <SiRaspberrypi />, color: '#C51A4A' },
          { name: 'Circuit Design', level: 85, icon: <GiCircuitry />, color: '#FF6B6B' },
          { name: 'Microcontrollers', level: 82, icon: <GiProcessor />, color: '#4CAF50' }
        ]
      }
    },
    {
      title: 'Tools',
      icon: <FaTools className="w-6 h-6" />,
      skills: {
        'Software Tools': [
          { name: 'VS Code', level: 90, icon: <SiVisualstudiocode />, color: '#007ACC' },
          { name: 'Git & GitHub', level: 90, icon: <SiGithub />, color: '#181717' },
          { name: 'Figma', level: 85, icon: <SiFigma />, color: '#F24E1E' },
          { name: 'Postman', level: 82, icon: <SiPostman />, color: '#FF6C37' }
        ],
        'Hardware Tools': [
          { name: 'Oscilloscope', level: 85, icon: <GiCircuitry />, color: '#FFD700' },
          { name: 'Multimeter', level: 90, icon: <GiCircuitry />, color: '#FF4500' },
          { name: 'Soldering Iron', level: 88, icon: <GiCircuitry />, color: '#CD853F' }
        ]
      }
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Skills & Expertise</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical abilities and professional competencies
          </p>
        </motion.div>

        {/* Main Category Tabs */}
        <div className="flex justify-center mb-8 gap-4">
          {skillCategories.map((category) => (
            <motion.button
              key={category.title}
              onClick={() => setActiveSection(category.title)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                activeSection === category.title
                  ? 'bg-primary bg-opacity-20 text-primary'
                  : 'bg-white bg-opacity-5 text-gray-300 hover:bg-primary hover:bg-opacity-10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon}
              <span>{category.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Sub-category Tabs */}
        <div className="flex justify-center mb-12 gap-4">
          {Object.keys(skillCategories.find(cat => cat.title === activeSection)?.skills || {}).map((subCategory) => (
            <motion.button
              key={subCategory}
              onClick={() => setActiveCategory(subCategory)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeCategory === subCategory
                  ? 'bg-primary bg-opacity-20 text-primary'
                  : 'bg-white bg-opacity-5 text-gray-300 hover:bg-primary hover:bg-opacity-10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {subCategory}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories
            .find(cat => cat.title === activeSection)
            ?.skills[activeCategory]
            .map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {applyGlass(
                  <div className="p-6 skill-card">
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${skill.color}22` }}
                      >
                        <div className="text-2xl" style={{ color: skill.color }}>
                          {skill.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{skill.name}</h3>
                        <p className="text-sm text-gray-400">Proficiency: {skill.level}%</p>
                      </div>
                    </div>
                    
                    <div className="h-2 bg-white bg-opacity-10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>,
                  { borderRadius: '1rem', hoverEffect: true }
                )}
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;