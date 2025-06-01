import { motion } from 'framer-motion';
import { useGlassMorphism } from '../context/GlassMorphismProvider';
import { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface BlogPost {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  link: string;
  color: string;
}

const BlogPostCard = ({ post, index }: { post: BlogPost; index: number }) => {
  const { applyGlass } = useGlassMorphism();
  
  return (
    <div className="px-2">
      {applyGlass(
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="overflow-hidden h-full"
          style={{
            background: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%), linear-gradient(135deg, ${post.color || '#00ff88'}22 0%, transparent 100%)`
          }}
        >
          <div 
            className="relative overflow-hidden aspect-video cursor-pointer"
            onClick={() => window.open(post.link, '_blank')}
          >
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-medium">Read Article</span>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-400">{post.date}</span>
              <span 
                className="px-3 py-1 rounded-full text-xs"
                style={{ backgroundColor: `${post.color || '#00ff88'}22`, color: post.color || '#00ff88' }}
              >
                {post.category}
              </span>
            </div>
            <h3 className="text-lg font-bold mb-2 line-clamp-1">{post.title}</h3>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
            <a 
              href={post.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm hover:underline inline-flex items-center"
              style={{ color: post.color || '#00ff88' }}
            >
              Read More
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </motion.div>,
        { borderRadius: '0.75rem', hoverEffect: true }
      )}
    </div>
  );
};

const Blog = () => {
  const { applyGlass } = useGlassMorphism();
  const sliderRef = useRef<Slider | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const blogPosts: BlogPost[] = [
    {
      title: 'Getting Started with React and TypeScript',
      date: 'June 15, 2024',
      category: 'Development',
      excerpt: 'Learn how to set up a new project with React and TypeScript for type-safe development.',
      image: '/images/blog/react-typescript.jpg',
      link: 'https://blog.example.com/react-typescript',
      color: '#61DAFB'
    },
    {
      title: 'Creating Stunning Animations with Framer Motion',
      date: 'May 28, 2024',
      category: 'Design',
      excerpt: 'Explore the powerful animation capabilities of Framer Motion in React applications.',
      image: '/images/blog/framer-motion.jpg',
      link: 'https://blog.example.com/framer-motion',
      color: '#FF4154'
    },
    {
      title: 'Building 3D Experiences with Three.js',
      date: 'May 10, 2024',
      category: 'Development',
      excerpt: 'Dive into the world of 3D web development with Three.js and React Three Fiber.',
      image: '/images/blog/threejs.jpg',
      link: 'https://blog.example.com/threejs',
      color: '#049EF4'
    },
    {
      title: 'Optimizing React Performance',
      date: 'April 22, 2024',
      category: 'Performance',
      excerpt: 'Learn advanced techniques to optimize your React applications for better user experience.',
      image: '/images/blog/react-performance.jpg',
      link: 'https://blog.example.com/react-performance',
      color: '#00D8FF'
    },
  ];
  
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
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Blog</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Thoughts, insights, and tutorials on web development, design, and technology.
          </p>
        </motion.div>

        <div className="relative px-12">
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Slider ref={sliderRef} {...settings} className="blog-slider">
              {blogPosts.map((post, index) => (
                <BlogPostCard key={index} post={post} index={index} />
              ))}
            </Slider>
          </motion.div>
          
          {/* Navigation Arrows with Color Effects */}
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1, backgroundColor: blogPosts[currentIndex]?.color || '#00ff88' }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 z-10"
            style={{ boxShadow: `0 0 15px ${blogPosts[currentIndex]?.color || '#00ff88'}66` }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1, backgroundColor: blogPosts[currentIndex]?.color || '#00ff88' }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 z-10"
            style={{ boxShadow: `0 0 15px ${blogPosts[currentIndex]?.color || '#00ff88'}66` }}
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

export default Blog;