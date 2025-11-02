# Yudezign Website - Task List

**Quick Reference** - See [LINEAR_ISSUES.md](./LINEAR_ISSUES.md) for detailed descriptions

**Last Updated**: 2025-01-02

---

## Milestone 1: Content & Launch Readiness (0/8)

| ID | Task | Priority | Points | Status |
|----|------|----------|--------|--------|
| YUDE-1 | Install dependencies | P0 | 1 | ⏸️ Todo |
| YUDE-2 | Replace Unsplash placeholder images | P0 | 8 | ⏸️ Todo |
| YUDE-3 | Add real finish material photos | P0 | 5 | ⏸️ Todo |
| YUDE-4 | Implement contact form backend | P0 | 3 | ⏸️ Todo |
| YUDE-5 | Update README.md | P1 | 2 | ⏸️ Todo |
| YUDE-6 | Add Google Analytics | P1 | 2 | ⏸️ Todo |
| YUDE-7 | Gather customer testimonials | P1 | 5 | ⏸️ Todo |
| YUDE-8 | Get team photos | P1 | 3 | ⏸️ Todo |

**Total Points**: 29

---

## Milestone 2: Enhanced Functionality (0/10)

| ID | Task | Priority | Points | Status |
|----|------|----------|--------|--------|
| YUDE-9 | Build admin panel for media management | P1 | 13 | ⏸️ Todo |
| YUDE-10 | Create image optimization pipeline | P1 | 5 | ⏸️ Todo |
| YUDE-11 | Add before/after project showcases | P1 | 8 | ⏸️ Todo |
| YUDE-12 | SEO meta tags optimization | P1 | 5 | ⏸️ Todo |
| YUDE-13 | Accessibility audit and improvements | P1 | 5 | ⏸️ Todo |
| YUDE-14 | Remove legacy animation code | P2 | 5 | ⏸️ Todo |
| YUDE-15 | Integrate KD Lite software | P2 | 13 | ⏸️ Todo |
| YUDE-16 | Add testimonials section component | P2 | 3 | ⏸️ Todo |
| YUDE-17 | Create image lightbox/gallery | P2 | 5 | ⏸️ Todo |
| YUDE-18 | Performance optimization | P2 | 5 | ⏸️ Todo |

**Total Points**: 67

---

## Milestone 3: Advanced Features (0/12)

| ID | Task | Priority | Points | Status |
|----|------|----------|--------|--------|
| YUDE-19 | Before/after slider component | P3 | 5 | ⏸️ Todo |
| YUDE-20 | 3D cabinet configurator (research) | P3 | 21 | ⏸️ Todo |
| YUDE-21 | Live chat integration | P3 | 3 | ⏸️ Todo |
| YUDE-22 | Instagram feed integration | P3 | 5 | ⏸️ Todo |
| YUDE-23 | Blog section with CMS | P3 | 13 | ⏸️ Todo |
| YUDE-24 | Advanced analytics | P3 | 5 | ⏸️ Todo |
| YUDE-25 | Newsletter signup | P3 | 3 | ⏸️ Todo |
| YUDE-26 | Video content integration | P3 | 5 | ⏸️ Todo |
| YUDE-27 | Customer portal | P3 | 21 | ⏸️ Todo |
| YUDE-28 | Multi-language support | P3 | 13 | ⏸️ Todo |
| YUDE-29 | Design consultation booking | P3 | 13 | ⏸️ Todo |
| YUDE-30 | Interactive finish selector | P3 | 8 | ⏸️ Todo |

**Total Points**: 115

---

## Quick Stats

**Overall Progress**: 0/30 tasks (0%)
**Story Points**: 0/211 completed (0%)

**By Priority**:
- P0 (Critical): 0/4 (0%)
- P1 (High): 0/10 (0%)
- P2 (Medium): 0/6 (0%)
- P3 (Lower): 0/10 (0%)

**By Milestone**:
- Milestone 1: 0/8 (0%) - 29 points
- Milestone 2: 0/10 (0%) - 67 points
- Milestone 3: 0/12 (0%) - 115 points

---

## Current Week Focus

### Week of January 2-8, 2025

**In Progress**:
- Setting up project documentation
- Planning Linear project structure

**Up Next**:
1. YUDE-1: Install dependencies
2. YUDE-5: Update README.md
3. YUDE-6: Add Google Analytics
4. YUDE-4: Implement contact form backend

---

## Detailed Task Breakdown

### YUDE-1: Install Dependencies (1 pt) ⏸️
```bash
npm install
```
**Acceptance**: Dependencies installed, dev server starts

---

### YUDE-2: Replace Placeholder Images (8 pts) ⏸️
**Content Needed**:
- Kitchen projects: 8 images
- Closet projects: 6 images
- Vanity projects: 4 images
- Custom/commercial: 8 images
- About page: 5 images
- Hero backgrounds: 6 images

