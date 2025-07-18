import React, { useState } from 'react';
import { VscCode } from 'react-icons/vsc';
import { FaAws } from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiExpress,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiMysql,
  SiRedis,
  SiKubernetes,
  SiJenkins,
  SiLinux,
  SiNginx,
  SiFigma,
  SiPhotoshop,
  SiSketch,
  SiInvision,
  SiZeplin,
  SiSlack,
  SiTrello,
  SiJira,
  SiNotion,
  SiConfluence
} from 'react-icons/si';

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  color: string;
}

interface SkillCategory {
  [key: string]: Skill[];
}

interface SkillSection {
  [key: string]: SkillCategory;
}

const Skills: React.FC = () => {
  const skillCategories: SkillSection = {
    technical: {
      frontend: [
        { name: 'JavaScript', level: 95, icon: <SiJavascript />, color: '#F7DF1E' },
        { name: 'TypeScript', level: 90, icon: <SiTypescript />, color: '#3178C6' },
        { name: 'React', level: 95, icon: <SiReact />, color: '#61DAFB' },
        { name: 'Next.js', level: 85, icon: <SiNextdotjs />, color: '#000000' },
        { name: 'Vue.js', level: 80, icon: <SiVuedotjs />, color: '#4FC08D' },
        { name: 'Angular', level: 75, icon: <SiAngular />, color: '#DD0031' },
        { name: 'HTML5', level: 95, icon: <SiHtml5 />, color: '#E34F26' },
        { name: 'CSS3', level: 90, icon: <SiCss3 />, color: '#1572B6' },
        { name: 'Tailwind CSS', level: 90, icon: <SiTailwindcss />, color: '#06B6D4' }
      ],
      backend: [
        { name: 'Node.js', level: 90, icon: <SiNodedotjs />, color: '#339933' },
        { name: 'Express.js', level: 85, icon: <SiExpress />, color: '#000000' },
        { name: 'Python', level: 85, icon: <SiPython />, color: '#3776AB' }
      ],
      database: [
        { name: 'MongoDB', level: 85, icon: <SiMongodb />, color: '#47A248' },
        { name: 'PostgreSQL', level: 80, icon: <SiPostgresql />, color: '#336791' },
        { name: 'MySQL', level: 75, icon: <SiMysql />, color: '#4479A1' },
        { name: 'Redis', level: 70, icon: <SiRedis />, color: '#DC382D' }
      ],
      devops: [
        { name: 'Git', level: 90, icon: <SiGit />, color: '#F05032' },
        { name: 'Docker', level: 80, icon: <SiDocker />, color: '#2496ED' },
        { name: 'AWS', level: 75, icon: <FaAws />, color: '#FF9900' },
        { name: 'Kubernetes', level: 65, icon: <SiKubernetes />, color: '#326CE5' },
        { name: 'Jenkins', level: 70, icon: <SiJenkins />, color: '#D24939' },
        { name: 'Linux', level: 80, icon: <SiLinux />, color: '#FCC624' },
        { name: 'Nginx', level: 75, icon: <SiNginx />, color: '#009639' }
      ]
    },
    tools: {
      development: [
        { name: 'VS Code', level: 90, icon: <VscCode />, color: '#007ACC' }
      ],
      design: [
        { name: 'Figma', level: 85, icon: <SiFigma />, color: '#F24E1E' },
        { name: 'Photoshop', level: 80, icon: <SiPhotoshop />, color: '#31A8FF' },
        { name: 'Sketch', level: 75, icon: <SiSketch />, color: '#F7B500' },
        { name: 'InVision', level: 70, icon: <SiInvision />, color: '#FF3366' },
        { name: 'Zeplin', level: 70, icon: <SiZeplin />, color: '#FDBD39' }
      ],
      collaboration: [
        { name: 'Slack', level: 90, icon: <SiSlack />, color: '#4A154B' },
        { name: 'Trello', level: 85, icon: <SiTrello />, color: '#0079BF' },
        { name: 'Jira', level: 80, icon: <SiJira />, color: '#0052CC' },
        { name: 'Notion', level: 85, icon: <SiNotion />, color: '#000000' },
        { name: 'Confluence', level: 75, icon: <SiConfluence />, color: '#172B4D' }
      ]
    }
  };

  const [activeSection, setActiveSection] = useState<string>('technical');
  const [activeCategory, setActiveCategory] = useState<string>('frontend');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // Set the first category of the new section as active
    const firstCategory = Object.keys(skillCategories[section])[0];
    setActiveCategory(firstCategory);
  };

  const getSkillBarColor = (level: number) => {
    if (level >= 90) return 'from-green-400 to-green-600';
    if (level >= 80) return 'from-blue-400 to-blue-600';
    if (level >= 70) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, tools, and technologies I work with
          </p>
        </div>

        {/* Main Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
            {Object.keys(skillCategories).map((section) => (
              <button
                key={section}
                onClick={() => handleSectionChange(section)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 capitalize ${
                  activeSection === section
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-4">
            {Object.keys(skillCategories[activeSection]).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 capitalize ${
                  activeCategory === category
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-2 border-blue-600'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories[activeSection][activeCategory]?.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div
                  className="text-3xl mr-4 p-2 rounded-lg"
                  style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
                >
                  {skill.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {skill.level}% Proficiency
                  </p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${getSkillBarColor(skill.level)} transition-all duration-1000 ease-out`}
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Skills Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {Object.values(skillCategories).reduce((total, section) => 
                    total + Object.values(section).reduce((sectionTotal, skills) => 
                      sectionTotal + skills.length, 0), 0)}
                </div>
                <p className="text-gray-600 dark:text-gray-300">Total Skills</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Object.values(skillCategories).reduce((total, section) => 
                    total + Object.values(section).reduce((sectionTotal, skills) => 
                      sectionTotal + skills.filter(skill => skill.level >= 90).length, 0), 0)}
                </div>
                <p className="text-gray-600 dark:text-gray-300">Expert Level</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
                <p className="text-gray-600 dark:text-gray-300">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;