import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { faqs } from '../data/faqs';
import { locations } from '../data/locations';
import { services } from '../data/services';
import { generateFAQSchema, generateWebPageSchema } from '../lib/schema';

// The home page is the 3D gallery, a self-contained page under public/gallery
// (built by scripts/build-gallery.py from mockups/gallery-3d). It runs in a
// frame so its WebGL code stays out of the main bundle. The heading, summary
// and links below are what search engines and screen readers get. The sr-only
// summary repeats what the gallery's own panels show (services, areas, FAQs),
// so it is the same content in a crawlable form, not hidden extra content.
// The same summary is also emitted in a <noscript> for visitors without JavaScript.
// The quote form inside the gallery uses the same spam check as the contact page.
// A Turnstile site key is public, so it can ride in the frame's address.
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

/** Plan and Learn destinations, matching the gallery's own panels. */
const PLAN_LINKS = [
  { to: '/pricing', label: 'Pricing' },
  { to: '/visualizer', label: 'Room Visualizer' },
  { to: '/kdlite', label: 'KD Lite closet design program' },
  { to: '/downloads', label: 'Downloads' },
  { to: '/showroom', label: 'Showroom' },
  { to: '/contact', label: 'Contact and quote request' },
];
const LEARN_LINKS = [
  { to: '/faq', label: 'FAQ' },
  { to: '/blog', label: 'Blog' },
  { to: '/vs/frameless-vs-framed-cabinets', label: 'Frameless vs framed cabinets' },
  { to: '/vs/custom-vs-semi-custom-cabinets', label: 'Custom vs semi-custom cabinets' },
  { to: '/vs/yudezign-vs-big-box-stores', label: 'YuDeZign vs big-box stores' },
];
const SITE_LINKS = [
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/finishes', label: 'Finishes & Materials' },
  { to: '/rta-cabinets', label: 'Stocked RTA Cabinets' },
  { to: '/about', label: 'About' },
  { to: '/classic', label: 'Classic home page' },
];

/** Most useful questions for a first visit, by id in src/data/faqs.ts. */
const HOME_FAQ_IDS = [
  'what-is-yudezign',
  'what-is-supply-only',
  'how-much-custom-cabinets-cost',
  'how-long-does-it-take',
  'how-many-colors-available',
  'do-you-install-cabinets',
];
const homeFaqs = HOME_FAQ_IDS.map((id) => faqs.find((f) => f.id === id)).filter(
  (f): f is NonNullable<typeof f> => !!f
);

const INTRO =
  'YuDeZign is a Houston manufacturer of custom European frameless cabinets for kitchens, closets, vanities, ' +
  'home offices, custom casework and commercial projects, built on 3/4" plywood boxes in twenty standard colors ' +
  'across four Styles, in as little as two weeks depending on finish and scale, with supply-only pricing. ' +
  'Walk the gallery to see finished projects and client designs.';

const escapeHtml = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The same summary as the sr-only JSX below, as an HTML string for <noscript> (React does not render noscript children on the client). */
const noscriptHtml = (): string => {
  const list = (items: { to: string; label: string }[]) =>
    `<ul>${items.map((i) => `<li><a href="${i.to}">${escapeHtml(i.label)}</a></li>`).join('')}</ul>`;
  return [
    '<div style="padding:24px;color:#f8f6f3;font-family:sans-serif;max-width:60rem;overflow:auto;height:100%">',
    '<h1>Custom Frameless Cabinets, Precision Crafted in Houston</h1>',
    `<p>${escapeHtml(INTRO)}</p>`,
    `<h2>Services</h2>${list(services.map((s) => ({ to: `/services/${s.slug}`, label: s.name })))}`,
    `<h2>Areas served</h2>${list(locations.map((l) => ({ to: `/locations/${l.slug}`, label: l.name })))}`,
    `<h2>Plan your project</h2>${list(PLAN_LINKS)}`,
    `<h2>Learn</h2>${list(LEARN_LINKS)}`,
    `<h2>Explore</h2>${list(SITE_LINKS)}`,
    '<h2>Common questions</h2>',
    ...homeFaqs.map((f) => `<h3>${escapeHtml(f.question)}</h3><p>${escapeHtml(f.answer)}</p>`),
    '</div>',
  ].join('');
};

const structuredData = [
  generateWebPageSchema({
    type: 'WebPage',
    name: 'YuDeZign - Custom European Frameless Cabinets, Houston',
    description: INTRO,
    path: '/',
  }),
  generateFAQSchema(homeFaqs.map((f) => ({ question: f.question, answer: f.answer }))),
];

const GalleryHome = () => (
  <>
    <SEO
      title="Custom European Frameless Cabinets | Houston"
      description="Custom European frameless cabinets built in Houston on 3/4 plywood boxes in 20 standard colors, as little as two weeks. Supply-only pricing."
      keywords="european cabinets, frameless cabinets, custom cabinets houston, kitchen cabinets, closet cabinets, vanities, cabinet supply, houston cabinetry, plywood cabinets, luxury cabinets"
      url="https://www.yudezign.com"
      structuredData={structuredData}
    />
    <main role="main" aria-label="Main content" className="fixed inset-0 bg-[#0b0a09]">
      <div className="sr-only">
        <h1>Custom Frameless Cabinets, Precision Crafted in Houston</h1>
        <p>{INTRO}</p>
        <p>
          YuDeZign has built custom European frameless cabinets in Houston since 2019, with 3/4&quot; plywood
          construction as standard.
        </p>

        <h2>Services</h2>
        <ul>
          {services.map((s) => (
            <li key={s.slug}>
              <Link to={`/services/${s.slug}`}>{s.name}</Link>
            </li>
          ))}
        </ul>

        <h2>Areas served</h2>
        <ul>
          {locations.map((l) => (
            <li key={l.slug}>
              <Link to={`/locations/${l.slug}`}>{l.name}</Link>
            </li>
          ))}
        </ul>

        <h2>Plan your project</h2>
        <ul>
          {PLAN_LINKS.map((l) => (
            <li key={l.to}>
              <Link to={l.to}>{l.label}</Link>
            </li>
          ))}
        </ul>

        <h2>Learn</h2>
        <ul>
          {LEARN_LINKS.map((l) => (
            <li key={l.to}>
              <Link to={l.to}>{l.label}</Link>
            </li>
          ))}
        </ul>

        <nav aria-label="Site">
          {SITE_LINKS.map((l) => (
            <Link key={l.to} to={l.to}>
              {l.label}
            </Link>
          ))}
        </nav>

        <h2>Common questions</h2>
        {homeFaqs.map((f) => (
          <section key={f.id}>
            <h3>{f.question}</h3>
            <p>{f.answer}</p>
          </section>
        ))}
      </div>
      <noscript dangerouslySetInnerHTML={{ __html: noscriptHtml() }} />
      <iframe
        src={`/gallery${TURNSTILE_SITE_KEY ? `?tsk=${encodeURIComponent(TURNSTILE_SITE_KEY)}` : ''}`}
        title="YuDeZign 3D gallery"
        className="h-full w-full border-0"
        allow="autoplay; fullscreen"
      />
    </main>
  </>
);

export default GalleryHome;
