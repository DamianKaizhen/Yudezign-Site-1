import React, { useState } from 'react';
import SEO from '../../components/SEO';
import { blogPosts } from '../../data/blogPosts';
import { Clock, Calendar, ArrowRight, Search, Filter } from 'lucide-react';

const BlogIndex: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Get featured post (latest)
  const featuredPost = blogPosts[0];

  return (
    <>
      <SEO
        title="Cabinet Design Blog | Tips, Trends & Guides | YuDezign Houston"
        description="Expert cabinet design advice, Houston home improvement tips, latest trends, cost guides, and how-to articles from YuDezign's cabinet specialists."
        keywords={[
          'cabinet blog',
          'kitchen design blog',
          'Houston home improvement',
          'cabinet trends',
          'cabinet design tips',
          'custom cabinet guides',
        ]}
        canonical="https://yudezign.com/blog"
        ogType="website"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-1 bg-accent mx-auto mb-8"></div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Cabinet Design <br />
              <span className="text-white">
                Tips & Resources
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Expert advice, design inspiration, and practical guides from Houston's cabinet specialists.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-slate-600" />
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category === 'all' ? 'All Posts' : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'all' && searchQuery === '' && (
        <section className="py-12 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="h-64 lg:h-auto overflow-hidden">
                  <img
                    src={featuredPost.featuredImage?.url || '/images/blog/default.jpg'}
                    alt={featuredPost.featuredImage?.alt || 'Featured blog post'}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 self-start">
                    Featured Post
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-slate-600 mb-6">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-slate-500 mb-6">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(featuredPost.publishedDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {featuredPost.readTime} min read
                    </div>
                  </div>

                  <a
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all self-start"
                  >
                    Read Article
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-slate-600">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <article key={post.slug} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-slate-200 overflow-hidden group">
                  {/* Image */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.featuredImage?.url || '/images/blog/default.jpg'}
                      alt={post.featuredImage?.alt || 'Blog post image'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="inline-block bg-accent-light text-primary-dark px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {post.category}
                    </div>

                    <h3 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-primary transition-colors">
                      <a href={`/blog/${post.slug}`}>
                        {post.title}
                      </a>
                    </h3>

                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.publishedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime} min
                      </div>
                    </div>

                    <a
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary hover:text-primary-dark font-semibold text-sm"
                    >
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Get Cabinet Design Tips
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Subscribe to receive expert advice, design inspiration, and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogIndex;
