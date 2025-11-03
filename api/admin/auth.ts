import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'yudezign_admin_jwt_secret_2025_secure_random_key_8f4a3c2d1e9b7a6f'
);

interface AdminSession {
  authenticated: boolean;
  expiresAt: number;
}

async function verifyAdminPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD not configured');
    return false;
  }
  return password === adminPassword;
}

async function createAdminToken(): Promise<string> {
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
  return token;
}

async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      authenticated: payload.authenticated as boolean,
      expiresAt: (payload.exp || 0) * 1000,
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // CORS headers
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  try {
    // LOGIN - Verify password and create token
    if (request.method === 'POST') {
      const { password } = request.body;

      if (!password) {
        return response.status(400).json({ error: 'Password is required' });
      }

      const isValid = await verifyAdminPassword(password);

      if (!isValid) {
        return response.status(401).json({ error: 'Invalid password' });
      }

      // Create JWT token
      const token = await createAdminToken();

      // Set httpOnly cookie
      response.setHeader(
        'Set-Cookie',
        `admin_token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; ${
          process.env.NODE_ENV === 'production' ? 'Secure;' : ''
        }`
      );

      return response.status(200).json({
        success: true,
        message: 'Authentication successful',
        expiresIn: '24h',
      });
    }

    // VERIFY - Check if current token is valid
    if (request.method === 'GET') {
      const token = request.cookies.admin_token;

      if (!token) {
        return response.status(401).json({ authenticated: false });
      }

      const session = await verifyAdminToken(token);

      if (!session || !session.authenticated) {
        return response.status(401).json({ authenticated: false });
      }

      return response.status(200).json({
        authenticated: true,
        expiresAt: session.expiresAt,
      });
    }

    // Method not allowed
    return response.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Auth error:', error);
    return response.status(500).json({
      error: 'Authentication failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
