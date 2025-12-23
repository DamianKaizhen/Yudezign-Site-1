import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import LocationHero from './components/LocationHero';
import NeighborhoodSection from './components/NeighborhoodSection';
import LocalProjects from './components/LocalProjects';
import { locations } from '../../data/locations';
import { generateLocalBusinessSchema } from '../../lib/schema';
import { CheckCircle, ArrowRight, Star, Award, Users, Clock } from 'lucide-react';

const LocationPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find location by slug
  const location = Object.values(locations).find(loc => loc.slug === slug);

  // If location not found, redirect to 404 or home
  if (!location) {
    return <Navigate to="/" replace />;
  }

  // Generate structured data
  const structuredData = generateLocalBusinessSchema({
    name: `YuDezign Custom Cabinets - ${location.city}`,
    address: `Serving ${location.city}, TX ${location.zipCode}`,
    phone: '(713) 555-0123',
    hours: 'Mo-Fr 09:00-18:00, Sa 10:00-16:00',
    priceRange: '$$$',
  });

  return (
    <>
      <SEO
        title={location.seo.title}
        description={location.seo.metaDescription}
        keywords={location.seo.keywords}
        canonical={`https://yudezign.com/locations/${location.slug}`}
        ogType="place"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <LocationHero location={location} />

      {/* Why Choose YuDezign in [City] */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why {location.city} Homeowners Choose YuDezign
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: 'Local Experts',
                desc: `We understand ${location.city} home styles and have completed 500+ projects in the area.`,
              },
              {
                icon: Award,
                title: 'Premium Quality',
                desc: 'Lifetime structural warranty on all cabinets. We use only the best materials and craftsmanship.',
              },
              {
                icon: Clock,
                title: 'Fast Service',
                desc: `Quick response times for ${location.city} area. Most projects completed in 6-8 weeks.`,
              },
              {
                icon: Star,
                title: '5-Star Rated',
                desc: 'Hundreds of satisfied customers across Houston. Check our reviews and portfolio.',
              },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods We Serve */}
      <NeighborhoodSection location={location} />

      {/* Services in [City] */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Cabinet Services in {location.city}
            </h2>
            <p className="text-lg text-slate-600">
              Complete cabinetry solutions for every room in your home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Kitchen Cabinets',
                desc: `Custom and semi-custom kitchen cabinets designed for ${location.city} homes. Modern, traditional, and transitional styles.`,
                link: '/services/kitchen-cabinets',
              },
              {
                title: 'Bathroom Vanities',
                desc: 'Elegant bathroom vanities with premium finishes. Single and double sink configurations.',
                link: '/services/bathroom-vanities',
              },
              {
                title: 'Closet Systems',
                desc: 'Organized closet solutions that maximize space. Walk-in and reach-in configurations.',
                link: '/services/closet-systems',
              },
              {
                title: 'Home Office',
                desc: 'Custom built-in desks and cabinetry for productive work-from-home spaces.',
                link: '/services/home-office',
              },
              {
                title: 'Garage Cabinets',
                desc: 'Durable garage storage systems that withstand Houston humidity.',
                link: '/services/garage-cabinets',
              },
              {
                title: 'Murphy Beds',
                desc: 'Space-saving Murphy bed systems with integrated storage and workspace.',
                link: '/services/murphy-beds',
              },
            ].map((service, idx) => (
              <a
                key={idx}
                href={service.link}
                className="bg-slate-50 rounded-xl p-6 border-2 border-transparent hover:border-amber-600 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg text-slate-900 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 transition-colors" />
                </div>
                <p className="text-sm text-slate-600">{service.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Local Projects */}
      <LocalProjects location={location} />

      {/* Local SEO Content */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              {location.seo.h2Heading}
            </h2>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="space-y-4 text-slate-700 leading-relaxed">
                {location.seo.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Why We Love [City] */}
            <div className="mt-8 bg-amber-50 border-2 border-amber-600 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Why We Love Serving {location.city}
              </h3>
              <div className="space-y-3">
                {[
                  `${location.city}'s diverse architectural styles inspire creative cabinet designs`,
                  `Strong community of homeowners who value quality and craftsmanship`,
                  `Growing neighborhoods with both new construction and remodels`,
                  `Families who appreciate the value of custom cabinetry done right`,
                ].map((reason, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {location.faqs && location.faqs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions About Cabinets in {location.city}
              </h2>
            </div>

            <div className="space-y-4">
              {location.faqs.map((faq, idx) => (
                <details key={idx} className="bg-slate-50 rounded-xl shadow-md overflow-hidden group">
                  <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-amber-50 transition-colors flex items-center justify-between">
                    <span>{faq.question}</span>
                    <ArrowRight className="w-5 h-5 text-amber-600 transform group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 py-4 text-slate-600 border-t border-slate-200 bg-white">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your {location.city} Home?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Schedule a free consultation and get a detailed proposal with no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl"
            >
              Get Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/showroom"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-800 text-white rounded-lg font-semibold hover:bg-amber-900 transition-all"
            >
              Visit Showroom
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default LocationPage;
