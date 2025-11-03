import { useState, useCallback, useMemo } from 'react';
import { compressImage } from '../utils/imageCompression';

interface UploadOptions {
  /** Whether to compress images before upload */
  compress?: boolean;
  /** Image compression quality (0-1, default: 0.85) */
  quality?: number;
  /** Max width in pixels (default: 1920) */
  maxWidth?: number;
  /** Max height in pixels (default: 1920) */
  maxHeight?: number;
  /** Max file size in MB (default: 1) */
  maxSizeMB?: number;
  /** Upload endpoint (default: '/api/upload-attachment') */
  endpoint?: string;
}

interface UseFileUploadHandlerReturn {
  /** Upload a single file */
  uploadFile: (file: File) => Promise<string>;
  /** Upload multiple files */
  uploadFiles: (files: File[]) => Promise<string[]>;
  /** Upload state */
  uploading: boolean;
  /** Upload progress (0-100) */
  progress: number;
  /** Error message if upload fails */
  error: string | null;
  /** Reset upload state */
  reset: () => void;
}

const DEFAULT_OPTIONS: Required<UploadOptions> = {
  compress: true,
  quality: 0.85,
  maxWidth: 1920,
  maxHeight: 1920,
  maxSizeMB: 1,
  endpoint: '/api/upload-attachment',
};

/**
 * useFileUploadHandler - Unified hook for file uploads
 *
 * Consolidates all upload logic across the application:
 * - Supports single and multiple file uploads
 * - Optional image compression
 * - Configurable endpoints
 * - Progress tracking
 * - Comprehensive error handling
 *
 * @param options - Upload configuration options
 * @returns Upload functions and state
 *
 * @example
 * ```tsx
 * const { uploadFile, uploading, progress } = useFileUploadHandler({
 *   compress: true,
 *   endpoint: '/api/upload-attachment'
 * });
 *
 * const handleUpload = async (file: File) => {
 *   try {
 *     const url = await uploadFile(file);
 *     setValue('image', url);
 *   } catch (error) {
 *     console.error('Upload failed:', error);
 *   }
 * };
 * ```
 */
export function useFileUploadHandler(
  options: UploadOptions = {}
): UseFileUploadHandlerReturn {
  // Memoize options to prevent callbacks from being recreated on every render
  const opts = useMemo(
    () => ({ ...DEFAULT_OPTIONS, ...options }),
    [options]
  );

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  /**
   * Reset upload state
   */
  const reset = useCallback(() => {
    setUploading(false);
    setProgress(0);
    setError(null);
  }, []);

  /**
   * Upload a single file
   */
  const uploadFile = useCallback(
    async (file: File): Promise<string> => {
      setUploading(true);
      setProgress(0);
      setError(null);

      try {
        let fileToUpload = file;

        // Compress if enabled and file is an image
        if (opts.compress && file.type.startsWith('image/')) {
          console.log(
            `Original file size: ${(file.size / 1024 / 1024).toFixed(2)}MB`
          );
          setProgress(20);

          fileToUpload = await compressImage(file, {
            maxWidth: opts.maxWidth,
            maxHeight: opts.maxHeight,
            quality: opts.quality,
            maxSizeMB: opts.maxSizeMB,
          });

          console.log(
            `Compressed file size: ${(fileToUpload.size / 1024 / 1024).toFixed(2)}MB`
          );
          setProgress(40);
        } else {
          setProgress(20);
        }

        // Upload to endpoint
        const response = await fetch(
          `${opts.endpoint}?filename=${encodeURIComponent(file.name)}`,
          {
            method: 'POST',
            body: fileToUpload,
          }
        );

        setProgress(70);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Upload failed');
        }

        const data = await response.json();
        setProgress(100);

        // Reset progress after a short delay
        setTimeout(() => setProgress(0), 500);

        return data.url;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to upload file';
        setError(errorMessage);
        throw err;
      } finally {
        setUploading(false);
      }
    },
    [opts]
  );

  /**
   * Upload multiple files
   */
  const uploadFiles = useCallback(
    async (files: File[]): Promise<string[]> => {
      setUploading(true);
      setProgress(0);
      setError(null);

      try {
        const uploadedUrls: string[] = [];
        const totalFiles = files.length;

        for (let i = 0; i < totalFiles; i++) {
          const file = files[i];
          const baseProgress = (i / totalFiles) * 100;

          let fileToUpload = file;

          // Compress if enabled and file is an image
          if (opts.compress && file.type.startsWith('image/')) {
            console.log(
              `[${i + 1}/${totalFiles}] Original: ${(file.size / 1024 / 1024).toFixed(2)}MB`
            );

            fileToUpload = await compressImage(file, {
              maxWidth: opts.maxWidth,
              maxHeight: opts.maxHeight,
              quality: opts.quality,
              maxSizeMB: opts.maxSizeMB,
            });

            console.log(
              `[${i + 1}/${totalFiles}] Compressed: ${(fileToUpload.size / 1024 / 1024).toFixed(2)}MB`
            );
          }

          setProgress(baseProgress + 20 / totalFiles);

          // Upload file
          const response = await fetch(
            `${opts.endpoint}?filename=${encodeURIComponent(file.name)}`,
            {
              method: 'POST',
              body: fileToUpload,
            }
          );

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
              errorData.error || `Failed to upload file ${i + 1}`
            );
          }

          const data = await response.json();
          uploadedUrls.push(data.url);

          setProgress(((i + 1) / totalFiles) * 100);
        }

        // Reset progress after a short delay
        setTimeout(() => setProgress(0), 500);

        return uploadedUrls;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to upload files';
        setError(errorMessage);
        throw err;
      } finally {
        setUploading(false);
      }
    },
    [opts]
  );

  return {
    uploadFile,
    uploadFiles,
    uploading,
    progress,
    error,
    reset,
  };
}
