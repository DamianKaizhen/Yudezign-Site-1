import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Issues a short-lived permission for the browser to upload one contact-form
 * attachment straight to Vercel Blob. The file never passes through a function,
 * so the 4.5MB function request limit does not apply. The size and type rules
 * below are enforced by Blob itself from the token.
 */

const MAX_ATTACHMENT_BYTES = 25 * 1024 * 1024;
const ALLOWED_CONTENT_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
// <13-digit timestamp>-<clean name>.<allowed extension>, no folders
const PATHNAME_PATTERN = /^\d{13}-[\w.-]{1,150}\.(pdf|jpe?g|png)$/i;

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await handleUpload({
      request,
      body: request.body as HandleUploadBody,
      onBeforeGenerateToken: async (pathname) => {
        if (!PATHNAME_PATTERN.test(pathname)) {
          throw new Error('Invalid file name or type. Allowed types: PDF, JPG, PNG');
        }
        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_ATTACHMENT_BYTES,
          validUntil: Date.now() + 10 * 60 * 1000,
        };
      },
    });
    return response.status(200).json(result);
  } catch (error) {
    console.error('Upload token error:', error);
    return response.status(400).json({
      error: error instanceof Error ? error.message : 'Unable to authorise upload',
    });
  }
}
