# Media Management System - Technical Specification

**Project**: Yudezign Website Admin Panel
**Related Issues**: KAI-65 (Phases 5-7 Complete), KAI-66 (Phase 8 Complete)
**Status**: ✅ Implemented (Phases 1-8)
**Last Updated**: 2025-11-03

> **Note**: This document serves as the original technical specification for the admin panel.
> The admin panel has been successfully implemented in phases during October-November 2025.
> See Linear project for implementation details and current status.

---

## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Architecture](#architecture)
- [Storage Solutions](#storage-solutions)
- [Admin Panel Features](#admin-panel-features)
- [Implementation Plan](#implementation-plan)
- [Security](#security)
- [Deployment Strategy](#deployment-strategy)
- [Code Structure](#code-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Testing Strategy](#testing-strategy)
- [Future Enhancements](#future-enhancements)

---

## Overview

The media management system allows non-technical users to upload and manage website images without editing code. The system must work with Vercel's deployment model where the site is built from GitHub on every commit.

### Problem Statement
Currently, updating images requires:
1. Editing TypeScript files (`src/data/projects.ts`, `src/data/finishes.ts`)
2. Committing changes to GitHub
3. Waiting for Vercel deployment

This is not sustainable for frequent content updates and requires technical knowledge.

### Solution
Build an admin panel that:
1. Allows image uploads via drag-and-drop interface
2. Stores images in cloud storage (Vercel Blob or Cloudinary)
3. Automatically updates data files in the repository
4. Commits changes to GitHub, triggering Vercel rebuild
5. Provides immediate visual feedback

---

## Requirements

### Functional Requirements

**Must Have (MVP)**:
- [ ] Secure admin route with password protection
- [ ] Image upload interface (drag-and-drop + file picker)
- [ ] Category organization (Projects, Finishes, Team, About, etc.)
- [ ] Image preview before and after upload
- [ ] Alt text editor for accessibility
- [ ] "Commit & Deploy" button to trigger GitHub commit
- [ ] Upload progress indicators
- [ ] Error handling and validation

**Should Have**:
- [ ] Image library browser (view all uploaded images)
- [ ] Image replacement (update existing images)
- [ ] Image deletion with confirmation
- [ ] Bulk upload support (multiple images at once)
- [ ] Image cropping/resizing tools
- [ ] Thumbnail generation

**Nice to Have**:
- [ ] GitHub OAuth for team access
- [ ] Role-based access control
- [ ] Upload history and versioning
- [ ] Image optimization on upload (WebP conversion)
- [ ] CDN cache purging
- [ ] Draft mode (preview before committing)

### Non-Functional Requirements

- **Performance**: Image upload < 5 seconds for 5MB file
- **Reliability**: 99.9% uptime for admin panel
- **Security**: Password-protected, rate-limited, validated uploads
- **Usability**: Mobile-responsive admin interface
- **Scalability**: Support 1000+ images in library
- **Maintainability**: Clear code structure, documented

---

## Architecture

### High-Level Architecture

```
┌─────────────────┐
│  Admin Panel    │  (React component at /admin route)
│  (Web Browser)  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Auth Check     │  (Simple password or GitHub OAuth)
│  (Middleware)   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  API Routes     │  (/api/upload, /api/commit, /api/images)
│  (Next.js API   │  (Future: Convert to API routes if migrating to Next.js)
│   or Vercel     │  (Current: Client-side with direct API calls)
│   Functions)    │
└────────┬────────┘
         │
         ├─────────────────────┬─────────────────────┐
         ↓                     ↓                     ↓
┌─────────────────┐   ┌─────────────────┐   ┌──────────────────┐
│  Vercel Blob    │   │   GitHub API    │   │  Data File Gen   │
│   Storage       │   │   (Octokit)     │   │  (media.ts)      │
│  (Images)       │   │ (Commit files)  │   │  (Auto-update)   │
└─────────────────┘   └─────────────────┘   └──────────────────┘
         │                     │                      │
         ↓                     ↓                      ↓
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Deployment                         │
│              (Triggered by GitHub commit)                    │
│                 ~ 1-2 minute rebuild                         │
└─────────────────────────────────────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────────────────────────────┐
│              Updated Website with New Images                 │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

**Upload Flow**:
1. User logs into `/admin` with password
2. User drags/drops images or selects from file picker
3. Frontend validates file type and size
4. Image uploaded to Vercel Blob Storage (or Cloudinary)
5. Storage returns permanent URL
6. Frontend updates `media.ts` data structure with new URL
7. User reviews changes in preview
8. User clicks "Commit & Deploy"
9. API route commits updated `media.ts` to GitHub
10. GitHub webhook triggers Vercel rebuild
11. Site deploys with new images (~1-2 minutes)
12. Success notification shown to user

**Current Vite/React Approach** (No API Routes):
Since this is a Vite project (not Next.js), we'll use:
- **Vercel Serverless Functions** for API endpoints
- Client-side direct API calls to Vercel Blob and GitHub
- Environment variables for authentication

---

## Storage Solutions

### Option A: Vercel Blob Storage (Recommended) ⭐

**Pros**:
- Integrated with Vercel platform
- Simple API, easy to use
- Automatic CDN distribution
- No third-party accounts needed
- Fast uploads (edge network)
- $0.15/GB storage, $0.20/GB egress
- Free tier: 100GB bandwidth/month

**Cons**:
- Vendor lock-in (Vercel-specific)
- No free tier for storage
- Limited transformation capabilities

**Cost Estimate**:
- 500 images × 500KB average = 250MB storage = **$0.04/month**
- 10,000 page views × 5 images × 500KB = 25GB egress = **$5/month**
- **Total: ~$5-10/month**

**Implementation**:
```typescript
import { put } from '@vercel/blob';

const blob = await put('projects/kitchen-1.jpg', file, {
  access: 'public',
  token: process.env.BLOB_READ_WRITE_TOKEN,
});

// Returns: { url: 'https://xxxxx.public.blob.vercel-storage.com/...' }
```

---

### Option B: Cloudinary

**Pros**:
- Generous free tier (25 credits/month = 25GB bandwidth)
- Advanced image transformations (resize, crop, filters)
- Automatic format optimization (WebP, AVIF)
- Responsive image URLs
- Image upload widget available
- Independent of hosting platform

**Cons**:
- Third-party account required
- More complex setup
- Additional API to learn

**Cost Estimate**:
- Free tier covers most small-medium sites
- Paid plans start at $99/month (rarely needed for small sites)
- **Estimated: $0/month** (within free tier)

**Implementation**:
```typescript
import cloudinary from 'cloudinary';

const result = await cloudinary.v2.uploader.upload(file, {
  folder: 'yudezign/projects',
  public_id: 'kitchen-1',
  resource_type: 'image',
});

// Returns: { secure_url: 'https://res.cloudinary.com/...' }
```

---

### Option C: AWS S3 + CloudFront

**Pros**:
- Industry standard, highly reliable
- Very low cost at scale
- Full control over configuration
- Integrates with other AWS services

**Cons**:
- Most complex setup
- Requires AWS account and IAM configuration
- More maintenance overhead
- Learning curve for AWS services

**Not recommended** for this project size.

---

### Recommendation: Vercel Blob Storage

**Why**:
- Simplest integration with existing Vercel deployment
- Fast setup and development time
- Adequate features for use case
- Cost is reasonable ($5-10/month)
- No third-party account management

**Migration Path**:
If costs become prohibitive, migrating to Cloudinary is straightforward (just URL changes).

---

## Admin Panel Features

### 1. Authentication

**MVP Approach**: Simple password authentication
```typescript
// src/admin/auth.ts
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export function authenticate(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

// Store auth token in sessionStorage (browser session only)
```

**Future Enhancement**: GitHub OAuth
- More secure
- Supports multiple team members
- Audit trail (who uploaded what)

---

### 2. Upload Interface

**Features**:
- Drag-and-drop zone (react-dropzone)
- File picker fallback
- Multiple file selection
- Image preview before upload
- Progress bar during upload
- Success/error notifications

**UI Design** (Minimal Luxury Aesthetic):
```tsx
<div className="min-h-screen bg-cream-50">
  <AdminHeader />

  <div className="max-w-7xl mx-auto p-8">
    <UploadZone
      onDrop={handleImageUpload}
      accept="image/*"
      maxSize={10 * 1024 * 1024} // 10MB
    />

    <ImageLibrary
      images={uploadedImages}
      onSelect={handleImageSelect}
      onDelete={handleImageDelete}
    />

    <CommitPanel
      changes={pendingChanges}
      onCommit={handleCommitToGitHub}
    />
  </div>
</div>
```

---

### 3. Category Organization

**Categories**:
- **Projects** (Kitchen, Closet, Vanity, Custom, Commercial)
- **Finishes** (25 material samples)
- **Team** (Staff photos)
- **About** (Factory, workshop, company photos)
- **Hero** (Background images)
- **Testimonials** (Customer photos)

**Data Structure**:
```typescript
// src/data/media.ts (auto-generated)
export const media = {
  projects: {
    kitchens: [
      {
        id: 'kitchen-1',
        url: 'https://xxxxx.blob.vercel-storage.com/kitchen-1.jpg',
        alt: 'Modern white kitchen with forest green island',
        category: 'kitchens',
        uploadedAt: '2025-01-15T10:30:00Z',
        uploadedBy: 'admin',
      },
      // ... more images
    ],
    closets: [ /* ... */ ],
    // ... other categories
  },
  finishes: [ /* ... */ ],
  team: [ /* ... */ ],
  about: [ /* ... */ ],
  hero: [ /* ... */ ],
};
```

---

### 4. Image Management

**Actions**:
- **Upload**: Add new image to category
- **Replace**: Update existing image (keeps same ID)
- **Delete**: Remove image (with confirmation)
- **Edit Alt Text**: Update accessibility description
- **Reorder**: Drag-and-drop to change display order

**Image Metadata**:
- Original filename
- Upload date/time
- Uploaded by (user)
- File size
- Dimensions
- Alt text
- Category
- Tags (future)

---

### 5. Preview & Commit

**Preview Mode**:
- View changes before committing
- Side-by-side comparison (old vs new)
- Test on actual site pages
- Draft mode (changes not live yet)

**Commit Process**:
1. User reviews all pending changes
2. Enters commit message (optional, auto-generated by default)
3. Clicks "Commit & Deploy"
4. Loading indicator while committing
5. Success message: "Changes committed! Site will update in 1-2 minutes"
6. Link to Vercel deployment status

**Commit Message Format**:
```
[Media Update] Update kitchen project images

- Added: 3 new kitchen project images
- Replaced: 1 finish material photo
- Updated alt text: 5 images

Auto-committed via Admin Panel at 2025-01-15 10:30 AM
```

---

## Implementation Plan

### Phase 1: Foundation (Week 1)

**Tasks**:
- [ ] Set up Vercel Blob Storage account
- [ ] Create environment variables
- [ ] Build authentication system
- [ ] Create `/admin` protected route
- [ ] Design admin panel UI (minimal luxury style)

**Deliverables**:
- Working login page
- Protected admin route
- Basic UI shell

---

### Phase 2: Image Upload (Week 2)

**Tasks**:
- [ ] Integrate react-dropzone for drag-and-drop
- [ ] Implement file validation (type, size)
- [ ] Build upload to Vercel Blob function
- [ ] Add progress indicators
- [ ] Handle errors gracefully
- [ ] Display uploaded images

**Deliverables**:
- Functional image upload
- Image library view
- Error handling

---

### Phase 3: GitHub Integration (Week 3)

**Tasks**:
- [ ] Set up GitHub API (Octokit)
- [ ] Create auto-generation script for `media.ts`
- [ ] Build commit function
- [ ] Test GitHub commit flow
- [ ] Add commit confirmation UI
- [ ] Link to Vercel deployment status

**Deliverables**:
- Working commit to GitHub
- Auto-deploy trigger
- Deployment status tracking

---

### Phase 4: Polish & Testing (Week 4)

**Tasks**:
- [ ] Add bulk upload
- [ ] Implement image replacement
- [ ] Add image deletion with confirmation
- [ ] Alt text editor
- [ ] Mobile-responsive design
- [ ] Comprehensive testing
- [ ] Documentation for users

**Deliverables**:
- Production-ready admin panel
- User documentation
- Testing completed

---

## Security

### Authentication

**Current Approach**: Simple password
```typescript
// Stored in Vercel environment variable
VITE_ADMIN_PASSWORD=secure-random-password-here
```

**Security Measures**:
- Password stored in environment variables only
- Session-based authentication (sessionStorage)
- Auto-logout after 1 hour of inactivity
- HTTPS only (enforced by Vercel)

**Future**: GitHub OAuth
- More secure than password
- Supports team access
- Audit trail built-in

---

### Upload Validation

**Client-Side**:
```typescript
const validateImage = (file: File): boolean => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  // Check file size (10MB max)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File size must be under 10MB');
  }

  // Check dimensions (optional)
  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    if (img.width < 800 || img.height < 600) {
      throw new Error('Image must be at least 800x600px');
    }
  };

  return true;
};
```

**Server-Side** (Vercel Function):
- Re-validate file type (magic number check)
- Scan for malware (ClamAV or VirusTotal API)
- Check file size again
- Rate limiting (max 10 uploads per minute)

---

### Rate Limiting

**Upload Limits**:
- 10 images per minute
- 100 images per hour
- 1000 images per day

**Commit Limits**:
- 1 commit per minute
- 20 commits per hour

**Implementation**:
```typescript
// Simple in-memory rate limiter
const uploadCounts = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const counts = uploadCounts.get(ip) || [];

  // Remove timestamps older than 1 minute
  const recentCounts = counts.filter(t => now - t < 60000);

  if (recentCounts.length >= 10) {
    return false; // Rate limit exceeded
  }

  recentCounts.push(now);
  uploadCounts.set(ip, recentCounts);
  return true;
}
```

---

### Content Security

**Allowed File Types**:
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif - with review)

**Blocked**:
- Executable files
- Scripts
- SVG (can contain XSS) - unless sanitized
- Videos (separate feature)

---

## Deployment Strategy

### Vercel Function Setup

Since this is a Vite app (not Next.js), use Vercel Serverless Functions:

**Project Structure**:
```
Yudezign-Site-1/
├── api/                        # Vercel Serverless Functions
│   ├── upload.ts               # Handle image uploads
│   ├── commit.ts               # Commit to GitHub
│   └── images.ts               # List/manage images
├── src/
│   ├── admin/                  # Admin panel components
│   │   ├── AdminPanel.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── MediaLibrary.tsx
│   │   └── auth.ts
│   └── ...
└── vercel.json                 # Vercel configuration
```

**vercel.json**:
```json
{
  "functions": {
    "api/**/*.ts": {
      "runtime": "nodejs20.x",
      "memory": 1024
    }
  },
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1" },
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

---

### Environment Variables (Vercel)

**Production Variables**:
```env
# Admin Authentication
VITE_ADMIN_PASSWORD=secure-password-here

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxxxxxxxx

# GitHub API
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
GITHUB_REPO=your-username/Yudezign-Site-1
GITHUB_BRANCH=main

# Optional: Rate Limiting
RATE_LIMIT_ENABLED=true
MAX_UPLOADS_PER_MINUTE=10
```

**Setting in Vercel**:
1. Go to Vercel Dashboard → Project Settings
2. Navigate to Environment Variables
3. Add each variable
4. Select environment (Production, Preview, Development)
5. Save changes

---

### GitHub API Setup

**Create GitHub Personal Access Token**:
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Name: "Yudezign Admin Panel"
4. Scopes: `repo` (full control of private repositories)
5. Generate token
6. Copy token (save immediately, won't be shown again)
7. Add to Vercel environment variables as `GITHUB_TOKEN`

**Permissions Required**:
- `repo:status` - Access commit status
- `repo_deployment` - Access deployment status
- `public_repo` - Access public repositories
- `repo:invite` - Access repository invitations

---

## Code Structure

### Admin Panel Components

```typescript
// src/admin/AdminPanel.tsx
export default function AdminPanel() {
  return (
    <div className="admin-container">
      <AdminHeader />
      <AuthGuard>
        <AdminContent />
      </AuthGuard>
    </div>
  );
}

// src/admin/ImageUploader.tsx
export function ImageUploader({ category }: { category: string }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (files: File[]) => {
    setUploading(true);

    for (const file of files) {
      // Validate
      validateImage(file);

      // Upload to Vercel Blob
      const blob = await uploadToBlob(file, category);

      // Update media data
      addToMediaLibrary(blob.url, file.name, category);

      setProgress(prev => prev + 100 / files.length);
    }

    setUploading(false);
  };

  return (
    <Dropzone onDrop={handleUpload}>
      {/* UI */}
    </Dropzone>
  );
}

// src/admin/MediaLibrary.tsx
export function MediaLibrary({ category }: { category: string }) {
  const images = useMediaStore(state => state.images[category]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {images.map(img => (
        <ImageCard
          key={img.id}
          image={img}
          onReplace={handleReplace}
          onDelete={handleDelete}
          onEditAlt={handleEditAlt}
        />
      ))}
    </div>
  );
}

// src/admin/CommitPanel.tsx
export function CommitPanel() {
  const changes = useMediaStore(state => state.pendingChanges);
  const [committing, setCommitting] = useState(false);

  const handleCommit = async () => {
    setCommitting(true);

    // Generate updated media.ts file
    const mediaFileContent = generateMediaFile();

    // Commit to GitHub
    await commitToGitHub({
      path: 'src/data/media.ts',
      content: mediaFileContent,
      message: generateCommitMessage(changes),
    });

    setCommitting(false);
    showSuccessNotification();
  };

  return (
    <div className="commit-panel">
      <h3>Pending Changes ({changes.length})</h3>
      <ChangesList changes={changes} />
      <button onClick={handleCommit} disabled={committing}>
        {committing ? 'Committing...' : 'Commit & Deploy'}
      </button>
    </div>
  );
}
```

---

## API Endpoints

### POST /api/upload

**Purpose**: Upload image to Vercel Blob Storage

**Request**:
```typescript
{
  file: File,
  category: 'projects' | 'finishes' | 'team' | 'about' | 'hero',
  subcategory?: 'kitchens' | 'closets' | 'vanities' | 'custom' | 'commercial',
  alt: string,
}
```

**Response**:
```typescript
{
  success: true,
  url: 'https://xxxxx.public.blob.vercel-storage.com/image.jpg',
  id: 'unique-image-id',
  uploadedAt: '2025-01-15T10:30:00Z',
}
```

---

### POST /api/commit

**Purpose**: Commit updated media.ts to GitHub

**Request**:
```typescript
{
  content: string, // Full media.ts file content
  message: string, // Commit message
}
```

**Response**:
```typescript
{
  success: true,
  commitSha: 'abc123...',
  deploymentUrl: 'https://vercel.com/deployments/...',
}
```

---

### GET /api/images

**Purpose**: List all uploaded images

**Query Parameters**:
- `category`: Filter by category
- `limit`: Number of results (default: 50)
- `offset`: Pagination offset

**Response**:
```typescript
{
  images: [
    {
      id: 'unique-id',
      url: 'https://...',
      alt: 'Description',
      category: 'projects',
      subcategory: 'kitchens',
      uploadedAt: '2025-01-15T10:30:00Z',
      uploadedBy: 'admin',
      size: 1234567, // bytes
      dimensions: { width: 1920, height: 1080 },
    },
    // ...
  ],
  total: 150,
  hasMore: true,
}
```

---

### DELETE /api/images/:id

**Purpose**: Delete image from Vercel Blob and media library

**Response**:
```typescript
{
  success: true,
  message: 'Image deleted successfully',
}
```

---

## Environment Variables

```env
# ============================================
# Admin Panel Configuration
# ============================================

# Admin password (simple auth)
VITE_ADMIN_PASSWORD=your-secure-password-here

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxx

# GitHub API
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_REPO=your-username/Yudezign-Site-1
GITHUB_BRANCH=main
GITHUB_AUTHOR_NAME=Admin Panel
GITHUB_AUTHOR_EMAIL=admin@yudezign.com

# Rate Limiting
RATE_LIMIT_ENABLED=true
MAX_UPLOADS_PER_MINUTE=10
MAX_COMMITS_PER_HOUR=20

# Optional: Malware Scanning
VIRUSTOTAL_API_KEY=your-virustotal-api-key

# Optional: Image Optimization
ENABLE_AUTO_OPTIMIZATION=true
WEBP_QUALITY=80
JPEG_QUALITY=85

# Development
VITE_DEV_MODE=false
```

---

## Testing Strategy

### Unit Tests

**Test Coverage**:
- File validation logic
- Image upload utilities
- GitHub commit functions
- Media file generation
- Authentication logic

**Example Test**:
```typescript
// src/admin/__tests__/imageValidation.test.ts
import { validateImage } from '../utils/validateImage';

describe('Image Validation', () => {
  it('should accept valid JPEG images', () => {
    const file = new File([new Blob()], 'test.jpg', { type: 'image/jpeg' });
    expect(validateImage(file)).toBe(true);
  });

  it('should reject files over 10MB', () => {
    const largeFile = new File([new ArrayBuffer(11 * 1024 * 1024)], 'large.jpg');
    expect(() => validateImage(largeFile)).toThrow('File size must be under 10MB');
  });

  it('should reject non-image files', () => {
    const txtFile = new File([new Blob()], 'test.txt', { type: 'text/plain' });
    expect(() => validateImage(txtFile)).toThrow('File must be an image');
  });
});
```

---

### Integration Tests

**Test Scenarios**:
1. Upload image → Image appears in Vercel Blob
2. Commit changes → GitHub receives commit
3. GitHub commit → Vercel rebuild triggered
4. Delete image → Removed from Blob and media.ts

---

### E2E Tests (Playwright)

**Critical User Flows**:
1. Admin login flow
2. Upload single image
3. Upload multiple images (bulk)
4. Replace existing image
5. Delete image
6. Commit changes and deploy
7. View deployment status

---

### Manual Testing Checklist

- [ ] Login with correct password (should succeed)
- [ ] Login with incorrect password (should fail)
- [ ] Upload JPEG image (should work)
- [ ] Upload PNG image (should work)
- [ ] Upload 11MB image (should fail)
- [ ] Upload .txt file (should fail)
- [ ] Upload 5 images at once (should work)
- [ ] Replace existing image (should update)
- [ ] Delete image with confirmation (should remove)
- [ ] Edit alt text (should save)
- [ ] Commit changes (should commit to GitHub)
- [ ] Wait for deployment (should update site)
- [ ] Verify new images on live site (should display)
- [ ] Test on mobile device (should be responsive)

---

## Future Enhancements

### Phase 2 Features (After MVP)

1. **GitHub OAuth** - Multi-user support with proper authentication
2. **Image Optimization** - Automatic WebP conversion, responsive sizes
3. **CDN Cache Purging** - Instant updates without waiting for CDN refresh
4. **Draft Mode** - Preview changes before committing
5. **Version History** - View previous versions of images, rollback capability
6. **Bulk Operations** - Select multiple images for batch actions
7. **Image Cropping** - Built-in crop/resize tools
8. **Advanced Search** - Filter by date, size, category, tags
9. **Usage Analytics** - Track which images are viewed most
10. **Collaborative Editing** - Multiple admins can work simultaneously

### Phase 3 Features (Long-term)

11. **AI Alt Text Generation** - Automatic accessibility descriptions
12. **Duplicate Detection** - Prevent uploading same image twice
13. **Image Comparison** - Side-by-side before/after preview
14. **Scheduled Publishing** - Upload now, publish later
15. **Asset Library Integrations** - Import from Dropbox, Google Drive
16. **Advanced Permissions** - Role-based access control
17. **Audit Logs** - Complete history of who changed what and when
18. **Multi-language Alt Text** - Support for Spanish alt text
19. **Mobile App** - Native iOS/Android admin app
20. **Webhook Notifications** - Slack/email alerts for deployments

---

## Resources & Documentation

### Vercel Blob Storage
- [Vercel Blob Docs](https://vercel.com/docs/storage/vercel-blob)
- [@vercel/blob npm package](https://www.npmjs.com/package/@vercel/blob)

### GitHub API
- [GitHub REST API Docs](https://docs.github.com/en/rest)
- [Octokit.js (GitHub SDK)](https://github.com/octokit/octokit.js)

### React Libraries
- [react-dropzone](https://react-dropzone.js.org/)
- [react-image-crop](https://www.npmjs.com/package/react-image-crop)

### Security
- [OWASP File Upload Guide](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload)
- [VirusTotal API](https://developers.virustotal.com/)

---

## Success Metrics

**After Launch**:
- **Usage**: Admin panel used 2-3 times per week
- **Performance**: Average upload time < 5 seconds
- **Reliability**: 99% success rate for uploads
- **Efficiency**: Content updates take 5 minutes (vs 30 minutes previously)
- **Satisfaction**: Team reports admin panel is "easy to use"

**Tracking**:
- Number of uploads per week
- Number of commits per week
- Average time from upload to deployment
- Error rate
- User satisfaction surveys

---

**Last Updated**: 2025-01-02
**Status**: Planning/Design Complete - Ready for Implementation
**Estimated Development Time**: 4 weeks (13 story points)
**Dependencies**: Vercel Blob account, GitHub token, design approval
