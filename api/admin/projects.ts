import type { VercelRequest, VercelResponse } from '@vercel/node';
import { jwtVerify } from 'jose';
import { Octokit } from '@octokit/rest';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'yudezign_admin_jwt_secret_2025_secure_random_key_8f4a3c2d1e9b7a6f'
);

interface Project {
  id: string;
  title: string;
  category: 'kitchens' | 'closets' | 'vanities' | 'custom' | 'commercial';
  images: string[];
  videos?: string[];
  thumbnail: string;
  location?: string;
  finish: string;
  cabinetStyle: string;
  features: string[];
  turnaroundTime: string;
  description: string;
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

async function getProjectsFromGitHub(): Promise<Project[]> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
  const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = 'src/data/projects.ts';

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

  // Parse TypeScript file to extract projects array
  // Simple regex approach - extract array between [ and ];
  const arrayMatch = content.match(/export const projects: Project\[\] = \[([\s\S]*?)\];/);

  if (!arrayMatch) {
    throw new Error('Could not parse projects array');
  }

  // Use eval to parse the array (safe in server context with trusted data)
  try {
    const projectsString = `[${arrayMatch[1]}]`;
    // eslint-disable-next-line no-eval
    const projects = eval(projectsString) as Project[];
    return projects;
  } catch (error) {
    console.error('Error parsing projects:', error);
    throw new Error('Failed to parse projects data');
  }
}

function formatProjectForExport(project: Project): string {
  const escapeString = (str: string) => str.replace(/'/g, "\\'").replace(/\n/g, '\\n');

  return `  {
    id: '${project.id}',
    title: '${escapeString(project.title)}',
    category: '${project.category}',
    images: [
      ${project.images.map((img) => `'${img}'`).join(',\n      ')}
    ],${
      project.videos && project.videos.length
        ? `\n    videos: [${project.videos.map((v) => `'${v}'`).join(', ')}],`
        : ''
    }
    thumbnail: '${project.thumbnail}',
    ${project.location ? `location: '${escapeString(project.location)}',` : ''}
    finish: '${escapeString(project.finish)}',
    cabinetStyle: '${escapeString(project.cabinetStyle)}',
    features: [${project.features.map((f) => `'${escapeString(f)}'`).join(', ')}],
    turnaroundTime: '${escapeString(project.turnaroundTime)}',
    description: '${escapeString(project.description)}',
  }`;
}

function reconstructProjectsFile(projects: Project[]): string {
  const projectsCode = projects.map(formatProjectForExport).join(',\n');

  return `import type { Project } from '../types';

export const projects: Project[] = [
${projectsCode}
];
`;
}

async function commitProjectsToGitHub(projects: Project[], commitMessage: string): Promise<void> {
  const fileContent = reconstructProjectsFile(projects);

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
  const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = 'src/data/projects.ts';

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

function generateProjectId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `proj_${timestamp}_${random}`;
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  // CORS headers
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Verify authentication for all methods
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

  try {
    // GET - List all projects
    if (request.method === 'GET') {
      const projects = await getProjectsFromGitHub();
      return response.status(200).json({
        success: true,
        data: projects,
        count: projects.length,
      });
    }

    // POST - Create new project
    if (request.method === 'POST') {
      const newProject = request.body as Omit<Project, 'id'>;

      // Validate required fields
      if (
        !newProject.title ||
        !newProject.category ||
        !newProject.images ||
        !newProject.thumbnail ||
        !newProject.finish ||
        !newProject.cabinetStyle ||
        !newProject.features ||
        !newProject.turnaroundTime ||
        !newProject.description
      ) {
        return response.status(400).json({
          success: false,
          error: 'Missing required fields',
        });
      }

      const projects = await getProjectsFromGitHub();

      const projectWithId: Project = {
        ...newProject,
        id: generateProjectId(),
      };

      projects.push(projectWithId);

      await commitProjectsToGitHub(projects, `Add project: ${newProject.title}`);

      return response.status(201).json({
        success: true,
        data: projectWithId,
        message: 'Project created successfully',
      });
    }

    // PUT - Update existing project
    if (request.method === 'PUT') {
      const updatedProject = request.body as Project;

      if (!updatedProject.id) {
        return response.status(400).json({
          success: false,
          error: 'Project ID is required',
        });
      }

      const projects = await getProjectsFromGitHub();
      const projectIndex = projects.findIndex((p) => p.id === updatedProject.id);

      if (projectIndex === -1) {
        return response.status(404).json({
          success: false,
          error: 'Project not found',
        });
      }

      // Preserve videos if the incoming update doesn't manage them (the current
      // admin form only handles images), so editing a project won't drop its video.
      projects[projectIndex] = {
        ...updatedProject,
        videos: updatedProject.videos ?? projects[projectIndex].videos,
      };

      await commitProjectsToGitHub(projects, `Update project: ${updatedProject.title}`);

      return response.status(200).json({
        success: true,
        data: updatedProject,
        message: 'Project updated successfully',
      });
    }

    // DELETE - Delete project
    if (request.method === 'DELETE') {
      const { id } = request.query;

      if (!id || typeof id !== 'string') {
        return response.status(400).json({
          success: false,
          error: 'Project ID is required',
        });
      }

      const projects = await getProjectsFromGitHub();
      const projectIndex = projects.findIndex((p) => p.id === id);

      if (projectIndex === -1) {
        return response.status(404).json({
          success: false,
          error: 'Project not found',
        });
      }

      const deletedProject = projects[projectIndex];
      projects.splice(projectIndex, 1);

      await commitProjectsToGitHub(projects, `Delete project: ${deletedProject.title}`);

      return response.status(200).json({
        success: true,
        message: 'Project deleted successfully',
      });
    }

    // Method not allowed
    return response.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  } catch (error) {
    console.error('API error:', error);
    return response.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
