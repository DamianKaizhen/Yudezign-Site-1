import type { VercelRequest, VercelResponse } from '@vercel/node';
import { jwtVerify } from 'jose';
import { Octokit } from '@octokit/rest';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'yudezign_admin_jwt_secret_2025_secure_random_key_8f4a3c2d1e9b7a6f'
);

interface SiteSettings {
  logo: string;
  favicon: string;
  companyName: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
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

async function getSettingsFromGitHub(): Promise<SiteSettings> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
  const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = 'src/data/siteSettings.ts';

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

  // Parse TypeScript file to extract siteSettings object
  const objectMatch = content.match(/export const siteSettings: SiteSettings = ({[\s\S]*?});/);

  if (!objectMatch) {
    throw new Error('Could not parse site settings object');
  }

  try {
    // eslint-disable-next-line no-eval
    const settings = eval(`(${objectMatch[1]})`) as SiteSettings;
    return settings;
  } catch (error) {
    console.error('Error parsing site settings:', error);
    throw new Error('Failed to parse site settings data');
  }
}

function formatSettingsForExport(settings: SiteSettings): string {
  const escapeString = (str: string) => str.replace(/'/g, "\\'").replace(/\n/g, '\\n');

  const socialLinks = Object.entries(settings.socialLinks)
    .filter(([, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `    ${key}: '${escapeString(value || '')}',`)
    .join('\n');

  return `export const siteSettings: SiteSettings = {
  logo: '${escapeString(settings.logo)}',
  favicon: '${escapeString(settings.favicon)}',
  companyName: '${escapeString(settings.companyName)}',
  socialLinks: {
${socialLinks}
  },
};`;
}

function reconstructSettingsFile(settings: SiteSettings): string {
  const settingsCode = formatSettingsForExport(settings);

  return `export interface SiteSettings {
  logo: string; // URL or image path for the company logo
  favicon: string; // URL or image path for the favicon
  companyName: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
}

${settingsCode}
`;
}

async function commitSettingsToGitHub(settings: SiteSettings, commitMessage: string): Promise<void> {
  const fileContent = reconstructSettingsFile(settings);

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
  const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = 'src/data/siteSettings.ts';

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
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
      // Get site settings
      const settings = await getSettingsFromGitHub();
      return res.status(200).json({
        success: true,
        data: settings,
      });
    }

    if (req.method === 'PUT') {
      // Update site settings
      const updatedSettings: SiteSettings = req.body;

      await commitSettingsToGitHub(updatedSettings, 'Update site settings');

      return res.status(200).json({
        success: true,
        data: updatedSettings,
        message: 'Site settings updated successfully',
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
