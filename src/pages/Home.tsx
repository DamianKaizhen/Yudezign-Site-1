import { Link } from 'react-router-dom';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Clock, Package, Ruler, Wrench, Star, Quote } from 'lucide-react';
import { InView } from '../components/ui/InViewAnimations';
import { ImageCard, SpecCard } from '../components/ui/MinimalCard';
import { StickyPhoneButton } from '../components/ui/StickyPhoneButton';
import { ProjectModal } from '../components/ui/ProjectModal';
import { projects } from '../data/projects';
import { testimonials } from '../data/testimonials';
import SEO from '../components/SEO';
import { useEffect, useState } from 'react';
import type { Project } from '../types';

const Home = () => {
  const featuredProjects = projects.slice(0, 4);

  // Mouse tracking for interactive animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for cursor tracking
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Hero cursor reveal effect
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });

  // Project modal state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Wait for animation to complete before clearing project
    setTimeout(() => setSelectedProject(null), 300);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalize to -1 to 1 range for geometric shapes
      mouseX.set((clientX / innerWidth - 0.5) * 2);
      mouseY.set((clientY / innerHeight - 0.5) * 2);

      // Track cursor position for hero reveal effect (in percentage)
      setCursorPosition({
        x: (clientX / innerWidth) * 100,
        y: (clientY / innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <SEO
        title="Custom European Frameless Cabinets | Houston"
        description="Premium custom European frameless cabinets manufactured in Houston. Kitchen cabinets, closets, vanities & custom cabinetry. 3/4 plywood construction, 25+ finishes, 2-3 week turnaround. Supply-only pricing."
        keywords="european cabinets, frameless cabinets, custom cabinets houston, kitchen cabinets, closet cabinets, vanities, cabinet supply, houston cabinetry, plywood cabinets, luxury cabinets"
        url="https://yudezign.com"
      />
      <div className="min-h-screen bg-luxury-cream">

      {/* HERO - Full viewport with cursor reveal effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Base kitchen image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920&q=90"
            alt="European Frameless Kitchen"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Green overlay with cursor reveal effect */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0a1f1a] via-[#0f4c3a] to-[#1a2f2a] transition-all duration-100"
          style={{
            maskImage: `radial-gradient(circle 200px at ${cursorPosition.x}% ${cursorPosition.y}%, transparent 0%, transparent 100px, black 200px)`,
            WebkitMaskImage: `radial-gradient(circle 200px at ${cursorPosition.x}% ${cursorPosition.y}%, transparent 0%, transparent 100px, black 200px)`,
          }}
        />

        {/* Noise/grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />

        {/* Interactive cursor-responsive geometric shapes */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Large circle - top right - responds to cursor */}
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 rounded-full border-2 border-white/20 shadow-[0_0_80px_rgba(212,165,116,0.2)]"
            style={{
              x: useTransform(smoothMouseX, [-1, 1], [-30, 30]),
              y: useTransform(smoothMouseY, [-1, 1], [-30, 30]),
            }}
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              scale: { duration: 20, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            }}
          />

          {/* Medium circle - bottom left - opposite cursor movement */}
          <motion.div
            className="absolute bottom-40 left-40 w-64 h-64 rounded-full border-2 border-accent/30 backdrop-blur-sm bg-accent/5"
            style={{
              x: useTransform(smoothMouseX, [-1, 1], [20, -20]),
              y: useTransform(smoothMouseY, [-1, 1], [20, -20]),
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Small accent circle - mid right - faster cursor response */}
          <motion.div
            className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 backdrop-blur-md shadow-[0_0_60px_rgba(212,165,116,0.3)]"
            style={{
              x: useTransform(smoothMouseX, [-1, 1], [-50, 50]),
              y: useTransform(smoothMouseY, [-1, 1], [-50, 50]),
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          />

          {/* Additional animated circle - top left */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full border border-white/10"
            style={{
              x: useTransform(smoothMouseX, [-1, 1], [15, -15]),
              y: useTransform(smoothMouseY, [-1, 1], [15, -15]),
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />

          {/* Decorative animated lines */}
          <motion.div
            className="absolute top-1/3 left-10 w-72 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{
              x: useTransform(smoothMouseX, [-1, 1], [-10, 10]),
            }}
            animate={{
              scaleX: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-1/3 right-10 w-56 h-px bg-gradient-to-l from-transparent via-accent/40 to-transparent"
            style={{
              x: useTransform(smoothMouseX, [-1, 1], [10, -10]),
            }}
            animate={{
              scaleX: [0.9, 1.1, 0.9],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </motion.div>

        {/* Hero content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          {/* Trust Bar */}
          <motion.div
            className="mb-8 text-sm md:text-base font-medium text-white/90 flex flex-wrap items-center justify-center gap-4 md:gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Serving Houston Since 2019
            </span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Frameless Cabinets
            </span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              2-3 Week Lead Time
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <motion.h1
              className="text-hero-mobile md:text-hero mb-6 font-light leading-tight"
            >
              Custom Frameless Cabinets
              <br />
              <span className="relative inline-block">
                Precision Crafted in Houston
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-accent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-body-lg md:text-h3 font-light mb-6 text-white/95"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            Residential and Commercial Projects
            <br />
            Built locally, designed for luxury.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1.1,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to="/contact"
                className="inline-block px-12 py-4 bg-accent text-primary-dark text-body-lg font-semibold rounded-md hover:bg-accent/90 transition-all duration-300 shadow-luxury-lg hover:shadow-luxury-xl relative overflow-hidden group"
              >
                <span className="relative z-10">Start Your Project</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent/90 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to="/portfolio"
                className="inline-block px-12 py-4 bg-white/10 backdrop-blur-sm text-white text-body-lg font-medium rounded-md hover:bg-white/20 transition-all duration-300 shadow-luxury border border-white/30 relative overflow-hidden group"
              >
                <span className="relative z-10">View Our Work</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* VALUE PROPOSITION TRINITY - Three key differentiators */}
      <section className="py-20 px-4 bg-luxury-white -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 2-3 Week Delivery */}
            <InView variant="fadeUp">
              <motion.div
                className="bg-white rounded-lg p-8 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 border border-luxury-sand text-center group"
                whileHover={{ y: -8 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-h3 font-medium text-luxury-gray-900 mb-3">2-3 Week Delivery</h3>
                <p className="text-body text-luxury-gray-600 leading-relaxed">
                  Lightning-fast turnaround compared to the industry standard of 8-12 weeks. Your project completed when you need it.
                </p>
              </motion.div>
            </InView>

            {/* European Frameless Design */}
            <InView variant="fadeUp">
              <motion.div
                className="bg-white rounded-lg p-8 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 border border-luxury-sand text-center group"
                whileHover={{ y: -8 }}
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-h3 font-medium text-luxury-gray-900 mb-3">European Frameless Design</h3>
                <p className="text-body text-luxury-gray-600 leading-relaxed">
                  Premium construction with 15% more storage space. Modern, seamless aesthetics that maximize every inch.
                </p>
              </motion.div>
            </InView>

            {/* Houston Made, Houston Proud */}
            <InView variant="fadeUp">
              <motion.div
                className="bg-white rounded-lg p-8 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 border border-luxury-sand text-center group"
                whileHover={{ y: -8 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-h3 font-medium text-luxury-gray-900 mb-3">Houston Made, Houston Proud</h3>
                <p className="text-body text-luxury-gray-600 leading-relaxed">
                  Local crafting means no shipping delays, personalized service, and support for Houston businesses.
                </p>
              </motion.div>
            </InView>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY - Centered, spacious */}
      <section className="py-30 px-4 bg-luxury-white">
        <div className="max-w-2xl mx-auto text-center">
          <InView variant="fadeUp">
            <p className="text-h2 md:text-display-mobile font-light text-luxury-gray-900 leading-relaxed">
              We craft custom frameless cabinets with European precision and Houston efficiency.
            </p>
          </InView>

          <InView variant="fadeUp">
            <div className="mt-8">
              <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-body-lg text-luxury-gray-600 leading-relaxed">
                Every cabinet is built to your exact specifications using premium 3/4" plywood, never particle board.
                Delivered in 2-3 weeks, not months.
              </p>
            </div>
          </InView>
        </div>
      </section>

      {/* FEATURED WORK - Clean grid */}
      <section className="py-30 px-4 bg-luxury-beige">
        <div className="max-w-7xl mx-auto">
          <InView variant="fadeUp">
            <div className="text-center mb-16">
              <span className="text-label text-primary mb-4 block">Featured Work</span>
              <h2 className="text-display-mobile md:text-display font-medium text-luxury-gray-900">
                Recent Projects
              </h2>
            </div>
          </InView>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <InView key={project.id} variant="fadeUp" delay={index * 0.1}>
                <ImageCard
                  image={project.images[0] || project.thumbnail}
                  title={project.title}
                  subtitle={project.location}
                  onClick={() => handleProjectClick(project)}
                />
              </InView>
            ))}
          </div>

          <InView variant="fadeUp">
            <div className="text-center mt-16">
              <Link
                to="/portfolio"
                className="inline-block px-10 py-3 bg-primary text-white text-body font-medium rounded-md hover:bg-primary-light transition-all duration-300 shadow-luxury"
              >
                View All Projects
              </Link>
            </div>
          </InView>
        </div>
      </section>

      {/* TESTIMONIALS - Customer Reviews */}
      {testimonials.length > 0 && (
        <section className="py-30 px-4 bg-luxury-white">
          <div className="max-w-7xl mx-auto">
            <InView variant="fadeUp">
              <div className="text-center mb-16">
                <span className="text-label text-primary mb-4 block">Client Reviews</span>
                <h2 className="text-display-mobile md:text-display font-medium text-luxury-gray-900">
                  What Our Clients Say
                </h2>
              </div>
            </InView>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <InView key={testimonial.id} variant="fadeUp" delay={index * 0.1}>
                  <div className="bg-luxury-cream rounded-xl p-8 shadow-luxury hover:shadow-luxury-lg transition-shadow duration-300 border border-luxury-sand/30 h-full flex flex-col">
                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= testimonial.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-luxury-gray-200 text-luxury-gray-200'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Quote Icon */}
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />

                    {/* Testimonial Content */}
                    <p className="text-body text-luxury-gray-700 leading-relaxed mb-8 flex-grow italic">
                      "{testimonial.content}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 pt-6 border-t border-luxury-sand">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-luxury-gray-900">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-luxury-gray-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    {/* Project Image if available */}
                    {testimonial.projectImage && (
                      <div className="mt-6 -mx-8 -mb-8">
                        <img
                          src={testimonial.projectImage}
                          alt="Project"
                          className="w-full h-48 object-cover rounded-b-xl"
                        />
                      </div>
                    )}
                  </div>
                </InView>
              ))}
            </div>

            {testimonials.length > 3 && (
              <InView variant="fadeUp">
                <div className="text-center mt-16">
                  <p className="text-body text-luxury-gray-600">
                    And {testimonials.length - 3} more satisfied clients
                  </p>
                </div>
              </InView>
            )}
          </div>
        </section>
      )}

      {/* SPECIFICATIONS - Icon row */}
      <section className="py-30 px-4 bg-luxury-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            <InView variant="fadeUp" delay={0}>
              <SpecCard
                icon={<Clock className="w-full h-full" strokeWidth={1.5} />}
                title="2-3 Weeks"
                description="Fast local crafting, no overseas delays"
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
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1600&q=90"
            alt="Modern Frameless Kitchen Craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-accent/30"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <InView variant="fadeUp">
            <div className="mb-6">
              <div className="w-16 h-1 bg-accent mx-auto mb-8"></div>
            </div>
            <p className="text-display-mobile md:text-display font-light leading-tight mb-6">
              "Built to last decades, not years."
            </p>
            <p className="text-body-lg text-white/80">
              Premium craftsmanship, European design, Houston made.
            </p>
          </InView>
        </div>
      </section>

      {/* CALL TO ACTION - Simple, elegant */}
      <section className="py-30 px-4 bg-luxury-cream">
        <div className="max-w-4xl mx-auto">
          <InView variant="fadeUp">
            <div className="bg-white rounded-2xl shadow-luxury-lg p-12 md:p-16 text-center border border-luxury-sand">
              <div className="mb-6">
                <div className="w-16 h-1 bg-primary mx-auto"></div>
              </div>

              <h2 className="text-display-mobile md:text-display font-medium text-luxury-gray-900 mb-6">
                Begin Your Project
              </h2>

              <p className="text-body-lg text-luxury-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Get a free quote and discover how YuDezign can bring your vision to life with
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
                  href="tel:+12815688000"
                  className="inline-block px-12 py-4 border-2 border-primary text-primary text-body-lg font-medium rounded-md hover:bg-primary hover:text-white transition-all duration-300"
                >
                  (281) 568-8000
                </a>
              </div>

              <div className="mt-12 pt-8 border-t border-luxury-gray-100">
                <p className="text-body text-luxury-gray-500">
                  <a href="mailto:orders@yudezign.com" className="hover:text-primary transition-colors font-medium">
                    orders@yudezign.com
                  </a>
                </p>
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* Sticky Mobile Click-to-Call Button */}
      <StickyPhoneButton phoneNumber="(281) 568-8000" showAfterScroll={300} />

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

    </div>
    </>
  );
};

export default Home;
