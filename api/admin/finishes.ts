import type { VercelRequest, VercelResponse } from '@vercel/node';
import { jwtVerify } from 'jose';
import { Octokit } from '@octokit/rest';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'yudezign_admin_jwt_secret_2025_secure_random_key_8f4a3c2d1e9b7a6f'
);

interface Finish {
  id: string;
  name: string;
  styleId: string;
  color: string;
  images: string[];
  inStock: boolean;
  description?: string;
  order: number;
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

async function getFinishesFromGitHub(): Promise<Finish[]> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
  const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = 'src/data/finishes.ts';

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

  // Parse TypeScript file to extract finishes array
  const arrayMatch = content.match(/export const finishes: Finish\[\] = \[([\s\S]*?)\];/);

  if (!arrayMatch) {
    throw new Error('Could not parse finishes array');
  }

  try {
    const finishesString = `[${arrayMatch[1]}]`;
    // eslint-disable-next-line no-eval
    const finishes = eval(finishesString) as Finish[];
    return finishes;
  } catch (error) {
    console.error('Error parsing finishes:', error);
    throw new Error('Failed to parse finishes data');
  }
}

function formatFinishForExport(finish: Finish): string {
  const escapeString = (str: string) => str.replace(/'/g, "\\'").replace(/\n/g, '\\n');

  // Format images array
  const imagesArray = finish.images.map(img => `'${img}'`).join(', ');

  return `  {
    id: '${finish.id}',
    name: '${escapeString(finish.name)}',
    styleId: '${finish.styleId}',
    color: '${finish.color}',
    images: [${imagesArray}],
    inStock: ${finish.inStock},
    ${finish.description ? `description: '${escapeString(finish.description)}',` : ''}
    order: ${finish.order},
  }`;
}

function reconstructFinishesFile(finishes: Finish[]): string {
  const finishesCode = finishes.map(formatFinishForExport).join(',\n');

  return `import type { Finish } from '../types';

export const finishes: Finish[] = [
${finishesCode}
];
`;
}

async function commitFinishesToGitHub(finishes: Finish[], commitMessage: string): Promise<void> {
  const fileContent = reconstructFinishesFile(finishes);

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
  const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = 'src/data/finishes.ts';

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

  // Verify authentication
  const token = req.cookies.admin_token;
  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const isValid = await verifyAdminToken(token);
  if (!isValid) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }

  try {
    if (req.method === 'GET') {
      // Get all finishes
      const finishes = await getFinishesFromGitHub();
      return res.status(200).json({
        success: true,
        data: finishes,
      });
    }

    if (req.method === 'POST') {
      // Create new finish
      const newFinish: Finish = req.body;

      const finishes = await getFinishesFromGitHub();

      // Check if ID already exists
      if (finishes.some((f) => f.id === newFinish.id)) {
        return res.status(400).json({
          success: false,
          error: 'A finish with this ID already exists',
        });
      }

      finishes.push(newFinish);

      await commitFinishesToGitHub(finishes, `Add finish: ${newFinish.name}`);

      return res.status(200).json({
        success: true,
        data: newFinish,
        message: 'Finish created successfully',
      });
    }

    if (req.method === 'PUT') {
      // Update existing finish
      const updatedFinish: Finish = req.body;

      const finishes = await getFinishesFromGitHub();
      const index = finishes.findIndex((f) => f.id === updatedFinish.id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Finish not found',
        });
      }

      finishes[index] = updatedFinish;

      await commitFinishesToGitHub(finishes, `Update finish: ${updatedFinish.name}`);

      return res.status(200).json({
        success: true,
        data: updatedFinish,
        message: 'Finish updated successfully',
      });
    }

    if (req.method === 'DELETE') {
      // Delete finish
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Finish ID is required',
        });
      }

      const finishes = await getFinishesFromGitHub();
      const index = finishes.findIndex((f) => f.id === id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Finish not found',
        });
      }

      const deletedFinish = finishes[index];
      finishes.splice(index, 1);

      await commitFinishesToGitHub(finishes, `Delete finish: ${deletedFinish.name}`);

      return res.status(200).json({
        success: true,
        message: 'Finish deleted successfully',
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
