import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Save, AlertCircle, CheckCircle, Upload } from 'lucide-react';
import FormField from '../../components/admin/ui/FormField';
import FormInput from '../../components/admin/ui/FormInput';
import FormButton from '../../components/admin/ui/FormButton';
import ImageUpload from '../../components/admin/ui/ImageUpload';
import type { SiteSettings } from '../../types';

const SiteSettingsPage = () => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  // Form state
  const [formData, setFormData] = useState<SiteSettings>({
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
  });

  // Update form data when settings load
  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedSettings: SiteSettings) => {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSettings),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update settings');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
      setSuccessMessage('Settings updated successfully!');
      setErrorMessage('');
      setTimeout(() => setSuccessMessage(''), 3000);
      // Force page reload to update logos everywhere
      setTimeout(() => window.location.reload(), 1000);
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
      setSuccessMessage('');
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');
    updateMutation.mutate(formData);
  };

  const handleLogoChange = (url: string) => {
    setFormData({ ...formData, logo: url });
  };

  const handleFaviconChange = (url: string) => {
    setFormData({ ...formData, favicon: url });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [platform]: value,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-luxury-gray-600">Loading settings...</div>
      </div>
    );
  }

  return (
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
        onSubmit={handleSubmit}
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
            <FormField label="Company Name" required>
              <FormInput
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="YuDeZign"
                required
              />
            </FormField>

            {/* Logo Upload */}
            <FormField
              label="Company Logo"
              required={false}
            >
              <p className="text-sm text-luxury-gray-600 mb-3">
                Upload your company logo. This will replace the text logo across the website. Leave
                empty to use text-based logo.
              </p>
              <ImageUpload
                currentImage={formData.logo}
                onImageChange={handleLogoChange}
                label="Upload Logo"
                acceptedFormats="PNG, SVG, or JPG (transparent background recommended)"
              />
            </FormField>

            {/* Favicon Upload */}
            <FormField
              label="Favicon"
              required={false}
            >
              <p className="text-sm text-luxury-gray-600 mb-3">
                Upload a favicon (the small icon shown in browser tabs). Recommended size: 32x32 or
                64x64 pixels.
              </p>
              <ImageUpload
                currentImage={formData.favicon}
                onImageChange={handleFaviconChange}
                label="Upload Favicon"
                acceptedFormats="ICO, PNG, or SVG"
              />
            </FormField>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-white rounded-lg p-6 shadow-luxury">
          <h2 className="text-xl font-bold text-luxury-gray-900 mb-4">Social Media Links</h2>
          <p className="text-sm text-luxury-gray-600 mb-6">
            Add your social media profile URLs. These will be displayed in the footer.
          </p>

          <div className="space-y-4">
            <FormField label="Facebook">
              <FormInput
                value={formData.socialLinks.facebook || ''}
                onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                placeholder="https://facebook.com/yudezign"
                type="url"
              />
            </FormField>

            <FormField label="Instagram">
              <FormInput
                value={formData.socialLinks.instagram || ''}
                onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                placeholder="https://www.instagram.com/yudezignez/"
                type="url"
              />
            </FormField>

            <FormField label="LinkedIn">
              <FormInput
                value={formData.socialLinks.linkedin || ''}
                onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/yudezign"
                type="url"
              />
            </FormField>

            <FormField label="Twitter / X">
              <FormInput
                value={formData.socialLinks.twitter || ''}
                onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                placeholder="https://twitter.com/yudezign"
                type="url"
              />
            </FormField>

            <FormField label="YouTube">
              <FormInput
                value={formData.socialLinks.youtube || ''}
                onChange={(e) => handleSocialLinkChange('youtube', e.target.value)}
                placeholder="https://youtube.com/@yudezign"
                type="url"
              />
            </FormField>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <FormButton type="submit" disabled={isSubmitting} icon={Save}>
            {isSubmitting ? 'Saving...' : 'Save Settings'}
          </FormButton>
        </div>
      </motion.form>
    </div>
  );
};

export default SiteSettingsPage;
