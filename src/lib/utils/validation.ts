import { z } from 'zod';

/**
 * Zod validator for an image source that is EITHER a repo-relative path served
 * from public/ (e.g. "/portfolio/123-img.jpg") OR an absolute http(s) URL
 * (e.g. a legacy Vercel Blob URL). Admin uploads now return relative paths, so
 * plain z.string().url() is too strict and must not be used for image fields.
 */
export const imageSrcSchema = (message = 'A valid image is required') =>
  z.string().refine(
    (v) => v.startsWith('/') || /^https?:\/\//.test(v),
    { message }
  );
