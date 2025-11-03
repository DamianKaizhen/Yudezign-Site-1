import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // CORS headers
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Clear the admin token cookie
    response.setHeader(
      'Set-Cookie',
      `admin_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; ${
        process.env.NODE_ENV === 'production' ? 'Secure;' : ''
      }`
    );

    return response.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return response.status(500).json({
      error: 'Logout failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
