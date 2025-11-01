import { motion } from 'framer-motion';
import { Award, Users, Factory, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1600"
            alt="YuDeZign Factory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 container-custom">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="heading-xl mb-4"
          >
            About YuDeZign
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-neutral-200 max-w-3xl mx-auto"
          >
            Houston's premier European frameless cabinet manufacturer since 2015
          </motion.p>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-lg mb-6">Our Story</h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
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
                  Our commitment to 3/4" plywood construction, frameless European design, and rapid 2-3 week turnaround
                  has made us the trusted choice for contractors, designers, and DIY homeowners across the Greater Houston area.
                </p>
                <p>
                  Today, we're proud to manufacture over 500 custom cabinet projects annually, maintaining the same
                  dedication to quality and customer service that defined our first installation.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 rounded-lg overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800"
                alt="YuDeZign Workshop"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-accent mb-2">{stat.number}</div>
                <div className="text-lg text-neutral-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">Our Process</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
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
                description: 'We craft your cabinets in our Houston facility using premium 3/4" plywood and European hardware.',
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Supply-Only */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 rounded-lg overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?w=800"
                alt="Cabinet Installation"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-lg mb-6">Why Supply-Only?</h2>
              <div className="space-y-4 text-neutral-700">
                <p className="text-lg">
                  Our supply-only model is designed to give you maximum flexibility and value.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Significant Cost Savings</h4>
                      <p className="text-neutral-600">
                        By eliminating installation services and showroom overhead, we pass 30-50% savings directly to you.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Work With Your Installer</h4>
                      <p className="text-neutral-600">
                        Many customers prefer using their trusted contractor. We support that relationship.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Installer Network Available</h4>
                      <p className="text-neutral-600">
                        Need an installer? We maintain relationships with experienced professionals throughout Houston.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Perfect for DIY</h4>
                      <p className="text-neutral-600">
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
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">Our Values</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-8 text-center"
              >
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">{value.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
