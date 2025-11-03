import type { VercelRequest, VercelResponse } from '@vercel/node';
import { jwtVerify } from 'jose';
import { Octokit } from '@octokit/rest';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'yudezign_admin_jwt_secret_2025_secure_random_key_8f4a3c2d1e9b7a6f'
);

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image?: string;
  projectImage?: string;
  rating: number;
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

async function getTestimonialsFromGitHub(): Promise<Testimonial[]> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
  const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = 'src/data/testimonials.ts';

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

  // Parse TypeScript file to extract testimonials array
  const arrayMatch = content.match(/export const testimonials: Testimonial\[\] = \[([\s\S]*?)\];/);

  if (!arrayMatch) {
    throw new Error('Could not parse testimonials array');
  }

  try {
    const testimonialsString = `[${arrayMatch[1]}]`;
    // eslint-disable-next-line no-eval
    const testimonials = eval(testimonialsString) as Testimonial[];
    return testimonials;
  } catch (error) {
    console.error('Error parsing testimonials:', error);
    throw new Error('Failed to parse testimonials data');
  }
}

function formatTestimonialForExport(testimonial: Testimonial): string {
  const escapeString = (str: string) => str.replace(/'/g, "\\'").replace(/\n/g, '\\n');

  const imageStr = testimonial.image ? `image: '${testimonial.image}',` : '';
  const projectImageStr = testimonial.projectImage
    ? `projectImage: '${testimonial.projectImage}',`
    : '';

  return `  {
    id: '${testimonial.id}',
    name: '${escapeString(testimonial.name)}',
    role: '${escapeString(testimonial.role)}',
    content: '${escapeString(testimonial.content)}',
    ${imageStr}
    ${projectImageStr}
    rating: ${testimonial.rating},
  }`;
}

function reconstructTestimonialsFile(testimonials: Testimonial[]): string {
  const testimonialsCode = testimonials.map(formatTestimonialForExport).join(',\n');

  return `import type { Testimonial } from '../types';

export const testimonials: Testimonial[] = [
${testimonialsCode}
];
`;
}

async function commitTestimonialsToGitHub(
  testimonials: Testimonial[],
  commitMessage: string
): Promise<void> {
  const fileContent = reconstructTestimonialsFile(testimonials);

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'DamianKaizhen';
  const repo = process.env.GITHUB_REPO || 'Yudezign-Site-1';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = 'src/data/testimonials.ts';

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
      // Get all testimonials
      const testimonials = await getTestimonialsFromGitHub();
      return res.status(200).json({
        success: true,
        data: testimonials,
      });
    }

    if (req.method === 'POST') {
      // Create new testimonial
      const newTestimonial: Testimonial = req.body;

      const testimonials = await getTestimonialsFromGitHub();

      // Check if ID already exists
      if (testimonials.some((t) => t.id === newTestimonial.id)) {
        return res.status(400).json({
          success: false,
          error: 'A testimonial with this ID already exists',
        });
      }

      testimonials.push(newTestimonial);

      await commitTestimonialsToGitHub(testimonials, `Add testimonial from ${newTestimonial.name}`);

      return res.status(200).json({
        success: true,
        data: newTestimonial,
        message: 'Testimonial created successfully',
      });
    }

    if (req.method === 'PUT') {
      // Update existing testimonial
      const updatedTestimonial: Testimonial = req.body;

      const testimonials = await getTestimonialsFromGitHub();
      const index = testimonials.findIndex((t) => t.id === updatedTestimonial.id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Testimonial not found',
        });
      }

      testimonials[index] = updatedTestimonial;

      await commitTestimonialsToGitHub(
        testimonials,
        `Update testimonial from ${updatedTestimonial.name}`
      );

      return res.status(200).json({
        success: true,
        data: updatedTestimonial,
        message: 'Testimonial updated successfully',
      });
    }

    if (req.method === 'DELETE') {
      // Delete testimonial
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Testimonial ID is required',
        });
      }

      const testimonials = await getTestimonialsFromGitHub();
      const index = testimonials.findIndex((t) => t.id === id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Testimonial not found',
        });
      }

      const deletedTestimonial = testimonials[index];
      testimonials.splice(index, 1);

      await commitTestimonialsToGitHub(
        testimonials,
        `Delete testimonial from ${deletedTestimonial.name}`
      );

      return res.status(200).json({
        success: true,
        message: 'Testimonial deleted successfully',
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
