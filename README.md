# YuDeZign - Custom Cabinet Manufacturing Website

> Premium European-style frameless cabinetry manufacturer in Houston, Texas

**Status**: 🟡 In Development
**Version**: 3.0 (Minimal Luxury Design Phase)
**Last Updated**: November 2, 2025

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Development Workflow](#development-workflow)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Support](#support)

---

## 🏢 About

YuDeZign is a Houston-based custom cabinet manufacturer specializing in European-style frameless cabinetry. This website serves as a digital showroom and lead generation platform, showcasing our premium craftsmanship and supply-only business model.

### Business Highlights
- **Founded**: 2015
- **Location**: Houston, Texas
- **Specialization**: Frameless European cabinetry
- **Products**: Custom cabinets for kitchens, closets, vanities, commercial spaces
- **Quality**: 3/4" plywood construction
- **Turnaround**: 2-3 weeks
- **Finishes**: 26 options (melamine, laminate, acrylic, wood-grain)
- **Volume**: 500+ projects annually
- **Model**: Supply-only, direct from factory

---

## ✨ Features

### Current Features (v3.0)
- ✅ **7 Main Pages**: Home, Portfolio, Category Pages (5), Finishes, Closet Program, About, Contact
- ✅ **Project Showcase**: 10 featured projects (6 residential + 4 commercial)
- ✅ **Finish Library**: 26 material options with color swatches
- ✅ **Responsive Design**: Mobile-first, fully responsive on all devices
- ✅ **Modern Animations**: Scroll-triggered animations with Framer Motion
- ✅ **Minimal Luxury Aesthetic**: Forest green brand color, warm cream backgrounds, gold accents
- ✅ **Contact Forms**: Quote request and general inquiry forms
- ✅ **KD Lite Marketing**: Free closet design software promotion
- ✅ **SEO Optimized**: Meta tags, structured data, sitemap-ready

### In Progress
- 🚧 **Admin Panel**: Media management system for easy content updates
- 🚧 **Real Photography**: Replacing Unsplash placeholders with actual products
- 🚧 **Form Backend**: Contact form email integration
- 🚧 **Analytics**: Google Analytics 4 implementation

### Planned Features
- 📋 **Before/After Showcases**: Project transformation galleries
- 📋 **Customer Testimonials**: Social proof and reviews
- 📋 **Image Lightbox**: Full-screen project gallery viewer
- 📋 **Blog**: Content marketing and SEO
- 📋 **Live Chat**: Real-time customer support
- 📋 **3D Configurator**: Interactive cabinet visualization

See [ROADMAP.md](./ROADMAP.md) for full feature timeline.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Language**: TypeScript 5.6.2 (100% type coverage)
- **Routing**: React Router DOM 7.9.5
- **Styling**: Tailwind CSS 3.4.18
- **Animations**: Framer Motion 12.23.24
- **Icons**: Lucide React 0.552.0

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with React plugins
- **Type Checking**: TypeScript strict mode
- **CSS Processing**: PostCSS with Autoprefixer
- **Fast Refresh**: Vite + SWC/Babel

### Deployment
- **Platform**: Vercel
- **CI/CD**: Auto-deploy on push to main branch
- **Repository**: GitHub (Yudezign-Site-1)

### Bundle Size
- **JavaScript**: 448KB (133KB gzipped)
- **CSS**: 40KB (6KB gzipped)
- **Build Time**: ~2 seconds
- **Performance Target**: Lighthouse 90+

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18+ or v20+ (LTS recommended)
- **npm**: v9+ or v10+
- **Git**: Latest version

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Yudezign-Site-1
```

2. **Install dependencies**
```bash
npm install
```
This will install ~300 packages (takes 2-3 minutes).

3. **Set up environment variables** (optional for development)
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration (see [Environment Variables](#environment-variables))

4. **Start development server**
```bash
npm run dev
```
Opens at `http://localhost:5173`

5. **View in browser**
- Navigate to `http://localhost:5173`
- Site should load with hot module replacement active

### Quick Start
```bash
# One-command setup
npm install && npm run dev
```

---

## 📁 Project Structure

```
Yudezign-Site-1/
├── public/                    # Static assets
│   └── vite.svg               # Vite logo (placeholder)
├── src/
│   ├── components/
│   │   ├── layout/           # Navigation, Footer
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/               # Reusable UI components
│   │       ├── MinimalCard.tsx        # Current minimal luxury cards
│   │       ├── InViewAnimations.tsx   # Scroll-triggered animations
│   │       ├── ProjectCard.tsx        # Project showcase cards
│   │       ├── ValueCard.tsx          # Value proposition cards
│   │       ├── FinishSwatch.tsx       # Finish material display
│   │       ├── ModernCard.tsx         # (Legacy) Modern design variants
│   │       ├── AdvancedAnimations.tsx # (Legacy) Advanced animations
│   │       ├── CustomCursor.tsx       # (Legacy) Custom cursor
│   │       └── AnimatedBackgrounds.tsx # (Legacy) Background effects
│   ├── pages/                # Route components (7 pages)
│   │   ├── Home.tsx          # Landing page
│   │   ├── Portfolio.tsx     # All projects overview
│   │   ├── Kitchens.tsx      # Kitchen category
│   │   ├── Closets.tsx       # Closet category
│   │   ├── Vanities.tsx      # Vanity category
│   │   ├── Custom.tsx        # Custom projects category
│   │   ├── Commercial.tsx    # Commercial projects category
│   │   ├── Finishes.tsx      # 25 finish options
│   │   ├── KDLite.tsx        # Closet design software
│   │   ├── About.tsx         # Company story
│   │   └── Contact.tsx       # Contact form
│   ├── data/                 # Static data
│   │   ├── projects.ts       # Project information (10 projects)
│   │   └── finishes.ts       # Finish materials (25 options)
│   ├── types/                # TypeScript interfaces
│   │   ├── project.ts        # Project type definitions
│   │   └── finish.ts         # Finish type definitions
│   ├── App.tsx               # Main app component with router
│   ├── main.tsx              # App entry point
│   └── index.css             # Global styles + Tailwind imports
├── .env.example              # Environment variables template
├── .env.local                # Local environment (gitignored)
├── eslint.config.js          # ESLint configuration
├── tsconfig.json             # TypeScript base config
├── tsconfig.app.json         # TypeScript app config
├── tsconfig.node.json        # TypeScript node config
├── vite.config.ts            # Vite build configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── package.json              # Dependencies and scripts
│
├── README.md                 # This file
├── LINEAR_ISSUES.md          # Detailed Linear issue descriptions
├── LINEAR_SYNC.md            # Linear project sync status
├── ROADMAP.md                # Project roadmap and timeline
├── TASKS.md                  # Quick task reference
├── MEDIA_SYSTEM_SPEC.md      # Admin panel architecture
├── DESIGN_DOCUMENTATION.md   # Design system documentation
└── REDESIGN_SUMMARY.md       # Ultra-modern redesign phase notes
```

**Key Files**:
- `src/data/projects.ts` - All project information (currently using Unsplash placeholders)
- `src/data/finishes.ts` - Finish material data and color swatches
- `tailwind.config.js` - Custom color palette, typography, animations
- `LINEAR_SYNC.md` - Track project progress and Linear sync

---

## 📜 Available Scripts

### Development
```bash
npm run dev
# Start development server at http://localhost:5173
# Hot module replacement enabled
# Opens automatically in browser
```

### Build
```bash
npm run build
# 1. TypeScript compilation (type checking)
# 2. Vite production build
# Output: dist/ folder
# Build time: ~2 seconds
```

### Preview
```bash
npm run preview
# Preview production build locally
# Requires 'npm run build' first
# Opens at http://localhost:4173
```

### Type Checking
```bash
npm run type-check
# Run TypeScript compiler without emitting files
# Checks all TypeScript errors
# Should show 0 errors
```

### Linting
```bash
npm run lint
# Run ESLint on all TypeScript/TSX files
# Checks code quality and best practices
```

---

## 🔐 Environment Variables

### Required Variables (Production)

Create `.env.local` file in project root (or use `.env.example` as template):

```env
# Vercel Blob Storage (automatically provided by Vercel in production)
# For local development, get token from: https://vercel.com/dashboard → Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_XXXXXXXXXXXXXX

# Admin Panel Authentication
VITE_ADMIN_PASSWORD=secure-password-here

# GitHub API (for admin panel auto-commit)
GITHUB_TOKEN=ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
GITHUB_REPO_OWNER=DamianKaizhen
GITHUB_REPO_NAME=Yudezign-Site-1
GITHUB_BRANCH=main
```

### Current Vercel Blob Store Configuration

```
Store ID:       store_OwcahJZz8KIDIUwp
Storage Region: iad1 (US East)
Base URL:       https://owcahjzz8kidiuwp.public.blob.vercel-storage.com
Store Name:     yudezign-blob
```

### Optional Variables

```env
# Google Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Development mode (enables extra debugging)
VITE_DEV_MODE=true
```

### Using Environment Variables

**Client-side** (prefixed with `VITE_`):
```typescript
const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID
const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD
```

**Server-side** (API routes, no prefix):
```typescript
const blobToken = process.env.BLOB_READ_WRITE_TOKEN
const githubToken = process.env.GITHUB_TOKEN
```

**Important**:
- Client-side variables must be prefixed with `VITE_`
- Server-side API variables (blob, github) should NOT have `VITE_` prefix
- Vercel automatically provides `BLOB_READ_WRITE_TOKEN` when blob store is linked

---

## 🚀 Deployment

### Vercel Deployment (Recommended)

This project is configured for Vercel deployment:

1. **Connect GitHub Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import `Yudezign-Site-1` repository

2. **Configure Build Settings**
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Node Version**: 20.x

3. **Add Environment Variables**
   - Add all required env variables in Vercel dashboard
   - Settings → Environment Variables

4. **Deploy**
   - Vercel auto-deploys on every push to main branch
   - Pull requests get preview deployments
   - Production URL: `yudezign.vercel.app` (or custom domain)

### Manual Deployment

For other hosting platforms:

```bash
# Build the project
npm run build

# Output is in dist/ folder
# Upload dist/ to your hosting service
```

**Compatible Hosting**:
- Vercel ✅ (Recommended)
- Netlify ✅
- AWS S3 + CloudFront ✅
- GitHub Pages ✅
- Any static hosting ✅

---

## 👨‍💻 Development Workflow

### Starting Development
1. Create a new branch: `git checkout -b feature/your-feature`
2. Start dev server: `npm run dev`
3. Make changes (hot reload active)
4. Test changes in browser

### Making Changes
1. **Components**: Add to `src/components/ui/`
2. **Pages**: Add to `src/pages/`
3. **Data**: Update `src/data/`
4. **Styles**: Edit `tailwind.config.js` or component styles

### Before Committing
```bash
npm run type-check  # Check TypeScript errors
npm run lint        # Check code quality
npm run build       # Verify production build works
```

### Committing
Use Linear issue IDs in commit messages:
```bash
git commit -m "[YUDE-X] Brief description

Detailed explanation of changes made.
"
```

### Pushing
```bash
git push origin feature/your-feature
```

### Creating Pull Request
1. Push branch to GitHub
2. Create PR with description
3. Reference Linear issue (YUDE-X)
4. Request review if needed
5. Vercel creates preview deployment
6. Merge after approval

---

## 📚 Documentation

### Project Documentation
- **[LINEAR_ISSUES.md](./LINEAR_ISSUES.md)** - All 30 issues with detailed descriptions
- **[LINEAR_SYNC.md](./LINEAR_SYNC.md)** - Project sync status and Linear connection
- **[ROADMAP.md](./ROADMAP.md)** - Complete project roadmap and timeline
- **[TASKS.md](./TASKS.md)** - Quick task reference
- **[MEDIA_SYSTEM_SPEC.md](./MEDIA_SYSTEM_SPEC.md)** - Admin panel technical spec

### Design Documentation
- **[DESIGN_DOCUMENTATION.md](./DESIGN_DOCUMENTATION.md)** - Complete design system guide
- **[REDESIGN_SUMMARY.md](./REDESIGN_SUMMARY.md)** - Ultra-modern redesign notes

### External Resources
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🤝 Contributing

### For Team Members

1. **Check Linear for assigned issues**
   - **Linear Project**: [Yudezign Website](https://linear.app/kaizhen/project/yudezign-website-339122c1f8a5)
   - Pick an issue or get one assigned

2. **Create feature branch**
   ```bash
   git checkout -b feature/YUDE-X-brief-description
   ```

3. **Make changes following**:
   - Minimal luxury design principles
   - TypeScript strict mode
   - Component-based architecture
   - Accessibility best practices

4. **Test thoroughly**:
   - Desktop browsers (Chrome, Firefox, Safari, Edge)
   - Mobile devices (iOS Safari, Android Chrome)
   - Tablet sizes
   - Different screen sizes

5. **Create pull request**:
   - Reference Linear issue in title: `[YUDE-X] Title`
   - Describe changes clearly
   - Add screenshots if UI changes
   - Request review

6. **Update Linear**:
   - Move issue to "In Review"
   - Add comment with PR link
   - Update status after merge

### Code Style Guidelines

**TypeScript**:
- Use strict mode
- Define interfaces for all data structures
- Avoid `any` type
- Use descriptive variable names

**React**:
- Functional components with hooks
- Props interfaces defined
- Use TypeScript for all components
- Keep components focused and reusable

**Styling**:
- Tailwind utility classes preferred
- Follow minimal luxury design system
- Use forest green (#0f4c3a) and gold (#d4a574)
- Responsive mobile-first approach

**Naming Conventions**:
- Components: PascalCase (`ProjectCard.tsx`)
- Files: PascalCase for components, camelCase for utilities
- CSS classes: Tailwind utilities + BEM for custom classes
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE

---

## 🐛 Support & Issues

### Reporting Issues
1. Check [Linear](https://linear.app/kaizhen/project/yudezign-website-339122c1f8a5) for existing issues
2. Create new issue if not found
3. Include:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Browser and device info

### Getting Help
- **Technical Questions**: Ask in team chat or Linear comments
- **Design Questions**: Refer to DESIGN_DOCUMENTATION.md
- **Deployment Issues**: Check Vercel logs
- **Build Errors**: Check Node version and dependencies

### Common Issues

**Issue**: `npm install` fails
- **Solution**: Update Node.js to v18+ or v20+, clear npm cache: `npm cache clean --force`

**Issue**: Hot reload not working
- **Solution**: Restart dev server, check file watcher limits on Linux

**Issue**: TypeScript errors after pulling changes
- **Solution**: Re-run `npm install`, restart IDE/editor

**Issue**: Build fails but dev works
- **Solution**: Run `npm run type-check` to find type errors

---

## 📊 Project Status

### Current State (November 2025)
- ✅ **Codebase**: Fully functional React/Vite application
- ✅ **Design**: Minimal luxury aesthetic implemented
- 🟡 **Content**: Using Unsplash placeholders (real photos needed)
- 🟡 **Forms**: Frontend complete (backend needed)
- 🔴 **Analytics**: Not yet implemented
- 🔴 **Admin Panel**: Planned (see YUDE-9)

### Metrics
- **Total Issues**: 30 in Linear roadmap
- **Completed**: 2 (KAI-22, KAI-52)
- **In Progress**: 1 (KAI-26)
- **Blockers**: 0
- **Estimated Launch**: 2-3 weeks (Milestone 1 completion)

See [LINEAR_SYNC.md](./LINEAR_SYNC.md) for live project status.

---

## 🎯 Next Steps

### Immediate Priorities (This Week)
1. **KAI-22**: ✅ Install dependencies (Done)
2. **KAI-26**: ✅ Update this README (Completing now)
3. **KAI-27**: Add Google Analytics
4. **KAI-25**: Implement contact form backend

### Short Term (Next 2 Weeks)
5. **KAI-23**: Gather and replace product photography (37 images)
6. **KAI-24**: Photograph finish materials (26 finishes)
7. **KAI-28**: Collect customer testimonials
8. **KAI-29**: Get team photos

### Medium Term (Next Month)
9. **KAI-30**: Build admin panel for media management
10. **KAI-31**: Optimize images (WebP, responsive sizes)
11. **KAI-32**: Add before/after showcases
12. **KAI-33**: SEO optimization

---

## 📝 License

Copyright © 2025 YuDeZign Custom Cabinets. All rights reserved.

---

## 🙏 Acknowledgments

- **Design System**: Tailwind CSS + Custom minimal luxury aesthetic
- **Icons**: Lucide React icon library
- **Animations**: Framer Motion
- **Placeholder Images**: Unsplash (temporary)
- **Hosting**: Vercel

---

## 📞 Contact

**YuDeZign Custom Cabinets**
- **Website**: [To be deployed]
- **Location**: Houston, Texas
- **Project Repository**: GitHub - Yudezign-Site-1
- **Project Manager**: Kaizhen Team
- **Development**: Claude AI Assistant + Team

---

**Built with** ❤️ **using React, TypeScript, and Tailwind CSS**

**Last Updated**: November 2, 2025
**Version**: 3.0.0 (Minimal Luxury Phase)

---

## 🔗 Project Links

- **Linear Project**: [Yudezign Website](https://linear.app/kaizhen/project/yudezign-website-339122c1f8a5)
- **GitHub Repository**: Yudezign-Site-1
- **Deployment**: Vercel (pending)
