export interface Project {
  id: string;
  title: string;
  category: 'kitchens' | 'closets' | 'vanities' | 'custom';
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
