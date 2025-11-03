export interface Project {
  id: string;
  title: string;
  category: 'kitchens' | 'closets' | 'vanities' | 'custom' | 'commercial';
  images: string[];
  thumbnail: string;
  location?: string;
  finish: string;
  cabinetStyle: string;
  features: string[];
  turnaroundTime: string;
  description: string;
}

export interface Finish {
  id: string;
  name: string;
  type: 'melamine' | 'laminate' | 'acrylic' | 'wood-grain';
  color: string;
  image: string;
  inStock: boolean;
  description?: string;
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
