import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { blogPosts, getRelatedBlogPosts } from '../../data/blogPosts';
import { generateArticleSchema } from '../../lib/schema';
import { Calendar, Clock, User, Tag, ArrowRight, Share2 } from 'lucide-react';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find blog post by slug
  const post = blogPosts.find(p => p.slug === slug);

  // If post not found, redirect
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Get related posts
  const relatedPosts = getRelatedBlogPosts(post.slug, 3);

  // Generate structured data
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    author: post.author.name,
    publishedDate: post.publishedDate,
    imageUrl: post.featuredImage?.url || '',
  });

  return (
    <>
      <SEO
        title={post.title}
        description={post.seo.metaDescription}
        keywords={post.seo.keywords}
        canonical={`https://yudezign.com/blog/${post.slug}`}
        ogType="article"
        ogImage={post.seo.ogImage}
        structuredData={articleSchema}
      />

      {/* Article Header */}
      <article className="pt-20 pb-16">
        {/* Hero */}
        <div className="bg-slate-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Badge */}
            <div className="inline-block bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {post.category}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-6 text-sm text-slate-600 pb-8 border-b border-slate-200">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {post.author.name}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.publishedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.readTime} min read
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
          <div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl shadow-2xl h-96 flex items-center justify-center">
            <p className="text-slate-500">Featured Image</p>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-slate max-w-none">
            {/* Placeholder for actual article content */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
              <p className="text-slate-600 italic mb-4">
                Article content would go here. In production, this would be the full article with rich formatting, images, and embedded content.
              </p>

              <div className="my-8 p-6 bg-amber-50 border-l-4 border-amber-600 rounded-r-lg">
                <p className="text-slate-700 font-medium">
                  <strong>Key Takeaway:</strong> This blog post structure includes all necessary SEO elements, structured data, and is ready for content population.
                </p>
              </div>

              <p className="text-slate-600 mb-4">
                Each blog post would include comprehensive information about cabinet topics like pricing, design trends, materials, installation processes, and Houston-specific considerations.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Implementation Note</h2>
              <p className="text-slate-600 mb-4">
                To add actual article content, you can either:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 mb-4">
                <li>Store full HTML content in the blogPosts.ts data file</li>
                <li>Use MDX for markdown-based content with React components</li>
                <li>Create individual React components for each blog post</li>
                <li>Integrate with a headless CMS like Contentful or Sanity</li>
              </ul>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-5 h-5 text-slate-600" />
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share Buttons */}
          <div className="mt-8 p-6 bg-slate-50 rounded-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Share this article</h3>
              <div className="flex gap-3">
                <button className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors shadow-sm">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-8 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-slate-300 rounded-full flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">{post.author.name}</h3>
                <p className="text-slate-600 mb-4">{post.author.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Related Articles</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(related => (
                <a
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-slate-200 overflow-hidden group"
                >
                  <div className="bg-gradient-to-br from-slate-200 to-slate-300 h-40 flex items-center justify-center">
                    <p className="text-slate-500 text-sm">Image</p>
                  </div>
                  <div className="p-6">
                    <div className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {related.category}
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {related.excerpt}
                    </p>
                    <div className="inline-flex items-center text-amber-600 font-semibold text-sm">
                      Read Article
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Get expert guidance from Houston's cabinet specialists.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl"
          >
            Schedule Free Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
