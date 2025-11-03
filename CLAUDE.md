# Claude AI Development Assistant - YuDeZign Website

## 🎯 Primary Workflow Rule

**ALWAYS check Linear before starting any work!**
- Update Linear when making changes, fixes, or adding comments
- Use KAI-XX issue prefix (NOT YUDE-XX)
- Link commits to Linear issues: `[KAI-XX] Commit message`

---

## 📚 Project Context

### What is YuDeZign?
Houston-based custom cabinet manufacturer specializing in European-style frameless cabinetry. This website serves as a digital showroom and lead generation platform.

### Current Status
- **Version**: 3.0 (Minimal Luxury Design Phase)
- **Status**: 🟡 In Active Development
- **Last Major Update**: November 2025
- **Recent Work**: Admin panel (Phases 5-8), SEO optimization, contact forms, site settings

---

## 🛠 Technology Stack Quick Reference

### Core Technologies
```
Framework:     React 19.1.1
Build Tool:    Vite 7.1.7
Language:      TypeScript 5.6.2 (strict mode, 100% coverage)
Routing:       React Router DOM 7.9.5
Styling:       Tailwind CSS 3.4.18
Animations:    Framer Motion 12.23.24
Icons:         Lucide React 0.552.0
Package Mgr:   npm
Deployment:    Vercel
```

### Development Server
```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # TypeScript compile + Vite build
npm run preview      # Preview production build
npm run type-check   # TypeScript error checking
npm run lint         # ESLint code quality check
```

---

## 🎨 Design System

### Brand Colors
```css
Primary (Forest Green):  #0f4c3a
Accent (Gold):          #d4a574
Background (Cream):     #f8f6f3
Text (Dark):           #1a1a1a
```

### Design Philosophy
- **Minimal Luxury**: Clean, elegant, sophisticated
- **Mobile-first**: Responsive design for all devices
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Lighthouse 90+ target
- **Typography**: Clear hierarchy, readable spacing

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Navigation.tsx, Footer.tsx
│   └── ui/              # Reusable components
│       ├── MinimalCard.tsx
│       ├── InViewAnimations.tsx
│       ├── ProjectCard.tsx
│       ├── ValueCard.tsx
│       └── FinishSwatch.tsx
├── pages/               # Route components (11 pages)
│   ├── Home.tsx
│   ├── Portfolio.tsx
│   ├── [Category].tsx   # Kitchens, Closets, Vanities, Custom, Commercial
│   ├── Finishes.tsx
│   ├── KDLite.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── data/                # Static data
│   ├── projects.ts      # 10 project definitions
│   └── finishes.ts      # 26 finish materials
├── types/               # TypeScript interfaces
│   ├── project.ts
│   └── finish.ts
├── App.tsx              # Router setup
├── main.tsx             # Entry point
└── index.css            # Global styles + Tailwind
```

---

## 💻 Development Guidelines

### TypeScript Best Practices
- ✅ Use strict mode (always enabled)
- ✅ Define interfaces for all data structures
- ✅ Avoid `any` type - use `unknown` with type guards if needed
- ✅ Use descriptive variable names
- ✅ Export types from `src/types/` directory

### React Patterns
- ✅ Functional components with hooks (no class components)
- ✅ Props interfaces defined for all components
- ✅ Use TypeScript for 100% type coverage
- ✅ Keep components focused and single-responsibility
- ✅ Use `memo()` for expensive render optimizations

### Component Creation
```typescript
// src/components/ui/ExampleComponent.tsx
import { motion } from 'framer-motion';

interface ExampleComponentProps {
  title: string;
  description?: string;
  onAction?: () => void;
}

