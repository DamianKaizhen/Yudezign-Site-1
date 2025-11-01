import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Package, Ruler, Wrench } from 'lucide-react';
import { InView } from '../components/ui/InViewAnimations';
import { ImageCard, SpecCard, MinimalCard } from '../components/ui/MinimalCard';
import { projects } from '../data/projects';

const Home = () => {
  const featuredProjects = projects.slice(0, 4);

  return (
    <div className="min-h-screen bg-luxury-white">

      {/* HERO - Full viewport, minimal, beautiful */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Large background image */}
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1600&q=90"
            alt="Custom European Cabinets"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent"></div>
        </div>

        {/* Minimal hero content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <InView variant="fadeUp">
            <motion.h1
              className="text-hero-mobile md:text-hero mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Custom European
              <br />
              Cabinets
            </motion.h1>
          </InView>

          <InView variant="fadeUp">
            <motion.p
              className="text-body-lg md:text-h4 font-light mb-12 text-luxury-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Crafted in Houston
            </motion.p>
          </InView>

          <InView variant="fadeUp">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/portfolio"
                className="inline-block px-12 py-4 bg-white text-primary text-body-lg font-medium rounded-md hover:bg-luxury-gray-50 transition-all duration-300 shadow-luxury-lg hover:shadow-luxury-xl"
              >
                View Portfolio
              </Link>
            </motion.div>
          </InView>
        </div>
      </section>

      {/* PHILOSOPHY - Centered, spacious */}
      <section className="py-30 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <InView variant="fadeUp">
            <p className="text-h2 md:text-display-mobile font-light text-primary leading-relaxed">
              We craft custom frameless cabinets with European precision and Houston efficiency.
            </p>
          </InView>

          <InView variant="fadeUp">
            <p className="text-body-lg text-luxury-gray-500 mt-8 leading-relaxed">
              Every cabinet is built to your exact specifications using premium 3/4" plywood, never particle board.
              Delivered in 2-3 weeks, not months.
            </p>
          </InView>
        </div>
      </section>

      {/* FEATURED WORK - Clean grid */}
      <section className="py-30 px-4 bg-luxury-cream">
        <div className="max-w-7xl mx-auto">
          <InView variant="fadeUp">
            <div className="text-center mb-16">
              <span className="text-label text-accent mb-4 block">Featured Work</span>
              <h2 className="text-display-mobile md:text-display font-medium text-primary">
                Recent Projects
              </h2>
            </div>
          </InView>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <InView key={project.id} variant="fadeUp" delay={index * 0.1}>
                <Link to={`/portfolio/${project.category}`}>
                  <ImageCard
                    image={project.images[0] || project.thumbnail}
                    title={project.title}
                    subtitle={project.location}
                  />
                </Link>
              </InView>
            ))}
          </div>

          <InView variant="fadeUp">
            <div className="text-center mt-16">
              <Link
                to="/portfolio"
                className="inline-block px-10 py-3 border-2 border-primary text-primary text-body font-medium rounded-md hover:bg-primary hover:text-white transition-all duration-300"
              >
                View All Projects
              </Link>
            </div>
          </InView>
        </div>
      </section>

      {/* SPECIFICATIONS - Icon row */}
      <section className="py-30 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            <InView variant="fadeUp" delay={0}>
              <SpecCard
                icon={<Clock className="w-full h-full" strokeWidth={1.5} />}
                title="2-3 Weeks"
                description="Fast local manufacturing, no overseas delays"
              />
            </InView>

            <InView variant="fadeUp" delay={0.1}>
              <SpecCard
                icon={<Ruler className="w-full h-full" strokeWidth={1.5} />}
                title="3/4&quot; Plywood"
                description="Premium materials, built to last decades"
              />
            </InView>

            <InView variant="fadeUp" delay={0.2}>
              <SpecCard
                icon={<Package className="w-full h-full" strokeWidth={1.5} />}
                title="25+ Finishes"
                description="Melamine, laminate, acrylic, wood grain"
              />
            </InView>

            <InView variant="fadeUp" delay={0.3}>
              <SpecCard
                icon={<Wrench className="w-full h-full" strokeWidth={1.5} />}
                title="Frameless"
                description="Modern European design, space-maximizing"
              />
            </InView>
          </div>
        </div>
      </section>

      {/* CRAFTSMANSHIP - Large image with quote */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <InView variant="fadeUp" className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1600&q=90"
            alt="YuDeZign Craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/40"></div>
        </InView>

        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <InView variant="fadeUp">
            <p className="text-display-mobile md:text-display font-light leading-tight">
              "Built to last decades, not years."
            </p>
          </InView>
        </div>
      </section>

      {/* CALL TO ACTION - Simple, elegant */}
      <section className="py-30 px-4 bg-luxury-white">
        <div className="max-w-4xl mx-auto">
          <InView variant="fadeUp">
            <MinimalCard padding="xl" className="text-center">
              <h2 className="text-display-mobile md:text-display font-medium text-primary mb-6">
                Begin Your Project
              </h2>

              <p className="text-body-lg text-luxury-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                Get a free quote and discover how YuDeZign can bring your vision to life with
                custom European cabinets crafted right here in Houston.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-block px-12 py-4 bg-primary text-white text-body-lg font-medium rounded-md hover:bg-primary-light transition-all duration-300 shadow-luxury hover:shadow-luxury-lg"
                >
                  Request Quote
                </Link>

                <a
                  href="tel:+11234567890"
                  className="inline-block px-12 py-4 border-2 border-primary text-primary text-body-lg font-medium rounded-md hover:bg-primary hover:text-white transition-all duration-300"
                >
                  (123) 456-7890
                </a>
              </div>

              <div className="mt-12 pt-8 border-t border-luxury-gray-100">
                <p className="text-body text-luxury-gray-400">
                  <a href="mailto:info@yudezign.com" className="hover:text-accent transition-colors">
                    info@yudezign.com
                  </a>
                </p>
              </div>
            </MinimalCard>
          </InView>
        </div>
      </section>

    </div>
  );
};

export default Home;
