import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Wand2, ArrowRight } from 'lucide-react';
import FinishSwatch from '../../components/ui/FinishSwatch';
import { finishes } from '../../data/finishes';
import { finishStyles } from '../../data/finishStyles';
import { getVisibleStyles, getFinishesGroupedByStyle } from '../../lib/utils/finishesUtils';
import SEO from '../../components/SEO';

const Finishes = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Get visible styles for filtering
  const visibleStyles = getVisibleStyles(finishStyles);

  // Get finishes grouped by style
  const groupedFinishes = getFinishesGroupedByStyle(finishes, visibleStyles);

  // Filter finishes based on active filter
  const filteredFinishes = activeFilter === 'all'
    ? finishes
    : finishes.filter((finish) => finish.styleId === activeFilter);

  return (
    <>
      <SEO
        title="Finishes & Materials - 25+ Premium Cabinet Finishes"
        description="Browse our collection of 25+ premium cabinet finishes and materials. European-quality woods, laminates, and specialty finishes for custom frameless cabinets. Matte, gloss, and textured options available in Houston."
        keywords="cabinet finishes, wood finishes, laminate cabinets, cabinet colors, european finishes, matte cabinets, gloss cabinets, luxury cabinet finishes"
        url="https://yudezign.com/finishes"
      />
      <div className="min-h-screen pt-24 bg-luxury-cream">
      {/* Hero Section - Minimal with green accent */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
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
            Finishes & Materials
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg md:text-h4 font-light text-white/90 max-w-2xl mx-auto"
          >
            Choose from 25+ premium finishes. All cabinets built with 3/4" plywood for lasting quality.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-40 bg-luxury-beige/95 backdrop-blur-sm border-b border-luxury-sand py-6 shadow-luxury-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {/* All Finishes button */}
            <motion.button
              onClick={() => setActiveFilter('all')}
              className={`px-8 py-2.5 rounded-md font-medium transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-primary text-white shadow-luxury'
                  : 'bg-white text-luxury-gray-600 hover:bg-luxury-gray-50 hover:text-primary border border-luxury-gray-100'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              All Finishes
            </motion.button>

            {/* Dynamic style filter buttons */}
            {visibleStyles.map((style) => (
              <motion.button
                key={style.id}
                onClick={() => setActiveFilter(style.id)}
                className={`px-8 py-2.5 rounded-md font-medium transition-all duration-300 ${
                  activeFilter === style.id
                    ? 'bg-primary text-white shadow-luxury'
                    : 'bg-white text-luxury-gray-600 hover:bg-luxury-gray-50 hover:text-primary border border-luxury-gray-100'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {style.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Finishes Grid */}
      <section className="py-30 px-4 bg-luxury-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {activeFilter === 'all' ? (
              // Show grouped by style when "All Finishes" is selected
              <div className="space-y-20">
                {Array.from(groupedFinishes.entries()).map(([style, styleFinishes]) => (
                  <div key={style.id}>
                    {/* Style Header */}
                    <div className="mb-10 text-center">
                      <h2 className="text-h2 font-medium text-luxury-gray-900 mb-3">
                        {style.name}
                      </h2>
                      {style.description && (
                        <p className="text-body text-luxury-gray-600 max-w-2xl mx-auto">
                          {style.description}
                        </p>
                      )}
                    </div>

                    {/* Finishes Grid for this style */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {styleFinishes.map((finish, index) => (
                        <motion.div
                          key={finish.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.05 }}
                        >
                          <FinishSwatch
                            finish={finish}
                            enableLightbox={true}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Show flat grid when a specific style is selected
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredFinishes.map((finish, index) => (
                  <motion.div
                    key={finish.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    <FinishSwatch
                      finish={finish}
                      enableLightbox={true}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Materials Section */}
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
            <h2 className="text-display-mobile md:text-display font-medium text-luxury-gray-900 mb-6">Premium Materials</h2>
            <p className="text-body-lg text-luxury-gray-600 max-w-2xl mx-auto leading-relaxed">
              We use only the highest quality materials to ensure your cabinets last for decades.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 3/4" Plywood */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg p-10 shadow-luxury hover:shadow-luxury-lg transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-h3 font-medium text-luxury-gray-900">3/4" Plywood Construction</h3>
              </div>
              <ul className="space-y-4 text-body text-luxury-gray-600 leading-relaxed">
                <li className="flex items-start space-x-3">
                  <span className="text-primary mt-1 font-bold">•</span>
                  <span>Superior strength and durability</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary mt-1 font-bold">•</span>
                  <span>Resists warping and sagging over time</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary mt-1 font-bold">•</span>
                  <span>Better screw holding power for hardware</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary mt-1 font-bold">•</span>
                  <span>Environmentally friendly with wood veneers</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary mt-1 font-bold">•</span>
                  <span>Premium material standard in European cabinetry</span>
                </li>
              </ul>
            </motion.div>

            {/* European Frameless Design */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg p-10 shadow-luxury hover:shadow-luxury-lg transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-h3 font-medium text-luxury-gray-900">Frameless European Design</h3>
              </div>
              <ul className="space-y-4 text-body text-luxury-gray-600 leading-relaxed">
                <li className="flex items-start space-x-3">
                  <span className="text-primary mt-1 font-bold">•</span>
                  <span>Modern, sleek appearance with clean lines</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary mt-1 font-bold">•</span>
                  <span>Maximized interior storage space</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary mt-1 font-bold">•</span>
                  <span>Full-overlay doors for seamless look</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary mt-1 font-bold">•</span>
                  <span>Easier to clean with no face frames</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary mt-1 font-bold">•</span>
                  <span>Contemporary European style and engineering</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hardware Section */}
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
            <h2 className="text-display-mobile md:text-display font-medium text-luxury-gray-900 mb-6">Premium Hardware Options</h2>
            <p className="text-body-lg text-luxury-gray-600 max-w-2xl mx-auto leading-relaxed">
              Complete your cabinets with high-quality hardware and accessories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg p-8 shadow-luxury hover:shadow-luxury-lg transition-shadow duration-300"
            >
              <h3 className="text-h4 font-medium mb-4 text-luxury-gray-900">Soft-Close Mechanisms</h3>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                All cabinets include premium soft-close hinges and drawer slides for quiet, smooth operation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg p-8 shadow-luxury hover:shadow-luxury-lg transition-shadow duration-300"
            >
              <h3 className="text-h4 font-medium mb-4 text-luxury-gray-900">Handle Styles</h3>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                Choose from modern pulls, classic knobs, or integrated handles to match your design aesthetic.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg p-8 shadow-luxury hover:shadow-luxury-lg transition-shadow duration-300"
            >
              <h3 className="text-h4 font-medium mb-4 text-luxury-gray-900">Organizers & Accessories</h3>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                Maximize functionality with pull-out shelves, spice racks, cutlery dividers, and more.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Room Visualizer CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Wand2 className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-h2 md:text-display-mobile font-medium mb-4">
              See These Finishes in Your Room
            </h2>
            <p className="text-body-lg text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Love what you see? Upload a photo of your kitchen, bathroom, or any room and our AI will show you exactly how these finishes will look in your space.
            </p>
            <Link
              to="/visualizer"
              className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Try the Free Room Visualizer
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Finishes;
