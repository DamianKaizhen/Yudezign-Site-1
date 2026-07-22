import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Download, Eye, ArrowRight, FileDown } from 'lucide-react';
import SEO from '../../components/SEO';
import {
  resources,
  resourceCategories,
  type ResourceFile,
} from '../../data/downloads';

const metaLine = (r: ResourceFile) =>
  [r.pages ? `${r.pages} pages` : null, r.fileSize ? `PDF · ${r.fileSize}` : 'PDF', r.updated]
    .filter(Boolean)
    .join('  ·  ');

// Small cover with graceful fallback when no thumbnail is provided.
const Cover = ({ r, className = '' }: { r: ResourceFile; className?: string }) =>
  r.cover ? (
    <img
      src={r.cover}
      alt={`${r.title} cover`}
      loading="lazy"
      className={`w-full h-full object-cover ${className}`}
    />
  ) : (
    <div className={`w-full h-full flex items-center justify-center bg-luxury-beige ${className}`}>
      <FileText className="w-12 h-12 text-luxury-gray-400" aria-hidden="true" />
    </div>
  );

const ResourceCard = ({ r }: { r: ResourceFile }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-luxury"
  >
    <a
      href={r.file}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block aspect-[4/5] overflow-hidden bg-luxury-beige"
      aria-label={`View ${r.title} (opens PDF in a new tab)`}
    >
      <Cover r={r} className="transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 flex items-center justify-center bg-primary/0 opacity-0 transition-all duration-300 group-hover:bg-primary/40 group-hover:opacity-100">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-primary">
          <Eye className="h-4 w-4" aria-hidden="true" />
          View PDF
        </span>
      </div>
    </a>

    <div className="flex flex-grow flex-col p-6">
      <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
        {resourceCategories.find((c) => c.id === r.category)?.label ?? 'Resource'}
      </span>
      <h3 className="mb-2 text-h4 font-medium text-luxury-gray-900">{r.title}</h3>
      <p className="mb-4 flex-grow text-body text-luxury-gray-600">{r.description}</p>
      <p className="mb-5 text-xs uppercase tracking-wide text-luxury-gray-500">{metaLine(r)}</p>

      <div className="mt-auto flex gap-3">
        <a
          href={r.file}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-primary-dark"
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
          View
        </a>
        <a
          href={r.file}
          download
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-luxury-sand px-5 py-3 font-semibold text-luxury-gray-700 transition-all duration-300 hover:border-primary hover:text-primary"
          aria-label={`Download ${r.title}`}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Download</span>
        </a>
      </div>
    </div>
  </motion.div>
);

const Downloads = () => {
  const featured = resources.find((r) => r.featured);
  const rest = resources.filter((r) => r !== featured);

  // Only render categories that actually contain (non-featured) files.
  const categoriesWithFiles = resourceCategories.filter((c) =>
    rest.some((r) => r.category === c.id)
  );

  return (
    <>
      <SEO
        title="Brochures & Downloads - Catalogs, Flyers & Spec Sheets"
        description="Download YuDeZign brochures, catalogs, and spec sheets. View our 2026 Collection booklet and full finishes catalog for European frameless kitchen cabinets, closets, and vanities built in Houston."
        keywords="yudezign brochure, cabinet catalog, finishes catalog, cabinet spec sheet, download brochure, custom cabinets houston brochure"
        url="https://www.yudezign.com/downloads"
      />

      <div className="min-h-screen bg-luxury-cream pt-24">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark px-4 py-20 text-white">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              className="mx-auto mb-8 h-1 w-16 bg-accent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 64, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-display-mobile md:text-display mb-6 font-medium"
            >
              Brochures &amp; Downloads
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-body-lg md:text-h4 mx-auto max-w-2xl font-light text-white/90"
            >
              Browse and download our collection booklets, catalogs, and spec sheets — view online or
              save a copy to share.
            </motion.p>
          </div>
        </section>

        {/* Featured download */}
        {featured && (
          <section className="px-4 py-16">
            <div className="mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 overflow-hidden rounded-lg bg-white shadow-luxury md:grid-cols-2"
              >
                <a
                  href={featured.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[4/5] overflow-hidden bg-luxury-beige md:aspect-auto"
                  aria-label={`View ${featured.title} (opens PDF in a new tab)`}
                >
                  <Cover r={featured} className="transition-transform duration-500 group-hover:scale-105" />
                </a>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <span className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">
                    Featured · Latest Brochure
                  </span>
                  <h2 className="text-h2 mb-4 font-medium text-luxury-gray-900">{featured.title}</h2>
                  <p className="text-body-lg mb-6 leading-relaxed text-luxury-gray-600">
                    {featured.description}
                  </p>
                  <p className="mb-8 text-xs uppercase tracking-wide text-luxury-gray-500">
                    {metaLine(featured)}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={featured.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-primary-dark hover:shadow-xl"
                    >
                      <Eye className="h-5 w-5" aria-hidden="true" />
                      View Online
                    </a>
                    <a
                      href={featured.file}
                      download
                      className="inline-flex items-center gap-3 rounded-xl border border-luxury-sand px-8 py-4 font-semibold text-luxury-gray-700 transition-all duration-300 hover:border-primary hover:text-primary"
                    >
                      <FileDown className="h-5 w-5" aria-hidden="true" />
                      Download PDF
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* All resources grouped by category */}
        {categoriesWithFiles.length > 0 && (
          <section className="bg-luxury-white px-4 py-16">
            <div className="mx-auto max-w-6xl space-y-16">
              {categoriesWithFiles.map((category) => (
                <div key={category.id}>
                  <div className="mb-8 text-center">
                    <h2 className="text-h3 mb-2 font-medium text-luxury-gray-900">{category.label}</h2>
                    <p className="text-body text-luxury-gray-600">{category.blurb}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {rest
                      .filter((r) => r.category === category.id)
                      .map((r) => (
                        <ResourceCard key={r.id} r={r} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="border-t border-luxury-sand bg-luxury-cream px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-h2 mb-4 font-medium text-luxury-gray-900">
              Have a project in mind?
            </h2>
            <p className="text-body-lg mx-auto mb-8 max-w-xl text-luxury-gray-600">
              Our team can put together a tailored quote and finish recommendations for your space.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-primary-dark hover:shadow-xl"
            >
              Start Your Project
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Downloads;
