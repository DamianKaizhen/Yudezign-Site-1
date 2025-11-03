import { useState } from 'react';

interface UseImageUploadReturn {
  uploadImage: (file: File) => Promise<string>;
  uploading: boolean;
  progress: number;
  error: string | null;
}

/**
 * useImageUpload - Hook for uploading images to Vercel Blob Storage
 * Handles upload state, progress tracking, and error management
 */
export function useImageUpload(): UseImageUploadReturn {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulate progress (since fetch doesn't support upload progress natively)
      setProgress(30);

      const response = await fetch('/api/upload-attachment', {
        method: 'POST',
        body: formData,
      });

      setProgress(70);

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setProgress(100);

      return data.url;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      setError(errorMessage);
      throw err;
    } finally {
      setUploading(false);
      // Reset progress after a short delay
      setTimeout(() => setProgress(0), 500);
    }
  };

  return {
    uploadImage,
    uploading,
    progress,
    error,
  };
}
