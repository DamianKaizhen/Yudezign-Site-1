import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { FormField } from './FormField';
import { compressImage } from '../../../lib/utils/imageCompression';

interface ImageUploadProps {
  label: string;
  required?: boolean;
  error?: string;
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  /**
   * Repo folder (under public/) to mirror uploads into, e.g. "portfolio".
   * When set, the API commits the image to the repo and returns a /<folder>/<file>
   * path. When omitted, the image is stored on Vercel Blob only.
   */
  folder?: string;
  onUpload: (urls: string[]) => void;
  currentImages?: string[];
  onRemove?: (url: string) => void;
}

/**
 * ImageUpload - Advanced image upload component with drag & drop
 * Supports single/multiple uploads, preview, and delete functionality
 */
export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  required = false,
  error,
  multiple = false,
  maxFiles = 10,
  accept = 'image/jpeg,image/png,image/webp',
  folder,
  onUpload,
  currentImages = [],
  onRemove,
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const uploadToVercelBlob = async (files: File[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        // Compress image before upload (max 1MB)
        console.log(`Original file size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
        const compressedFile = await compressImage(file, {
          maxWidth: 1920,
          maxHeight: 1920,
          quality: 0.85,
          maxSizeMB: 1,
        });
        console.log(`Compressed file size: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);

        // Upload to Vercel Blob (send file as raw body with filename in query).
        // When a folder is provided, the API also mirrors the image into the repo
        // and returns a /<folder>/<file> path instead of the Blob URL.
        const folderParam = folder ? `&folder=${encodeURIComponent(folder)}` : '';
        const response = await fetch(`/api/upload-attachment?filename=${encodeURIComponent(file.name)}${folderParam}`, {
          method: 'POST',
          body: compressedFile,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Upload failed');
        }

        const data = await response.json();
        uploadedUrls.push(data.url);

        // Update progress
        setUploadProgress(((i + 1) / files.length) * 100);
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    }

    return uploadedUrls;
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const files = Array.from(e.target.files);
      await handleFiles(files);
    }
  };

  const handleFiles = async (files: File[]) => {
    if (files.length === 0) return;

    // Check max files limit
    if (!multiple && files.length > 1) {
      alert('Please select only one file');
      return;
    }

    if (currentImages.length + files.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const uploadedUrls = await uploadToVercelBlob(files);
      onUpload(uploadedUrls);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <FormField label={label} error={error} required={required}>
      <div className="space-y-4">
        {/* Drop zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
          className={`
            relative border-2 border-dashed rounded-lg p-8
            transition-all duration-200 cursor-pointer
            ${dragActive ? 'border-primary bg-primary/5' : 'border-luxury-sand hover:border-primary'}
            ${uploading ? 'pointer-events-none opacity-60' : ''}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center text-center">
            {uploading ? (
              <>
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-3" />
                <p className="text-sm text-luxury-gray-700">
                  Uploading... {Math.round(uploadProgress)}%
                </p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-luxury-gray-400 mb-3" />
                <p className="text-sm text-luxury-gray-700 mb-1">
                  Drag & drop {multiple ? 'images' : 'an image'} here, or click to browse
                </p>
                <p className="text-xs text-luxury-gray-500">
                  JPG, PNG, or WebP (max {maxFiles} files)
                </p>
                <p className="text-xs text-luxury-gray-400 mt-1">
                  Images will be automatically compressed for optimal upload
                </p>
              </>
            )}
          </div>
        </div>

        {/* Image previews */}
        {currentImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentImages.map((url, index) => (
              <div
                key={index}
                className="relative group aspect-square rounded-lg overflow-hidden border border-luxury-sand"
              >
                <img
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(url)}
                    className="
                      absolute top-2 right-2
                      bg-red-600 text-white
                      rounded-full p-1
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-200
                      hover:bg-red-700
                    "
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {currentImages.length === 0 && !uploading && (
          <div className="text-center py-4 text-luxury-gray-500 text-sm flex items-center justify-center gap-2">
            <ImageIcon className="w-5 h-5" />
            No images uploaded yet
          </div>
        )}
      </div>
    </FormField>
  );
};
