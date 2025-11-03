import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Save, AlertCircle, CheckCircle, Upload, Loader2, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';
import type { SiteSettings } from '../../types';

const siteSettingsSchema = z.object({
  logo: z.string(),
  favicon: z.string(),
  companyName: z.string().min(1, 'Company name is required'),
  socialLinks: z.object({
    facebook: z.string().url().optional().or(z.literal('')),
    instagram: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
    twitter: z.string().url().optional().or(z.literal('')),
    youtube: z.string().url().optional().or(z.literal('')),
  }),
});

type SiteSettingsFormData = z.infer<typeof siteSettingsSchema>;

const SiteSettingsPage = () => {
  const queryClient = useQueryClient();
  const { refreshSettings } = useSiteSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [logoUploading, setLogoUploading] = useState(false);
  const [faviconUploading, setFaviconUploading] = useState(false);

  // Fetch current settings
  const { data: settings, isLoading } = useQuery<SiteSettings>({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      const response = await fetch('/api/admin/settings', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch settings');
      const data = await response.json();
      return data.data;
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SiteSettingsFormData>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      logo: '',
      favicon: '',
      companyName: 'YuDeZign',
      socialLinks: {
        facebook: '',
        instagram: '',
        linkedin: '',
        twitter: '',
        youtube: '',
      },
    },
  });

  const logoValue = watch('logo');
  const faviconValue = watch('favicon');

  // Update form when settings load
  useEffect(() => {
    if (settings) {
      setValue('logo', settings.logo);
      setValue('favicon', settings.favicon);
      setValue('companyName', settings.companyName);
      setValue('socialLinks', settings.socialLinks);
    }
  }, [settings, setValue]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data: SiteSettingsFormData) => {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update settings');
      }

      return response.json();
    },
    onSuccess: async () => {
      // Invalidate admin query cache
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });

      // Refresh the site settings context for public pages
      await refreshSettings();

      // Show success message
      setSuccessMessage('Settings updated successfully! Changes will appear across the site shortly. Note: If you don\'t see changes immediately, please wait 30-60 seconds for deployment to complete, then refresh the page.');
      setErrorMessage('');

      // Clear success message after 10 seconds
      setTimeout(() => setSuccessMessage(''), 10000);
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
      setSuccessMessage('');
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (data: SiteSettingsFormData) => {
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');
    updateMutation.mutate(data);
  };

  const handleImageUpload = async (
    file: File,
    fieldName: 'logo' | 'favicon'
  ): Promise<void> => {
    const setUploading = fieldName === 'logo' ? setLogoUploading : setFaviconUploading;
    setUploading(true);

    try {
      const response = await fetch(`/api/upload-attachment?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setValue(fieldName, data.url);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-luxury-gray-600">Loading settings...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-luxury-gray-900 mb-2">Site Settings</h1>
          <p className="text-luxury-gray-600">
            Manage your logo, favicon, and social media links. Changes will be reflected across the
            entire website.
          </p>
        </motion.div>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800">{successMessage}</p>
          </motion.div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{errorMessage}</p>
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Branding Section */}
          <div className="bg-white rounded-lg p-6 shadow-luxury">
            <h2 className="text-xl font-bold text-luxury-gray-900 mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Branding
            </h2>

            <div className="space-y-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-luxury-gray-900 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('companyName')}
                  type="text"
                  placeholder="YuDeZign"
                  className="w-full px-4 py-3 border border-luxury-sand rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.companyName && (
                  <p className="mt-2 text-sm text-red-600">{errors.companyName.message}</p>
                )}
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-luxury-gray-900 mb-2">
                  Company Logo
                </label>
                <p className="text-sm text-luxury-gray-600 mb-3">
                  Upload your company logo. This will replace the text logo across the website.
                </p>
                <div className="flex items-center gap-4">
                  {logoValue && (
                    <div className="relative w-32 h-32 border border-luxury-sand rounded-lg overflow-hidden">
                      <img src={logoValue} alt="Logo preview" className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => setValue('logo', '')}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <label className="cursor-pointer">
                    <div className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                      {logoUploading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          {logoValue ? 'Change Logo' : 'Upload Logo'}
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/png,image/svg+xml,image/jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, 'logo');
                      }}
                      className="hidden"
                      disabled={logoUploading}
                    />
                  </label>
                </div>
              </div>

              {/* Favicon Upload */}
              <div>
                <label className="block text-sm font-medium text-luxury-gray-900 mb-2">
                  Favicon
                </label>
                <p className="text-sm text-luxury-gray-600 mb-3">
                  Upload a favicon (the small icon shown in browser tabs). Recommended size: 32x32 or 64x64 pixels.
                </p>
                <div className="flex items-center gap-4">
                  {faviconValue && (
                    <div className="relative w-16 h-16 border border-luxury-sand rounded-lg overflow-hidden">
                      <img src={faviconValue} alt="Favicon preview" className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => setValue('favicon', '')}
                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-0.5 hover:bg-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <label className="cursor-pointer">
                    <div className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                      {faviconUploading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          {faviconValue ? 'Change Favicon' : 'Upload Favicon'}
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/x-icon,image/png,image/svg+xml"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, 'favicon');
                      }}
                      className="hidden"
                      disabled={faviconUploading}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="bg-white rounded-lg p-6 shadow-luxury">
            <h2 className="text-xl font-bold text-luxury-gray-900 mb-4">Social Media Links</h2>
            <p className="text-sm text-luxury-gray-600 mb-6">
              Add your social media profile URLs. These will be displayed in the footer.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-luxury-gray-900 mb-2">Facebook</label>
                <input
                  {...register('socialLinks.facebook')}
                  type="url"
                  placeholder="https://facebook.com/yudezign"
                  className="w-full px-4 py-3 border border-luxury-sand rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.socialLinks?.facebook && (
                  <p className="mt-2 text-sm text-red-600">{errors.socialLinks.facebook.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-gray-900 mb-2">Instagram</label>
                <input
                  {...register('socialLinks.instagram')}
                  type="url"
                  placeholder="https://www.instagram.com/yudezignez/"
                  className="w-full px-4 py-3 border border-luxury-sand rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.socialLinks?.instagram && (
                  <p className="mt-2 text-sm text-red-600">{errors.socialLinks.instagram.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-gray-900 mb-2">LinkedIn</label>
                <input
                  {...register('socialLinks.linkedin')}
                  type="url"
                  placeholder="https://linkedin.com/company/yudezign"
                  className="w-full px-4 py-3 border border-luxury-sand rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.socialLinks?.linkedin && (
                  <p className="mt-2 text-sm text-red-600">{errors.socialLinks.linkedin.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-gray-900 mb-2">Twitter / X</label>
                <input
                  {...register('socialLinks.twitter')}
                  type="url"
                  placeholder="https://twitter.com/yudezign"
                  className="w-full px-4 py-3 border border-luxury-sand rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.socialLinks?.twitter && (
                  <p className="mt-2 text-sm text-red-600">{errors.socialLinks.twitter.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-gray-900 mb-2">YouTube</label>
                <input
                  {...register('socialLinks.youtube')}
                  type="url"
                  placeholder="https://youtube.com/@yudezign"
                  className="w-full px-4 py-3 border border-luxury-sand rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.socialLinks?.youtube && (
                  <p className="mt-2 text-sm text-red-600">{errors.socialLinks.youtube.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || logoUploading || faviconUploading}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isSubmitting ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </motion.form>
      </div>
    </AdminLayout>
  );
};

export default SiteSettingsPage;
