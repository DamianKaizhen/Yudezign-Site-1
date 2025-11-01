import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Text Effect with character-by-character animation
interface TextEffectProps {
  children: string;
  per?: 'word' | 'char' | 'line';
  preset?: 'fade' | 'slide' | 'scale' | 'blur';
  className?: string;
  delay?: number;
}

export const TextEffect = ({
  children,
  per = 'word',
  preset = 'fade',
  className = '',
  delay = 0
}: TextEffectProps) => {
  const segments = per === 'char'
    ? children.split('')
    : per === 'word'
    ? children.split(' ')
    : [children];

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    slide: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    blur: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      visible: { opacity: 1, filter: 'blur(0px)' }
    }
  };

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.05, delayChildren: delay }}
    >
      {segments.map((segment, i) => (
        <motion.span
          key={i}
          variants={variants[preset]}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ display: 'inline-block', whiteSpace: per === 'word' ? 'pre' : 'normal' }}
        >
          {segment}{per === 'word' && i < segments.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Animated Number with spring physics
interface AnimatedNumberProps {
  value: number;
  className?: string;
  duration?: number;
}

export const AnimatedNumber = ({ value, className = '', duration = 2 }: AnimatedNumberProps) => {
  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000
  });
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span className={className}>{display}</motion.span>;
};

// 3D Card with magnetic effect
interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const Card3D = ({ children, className = '', intensity = 15 }: Card3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * intensity;
    const rotateY = ((centerX - x) / centerX) * intensity;

    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      animate={{
        rotateX,
        rotateY,
        scale: isHovering ? 1.05 : 1
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ transform: 'translateZ(50px)' }}>
        {children}
      </div>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${50 + rotateY * 2}% ${50 - rotateX * 2}%, rgba(255,255,255,0.1), transparent 50%)`,
          opacity: isHovering ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Magnetic Button with cursor attraction
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton = ({
  children,
  className = '',
  strength = 40
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * (strength / rect.width));
    y.set(distanceY * (strength / rect.height));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

// Parallax Layer for depth effects
interface ParallaxLayerProps {
  children: React.ReactNode;
  offset?: number;
  speed?: number;
  className?: string;
}

export const ParallaxLayer = ({
  children,
  offset = 0,
  speed = 0.5,
  className = ''
}: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrollY = window.scrollY;
      y.set((scrollY - offset) * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset, speed, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: springY }}
    >
      {children}
    </motion.div>
  );
};

// Animated Gradient Text
interface GradientTextProps {
  children: string;
  className?: string;
  colors?: string[];
}

export const GradientText = ({
  children,
  className = '',
  colors = ['from-primary', 'via-accent', 'to-primary-light']
}: GradientTextProps) => {
  return (
    <motion.span
      className={`bg-gradient-to-r ${colors.join(' ')} bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
      animate={{
        backgroundPosition: ['0% center', '100% center', '0% center']
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      {children}
    </motion.span>
  );
};

// Ripple Effect on click
export const RippleEffect = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 1000);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={addRipple}>
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 500, height: 500, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

// Morphing shape background
export const MorphingShape = ({ className = '' }: { className?: string }) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      animate={{
        scale: [1, 1.2, 0.8, 1],
        rotate: [0, 90, 180, 270, 360],
        borderRadius: ['30%', '40%', '50%', '40%', '30%']
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
};
