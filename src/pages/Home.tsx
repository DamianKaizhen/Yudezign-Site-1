import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, Package, Ruler, Wrench, Star, Quote } from 'lucide-react';
import { InView } from '../components/ui/InViewAnimations';
import { ImageCard, SpecCard } from '../components/ui/MinimalCard';
import { projects } from '../data/projects';
import { testimonials } from '../data/testimonials';
import SEO from '../components/SEO';

const Home = () => {
  const featuredProjects = projects.slice(0, 4);
  const { scrollY } = useScroll();

  // Parallax effect - image moves slower than scroll
  const imageY = useTransform(scrollY, [0, 1000], [0, 200]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.3, 0.7]);

  return (
    <>
      <SEO
        title="Custom European Frameless Cabinets | Houston"
        description="Premium custom European frameless cabinets manufactured in Houston. Kitchen cabinets, closets, vanities & custom cabinetry. 3/4 plywood construction, 25+ finishes, 2-3 week turnaround. Supply-only pricing."
        keywords="european cabinets, frameless cabinets, custom cabinets houston, kitchen cabinets, closet cabinets, vanities, cabinet supply, houston cabinetry, plywood cabinets, luxury cabinets"
        url="https://yudezign.com"
      />
      <div className="min-h-screen bg-luxury-cream">

      {/* HERO - Full viewport with parallax animation */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background image with parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1600&q=90"
            alt="Custom European Cabinets"
            className="w-full h-[120vh] object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>

        {/* Gradient overlay that darkens on scroll */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-primary/10"
          style={{ opacity: overlayOpacity }}
        />

        {/* Animated floating geometric shapes */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Large circle - top right */}
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 rounded-full border border-white/10"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Medium circle - bottom left */}
          <motion.div
            className="absolute bottom-40 left-40 w-64 h-64 rounded-full border border-accent/20"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.4, 0.2],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Small accent circle - mid right */}
          <motion.div
            className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-accent/10 backdrop-blur-sm"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Decorative lines */}
          <motion.div
            className="absolute top-1/3 left-10 w-64 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              scaleX: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Subtle animated gradient for depth */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10"
          animate={{
            background: [
              'linear-gradient(to bottom right, rgba(15,76,58,0.2), transparent, rgba(212,165,116,0.1))',
              'linear-gradient(to bottom right, rgba(15,76,58,0.15), transparent, rgba(212,165,116,0.15))',
              'linear-gradient(to bottom right, rgba(15,76,58,0.2), transparent, rgba(212,165,116,0.1))',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
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
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              Custom European
              <br />
              <span className="relative inline-block">
                Cabinets
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
            className="text-body-lg md:text-h3 font-light mb-12 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            Crafted in Houston
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.9,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to="/portfolio"
                className="inline-block px-12 py-4 bg-primary text-white text-body-lg font-medium rounded-md hover:bg-primary-light transition-all duration-300 shadow-luxury-lg hover:shadow-luxury-xl border border-primary-light/30 relative overflow-hidden group"
              >
                <span className="relative z-10">View Portfolio</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-light to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </Link>
            </motion.div>
          </motion.div>
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
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1600&q=90"
            alt="YuDeZign Craftsmanship"
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

    </div>
    </>
  );
};

export default Home;
