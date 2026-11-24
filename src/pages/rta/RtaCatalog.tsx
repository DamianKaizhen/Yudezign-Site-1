import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock, FileText, Package, Search, Tag, Wrench, ZoomIn } from 'lucide-react';
import SEO from '../../components/SEO';
import { ImageLightbox } from '../../components/ui/ImageLightbox';
import { rtaCatalog } from '../../data/rtaCatalog';
import type { RtaCabinet, RtaLine } from '../../types/rta';

// The stocked, framed, ready-to-assemble line. We build frameless; we stock framed. This page
// is the catalogue for the stocked line only: its own finishes and stock sizes. Quotes are by request,
// so nothing of that kind appears here.
// Data: src/data/rtaCatalog.ts, generated from the RTA website package (see scripts/import-rta-catalog.py).

type LineId = RtaLine['id'];

interface Lightbox {
  images: string[];
  title: string;
}

const inches = (v: number | null) => (v === null ? '' : `${v}"`);

const sizeOf = (c: RtaCabinet) =>
  c.w !== null && c.h !== null && c.d !== null ? `${inches(c.w)} W × ${inches(c.h)} H × ${inches(c.d)} D` : '';

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const PILL_ACTIVE = 'bg-primary text-white shadow-luxury';
const PILL_IDLE = 'bg-white text-luxury-gray-600 hover:bg-luxury-gray-50 hover:text-primary border border-luxury-gray-100';

