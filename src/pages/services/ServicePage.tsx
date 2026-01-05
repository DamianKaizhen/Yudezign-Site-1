import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import ServiceHero from './components/ServiceHero';
import { getServiceBySlug } from '../../data/services';
import { generateServiceSchema, generateFAQSchema } from '../../lib/schema';
import {
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  DollarSign,
  Palette,
  Package,
  Wrench,
  Truck,
  Clock,
  MapPin,
  Layout
} from 'lucide-react';

const ServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find service by slug
  const service = getServiceBySlug(slug || '');

  // If service not found, redirect
  if (!service) {
    return <Navigate to="/" replace />;
  }

  // Generate structured data
  const serviceSchema = generateServiceSchema({
    name: service.name,
    description: service.metaDescription,
    provider: 'YuDezign Custom Cabinets',
    areaServed: 'Houston, TX',
    priceRange: '$$$',
  });

  const faqSchema = service.faqs ? generateFAQSchema(service.faqs) : null;

  return (
    <>
      <SEO
        title={service.metaTitle}
        description={service.metaDescription}
        keywords={service.keywords}
        canonical={`https://yudezign.com/services/${service.slug}`}
        ogType="service"
        structuredData={[serviceSchema, faqSchema].filter(Boolean)}
      />

      {/* Hero */}
      <ServiceHero service={service} />

      {/* Design Options */}
      {service.designOptions && service.designOptions.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Palette className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Design Options
              </h2>
              <p className="text-lg text-slate-600">
                Choose the style that perfectly fits your home
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.designOptions.map((option: any, idx: number) => (
                <div key={idx} className="bg-slate-50 rounded-xl p-6 border-2 border-transparent hover:border-primary hover:shadow-lg transition-all">
                  <h3 className="font-semibold text-xl text-slate-900 mb-3">{option.title || option.style}</h3>
                  <p className="text-slate-600 mb-4">{option.description}</p>
                  {option.features && (
                    <div className="space-y-2">
                      {option.features.map((feature: string, fidx: number) => (
                        <div key={fidx} className="flex items-start text-sm">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* KD Lite Design Tool CTA - Only for Closet Systems */}
      {slug === 'closet-systems' && (
        <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Layout className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    Design Your Closet with KD Lite
                  </h3>
                  <p className="text-white/80 max-w-xl">
                    Try our free closet design tool to visualize and plan your perfect custom closet system before your consultation.
                  </p>
                </div>
              </div>
              <Link
                to="/kdlite"
                className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent hover:text-white transition-all duration-300 flex-shrink-0"
              >
                Try KD Lite Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Materials */}
      {service.materials && service.materials.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Package className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Premium Materials
              </h2>
              <p className="text-lg text-slate-600">
                Quality construction that lasts a lifetime
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.materials.map((material: any, idx: number) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-lg text-slate-900">{typeof material === 'string' ? material : material.name}</h3>
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  {typeof material === 'object' && material.description && (
                    <>
                      <p className="text-sm text-slate-600 mb-4">{material.description}</p>
                      {material.priceRange && (
                        <div className="pt-4 border-t border-slate-200">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">Price Range</span>
                            <span className="font-semibold text-slate-900">{material.priceRange}</span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Wrench className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-slate-600">
              From consultation to installation, we make it easy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Free Consultation',
                desc: 'Meet with our designer to discuss your vision, measure space, and explore options.',
                icon: Star,
              },
              {
                step: '2',
                title: 'Design & Quote',
                desc: 'Receive 3D renderings and detailed proposal with transparent pricing.',
                icon: Palette,
              },
              {
                step: '3',
                title: 'Manufacturing',
                desc: 'Your cabinets are precision-built in 2-3 weeks (standard materials) with quality control. Special finishes may add additional time.',
                icon: Award,
              },
              {
                step: '4',
                title: 'Installation',
                desc: 'Professional installation with final walkthrough and satisfaction guarantee.',
                icon: CheckCircle,
              },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery & Timeline Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Delivery & Timeline
            </h2>
            <p className="text-lg text-slate-600">
              Fast turnaround and convenient delivery options
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Production Timeline */}
            <div className="bg-slate-50 rounded-xl p-6 border-2 border-transparent hover:border-primary transition-all">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-xl text-slate-900 mb-3">Production Time</h3>
              <p className="text-slate-600 mb-4">
                2-3 weeks for standard residential projects using in-stock materials. Special finishes or custom colors may add additional time.
              </p>
              <p className="text-sm text-slate-500">
                Much faster than the 8-12 weeks typical for imported cabinets!
              </p>
            </div>

            {/* Delivery Service */}
            <div className="bg-slate-50 rounded-xl p-6 border-2 border-transparent hover:border-primary transition-all">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-xl text-slate-900 mb-3">Delivery Service</h3>
              <p className="text-slate-600 mb-4">
                $350 per trip within Greater Houston Area. A typical trip accommodates one kitchen plus bathroom vanities and a small closet.
              </p>
              <p className="text-sm text-slate-500">
                Larger projects may require multiple trips.
              </p>
            </div>

            {/* Pickup Option */}
            <div className="bg-slate-50 rounded-xl p-6 border-2 border-transparent hover:border-primary transition-all">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-xl text-slate-900 mb-3">Free Pickup</h3>
              <p className="text-slate-600 mb-4">
                Pick up your cabinets at no charge from our factory at 5802 Colfax St, Houston, TX 77477.
              </p>
              <p className="text-sm text-slate-500">
                Save on delivery and inspect your cabinets before taking them home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What's Included
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature: any, idx: number) => (
              <div key={idx} className="flex items-start bg-white rounded-lg p-4 shadow-sm">
                <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{typeof feature === 'string' ? feature : feature.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq: any, idx: number) => (
                <details key={idx} className="bg-slate-50 rounded-xl shadow-md overflow-hidden group">
                  <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-accent-light transition-colors flex items-center justify-between">
                    <span>{faq.question}</span>
                    <ArrowRight className="w-5 h-5 text-primary transform group-open:rotate-90 transition-transform" />
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

      {/* Related Services */}
      {service.relatedServices && service.relatedServices.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                You Might Also Like
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.relatedServices.map((relatedSlug: string, idx: number) => {
                const related = getServiceBySlug(relatedSlug);
                if (!related) return null;
                return (
                  <a
                    key={idx}
                    href={`/services/${related.slug}`}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-primary group"
                  >
                    <h3 className="font-semibold text-lg text-slate-900 group-hover:text-primary transition-colors mb-2">
                      {related.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">{related.metaDescription}</p>
                    <div className="flex items-center text-primary font-medium text-sm">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Schedule your free consultation and see how we can transform your space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
            >
              Get Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
            >
              <DollarSign className="mr-2 w-5 h-5" />
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicePage;
