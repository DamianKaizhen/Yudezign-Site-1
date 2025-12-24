import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../../components/SEO';
import { CheckCircle, AlertCircle, ArrowRight, ClipboardList, Camera } from 'lucide-react';

const MeasuringGuide: React.FC = () => {
  return (
    <>
      <SEO
        title="How to Measure for Custom Cabinets: Complete Step-by-Step Guide"
        description="Professional guide to measuring your kitchen for custom cabinets. Learn the exact process, tools needed, common mistakes to avoid, and how to create accurate measurements for your cabinet quote."
        keywords={[
          'how to measure for cabinets',
          'kitchen cabinet measurements',
          'measuring for custom cabinets',
          'cabinet measuring guide',
          'kitchen remodel measurements'
        ]}
        canonical="https://yudezign.com/blog/measuring-for-custom-cabinets-guide"
        ogType="article"
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
            <Link to="/blog" className="hover:text-primary">Blog</Link>
            <span>/</span>
            <span>How-To Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            How to Measure for Custom Cabinets: Step-by-Step Guide
          </h1>
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <img src="https://owcahjzz8kidiuwp.public.blob.vercel-storage.com/1762209245901-apple-touch-icon.png" alt="YuDezign Team" className="w-10 h-10 rounded-full" />
              <span>By YuDezign Team</span>
            </div>
            <span>•</span>
            <span>September 25, 2025</span>
            <span>•</span>
            <span>11 min read</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12 rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=90"
            alt="Person measuring kitchen for custom cabinets"
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-slate max-w-none">
          <p className="text-xl text-slate-700 leading-relaxed mb-8">
            Accurate measurements are the foundation of successful custom cabinets. While professional designers will
            verify measurements before fabrication, taking your own preliminary measurements helps you understand your
            space, get accurate quotes, and communicate effectively with your cabinet supplier. This guide teaches you
            the professional measurement process.
          </p>

          {/* Important Notice Box */}
          <div className="bg-accent-light border-2 border-primary rounded-xl p-6 my-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Important Note</h3>
                <p className="text-slate-700 mb-0">
                  These measurements are for preliminary quotes and planning. Professional cabinet makers will conduct
                  final field measurements before fabrication. Cabinets are made to your exact measurements—errors can
                  be costly. When in doubt, have a professional measure. Most Houston cabinet shops offer <strong>free
                  in-home measurement</strong> as part of the design consultation.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Tools You'll Need
          </h2>

          <div className="not-prose my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-slate-200">
                <h4 className="font-bold text-lg text-slate-900 mb-4">Essential Tools</h4>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>25' tape measure</strong> - Steel blade, locking mechanism</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Graph paper</strong> - 1/4" grid, legal size or larger</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Pencil and eraser</strong> - Mechanical pencil for precision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Clipboard or hardboard</strong> - Stable writing surface</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Smartphone camera</strong> - For reference photos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Flashlight</strong> - See in dark corners and cabinets</span>
                  </li>
                </ul>
              </div>

              <div className="bg-accent-light rounded-xl p-6 shadow-md border-2 border-primary">
                <h4 className="font-bold text-lg text-slate-900 mb-4">Optional But Helpful</h4>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Laser distance measurer</strong> - Fast, accurate for long runs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Level (2' or 4')</strong> - Check walls, floors, ceilings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Stud finder</strong> - Locate studs for mounting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Measuring app</strong> - Digital floor plan creation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Helper</strong> - Second person for long measurements</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Step 1: Create Your Floor Plan Sketch
          </h2>

          <p>
            Start by drawing a rough floor plan of your kitchen. This doesn't need to be to scale—just get the basic
            layout on paper:
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">What to Include in Your Sketch</h3>

          <ul className="space-y-2">
            <li>
              <strong>All walls:</strong> Draw the perimeter of your kitchen as a rectangle or L-shape. Mark which
              walls will have cabinets.
            </li>
            <li>
              <strong>Windows:</strong> Show location and approximate size. Mark window sill height and header height.
            </li>
            <li>
              <strong>Doors:</strong> Include all doorways, noting swing direction and door width. Mark interior doors,
              exterior doors, and closet doors.
            </li>
            <li>
              <strong>Appliances:</strong> Show refrigerator, range/cooktop, dishwasher, microwave, and any other
              appliances. Note if keeping existing or buying new.
            </li>
            <li>
              <strong>Sink:</strong> Mark sink location and whether it's under a window or on an island.
            </li>
            <li>
              <strong>Plumbing and electrical:</strong> Note existing water supply lines, drain locations, gas lines,
              electrical outlets, and light switches.
            </li>
            <li>
              <strong>Obstacles:</strong> Include HVAC vents, radiators, electrical panels, or structural elements
              that affect cabinet placement.
            </li>
          </ul>

          <div className="not-prose bg-slate-50 border-l-4 border-primary p-6 my-8">
            <div className="flex items-start gap-3">
              <Camera className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Pro Tip: Take Photos</h4>
                <p className="text-slate-700 mb-0">
                  Take photos of each wall from corner to corner. Stand in the doorway and shoot the overall layout.
                  Photograph problem areas (odd angles, soffits, windows). These visual references are invaluable when
                  reviewing your measurements later and help designers understand your space.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Step 2: Measure Wall Lengths
          </h2>

          <p>
            Now add actual measurements to your sketch. Follow these critical steps:
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Measuring Technique</h3>

          <ol className="space-y-3">
            <li>
              <strong>Measure wall-to-wall (overall dimensions):</strong> Start by measuring the total length of each
              wall from corner to corner at cabinet height (36" for base cabinets, 54" for uppers). Write this as your
              "overall" dimension.
            </li>
            <li>
              <strong>Measure at multiple heights:</strong> Walls aren't always perfectly straight. Measure each wall
              at floor level, mid-height (36"), and ceiling level. If measurements differ by more than 1/2", note this—
              custom cabinets can accommodate, but designer needs to know.
            </li>
            <li>
              <strong>Use running measurements:</strong> Rather than measuring each segment separately, run your tape
              continuously along the wall and note cumulative distances to each feature (window edge, door, outlet).
              This eliminates compounding measurement errors.
            </li>
            <li>
              <strong>Record to 1/16" precision:</strong> Write measurements as fractions (e.g., 124 3/8") not decimals.
              Cabinets are built to 1/16" accuracy.
            </li>
            <li>
              <strong>Label everything clearly:</strong> Write "overall = 124 3/8″" for wall length. Mark "to window
              left edge = 48 1/4″" and "to window right edge = 84 7/8″" for running dimensions.
            </li>
          </ol>

          <div className="not-prose bg-red-50 border-2 border-red-600 rounded-xl p-6 my-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 mb-3">Common Measurement Mistakes</h4>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>Measuring each section separately and adding them up (errors compound)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>Assuming walls are square or plumb (most aren't—always verify)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>Measuring to baseboard or trim instead of actual wall surface</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>Rounding measurements to nearest inch ("close enough" = costly errors)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>Forgetting to measure ceiling height (varies in older Houston homes)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Step 3: Measure Windows and Doors
          </h2>

          <p>
            Windows and doors significantly impact cabinet placement. Record these measurements:
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">For Each Window</h3>

          <ul className="space-y-2">
            <li>
              <strong>Width:</strong> Measure trim-to-trim (outside dimension) and also rough opening if visible
            </li>
            <li>
              <strong>Height from floor to sill:</strong> Bottom of window to finished floor
            </li>
            <li>
              <strong>Height from floor to header:</strong> Top of window trim to finished floor
            </li>
            <li>
              <strong>Distance from corner:</strong> Left edge of window trim to adjacent corner
            </li>
            <li>
              <strong>Sill depth:</strong> How far window sill projects into room (affects faucet and cabinet clearance)
            </li>
            <li>
              <strong>Casing/trim dimensions:</strong> Width of trim around window
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">For Each Door</h3>

          <ul className="space-y-2">
            <li>
              <strong>Door width:</strong> Trim-to-trim opening width
            </li>
            <li>
              <strong>Door height:</strong> Floor to top of door trim
            </li>
            <li>
              <strong>Swing direction:</strong> Note which way door swings (into or out of kitchen)
            </li>
            <li>
              <strong>Distance from corner:</strong> Left edge of trim to nearest corner
            </li>
            <li>
              <strong>Casing width:</strong> Door trim width on kitchen side
            </li>
            <li>
              <strong>Clearance needed:</strong> Measure door swing path—cabinets can't interfere
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Step 4: Measure Ceiling Heights
          </h2>

          <p>
            Ceiling height determines upper cabinet sizing and whether you can add crown molding or go to ceiling:
          </p>

          <ul className="space-y-2">
            <li>
              <strong>Measure in multiple locations:</strong> Houston homes, especially older ones, rarely have perfectly
              level ceilings. Measure height at several points along each wall.
            </li>
            <li>
              <strong>From finished floor to ceiling:</strong> Measure in at least 3 spots per wall. Note lowest
              measurement—this is your limiting height.
            </li>
            <li>
              <strong>Check for soffits or bulkheads:</strong> Measure distance from floor to bottom of soffit if present.
              Note soffit depth (how far it projects from wall).
            </li>
            <li>
              <strong>Record variations:</strong> If ceiling slopes or varies more than 1", document this. Custom cabinets
              can scribe to sloped ceilings but designer needs to know.
            </li>
          </ul>

          <div className="not-prose bg-slate-50 border-l-4 border-primary p-6 my-8">
            <p className="text-slate-700 mb-0">
              <strong>Houston homes note:</strong> Many Houston homes built 1970s-1990s have 8' ceilings. Newer construction
              typically has 9-10' ceilings. This affects upper cabinet height options. Standard upper cabinets are 30",
              36", or 42" tall. With 8' ceilings, 36" uppers are typical. With 9-10' ceilings, 42" uppers or stacked
              configurations work well.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Step 5: Measure Appliance Spaces
          </h2>

          <p>
            Appliances require specific clearances. Measure existing appliances or check specs for new appliances:
          </p>

          <div className="not-prose my-8">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Appliance</th>
                    <th className="px-6 py-4 text-left font-semibold">What to Measure</th>
                    <th className="px-6 py-4 text-left font-semibold">Standard Size</th>
                    <th className="px-6 py-4 text-left font-semibold">Clearance Needed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">Refrigerator</td>
                    <td className="px-6 py-4 text-slate-700 text-sm">Width, depth, height (with door open)</td>
                    <td className="px-6 py-4 text-slate-700">36" wide</td>
                    <td className="px-6 py-4 text-slate-700 text-sm">1" sides, 1" top, 2" back</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">Range/Cooktop</td>
                    <td className="px-6 py-4 text-slate-700 text-sm">Width, depth, height to cooking surface</td>
                    <td className="px-6 py-4 text-slate-700">30" or 36"</td>
                    <td className="px-6 py-4 text-slate-700 text-sm">0" sides (fills opening)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">Dishwasher</td>
                    <td className="px-6 py-4 text-slate-700 text-sm">Width, height (with adjustable feet)</td>
                    <td className="px-6 py-4 text-slate-700">24" wide</td>
                    <td className="px-6 py-4 text-slate-700 text-sm">24-1/8" opening needed</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">Microwave (built-in)</td>
                    <td className="px-6 py-4 text-slate-700 text-sm">Width, height, depth, vent location</td>
                    <td className="px-6 py-4 text-slate-700">24-30" wide</td>
                    <td className="px-6 py-4 text-slate-700 text-sm">Per mfr. spec sheet</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">Wall Oven</td>
                    <td className="px-6 py-4 text-slate-700 text-sm">Width, height, depth, electrical location</td>
                    <td className="px-6 py-4 text-slate-700">27" or 30"</td>
                    <td className="px-6 py-4 text-slate-700 text-sm">Per mfr. cutout spec</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p>
            <strong>Critical:</strong> If buying new appliances, get exact model numbers and download specification
            sheets showing cutout dimensions. Cabinet makers need precise measurements—"standard refrigerator" isn't
            specific enough. Counter-depth models, French door fridges, and professional ranges have different clearances.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Step 6: Measure Plumbing and Electrical
          </h2>

          <p>
            Utilities affect cabinet design and must be accurately documented:
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Plumbing Measurements</h3>

          <ul className="space-y-2">
            <li>
              <strong>Sink drain location:</strong> Measure from corner and from floor to center of drain
            </li>
            <li>
              <strong>Water supply lines:</strong> Hot and cold line locations, distance from corner and floor
            </li>
            <li>
              <strong>Gas line (if applicable):</strong> Location for range, distance from corner and floor
            </li>
            <li>
              <strong>Dishwasher connections:</strong> Water supply and drain location
            </li>
            <li>
              <strong>Ice maker line:</strong> If refrigerator has ice maker
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Electrical Measurements</h3>

          <ul className="space-y-2">
            <li>
              <strong>Outlet locations:</strong> Height from floor, distance from corners. Note if GFCI required.
            </li>
            <li>
              <strong>Switch locations:</strong> Position and what they control
            </li>
            <li>
              <strong>Appliance circuits:</strong> 240V for range/oven, dedicated 20A circuits for others
            </li>
            <li>
              <strong>Under-cabinet lighting:</strong> Existing or planned locations for hardwired lights
            </li>
          </ul>

          <div className="not-prose bg-accent-light border-2 border-primary rounded-xl p-6 my-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Relocating Utilities</h4>
                <p className="text-slate-700 mb-0">
                  Moving plumbing or electrical requires licensed contractors and permits in Houston. If your
                  measurements show outlets or plumbing in bad locations (middle of wall where cabinet needs to be),
                  discuss relocation costs with your cabinet designer. Budget $200-$500 per outlet/switch moved,
                  $500-$1,500 for plumbing relocation.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Step 7: Check for Level and Plumb
          </h2>

          <p>
            Walls, floors, and ceilings in real homes are rarely perfectly level or plumb. Document these issues:
          </p>

          <ul className="space-y-2">
            <li>
              <strong>Floor level:</strong> Place level across floor in multiple directions. Houston homes on clay soil
              often have settling—floors may slope 1-2" across kitchen.
            </li>
            <li>
              <strong>Wall plumb:</strong> Check if walls are vertically straight using level. Walls may lean in or out.
            </li>
            <li>
              <strong>Wall square:</strong> Check corner angles with framing square or 3-4-5 triangle method. Few
              corners are exactly 90°.
            </li>
            <li>
              <strong>Ceiling level:</strong> Already measured heights—note if ceiling slopes or sags.
            </li>
          </ul>

          <p>
            <strong>Document but don't worry:</strong> Professional cabinet installers handle out-of-level floors and
            walls with shims and scribes. Custom cabinets can accommodate these imperfections—but designers need to
            know about them upfront.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Room-by-Room Measurement Guides
          </h2>

          <p>
            Different rooms have unique measurement requirements. Here's detailed guidance for each space:
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Kitchen Measurements</h3>

          <p>
            Kitchens are the most complex rooms to measure due to multiple appliances, plumbing, and electrical requirements:
          </p>

          <div className="not-prose my-6">
            <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
              <h4 className="font-bold text-lg text-slate-900 mb-4">Kitchen-Specific Measurements</h4>
              <ul className="space-y-3 text-slate-700 text-sm">
                <li>
                  <strong>Base cabinet runs:</strong> Measure from wall to wall at 36" height (standard countertop).
                  Check for variations at floor level and ceiling—note if walls bow in or out. Standard base depth is 24"
                  but measure existing depth if replacing cabinets in same footprint.
                </li>
                <li>
                  <strong>Upper cabinet zones:</strong> Measure wall space from 54" to ceiling height. Standard upper
                  cabinet bottom is 54" from floor (18" above 36" countertop). If you have taller family members or want
                  lower uppers for accessibility, note preferred height.
                </li>
                <li>
                  <strong>Island/peninsula measurements:</strong> Measure available floor space, allowing 36-48" walkway
                  clearance on all working sides. Note if island will house sink (plumbing location) or cooktop (electrical/gas
                  requirements). Standard island height is 36" to match counters, or 42" for bar seating.
                </li>
                <li>
                  <strong>Range hood clearance:</strong> Measure from cooktop surface to bottom of hood (30" minimum for
                  gas, 24" for electric). Note duct location if venting outside, or plan for recirculating hood. Measure
                  width of range and add 3-6" for adequate hood coverage.
                </li>
                <li>
                  <strong>Pantry cabinet space:</strong> Floor-to-ceiling pantries require exact ceiling height and width
                  measurements. Note door swing clearance—pantry doors are typically 18-24" wide and need clear swing space.
                  Measure depth available (12", 18", or 24" pantries are standard).
                </li>
                <li>
                  <strong>Corner cabinets:</strong> Measure both walls forming corner. Note corner type (90°, 45°, or odd
                  angle). Corner cabinets require special configurations—lazy susan, blind corner, or diagonal corner solutions.
                  Measure access clearance for corner mechanisms.
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Bathroom Vanity Measurements</h3>

          <p>
            Bathroom vanities have tight clearances and specific plumbing considerations:
          </p>

          <ul className="space-y-2">
            <li>
              <strong>Available wall width:</strong> Measure wall-to-wall where vanity will mount. Account for door swing
              clearances (minimum 21" clear space in front of vanity). Standard single vanities are 24-48" wide, double
              vanities 60-72".
            </li>
            <li>
              <strong>Plumbing rough-in:</strong> Measure from wall to center of drain (typically 12-18" from side wall).
              Measure height of drain stub-out from floor (typically 20-24"). Note water supply line locations (hot and cold,
              usually 8" apart, 20-22" from floor).
            </li>
            <li>
              <strong>Depth constraints:</strong> Standard vanity depth is 21", but measure available depth. Check for
              protruding toilet tanks, towel bars, or doors that limit depth. Shallow vanities (16-18") available for tight
              bathrooms.
            </li>
            <li>
              <strong>Mirror and medicine cabinet:</strong> Measure from vanity top to ceiling or light fixture. Medicine
              cabinets typically mount 48-54" from floor to bottom edge. Note electrical outlet locations for lighted mirrors.
            </li>
            <li>
              <strong>Toilet clearance:</strong> Measure distance between vanity edge and toilet center (minimum 15" toilet
              code clearance, 18" preferred for comfort). Check that vanity doors/drawers don't hit toilet when open.
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Closet System Measurements</h3>

          <p>
            Custom closet systems maximize every inch of storage space through precise measurements:
          </p>

          <ul className="space-y-2">
            <li>
              <strong>Interior dimensions:</strong> Measure width, depth, and height of closet interior (not door opening).
              Measure wall-to-wall at multiple heights—closets in older homes often have uneven walls. Note any slopes or
              irregularities.
            </li>
            <li>
              <strong>Door opening and type:</strong> Measure door width and height. Note door type (hinged, sliding, bi-fold).
              Hinged doors need swing clearance. Sliding doors limit access to half the closet at once—affects layout planning.
            </li>
            <li>
              <strong>Clothing inventory:</strong> Count hanging clothes (short hang 40-45", long hang 60-72"). Count folded
              items, shoes, accessories. This determines shelf, drawer, and rod quantities. Typical person needs 4-6 linear
              feet of hanging space.
            </li>
            <li>
              <strong>Corner configurations:</strong> Walk-in closets have corners. Measure corner angle (usually 90° but
              verify). Note depth available on each wall. Corners can use corner rods, corner shelves, or remain open for access.
            </li>
            <li>
              <strong>Floor and ceiling clearances:</strong> Measure from floor to lowest point of ceiling (often sloped in
              bedroom closets). Closet systems can be floor-mounted, wall-mounted, or floor-to-ceiling. Note baseboards and
              crown molding—may need removal or accommodation.
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Home Office Cabinet Measurements</h3>

          <p>
            Built-in home offices require ergonomic measurements for comfortable work:
          </p>

          <ul className="space-y-2">
            <li>
              <strong>Desk height and depth:</strong> Standard desk height is 29-30" (lower than kitchen counters). Measure
              available wall length and depth. Minimum comfortable desk depth is 24", 30" preferred for dual monitors. Note
              if standing desk or adjustable height desired.
            </li>
            <li>
              <strong>Leg clearance:</strong> Under desk knee space should be 24" wide minimum, 27" high, 19" deep. If adding
              file drawers under desk, allow clearance on at least one side for chair access.
            </li>
            <li>
              <strong>Monitor placement:</strong> Measure from desk surface to eye level when seated (monitor top should be
              at or slightly below eye level). Upper cabinets or open shelving should clear monitor height plus 4-6".
            </li>
            <li>
              <strong>Electrical and data:</strong> Measure location of existing outlets. Offices need multiple outlets—plan
              for computers, monitors, printers, chargers, desk lamps. Note if CAT6 or fiber optic runs needed for hardwired
              internet. Built-in cable management requires planning.
            </li>
            <li>
              <strong>Storage requirements:</strong> Measure file drawers needed (legal or letter size), printer space (measure
              printer dimensions plus paper clearance), book shelving (measure tallest books plus 1-2" clearance). Note if
              lateral file cabinets or vertical files preferred.
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Garage Cabinet Measurements</h3>

          <p>
            Garage cabinets handle heavy loads and have different requirements than interior cabinets:
          </p>

          <ul className="space-y-2">
            <li>
              <strong>Wall construction:</strong> Determine if garage walls are drywall (requires stud mounting), concrete
              block, or exposed studs. Measure stud spacing with stud finder (16" or 24" on-center). Concrete requires special
              anchors—note wall type for installer.
            </li>
            <li>
              <strong>Floor conditions:</strong> Garage floors are often uneven. Measure floor slope (garage floors slope
              toward door for drainage). Cabinet bases can be shimmed but excessive slopes (more than 2" across cabinet run)
              may require leveling solutions.
            </li>
            <li>
              <strong>Overhead clearance:</strong> Measure from floor to garage door tracks and opener. Wall cabinets can't
              interfere with door operation. Measure car hood height when parked—cabinets shouldn't protrude where car parks.
              Consider overhead storage racks above garage door.
            </li>
            <li>
              <strong>Door and window clearances:</strong> Measure garage entry door swing, man door locations, windows.
              Note garage door opener location—may affect cabinet placement. Measure water heater, HVAC, electrical panel
              locations—must remain accessible.
            </li>
            <li>
              <strong>Heavy storage needs:</strong> Measure and note heavy items to store (tool boxes, paint cans, automotive
              fluids, seasonal equipment). Heavy-duty garage cabinets have reinforced backs and shelves—designer needs to know
              load requirements. Plan for slatwall, pegboard, or tool organization systems.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Advanced Measurement Techniques
          </h2>

          <p>
            Professional cabinet makers use these techniques for difficult measurements:
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Diagonal Measurements for Squareness</h3>

          <p>
            To verify if a room is square, measure diagonals. In a perfectly square room, opposite diagonal measurements
            should be equal. For example, in a rectangular kitchen:
          </p>

          <ol className="space-y-2">
            <li>Measure from top-left corner to bottom-right corner (diagonal A)</li>
            <li>Measure from top-right corner to bottom-left corner (diagonal B)</li>
            <li>Compare measurements: If diagonal A = 180 1/4" and diagonal B = 179 3/4", room is out of square by 1/2"</li>
            <li>Document this—cabinets in corners will need scribing to accommodate out-of-square walls</li>
          </ol>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">The 3-4-5 Triangle Method</h3>

          <p>
            To check if a corner is exactly 90 degrees without a protractor:
          </p>

          <ol className="space-y-2">
            <li>Mark a point 3 feet from corner along one wall</li>
            <li>Mark a point 4 feet from corner along the other wall</li>
            <li>Measure distance between these two marks—should be exactly 5 feet if corner is 90°</li>
            <li>For larger spaces, use multiples: 6-8-10 feet, or 9-12-15 feet</li>
            <li>If measurement differs from 5 feet, corner angle is not 90°—document actual angle or difference</li>
          </ol>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Story Pole Technique</h3>

          <p>
            Professional installers create "story poles"—long straight boards marked with exact measurements:
          </p>

          <ul className="space-y-2">
            <li>
              <strong>What it is:</strong> A 1x2 or 1x3 board cut slightly longer than wall length. Instead of writing
              measurements, you mark actual positions of windows, doors, outlets directly on the board.
            </li>
            <li>
              <strong>Benefits:</strong> Eliminates transcription errors. Visual representation of space. Can lay story
              pole against wall during installation to verify cabinet placement. Particularly useful for complex walls
              with many obstacles.
            </li>
            <li>
              <strong>How to create:</strong> Cut board to wall length. Hold against wall. Mark window edges, door edges,
              outlet positions, switch positions directly on board with pencil. Label each mark clearly. Create separate
              story poles for base cabinet height and upper cabinet height.
            </li>
            <li>
              <strong>When to use:</strong> Long walls with many features. Angled walls or unusual layouts. When multiple
              people are involved in measuring and installation. Bring story pole to cabinet design consultation.
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Digital Measuring Tools and Apps</h3>

          <p>
            Modern technology offers measurement assistance, but has limitations:
          </p>

          <ul className="space-y-2">
            <li>
              <strong>Laser distance measurers:</strong> Accurate to 1/16" for distances up to 100+ feet. Ideal for long
              walls, ceiling heights, diagonal measurements. Limitations: Needs target surface (doesn't work well on
              windows or dark surfaces). Costs $30-$200 depending on features.
            </li>
            <li>
              <strong>3D room scanning apps:</strong> Apps like Magicplan, RoomScan, or Canvas use phone camera/LiDAR to
              create floor plans. Pros: Fast, creates digital floor plan, useful for preliminary space understanding. Cons:
              Not accurate enough for cabinet fabrication (typical accuracy ±2-4"), misses details like outlet locations,
              plumbing positions.
            </li>
            <li>
              <strong>Augmented reality (AR) visualization:</strong> Apps like Houzz, IKEA Place show how cabinets look in
              space. Great for design visualization and style decisions. Not suitable for measurement—use for inspiration
              and planning, not for dimensional accuracy.
            </li>
            <li>
              <strong>Digital calipers:</strong> For measuring small gaps, appliance openings, or hardware positions.
              Accurate to 1/32" or better. Useful when measuring existing cabinet hardware spacing to match new cabinets
              to old style.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Common Measurement Scenarios and Solutions
          </h2>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Scenario 1: Kitchen with Sloped Floor</h3>

          <div className="not-prose bg-slate-50 border-l-4 border-primary p-6 my-6">
            <p className="text-slate-700 mb-3">
              <strong>Problem:</strong> Houston home on clay soil, kitchen floor slopes 1.5" from one wall to opposite wall.
              How do you measure for level cabinets?
            </p>
            <p className="text-slate-700 mb-0">
              <strong>Solution:</strong> Measure floor height at multiple points along each wall. Mark highest and lowest
              points. On your sketch, note "floor slopes 1.5" high to low from north wall to south wall." Cabinets will be
              shimmed level during installation—installers need to know slope severity to bring correct shim materials. Severe
              slopes may require platform/false floor. Your measurements show the problem; professional solves it.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Scenario 2: Window Above Kitchen Sink</h3>

          <div className="not-prose bg-slate-50 border-l-4 border-primary p-6 my-6">
            <p className="text-slate-700 mb-3">
              <strong>Problem:</strong> Planning sink under window. Need to ensure faucet doesn't hit window when operating.
            </p>
            <p className="text-slate-700 mb-0">
              <strong>Solution:</strong> Measure: (1) Window sill height from floor, (2) Window sill depth/projection into
              room, (3) Desired sink location (typically centered under window). Calculate: Standard counter height 36" +
              sink depth 8-10" + faucet height 8-12" = 52-58" total. If window sill is 42" from floor, faucet will hit
              window. Solutions: Use low-profile faucet, offset sink slightly, or lower window sill (requires reframing).
              Document measurements and discuss options with designer.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Scenario 3: Odd-Angled Corner</h3>

          <div className="not-prose bg-slate-50 border-l-4 border-primary p-6 my-6">
            <p className="text-slate-700 mb-3">
              <strong>Problem:</strong> Kitchen corner is 85° instead of 90° (older home settled, walls shifted). How to
              measure and specify?
            </p>
            <p className="text-slate-700 mb-0">
              <strong>Solution:</strong> Measure both wall lengths as normal. Use 3-4-5 triangle method or protractor to
              measure actual angle. Document: "Southwest corner measures 85° (5° off square)." Take photos showing gap at
              ceiling or floor where walls don't meet squarely. Custom cabinets can be built to odd angles—common solutions
              include angled corner cabinet, filler strip to square up corner, or scribing cabinet to angle. Designer will
              propose solution, but needs angle measurement.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Measurement Checklist
          </h2>

          <div className="not-prose my-8">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 shadow-lg border-2 border-slate-300">
              <div className="flex items-center gap-3 mb-4">
                <ClipboardList className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-bold text-slate-900">Complete Measurement Checklist</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-primary" />
                    <span className="text-slate-700">Floor plan sketch with walls, doors, windows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-primary" />
                    <span className="text-slate-700">Overall wall lengths (corner to corner)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-primary" />
                    <span className="text-slate-700">Running dimensions to windows/doors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-primary" />
                    <span className="text-slate-700">Window widths, sill heights, header heights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-primary" />
                    <span className="text-slate-700">Door widths, heights, swing directions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-primary" />
                    <span className="text-slate-700">Ceiling heights (multiple locations per wall)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-primary" />
                    <span className="text-slate-700">Soffit dimensions and locations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-primary" />
                    <span className="text-slate-700">Appliance dimensions and clearances</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-primary" />
                    <span className="text-slate-700">Plumbing locations (sink, dishwasher, gas)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-primary" />
                    <span className="text-slate-700">Electrical outlets and switches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-primary" />
                    <span className="text-slate-700">HVAC vents and returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-primary" />
                    <span className="text-slate-700">Floor/wall/ceiling level checks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-primary" />
                    <span className="text-slate-700">Photos of each wall and problem areas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-primary" />
                    <span className="text-slate-700">Notes on existing cabinet layout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-primary" />
                    <span className="text-slate-700">Special requests or problem areas noted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-primary" />
                    <span className="text-slate-700">Appliance spec sheets (if buying new)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Special Considerations for Houston Homes
          </h2>

          <p>
            Houston's unique housing characteristics require extra attention:
          </p>

          <ul className="space-y-3">
            <li>
              <strong>Foundation settlement:</strong> Clay soil causes shifting. Older homes may have sloped floors
              (1-2" across kitchen). Measure floor level in multiple spots—installers will shim cabinets but need to
              know severity.
            </li>
            <li>
              <strong>Older home quirks:</strong> Pre-1990 Houston homes often have non-standard dimensions. Wall
              studs may be 24" on-center instead of 16". Confirm stud locations with stud finder—affects cabinet
              mounting.
            </li>
            <li>
              <strong>Open floor plans:</strong> Many Houston homes have kitchens open to living areas. Measure sight
              lines—cabinet heights and layouts affect views. Note where island or peninsula will be visible from
              living room.
            </li>
            <li>
              <strong>Hurricane/storm prep:</strong> Some Houston homeowners want lower cabinets for emergency water
              storage. Note if you want reinforced base cabinet for heavy water case storage.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Organizing Your Measurements
          </h2>

          <p>
            Once you've measured everything, organize information for your cabinet consultation:
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Create a Measurement Package</h3>

          <div className="not-prose my-6">
            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-primary">
              <h4 className="font-bold text-lg text-slate-900 mb-3">What to Include</h4>
              <ol className="space-y-2 text-slate-700 text-sm list-decimal list-inside">
                <li>
                  <strong>Floor plan sketch</strong> with all measurements labeled clearly
                </li>
                <li>
                  <strong>Photo collection</strong> - organized by wall (North wall, South wall, etc.)
                </li>
                <li>
                  <strong>Measurement list</strong> - typed summary of critical dimensions
                </li>
                <li>
                  <strong>Appliance specifications</strong> - cutout sheets for all new appliances
                </li>
                <li>
                  <strong>Notes and concerns</strong> - anything unusual or questions you have
                </li>
                <li>
                  <strong>Inspiration photos</strong> - examples of styles, colors, features you like
                </li>
              </ol>
            </div>
          </div>

          <p>
            Digital format is best—scan or photograph your sketch, create a folder with all photos, compile everything
            into a PDF or shared folder (Google Drive, Dropbox) you can email to cabinet suppliers.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            What Happens Next
          </h2>

          <p>
            After you submit your measurements to a cabinet supplier:
          </p>

          <ol className="space-y-3">
            <li>
              <strong>Initial consultation:</strong> Designer reviews your measurements and photos, discusses your
              needs, style preferences, and budget.
            </li>
            <li>
              <strong>In-home verification:</strong> Professional designer visits your home to verify measurements,
              check for issues you might have missed, and assess installation challenges.
            </li>
            <li>
              <strong>3D design creation:</strong> Designer creates detailed 3D rendering showing proposed cabinet
              layout, door styles, colors. You'll see exactly what finished kitchen will look like.
            </li>
            <li>
              <strong>Quote development:</strong> Detailed pricing broken down by cabinet section, materials, hardware,
              accessories, installation.
            </li>
            <li>
              <strong>Revisions:</strong> Adjust design based on your feedback—move cabinets, change sizes, swap
              features. Most suppliers include 2-3 revision rounds free.
            </li>
            <li>
              <strong>Final approval:</strong> Once design and pricing are approved, cabinets are ordered for
              manufacturing.
            </li>
          </ol>

          <p className="mt-6">
            Learn more about the process in our <Link to="/blog/custom-cabinet-cost-guide-houston-2025" className="text-primary hover:text-primary-dark font-semibold">Custom Cabinet Cost Guide</Link>.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="not-prose space-y-4 my-8">
            <details className="bg-slate-50 rounded-xl shadow-md overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-accent-light transition-colors flex items-center justify-between">
                <span>Do I really need to measure if professional will re-measure anyway?</span>
                <ArrowRight className="w-5 h-5 text-primary transform group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 py-4 text-slate-600 border-t border-slate-200 bg-white">
                Yes. Your measurements serve multiple purposes: (1) Help you understand your space and what's possible,
                (2) Allow suppliers to give preliminary quotes so you can compare prices, (3) Identify potential issues
                before designer visit, (4) Save time during consultation by having basic info ready. Professional
                verification catches errors but your prep work streamlines the process.
              </div>
            </details>

            <details className="bg-slate-50 rounded-xl shadow-md overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-accent-light transition-colors flex items-center justify-between">
                <span>How accurate do my measurements need to be?</span>
                <ArrowRight className="w-5 h-5 text-primary transform group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 py-4 text-slate-600 border-t border-slate-200 bg-white">
                For preliminary quotes and planning, measurements within 1/4" are sufficient. For final fabrication,
                professionals measure to 1/16" accuracy. Don't obsess over perfection in your initial measurements—focus
                on capturing overall dimensions, obstacle locations, and special conditions. Designers will verify
                critical measurements before ordering cabinets.
              </div>
            </details>

            <details className="bg-slate-50 rounded-xl shadow-md overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-accent-light transition-colors flex items-center justify-between">
                <span>What if my kitchen is an unusual shape or has odd angles?</span>
                <ArrowRight className="w-5 h-5 text-primary transform group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 py-4 text-slate-600 border-t border-slate-200 bg-white">
                Document it as best you can with photos and measurements. Measure angles using protractor or smartphone
                app. Custom cabinets excel at handling unusual layouts—angled corners, curved walls, non-standard
                heights. The more information you provide about irregularities, the better designer can plan. This is
                exactly why custom cabinets exist—to fit your unique space perfectly.
              </div>
            </details>

            <details className="bg-slate-50 rounded-xl shadow-md overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-accent-light transition-colors flex items-center justify-between">
                <span>Should I measure with existing cabinets in place or removed?</span>
                <ArrowRight className="w-5 h-5 text-primary transform group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 py-4 text-slate-600 border-t border-slate-200 bg-white">
                Measure with existing cabinets in place for preliminary planning. Measure from wall-to-wall behind
                cabinets as best you can (pull out drawers, reach behind). Note existing cabinet layout—helps designer
                understand current plumbing and electrical locations. Once old cabinets are removed, professional will
                re-measure bare walls before ordering new cabinets. Removing cabinets often reveals surprises (outlet
                locations, wall damage, plumbing issues).
              </div>
            </details>

            <details className="bg-slate-50 rounded-xl shadow-md overflow-hidden group">
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-accent-light transition-colors flex items-center justify-between">
                <span>How long does the measurement and design process take?</span>
                <ArrowRight className="w-5 h-5 text-primary transform group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 py-4 text-slate-600 border-t border-slate-200 bg-white">
                Timeline: DIY measurements (2-3 hours), submit to suppliers (same day), receive preliminary quotes
                (3-5 days), schedule in-home consultation (1-2 weeks out), designer verification visit (1-2 hours),
                receive detailed 3D design and quote (5-7 days), review and revisions (1-2 weeks). Total: 3-5 weeks
                from initial measurement to approved design. Add 2-12 weeks for cabinet manufacturing depending on
                custom vs. semi-custom.
              </div>
            </details>
          </div>

          {/* CTA Section */}
          <div className="not-prose my-12">
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Skip the Measuring—We'll Handle It
              </h3>
              <p className="text-xl text-accent-light mb-6">
                Free in-home measurement and 3D design with every Houston cabinet consultation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-accent-light transition-all shadow-lg hover:shadow-xl"
                >
                  Schedule Free Measurement
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/services/kitchen-cabinets"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary-dark text-white rounded-lg font-semibold hover:bg-primary-dark transition-all"
                >
                  View Cabinet Options
                </Link>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            Final Thoughts
          </h2>

          <p>
            Measuring for custom cabinets is a learnable skill, but it requires patience, attention to detail, and
            proper tools. Your preliminary measurements provide valuable information for quotes and planning, but
            professional verification is essential before cabinet fabrication.
          </p>

          <p>
            Don't stress about achieving perfect measurements—focus on capturing overall dimensions, noting obstacles
            and utilities, and documenting your space thoroughly with photos. Professional cabinet designers have seen
            it all and can work with your measurements to create accurate layouts.
          </p>

          <p className="mb-0">
            Most Houston cabinet shops offer free in-home measurements as part of the design consultation. Take
            advantage of this service—it ensures accuracy, saves you time, and allows you to focus on design decisions
            rather than measurement precision. Your preliminary work still helps designers understand your space faster
            and serves as a reference point throughout the project.
          </p>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/blog/custom-cabinet-cost-guide-houston-2025" className="group">
              <div className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-primary">
                <h4 className="font-semibold text-lg text-slate-900 group-hover:text-primary mb-2">
                  Custom Cabinet Cost Guide 2025
                </h4>
                <p className="text-sm text-slate-600">
                  Budget for your custom cabinet project
                </p>
              </div>
            </Link>

            <Link to="/blog/kitchen-trends-2025" className="group">
              <div className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-primary">
                <h4 className="font-semibold text-lg text-slate-900 group-hover:text-primary mb-2">
                  Kitchen Cabinet Trends 2025
                </h4>
                <p className="text-sm text-slate-600">
                  Design inspiration for your new cabinets
                </p>
              </div>
            </Link>

            <Link to="/blog/frameless-vs-framed-cabinets" className="group">
              <div className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-primary">
                <h4 className="font-semibold text-lg text-slate-900 group-hover:text-primary mb-2">
                  Frameless vs Framed Cabinets
                </h4>
                <p className="text-sm text-slate-600">
                  Understand construction before measuring
                </p>
              </div>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default MeasuringGuide;
