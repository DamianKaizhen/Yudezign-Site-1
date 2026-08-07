import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import Portfolio from './pages/portfolio/Portfolio';
import CategoryPage from './pages/portfolio/CategoryPage';
import Finishes from './pages/finishes/Finishes';
import KDLite from './pages/kdlite/KDLite';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Visualizer from './pages/visualizer/Visualizer';
import Downloads from './pages/downloads/Downloads';
import Privacy from './pages/legal/Privacy';
import TermsOfService from './pages/legal/TermsOfService';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProjectsList from './pages/admin/ProjectsList';
import ProjectForm from './pages/admin/ProjectForm';
import FinishStylesList from './pages/admin/FinishStylesList';
import FinishStyleForm from './pages/admin/FinishStyleForm';
import FinishesList from './pages/admin/FinishesList';
import FinishForm from './pages/admin/FinishForm';
import ContactMessagesList from './pages/admin/ContactMessagesList';
import ContactMessageDetail from './pages/admin/ContactMessageDetail';
import VisualizerSubmissionsList from './pages/admin/VisualizerSubmissionsList';
import VisualizerSubmissionDetail from './pages/admin/VisualizerSubmissionDetail';
import TestimonialsList from './pages/admin/TestimonialsList';
import TestimonialForm from './pages/admin/TestimonialForm';
import TeamMembersList from './pages/admin/TeamMembersList';
import TeamMemberForm from './pages/admin/TeamMemberForm';
import SiteSettings from './pages/admin/SiteSettings';
import SampleImages from './pages/admin/SampleImages';

// SEO Pages
import PricingPage from './pages/quick-wins/PricingPage';
import ShowroomPage from './pages/quick-wins/ShowroomPage';
// import WarrantyPage from './pages/quick-wins/WarrantyPage'; // REMOVED - Warranty page temporarily disabled
import LocationPage from './pages/locations/LocationPage';
import ServicePage from './pages/services/ServicePage';
import BlogIndex from './pages/blog/BlogIndex';
import BlogPost from './pages/blog/BlogPost';
import FAQPage from './pages/faq/FAQPage';
import ComparisonPage from './pages/comparison/ComparisonPage';

// Blog Posts
import CostGuide2025 from './pages/blog/posts/CostGuide2025';
import FramelessVsFramed from './pages/blog/posts/FramelessVsFramed';
import KitchenTrends2025 from './pages/blog/posts/KitchenTrends2025';
import HoustonHumidity from './pages/blog/posts/HoustonHumidity';
import MeasuringGuide from './pages/blog/posts/MeasuringGuide';
import EuropeanVsAmerican from './pages/blog/posts/EuropeanVsAmerican';
import CabinetMaterialsGuide from './pages/blog/posts/CabinetMaterialsGuide';
import CabinetDoorStylesGuide from './pages/blog/posts/CabinetDoorStylesGuide';
import CabinetFinishesGuide from './pages/blog/posts/CabinetFinishesGuide';
import BathroomVanityGuide from './pages/blog/posts/BathroomVanityGuide';
import CabinetHardwareGuide from './pages/blog/posts/CabinetHardwareGuide';
import ClosetDesignGuide from './pages/blog/posts/ClosetDesignGuide';

// The sales rep portal is the one route that is code-split. Its content is
// served per-role from /api/sales/content, and its UI has no business in the
// bundle every public visitor downloads.
const PortalRoutes = lazy(() => import('./pages/portal/PortalRoutes'));

// The in-app document viewer. Only ever reached from a document link on a
// phone with the site installed, so it has no place in the main bundle either.
const DocViewer = lazy(() => import('./pages/doc/DocViewer'));

