import type { VercelRequest, VercelResponse } from '@vercel/node';
import { jwtVerify } from 'jose';
import { Octokit } from '@octokit/rest';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'yudezign_admin_jwt_secret_2025_secure_random_key_8f4a3c2d1e9b7a6f'
);

interface FinishStyle {
  id: string;
  name: string;
  description?: string;
  visible: boolean;
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

async function getFinishStylesFromGitHub(): Promise<FinishStyle[]> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
  const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = 'src/data/finishStyles.ts';

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

  // Parse TypeScript file to extract finishStyles array
  const arrayMatch = content.match(/export const finishStyles: FinishStyle\[\] = \[([\s\S]*?)\];/);

  if (!arrayMatch) {
    throw new Error('Could not parse finishStyles array');
  }

  try {
    const stylesString = `[${arrayMatch[1]}]`;
    // eslint-disable-next-line no-eval
    const finishStyles = eval(stylesString) as FinishStyle[];
    return finishStyles;
  } catch (error) {
    console.error('Error parsing finishStyles:', error);
    throw new Error('Failed to parse finishStyles data');
  }
}

function formatFinishStyleForExport(style: FinishStyle): string {
  const escapeString = (str: string) => str.replace(/'/g, "\\'").replace(/\n/g, '\\n');

  return `  {
    id: '${style.id}',
    name: '${escapeString(style.name)}',
    ${style.description ? `description: '${escapeString(style.description)}',` : ''}
    visible: ${style.visible},
    order: ${style.order},
  }`;
}

function reconstructFinishStylesFile(finishStyles: FinishStyle[]): string {
  const stylesCode = finishStyles.map(formatFinishStyleForExport).join(',\n');

  return `import type { FinishStyle } from '../types';

export const finishStyles: FinishStyle[] = [
${stylesCode}
];
`;
}

async function commitFinishStylesToGitHub(
  finishStyles: FinishStyle[],
  commitMessage: string
): Promise<void> {
  const fileContent = reconstructFinishStylesFile(finishStyles);

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
  const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = 'src/data/finishStyles.ts';

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
  // Verify authentication
  const token = req.cookies['admin-token'];
  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const isValid = await verifyAdminToken(token);
  if (!isValid) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }

  try {
    if (req.method === 'GET') {
      // Get all finish styles
      const finishStyles = await getFinishStylesFromGitHub();
      return res.status(200).json({
        success: true,
        data: finishStyles,
      });
    }

    if (req.method === 'POST') {
      // Create new finish style
      const newStyle: FinishStyle = req.body;

      const finishStyles = await getFinishStylesFromGitHub();

      // Check if ID already exists
      if (finishStyles.some((s) => s.id === newStyle.id)) {
        return res.status(400).json({
          success: false,
          error: 'A style with this ID already exists',
        });
      }

      finishStyles.push(newStyle);

      await commitFinishStylesToGitHub(finishStyles, `Add finish style: ${newStyle.name}`);

      return res.status(200).json({
        success: true,
        data: newStyle,
        message: 'Finish style created successfully',
      });
    }

    if (req.method === 'PUT') {
      // Update existing finish style
      const updatedStyle: FinishStyle = req.body;

      const finishStyles = await getFinishStylesFromGitHub();
      const index = finishStyles.findIndex((s) => s.id === updatedStyle.id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Finish style not found',
        });
      }

      finishStyles[index] = updatedStyle;

      await commitFinishStylesToGitHub(finishStyles, `Update finish style: ${updatedStyle.name}`);

      return res.status(200).json({
        success: true,
        data: updatedStyle,
        message: 'Finish style updated successfully',
      });
    }

    if (req.method === 'DELETE') {
      // Delete finish style
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Style ID is required',
        });
      }

      // Check if any finishes use this style
      const token = process.env.GITHUB_TOKEN;
      const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
      const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
      const branch = process.env.GITHUB_BRANCH || 'main';

      if (!token) {
        throw new Error('GitHub token not configured');
      }

      const octokit = new Octokit({ auth: token });

      const { data: finishesFileData } = await octokit.repos.getContent({
        owner,
        repo,
        path: 'src/data/finishes.ts',
        ref: branch,
      });

      if ('content' in finishesFileData) {
        const finishesContent = Buffer.from(finishesFileData.content, 'base64').toString('utf-8');
        // Quick check if styleId is referenced in finishes
        const regex = new RegExp(`styleId:\\s*['"]${id}['"]`, 'g');
        if (regex.test(finishesContent)) {
          return res.status(400).json({
            success: false,
            error: 'Cannot delete style. Finishes are still using this style. Please reassign or delete those finishes first.',
          });
        }
      }

      const finishStyles = await getFinishStylesFromGitHub();
      const index = finishStyles.findIndex((s) => s.id === id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Finish style not found',
        });
      }

      const deletedStyle = finishStyles[index];
      finishStyles.splice(index, 1);

      await commitFinishStylesToGitHub(finishStyles, `Delete finish style: ${deletedStyle.name}`);

      return res.status(200).json({
        success: true,
        message: 'Finish style deleted successfully',
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
