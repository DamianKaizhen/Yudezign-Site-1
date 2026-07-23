import type { VercelRequest, VercelResponse } from '@vercel/node';
import { jwtVerify } from 'jose';
import {
  getContactMessages,
  commitContactMessages,
  addContactMessage,
  type ContactMessage,
} from '../_lib/contactStore.js';

/**
 * Admin CRUD for contact messages. ALL methods require a valid admin token.
 *
 * Public form submissions no longer hit this endpoint — they go through the
 * gated /api/contact-submit. This endpoint is admin-only (list / update status
 * & notes / delete), so there is no unauthenticated write path here anymore.
 */

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'yudezign_admin_jwt_secret_2025_secure_random_key_8f4a3c2d1e9b7a6f'
);

async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Every method requires admin auth (no public write path here anymore).
  const token = req.cookies.admin_token;
  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  if (!(await verifyAdminToken(token))) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }

  try {
    if (req.method === 'GET') {
      const messages = await getContactMessages();
      const { status, projectType } = req.query;

      let filtered = messages;
      if (status && typeof status === 'string') {
        filtered = filtered.filter((m) => m.status === status);
      }
      if (projectType && typeof projectType === 'string') {
        filtered = filtered.filter((m) => m.projectType === projectType);
      }
      filtered.sort(
        (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );

      return res.status(200).json({ success: true, data: filtered });
    }

    if (req.method === 'POST') {
      // Admin-created message (rare). Public submissions use /api/contact-submit.
      const b = req.body || {};
      const newMessage = await addContactMessage({
        name: b.name || '',
        email: b.email || '',
        phone: b.phone || '',
        projectType: b.projectType || '',
        budget: b.budget,
        timeline: b.timeline || '',
        message: b.message || '',
        attachments: b.attachments,
        source: b.source,
        status: b.status,
      });
      return res.status(200).json({
        success: true,
        data: newMessage,
        message: 'Contact message saved successfully',
      });
    }

    if (req.method === 'PUT') {
      const updated: Partial<ContactMessage> & { id: string } = req.body;
      const messages = await getContactMessages();
      const index = messages.findIndex((m) => m.id === updated.id);
      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Contact message not found' });
      }
      messages[index] = { ...messages[index], ...updated };
      await commitContactMessages(messages, `Update contact message: ${messages[index].name}`);
      return res.status(200).json({
        success: true,
        data: messages[index],
        message: 'Contact message updated successfully',
      });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ success: false, error: 'Message ID is required' });
      }
      const messages = await getContactMessages();
      const index = messages.findIndex((m) => m.id === id);
      if (index === -1) {
        return res.status(404).json({ success: false, error: 'Contact message not found' });
      }
      const [deleted] = messages.splice(index, 1);
      await commitContactMessages(messages, `Delete contact message from ${deleted.name}`);
      return res.status(200).json({ success: true, message: 'Contact message deleted successfully' });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      success: false,
      error: (error as Error).message || 'Internal server error',
    });
  }
}
