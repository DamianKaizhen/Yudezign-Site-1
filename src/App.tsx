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

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
