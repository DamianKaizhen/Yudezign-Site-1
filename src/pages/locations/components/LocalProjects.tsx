import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import type { LocationData } from '../../../types';

interface LocalProjectsProps {
  location: LocationData;
}

const LocalProjects: React.FC<LocalProjectsProps> = ({ location }) => {
  // Sample projects - in production, these would come from actual project data
  const sampleProjects = [
    {
      title: `Modern Kitchen in ${location.neighborhoods[0] || location.city}`,
      description: 'White frameless cabinets with quartz countertops',
      image: '/images/portfolio/kitchen-modern-white.jpg',
    },
    {
      title: `Master Bath Vanity in ${location.neighborhoods[1] || location.city}`,
      description: 'Custom double vanity with marble top',
      image: '/images/portfolio/bathroom-double-vanity.jpg',
    },
    {
      title: `Closet System in ${location.neighborhoods[2] || location.city}`,
      description: 'Luxury walk-in closet with LED lighting',
      image: '/images/portfolio/closet-walk-in-luxury.jpg',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Recent Projects in {location.city}
          </h2>
          <p className="text-lg text-slate-600">
            See what we've created for your neighbors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleProjects.map((project, idx) => (
            <div key={idx} className="group">
              <div className="relative overflow-hidden rounded-xl shadow-lg mb-4">
                <div className="aspect-w-4 aspect-h-3 bg-slate-200">
                  {/* Image placeholder */}
                  <div className="w-full h-64 bg-gradient-to-br from-slate-300 to-slate-400 group-hover:scale-110 transition-transform duration-300"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-block bg-amber-600 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                    {location.city}
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">
                {project.title}
              </h3>
              <p className="text-slate-600 text-sm">
                {project.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/portfolio"
            className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
          >
            View Full Portfolio
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LocalProjects;
