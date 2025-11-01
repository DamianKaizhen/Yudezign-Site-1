/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Minimal Luxury Palette with Forest Green
        primary: {
          DEFAULT: '#0f4c3a', // Forest green (brand color)
          light: '#14664f',   // Lighter green
          dark: '#0a3629',    // Darker green
        },
        accent: {
          DEFAULT: '#d4a574', // Warm gold
          light: '#e0b88a',   // Lighter gold
          dark: '#b88d5f',    // Darker gold
        },
        luxury: {
          cream: '#F9F7F4',    // Warm cream (main background)
          beige: '#F5F3EF',    // Subtle beige
          sand: '#EBE8E3',     // Light sand
          white: '#FFFFFF',    // Pure white (for cards/contrast)
          gray: {
            50: '#F5F5F5',     // Lightest gray
            100: '#E5E5E5',    // Light gray (borders, dividers)
            200: '#D4D4D4',    // Medium-light gray
            300: '#A3A3A3',    // Medium gray
            400: '#8E8E8E',    // Soft gray (captions)
            500: '#6B6B6B',    // Primary gray (body text)
            600: '#525252',    // Dark gray
            700: '#404040',    // Darker gray
            800: '#2C2C2C',    // Very dark gray (text)
            900: '#1A1A1A',    // Almost black (headers)
          }
        },
        // Keep legacy colors for gradual migration
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Luxury Typography Scale
        'hero': ['96px', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '300' }],
        'hero-mobile': ['72px', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '300' }],
        'display': ['60px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '500' }],
        'display-mobile': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '500' }],
        'h1': ['40px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '500' }],
        'h2': ['32px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        'h3': ['28px', { lineHeight: '1.3', fontWeight: '500' }],
        'h4': ['24px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['14px', { lineHeight: '1.4', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '1.3', fontWeight: '500', letterSpacing: '0.1em', textTransform: 'uppercase' }],
      },
      spacing: {
        // Luxury spacing scale
        '18': '4.5rem',  // 72px
        '22': '5.5rem',  // 88px
        '26': '6.5rem',  // 104px
        '30': '7.5rem',  // 120px
        '34': '8.5rem',  // 136px
        '38': '9.5rem',  // 152px
        '42': '10.5rem', // 168px
        '46': '11.5rem', // 184px
        '50': '12.5rem', // 200px
      },
      animation: {
        // Minimal, purposeful animations only
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        // Luxury shadows (subtle)
        'luxury-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'luxury': '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
        'luxury-md': '0 4px 12px 0 rgba(0, 0, 0, 0.1)',
        'luxury-lg': '0 8px 24px 0 rgba(0, 0, 0, 0.12)',
        'luxury-xl': '0 12px 40px 0 rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
