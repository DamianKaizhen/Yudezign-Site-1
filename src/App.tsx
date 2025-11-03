import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    <Router>
      <Routes>
        {/* Admin Routes - No Navigation/Footer */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/projects" element={<ProjectsList />} />
        <Route path="/admin/projects/new" element={<ProjectForm />} />
        <Route path="/admin/projects/:id" element={<ProjectForm />} />

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
  );
}

export default App;
