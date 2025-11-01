import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Package, Truck, Wrench, ChevronRight } from 'lucide-react';
import ValueCard from '../components/ui/ValueCard';
import ProjectCard from '../components/ui/ProjectCard';
import { projects } from '../data/projects';

const Home = () => {
  const featuredProjects = projects.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image (Placeholder for video) */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1600"
            alt="Custom European Cabinets"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="heading-xl mb-6"
          >
            Custom European Cabinets,<br />
            <span className="text-accent">Crafted in Houston</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-neutral-200 max-w-3xl mx-auto"
          >
            Frameless Design. Supply-Only Excellence. 2-3 Week Delivery.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/portfolio" className="btn-primary">
              View Portfolio
            </Link>
            <Link to="/contact" className="btn-outline bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary">
              Get Free Quote
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-white">
            <span className="text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronRight className="w-6 h-6 rotate-90" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Value Propositions Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">Why Choose YuDeZign?</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              We combine European craftsmanship with Houston efficiency to deliver exceptional custom cabinets.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={Clock}
              title="2-3 Week Turnaround"
              description="Lightning-fast local manufacturing in Houston. No overseas delays."
              delay={0.1}
            />
            <ValueCard
              icon={Package}
              title="European Frameless Design"
              description="Modern, space-maximizing construction with sleek, seamless aesthetics."
              delay={0.2}
            />
            <ValueCard
              icon={Truck}
              title="Flexible Delivery"
              description="Choose assembled or flat-pack (KD) options to fit your project needs."
              delay={0.3}
            />
            <ValueCard
              icon={Wrench}
              title="Supply-Only Savings"
              description="Direct factory pricing without showroom markup. Work with your own installer."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">Featured Projects</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Explore our latest custom cabinet installations across Houston.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {featuredProjects.map((project, index) => (
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

          <div className="text-center">
            <Link to="/portfolio" className="btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Why YuDeZign Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800"
                alt="YuDeZign Quality"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-lg mb-6">Uncompromising Quality, Local Craftsmanship</h2>
              <div className="space-y-6 text-neutral-700">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold text-xl">¾"</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Premium 3/4" Plywood Construction</h3>
                    <p className="text-neutral-600">
                      We use only high-grade 3/4" plywood, never particle board. Built to last decades.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <span className="text-accent font-bold text-xl">25+</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">25+ Finish Options in Stock</h3>
                    <p className="text-neutral-600">
                      Melamine, laminate, acrylic, and wood grain finishes. See them all in our showroom.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold text-xl">HTX</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Made in Houston</h3>
                    <p className="text-neutral-600">
                      Local manufacturing means faster turnaround, easy communication, and supporting Texas jobs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <span className="text-accent font-bold text-xl">KD</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Free KD Lite Design Software</h3>
                    <p className="text-neutral-600">
                      Design your dream closet yourself with our intuitive software. Get instant pricing and order directly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link to="/about" className="btn-primary">
                  Learn More About Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KD Lite Software Teaser */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-lg mb-6">Design Your Own Closet with KD Lite</h2>
              <p className="text-xl text-neutral-200 mb-6">
                Our free closet design software puts professional-grade tools in your hands. Drag, drop, visualize, and order.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-neutral-200">Intuitive drag-and-drop interface</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-neutral-200">Real-time 3D visualization</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-neutral-200">Instant pricing and quotes</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-neutral-200">Order directly from the factory</span>
                </li>
              </ul>
              <Link to="/kdlite" className="btn-secondary">
                Try KD Lite Free
              </Link>
            </motion.div>

            {/* Image/Video Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
                alt="KD Lite Software"
                className="w-full h-full object-cover"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="heading-lg mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl text-neutral-600 mb-8">
              Get a free quote today and discover how YuDeZign can transform your space with custom European cabinets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Request Free Quote
              </Link>
              <Link to="/portfolio" className="btn-outline">
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
