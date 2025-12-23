/**
 * Blog Post Type Definitions
 *
 * Defines the structure for blog content and metadata.
 * Each blog post is a static React component for simplicity.
 */

import { ComponentType } from 'react';

export interface BlogPost {
  slug: string; // URL-friendly identifier (e.g., 'custom-cabinet-cost-guide-houston-2025')

  // Content Metadata
  title: string; // Post title
  excerpt: string; // Short summary (2-3 sentences)
  author: string; // Author name
  authorRole?: string; // Optional author role/title
  date: string; // Publication date (ISO format: YYYY-MM-DD)
  updatedDate?: string; // Optional last updated date

  // Categorization
  category: 'design-inspiration' | 'how-to' | 'cost-pricing' | 'local-houston' | 'education';
  tags: string[]; // Keyword tags for filtering

  // Media
  heroImage: string; // Featured image URL
  ogImage?: string; // Optional custom OG image (defaults to heroImage)

  // Reading Info
  readTime: string; // Estimated read time (e.g., '5 min read')

  // Content Component
  content: ComponentType; // React component containing the post content

  // SEO
  metaDescription?: string; // Optional custom meta description (defaults to excerpt)
  keywords?: string[]; // Optional SEO keywords (supplements category/tags)

  // Internal Linking
  relatedPosts?: string[]; // Slugs of related blog posts
  relatedServices?: string[]; // Related service page slugs
  relatedLocations?: string[]; // Related location page slugs

  // Featured Status
  featured?: boolean; // Flag for homepage/featured display
}

export interface BlogCategory {
  slug: 'design-inspiration' | 'how-to' | 'cost-pricing' | 'local-houston' | 'education';
  name: string;
  description: string;
  icon: string; // Lucide icon name
}

export const blogCategories: BlogCategory[] = [
  {
    slug: 'design-inspiration',
    name: 'Design Inspiration',
    description: 'Modern trends, color palettes, and style guides',
    icon: 'Palette'
  },
  {
    slug: 'how-to',
    name: 'How-To Guides',
    description: 'Step-by-step instructions and expert tips',
    icon: 'BookOpen'
  },
  {
    slug: 'cost-pricing',
    name: 'Cost & Pricing',
    description: 'Budget planning and pricing transparency',
    icon: 'DollarSign'
  },
  {
    slug: 'local-houston',
    name: 'Houston Local',
    description: 'Houston-specific insights and market trends',
    icon: 'MapPin'
  },
  {
    slug: 'education',
    name: 'Education',
    description: 'Cabinet construction, materials, and technical knowledge',
    icon: 'GraduationCap'
  }
];
