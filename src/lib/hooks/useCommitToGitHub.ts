import { useState } from 'react';
import type { GitHubCommitRequest, GitHubCommitResponse } from '../../types';

interface UseCommitToGitHubReturn {
  commitChanges: (filePath: string, content: string, commitMessage: string) => Promise<GitHubCommitResponse>;
  committing: boolean;
  error: string | null;
  success: boolean;
}

/**
 * useCommitToGitHub - Hook for committing changes to GitHub repository
 * Handles authentication and error states
 */
export function useCommitToGitHub(): UseCommitToGitHubReturn {
  const [committing, setCommitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const commitChanges = async (
    filePath: string,
    content: string,
    commitMessage: string
  ): Promise<GitHubCommitResponse> => {
    setCommitting(true);
    setError(null);
    setSuccess(false);

    try {
      const requestBody: GitHubCommitRequest = {
        filePath,
        content,
        commitMessage,
      };

      const response = await fetch('/api/admin/commit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify(requestBody),
      });

      const result: GitHubCommitResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to commit changes');
      }

      setSuccess(true);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to commit changes';
      setError(errorMessage);
      throw err;
    } finally {
      setCommitting(false);
    }
  };

  return {
    commitChanges,
    committing,
    error,
    success,
  };
}