**Total**: 37 images needed

**Files**: `src/data/projects.ts`, `src/pages/Home.tsx`, `src/pages/About.tsx`

---

### YUDE-3: Add Finish Material Photos (5 pts) ⏸️
**Content Needed**:
- 25 finish samples photographed
- Close-up texture shots
- Full panel shots
- Consistent lighting/background

**Files**: `src/data/finishes.ts`, `src/pages/Finishes.tsx`

---

### YUDE-4: Implement Contact Form Backend (3 pts) ⏸️
**Options**:
- Formspree (recommended - easy setup)
- Netlify Forms
- Custom API with SendGrid/Resend

**Features**:
- Email notifications to team
- Auto-reply to customer
- Spam protection
- Form validation

**Files**: `src/pages/Contact.tsx`, `src/utils/formSubmission.ts`

---

### YUDE-5: Update README.md (2 pts) ⏸️
**Sections**:
- Project overview
- Technology stack
- Installation instructions
- Available scripts
- Deployment process
- Link to Linear project

**Status**: ✅ Completed

---

### YUDE-6: Add Google Analytics (2 pts) ⏸️
**Tasks**:
- Create GA4 property
- Add tracking code
- Configure events
- Test tracking

**Events to Track**:
- Contact form submissions
- Quote requests
- KD Lite clicks
- Finish views
- Project clicks

**Files**: `src/utils/analytics.ts`, environment variables

---

### YUDE-7: Gather Customer Testimonials (5 pts) ⏸️
**Target**: 8-12 testimonials

**Content Per Testimonial**:
- Customer name & location
- Project type
- Testimonial text (2-4 sentences)
- Customer photo (optional)
- Star rating
- Permission for use

**Files**: `src/data/testimonials.ts`

---

### YUDE-8: Get Team Photos (3 pts) ⏸️
**Team Members**:
- Founders
- Lead designers
- Production managers
- Craftspeople
- Customer service

**Content Per Member**:
- Professional photo
- Name & title
- Bio (2-3 sentences)
- Years of experience

**Files**: `src/pages/About.tsx`

---

### YUDE-9: Build Admin Panel (13 pts) ⏸️
**Architecture**: Vercel Blob Storage + GitHub API

**Features**:
- Protected `/admin` route
- Image upload (drag & drop)
- Category organization
- Alt text editor
- Commit & deploy button

**Tech Stack**:
- Vercel Blob for storage
- GitHub API for auto-commit
- Simple password auth

**Files**: `src/admin/*`, `src/utils/uploadToVercelBlob.ts`

See [MEDIA_SYSTEM_SPEC.md](./MEDIA_SYSTEM_SPEC.md) for details

---

### YUDE-10: Image Optimization (5 pts) ⏸️
**Optimizations**:
- Convert to WebP
- Generate responsive sizes (400px, 800px, 1200px, 1600px)
- Implement srcset
- Add lazy loading
- Average size reduced 60%+

**Tools**: sharp, vite-plugin-imagemin

---

### YUDE-11: Before/After Showcases (8 pts) ⏸️
**Content Needed**:
- 5-10 projects with before/after photos
- Project descriptions
- Transformation details
- Customer testimonials

**Components**:
- Side-by-side comparison
- Slider to reveal
- Project details overlay

**Files**: `src/pages/Transformations.tsx`, `src/data/transformations.ts`

---

### YUDE-12: SEO Optimization (5 pts) ⏸️
**Improvements**:
- Unique meta titles (all 7 pages)
- Meta descriptions (155 chars)
- OpenGraph tags
- Twitter Card tags
- JSON-LD structured data (LocalBusiness, Product, Review)
- Sitemap.xml
- Robots.txt
- Google Search Console setup

**Target Keywords**:
- "custom cabinets Houston"
- "frameless cabinets Houston"
- "European cabinets Texas"

---

### YUDE-13: Accessibility Audit (5 pts) ⏸️
**Audit Areas**:
- Keyboard navigation
- Screen reader compatibility
- Color contrast (WCAG AA)
- ARIA labels
- Focus indicators
- Alt text
- Form accessibility

**Tools**: WAVE, axe DevTools, Lighthouse

**Target**: Lighthouse Accessibility 95+

---

### YUDE-14: Remove Legacy Code (5 pts) ⏸️
**Files to Remove**:
- Unused Modern card variants
- Unused animation components
- CustomCursor.tsx (not used)
- Partial AnimatedBackgrounds.tsx

**Goal**: Reduce bundle by 50KB+

---

### YUDE-15: KD Lite Integration (13 pts) ⏸️
**Options**:
1. Embed actual KD Lite software
2. Build simplified configurator
3. Create interactive demo

**Features** (if custom build):
- Room measurement input
- Closet style selection
- Finish picker
- Component builder
- 3D/2D preview
- Price calculator
- Save/share designs

