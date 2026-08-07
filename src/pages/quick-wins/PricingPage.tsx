import React, { useState } from 'react';
import {
  Calculator,
  CheckCircle,
  TrendingUp,
  Info,
  ArrowRight,
  Truck,
  Clock,
  MapPin
} from 'lucide-react';
import SEO from '../../components/SEO';
import { generateFAQSchema } from '../../lib/schema';
import { faqs } from '../../data/faqs';

const PricingPage: React.FC = () => {
  const [projectType, setProjectType] = useState<string>('kitchen');
  const [linearFeet, setLinearFeet] = useState<number>(15);
  const [quality, setQuality] = useState<string>('semi-custom');

  // Supply-only pricing per linear foot — cabinets delivered ready to install.
  // NOT installed pricing: the $800-$1,800/LF figures quoted elsewhere in the
  // market include installation, countertops and trades, none of which we do.
  //
  // Revised 2026-08-07 by Damian:
  //   bathroom was $215/$375, identical to kitchen — a copy-paste, and far too
  //   high for a base-only vanity run at 21" deep.
  //   garage was $150/$265 — too low; it sits at kitchen level. Matching
  //   kitchen exactly here is deliberate, not the same copy-paste bug.
  const pricing = {
    kitchen: { 'semi-custom': 215, 'custom': 375 },
    bathroom: { 'semi-custom': 130, 'custom': 225 },
    closet: { 'semi-custom': 165, 'custom': 315 },
    'home-office': { 'semi-custom': 190, 'custom': 340 },
    garage: { 'semi-custom': 215, 'custom': 375 },
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
        canonical="https://www.yudezign.com/pricing"
        ogType="website"
        structuredData={faqSchema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-1 bg-accent mx-auto mb-8"></div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Custom Cabinet Pricing <br />
              <span className="text-white">
                for Residential & Commercial
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Transparent pricing for homes and businesses. Calculate your project cost instantly and schedule a free design consultation.
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: 'semi-custom', label: 'Semi-Custom', desc: 'Our specialty • 2-4 weeks', recommended: true },
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
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
                <p className="text-xs text-slate-600 flex items-start">
                  <Info className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                  Supply only &mdash; cabinets, assembled, delivered. Countertops, appliances, installation labour and delivery ($350 a trip inside Greater Houston) are separate.
                </p>
                {/* These rates start at our Essential line, with Signature in the
                    same band. Reserve and Atelier are made to measure too, but
                    their surfaces and accessory programme run above this — so
                    the calculator is a floor, not a range that contains
                    everything. Saying so here stops a customer anchoring on a
                    number a rep will then have to walk back. */}
                <p className="text-xs text-slate-600 flex items-start">
                  <Info className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                  A starting estimate, based on our Essential and Signature lines. Our Reserve and Atelier lines &mdash; soft-touch, handleless and lacquered finishes with the fuller accessory programme &mdash; run above these figures. Final pricing depends on finish, hardware and complexity, so book a free consultation for a real number.
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
              Semi-Custom vs Fully Custom Cabinets
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              YuDezign specializes in frameless European-style cabinets. Compare our two tiers to choose the right fit for your project.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
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
                    semiCustom: '$130-215',
                    custom: '$225-375'
                  },
                  {
                    feature: 'Lead Time',
                    semiCustom: '2-4 weeks - rapid local manufacturing',
                    custom: 'Longer timeline for complex designs'
                  },
                  {
                    feature: 'Size Options',
                    semiCustom: '3" increments • fits most spaces',
                    custom: 'Any size to 1/16" precision'
                  },
                  {
                    feature: 'Door Styles',
                    semiCustom: '50+ curated styles',
                    custom: 'Unlimited • any design'
                  },
                  {
                    feature: 'Finish Options',
                    semiCustom: 'Melamine, laminate, acrylic - 100+ colors',
                    custom: 'Unlimited specialty finishes'
                  },
                  {
                    feature: 'Construction',
                    semiCustom: 'Frameless European • plywood/particleboard/MDF',
                    custom: 'Premium construction • dovetail'
                  },
                  {
                    feature: 'Warranty',
                    semiCustom: 'Lifetime structural • 5-year finish',
                    custom: 'Varies by maker'
                  },
                  {
                    feature: 'Best For',
                    semiCustom: 'Residential/Commercial • best value',
                    custom: 'Unique designs • unlimited budget'
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.feature}</td>
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

      {/* Commercial Projects Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Commercial Cabinet Solutions
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              YuDezign serves commercial clients with durable, cost-effective cabinet solutions perfect for offices, restaurants, retail spaces, and multi-family properties.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Commercial Features */}
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Commercial Features</h3>
              <div className="space-y-4">
                {[
                  { title: 'Custom Laminates', desc: 'High-pressure laminates with glue-on application for durability and easy maintenance. Perfect for high-traffic commercial environments.' },
                  { title: 'Frameless Construction', desc: 'European-style frameless cabinets maximize interior space and create a modern, professional aesthetic.' },
                  { title: 'Rapid Production', desc: '2-4 week turnaround helps keep commercial projects on schedule and minimizes business downtime.' },
                  { title: 'Bulk Pricing', desc: 'Competitive pricing for large commercial orders. Volume discounts available for multi-unit projects.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commercial Applications */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Ideal For</h3>
              <div className="space-y-4">
                {[
                  { title: 'Office Build-Outs', desc: 'Reception desks, break rooms, storage solutions' },
                  { title: 'Restaurants & Cafes', desc: 'Bar counters, server stations, storage cabinets' },
                  { title: 'Retail Spaces', desc: 'Display cabinets, back-of-house storage, checkout counters' },
                  { title: 'Multi-Family Properties', desc: 'Apartment kitchens, laundry rooms, clubhouse cabinetry' },
                  { title: 'Medical Offices', desc: 'Exam room cabinets, lab storage, reception areas' },
                  { title: 'Hotels & Hospitality', desc: 'Guest room vanities, housekeeping storage, lobby millwork' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-white/90">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-accent-light rounded-xl p-6 max-w-3xl mx-auto">
              <p className="text-slate-900 font-semibold mb-2">
                Commercial Project Inquiry
              </p>
              <p className="text-slate-600 mb-4">
                Contact us for volume pricing, custom laminate samples, and project consultation. We work with contractors, property managers, and commercial designers.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
              >
                Request Commercial Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery & Timeline */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Delivery & Production Timeline
            </h2>
            <p className="text-lg text-slate-600">
              Fast local manufacturing and flexible delivery options
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Production Time */}
            <div className="bg-white rounded-xl p-6 border-2 border-transparent hover:border-primary transition-all">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-xl text-slate-900 mb-3">Production Time</h3>
              <p className="text-slate-600 mb-4">
                2-3 weeks for standard residential projects using in-stock materials. Special finishes or custom colors may add additional time depending on vendor availability.
              </p>
              <p className="text-sm text-slate-500 font-semibold">
                Much faster than 8-12 weeks for imported cabinets!
              </p>
            </div>

            {/* Delivery Service */}
            <div className="bg-white rounded-xl p-6 border-2 border-transparent hover:border-primary transition-all">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-xl text-slate-900 mb-3">Delivery Service</h3>
              <p className="text-slate-600 mb-4">
                $350 per trip within the Greater Houston Area. A typical trip can accommodate one standard kitchen plus bathroom vanities and a small closet.
              </p>
              <p className="text-sm text-slate-500">
                Larger projects may require multiple trips. Price includes delivery and placement.
              </p>
            </div>

            {/* Free Pickup */}
            <div className="bg-white rounded-xl p-6 border-2 border-transparent hover:border-primary transition-all">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-xl text-slate-900 mb-3">Free Pickup Option</h3>
              <p className="text-slate-600 mb-4">
                Pick up your cabinets at no charge from our factory at 5802 Colfax St, Houston, TX 77477.
              </p>
              <p className="text-sm text-slate-500">
                Save on delivery costs and inspect your cabinets in person before taking them home.
              </p>
            </div>
          </div>

          {/* Timeline Factors */}
          <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h4 className="font-semibold text-blue-900 mb-3">Factors Affecting Timeline:</h4>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Material availability:</strong> In-stock finishes ship in 2-3 weeks; special orders may take longer</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Custom colors:</strong> Color matching requires vendor sourcing, adding days to weeks</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Project complexity:</strong> Highly custom configurations may require additional production time</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Local manufacturing advantage:</strong> No overseas shipping delays or customs issues</span>
              </li>
            </ul>
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
