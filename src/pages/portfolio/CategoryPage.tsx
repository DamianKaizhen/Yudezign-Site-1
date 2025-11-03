import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import ProjectCard from '../../components/ui/ProjectCard';
import { projects } from '../../data/projects';
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
                  <ProjectCard project={project} />
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
    </div>
    </>
  );
};

export default CategoryPage;
