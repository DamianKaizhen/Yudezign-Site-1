import type { Project } from '../../types';

/**
 * Generate a unique project ID
 * Format: proj_[timestamp]_[random]
 */
export function generateProjectId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `proj_${timestamp}_${random}`;
}

/**
 * Format features array for form display
 * Converts string[] to {value: string}[] for ArrayFieldInput
 */
export function formatFeaturesForForm(features: string[]): { value: string }[] {
  return features.map((f) => ({ value: f }));
}

/**
 * Format features array for API/storage
 * Converts {value: string}[] to string[]
 */
export function formatFeaturesForApi(features: { value: string }[]): string[] {
  return features.map((f) => f.value).filter((v) => v.trim().length > 0);
}

/**
 * Validate project data beyond Zod schema
 * Returns array of error messages
 */
export function validateProjectData(project: Partial<Project>): string[] {
  const errors: string[] = [];

  // Check if thumbnail is in images array
  if (project.thumbnail && project.images) {
    if (!project.images.includes(project.thumbnail)) {
      errors.push('Thumbnail must be one of the project images');
    }
  }

  // Check minimum number of features
  if (project.features && project.features.length === 0) {
    errors.push('At least one feature is required');
  }

  // Check minimum number of images
  if (project.images && project.images.length === 0) {
    errors.push('At least one image is required');
  }

  return errors;
}

/**
 * Generate commit message for project operations
 */
export function generateCommitMessage(
  operation: 'create' | 'update' | 'delete',
  projectTitle: string
): string {
  const operations = {
    create: 'Add',
    update: 'Update',
    delete: 'Delete',
  };

  return `${operations[operation]} project: ${projectTitle}`;
}

/**
 * Format project data for TypeScript file export
 * Converts project to properly formatted TypeScript code
 */
export function formatProjectForExport(project: Project): string {
  return `  {
    id: '${project.id}',
    title: '${project.title.replace(/'/g, "\\'")}',
    category: '${project.category}',
    images: [${project.images.map((img) => `'${img}'`).join(', ')}],${
      project.videos && project.videos.length
        ? `\n    videos: [${project.videos.map((v) => `'${v}'`).join(', ')}],`
        : ''
    }
    thumbnail: '${project.thumbnail}',
    ${project.location ? `location: '${project.location.replace(/'/g, "\\'")}',` : ''}
    finish: '${project.finish.replace(/'/g, "\\'")}',
    cabinetStyle: '${project.cabinetStyle.replace(/'/g, "\\'")}',
    features: [${project.features.map((f) => `'${f.replace(/'/g, "\\'")}'`).join(', ')}],
    turnaroundTime: '${project.turnaroundTime.replace(/'/g, "\\'")}',
    description: '${project.description.replace(/'/g, "\\'")}',
  }`;
}

/**
 * Reconstruct entire projects.ts file content
 */
export function reconstructProjectsFile(projects: Project[]): string {
  const projectsCode = projects.map(formatProjectForExport).join(',\n');

  return `import type { Project } from '../types';

export const projects: Project[] = [
${projectsCode}
];
`;
}
