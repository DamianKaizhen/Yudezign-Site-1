import { put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { commitBinaryFile } from './_lib/githubCommit';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Folders that admin uploads may be mirrored into (served from public/<folder>/).
const ALLOWED_FOLDERS = ['portfolio', 'team', 'finishes', 'testimonials'];

// Collect the raw request stream into a single Buffer.
async function readRequestBody(request: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

// Strip spaces / unsafe characters so the repo path stays clean.
function sanitizeFilename(name: string): string {
  const lastDot = name.lastIndexOf('.');
  const ext = lastDot > -1 ? name.slice(lastDot).toLowerCase() : '';
  const base = lastDot > -1 ? name.slice(0, lastDot) : name;
  const cleanBase = base
    .replace(/[^\w.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `${cleanBase}${ext}`;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get filename from query params
    const { filename, folder } = request.query;

    if (!filename || typeof filename !== 'string') {
      return response.status(400).json({ error: 'Filename is required' });
    }

    // Validate file extension
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
    const fileExtension = filename.toLowerCase().substring(filename.lastIndexOf('.'));

    if (!allowedExtensions.includes(fileExtension)) {
      return response.status(400).json({
        error: `Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`
      });
    }

    // Buffer the body once so we can both upload to Blob and (optionally) commit to the repo.
    const body = await readRequestBody(request);

    // Add timestamp to filename to avoid collisions
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}-${sanitizeFilename(filename)}`;

    // Always upload to Vercel Blob (durable storage / backup).
    const blob = await put(uniqueFilename, body, {
      access: 'public',
    });

    // If an admin folder is specified, also mirror the file into the repo so it's
    // version-controlled and served from public/<folder>/. The repo path becomes
    // the canonical image src; the Blob copy is a backup.
    const folderName = typeof folder === 'string' ? folder : undefined;
    if (folderName && ALLOWED_FOLDERS.includes(folderName)) {
      try {
        const repoPath = `public/${folderName}/${uniqueFilename}`;
        await commitBinaryFile(repoPath, body, `Add ${folderName} image: ${uniqueFilename}`);

        return response.status(200).json({
          url: `/${folderName}/${uniqueFilename}`,
          blobUrl: blob.url,
          filename: uniqueFilename,
        });
      } catch (commitError) {
        // Repo mirror failed — fall back to the Blob URL so the upload still succeeds.
        console.error('Repo mirror failed, falling back to Blob URL:', commitError);
        return response.status(200).json({
          url: blob.url,
          blobUrl: blob.url,
          filename: uniqueFilename,
          warning: 'Image stored on Blob only; repo mirror failed.',
        });
      }
    }

    // No folder (public contact / visualizer uploads): Blob-only, unchanged behavior.
    return response.status(200).json({
      url: blob.url,
      filename: uniqueFilename,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return response.status(500).json({
      error: 'Failed to upload file',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
