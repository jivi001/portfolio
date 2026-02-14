import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/ui/Section';
import ProjectCard from '../components/features/ProjectCard';
import { projects, categories } from '../data/projects';
import { Helmet } from 'react-helmet-async';
import FadeIn, { StaggerContainer } from '../components/ui/FadeIn';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects.filter(project => 
    activeCategory === 'All' || project.category.includes(activeCategory)
  );

  return (
    <>
      <Helmet>
        <title>Projects | Jivitesh - AI Engineer</title>
        <meta name="description" content="Portfolio of AI, Machine Learning, and Full Stack Engineering projects." />
      </Helmet>

      <Section className="pt-32 min-h-screen">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Featured Work</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A selection of projects demonstrating applied AI, scalable systems, and data-driven solutions.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                  : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <StaggerContainer 
          key={activeCategory}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map(project => (
              <motion.div
                layout
                key={project.id}
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </StaggerContainer>
      </Section>
    </>
  );
};

export default Projects;
