import React from 'react';
import { ArrowRight, Image } from 'lucide-react';
import type { LocationData } from '../../../types';

interface LocalProjectsProps {
  location: LocationData;
}

const LocalProjects: React.FC<LocalProjectsProps> = ({ location }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Image className="w-16 h-16 mx-auto mb-6 text-accent" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          See Our Work in {location.name}
        </h2>
        <p className="text-xl text-slate-300 mb-8">
          Explore our portfolio of custom cabinet projects from kitchens and bathrooms to closets and home offices.
        </p>
        <a
          href="/portfolio"
          className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
        >
          View Our Portfolio
          <ArrowRight className="ml-2 w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default LocalProjects;