// Create a client for TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Shown while the portal chunk downloads. Matches the portal's own shell so it
// doesn't flash the marketing palette.
const PortalLoading = () => (
  <div className="flex min-h-screen items-center justify-center bg-luxury-cream">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

// Layout wrapper for public pages with navigation and footer
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Navigation />
    <main role="main" aria-label="Main content" className="flex-grow">{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SiteSettingsProvider>
        <Router>
          <ScrollToTop />
          <Routes>
          {/* Admin Routes - No Navigation/Footer */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/projects" element={<ProjectsList />} />
          <Route path="/admin/projects/new" element={<ProjectForm />} />
          <Route path="/admin/projects/:id" element={<ProjectForm />} />
          <Route path="/admin/finish-styles" element={<FinishStylesList />} />
          <Route path="/admin/finish-styles/:id" element={<FinishStyleForm />} />
          <Route path="/admin/finishes" element={<FinishesList />} />
          <Route path="/admin/finishes/new" element={<FinishForm />} />
          <Route path="/admin/finishes/:id" element={<FinishForm />} />
          <Route path="/admin/contact-messages" element={<ContactMessagesList />} />
          <Route path="/admin/contact-messages/:id" element={<ContactMessageDetail />} />
          <Route path="/admin/visualizer-submissions" element={<VisualizerSubmissionsList />} />
          <Route path="/admin/visualizer-submissions/:id" element={<VisualizerSubmissionDetail />} />
          <Route path="/admin/testimonials" element={<TestimonialsList />} />
          <Route path="/admin/testimonials/new" element={<TestimonialForm />} />
          <Route path="/admin/testimonials/:id" element={<TestimonialForm />} />
          <Route path="/admin/team" element={<TeamMembersList />} />
          <Route path="/admin/team/new" element={<TeamMemberForm />} />
          <Route path="/admin/team/:id" element={<TeamMemberForm />} />
          <Route path="/admin/settings" element={<SiteSettings />} />
          <Route path="/admin/sample-images" element={<SampleImages />} />

          {/* Sales Rep Portal - No Navigation/Footer, own shell.
              Lazily loaded so public visitors never download it, and nested
              (inside PortalRoutes) so the shell survives tab changes. */}
          <Route
            path="/sales/*"
            element={
              <Suspense fallback={<PortalLoading />}>
                <PortalRoutes />
              </Suspense>
            }
          />

          {/* Full-screen document viewer - No Navigation/Footer.
              Public, not under /sales: installed to a home screen there is no
              browser chrome, so a PDF opened from /downloads is just as much a
              one-way door as one opened from the portal. Everything it can
              open is already publicly fetchable, so this adds no exposure. */}
          <Route
            path="/doc"
            element={
              <Suspense fallback={<PortalLoading />}>
                <DocViewer />
              </Suspense>
            }
          />

          {/* Public Routes - With Navigation/Footer */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
          <Route path="/portfolio/:category" element={<PublicLayout><CategoryPage /></PublicLayout>} />
          <Route path="/finishes" element={<PublicLayout><Finishes /></PublicLayout>} />
          <Route path="/kdlite" element={<PublicLayout><KDLite /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/visualizer" element={<PublicLayout><Visualizer /></PublicLayout>} />
          <Route path="/downloads" element={<PublicLayout><Downloads /></PublicLayout>} />
          <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
          <Route path="/terms" element={<PublicLayout><TermsOfService /></PublicLayout>} />

          {/* Quick Win Pages */}
          <Route path="/pricing" element={<PublicLayout><PricingPage /></PublicLayout>} />
          <Route path="/showroom" element={<PublicLayout><ShowroomPage /></PublicLayout>} />
          {/* <Route path="/warranty" element={<PublicLayout><WarrantyPage /></PublicLayout>} /> */}
          {/* REMOVED - Warranty page temporarily disabled */}

          {/* Location Pages */}
          <Route path="/locations/:slug" element={<PublicLayout><LocationPage /></PublicLayout>} />

          {/* Service Pages */}
          <Route path="/services/:slug" element={<PublicLayout><ServicePage /></PublicLayout>} />

          {/* Blog Pages */}
          <Route path="/blog" element={<PublicLayout><BlogIndex /></PublicLayout>} />
          <Route path="/blog/custom-cabinet-cost-guide-houston-2025" element={<PublicLayout><CostGuide2025 /></PublicLayout>} />
          <Route path="/blog/frameless-vs-framed-cabinets" element={<PublicLayout><FramelessVsFramed /></PublicLayout>} />
          <Route path="/blog/kitchen-trends-2025" element={<PublicLayout><KitchenTrends2025 /></PublicLayout>} />
          <Route path="/blog/houston-humidity-cabinets" element={<PublicLayout><HoustonHumidity /></PublicLayout>} />
          <Route path="/blog/how-to-measure-cabinets" element={<PublicLayout><MeasuringGuide /></PublicLayout>} />
          <Route path="/blog/european-vs-american-cabinets" element={<PublicLayout><EuropeanVsAmerican /></PublicLayout>} />
          <Route path="/blog/cabinet-materials-plywood-particleboard-mdf" element={<PublicLayout><CabinetMaterialsGuide /></PublicLayout>} />
          <Route path="/blog/flat-panel-vs-shaker-cabinet-doors" element={<PublicLayout><CabinetDoorStylesGuide /></PublicLayout>} />
          <Route path="/blog/cabinet-finishes-explained-melamine-laminate-acrylic" element={<PublicLayout><CabinetFinishesGuide /></PublicLayout>} />
          <Route path="/blog/bathroom-vanity-guide-houston" element={<PublicLayout><BathroomVanityGuide /></PublicLayout>} />
          <Route path="/blog/cabinet-hardware-guide" element={<PublicLayout><CabinetHardwareGuide /></PublicLayout>} />
          <Route path="/blog/custom-closet-design-guide-houston" element={<PublicLayout><ClosetDesignGuide /></PublicLayout>} />
          <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />

          {/* FAQ */}
          <Route path="/faq" element={<PublicLayout><FAQPage /></PublicLayout>} />

          {/* Comparison Pages */}
          <Route path="/vs/:slug" element={<PublicLayout><ComparisonPage /></PublicLayout>} />
        </Routes>
        </Router>
        {/* Vercel Analytics - Track page views and user interactions */}
        <Analytics />
        {/* Vercel Speed Insights - Monitor real user performance metrics */}
        <SpeedInsights />
      </SiteSettingsProvider>
    </QueryClientProvider>
  );
}

export default App;