export const ExampleComponent = ({
  title,
  description,
  onAction
}: ExampleComponentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg bg-white p-6 shadow-lg"
    >
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      {description && <p className="mt-2 text-gray-600">{description}</p>}
      {onAction && (
        <button
          onClick={onAction}
          className="mt-4 rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
        >
          Action
        </button>
      )}
    </motion.div>
  );
};
```

### Styling Guidelines
- ✅ Tailwind utility classes preferred (avoid custom CSS when possible)
- ✅ Use `className` prop for styling
- ✅ Follow minimal luxury design system
- ✅ Use consistent spacing scale: `p-4`, `gap-6`, `mb-8`, etc.
- ✅ Responsive design with Tailwind breakpoints: `md:`, `lg:`, `xl:`
- ✅ Hover states for interactive elements

### Animation Guidelines
- ✅ Use Framer Motion for scroll-triggered animations
- ✅ Keep animations subtle and purposeful
- ✅ Use `InViewAnimations` component for scroll reveals
- ✅ Respect user motion preferences: `prefers-reduced-motion`

---

## 📋 Naming Conventions

```
Components:     PascalCase     ProjectCard.tsx, Navigation.tsx
Files:          PascalCase     Home.tsx, Portfolio.tsx
Utilities:      camelCase      formatDate.ts, validateEmail.ts
Variables:      camelCase      projectData, isVisible
Constants:      UPPER_SNAKE    MAX_PROJECTS, API_ENDPOINT
CSS Classes:    kebab-case     bg-primary, text-gold (Tailwind)
Interfaces:     PascalCase     ProjectData, FinishOption
Types:          PascalCase     CategoryType, ProjectStatus
```

---

## 🔧 Common Tasks

### Adding a New Page
1. Create component in `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/layout/Navigation.tsx`
4. Update TypeScript types if needed
5. Test responsiveness on mobile/tablet/desktop

### Adding a New Component
1. Create in `src/components/ui/ComponentName.tsx`
2. Define props interface
3. Add TypeScript types
4. Include accessibility attributes
5. Test with different content lengths

### Updating Data
1. Edit `src/data/projects.ts` or `src/data/finishes.ts`
2. Ensure TypeScript interfaces match
3. Run `npm run type-check` to verify
4. Test UI with new data

### Before Committing
```bash
npm run type-check  # Must show 0 errors
npm run lint        # Must pass all checks
npm run build       # Must build successfully
```

---

## 🚀 Linear Integration

### Issue References
- Always use **KAI-XX** prefix (e.g., KAI-25, KAI-66)
- Check Linear before starting work: [YuDeZign Website Project](https://linear.app/kaizhen/project/yudezign-website-339122c1f8a5)

### Commit Message Format
```bash
[KAI-XX] Brief description of changes

Detailed explanation:
- What was changed
- Why it was changed
- Any related impacts

Closes KAI-XX
```

### Workflow
1. Check Linear for assigned issues
2. Create branch: `feature/KAI-XX-brief-description`
3. Make changes following guidelines above
4. Test thoroughly
5. Commit with Linear reference
6. Update Linear issue status
7. Create PR referencing KAI-XX

---

## 📊 Current Features & Status

### ✅ Completed
- 7 main pages (Home, Portfolio, 5 Categories, Finishes, KDLite, About, Contact)
- 10 project showcases (6 residential + 4 commercial)
- 26 finish material options with swatches
- Responsive design (mobile/tablet/desktop)
- Scroll-triggered animations
- Minimal luxury aesthetic
- Contact forms (frontend)
- Admin panel (Phases 1-8 complete)
- SEO optimization
- Site settings management

### 🚧 In Progress
- Real product photography (replacing Unsplash placeholders)
- Contact form email backend integration
- Google Analytics 4 implementation

### 📋 Planned
- Before/after project galleries
- Customer testimonials section
- Image lightbox viewer
- Blog/content marketing
- Live chat support
- 3D cabinet configurator

---

## 🐛 Common Issues & Solutions

### TypeScript Errors After Pull
```bash
rm -rf node_modules package-lock.json
npm install
# Restart IDE/editor
```

### Hot Reload Not Working
```bash
# Restart dev server
npm run dev
```

### Build Fails But Dev Works
```bash
npm run type-check  # Find type errors
# Fix all errors before committing
```

### Dependency Issues
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📖 Documentation References

### Internal Docs
- **README.md** - Main project documentation
- **DESIGN_DOCUMENTATION.md** - Design system guide
- **MEDIA_SYSTEM_SPEC.md** - Admin panel technical spec
- **PROJECT_STATUS.md** - Current state and progress

### External Resources
- [React 19 Docs](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Lucide Icons](https://lucide.dev)

---

## 🎯 Key Reminders

1. **Always check Linear first** - Avoid duplicate work
2. **Use KAI-XX prefix** - NOT YUDE-XX
3. **TypeScript strict mode** - 0 errors required
4. **Mobile-first design** - Test responsiveness
5. **Accessibility matters** - ARIA labels, semantic HTML
6. **Keep it minimal** - Align with luxury aesthetic
7. **Comment Linear** - Update status regularly
8. **Test before commit** - type-check + lint + build

---

**Last Updated**: November 3, 2025
**Version**: 1.0
**For**: Claude AI Development Assistant
