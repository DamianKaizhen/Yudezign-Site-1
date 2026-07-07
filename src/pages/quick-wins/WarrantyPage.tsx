import React from 'react';
import SEO from '../../components/SEO';
import {
  Shield,
  CheckCircle,
  FileText,
  Clock,
  Award,
  AlertCircle,
  Phone,
  ArrowRight,
  Zap
} from 'lucide-react';

const WarrantyPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Cabinet Warranty | Lifetime Structural Warranty | YuDezign Houston"
        description="Industry-leading cabinet warranty: Lifetime structural, 5-year finish, 2-year hardware. Learn what's covered, how to file claims, and why our warranty matters."
        keywords={[
          'cabinet warranty Houston',
          'lifetime cabinet warranty',
          'cabinet warranty coverage',
          'YuDezign warranty',
          'custom cabinet guarantee',
        ]}
        canonical="https://www.yudezign.com/warranty"
        ogType="website"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Shield className="w-5 h-5 mr-2 text-accent" />
              <span className="text-sm font-medium">Industry-Leading Protection</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Warranty That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                Protects Your Investment
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              We stand behind our craftsmanship with comprehensive warranty coverage that gives you peace of mind for years to come.
            </p>
          </div>
        </div>
      </section>

      {/* Warranty Tiers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Three-Tier Warranty Coverage
            </h2>
            <p className="text-lg text-slate-600">
              Comprehensive protection for every component of your custom cabinets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Lifetime Structural */}
            <div className="bg-gradient-to-br from-accent-light to-white rounded-2xl p-8 shadow-lg border-2 border-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                BEST IN CLASS
              </div>
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Lifetime Structural
              </h3>
              <div className="text-4xl font-bold text-primary mb-6">
                Forever
              </div>
              <p className="text-slate-600 mb-6">
                As long as you own your home, we warranty the structural integrity of your cabinet boxes, joints, and construction.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">Cabinet box construction</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">Joinery and dados</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">Door and drawer construction</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">Shelf support systems</span>
                </div>
              </div>
            </div>

            {/* 5-Year Finish */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 shadow-lg border-2 border-slate-200 hover:border-primary transition-colors">
              <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                5-Year Finish
              </h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">
                60 Months
              </div>
              <p className="text-slate-600 mb-6">
                Five years of protection against finish defects including peeling, cracking, or abnormal discoloration.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">Paint and stain finish</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">Laminate and acrylic surfaces</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">Edge banding adhesion</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">Clear coat protection</span>
                </div>
              </div>
            </div>

            {/* 2-Year Hardware */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 shadow-lg border-2 border-slate-200 hover:border-primary transition-colors">
              <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                2-Year Hardware
              </h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">
                24 Months
              </div>
              <p className="text-slate-600 mb-6">
                Two years of coverage for all hinges, drawer glides, and mechanical components.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">Soft-close hinges</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">Drawer glides and slides</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">Pull-out mechanisms</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">Handles and knobs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Extended Protection Note */}
          <div className="mt-12 max-w-3xl mx-auto p-6 bg-accent-light border-2 border-primary rounded-xl">
            <div className="flex items-start">
              <Award className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  Plus: Manufacturer Warranties
                </h4>
                <p className="text-sm text-slate-700">
                  In addition to YuDezign's warranty, many hardware components (hinges, glides) carry separate manufacturer warranties ranging from 5 years to lifetime. We'll help you leverage both for maximum protection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Covered / Not Covered */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* What's Covered */}
            <div>
              <div className="flex items-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  What's Covered
                </h2>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Manufacturing Defects', desc: 'Any defect in materials or workmanship in cabinet construction' },
                  { title: 'Structural Failures', desc: 'Joint separation, box warping, or structural compromises' },
                  { title: 'Finish Defects', desc: 'Peeling, excessive cracking, or abnormal fading/discoloration' },
                  { title: 'Hardware Failures', desc: 'Broken hinges, failed soft-close mechanisms, or drawer glide issues' },
                  { title: 'Delamination', desc: 'Separation of veneer, laminate, or edge banding' },
                  { title: 'Door & Drawer Issues', desc: 'Warping, twisting, or joint failures in doors and drawer fronts' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Not Covered */}
            <div>
              <div className="flex items-center mb-6">
                <AlertCircle className="w-8 h-8 text-primary mr-3" />
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  What's Not Covered
                </h2>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Normal Wear & Tear', desc: 'Minor scratches, dents, or dings from daily use' },
                  { title: 'Improper Maintenance', desc: 'Damage from harsh chemicals, abrasives, or lack of cleaning' },
                  { title: 'Water Damage', desc: 'Prolonged exposure to standing water, leaks, or flooding' },
                  { title: 'Unauthorized Modifications', desc: 'Changes made by anyone other than YuDezign technicians' },
                  { title: 'Impact Damage', desc: 'Damage from accidents, abuse, or excessive force' },
                  { title: 'Natural Wood Characteristics', desc: 'Color variations, grain patterns, or wood movement within normal limits' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg border-2 border-primary">
                <p className="text-sm text-slate-700">
                  <strong>Important:</strong> Warranty coverage requires following our care and maintenance guidelines provided at installation. Proper cleaning and reasonable use preserve your warranty rights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Claims Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How to File a Warranty Claim
            </h2>
            <p className="text-lg text-slate-600">
              Simple, straightforward process with local Houston support.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Contact Us',
                desc: 'Call or email our service team with details about the issue. Include photos if possible.',
                action: 'Phone: (281) 568-8000 or Email: service@yudezign.com',
              },
              {
                step: '2',
                title: 'Initial Assessment',
                desc: 'Our team reviews your claim within 1 business day and determines if it\'s warranty-covered.',
                action: 'Response within 24 hours',
              },
              {
                step: '3',
                title: 'On-Site Inspection',
                desc: 'If needed, we schedule a technician to inspect the issue in person (usually within 3-5 business days).',
                action: 'Convenient scheduling for Houston-area homes',
              },
              {
                step: '4',
                title: 'Resolution',
                desc: 'Warranty-covered issues are repaired or replaced at no charge. We provide timeline and coordinate installation.',
                action: 'Most claims resolved within 2 weeks',
              },
            ].map((step) => (
              <div key={step.step} className="flex items-start bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {step.step}
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-600 mb-2">{step.desc}</p>
                  <p className="text-sm text-primary font-medium">{step.action}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-green-50 border-2 border-green-600 rounded-xl">
            <div className="flex items-start">
              <Clock className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  Fast Houston-Based Service
                </h4>
                <p className="text-sm text-slate-700">
                  Unlike big-box stores with complex claim processes and distant service centers, YuDezign is local to Houston. We handle claims directly with no corporate bureaucracy - just fast, friendly service from people you've already worked with.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Care & Maintenance */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Maintain Your Warranty
            </h2>
            <p className="text-lg text-slate-600">
              Simple care instructions to keep your cabinets looking beautiful and warranty valid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Clean Regularly', desc: 'Wipe surfaces with mild soap and water. Avoid abrasive cleaners or scouring pads.' },
              { title: 'Dry Immediately', desc: 'Wipe up spills and splashes promptly, especially around sinks and dishwashers.' },
              { title: 'Use Gentle Cleaners', desc: 'Avoid ammonia, bleach, or harsh chemicals that can damage finishes.' },
              { title: 'Adjust Humidity', desc: 'Maintain 40-60% indoor humidity to prevent wood expansion/contraction.' },
              { title: 'Check Hardware', desc: 'Periodically tighten hinges and handles as needed with normal use.' },
              { title: 'Avoid Heat Exposure', desc: 'Don\'t place hot pots/pans directly on cabinet surfaces or near doors.' },
            ].map((tip, idx) => (
              <div key={idx} className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  {tip.title}
                </h3>
                <p className="text-sm text-slate-600 ml-7">{tip.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">
              Detailed care and maintenance guide included with every installation.
            </p>
          </div>
        </div>
      </section>

      {/* Why Our Warranty Matters */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Our Warranty Stands Out
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { title: 'Local Accountability', desc: 'We\'re a Houston company serving Houston families. You can visit our showroom, call our local number, and get fast service - not corporate runaround.' },
              { title: 'No Fine Print Traps', desc: 'Our warranty is straightforward and easy to understand. We don\'t hide behind technicalities or create barriers to legitimate claims.' },
              { title: 'Proven Track Record', desc: '15+ years in business with thousands of satisfied Houston homeowners. Our warranty has been tested and proven.' },
              { title: 'Quality First', desc: 'We can offer lifetime structural warranty because we use premium materials and expert craftsmanship. Our warranty reflects our confidence.' },
            ].map((reason, idx) => (
              <div key={idx} className="flex items-start bg-slate-50 rounded-lg p-5 border border-slate-200">
                <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{reason.title}</h3>
                  <p className="text-sm text-slate-600">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Questions About Our Warranty?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Our team is happy to explain coverage details and answer any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
            >
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="tel:2815688000"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
            >
              <Phone className="mr-2 w-5 h-5" />
              (281) 568-8000
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default WarrantyPage;
