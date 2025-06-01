import { motion } from 'framer-motion';
import { useGlassMorphism } from '../context/GlassMorphismProvider';
import { useState } from 'react';

// Function to get skill color based on skill name
const getSkillColor = (skill: string) => {
  const colors: Record<string, string> = {
    React: '#61DAFB',
    JavaScript: '#F7DF1E',
    'Next.js': '#000000',
    'Node.js': '#339933',
    'Tailwind CSS': '#06B6D4',
    Figma: '#F24E1E',
    'UI Design': '#FF3366',
    'Product Design': '#00FF88',
    'User Research': '#7000FF',
    'No Code Tools': '#4353FF',
    'Hardware Design': '#FF5733',
    'IoT Development': '#33A8FF',
    'Embedded Systems': '#8833FF',
    'Web Development': '#33FF88',
    Framer: '#0055FF',
    Webflow: '#4353FF',
    Shopify: '#7AB55C',
    Python: '#3776AB',
    Flutter: '#02569B',
    Firebase: '#FFCA28',
    AWS: '#FF9900',
    GitHub: '#181717',
    'Machine Learning': '#FF6B6B',
    'Data Science': '#9C27B0',
    'Arduino': '#00979D',
    'Raspberry Pi': '#C51A4A',
    'Verilog HDL': '#FF8C00',
    'Xilinx Vivado': '#E01F27',
  };

  return colors[skill] || '#00FF88'; // Default to primary color
};

// Skill category component with progress bar
const SkillWithProgress = ({ 
  name, 
  percentage, 
  index 
}: { 
  name: string; 
  percentage: number; 
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-medium">{name}</span>
        <span className="text-primary font-bold">{percentage}%</span>
      </div>
      <div className="h-3 bg-white bg-opacity-10 rounded-lg overflow-hidden backdrop-blur-sm border border-white border-opacity-5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="h-full rounded-lg relative"
          style={{
            background: `linear-gradient(90deg, ${getSkillColor(name)}aa, ${getSkillColor(name)})`
          }}
        >
          <div className="absolute inset-0 overflow-hidden flex justify-end">
            <div className="flex space-x-1 mr-2">
              {[...Array(Math.floor(percentage / 10))].map((_, i) => (
                <div 
                  key={i} 
                  className="h-full w-1 bg-white bg-opacity-30"
                  style={{
                    transform: `skewX(-20deg)`,
                    marginLeft: i % 2 === 0 ? '2px' : '1px'
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Skill category component with tags
const SkillCategory = ({ 
  title, 
  skills, 
  index 
}: {
  title: string;
  skills: string[];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-background border border-white border-opacity-10 rounded-xl p-6"
    >
      <h3 className="text-xl font-bold mb-4 gradient-text">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 bg-white bg-opacity-5 rounded-full text-sm hover:bg-primary hover:bg-opacity-20 transition-colors font-medium tracking-wide"
            style={{
              backgroundColor: `${getSkillColor(skill)}15`,
              color: getSkillColor(skill),
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// Tool logo component
const ToolLogo = ({ 
  name, 
  logo, 
  index 
}: { 
  name: string; 
  logo: string; 
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
    >
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border border-white border-opacity-10 bg-white bg-opacity-5">
        {logo ? (
          <img src={logo} alt={name} className="w-10 h-10 md:w-12 md:h-12" />
        ) : (
          <span className="text-2xl text-primary">{name.charAt(0)}</span>
        )}
      </div>
      <span className="mt-2 text-sm text-gray-300">{name}</span>
    </motion.div>
  );
};

const Skills = () => {
  const { applyGlass } = useGlassMorphism();
  const [activeTab, setActiveTab] = useState('all');

  // Main skill categories with progress bars
  const mainSkills = [
    { name: 'Hardware Design', percentage: 92 },
    { name: 'IoT Development', percentage: 88 },
    { name: 'Embedded Systems', percentage: 85 },
    { name: 'Web Development', percentage: 78 },
    { name: 'UI Design', percentage: 75 },
  ];

  // Tool logos
  const tools = [
    { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Arduino', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg' },
    { name: 'Raspberry Pi', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg' },
    { name: 'Xilinx Vivado', logo: 'https://www.xilinx.com/content/dam/xilinx/imgs/press/media-kits/corporate/xilinx-logo.png' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' }
    // Removed Lovable and Trae AI entries
  ];

  // Skill categories
  const skillCategories = [
    {
      title: 'Hardware Skills',
      skills: ['Arduino', 'Raspberry Pi', 'Verilog HDL', 'Embedded Systems', 'Xilinx Vivado']
    },
    {
      title: 'Software Skills',
      skills: ['React', 'JavaScript', 'Next.js', 'Node.js', 'Python', 'MongoDB', 'Firebase', 'Express', 'Tailwind CSS']
    },
    {
      title: 'Others',
      skills: ['UI Design', 'UX Design', 'Figma', 'Adobe XD', 'GitHub', 'VS Code', 'Postman', 'Jira', 'Notion', 'Slack', 'AWS']
    }
  ];

  return (
    <section id="skills" className="py-20 bg-background bg-opacity-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">My Professional Skills</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            A showcase of my technical expertise and professional capabilities that I've developed over the years.
          </p>
        </motion.div>

        {/* Main skills with progress bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {applyGlass(
              <div className="p-8 rounded-2xl">
                <h3 className="text-2xl font-bold gradient-text mb-6">Core Competencies</h3>
                <div>
                  {mainSkills.slice(0, 3).map((skill, index) => (
                    <SkillWithProgress 
                      key={skill.name} 
                      name={skill.name} 
                      percentage={skill.percentage} 
                      index={index} 
                    />
                  ))}
                </div>
              </div>,
              { intensity: 15, borderRadius: '1.5rem', depth: 3, hoverEffect: true }
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {applyGlass(
              <div className="p-8 rounded-2xl">
                <h3 className="text-2xl font-bold gradient-text mb-6">Technical Skills</h3>
                <div>
                  {mainSkills.slice(3).map((skill, index) => (
                    <SkillWithProgress 
                      key={skill.name} 
                      name={skill.name} 
                      percentage={skill.percentage} 
                      index={index} 
                    />
                  ))}
                </div>
              </div>,
              { intensity: 15, borderRadius: '1.5rem', depth: 3, hoverEffect: true }
            )}
          </motion.div>
        </div>

        {/* Tools section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {applyGlass(
            <div className="p-6">
              <h3 className="text-2xl font-bold gradient-text mb-6 text-center">Tools I Use</h3>
              <div className="flex justify-center flex-wrap gap-8">
                {tools.map((tool, index) => (
                  <ToolLogo key={tool.name} name={tool.name} logo={tool.logo} index={index} />
                ))}
              </div>
            </div>,
            { intensity: 15, borderRadius: '1rem', depth: 2 }
          )}
        </motion.div>

        {/* Skill categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              skills={category.skills}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;