import { Octokit } from '@octokit/rest';

/**
 * GitHub utility for managing data file commits
 * Uses Octokit to read and write files to the repository
 *
 * NOTE: This module is intended for server-side use only (API routes)
 * For client-side operations, use the /api/admin/commit endpoint
 */

// Initialize Octokit client with GitHub token
const getOctokit = () => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  if (!token) {
    throw new Error('GitHub token not configured');
  }

  return new Octokit({
    auth: token,
  });
};

// Repository configuration
const getRepoConfig = () => {
  const owner = import.meta.env.VITE_GITHUB_OWNER || 'DamianKaizhen';
  const repo = import.meta.env.VITE_GITHUB_REPO || 'Yudezign-Site-1';
  const branch = import.meta.env.VITE_GITHUB_BRANCH || 'main';

  return { owner, repo, branch };
};

export interface GitHubFileContent {
  content: string;
  sha: string;
  path: string;
}

export interface CommitResult {
  success: boolean;
  sha?: string;
  message: string;
}

/**
 * Read a file from the GitHub repository
 * @param filePath - Path to file relative to repository root (e.g., 'src/data/projects.ts')
 * @returns File content and SHA hash
 */
export async function readDataFile(filePath: string): Promise<GitHubFileContent> {
  try {
    const octokit = getOctokit();
    const { owner, repo, branch } = getRepoConfig();

    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath,
      ref: branch,
    });

    // Type guard to ensure we have file data
    if (!('content' in data)) {
      throw new Error(`Path ${filePath} is not a file`);
    }

    // Decode base64 content
    const content = atob(data.content);

    return {
      content,
      sha: data.sha,
      path: filePath,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to read file ${filePath}: ${error.message}`);
    }
    throw new Error(`Failed to read file ${filePath}`);
  }
}

/**
 * Update a file in the GitHub repository
 * @param filePath - Path to file relative to repository root
 * @param content - New file content
 * @param commitMessage - Git commit message
 * @param sha - Current SHA of the file (required for updates)
 * @returns Commit result with SHA
 */
export async function updateDataFile(
  filePath: string,
  content: string,
  commitMessage: string,
  sha?: string
): Promise<CommitResult> {
  try {
    const octokit = getOctokit();
    const { owner, repo, branch } = getRepoConfig();

    // If SHA not provided, fetch it first
    let fileSha = sha;
    if (!fileSha) {
      try {
        const fileData = await readDataFile(filePath);
        fileSha = fileData.sha;
      } catch (error) {
        // File doesn't exist, create new file (no SHA needed)
        fileSha = undefined;
      }
    }

    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: commitMessage,
      content: btoa(content),
      branch,
      ...(fileSha && { sha: fileSha }),
    });

    return {
      success: true,
      sha: data.commit.sha || '',
      message: `Successfully committed to ${filePath}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: `Failed to commit ${filePath}: ${error.message}`,
      };
    }
    return {
      success: false,
      message: `Failed to commit ${filePath}`,
    };
  }
}

/**
 * Commit changes to a data file with automatic SHA fetching
 * @param filePath - Path to file relative to repository root
 * @param content - New file content
 * @param commitMessage - Git commit message
 * @returns Commit result
 */
export async function commitDataFile(
  filePath: string,
  content: string,
  commitMessage: string
): Promise<CommitResult> {
  try {
    // Read current file to get SHA
    const fileData = await readDataFile(filePath);

    // Update file with SHA
    return await updateDataFile(filePath, content, commitMessage, fileData.sha);
  } catch (error) {
    // If file doesn't exist, create it without SHA
    return await updateDataFile(filePath, content, commitMessage);
  }
}
