import React from 'react';
import { Home, TrendingUp, Users, DollarSign } from 'lucide-react';
import type { LocationData } from '../../../types';

interface NeighborhoodSectionProps {
  location: LocationData;
}

const NeighborhoodSection: React.FC<NeighborhoodSectionProps> = ({ location }) => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Neighborhoods We Serve in {location.city}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Trusted by homeowners across {location.city}'s finest communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {location.neighborhoods.map((neighborhood, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-slate-200 hover:border-amber-600 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 group-hover:text-amber-600 transition-colors">
                    {neighborhood}
                  </h3>
                  <p className="text-sm text-slate-600">{location.city}, TX</p>
                </div>
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-600 transition-colors">
                  <Home className="w-5 h-5 text-amber-600 group-hover:text-white" />
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-slate-400" />
                  <span>Family-friendly community</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-slate-400" />
                  <span>Growing neighborhood</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-slate-400" />
                  <span>Excellent value</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500">
                  Expert cabinet installation • Free consultation
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Service Area Note */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white rounded-xl px-6 py-4 shadow-md border border-amber-600">
            <p className="text-slate-700">
              <strong>Don't see your neighborhood?</strong> We serve all of {location.city} and surrounding areas.{' '}
              <a href="/contact" className="text-amber-600 hover:text-amber-700 font-semibold">
                Contact us
              </a>{' '}
              to confirm service availability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodSection;
