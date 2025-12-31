import type { VercelRequest, VercelResponse } from '@vercel/node';
import { jwtVerify } from 'jose';
import { Octokit } from '@octokit/rest';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'yudezign_admin_jwt_secret_2025_secure_random_key_8f4a3c2d1e9b7a6f'
);

interface VisualizerSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  finishId: string;
  finishName: string;
  roomImage: string;
  submittedAt: string;
  status: 'new' | 'processing' | 'completed' | 'archived';
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

async function getVisualizerSubmissionsFromGitHub(): Promise<VisualizerSubmission[]> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
  const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = 'src/data/visualizerSubmissions.ts';

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

  // Parse TypeScript file to extract visualizerSubmissions array
  const arrayMatch = content.match(/export const visualizerSubmissions: VisualizerSubmission\[\] = \[([\s\S]*?)\];/);

  if (!arrayMatch) {
    throw new Error('Could not parse visualizerSubmissions array');
  }

  try {
    const submissionsString = `[${arrayMatch[1]}]`;
    if (submissionsString.trim() === '[]') {
      return [];
    }
    // eslint-disable-next-line no-eval
    const submissions = eval(submissionsString) as VisualizerSubmission[];
    return submissions;
  } catch (error) {
    console.error('Error parsing visualizerSubmissions:', error);
    throw new Error('Failed to parse visualizerSubmissions data');
  }
}

function formatVisualizerSubmissionForExport(submission: VisualizerSubmission): string {
  const escapeString = (str: string) => str.replace(/'/g, "\\'").replace(/\n/g, '\\n');

  const notesStr = submission.notes ? `notes: '${escapeString(submission.notes)}',` : '';

  return `  {
    id: '${submission.id}',
    name: '${escapeString(submission.name)}',
    email: '${submission.email}',
    phone: '${submission.phone}',
    finishId: '${submission.finishId}',
    finishName: '${escapeString(submission.finishName)}',
    roomImage: '${submission.roomImage}',
    submittedAt: '${submission.submittedAt}',
    status: '${submission.status}',
    ${notesStr}
  }`;
}

function reconstructVisualizerSubmissionsFile(submissions: VisualizerSubmission[]): string {
  const submissionsCode = submissions.map(formatVisualizerSubmissionForExport).join(',\n');

  return `import type { VisualizerSubmission } from '../types';

export const visualizerSubmissions: VisualizerSubmission[] = [
${submissionsCode}
];
`;
}

async function commitVisualizerSubmissionsToGitHub(
  submissions: VisualizerSubmission[],
  commitMessage: string
): Promise<void> {
  const fileContent = reconstructVisualizerSubmissionsFile(submissions);

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
  const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = 'src/data/visualizerSubmissions.ts';

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

async function sendToWebhookAndGetImage(submission: VisualizerSubmission): Promise<string | null> {
  const webhookUrl = process.env.VISUALIZER_WEBHOOK_URL;
  const webhookUser = process.env.VISUALIZER_WEBHOOK_USER;
  const webhookPassword = process.env.VISUALIZER_WEBHOOK_PASSWORD;

  if (!webhookUrl) {
    console.warn('VISUALIZER_WEBHOOK_URL not configured, skipping webhook');
    return null;
  }

  try {
    // Build headers with basic auth if credentials are provided
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (webhookUser && webhookPassword) {
      const credentials = Buffer.from(`${webhookUser}:${webhookPassword}`).toString('base64');
      headers['Authorization'] = `Basic ${credentials}`;
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...submission,
        source: 'YuDeZign Room Visualizer',
      }),
    });

    if (!response.ok) {
      console.error('Webhook request failed:', response.status, response.statusText);
      return null;
    }

    // The webhook returns binary image data
    const imageBuffer = await response.arrayBuffer();

    // Convert to base64 data URL
    const base64 = Buffer.from(imageBuffer).toString('base64');
    const contentType = response.headers.get('content-type') || 'image/png';
    const dataUrl = `data:${contentType};base64,${base64}`;

    return dataUrl;
  } catch (error) {
    console.error('Webhook error:', error);
    return null;
  }
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

  // POST doesn't require authentication (called by public visualizer form)
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
      // Get all visualizer submissions with optional filtering
      const submissions = await getVisualizerSubmissionsFromGitHub();

      // Optional filters from query params
      const { status } = req.query;

      let filteredSubmissions = submissions;

      if (status && typeof status === 'string') {
        filteredSubmissions = filteredSubmissions.filter((s) => s.status === status);
      }

      // Sort by most recent first
      filteredSubmissions.sort((a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );

      return res.status(200).json({
        success: true,
        data: filteredSubmissions,
      });
    }

    if (req.method === 'POST') {
      // Create new visualizer submission (called by visualizer form)
      const newSubmission: VisualizerSubmission = {
        ...req.body,
        id: `vis_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        submittedAt: new Date().toISOString(),
        status: 'new' as const,
      };

      const submissions = await getVisualizerSubmissionsFromGitHub();
      submissions.push(newSubmission);

      // Save to GitHub while waiting for webhook to generate image
      const [, generatedImage] = await Promise.all([
        commitVisualizerSubmissionsToGitHub(
          submissions,
          `New visualizer submission from ${newSubmission.name}`
        ),
        sendToWebhookAndGetImage(newSubmission),
      ]);

      return res.status(200).json({
        success: true,
        data: newSubmission,
        generatedImage, // Base64 data URL of the generated visualization
        message: 'Visualizer submission saved successfully',
      });
    }

    if (req.method === 'PUT') {
      // Update existing submission (status/notes)
      const updatedSubmission: Partial<VisualizerSubmission> & { id: string } = req.body;

      const submissions = await getVisualizerSubmissionsFromGitHub();
      const index = submissions.findIndex((s) => s.id === updatedSubmission.id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Visualizer submission not found',
        });
      }

      // Merge updates
      submissions[index] = { ...submissions[index], ...updatedSubmission };

      await commitVisualizerSubmissionsToGitHub(
        submissions,
        `Update visualizer submission: ${submissions[index].name}`
      );

      return res.status(200).json({
        success: true,
        data: submissions[index],
        message: 'Visualizer submission updated successfully',
      });
    }

    if (req.method === 'DELETE') {
      // Delete visualizer submission
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Submission ID is required',
        });
      }

      const submissions = await getVisualizerSubmissionsFromGitHub();
      const index = submissions.findIndex((s) => s.id === id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Visualizer submission not found',
        });
      }

      const deletedSubmission = submissions[index];
      submissions.splice(index, 1);

      await commitVisualizerSubmissionsToGitHub(
        submissions,
        `Delete visualizer submission from ${deletedSubmission.name}`
      );

      return res.status(200).json({
        success: true,
        message: 'Visualizer submission deleted successfully',
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