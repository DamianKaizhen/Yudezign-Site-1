import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderOpen,
  Palette,
  Mail,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Image,
} from 'lucide-react';
import { siteSettings } from '../../data/siteSettings';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Projects',
      path: '/admin/projects',
      icon: FolderOpen,
    },
    {
      name: 'Finishes',
      path: '/admin/finishes',
      icon: Palette,
    },
    {
      name: 'Contact Messages',
      path: '/admin/contact-messages',
      icon: Mail,
    },
    {
      name: 'Visualizer Requests',
      path: '/admin/visualizer-submissions',
      icon: Image,
    },
    {
      name: 'Testimonials',
      path: '/admin/testimonials',
      icon: MessageSquare,
    },
    {
      name: 'Team Members',
      path: '/admin/team',
      icon: Users,
    },
    {
      name: 'Site Settings',
      path: '/admin/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-luxury-cream">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-screen w-64 bg-primary text-white shadow-luxury-xl z-40"
          >
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                {siteSettings.logo ? (
                  <img
                    src={siteSettings.logo}
                    alt={siteSettings.companyName}
                    className="h-8 w-auto"
                  />
                ) : (
                  <h1 className="text-2xl font-bold">
                    <span>YuDe</span>
                    <span className="text-accent">Zign</span>
                  </h1>
                )}
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden text-white hover:text-accent transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-white/60 text-sm mt-1">Admin Panel</p>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-white/10 text-white shadow-luxury'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-3 w-full px-4 py-3 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                <LogOut className="w-5 h-5" strokeWidth={1.5} />
                <span className="font-medium">
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : 'ml-0'
        }`}
      >
        {/* Top Bar */}
        <header className="bg-white border-b border-luxury-sand shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              {!isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="text-luxury-gray-600 hover:text-primary transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
              )}
              <h2 className="text-xl font-semibold text-luxury-gray-900">
                {navigationItems.find((item) => item.path === location.pathname)?.name ||
                  'Admin Panel'}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-luxury-gray-600 hover:text-primary transition-colors text-sm font-medium"
              >
                View Site →
              </a>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
