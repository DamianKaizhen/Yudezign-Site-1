import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { comparisons } from '../../data/comparisons';
import { generateFAQSchema } from '../../lib/schema';
import { CheckCircle, X, ArrowRight, Award, AlertTriangle } from 'lucide-react';

const ComparisonPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find comparison by slug
  const comparison = comparisons[slug || ''];

  // If comparison not found, redirect
  if (!comparison) {
    return <Navigate to="/" replace />;
  }

  // Generate FAQ schema if FAQs exist
  const faqSchema = comparison.faqSection ? generateFAQSchema(comparison.faqSection) : null;

  return (
    <>
      <SEO
        title={comparison.title}
        description={comparison.metaDescription}
        keywords={comparison.seo.keywords}
        canonical={`https://yudezign.com/vs/${comparison.slug}`}
        ogType="article"
        structuredData={faqSchema}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {comparison.title}
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              {comparison.description}
            </p>
            {comparison.winner && (
              <div className="inline-flex items-center bg-green-600 px-6 py-3 rounded-full">
                <Award className="w-5 h-5 mr-2" />
                <span className="font-semibold">
                  Our Recommendation: {comparison.winner.charAt(0).toUpperCase() + comparison.winner.slice(1).replace(/-/g, ' ')}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed">
              {comparison.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
            Quick Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Option 1
                  </th>
                  {comparison.comparisonTable[0].option3 && (
                    <>
                      <th className="px-6 py-4 text-center font-semibold">
                        Option 2
                      </th>
                      <th className="px-6 py-4 text-center font-semibold">
                        Option 3
                      </th>
                    </>
                  )}
                  {!comparison.comparisonTable[0].option3 && (
                    <th className="px-6 py-4 text-center font-semibold">
                      Option 2
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {comparison.comparisonTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-slate-700">{row.option1}</td>
                    <td className="px-6 py-4 text-center text-slate-700">{row.option2}</td>
                    {row.option3 && (
                      <td className="px-6 py-4 text-center text-slate-700">{row.option3}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Detailed Analysis
          </h2>

          <div className="space-y-12">
            {comparison.detailedSections.map((section, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {section.heading}
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {comparison.faqSection && comparison.faqSection.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {comparison.faqSection.map((faq, idx) => (
                <details key={idx} className="bg-white rounded-xl shadow-md overflow-hidden group">
                  <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-amber-50 transition-colors flex items-center justify-between">
                    <span>{faq.question}</span>
                    <ArrowRight className="w-5 h-5 text-amber-600 transform group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 py-4 text-slate-600 border-t border-slate-200 bg-slate-50">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Related Comparisons */}
            {comparison.relatedComparisons && comparison.relatedComparisons.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Related Comparisons</h3>
                <div className="space-y-4">
                  {comparison.relatedComparisons.map((slug, idx) => {
                    const related = comparisons[slug];
                    if (!related) return null;
                    return (
                      <a
                        key={idx}
                        href={`/vs/${related.slug}`}
                        className="block bg-slate-50 rounded-lg p-4 hover:bg-amber-50 hover:border-amber-600 border-2 border-transparent transition-all"
                      >
                        <h4 className="font-semibold text-slate-900 mb-1">{related.title}</h4>
                        <p className="text-sm text-slate-600">{related.description.substring(0, 100)}...</p>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Related Services */}
            {comparison.relatedServices && comparison.relatedServices.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Related Services</h3>
                <div className="space-y-4">
                  {comparison.relatedServices.map((slug, idx) => (
                    <a
                      key={idx}
                      href={`/services/${slug}`}
                      className="block bg-slate-50 rounded-lg p-4 hover:bg-amber-50 hover:border-amber-600 border-2 border-transparent transition-all"
                    >
                      <h4 className="font-semibold text-slate-900 capitalize">
                        {slug.replace(/-/g, ' ')}
                      </h4>
                      <div className="flex items-center text-amber-600 font-medium text-sm mt-2">
                        View Service
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help Deciding?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Schedule a free consultation with our experts to find the perfect solution for your home.
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

export default ComparisonPage;
