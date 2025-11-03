import { motion } from 'framer-motion';
import { MousePointer, Eye, DollarSign, Download, Share2, FileText } from 'lucide-react';
import SEO from '../../components/SEO';

const KDLite = () => {
  const features = [
    {
      icon: MousePointer,
      title: 'Drag-and-Drop Interface',
      description: 'Intuitive design tools that anyone can use. No CAD experience required.',
    },
    {
      icon: Eye,
      title: '3D Visualization',
      description: 'See your closet design in real-time 3D. Rotate, zoom, and explore every detail.',
    },
    {
      icon: DollarSign,
      title: 'Instant Pricing',
      description: 'Get accurate quotes immediately as you design. No waiting, no surprises.',
    },
    {
      icon: Download,
      title: 'Direct Factory Ordering',
      description: 'Order your custom closet directly from our factory. Skip the middleman.',
    },
    {
      icon: Share2,
      title: 'Save and Share',
      description: 'Save your designs and share them with contractors or family members.',
    },
    {
      icon: FileText,
      title: 'Professional PDF Exports',
      description: 'Generate detailed cut lists and assembly instructions automatically.',
    },
  ];

  return (
    <>
      <SEO
        title="Free Closet Design Program - 3D Closet Designer"
        description="Design your custom closet for free with our KD-Lite Closet Program. 3D visualization, instant pricing, and direct factory ordering. No CAD experience required. Create your perfect closet system in Houston with drag-and-drop tools."
        keywords="closet design software, free closet designer, 3D closet tool, custom closet planner, closet configurator, online closet design, closet quote calculator"
        url="https://yudezign.com/kdlite"
      />
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
            Design Your Dream Closet in Minutes - <span className="text-accent">Free</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-neutral-200 max-w-3xl mx-auto mb-8"
          >
            KD Lite is our free closet design software. Create professional designs, get instant pricing, and order directly from our factory.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="https://kdlite.yfcad.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-8 py-4 inline-block"
            >
              Launch KD Lite Software
            </a>
            <p className="text-sm text-neutral-300 mt-4">No download required • Works in your browser</p>
          </motion.div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">See KD Lite in Action</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Watch how easy it is to design a custom closet with our intuitive software.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl"
          >
            <iframe
              src="https://www.youtube.com/embed/kXwi2MEN55A"
              title="KD Lite Closet Design Program Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">Powerful Features, Simple to Use</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Professional-grade design tools at your fingertips.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-lg mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">How It Works</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              From concept to completion in just a few simple steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Measure Your Space',
                description: 'Enter your closet dimensions into KD Lite.',
              },
              {
                step: '02',
                title: 'Design & Customize',
                description: 'Drag and drop components. Choose finishes and hardware.',
              },
              {
                step: '03',
                title: 'Get Instant Quote',
                description: 'See real-time pricing as you design. No hidden fees.',
              },
              {
                step: '04',
                title: 'Order & Install',
                description: 'Place your order. We manufacture and deliver in 2-3 weeks.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-white rounded-full text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Advantage Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-lg mb-6">Save 20% with Our Showroom Discount</h2>
              <p className="text-xl text-neutral-200 mb-6">
                Design with KD Lite and visit our Houston showroom to receive an exclusive 20% discount on your order.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-neutral-200">No pressure sales - design at your own pace</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-neutral-200">See actual finish samples in person</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-neutral-200">Get expert advice from our design team</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-neutral-200">Finalize your design with professional assistance</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card bg-white text-neutral-900 p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Price Comparison</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-neutral-200">
                  <span className="text-neutral-600">Typical Closet Retailers</span>
                  <span className="text-2xl font-bold text-neutral-400">$5,000</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-neutral-200">
                  <span className="text-neutral-600">YuDeZign Supply-Only</span>
                  <span className="text-2xl font-bold text-neutral-700">$3,500</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b-2 border-primary">
                  <span className="font-semibold text-primary">With 20% Showroom Discount</span>
                  <span className="text-3xl font-bold text-primary">$2,800</span>
                </div>
                <div className="bg-accent/10 p-4 rounded-lg mt-4">
                  <p className="text-center font-bold text-accent text-xl">Save $2,200!</p>
                  <p className="text-center text-sm text-neutral-600 mt-1">On a typical 10' closet system</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="heading-lg mb-4">Ready to Design Your Dream Closet?</h2>
            <p className="text-xl text-neutral-600 mb-8">
              Start designing for free today. No credit card required.
            </p>
            <a
              href="https://kdlite.yfcad.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4 inline-block"
            >
              Launch KD Lite Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default KDLite;
