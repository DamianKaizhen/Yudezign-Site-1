/**
 * Blog Post Type Definitions
 *
 * Defines the structure for blog content and metadata.
 */

export interface BlogAuthor {
  name: string;
  bio: string;
  avatar: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or markdown content
  author: BlogAuthor;
  publishedDate: string; // ISO format: YYYY-MM-DD
  updatedDate: string;
  category: string; // Free-form category
  tags: string[];
  featuredImage?: {
    url: string;
    alt: string;
  };
  readTime: number; // Minutes
  seo: {
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
  };
  relatedPosts?: string[];
  relatedServices?: string[];
  featured?: boolean;
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
