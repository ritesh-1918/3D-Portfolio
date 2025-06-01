import { motion } from 'framer-motion';
import { useGlassMorphism } from '../context/GlassMorphismProvider';
import { useState } from 'react';
import { FaCode, FaTools, FaBrain } from 'react-icons/fa';
import { SiArduino, SiRaspberrypi, SiPython, SiReact, SiNodedotjs, SiTailwindcss, SiGithub, SiFigma } from 'react-icons/si';

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
  const [activeCategory, setActiveCategory] = useState('Technical');

  const skillCategories: SkillCategory[] = [
    {
      title: 'Technical',
      icon: <FaCode className="w-6 h-6" />,
      skills: [
        { name: 'Arduino', level: 92, icon: <SiArduino />, color: '#00979D' },
        { name: 'Raspberry Pi', level: 88, icon: <SiRaspberrypi />, color: '#C51A4A' },
        { name: 'Python', level: 85, icon: <SiPython />, color: '#3776AB' },
        { name: 'React', level: 80, icon: <SiReact />, color: '#61DAFB' },
        { name: 'Node.js', level: 78, icon: <SiNodedotjs />, color: '#339933' }
      ]
    },
    {
      title: 'Tools',
      icon: <FaTools className="w-6 h-6" />,
      skills: [
        { name: 'Git & GitHub', level: 90, icon: <SiGithub />, color: '#181717' },
        { name: 'Figma', level: 85, icon: <SiFigma />, color: '#F24E1E' },
        { name: 'Tailwind CSS', level: 88, icon: <SiTailwindcss />, color: '#06B6D4' }
      ]
    },
    {
      title: 'Soft Skills',
      icon: <FaBrain className="w-6 h-6" />,
      skills: [
        { name: 'Problem Solving', level: 95, icon: <FaBrain />, color: '#00FF88' },
        { name: 'Communication', level: 90, icon: <FaBrain />, color: '#7000FF' },
        { name: 'Leadership', level: 85, icon: <FaBrain />, color: '#FF3366' }
      ]
    }
  ];

  const currentCategory = skillCategories.find(cat => cat.title === activeCategory) || skillCategories[0];

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

        {/* Category Tabs */}
        <div className="flex justify-center mb-12 gap-4">
          {skillCategories.map((category) => (
            <motion.button
              key={category.title}
              onClick={() => setActiveCategory(category.title)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                activeCategory === category.title
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

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory.skills.map((skill, index) => (
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