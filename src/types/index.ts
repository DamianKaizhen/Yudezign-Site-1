export interface Project {
  id: string;
  title: string;
  category: 'kitchens' | 'closets' | 'vanities' | 'custom' | 'commercial';
  images: string[];
  /** Optional video URLs (repo /portfolio/videos/*.mp4). Shown in the gallery. */
  videos?: string[];
  thumbnail: string;
  location?: string;
  finish: string;
  cabinetStyle: string;
  features: string[];
  turnaroundTime: string;
  description: string;
}

export interface FinishStyle {
  id: string;
  name: string;
  description?: string;
  visible: boolean;
  order: number;
}

export interface Finish {
  id: string;
  name: string;
  styleId: string; // References FinishStyle.id
  color: string; // Hex color code for fallback/preview
  images: string[]; // Multiple finish material photos
  inStock: boolean;
  description?: string;
  order: number; // Display order within style
}

export interface ValueProposition {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image?: string;
  projectImage?: string;
  rating: number;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  timeline: string;
  message: string;
  files?: File[];
}

export interface KDLiteFeature {
  icon: string;
  title: string;
  description: string;
}

// Admin Panel Types

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  email?: string;
  phone?: string;
  headshot?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  timeline: string;
  message: string;
  attachments?: string[];
  submittedAt: string;
  status: 'new' | 'read' | 'responded' | 'archived';
  notes?: string;
}

export interface VisualizerFinishSelection {
  id: string;
  name: string;
  imageUrl: string;
}

export interface VisualizerSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  finishes: VisualizerFinishSelection[]; // 1-2 finish selections
  roomImage: string;
  description?: string; // Optional description of desired features
  generatedImage?: string; // AI-generated visualization result (URL or base64)
  submittedAt: string;
  status: 'new' | 'processing' | 'completed' | 'archived';
  notes?: string;
  // Legacy fields for backwards compatibility
  finishId?: string;
  finishName?: string;
}

// API Response Types

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// GitHub Integration Types

export interface GitHubCommitRequest {
  filePath: string;
  content: string;
  commitMessage: string;
}

export interface GitHubCommitResponse {
  success: boolean;
  sha?: string;
  message: string;
}

// Form Types

export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface DataTableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface DataTableAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

// Site Settings Types

export interface SiteSettings {
  logo: string;
  favicon: string;
  companyName: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
}

// SEO Page Types (for new location, service, blog, FAQ, and comparison pages)

// Location Types
export type { LocationData, NeighborhoodGroup } from './location';

// Service Types
export type { ServiceData } from './service';

// Blog Types
export type { BlogPost, BlogAuthor, BlogCategory } from './blog';
export { blogCategories } from './blog';

// FAQ Types
export type { FAQ, FAQCategory, FAQCategoryInfo } from './faq';
export { faqCategories } from './faq';

// Comparison Types
export type {
  ComparisonData,
  ComparisonRow,
  ComparisonType
} from './comparison';
