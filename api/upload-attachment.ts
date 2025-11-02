import { put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: {
    bodyParser: false,
  },
};

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
    const { filename } = request.query;

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

    // Upload to Vercel Blob with public access
    // Add timestamp to filename to avoid collisions
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}-${filename}`;

    const blob = await put(uniqueFilename, request, {
      access: 'public',
    });

    // Return the blob URL
    return response.status(200).json({
      url: blob.url,
      filename: uniqueFilename,
      size: blob.size,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return response.status(500).json({
      error: 'Failed to upload file',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
