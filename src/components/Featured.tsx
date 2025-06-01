import { motion } from 'framer-motion';
import { useGlassMorphism } from '../context/GlassMorphismProvider';
import { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface FeaturedItem {
  title: string;
  description: string;
  image: string;
  link?: string;
  technologies: string[];
  color?: string;
  id?: number;
}

const featuredItems: FeaturedItem[] = [
  {
    title: "CodeClash 2025 - The Battle of Algorithms",
    description: "Participated in CodeClash 2025, an algorithmic programming competition organized by Lets Code Community. Demonstrated problem-solving skills and algorithmic thinking through competitive programming challenges.",
    image: "/images/certificates/5.jpg",
    link: "https://unstop.com/certificate-preview/7891deac-510c-42e7-bebb-54b34760ca24",
    technologies: ["Algorithms", "Problem Solving", "Competitive Programming", "Data Structures"],
    color: "#4F46E5"
  },
  {
    title: "CodeFest'25 CTF Challenge",
    description: "Successfully participated in the Capture The Flag (CTF) competition at CodeFest'25, organized by the Indian Institute of Technology (Banaras Hindu University). Demonstrated skills in cybersecurity, problem-solving, and technical analysis.",
    image: "/images/certificates/6.jpg",
    link: "https://unstop.com/certificate-preview/5cb248f6-30fc-4176-b16b-09afc4a3d69f",
    technologies: ["Cybersecurity", "CTF", "Problem Solving", "Technical Analysis"],
    color: "#10B981"
  },
  {
    title: "Semrush Social Media Marketing Certification",
    description: "Completed comprehensive training in social media marketing fundamentals, including audience insights, competitor analysis, content strategy, and analytics. Earned certification from Semrush Academy, a globally recognized digital marketing education platform.",
    image: "/images/certificates/4.png",
    link: "https://static.semrush.com/academy/certificates/8fc4a3beea/ritesh-bonthalakoti_13.pdf",
    technologies: ["Social Media Strategy", "Content Planning", "Analytics", "Audience Engagement"],
    color: "#F59E0B"
  },
  {
    title: "Portfolio Website",
    description: "A modern, responsive portfolio built with React, TypeScript, and Three.js featuring interactive 3D elements and smooth animations.",
    image: "/images/projects/3D Portfolio.png",
    link: "https://your-portfolio-url.com",
    technologies: ["React", "TypeScript", "Three.js", "Tailwind CSS"],
    color: "#EC4899"
  },
  // Add 2-3 more of your best projects/achievements here
];

const Featured = () => {
  const { applyGlass } = useGlassMorphism();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    beforeChange: (_: any, next: number) => setCurrentIndex(next)
  };

  return (
    <section id="featured" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Featured</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Highlighting my most impactful projects and achievements
          </p>
        </motion.div>

        <div className="relative px-12">
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Slider ref={sliderRef} {...settings} className="featured-slider">
              {featuredItems.map((item, index) => (
                <div key={index} className="px-2">
                  {applyGlass(
                    <div 
                      className="p-4 h-full" 
                      style={{
                        background: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%), linear-gradient(135deg, ${item.color || '#00ff88'}22 0%, transparent 100%)`
                      }}
                    >
                      <div 
                        className="relative overflow-hidden rounded-lg mb-3 aspect-video cursor-pointer"
                        onClick={() => item.link && window.open(item.link, '_blank')}
                      >
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div 
                          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-black bg-opacity-50"
                          style={{ borderColor: item.color || '#00ff88' }}
                        >
                          <span className="text-white font-medium">View Details</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 line-clamp-1">{item.title}</h3>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.technologies.slice(0, 2).map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-2 py-1 bg-primary/20 text-primary-foreground rounded-full text-xs"
                            style={{ backgroundColor: `${item.color || '#00ff88'}22` }}
                          >
                            {tech}
                          </span>
                        ))}
                        {item.technologies.length > 2 && (
                          <span className="px-2 py-1 bg-primary/20 text-primary-foreground rounded-full text-xs">
                            +{item.technologies.length - 2}
                          </span>
                        )}
                      </div>
                    </div>,
                    { borderRadius: '0.75rem', hoverEffect: true }
                  )}
                </div>
              ))}
            </Slider>
          </motion.div>

          {/* Navigation Arrows with Color Effects */}
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1, backgroundColor: featuredItems[currentIndex]?.color || '#00ff88' }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 z-10"
            style={{ boxShadow: `0 0 15px ${featuredItems[currentIndex]?.color || '#00ff88'}66` }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1, backgroundColor: featuredItems[currentIndex]?.color || '#00ff88' }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 z-10"
            style={{ boxShadow: `0 0 15px ${featuredItems[currentIndex]?.color || '#00ff88'}66` }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Featured;