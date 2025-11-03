/**
 * Animation Configuration
 *
 * Centralized animation constants for consistent timing and motion across the site.
 * All Framer Motion animations should use these values for a unified feel.
 */

/**
 * Spring animation configurations
 */
export const SPRING_CONFIGS = {
  /** Gentle spring for subtle movements */
  gentle: {
    stiffness: 100,
    damping: 20,
  },
  /** Smooth spring for most UI interactions */
  smooth: {
    stiffness: 150,
    damping: 15,
  },
  /** Bouncy spring for playful interactions */
  bouncy: {
    stiffness: 300,
    damping: 10,
  },
  /** Stiff spring for quick, precise movements */
  stiff: {
    stiffness: 400,
    damping: 25,
  },
} as const;

/**
 * Transition durations (in seconds)
 */
export const TRANSITION_DURATIONS = {
  /** Very fast transitions (0.15s) */
  instant: 0.15,
  /** Fast transitions (0.2s) - for hover states */
  fast: 0.2,
  /** Normal transitions (0.3s) - default for most UI */
  normal: 0.3,
  /** Medium transitions (0.4s) - for emphasis */
  medium: 0.4,
  /** Slow transitions (0.6s) - for dramatic effect */
  slow: 0.6,
  /** Very slow transitions (0.8s) - for page transitions */
  verySlow: 0.8,
} as const;

/**
 * Background animation durations (in seconds)
 */
export const BACKGROUND_DURATIONS = {
  /** Fast background animations */
  fast: 15,
  /** Normal background animations */
  normal: 20,
  /** Slow background animations */
  slow: 25,
  /** Pulse/breathing animations */
  pulse: 22,
} as const;

/**
 * Stagger children animation timing
 */
export const STAGGER_TIMINGS = {
  /** Very fast stagger (0.02s between items) */
  veryFast: 0.02,
  /** Fast stagger (0.05s between items) */
  fast: 0.05,
  /** Normal stagger (0.1s between items) */
  normal: 0.1,
  /** Slow stagger (0.15s between items) */
  slow: 0.15,
} as const;

/**
 * Common transition configurations
 */
export const TRANSITIONS = {
  /** Fast ease transition */
  fastEase: {
    duration: TRANSITION_DURATIONS.fast,
    ease: 'easeOut',
  },
  /** Normal ease transition */
  normalEase: {
    duration: TRANSITION_DURATIONS.normal,
    ease: 'easeOut',
  },
  /** Smooth spring */
  spring: {
    type: 'spring' as const,
    ...SPRING_CONFIGS.smooth,
  },
  /** Gentle spring */
  gentleSpring: {
    type: 'spring' as const,
    ...SPRING_CONFIGS.gentle,
  },
  /** Bouncy spring */
  bouncySpring: {
    type: 'spring' as const,
    ...SPRING_CONFIGS.bouncy,
  },
} as const;

/**
 * Common animation variants
 */
export const ANIMATION_VARIANTS = {
  /** Fade in from bottom */
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  /** Fade in from top */
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  /** Simple fade */
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  /** Scale up */
  scaleUp: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  /** Hover scale (for interactive elements) */
  hoverScale: {
    initial: { scale: 1 },
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  },
} as const;

/**
 * Scroll animation delays (based on viewport position)
 */
export const SCROLL_DELAYS = {
  /** No delay */
  none: 0,
  /** Short delay (100ms) */
  short: 0.1,
  /** Medium delay (200ms) */
  medium: 0.2,
  /** Long delay (300ms) */
  long: 0.3,
} as const;

/**
 * Helper: Create staggered container variant
 */
export const createStaggerContainer = (
  stagger: keyof typeof STAGGER_TIMINGS = 'normal',
  delayChildren = 0
) => ({
  animate: {
    transition: {
      staggerChildren: STAGGER_TIMINGS[stagger],
      delayChildren,
    },
  },
});

/**
 * Helper: Create scroll reveal variant with custom delay
 */
export const createScrollReveal = (delay: number = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: TRANSITION_DURATIONS.medium,
    delay,
  },
});