---

### YUDE-16: Testimonials Component (3 pts) ⏸️
**Component Features**:
- Carousel/slider
- Star rating display
- Customer photo
- Project type badge
- Auto-rotate option

**Placement**:
- Home page (after projects)
- About page (before CTA)
- Category pages (bottom)

**Files**: `src/components/ui/TestimonialCard.tsx`, `src/components/layout/TestimonialsSection.tsx`

---

### YUDE-17: Image Lightbox (5 pts) ⏸️
**Features**:
- Full-screen overlay
- Prev/next navigation
- Keyboard shortcuts
- Thumbnail strip
- Zoom functionality
- Touch gestures

**Libraries**: `react-image-lightbox` or `yet-another-react-lightbox`

---

### YUDE-18: Performance Optimization (5 pts) ⏸️
**Optimizations**:
- Route-based code splitting
- Lazy loading components
- Dynamic imports
- Tree shaking
- Bundle analysis
- Preload critical resources

**Targets**:
- Lighthouse 95+
- FCP < 1.5s
- LCP < 2.5s
- TTI < 3.5s
- CLS < 0.1
- JS bundle < 300KB

---

### YUDE-19: Before/After Slider (5 pts) ⏸️
**Features**:
- Draggable slider handle
- Before/after labels
- Touch-friendly
- Keyboard accessible

---

### YUDE-20: 3D Configurator Research (21 pts) ⏸️
**Research Phase**:
- Evaluate WebGL libraries (Three.js, Babylon.js)
- Research existing solutions
- Create proof-of-concept
- Design user flow
- Estimate development

**This is a major feature** - research first

---

### YUDE-21: Live Chat (3 pts) ⏸️
**Options**:
- Intercom
- Drift
- Crisp Chat
- Tawk.to (free)

**Setup**: Account, widget, business hours, routing

---

### YUDE-22: Instagram Feed (5 pts) ⏸️
**Integration**: Instagram Basic Display API

**Display**: 6-12 recent posts, click to Instagram

**Update**: Auto-refresh every 6-12 hours

---

### YUDE-23: Blog with CMS (13 pts) ⏸️
**CMS Options**: Sanity, Contentful, Strapi

**Features**:
- Blog listing page
- Post template
- Search & filtering
- Category/tag system
- Pagination
- Social sharing
- SEO optimization
- RSS feed

---

### YUDE-24: Advanced Analytics (5 pts) ⏸️
**Tracking**:
- Conversion funnel
- Custom events
- Heat mapping (Hotjar/Clarity)
- Session recording
- A/B testing
- Custom dashboards

---

### YUDE-25: Newsletter Signup (3 pts) ⏸️
**Platform**: Mailchimp, ConvertKit, Klaviyo

**Placement**: Footer, exit-intent, after quote

---

### YUDE-26: Video Content (5 pts) ⏸️
**Videos**:
- Factory tour
- Installation process
- KD Lite demo
- Customer testimonials
- Project walkthroughs

**Hosting**: YouTube, Vimeo, or self-hosted

---

### YUDE-27: Customer Portal (21 pts) ⏸️
**Features**:
- Login/registration
- Quote tracking
- Design file access
- Project timeline
- Payment tracking
- Messaging

**Large feature** - consider breaking down

---

### YUDE-28: Multi-Language (13 pts) ⏸️
**Language**: Spanish for Houston market

**Implementation**: react-i18next

**Translation**: All content, forms, SEO

---

### YUDE-29: Consultation Booking (13 pts) ⏸️
**Platform**: Calendly, Acuity, or custom

**Features**:
- Calendar availability
- Time slot selection
- Email confirmations
- Reminders
- Rescheduling

---

### YUDE-30: Finish Selector (8 pts) ⏸️
**Features**:
- Filter by material/color/style
- Side-by-side comparison
- Room visualization
- Save favorites
- Export to quote

---

## Labels Guide

- `content` - Content updates, images, text
- `infrastructure` - Build, deployment, DevOps
- `feature` - New functionality
- `bug` - Issues/fixes
- `design` - UI/UX improvements
- `media-system` - Media management related
- `performance` - Optimization tasks
- `seo` - SEO improvements
- `accessibility` - A11y improvements
- `analytics` - Tracking and analytics
- `research` - Research and planning

---

## Update Instructions

**After Completing a Task**:
1. Change status emoji: ⏸️ → ⏳ → ✅
2. Update Linear issue status
3. Update LINEAR_SYNC.md
4. Commit with issue ID: `[YUDE-X] Description`

**Status Emoji Key**:
- ⏸️ Todo (not started)
- ⏳ In Progress (actively working)
- ✅ Done (completed and verified)
- 🚫 Blocked (cannot proceed)

---

**Last Sync with Linear**: 2025-01-02
**Next Review**: After Milestone 1 completion
