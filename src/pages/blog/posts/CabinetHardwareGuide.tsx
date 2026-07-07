import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../../components/SEO';
import { ArrowLeft, CheckCircle, XCircle, Zap, Ruler, Sparkles, Shield } from 'lucide-react';

const CabinetHardwareGuide: React.FC = () => {
  return (
    <>
      <SEO
        title="Cabinet Hardware Guide: Hinges, Slides, Pulls & Knobs | YuDezign Houston"
        description="Complete cabinet hardware guide. How to choose soft-close hinges, drawer slides, handles, knobs, and pulls. Blum vs Hettich, finishes, sizing, and Houston-ready durability."
        keywords={[
          'cabinet hardware guide',
          'soft-close hinges',
          'cabinet drawer slides',
          'cabinet pulls vs knobs',
          'blum vs hettich',
          'cabinet handle finishes',
        ]}
        canonical="https://www.yudezign.com/blog/cabinet-hardware-guide"
        ogType="article"
      />

      <article className="min-h-screen bg-white">
        {/* Hero Section */}
        <header className="bg-gradient-to-br from-slate-50 to-white py-16 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/blog"
              className="inline-flex items-center text-primary hover:text-primary-dark mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            <div className="flex items-center gap-3 text-sm text-slate-600 mb-4">
              <span className="px-3 py-1 bg-primary-light text-primary rounded-full font-medium">
                How-To &amp; Education
              </span>
              <span>/</span>
              <span>Hardware Guide</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Cabinet Hardware Guide: Hinges, Slides, Pulls &amp; Knobs
            </h1>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <img src="https://owcahjzz8kidiuwp.public.blob.vercel-storage.com/1762209245901-apple-touch-icon.png" alt="YuDezign Team" className="w-10 h-10 rounded-full" />
                <span>By YuDezign Team</span>
              </div>
              <span>•</span>
              <span>April 22, 2026</span>
              <span>•</span>
              <span>11 min read</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
          <div className="rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=90"
              alt="Modern cabinet drawers with premium pulls and soft-close hardware"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <p className="text-xl text-slate-700 leading-relaxed mb-8">
              Hardware is where a cabinet is used—every open, close, and pull runs through it thousands of times a year. Homeowners obsess over doors and finishes, but it's the hinges and slides that decide whether cabinets feel luxurious or cheap a decade from now. This guide breaks hardware into two families: the <strong>functional hardware</strong> hidden inside (hinges and slides) and the <strong>decorative hardware</strong> you see and touch (knobs and pulls).
            </p>

            <p className="text-slate-700 leading-relaxed mb-8">
              We'll cover how to choose each, why the brand of your mechanism matters more than any other single spec, how to size and place pulls so they look intentional, and which finishes stay looking good in Houston's humidity.
            </p>

            {/* Functional hardware */}
            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Part 1: Functional Hardware (The Parts That Move)</h2>

            {/* Hinges */}
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Concealed Hinges</h3>

            <div className="bg-slate-50 rounded-xl p-6 mb-8">
              <p className="text-slate-700 leading-relaxed">
                Modern frameless cabinets use concealed European (cup) hinges—hidden inside the door and box, fully adjustable in three directions after installation. That adjustability is what keeps your door gaps a crisp, even 1/8" over the life of the cabinet. Ours open to 110° and are soft-close as standard, so doors glide shut silently instead of slamming.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start bg-green-50 p-4 rounded-lg">
                <Zap className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Soft-Close Standard</h4>
                  <p className="text-sm text-green-800">Integrated dampers stop the slam and protect the finish over years of use</p>
                </div>
              </div>
              <div className="flex items-start bg-green-50 p-4 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">3-Way Adjustable</h4>
                  <p className="text-sm text-green-800">Height, depth, and side alignment tuned after install for perfect gaps</p>
                </div>
              </div>
              <div className="flex items-start bg-green-50 p-4 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Full Overlay</h4>
                  <p className="text-sm text-green-800">Doors cover the box edge for the clean, seamless frameless look</p>
                </div>
              </div>
              <div className="flex items-start bg-green-50 p-4 rounded-lg">
                <Shield className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Lifetime Rated</h4>
                  <p className="text-sm text-green-800">Premium hinges are tested for 200,000+ open/close cycles</p>
                </div>
              </div>
            </div>

            {/* Drawer slides */}
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Drawer Slides</h3>

            <p className="text-slate-700 leading-relaxed mb-6">
              Slides are the single biggest upgrade you can feel. Cheap epoxy-coated side-mount slides feel gritty and only pull halfway out. We build with <strong>undermount, full-extension, soft-close slides</strong>—hidden beneath the drawer box so you see clean wood or finish, not metal rails.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Slide Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Extension</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Feel &amp; Look</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">Side-mount (basic)</td>
                    <td className="px-4 py-3 text-yellow-700">3/4 extension</td>
                    <td className="px-4 py-3 text-slate-700">Visible rails, back of drawer stays hidden</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">Ball-bearing side-mount</td>
                    <td className="px-4 py-3 text-green-600">Full extension</td>
                    <td className="px-4 py-3 text-slate-700">Smoother, still shows metal on the sides</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">Undermount soft-close</td>
                    <td className="px-4 py-3 text-green-700 font-semibold">Full extension</td>
                    <td className="px-4 py-3 text-slate-700">Hidden rails, silent close—our standard</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <p className="text-blue-900">
                <strong>Why full extension matters:</strong> A 3/4-extension slide leaves the back 6 inches of every drawer permanently out of reach. Full-extension slides let the whole drawer clear the cabinet, so you actually use the storage you paid for—especially valuable in deep kitchen and vanity drawers.
              </p>
            </div>

            {/* Brand */}
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Blum vs. Hettich: Does the Brand Matter?</h3>

            <p className="text-slate-700 leading-relaxed mb-6">
              Yes—more than almost any other choice. Both Blum (Austrian) and Hettich (German) are the gold standard in European cabinet hardware, and we build with both depending on tier. The mechanism is what you're really buying: the damper that never wears out, the tolerances that keep drawers gliding for decades, and the lifetime warranty that backs it.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-3">Blum</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Industry benchmark for hinges and slides</li>
                  <li>• TANDEM undermount slides, CLIP top hinges</li>
                  <li>• Lifetime mechanical warranty</li>
                  <li>• Our Premium-tier standard</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-3">Hettich</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Equally engineered German hardware</li>
                  <li>• Sensys hinges, Actro slides</li>
                  <li>• Excellent soft-close consistency</li>
                  <li>• Featured on our Luxury tier</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
              <p className="text-green-900">
                <strong>The takeaway:</strong> You can change a knob in five minutes with a screwdriver. You cannot easily change a hinge or slide once the cabinet is built. Spend your hardware budget on the mechanism first, the jewelry second.
              </p>
            </div>

            {/* Decorative hardware */}
            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Part 2: Decorative Hardware (Knobs &amp; Pulls)</h2>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Knobs vs. Pulls: When to Use Each</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-slate-200 rounded-xl p-6">
                <h4 className="font-semibold text-slate-900 mb-3">Knobs</h4>
                <p className="text-sm text-slate-700 mb-3">Single-screw round or shaped pieces. Traditional, economical, and quick to install.</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Best on doors and small drawers</li>
                  <li>• Classic, Shaker, and traditional looks</li>
                  <li>• Lower cost per piece</li>
                </ul>
              </div>
              <div className="border border-slate-200 rounded-xl p-6">
                <h4 className="font-semibold text-slate-900 mb-3">Pulls (Handles)</h4>
                <p className="text-sm text-slate-700 mb-3">Two-screw bars in many lengths. Easier to grip and read as more modern.</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Best on drawers and tall doors</li>
                  <li>• Modern, transitional, and contemporary looks</li>
                  <li>• More comfortable for heavy or frequently used drawers</li>
                </ul>
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed mb-8">
              A popular approach is to mix them: pulls on drawers, knobs on doors, all in the same finish. It reads as intentional and gives each piece the grip that suits it. And if you love a truly seamless look, you can skip decorative hardware entirely—see handleless below.
            </p>

            {/* Handleless */}
            <div className="bg-slate-50 rounded-xl p-6 mb-8">
              <h4 className="text-xl font-semibold text-slate-900 mb-3 flex items-center">
                <Sparkles className="w-5 h-5 text-primary mr-2" />
                The Handleless Option
              </h4>
              <p className="text-slate-700 leading-relaxed">
                For ultra-modern kitchens, integrated handles (a routed finger-pull, a J-profile edge, or a continuous channel rail) eliminate visible hardware for a clean, minimalist face. It's the signature of contemporary European design. Push-to-open mechanisms take it further, but for busy kitchens we usually recommend a routed grip so you're never fighting a latch with full hands.
              </p>
            </div>

            {/* Sizing */}
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Sizing Pulls: The Proportion Rules</h3>

            <p className="text-slate-700 leading-relaxed mb-6">
              Undersized hardware is the most common way a beautiful kitchen ends up looking "off." Scale the pull to the drawer or door, not to your hand:
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Ruler className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>Drawer pulls:</strong> Roughly 1/3 the width of the drawer front. A 30" drawer looks best with an 8"–12" pull, not a token 4" one.</span>
              </li>
              <li className="flex items-start">
                <Ruler className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>Door pulls:</strong> 3"–5" center-to-center for standard doors; go longer on tall pantry and appliance panels.</span>
              </li>
              <li className="flex items-start">
                <Ruler className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>Placement:</strong> Knobs at the door's lower corner (uppers) or upper corner (lowers); drawer pulls centered horizontally, centered or slightly high vertically.</span>
              </li>
              <li className="flex items-start">
                <Ruler className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>Consistency:</strong> Keep center-to-center spacing uniform across matching drawers so the runs line up.</span>
              </li>
            </ul>

            {/* Finishes */}
            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Choosing a Hardware Finish</h3>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Finish</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Best For</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Fingerprints</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Houston Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">Matte Black</td>
                    <td className="px-4 py-3 text-slate-700">Modern, transitional</td>
                    <td className="px-4 py-3 text-yellow-700">Shows some</td>
                    <td className="px-4 py-3 text-slate-700">On-trend, hides water spots well</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">Brushed Nickel</td>
                    <td className="px-4 py-3 text-slate-700">Everything</td>
                    <td className="px-4 py-3 text-green-700 font-semibold">Hides best</td>
                    <td className="px-4 py-3 text-slate-700">Most forgiving—great for busy baths</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">Polished Chrome</td>
                    <td className="px-4 py-3 text-slate-700">Contemporary, glam</td>
                    <td className="px-4 py-3 text-red-700">Shows most</td>
                    <td className="px-4 py-3 text-slate-700">Bright and easy to wipe clean</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">Brushed Brass / Gold</td>
                    <td className="px-4 py-3 text-slate-700">Warm, luxe</td>
                    <td className="px-4 py-3 text-green-600">Hides well</td>
                    <td className="px-4 py-3 text-slate-700">Choose lacquered to resist humidity tarnish</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
              <p className="text-yellow-900">
                <strong>Houston humidity tip:</strong> In bathrooms and near cooktops, favor lacquered or PVD-coated finishes. Unsealed "living finishes" like raw brass will patina fast in Gulf Coast humidity—beautiful if you want that, frustrating if you don't. Brushed nickel and matte black are the most forgiving day to day.
              </p>
            </div>

            {/* Coordinate */}
            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Coordinating Hardware with Your Whole Kitchen</h2>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>Match your faucet family, not exactly.</strong> Cabinet hardware should relate to your faucet and lighting finish—same undertone (warm vs. cool)—without needing to be identical.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>Two finishes max.</strong> A single hardware finish reads clean; a deliberate two-tone (e.g., black pulls, brass faucet) can work. Three or more looks accidental.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>Order a sample first.</strong> Finishes photograph differently than they look in your light. Hold one against your cabinet finish before committing to 40 pieces.</span>
              </li>
            </ul>

            {/* Mistakes */}
            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Hardware Mistakes to Avoid</h2>

            <div className="grid md:grid-cols-2 gap-4 mb-12">
              <div className="flex items-start bg-red-50 p-4 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">Cheaping out on slides</h4>
                  <p className="text-sm text-red-800">The one part you feel daily—never the place to save $20 a drawer</p>
                </div>
              </div>
              <div className="flex items-start bg-red-50 p-4 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">Pulls too small</h4>
                  <p className="text-sm text-red-800">Tiny hardware on big drawers looks like an afterthought</p>
                </div>
              </div>
              <div className="flex items-start bg-red-50 p-4 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">Mismatched undertones</h4>
                  <p className="text-sm text-red-800">Warm brass next to cool chrome fights instead of complementing</p>
                </div>
              </div>
              <div className="flex items-start bg-red-50 p-4 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">Raw brass in a wet room</h4>
                  <p className="text-sm text-red-800">Unsealed finishes tarnish quickly in Houston bathrooms</p>
                </div>
              </div>
            </div>

            {/* Key takeaways */}
            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Key Takeaways</h2>

            <div className="bg-primary-light rounded-xl p-8 mb-12">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900"><strong>Mechanism first.</strong> Undermount soft-close slides and adjustable concealed hinges matter more than any decorative choice.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900"><strong>Buy the brand.</strong> Blum and Hettich back their hardware for a lifetime—it's the part you can't swap later.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900"><strong>Scale pulls to the drawer.</strong> Aim for roughly one-third of the drawer width.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900"><strong>Pick a forgiving finish.</strong> Brushed nickel and matte black hide fingerprints and humidity best.</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center text-white mt-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Feel the Difference in Person
              </h2>
              <p className="text-lg text-slate-300 mb-6">
                Every YuDezign cabinet ships with premium soft-close Blum or Hettich hardware as standard. Visit the showroom to open a drawer, compare pull finishes, and see why the mechanism matters.
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all shadow-lg"
              >
                Schedule Showroom Visit
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/blog/flat-panel-vs-shaker-cabinet-doors" className="group">
                <div className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="font-semibold text-lg text-slate-900 group-hover:text-primary mb-2">
                    Flat Panel vs Shaker Cabinet Doors
                  </h3>
                  <p className="text-sm text-slate-600">
                    Match your hardware to the right door style.
                  </p>
                </div>
              </Link>
              <Link to="/blog/frameless-vs-framed-cabinets" className="group">
                <div className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="font-semibold text-lg text-slate-900 group-hover:text-primary mb-2">
                    Frameless vs Framed Cabinets
                  </h3>
                  <p className="text-sm text-slate-600">
                    How construction determines which hinges your cabinets use.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default CabinetHardwareGuide;
