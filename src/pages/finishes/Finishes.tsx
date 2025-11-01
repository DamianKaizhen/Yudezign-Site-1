import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import FinishSwatch from '../../components/ui/FinishSwatch';
import { finishes } from '../../data/finishes';
import type { Finish } from '../../types';

type FinishFilter = 'all' | 'melamine' | 'laminate' | 'acrylic' | 'wood-grain';

const Finishes = () => {
  const [activeFilter, setActiveFilter] = useState<FinishFilter>('all');
  const [selectedFinish, setSelectedFinish] = useState<Finish | null>(null);

  const filters: { label: string; value: FinishFilter }[] = [
    { label: 'All Finishes', value: 'all' },
    { label: 'Melamine', value: 'melamine' },
    { label: 'Laminate', value: 'laminate' },
    { label: 'Acrylic High Gloss', value: 'acrylic' },
    { label: 'Wood Grain', value: 'wood-grain' },
  ];

  const filteredFinishes = activeFilter === 'all'
    ? finishes
    : finishes.filter((finish) => finish.type === activeFilter);

  return (
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
            Choose from 25+ premium finishes. All cabinets built with 3/4&quot; plywood for lasting quality.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-40 bg-luxury-beige/95 backdrop-blur-sm border-b border-luxury-sand py-6 shadow-luxury-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <motion.button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-8 py-2.5 rounded-md font-medium transition-all duration-300 ${
                  activeFilter === filter.value
                    ? 'bg-primary text-white shadow-luxury'
                    : 'bg-white text-luxury-gray-600 hover:bg-luxury-gray-50 hover:text-primary border border-luxury-gray-100'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {filter.label}
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
                    isSelected={selectedFinish?.id === finish.id}
                    onClick={() => setSelectedFinish(finish)}
                  />
                </motion.div>
              ))}
            </div>
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
                <h3 className="text-h3 font-medium text-luxury-gray-900">3/4&quot; Plywood Construction</h3>
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
    </div>
  );
};

export default Finishes;
