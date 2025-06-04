import { motion } from 'framer-motion';
import { useGlassMorphism } from '../context/GlassMorphismProvider';
import { useState, useRef } from 'react';
import { FaSearch, FaClock, FaTags } from 'react-icons/fa';

interface BlogPost {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  link: string;
  color: string;
  readTime: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    title: 'Getting Started with React and TypeScript',
    date: 'June 15, 2024',
    category: 'Development',
    excerpt: 'Learn how to set up a new project with React and TypeScript for type-safe development.',
    image: '/images/blog/react-typescript.jpg',
    link: 'https://blog.example.com/react-typescript',
    color: '#61DAFB',
    readTime: '5 min read',
    tags: ['React', 'TypeScript', 'Web Development']
  },
  {
    title: 'Creating Stunning Animations with Framer Motion',
    date: 'May 28, 2024',
    category: 'Design',
    excerpt: 'Explore the powerful animation capabilities of Framer Motion in React applications.',
    image: '/images/blog/framer-motion.jpg',
    link: 'https://blog.example.com/framer-motion',
    color: '#FF4154',
    readTime: '8 min read',
    tags: ['Animation', 'React', 'UI/UX']
  },
  {
    title: 'Building 3D Experiences with Three.js',
    date: 'May 10, 2024',
    category: 'Development',
    excerpt: 'Dive into the world of 3D web development with Three.js and React Three Fiber.',
    image: '/images/blog/threejs.jpg',
    link: 'https://blog.example.com/threejs',
    color: '#049EF4',
    readTime: '10 min read',
    tags: ['Three.js', '3D', 'WebGL']
  },
  {
    title: 'Optimizing React Performance',
    date: 'April 22, 2024',
    category: 'Performance',
    excerpt: 'Learn advanced techniques to optimize your React applications for better user experience.',
    image: '/images/blog/react-performance.jpg',
    link: 'https://blog.example.com/react-performance',
    color: '#00D8FF',
    readTime: '7 min read',
    tags: ['React', 'Performance', 'Optimization']
  }
];

const Blog = () => {
  const { applyGlass } = useGlassMorphism();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-64">
            {applyGlass(
              <div className="flex items-center">
                <FaSearch className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:outline-none text-white"
                />
              </div>,
              { borderRadius: '0.5rem' }
            )}
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-primary bg-opacity-20 text-primary'
                    : 'bg-white bg-opacity-5 text-gray-300 hover:bg-primary hover:bg-opacity-10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {applyGlass(
                <article className="overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ backgroundColor: `${post.color}22`, color: post.color }}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span>{post.date}</span>
                      <div className="flex items-center gap-1">
                        <FaClock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors"
                    >
                      Read More
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </article>,
                { borderRadius: '1rem', hoverEffect: true }
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;