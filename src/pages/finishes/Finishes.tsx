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
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="heading-xl mb-4"
          >
            Finishes & Materials
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-neutral-200 max-w-2xl mx-auto"
          >
            Choose from 25+ premium finishes. All cabinets built with 3/4" plywood for lasting quality.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-40 bg-white shadow-md py-4">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeFilter === filter.value
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Finishes Grid */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
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
                  transition={{ duration: 0.5, delay: index * 0.05 }}
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
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">Premium Materials</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              We use only the highest quality materials to ensure your cabinets last for decades.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 3/4" Plywood */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card p-8"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900">3/4" Plywood Construction</h3>
              </div>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Superior strength and durability</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Resists warping and sagging over time</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Better screw holding power for hardware</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Environmentally friendly with wood veneers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Premium material standard in European cabinetry</span>
                </li>
              </ul>
            </motion.div>

            {/* European Frameless Design */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card p-8"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900">Frameless European Design</h3>
              </div>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Modern, sleek appearance with clean lines</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Maximized interior storage space</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Full-overlay doors for seamless look</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Easier to clean with no face frames</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Contemporary European style and engineering</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hardware Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">Premium Hardware Options</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Complete your cabinets with high-quality hardware and accessories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card p-6"
            >
              <h3 className="text-xl font-bold mb-3 text-neutral-900">Soft-Close Mechanisms</h3>
              <p className="text-neutral-600">
                All cabinets include premium soft-close hinges and drawer slides for quiet, smooth operation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card p-6"
            >
              <h3 className="text-xl font-bold mb-3 text-neutral-900">Handle Styles</h3>
              <p className="text-neutral-600">
                Choose from modern pulls, classic knobs, or integrated handles to match your design aesthetic.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card p-6"
            >
              <h3 className="text-xl font-bold mb-3 text-neutral-900">Organizers & Accessories</h3>
              <p className="text-neutral-600">
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
