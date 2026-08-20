import React from 'react';
import { CheckCircle, ArrowRight, Phone, Images } from 'lucide-react';
import type { ServiceData } from '../../../types';

interface ServiceHeroProps {
  service: ServiceData;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({ service }) => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <div className="w-16 h-1 bg-accent mb-8"></div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {service.name}
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {service.overview}
            </p>

            {/* Key Features */}
            {service.features && service.features.length > 0 && (
              <div className="space-y-3 mb-8">
                {service.features.slice(0, 4).map((feature: any, idx: number) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">{typeof feature === 'string' ? feature : feature.title}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="tel:+17135020399"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
              >
                <Phone className="mr-2 w-5 h-5" />
                (713) 502-0399
              </a>
              {service.portfolioCategory && (
                <a
                  href={`/portfolio/${service.portfolioCategory}`}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
                >
                  <Images className="mr-2 w-5 h-5" />
                  View Our Work
                </a>
              )}
            </div>

            {/* Price Range */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">Starting From</div>
                  <div className="text-2xl font-bold text-accent">Contact for Quote</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Typical Timeline</div>
                  <div className="text-2xl font-bold text-white">2-4 weeks</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[500px]">
              <img
                src={service.heroImage}
                alt={service.name}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
