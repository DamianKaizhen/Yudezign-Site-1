import { Octokit } from '@octokit/rest';

/**
 * Server-side helper for committing files to the GitHub repository.
 *
 * Uses process.env (Vercel serverless) — do NOT confuse with src/lib/github.ts,
 * which is the client-oriented variant (import.meta.env + atob/btoa).
 *
 * Reuses the same GITHUB_* configuration already consumed by api/admin/*.
 */

interface RepoConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
}

function getRepoConfig(): RepoConfig {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GitHub token not configured');
  }
  return {
    token,
    owner: process.env.GITHUB_OWNER || 'DamianKaizhen',
    repo: process.env.GITHUB_REPO || 'Yudezign-Site-1',
    branch: process.env.GITHUB_BRANCH || 'main',
  };
}

/**
 * Commit a binary file (as a Buffer) to the repository at `filePath`.
 *
 * Creates a new file (no SHA). If the path already exists it fetches the current
 * SHA and updates it. Retries once on a 409 conflict (concurrent branch update).
 *
 * @returns the committed path (repo-relative)
 */
export async function commitBinaryFile(
  filePath: string,
  content: Buffer,
  commitMessage: string
): Promise<string> {
  const { token, owner, repo, branch } = getRepoConfig();
  const octokit = new Octokit({ auth: token });
  const base64 = content.toString('base64');

  const attempt = async (): Promise<void> => {
    // Look up an existing SHA (the file usually doesn't exist yet — unique names).
    let sha: string | undefined;
    try {
      const { data } = await octokit.repos.getContent({ owner, repo, path: filePath, ref: branch });
      if (!Array.isArray(data) && 'sha' in data) {
        sha = data.sha;
      }
    } catch {
      sha = undefined; // not found -> create
    }

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: commitMessage,
      content: base64,
      branch,
      ...(sha && { sha }),
    });
  };

  try {
    await attempt();
  } catch (error) {
    // A concurrent commit advanced the branch head — retry once with a fresh SHA.
    const status = (error as { status?: number })?.status;
    if (status === 409) {
      await attempt();
    } else {
      throw error;
    }
  }

  return filePath;
}
