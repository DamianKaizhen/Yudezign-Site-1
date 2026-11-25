import { upload } from '@vercel/blob/client';

/** Contact-form attachment rules. Enforced again server-side in /api/upload-token. */
export const MAX_ATTACHMENT_MB = 25;
export const MAX_ATTACHMENT_BYTES = MAX_ATTACHMENT_MB * 1024 * 1024;
export const ALLOWED_ATTACHMENT_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

/** Strip spaces and unsafe characters so the stored name stays clean. */
function sanitizeFilename(name: string): string {
  const lastDot = name.lastIndexOf('.');
  const ext = lastDot > -1 ? name.slice(lastDot).toLowerCase() : '';
  const base = lastDot > -1 ? name.slice(0, lastDot) : name;
  const cleanBase = base
    .replace(/[^\w.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 120);
  return `${cleanBase || 'file'}${ext}`;
}

/**
 * Upload one attachment straight from the browser to Vercel Blob and return its
 * public URL. Going direct (not through a function) is what allows files over
 * the 4.5MB function request limit.
 */
export async function uploadAttachment(
  file: File,
  onProgress?: (percentage: number) => void
): Promise<string> {
  const blob = await upload(`${Date.now()}-${sanitizeFilename(file.name)}`, file, {
    access: 'public',
    handleUploadUrl: '/api/upload-token',
    contentType: file.type === 'image/jpg' ? 'image/jpeg' : file.type,
    onUploadProgress: onProgress ? ({ percentage }) => onProgress(percentage) : undefined,
  });
  return blob.url;
}
