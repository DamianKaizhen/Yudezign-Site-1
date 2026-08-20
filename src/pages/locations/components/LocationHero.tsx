import React from 'react';
import { Phone, ArrowRight, MapPin, Home, Truck } from 'lucide-react';
import type { LocationData } from '../../../types';

interface LocationHeroProps {
  location: LocationData;
}

const LocationHero: React.FC<LocationHeroProps> = ({ location }) => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white py-20 overflow-hidden">
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <div className="w-16 h-1 bg-accent mb-8"></div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Custom Cabinets in <br />
              <span className="text-white">
                {location.name}, Texas
              </span>
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
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
                href="tel:+17135020399"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
              >
                <Phone className="mr-2 w-5 h-5" />
                (713) 502-0399
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-12 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold text-accent">500+</div>
                <div className="text-sm text-white/90 mt-1">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">15+</div>
                <div className="text-sm text-white/90 mt-1">Years</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">5★</div>
                <div className="text-sm text-white/90 mt-1">Rated</div>
              </div>
            </div>
          </div>

          {/* Service Area Info Card */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-10 h-10 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Proudly Serving {location.name}
                </h2>
                <p className="text-white/80">
                  & {location.neighborhoods.length} surrounding neighborhoods
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center bg-white/10 rounded-lg p-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-white">In-Home Consultations</div>
                    <div className="text-sm text-white/70">We come to you for free design meetings</div>
                  </div>
                </div>

                <div className="flex items-center bg-white/10 rounded-lg p-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-white">Professional Installation</div>
                    <div className="text-sm text-white/70">Expert installation by our local team</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20 text-center">
                <p className="text-white/80 text-sm">
                  Houston-based workshop • Local expertise since 2009
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationHero;
