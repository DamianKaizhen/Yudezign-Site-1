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

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes - No Navigation/Footer */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* Public Routes - With Navigation/Footer */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/portfolio/:category" element={<CategoryPage />} />
                  <Route path="/finishes" element={<Finishes />} />
                  <Route path="/kdlite" element={<KDLite />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
