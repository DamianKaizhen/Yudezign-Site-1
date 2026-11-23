import { Link } from 'react-router-dom';
import SEO from './SEO';

/**
 * Shown for an unknown slug under /locations, /services and /vs, and as the
 * catch-all route. It renders in place (no redirect to the home page), so the
 * URL does not become a soft-404 duplicate of "/", and it is kept out of the
 * index with noindex.
 */
const NotFound = () => (
  <>
    <SEO title="Page not found" description="This page does not exist." noindex />
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Page not found</h1>
      <p className="text-lg text-slate-600 mb-8">
        We could not find the page you were looking for. It may have moved or never existed.
      </p>
      <Link to="/" className="text-primary font-semibold underline">
        Back to the YuDezign home page
      </Link>
    </section>
  </>
);

export default NotFound;
