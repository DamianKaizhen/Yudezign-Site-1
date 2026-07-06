import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Wand2, ArrowRight, Layout } from 'lucide-react';
import ProjectCard from '../../components/ui/ProjectCard';
import { ProjectModal } from '../../components/ui/ProjectModal';
import { projects } from '../../data/projects';
import type { Project } from '../../types';
import SEO from '../../components/SEO';

const categoryInfo = {
  kitchens: {
    title: 'Kitchen Cabinets',
    description: 'Transform your kitchen with our custom European frameless cabinets. From modern minimalist to classic elegance, we create functional and beautiful kitchen solutions.',
    heroImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1600',
  },
  closets: {
    title: 'Custom Closets',
    description: 'Maximize your storage with our expertly designed closet systems. Design your perfect closet with our free Closet Program and enjoy organized living.',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600',
  },
  vanities: {
    title: 'Bathroom Vanities',
    description: 'Elevate your bathroom with custom vanities that combine style and functionality. European craftsmanship meets practical design.',
    heroImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600',
  },
  custom: {
    title: 'Custom Projects',
    description: 'From home offices to entertainment centers, we create custom cabinetry solutions for any space in your home.',
    heroImage: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1600',
  },
  commercial: {
    title: 'Commercial Projects',
    description: 'Professional-grade cabinetry solutions for offices, restaurants, retail stores, and medical facilities. Durable, compliant, and designed for high-traffic environments.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600',
  },
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const categoryKey = category as keyof typeof categoryInfo;
  const info = categoryInfo[categoryKey];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const categoryProjects = projects.filter((project) => project.category === category);

  if (!info) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-neutral-600">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${info.title} - Custom European Cabinets`}
        description={info.description}
        keywords={`${category} cabinets, custom ${category}, houston ${category}, european ${category}, luxury ${category}`}
        url={`https://yudezign.com/portfolio/${category}`}
        image={info.heroImage}
      />
      <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={info.heroImage}
            alt={info.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 container-custom">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="heading-xl mb-4"
          >
            {info.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-neutral-200 max-w-3xl mx-auto"
          >
            {info.description}
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          {categoryProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard project={project} onClick={() => handleProjectClick(project)} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-600 text-lg">No projects available in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Room Visualizer CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Wand2 className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">
                  See Your {category === 'kitchens' ? 'Kitchen' : category === 'closets' ? 'Closet' : category === 'vanities' ? 'Bathroom' : 'Space'} Transformed
                </h3>
                <p className="text-white/80 max-w-xl">
                  Upload a photo of your room and visualize how our premium cabinet finishes will look in your space.
                </p>
              </div>
            </div>
            <Link
              to="/visualizer"
              className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent hover:text-white transition-all duration-300 flex-shrink-0"
            >
              Try Free Visualizer
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* KD Lite Design Tool CTA - Only for Closets */}
      {category === 'closets' && (
        <section className="py-16 px-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Layout className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    Design Your Perfect Closet
                  </h3>
                  <p className="text-white/80 max-w-xl">
                    Use our free KD Lite design tool to plan your custom closet layout before your consultation.
                  </p>
                </div>
              </div>
              <Link
                to="/kdlite"
                className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300 flex-shrink-0"
              >
                Try KD Lite Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </div>

    {/* Project Detail Modal */}
    <ProjectModal
      project={selectedProject}
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
        setSelectedProject(null);
      }}
    />
    </>
  );
};

export default CategoryPage;
