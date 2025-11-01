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
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="heading-xl mb-4"
          >
            Our Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-neutral-200 max-w-2xl mx-auto"
          >
            Explore our collection of custom European cabinets crafted for homes across Houston.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-40 bg-white shadow-md py-4">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeFilter === filter.value
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
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
              <div className="text-center py-12">
                <p className="text-neutral-600 text-lg">No projects found in this category.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
