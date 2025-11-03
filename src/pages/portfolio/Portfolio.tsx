import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../../components/ui/ProjectCard';
import { projects } from '../../data/projects';
import type { Project } from '../../types';
import SEO from '../../components/SEO';

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
    <>
      <SEO
        title="Portfolio - Custom Cabinet Projects"
        description="Browse our portfolio of custom European frameless cabinets. Kitchen cabinets, closets, vanities, and custom cabinetry projects in Houston. Premium 3/4 plywood construction with luxury finishes."
        keywords="cabinet portfolio, kitchen cabinets houston, custom closets, luxury vanities, cabinet projects, european cabinets gallery"
        url="https://yudezign.com/portfolio"
      />
      <div className="min-h-screen pt-24 bg-luxury-cream">
      {/* Hero Section - Minimal with green accent */}
      <section className="py-20 px-4 bg-luxury-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="w-16 h-1 bg-primary mx-auto mb-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 64, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-display-mobile md:text-display font-medium text-luxury-gray-900 mb-6"
          >
            Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg text-luxury-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Custom European cabinets crafted for homes and businesses across Houston.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar - Clean, minimal with green active state */}
      <section className="sticky top-20 z-40 bg-luxury-beige/95 backdrop-blur-sm border-b border-luxury-sand py-6 shadow-luxury-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <motion.button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-8 py-2.5 rounded-md font-medium transition-all duration-300 ${
                  activeFilter === filter.value
                    ? 'bg-primary text-white shadow-luxury'
                    : 'bg-white text-luxury-gray-600 hover:bg-luxury-gray-50 hover:text-primary border border-luxury-gray-100'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid - Spacious with warm background */}
      <section className="py-20 px-4 bg-luxury-cream">
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
    </>
  );
};

export default Portfolio;
