import React from 'react';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import type { LocationData } from '../../../types';

interface LocationHeroProps {
  location: LocationData;
}

const LocationHero: React.FC<LocationHeroProps> = ({ location }) => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] bg-repeat opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <MapPin className="w-5 h-5 mr-2 text-accent" />
              <span className="text-sm font-medium">Serving {location.name}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Custom Cabinets in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                {location.name}, Texas
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {location.metaDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="tel:2815688000"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
              >
                <Phone className="mr-2 w-5 h-5" />
                (281) 568-8000
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-12 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold text-accent">500+</div>
                <div className="text-sm text-slate-300 mt-1">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">15+</div>
                <div className="text-sm text-slate-300 mt-1">Years</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">5★</div>
                <div className="text-sm text-slate-300 mt-1">Rated</div>
              </div>
            </div>
          </div>

          {/* Image/Map Placeholder */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 bg-slate-700 rounded-2xl overflow-hidden shadow-2xl">
              <div className="w-full h-96 bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400">
                    {location.name} Map Placeholder
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-2xl max-w-xs">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <div className="text-sm text-slate-600">Service Area</div>
                  <div className="font-semibold text-slate-900">{location.name} & Surrounding</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {location.neighborhoods.length} neighborhoods
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationHero;
