import type { VercelRequest, VercelResponse } from '@vercel/node';
import { jwtVerify } from 'jose';
import { Octokit } from '@octokit/rest';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'yudezign_admin_jwt_secret_2025_secure_random_key_8f4a3c2d1e9b7a6f'
);

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  email?: string;
  phone?: string;
  headshot?: string;
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

async function getTeamMembersFromGitHub(): Promise<TeamMember[]> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
  const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = 'src/data/team.ts';

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

  // Parse TypeScript file to extract teamMembers array
  const arrayMatch = content.match(/export const teamMembers: TeamMember\[\] = \[([\s\S]*?)\];/);

  if (!arrayMatch) {
    throw new Error('Could not parse teamMembers array');
  }

  try {
    const membersString = `[${arrayMatch[1]}]`;
    // eslint-disable-next-line no-eval
    const members = eval(membersString) as TeamMember[];
    return members;
  } catch (error) {
    console.error('Error parsing teamMembers:', error);
    throw new Error('Failed to parse teamMembers data');
  }
}

function formatTeamMemberForExport(member: TeamMember): string {
  const escapeString = (str: string) => str.replace(/'/g, "\\'").replace(/\n/g, '\\n');

  const emailStr = member.email ? `email: '${member.email}',` : '';
  const phoneStr = member.phone ? `phone: '${member.phone}',` : '';
  const headshotStr = member.headshot ? `headshot: '${member.headshot}',` : '';

  return `  {
    id: '${member.id}',
    name: '${escapeString(member.name)}',
    role: '${escapeString(member.role)}',
    bio: '${escapeString(member.bio)}',
    ${emailStr}
    ${phoneStr}
    ${headshotStr}
  }`;
}

function reconstructTeamMembersFile(members: TeamMember[]): string {
  const membersCode = members.map(formatTeamMemberForExport).join(',\n');

  return `import type { TeamMember } from '../types';

export const teamMembers: TeamMember[] = [
${membersCode}
];
`;
}

async function commitTeamMembersToGitHub(
  members: TeamMember[],
  commitMessage: string
): Promise<void> {
  const fileContent = reconstructTeamMembersFile(members);

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
  const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = 'src/data/team.ts';

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
      // Get all team members
      const members = await getTeamMembersFromGitHub();
      return res.status(200).json({
        success: true,
        data: members,
      });
    }

    if (req.method === 'POST') {
      // Create new team member
      const newMember: TeamMember = req.body;

      const members = await getTeamMembersFromGitHub();

      // Check if ID already exists
      if (members.some((m) => m.id === newMember.id)) {
        return res.status(400).json({
          success: false,
          error: 'A team member with this ID already exists',
        });
      }

      members.push(newMember);

      await commitTeamMembersToGitHub(members, `Add team member: ${newMember.name}`);

      return res.status(200).json({
        success: true,
        data: newMember,
        message: 'Team member created successfully',
      });
    }

    if (req.method === 'PUT') {
      // Update existing team member
      const updatedMember: TeamMember = req.body;

      const members = await getTeamMembersFromGitHub();
      const index = members.findIndex((m) => m.id === updatedMember.id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Team member not found',
        });
      }

      members[index] = updatedMember;

      await commitTeamMembersToGitHub(members, `Update team member: ${updatedMember.name}`);

      return res.status(200).json({
        success: true,
        data: updatedMember,
        message: 'Team member updated successfully',
      });
    }

    if (req.method === 'DELETE') {
      // Delete team member
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Team member ID is required',
        });
      }

      const members = await getTeamMembersFromGitHub();
      const index = members.findIndex((m) => m.id === id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Team member not found',
        });
      }

      const deletedMember = members[index];
      members.splice(index, 1);

      await commitTeamMembersToGitHub(members, `Delete team member: ${deletedMember.name}`);

      return res.status(200).json({
        success: true,
        message: 'Team member deleted successfully',
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
