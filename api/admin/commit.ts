import type { VercelRequest, VercelResponse } from '@vercel/node';
import { jwtVerify } from 'jose';
import { Octokit } from '@octokit/rest';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'yudezign_admin_jwt_secret_2025_secure_random_key_8f4a3c2d1e9b7a6f'
);

interface GitHubCommitRequest {
  filePath: string;
  content: string;
  commitMessage: string;
}

interface GitHubCommitResponse {
  success: boolean;
  sha?: string;
  message: string;
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

async function commitToGitHub(
  filePath: string,
  content: string,
  commitMessage: string
): Promise<GitHubCommitResponse> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
    const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
    const branch = process.env.GITHUB_BRANCH || 'main';

    if (!token) {
      return {
        success: false,
        message: 'GitHub token not configured',
      };
    }

    const octokit = new Octokit({ auth: token });

    // Get current file SHA
    let fileSha: string | undefined;
    try {
      const { data: fileData } = await octokit.repos.getContent({
        owner,
        repo,
        path: filePath,
        ref: branch,
      });

      if ('sha' in fileData) {
        fileSha = fileData.sha;
      }
    } catch (error) {
      // File doesn't exist yet, will create new file
      fileSha = undefined;
    }

    // Create or update file
    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: commitMessage,
      content: Buffer.from(content).toString('base64'),
      branch,
      ...(fileSha && { sha: fileSha }),
    });

    return {
      success: true,
      sha: data.commit.sha || '',
      message: `Successfully committed to ${filePath}`,
    };
  } catch (error) {
    console.error('GitHub commit error:', error);
    if (error instanceof Error) {
      return {
        success: false,
        message: `Failed to commit: ${error.message}`,
      };
    }
    return {
      success: false,
      message: 'Failed to commit changes',
    };
  }
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // CORS headers
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return response.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  // Verify authentication
  const token = request.cookies.admin_token;
  if (!token) {
    return response.status(401).json({
      success: false,
      error: 'Not authenticated',
    });
  }

  const isValid = await verifyAdminToken(token);
  if (!isValid) {
    return response.status(401).json({
      success: false,
      error: 'Invalid or expired token',
    });
  }

  // Parse request body
  const body = request.body as GitHubCommitRequest;
  const { filePath, content, commitMessage } = body;

  if (!filePath || !content || !commitMessage) {
    return response.status(400).json({
      success: false,
      error: 'Missing required fields: filePath, content, commitMessage',
    });
  }

  // Commit to GitHub
  const result = await commitToGitHub(filePath, content, commitMessage);

  if (result.success) {
    return response.status(200).json(result);
  } else {
    return response.status(500).json(result);
  }
}
