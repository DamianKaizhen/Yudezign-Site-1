import { motion } from 'framer-motion';
import { Award, Users, Factory, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-24 bg-luxury-cream">
      {/* Hero Section - Minimal with green overlay */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1600"
            alt="YuDeZign Factory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/50 to-primary-dark/60"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.div
            className="w-16 h-1 bg-accent mx-auto mb-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 64, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-display-mobile md:text-display font-medium mb-6"
          >
            About YuDeZign
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg md:text-h4 font-light text-white/90"
          >
            Houston's premier European frameless cabinet manufacturer since 2015
          </motion.p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-30 px-4 bg-luxury-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-16 h-1 bg-primary mb-8"></div>
              <h2 className="text-display-mobile md:text-h1 font-medium text-luxury-gray-900 mb-8">Our Story</h2>
              <div className="space-y-6 text-body-lg text-luxury-gray-600 leading-relaxed">
                <p>
                  Founded in 2015, YuDeZign was born from a simple observation: homeowners and contractors in Houston
                  deserved better access to high-quality European cabinetry without the astronomical showroom markups.
                </p>
                <p>
                  We set out to combine Old World European craftsmanship with American efficiency and transparency.
                  By manufacturing locally in Houston and operating on a supply-only model, we've helped thousands
                  of customers transform their spaces with premium cabinets at honest prices.
                </p>
                <p>
                  Our commitment to 3/4&quot; plywood construction, frameless European design, and rapid 2-3 week turnaround
                  has made us the trusted choice for contractors, designers, and DIY homeowners across the Greater Houston area.
                </p>
                <p>
                  Today, we're proud to manufacture over 500 custom cabinet projects annually, maintaining the same
                  dedication to quality and customer service that defined our first installation.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] rounded-lg overflow-hidden"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800"
                alt="YuDeZign Workshop"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-30 px-4 bg-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { number: '9+', label: 'Years in Business' },
              { number: '500+', label: 'Projects Annually' },
              { number: '25+', label: 'Finish Options' },
              { number: '2-3', label: 'Week Turnaround' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-display-mobile md:text-hero-mobile font-light text-accent mb-3">{stat.number}</div>
                <div className="text-body-lg text-white/80 font-light">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-30 px-4 bg-luxury-beige">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
            <h2 className="text-display-mobile md:text-display font-medium text-luxury-gray-900 mb-6">Our Process</h2>
            <p className="text-body-lg text-luxury-gray-600 max-w-2xl mx-auto leading-relaxed">
              From your first inquiry to final installation, we've streamlined every step.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: 'Consultation',
                description: 'Share your vision, measurements, and timeline. We provide expert guidance on finishes and design.',
              },
              {
                icon: TrendingUp,
                title: 'Design & Quote',
                description: 'Use our KD Lite software or work with our team. Receive transparent pricing with no hidden fees.',
              },
              {
                icon: Factory,
                title: 'Manufacturing',
                description: 'We craft your cabinets in our Houston facility using premium 3/4&quot; plywood and European hardware.',
              },
              {
                icon: Award,
                title: 'Delivery',
                description: 'Choose assembled or flat-pack delivery. Your installer (or ours) completes the transformation.',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-8 text-center shadow-luxury hover:shadow-luxury-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <step.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-h4 font-medium text-luxury-gray-900 mb-3">{step.title}</h3>
                <p className="text-body text-luxury-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Supply-Only */}
      <section className="py-30 px-4 bg-luxury-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] rounded-lg overflow-hidden"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?w=800"
                alt="Cabinet Installation"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-16 h-1 bg-primary mb-8"></div>
              <h2 className="text-display-mobile md:text-h1 font-medium text-luxury-gray-900 mb-8">Why Supply-Only?</h2>
              <div className="space-y-6">
                <p className="text-body-lg text-luxury-gray-600 leading-relaxed">
                  Our supply-only model is designed to give you maximum flexibility and value.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-h4 text-luxury-gray-900 mb-2">Significant Cost Savings</h4>
                      <p className="text-body text-luxury-gray-600 leading-relaxed">
                        By eliminating installation services and showroom overhead, we pass 30-50% savings directly to you.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-h4 text-luxury-gray-900 mb-2">Work With Your Installer</h4>
                      <p className="text-body text-luxury-gray-600 leading-relaxed">
                        Many customers prefer using their trusted contractor. We support that relationship.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-h4 text-luxury-gray-900 mb-2">Installer Network Available</h4>
                      <p className="text-body text-luxury-gray-600 leading-relaxed">
                        Need an installer? We maintain relationships with experienced professionals throughout Houston.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-h4 text-luxury-gray-900 mb-2">Perfect for DIY</h4>
                      <p className="text-body text-luxury-gray-600 leading-relaxed">
                        Experienced DIYers love our flat-pack option with detailed assembly instructions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-30 px-4 bg-luxury-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
            <h2 className="text-display-mobile md:text-display font-medium text-luxury-gray-900 mb-6">Our Values</h2>
            <p className="text-body-lg text-luxury-gray-600 max-w-2xl mx-auto leading-relaxed">
              The principles that guide everything we do.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality First',
                description: 'We never compromise on materials or craftsmanship. Every cabinet is built to last decades.',
              },
              {
                title: 'Transparent Pricing',
                description: 'No hidden fees, no surprise charges. What you see is what you pay.',
              },
              {
                title: 'Customer Empowerment',
                description: 'From KD Lite software to expert consultations, we give you the tools to make informed decisions.',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-10 text-center shadow-luxury hover:shadow-luxury-lg transition-shadow duration-300"
              >
                <h3 className="text-h3 font-medium text-luxury-gray-900 mb-4">{value.title}</h3>
                <p className="text-body text-luxury-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
