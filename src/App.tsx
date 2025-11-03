import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Portfolio from './pages/portfolio/Portfolio';
import CategoryPage from './pages/portfolio/CategoryPage';
import Finishes from './pages/finishes/Finishes';
import KDLite from './pages/kdlite/KDLite';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
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
import TestimonialsList from './pages/admin/TestimonialsList';
import TestimonialForm from './pages/admin/TestimonialForm';
import TeamMembersList from './pages/admin/TeamMembersList';
import TeamMemberForm from './pages/admin/TeamMemberForm';

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

// Layout wrapper for public pages with navigation and footer
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Navigation />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Admin Routes - No Navigation/Footer */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/projects" element={<ProjectsList />} />
          <Route path="/admin/projects/new" element={<ProjectForm />} />
          <Route path="/admin/projects/:id" element={<ProjectForm />} />
          <Route path="/admin/finish-styles" element={<FinishStylesList />} />
          <Route path="/admin/finish-styles/new" element={<FinishStyleForm />} />
          <Route path="/admin/finish-styles/:id" element={<FinishStyleForm />} />
          <Route path="/admin/finishes" element={<FinishesList />} />
          <Route path="/admin/finishes/new" element={<FinishForm />} />
          <Route path="/admin/finishes/:id" element={<FinishForm />} />
          <Route path="/admin/contact-messages" element={<ContactMessagesList />} />
          <Route path="/admin/contact-messages/:id" element={<ContactMessageDetail />} />
          <Route path="/admin/testimonials" element={<TestimonialsList />} />
          <Route path="/admin/testimonials/new" element={<TestimonialForm />} />
          <Route path="/admin/testimonials/:id" element={<TestimonialForm />} />
          <Route path="/admin/team" element={<TeamMembersList />} />
          <Route path="/admin/team/new" element={<TeamMemberForm />} />
          <Route path="/admin/team/:id" element={<TeamMemberForm />} />

          {/* Public Routes - With Navigation/Footer */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
          <Route path="/portfolio/:category" element={<PublicLayout><CategoryPage /></PublicLayout>} />
          <Route path="/finishes" element={<PublicLayout><Finishes /></PublicLayout>} />
          <Route path="/kdlite" element={<PublicLayout><KDLite /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
