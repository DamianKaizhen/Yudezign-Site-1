import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// Minimal Luxury Card - Clean, subtle, refined
interface MinimalCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const MinimalCard = ({
  children,
  className = '',
  hover = true,
  padding = 'lg'
}: MinimalCardProps) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  };

  return (
    <motion.div
      className={`bg-white border border-luxury-gray-100 rounded-lg ${paddingClasses[padding]} ${className}`}
      whileHover={hover ? {
        y: -4,
        boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.12)'
      } : {}}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
      style={{
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.08)'
      }}
    >
      {children}
    </motion.div>
  );
};

// Simple image card with overlay on hover
interface ImageCardProps {
  image: string;
  title: string;
  subtitle?: string;
  href?: string;
  className?: string;
}

export const ImageCard = ({
  image,
  title,
  subtitle,
  href,
  className = ''
}: ImageCardProps) => {
  const CardContent = (
    <motion.div
      className={`relative overflow-hidden rounded-lg group cursor-pointer ${className}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* Overlay - appears on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent flex items-end p-8"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-white">
          <h3 className="text-h3 font-medium mb-1">{title}</h3>
          {subtitle && (
            <p className="text-body text-luxury-gray-100">{subtitle}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {CardContent}
      </a>
    );
  }

  return CardContent;
};

// Specs card for product specifications
interface SpecCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const SpecCard = ({
  icon,
  title,
  description,
  className = ''
}: SpecCardProps) => {
  return (
    <div className={`text-center ${className}`}>
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-accent">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-h4 font-medium text-primary mb-2">{title}</h3>

      {/* Description */}
      <p className="text-body text-luxury-gray-500">{description}</p>
    </div>
  );
};

// Simple feature card
interface FeatureCardProps {
  number?: string;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard = ({
  number,
  title,
  description,
  className = ''
}: FeatureCardProps) => {
  return (
    <div className={`${className}`}>
      {number && (
        <div className="text-label text-accent mb-3">{number}</div>
      )}
      <h3 className="text-h3 font-medium text-primary mb-3">{title}</h3>
      <p className="text-body-lg text-luxury-gray-500 leading-relaxed">{description}</p>
    </div>
  );
};
