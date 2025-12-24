import React from 'react';
import { CheckCircle, ArrowRight, Phone } from 'lucide-react';
import type { ServiceData } from '../../../types';

interface ServiceHeroProps {
  service: ServiceData;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({ service }) => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <div className="inline-block bg-amber-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {service.category}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {service.title}
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {service.description}
            </p>

            {/* Key Features */}
            <div className="space-y-3 mb-8">
              {service.features.slice(0, 4).map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-amber-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="tel:7135550123"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
              >
                <Phone className="mr-2 w-5 h-5" />
                (713) 555-0123
              </a>
            </div>

            {/* Price Range */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">Starting From</div>
                  <div className="text-2xl font-bold text-amber-400">{service.priceRange}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Typical Timeline</div>
                  <div className="text-2xl font-bold text-white">6-8 weeks</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 bg-slate-700 rounded-2xl overflow-hidden shadow-2xl">
              <div className="w-full h-96 bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-slate-400 text-lg">
                    {service.title} Image
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
