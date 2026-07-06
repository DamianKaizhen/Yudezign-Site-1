import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useFileUploadHandler } from '../../lib/hooks/useFileUploadHandler';
import type { TeamMember } from '../../types';

const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role/Title is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  headshot: z.string().optional(),
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

const TeamMemberForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditMode = !!id;

  const [headshotUrl, setHeadshotUrl] = useState<string>('');

  // File upload handler
  const headshotUpload = useFileUploadHandler({
    endpoint: '/api/upload-attachment',
    compress: true,
    folder: 'team',
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
  });

  // Fetch team member for edit mode
  const { data: teamMember } = useQuery({
    queryKey: ['teamMember', id],
    queryFn: async () => {
      const response = await fetch('/api/admin/team', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch team members');
      const data = await response.json();
      const members = data.data as TeamMember[];
      return members.find((m) => m.id === id);
    },
    enabled: isEditMode,
  });

  // Populate form when editing
  useEffect(() => {
    if (teamMember) {
      setValue('name', teamMember.name);
      setValue('role', teamMember.role);
      setValue('bio', teamMember.bio);
      setValue('email', teamMember.email || '');
      setValue('phone', teamMember.phone || '');
      if (teamMember.headshot) {
        setHeadshotUrl(teamMember.headshot);
        setValue('headshot', teamMember.headshot);
      }
    }
  }, [teamMember, setValue]);

  // Image upload handler
  const handleImageUpload = async (file: File) => {
    try {
      const url = await headshotUpload.uploadFile(file);
      setHeadshotUrl(url);
      setValue('headshot', url);
    } catch (error) {
      console.error('Upload error:', error);
      alert(headshotUpload.error || 'Failed to upload headshot. Please try again.');
    }
  };

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (data: TeamMemberFormData) => {
      const method = isEditMode ? 'PUT' : 'POST';

      // Clean up optional fields
      const cleanedData = {
        ...data,
        email: data.email || undefined,
        phone: data.phone || undefined,
        headshot: data.headshot || undefined,
      };

      const payload = isEditMode
        ? { ...cleanedData, id }
        : {
            ...cleanedData,
            id: `team_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          };

      const response = await fetch('/api/admin/team', {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to save team member');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      navigate('/admin/team');
    },
  });

  const onSubmit = (data: TeamMemberFormData) => {
    saveMutation.mutate(data);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/team')}
            className="flex items-center gap-2 text-luxury-gray-600 hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Team Members
          </button>
          <h1 className="text-3xl font-bold text-luxury-gray-900">
            {isEditMode ? 'Edit Team Member' : 'Add New Team Member'}
          </h1>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-lg shadow-luxury p-8 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              {...register('name')}
              className="input-field"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
              Role/Title *
            </label>
            <input
              type="text"
              {...register('role')}
              className="input-field"
              placeholder="Lead Designer"
            />
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
              Bio *
            </label>
            <textarea
              {...register('bio')}
              rows={4}
              className="input-field resize-none"
              placeholder="Brief description about this team member..."
            />
            {errors.bio && (
              <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              {...register('email')}
              className="input-field"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
              Phone (Optional)
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="input-field"
              placeholder="(123) 456-7890"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          {/* Headshot */}
          <div>
            <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
              Headshot Photo (Optional)
            </label>
            {headshotUrl ? (
              <div className="relative inline-block">
                <img
                  src={headshotUrl}
                  alt="Headshot"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setHeadshotUrl('');
                    setValue('headshot', '');
                  }}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-luxury-sand rounded-lg cursor-pointer hover:border-primary transition-colors">
                <Upload className="w-5 h-5 text-luxury-gray-400" />
                <span className="text-sm text-luxury-gray-600">
                  {headshotUpload.uploading ? 'Uploading...' : 'Upload Headshot'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  className="hidden"
                  disabled={headshotUpload.uploading}
                />
              </label>
            )}
            <p className="mt-2 text-sm text-luxury-gray-500">
              Recommended: Square image, at least 400x400px
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-6 border-t border-luxury-sand">
            <button
              type="submit"
              disabled={isSubmitting || headshotUpload.uploading}
              className="btn-primary disabled:opacity-50"
            >
              {isSubmitting
                ? 'Saving...'
                : isEditMode
                  ? 'Update Team Member'
                  : 'Create Team Member'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/team')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      </div>
    </AdminLayout>
  );
};

export default TeamMemberForm;
