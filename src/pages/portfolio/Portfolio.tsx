import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../../components/ui/ProjectCard';
import { projects } from '../../data/projects';
import type { Project } from '../../types';

type FilterCategory = 'all' | 'kitchens' | 'closets' | 'vanities' | 'custom' | 'commercial';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filters: { label: string; value: FilterCategory }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'Kitchens', value: 'kitchens' },
    { label: 'Closets', value: 'closets' },
    { label: 'Vanities', value: 'vanities' },
    { label: 'Custom', value: 'custom' },
    { label: 'Commercial', value: 'commercial' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((project: Project) => project.category === activeFilter);

  return (
    <div className="min-h-screen pt-24 bg-luxury-white">
      {/* Hero Section - Minimal */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-display-mobile md:text-display font-medium text-primary mb-6"
          >
            Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg text-luxury-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            Custom European cabinets crafted for homes and businesses across Houston.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar - Clean, minimal */}
      <section className="sticky top-20 z-40 bg-white border-b border-luxury-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-8 py-2.5 rounded-md font-medium transition-all duration-300 ${
                  activeFilter === filter.value
                    ? 'bg-primary text-white shadow-luxury'
                    : 'bg-luxury-cream text-luxury-gray-600 hover:bg-luxury-gray-50 hover:text-primary'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid - Spacious */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-body-lg text-luxury-gray-400">No projects found in this category.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
