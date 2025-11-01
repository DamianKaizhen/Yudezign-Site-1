import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Package, Truck, Wrench, ChevronRight, Sparkles, Zap, Award, TrendingUp } from 'lucide-react';
import { AnimatedGradientBg, FloatingParticles, GridPattern } from '../components/ui/AnimatedBackgrounds';
import { SpotlightCard, BentoCard, NeonCard } from '../components/ui/ModernCard';
import ProjectCard from '../components/ui/ProjectCard';
import { projects } from '../data/projects';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const featuredProjects = projects.slice(0, 4);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div className="min-h-screen" onMouseMove={handleMouseMove}>
      {/* Hero Section with Modern Animations */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-black">
          <AnimatedGradientBg />
          <FloatingParticles />
          <GridPattern />
        </div>

        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-10">
          <img
            src="https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1600"
            alt="Custom European Cabinets"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-primary/40 to-primary/90"></div>
        </div>

        {/* Spotlight Effect */}
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 165, 116, 0.15), transparent 40%)`,
          }}
        />

        {/* Hero Content */}
        <div className="relative z-30 text-center text-white px-4">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Premium European Craftsmanship</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="heading-xl mb-6"
          >
            Custom European Cabinets,<br />
            <span className="bg-gradient-to-r from-accent via-accent-light to-white bg-clip-text text-transparent">
              Crafted in Houston
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-neutral-200 max-w-3xl mx-auto leading-relaxed"
          >
            Frameless Design • Supply-Only Excellence • 2-3 Week Delivery
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/portfolio"
              className="group relative px-8 py-4 bg-gradient-to-r from-accent to-accent-dark text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center space-x-2">
                <span>View Portfolio</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              to="/contact"
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white hover:text-primary hover:scale-105 hover:shadow-2xl"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Get Free Quote</span>
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: '500+', label: 'Projects' },
              { number: '2-3', label: 'Week Delivery' },
              { number: '25+', label: 'Finishes' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.number}</div>
                <div className="text-sm text-neutral-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center text-white/60"
          >
            <span className="text-sm mb-2">Discover More</span>
            <ChevronRight className="w-6 h-6 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Value Propositions with Modern Cards */}
      <section className="section-padding bg-neutral-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Award className="w-4 h-4" />
              <span>Why Choose Us</span>
            </div>
            <h2 className="heading-lg mb-4">
              Unmatched <span className="text-gradient">Quality & Speed</span>
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              We combine European craftsmanship with Houston efficiency
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: '2-3 Week Turnaround',
                description: 'Lightning-fast local manufacturing. No overseas delays.',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: Package,
                title: 'European Frameless',
                description: 'Modern, space-maximizing construction with seamless aesthetics.',
                color: 'from-purple-500 to-purple-600',
              },
              {
                icon: Truck,
                title: 'Flexible Delivery',
                description: 'Assembled or flat-pack options to fit your needs.',
                color: 'from-pink-500 to-pink-600',
              },
              {
                icon: Wrench,
                title: 'Supply-Only Savings',
                description: 'Direct factory pricing without showroom markup.',
                color: 'from-green-500 to-green-600',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NeonCard className="h-full">
                  <div className="p-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl mb-4 shadow-lg`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">{item.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                  </div>
                </NeonCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects with Bento Grid */}
      <section className="section-padding bg-white relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <TrendingUp className="w-4 h-4" />
              <span>Featured Work</span>
            </div>
            <h2 className="heading-lg mb-4">Recent Masterpieces</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Explore our latest custom cabinet installations across Houston
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/portfolio"
              className="group inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <span>View All Projects</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why YuDeZign - Modern Bento Layout */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image with Floating Effect */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <BentoCard glow className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800"
                  alt="YuDeZign Quality"
                  className="w-full h-[500px] object-cover"
                />
              </BentoCard>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="heading-lg">
                Uncompromising <span className="text-gradient">Quality</span>,<br />
                Local Craftsmanship
              </h2>

              {[
                {
                  badge: '¾"',
                  title: 'Premium Plywood Construction',
                  description: 'We use only high-grade 3/4" plywood, never particle board. Built to last decades.',
                },
                {
                  badge: '25+',
                  title: '25+ Finish Options in Stock',
                  description: 'Melamine, laminate, acrylic, and wood grain. See them all in our showroom.',
                },
                {
                  badge: 'HTX',
                  title: 'Made in Houston',
                  description: 'Local manufacturing means faster turnaround and supporting Texas jobs.',
                },
                {
                  badge: 'PRO',
                  title: 'Free Closet Program',
                  description: 'Design your dream closet with our intuitive software. Get instant pricing.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SpotlightCard>
                    <div className="p-6 flex items-start space-x-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {item.badge}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-neutral-900">{item.title}</h3>
                        <p className="text-neutral-600">{item.description}</p>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closet Program Teaser - Modern Dark Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary-dark to-black text-white relative overflow-hidden">
        <AnimatedGradientBg />
        <FloatingParticles />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold">Free Design Tool</span>
              </div>

              <h2 className="heading-lg mb-6">Design Your Closet with Our Free Program</h2>
              <p className="text-xl text-neutral-200 mb-6">
                Professional-grade design tools at your fingertips. Drag, drop, visualize, and order.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  'Drag-and-drop interface',
                  'Real-time 3D visualization',
                  'Instant pricing quotes',
                  'Order directly from factory',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-neutral-200 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/kdlite"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent to-accent-dark text-white font-semibold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <span>Try Closet Program Free</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
                  alt="Closet Program"
                  className="w-full h-full object-cover"
                />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors cursor-pointer group">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                    <div className="w-0 h-0 border-t-10 border-t-transparent border-l-16 border-l-primary border-b-10 border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <BentoCard glow className="text-center max-w-4xl mx-auto">
              <div className="p-12">
                <h2 className="heading-lg mb-4">Ready to Transform Your Space?</h2>
                <p className="text-xl text-neutral-600 mb-8">
                  Get a free quote and discover how YuDeZign can bring your vision to life
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact" className="btn-primary text-lg px-8 py-4">
                    Request Free Quote
                  </Link>
                  <Link to="/portfolio" className="btn-outline text-lg px-8 py-4">
                    View Our Work
                  </Link>
                </div>
              </div>
            </BentoCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
