import React, { useState } from 'react';
import {
  Calculator,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Info,
  ArrowRight
} from 'lucide-react';
import SEO from '../../components/SEO';
import { generateFAQSchema } from '../../lib/schema';
import { faqs } from '../../data/faqs';

const PricingPage: React.FC = () => {
  const [projectType, setProjectType] = useState<string>('kitchen');
  const [linearFeet, setLinearFeet] = useState<number>(15);
  const [quality, setQuality] = useState<string>('semi-custom');

  // Pricing ranges per linear foot
  const pricing = {
    kitchen: { 'stock': 100, 'semi-custom': 200, 'custom': 350 },
    bathroom: { 'stock': 120, 'semi-custom': 220, 'custom': 380 },
    closet: { 'stock': 80, 'semi-custom': 150, 'custom': 280 },
    'home-office': { 'stock': 90, 'semi-custom': 180, 'custom': 320 },
    garage: { 'stock': 70, 'semi-custom': 130, 'custom': 250 },
  };

  const estimatedCost = pricing[projectType as keyof typeof pricing][quality as keyof typeof pricing.kitchen] * linearFeet;

  // Get pricing FAQs
  const pricingFAQs = faqs.filter(faq => faq.category === 'pricing').slice(0, 8);
  const faqSchema = generateFAQSchema(pricingFAQs);

  return (
    <>
      <SEO
        title="Custom Cabinet Pricing Houston | YuDezign Cost Guide 2025"
        description="Transparent custom cabinet pricing for Houston homeowners. Calculate costs for kitchen, bathroom, closet, and garage cabinets. Free design consultation included."
        keywords={[
          'custom cabinet pricing Houston',
          'cabinet cost Houston',
          'kitchen cabinet prices',
          'bathroom vanity cost',
          'cabinet pricing guide',
          'Houston cabinet costs',
        ]}
        canonical="https://yudezign.com/pricing"
        ogType="website"
        structuredData={faqSchema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <DollarSign className="w-5 h-5 mr-2 text-accent" />
              <span className="text-sm font-medium">Transparent Pricing • No Hidden Fees</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Custom Cabinet Pricing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                for Houston Homes
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Transparent pricing, honest estimates, and exceptional value. Calculate your project cost instantly and schedule a free design consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Cost Calculator */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Instant Cost Calculator
            </h2>
            <p className="text-lg text-slate-600">
              Get a ballpark estimate in seconds. Actual pricing determined during free consultation.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-accent-light rounded-2xl p-8 shadow-lg border border-accent-light">
            {/* Project Type Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Project Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {['kitchen', 'bathroom', 'closet', 'home-office', 'garage'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setProjectType(type)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      projectType === type
                        ? 'bg-primary text-white shadow-lg scale-105'
                        : 'bg-white text-slate-700 hover:bg-accent-light border border-slate-200'
                    }`}
                  >
                    {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Level Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Quality Level
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'stock', label: 'Stock', desc: 'Pre-made, basic' },
                  { value: 'semi-custom', label: 'Semi-Custom', desc: 'Our specialty • Best value', recommended: true },
                  { value: 'custom', label: 'Fully Custom', desc: 'Ultimate flexibility' },
                ].map((tier) => (
                  <button
                    key={tier.value}
                    onClick={() => setQuality(tier.value)}
                    className={`p-4 rounded-lg text-left transition-all relative ${
                      quality === tier.value
                        ? 'bg-primary text-white shadow-xl scale-105 border-2 border-primary'
                        : 'bg-white text-slate-700 hover:bg-accent-light border-2 border-slate-200'
                    }`}
                  >
                    {tier.recommended && (
                      <span className={`absolute -top-2 -right-2 text-xs font-bold px-2 py-1 rounded-full ${
                        quality === tier.value ? 'bg-white text-primary' : 'bg-primary text-white'
                      }`}>
                        Recommended
                      </span>
                    )}
                    <div className="font-semibold mb-1">{tier.label}</div>
                    <div className={`text-sm ${quality === tier.value ? 'text-white/90' : 'text-slate-600'}`}>
                      {tier.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Linear Feet Slider */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Estimated Linear Feet: <span className="text-primary">{linearFeet} ft</span>
              </label>
              <input
                type="range"
                min="5"
                max="50"
                value={linearFeet}
                onChange={(e) => setLinearFeet(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>5 ft (Small)</span>
                <span>50 ft (Large)</span>
              </div>
            </div>

            {/* Estimated Cost Display */}
            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-primary">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Estimated Investment</p>
                  <p className="text-4xl font-bold text-slate-900">
                    ${estimatedCost.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    ${pricing[projectType as keyof typeof pricing][quality as keyof typeof pricing.kitchen]}/linear foot × {linearFeet} ft
                  </p>
                </div>
                <TrendingUp className="w-16 h-16 text-primary opacity-20" />
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-600 flex items-start">
                  <Info className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                  This is a rough estimate. Final pricing depends on materials, finishes, hardware, and complexity. Schedule a free consultation for an accurate quote.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 text-center">
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Stock vs Semi-Custom vs Fully Custom
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Understand the quality and value differences to make the right choice for your project.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold">Stock Cabinets</th>
                  <th className="px-6 py-4 text-center font-semibold bg-primary">
                    <div className="flex flex-col items-center">
                      <span>Semi-Custom</span>
                      <span className="text-xs font-normal mt-1">(YuDezign Specialty)</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">Fully Custom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  {
                    feature: 'Price Range (per linear foot)',
                    stock: '$70-120',
                    semiCustom: '$130-300',
                    custom: '$250-500+'
                  },
                  {
                    feature: 'Lead Time',
                    stock: '1-2 weeks',
                    semiCustom: '6-8 weeks',
                    custom: '10-16 weeks'
                  },
                  {
                    feature: 'Size Options',
                    stock: 'Limited standard sizes',
                    semiCustom: '3" increments • fits most spaces',
                    custom: 'Any size to 1/16"'
                  },
                  {
                    feature: 'Door Styles',
                    stock: '5-10 basic styles',
                    semiCustom: '50+ curated styles',
                    custom: 'Unlimited • any design'
                  },
                  {
                    feature: 'Wood Species',
                    stock: 'Oak, maple only',
                    semiCustom: 'Maple, oak, cherry, walnut',
                    custom: 'Any species including exotic'
                  },
                  {
                    feature: 'Construction',
                    stock: 'Particleboard core • stapled',
                    semiCustom: 'Plywood core • doweled/dado',
                    custom: 'Premium plywood • dovetail'
                  },
                  {
                    feature: 'Warranty',
                    stock: '1-5 years limited',
                    semiCustom: 'Lifetime structural • 5-year finish',
                    custom: 'Varies by maker • typically 5-10 years'
                  },
                  {
                    feature: 'Best For',
                    stock: 'Rentals • tight budgets',
                    semiCustom: 'Most homeowners • best value',
                    custom: 'Unique designs • unlimited budget'
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-slate-600">{row.stock}</td>
                    <td className="px-6 py-4 text-center bg-accent-light font-medium text-slate-900">
                      {row.semiCustom}
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600">{row.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/vs/custom-vs-semi-custom-cabinets"
              className="inline-flex items-center text-primary hover:text-primary-dark font-semibold"
            >
              Read Full Comparison Guide
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What's Included in Our Pricing
            </h2>
            <p className="text-lg text-slate-600">
              Transparent pricing with no hidden fees or surprise charges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Free Design Consultation', desc: 'In-home or showroom meeting with expert designer • 3D renderings • unlimited revisions' },
              { title: 'Premium Materials', desc: 'Plywood construction (not particleboard) • soft-close hinges and glides • quality hardware' },
              { title: 'Professional Installation', desc: 'Expert installers employed by YuDezign • job site protection • debris removal' },
              { title: 'Lifetime Warranty', desc: 'Lifetime structural warranty • 5-year finish warranty • local service and support' },
              { title: 'Project Management', desc: 'Dedicated project coordinator • timeline management • quality inspections' },
              { title: 'Customer Support', desc: 'Direct access to our team • responsive communication • satisfaction guarantee' },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-primary hover:shadow-lg transition-all">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Pricing Questions Answered
            </h2>
          </div>

          <div className="space-y-4">
            {pricingFAQs.map((faq, idx) => (
              <details key={idx} className="bg-white rounded-xl shadow-md overflow-hidden group">
                <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-accent-light transition-colors flex items-center justify-between">
                  <span>{faq.question}</span>
                  <ArrowRight className="w-5 h-5 text-primary transform group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 py-4 text-slate-600 border-t border-slate-200 bg-slate-50">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="/faq/pricing"
              className="inline-flex items-center text-primary hover:text-primary-dark font-semibold"
            >
              View All Pricing FAQs
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for an Accurate Quote?
          </h2>
          <p className="text-xl text-accent-light mb-8">
            Schedule your free consultation and get a detailed, itemized proposal with no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-accent-light transition-all shadow-lg hover:shadow-xl"
            >
              Schedule Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/showroom"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-dark text-white rounded-lg font-semibold hover:bg-primary-dark transition-all"
            >
              Visit Our Showroom
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingPage;