const RtaCatalog = () => {
  const [lineId, setLineId] = useState<LineId>('shaker');
  const [finishIndex, setFinishIndex] = useState(0);
  const [section, setSection] = useState<string>('all');
  const [category, setCategory] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);

  const line = rtaCatalog.lines.find((l) => l.id === lineId) ?? rtaCatalog.lines[0];
  const finish = line.finishes[finishIndex] ?? line.finishes[0];

  const selectLine = (id: LineId) => {
    setLineId(id);
    setFinishIndex(0);
    setSection('all');
    setCategory('all');
  };

  const selectSection = (s: string) => {
    setSection(s);
    setCategory('all');
  };

  // Categories offered in the current section, in workbook order.
  const categories = useMemo(
    () =>
      line.categories.filter((cat) =>
        line.cabinets.some((c) => c.category === cat && (section === 'all' || c.section === section))
      ),
    [line, section]
  );

  const visible = useMemo(() => {
    const q = normalise(query);
    return line.cabinets.filter((c) => {
      if (section !== 'all' && c.section !== section) return false;
      if (category !== 'all' && c.category !== category) return false;
      if (!q) return true;
      return normalise(c.code).includes(q) || normalise(c.desc).includes(q);
    });
  }, [line, section, category, query]);

  // Rows grouped by category so a long list stays scannable.
  const groups = useMemo(
    () =>
      categories
        .map((cat) => ({ category: cat, cabinets: visible.filter((c) => c.category === cat) }))
        .filter((g) => g.cabinets.length > 0),
    [categories, visible]
  );

  // Whether a cabinet is offered in the finish currently selected above.
  const offered = (c: RtaCabinet) => c.finishes.includes(finishIndex);

  return (
    <>
      <SEO
        title="Stocked RTA Cabinets Houston: Shaker, Slim, Contract"
        description="Ready-to-assemble framed cabinets in stock in Houston: three collections, nineteen finishes and every stock size, flat-pack or assembled. Send us your list for a written quote."
        keywords="RTA cabinets Houston, ready to assemble cabinets, stock cabinets Houston, shaker cabinets Houston, framed cabinets, flat pack cabinets, assembled cabinets, request a cabinet quote Houston"
        url="https://www.yudezign.com/rta-cabinets"
      />
      <div className="min-h-screen pt-24 bg-luxury-cream">
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="w-16 h-1 bg-accent mx-auto mb-8"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 64, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-label text-accent mb-4"
            >
              Stocked · Framed · Ready to assemble
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-display-mobile md:text-display font-medium mb-6"
            >
              RTA Cabinets, In Stock
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-body-lg md:text-h4 font-light text-white/90 max-w-2xl mx-auto"
            >
              Alongside the frameless cabinetry we build to order, we stock a framed, ready-to-assemble line in three
              collections. Fixed stock sizes, flat-pack or assembled. Browse the collections, finishes and item codes below, then
              request a quote.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-accent text-luxury-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Request a quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Who it is for */}
        <section className="py-16 px-4 bg-luxury-white border-b border-luxury-sand">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Clock,
                  title: 'You need cabinets soon',
                  text: 'Stock sizes, held in our Houston stock. No build time.',
                },
                {
                  icon: Package,
                  title: 'You want a face-frame shaker look',
                  text: 'A classic framed shaker door, flat-pack or assembled, your choice.',
                },
                {
                  icon: Tag,
                  title: 'The budget is tight',
                  text: 'Our most economical option. Send us your list and we quote it in writing.',
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-luxury-cream rounded-lg p-8 shadow-luxury">
                  <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-h4 font-medium text-luxury-gray-900 mb-2">{title}</h2>
                  <p className="text-body text-luxury-gray-600">{text}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-body text-luxury-gray-600 max-w-3xl">
              We manufacture frameless cabinetry only; the framed line is a stocked product we carry so you are not
              stuck when a build does not fit your timeline. Its finishes are a separate list from our{' '}
              <Link to="/finishes" className="text-primary font-medium hover:underline">
                twenty standard colors
              </Link>
              . Need handleless doors, custom sizes or a colour match? That is our{' '}
              <Link to="/services/kitchen-cabinets" className="text-primary font-medium hover:underline">
                made-to-measure frameless line
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Collection tabs */}
        <section className="sticky top-20 z-40 bg-luxury-beige/95 backdrop-blur-sm border-b border-luxury-sand py-5 shadow-luxury-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3" role="tablist" aria-label="Collections">
              {rtaCatalog.lines.map((l) => (
                <button
                  key={l.id}
                  role="tab"
                  aria-selected={l.id === line.id}
                  onClick={() => selectLine(l.id)}
                  className={`px-6 py-2.5 rounded-md font-medium transition-all duration-300 ${
                    l.id === line.id ? PILL_ACTIVE : PILL_IDLE
                  }`}
                >
                  {l.name}
                  <span className={`block text-xs font-normal ${l.id === line.id ? 'text-white/80' : 'text-luxury-gray-400'}`}>
                    {l.cabinets.length} cabinets · {l.finishes.length} finishes
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Collection header + finishes */}
        <section className="py-16 px-4 bg-luxury-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-3">{line.name}</h2>
              <p className="text-body text-luxury-gray-600 max-w-3xl mx-auto">{line.blurb}</p>
            </div>

            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-4">
              <h3 className="text-h4 font-medium text-luxury-gray-900">Finishes</h3>
              <p className="text-body-sm text-luxury-gray-500">
                Pick a finish to see which cabinets are offered in it. Showing <strong className="text-luxury-gray-800">{finish.name}</strong>.
              </p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-11 gap-3">
              {line.finishes.map((f, i) => {
                const active = i === finishIndex;
                return (
                  <div
                    key={f.id}
                    className={`relative bg-white rounded-lg p-2 shadow-luxury transition-all ${
                      active ? 'ring-2 ring-primary' : 'hover:shadow-luxury-md'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setFinishIndex(i)}
                      aria-pressed={active}
                      className="w-full text-left"
                    >
                      <div className="h-32 bg-luxury-gray-50 rounded-md flex items-center justify-center overflow-hidden">
                        <img src={f.door} alt={`${f.name} door`} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="h-10 mt-2 bg-luxury-gray-50 rounded-md flex items-center justify-center overflow-hidden">
                        <img src={f.drawer} alt={`${f.name} drawer front`} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                      </div>
                      <p className="mt-2 text-xs font-semibold text-luxury-gray-900 leading-tight">{f.name}</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLightbox({ images: [f.door, f.drawer], title: `${f.name}: door and drawer front` })}
                      aria-label={`Enlarge ${f.name}`}
                      className="absolute top-3 right-3 bg-white/90 rounded-full p-1 text-luxury-gray-500 hover:text-primary shadow-luxury-sm"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-luxury-gray-500">
              Screen images; colour varies by screen. See the sample door at our showroom before you order.
            </p>
          </div>
        </section>

        {/* Filters + catalogue */}
        <section className="py-12 px-4 bg-luxury-cream">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-5" role="tablist" aria-label="Cabinet types">
              {['all', ...line.sections].map((s) => (
                <button
                  key={s}
                  role="tab"
                  aria-selected={section === s}
                  onClick={() => selectSection(s)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    section === s ? PILL_ACTIVE : PILL_IDLE
                  }`}
                >
                  {s === 'all' ? 'Everything' : s}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <label className="block">
                <span className="text-label text-luxury-gray-500">Category</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full rounded-md border border-luxury-gray-100 bg-white px-3 py-2.5 text-body-sm text-luxury-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-label text-luxury-gray-500">Search</span>
                <span className="mt-1 flex items-center rounded-md border border-luxury-gray-100 bg-white px-3 focus-within:ring-2 focus-within:ring-primary">
                  <Search className="w-4 h-4 text-luxury-gray-400" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Item code or description, e.g. B30 or sink base"
                    className="w-full bg-transparent px-2 py-2.5 text-body-sm text-luxury-gray-800 focus:outline-none"
                  />
                </span>
              </label>
            </div>

            <p className="text-body-sm text-luxury-gray-500 mb-4">
              {visible.length} of {line.cabinets.length} cabinets · availability shown for {finish.name}
            </p>

            {groups.length === 0 ? (
              <div className="bg-white rounded-lg p-10 text-center shadow-luxury">
                <p className="text-body text-luxury-gray-600">Nothing matches that search in {line.name}. Try a shorter code, or clear the filters.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {groups.map((g) => (
                  <div key={g.category} className="bg-white rounded-lg shadow-luxury overflow-hidden">
                    <div className="px-5 py-3 bg-luxury-beige border-b border-luxury-sand flex items-baseline justify-between">
                      <h3 className="text-body font-semibold text-luxury-gray-900">{g.category}</h3>
                      <span className="text-xs text-luxury-gray-500">{g.cabinets.length}</span>
                    </div>

                    {/* Table on wider screens */}
                    <table className="hidden md:table w-full text-body-sm">
                      <thead className="text-label text-luxury-gray-500">
                        <tr className="border-b border-luxury-sand">
                          <th className="px-5 py-3 text-left font-medium w-24">Drawing</th>
                          <th className="px-3 py-3 text-left font-medium">Item code</th>
                          <th className="px-3 py-3 text-left font-medium">Description</th>
                          <th className="px-3 py-3 text-left font-medium whitespace-nowrap">W × H × D</th>
                          <th className="px-3 py-3 text-right font-medium whitespace-nowrap">In {finish.name}</th>
                          <th className="px-5 py-3 text-right font-medium whitespace-nowrap">Shipped</th>
                        </tr>
                      </thead>
                      <tbody>
                        {g.cabinets.map((c) => {
                          const inFinish = offered(c);
                          return (
                            <tr key={c.code} className="border-b border-luxury-gray-50 last:border-0 hover:bg-luxury-cream/60">
                              <td className="px-5 py-2">
                                {c.drawing ? (
                                  <button
                                    type="button"
                                    onClick={() => setLightbox({ images: [c.drawing as string], title: `${c.code}: ${c.desc}` })}
                                    className="block w-16 h-16 bg-white rounded border border-luxury-gray-100 hover:border-primary overflow-hidden"
                                    aria-label={`Enlarge drawing for ${c.code}`}
                                  >
                                    <img src={c.drawing} alt={`Line drawing of ${c.code}: ${c.desc}`} loading="lazy" decoding="async" className="w-full h-full object-contain" />
                                  </button>
                                ) : (
                                  <span className="block w-16 h-16 rounded border border-dashed border-luxury-gray-200 text-[10px] text-luxury-gray-400 flex items-center justify-center text-center leading-tight">
                                    No drawing
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-2 font-semibold text-luxury-gray-900 whitespace-nowrap">{c.code}</td>
                              <td className="px-3 py-2 text-luxury-gray-700">
                                {c.desc}
                                {c.doors || c.drawers ? (
                                  <span className="block text-xs text-luxury-gray-500">
                                    {[c.doors ? `${c.doors} door${c.doors === 1 ? '' : 's'}` : '', c.drawers ? `${c.drawers} drawer${c.drawers === 1 ? '' : 's'}` : '']
                                      .filter(Boolean)
                                      .join(' · ')}
                                  </span>
                                ) : null}
                              </td>
                              <td className="px-3 py-2 text-luxury-gray-700 whitespace-nowrap">{sizeOf(c)}</td>
                              <td className="px-3 py-2 text-right whitespace-nowrap">
                                {inFinish ? (
                                  <span className="inline-flex items-center gap-1 text-primary font-medium">
                                    <Check className="w-4 h-4" aria-hidden="true" />
                                    Offered
                                  </span>
                                ) : (
                                  <span className="text-luxury-gray-400">Not in this finish</span>
                                )}
                              </td>
                              <td className="px-5 py-2 text-right text-luxury-gray-700 whitespace-nowrap">
                                {c.canAssemble ? 'Flat-pack or assembled' : 'Flat-pack only'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    {/* Cards on phones */}
                    <ul className="md:hidden divide-y divide-luxury-gray-50">
                      {g.cabinets.map((c) => {
                        const inFinish = offered(c);
                        return (
                          <li key={c.code} className="p-4 flex gap-4">
                            {c.drawing ? (
                              <button
                                type="button"
                                onClick={() => setLightbox({ images: [c.drawing as string], title: `${c.code}: ${c.desc}` })}
                                className="shrink-0 w-20 h-20 bg-white rounded border border-luxury-gray-100 overflow-hidden"
                                aria-label={`Enlarge drawing for ${c.code}`}
                              >
                                <img src={c.drawing} alt={`Line drawing of ${c.code}: ${c.desc}`} loading="lazy" decoding="async" className="w-full h-full object-contain" />
                              </button>
                            ) : (
                              <span className="shrink-0 w-20 h-20 rounded border border-dashed border-luxury-gray-200 text-[10px] text-luxury-gray-400 flex items-center justify-center text-center">
                                No drawing
                              </span>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-luxury-gray-900">{c.code}</p>
                              <p className="text-body-sm text-luxury-gray-700">{c.desc}</p>
                              <p className="text-xs text-luxury-gray-500 mt-1">{sizeOf(c)}</p>
                              <p className="mt-2 text-body-sm text-luxury-gray-500">
                                {inFinish ? `Offered in ${finish.name}` : <span className="text-luxury-gray-400">Not in this finish</span>}
                                {' · '}
                                {c.canAssemble ? 'flat-pack or assembled' : 'flat-pack only'}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* How to order + request a quote */}
        <section className="py-20 px-4 bg-luxury-beige">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-10 shadow-luxury">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h2 className="text-h3 font-medium text-luxury-gray-900">How to order</h2>
              </div>
              <ol className="space-y-4 text-body text-luxury-gray-600 leading-relaxed list-decimal list-inside">
                <li>Choose your collection and finish, and check the sample door at the showroom.</li>
                <li>List the cabinets you need by item code and size, with flat-pack or assembled against each one.</li>
                <li>Send us the list. We confirm stock and send you a written quote.</li>
              </ol>
              <p className="mt-5 text-body-sm text-luxury-gray-500">
                Reading a code: W = wall cabinet, B = base, SB = sink base, 3DB = three-drawer base, U = utility or pantry,
                V = vanity, GD = glass door, ADA = 32½" high. The numbers are the width, then height and depth in inches.
              </p>
            </div>

            <div className="bg-white rounded-lg p-10 shadow-luxury">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h2 className="text-h3 font-medium text-luxury-gray-900">Request a quote</h2>
              </div>
              <ul className="space-y-4 text-body text-luxury-gray-600 leading-relaxed">
                <li className="flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                  <span>Stock sizes only. Small gaps in a run are closed with fillers; several sizes share one drawing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 font-bold">•</span>
                  <span>
                    In your message, tell us the collection, the finish and your item codes. Everything else is on the written
                    quote we send back.
                  </span>
                </li>
              </ul>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Request a quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {lightbox && (
        <ImageLightbox images={lightbox.images} isOpen={true} onClose={() => setLightbox(null)} title={lightbox.title} />
      )}
    </>
  );
};

export default RtaCatalog;
