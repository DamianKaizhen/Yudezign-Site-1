import React, { useState } from 'react';
import SEO from '../../components/SEO';
import { faqs } from '../../data/faqs';
import { generateFAQSchema } from '../../lib/schema';
import { Search, ArrowRight, Filter } from 'lucide-react';

const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  // Filter FAQs
  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Generate structured data
  const faqSchema = generateFAQSchema(filteredFAQs);

  return (
    <>
      <SEO
        title="Cabinet FAQ | Frequently Asked Questions | YuDezign Houston"
        description="Get answers to common questions about custom cabinets, pricing, installation, materials, and more. Expert advice from Houston's cabinet specialists."
        keywords={[
          'cabinet FAQ',
          'cabinet questions',
          'custom cabinet FAQ Houston',
          'cabinet pricing questions',
          'cabinet installation questions',
        ]}
        canonical="https://www.yudezign.com/faq"
        ogType="website"
        structuredData={faqSchema}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-1 bg-accent mx-auto mb-8"></div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Frequently Asked <br />
              <span className="text-white">
                Questions
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Find answers to common questions about custom cabinets, pricing, installation, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-slate-600" />
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <p className="text-lg text-slate-600">No questions found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, idx) => (
                <details
                  key={idx}
                  className="bg-white rounded-xl shadow-md overflow-hidden group"
                >
                  <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-accent-light transition-colors flex items-center justify-between">
                    <span className="flex-1 pr-4">{faq.question}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-normal bg-accent-light text-primary-dark px-3 py-1 rounded-full">
                        {faq.category}
                      </span>
                      <ArrowRight className="w-5 h-5 text-primary transform group-open:rotate-90 transition-transform flex-shrink-0" />
                    </div>
                  </summary>
                  <div className="px-6 py-4 text-slate-600 border-t border-slate-200 bg-slate-50 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">
              Didn't find what you're looking for?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
            >
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQPage;
