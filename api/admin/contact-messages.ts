import type { VercelRequest, VercelResponse } from '@vercel/node';
import { jwtVerify } from 'jose';
import { Octokit } from '@octokit/rest';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'yudezign_admin_jwt_secret_2025_secure_random_key_8f4a3c2d1e9b7a6f'
);

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  timeline: string;
  message: string;
  attachments?: string[];
  submittedAt: string;
  status: 'new' | 'read' | 'responded' | 'archived';
  notes?: string;
}

async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
}

async function getContactMessagesFromGitHub(): Promise<ContactMessage[]> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
  const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = 'src/data/contactMessages.ts';

  if (!token) {
    throw new Error('GitHub token not configured');
  }

  const octokit = new Octokit({ auth: token });

  const { data } = await octokit.repos.getContent({
    owner,
    repo,
    path: filePath,
    ref: branch,
  });

  if (!('content' in data)) {
    throw new Error('File not found');
  }

  const content = Buffer.from(data.content, 'base64').toString('utf-8');

  // Parse TypeScript file to extract contactMessages array
  const arrayMatch = content.match(/export const contactMessages: ContactMessage\[\] = \[([\s\S]*?)\];/);

  if (!arrayMatch) {
    throw new Error('Could not parse contactMessages array');
  }

  try {
    const messagesString = `[${arrayMatch[1]}]`;
    // eslint-disable-next-line no-eval
    const messages = eval(messagesString) as ContactMessage[];
    return messages;
  } catch (error) {
    console.error('Error parsing contactMessages:', error);
    throw new Error('Failed to parse contactMessages data');
  }
}

function formatContactMessageForExport(message: ContactMessage): string {
  const escapeString = (str: string) => str.replace(/'/g, "\\'").replace(/\n/g, '\\n');

  const attachmentsStr = message.attachments && message.attachments.length > 0
    ? `attachments: [${message.attachments.map((url) => `'${url}'`).join(', ')}],`
    : '';

  const notesStr = message.notes ? `notes: '${escapeString(message.notes)}',` : '';

  return `  {
    id: '${message.id}',
    name: '${escapeString(message.name)}',
    email: '${message.email}',
    phone: '${message.phone}',
    projectType: '${message.projectType}',
    timeline: '${message.timeline}',
    message: '${escapeString(message.message)}',
    ${attachmentsStr}
    submittedAt: '${message.submittedAt}',
    status: '${message.status}',
    ${notesStr}
  }`;
}

function reconstructContactMessagesFile(messages: ContactMessage[]): string {
  const messagesCode = messages.map(formatContactMessageForExport).join(',\n');

  return `import type { ContactMessage } from '../types';

export const contactMessages: ContactMessage[] = [
${messagesCode}
];
`;
}

async function commitContactMessagesToGitHub(
  messages: ContactMessage[],
  commitMessage: string
): Promise<void> {
  const fileContent = reconstructContactMessagesFile(messages);

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
  const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = 'src/data/contactMessages.ts';

  if (!token) {
    throw new Error('GitHub token not configured');
  }

  const octokit = new Octokit({ auth: token });

  // Get current file SHA
  const { data: fileData } = await octokit.repos.getContent({
    owner,
    repo,
    path: filePath,
    ref: branch,
  });

  if (!('sha' in fileData)) {
    throw new Error('Could not get file SHA');
  }

  // Update file
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    message: commitMessage,
    content: Buffer.from(fileContent).toString('base64'),
    branch,
    sha: fileData.sha,
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST doesn't require authentication (called by public contact form)
  // All other methods require authentication
  if (req.method !== 'POST') {
    const token = req.cookies.admin_token;
    if (!token) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    const isValid = await verifyAdminToken(token);
    if (!isValid) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }
  }

  try {
    if (req.method === 'GET') {
      // Get all contact messages with optional filtering
      const messages = await getContactMessagesFromGitHub();

      // Optional filters from query params
      const { status, projectType } = req.query;

      let filteredMessages = messages;

      if (status && typeof status === 'string') {
        filteredMessages = filteredMessages.filter((m) => m.status === status);
      }

      if (projectType && typeof projectType === 'string') {
        filteredMessages = filteredMessages.filter((m) => m.projectType === projectType);
      }

      // Sort by most recent first
      filteredMessages.sort((a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );

      return res.status(200).json({
        success: true,
        data: filteredMessages,
      });
    }

    if (req.method === 'POST') {
      // Create new contact message (called by contact form)
      const newMessage: ContactMessage = {
        ...req.body,
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        submittedAt: new Date().toISOString(),
        status: 'new' as const,
      };

      const messages = await getContactMessagesFromGitHub();
      messages.push(newMessage);

      await commitContactMessagesToGitHub(
        messages,
        `New contact message from ${newMessage.name}`
      );

      return res.status(200).json({
        success: true,
        data: newMessage,
        message: 'Contact message saved successfully',
      });
    }

    if (req.method === 'PUT') {
      // Update existing message (status/notes)
      const updatedMessage: Partial<ContactMessage> & { id: string } = req.body;

      const messages = await getContactMessagesFromGitHub();
      const index = messages.findIndex((m) => m.id === updatedMessage.id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Contact message not found',
        });
      }

      // Merge updates
      messages[index] = { ...messages[index], ...updatedMessage };

      await commitContactMessagesToGitHub(
        messages,
        `Update contact message: ${messages[index].name}`
      );

      return res.status(200).json({
        success: true,
        data: messages[index],
        message: 'Contact message updated successfully',
      });
    }

    if (req.method === 'DELETE') {
      // Delete/archive contact message
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Message ID is required',
        });
      }

      const messages = await getContactMessagesFromGitHub();
      const index = messages.findIndex((m) => m.id === id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Contact message not found',
        });
      }

      const deletedMessage = messages[index];
      messages.splice(index, 1);

      await commitContactMessagesToGitHub(
        messages,
        `Delete contact message from ${deletedMessage.name}`
      );

      return res.status(200).json({
        success: true,
        message: 'Contact message deleted successfully',
      });
    }

    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      success: false,
      error: (error as Error).message || 'Internal server error',
    });
  }
}
