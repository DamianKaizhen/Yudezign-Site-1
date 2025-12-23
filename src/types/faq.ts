/**
 * FAQ Type Definitions
 *
 * Defines the structure for FAQ content across different categories.
 * FAQs are organized by category for better UX and SEO (FAQPage schema).
 */

export interface FAQ {
  id: string; // Unique identifier
  question: string; // The question
  answer: string; // The answer (can include HTML/markdown)
  category: FAQCategory; // Primary category
  tags?: string[]; // Optional tags for cross-referencing
  relatedFAQs?: string[]; // IDs of related FAQs
  order?: number; // Display order within category
}

export type FAQCategory = 'general' | 'pricing' | 'installation' | 'materials' | 'process' | 'warranty';

export interface FAQCategoryInfo {
  slug: FAQCategory;
  name: string;
  description: string;
  icon: string; // Lucide icon name
}

export const faqCategories: FAQCategoryInfo[] = [
  {
    slug: 'general',
    name: 'General Questions',
    description: 'Common questions about YuDezign and our services',
    icon: 'HelpCircle'
  },
  {
    slug: 'pricing',
    name: 'Pricing & Cost',
    description: 'Questions about pricing, quotes, and payment',
    icon: 'DollarSign'
  },
  {
    slug: 'installation',
    name: 'Installation',
    description: 'Questions about the installation process and timeline',
    icon: 'Wrench'
  },
  {
    slug: 'materials',
    name: 'Materials & Finishes',
    description: 'Questions about cabinet materials, finishes, and durability',
    icon: 'Package'
  },
  {
    slug: 'process',
    name: 'Design Process',
    description: 'Questions about how the design and ordering process works',
    icon: 'Workflow'
  },
  {
    slug: 'warranty',
    name: 'Warranty & Support',
    description: 'Questions about warranties, guarantees, and after-sales support',
    icon: 'Shield'
  }
];
