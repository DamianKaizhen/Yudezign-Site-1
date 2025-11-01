import { motion } from 'framer-motion';
import { useState } from 'react';
import type { ReactNode } from 'react';

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  spotlight?: boolean;
  glow?: boolean;
}

export const GlassCard = ({ children, className = '', spotlight = false }: ModernCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlight) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 165, 116, 0.2), transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export const BentoCard = ({ children, className = '', glow = false }: ModernCardProps) => {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-white to-neutral-50 border border-neutral-200 shadow-lg ${className}`}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      <div className="relative z-10">{children}</div>
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export const SpotlightCard = ({ children, className = '' }: ModernCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl bg-white border border-neutral-200 shadow-md ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Spotlight effect */}
      {isHovering && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(15, 76, 58, 0.08), transparent 40%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Gradient border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient-x p-[2px]">
        <div className="w-full h-full rounded-2xl bg-white" />
      </div>

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export const NeonCard = ({ children, className = '' }: ModernCardProps) => {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Neon glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500" />

      {/* Card content */}
      <div className="relative bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-hidden">
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
};
