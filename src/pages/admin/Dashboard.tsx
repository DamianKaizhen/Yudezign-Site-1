import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderOpen, Palette, MessageSquare, Users, ArrowRight } from 'lucide-react';
import { InView } from '../../components/ui/InViewAnimations';
import AdminLayout from '../../components/admin/AdminLayout';
import ProtectedRoute from '../../components/admin/ProtectedRoute';

const Dashboard = () => {
  const stats = [
    {
      name: 'Projects',
      count: 37,
      description: 'Portfolio projects across all categories',
      icon: FolderOpen,
      link: '/admin/projects',
      color: 'from-primary to-primary-light',
    },
    {
      name: 'Finishes',
      count: 26,
      description: 'Material finishes and options',
      icon: Palette,
      link: '/admin/finishes',
      color: 'from-accent to-accent/80',
    },
    {
      name: 'Testimonials',
      count: 0,
      description: 'Customer reviews and feedback',
      icon: MessageSquare,
      link: '/admin/testimonials',
      color: 'from-primary-light to-accent',
    },
    {
      name: 'Team Members',
      count: 0,
      description: 'Staff profiles for About page',
      icon: Users,
      link: '/admin/team',
      color: 'from-primary to-accent',
    },
  ];

  const recentActivity = [
    { action: 'Admin panel initialized', time: 'Just now', type: 'system' },
  ];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Header */}
          <InView variant="fadeUp">
            <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl p-8 shadow-luxury-lg">
              <h1 className="text-display-mobile md:text-display font-medium mb-3">
                Welcome to YuDeZign Admin
              </h1>
              <p className="text-body-lg text-white/90 max-w-2xl">
                Manage your website content, projects, finishes, and team information all in one place.
                Changes are automatically committed to GitHub and deployed.
              </p>
            </div>
          </InView>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <InView key={stat.name} variant="fadeUp" delay={index * 0.1}>
                  <Link to={stat.link}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="bg-white rounded-xl p-6 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 border border-luxury-sand group"
                    >
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-h2 font-semibold text-luxury-gray-900 mb-1">
                        {stat.count}
                      </h3>
                      <p className="text-body font-medium text-luxury-gray-700 mb-2">
                        {stat.name}
                      </p>
                      <p className="text-body-sm text-luxury-gray-500">
                        {stat.description}
                      </p>
                      <div className="mt-4 flex items-center text-primary group-hover:text-primary-light transition-colors">
                        <span className="text-body-sm font-medium">Manage</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  </Link>
                </InView>
              );
            })}
          </div>

          {/* Quick Actions & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <InView variant="fadeUp">
              <div className="bg-white rounded-xl p-6 shadow-luxury border border-luxury-sand">
                <h2 className="text-h3 font-semibold text-luxury-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <Link
                    to="/admin/projects"
                    className="flex items-center justify-between p-4 bg-luxury-cream rounded-lg hover:bg-luxury-beige transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <FolderOpen className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      <span className="text-body font-medium text-luxury-gray-900">
                        Add New Project
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-luxury-gray-400 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/admin/finishes"
                    className="flex items-center justify-between p-4 bg-luxury-cream rounded-lg hover:bg-luxury-beige transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Palette className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      <span className="text-body font-medium text-luxury-gray-900">
                        Add New Finish
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-luxury-gray-400 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/admin/testimonials"
                    className="flex items-center justify-between p-4 bg-luxury-cream rounded-lg hover:bg-luxury-beige transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      <span className="text-body font-medium text-luxury-gray-900">
                        Add Testimonial
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-luxury-gray-400 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/admin/team"
                    className="flex items-center justify-between p-4 bg-luxury-cream rounded-lg hover:bg-luxury-beige transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      <span className="text-body font-medium text-luxury-gray-900">
                        Add Team Member
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-luxury-gray-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </InView>

            {/* Recent Activity */}
            <InView variant="fadeUp" delay={0.1}>
              <div className="bg-white rounded-xl p-6 shadow-luxury border border-luxury-sand">
                <h2 className="text-h3 font-semibold text-luxury-gray-900 mb-4">
                  Recent Activity
                </h2>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-luxury-cream rounded-lg"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-body text-luxury-gray-900">{activity.action}</p>
                        <p className="text-body-sm text-luxury-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  <p className="text-body-sm text-luxury-gray-500 text-center py-4">
                    Activity tracking will appear here once you start making changes
                  </p>
                </div>
              </div>
            </InView>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InView variant="fadeUp">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-h3 font-semibold text-luxury-gray-900 mb-3">
                  GitHub Integration
                </h3>
                <p className="text-body text-luxury-gray-600 mb-4">
                  All changes are automatically committed to your GitHub repository and deployed
                  to Vercel. Images are stored in Vercel Blob Storage.
                </p>
                <div className="flex items-center gap-2 text-body-sm text-luxury-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Connected to {process.env.GITHUB_REPO || 'GitHub'}</span>
                </div>
              </div>
            </InView>

            <InView variant="fadeUp" delay={0.1}>
              <div className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl p-6 border border-accent/10">
                <h3 className="text-h3 font-semibold text-luxury-gray-900 mb-3">
                  Need Help?
                </h3>
                <p className="text-body text-luxury-gray-600 mb-4">
                  Documentation and guides for using the admin panel are available. Contact
                  support if you need assistance.
                </p>
                <a
                  href="mailto:orders@yudezign.com"
                  className="inline-flex items-center text-body-sm font-medium text-primary hover:text-primary-light transition-colors"
                >
                  orders@yudezign.com
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </InView>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
