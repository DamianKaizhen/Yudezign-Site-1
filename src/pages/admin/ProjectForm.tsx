import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Save } from 'lucide-react';
import { FormInput } from '../../components/admin/ui/FormInput';
import { FormTextarea } from '../../components/admin/ui/FormTextarea';
import { FormSelect } from '../../components/admin/ui/FormSelect';
import { FormButton } from '../../components/admin/ui/FormButton';
import { ImageUpload } from '../../components/admin/ui/ImageUpload';
import { ArrayFieldInput } from '../../components/admin/ui/ArrayFieldInput';
import AdminLayout from '../../components/admin/AdminLayout';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import type { Project, SelectOption } from '../../types';
import { formatFeaturesForForm, formatFeaturesForApi } from '../../lib/utils/projectUtils';
import { imageSrcSchema } from '../../lib/utils/validation';

// Zod validation schema
const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.enum(['kitchens', 'closets', 'vanities', 'custom', 'commercial'], {
    message: 'Please select a category',
  }),
  location: z.string().optional(),
  finish: z.string().min(1, 'Finish is required'),
  cabinetStyle: z.string().min(1, 'Cabinet style is required'),
  turnaroundTime: z.string().min(1, 'Turnaround time is required'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
  images: z.array(imageSrcSchema()).min(1, 'At least one image is required'),
  thumbnail: imageSrcSchema('Thumbnail is required'),
  features: z.array(z.object({ value: z.string().min(1) })).min(1, 'At least one feature is required'),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const categoryOptions: SelectOption[] = [
  { value: 'kitchens', label: 'Kitchens' },
  { value: 'closets', label: 'Closets' },
  { value: 'vanities', label: 'Vanities' },
  { value: 'custom', label: 'Custom' },
  { value: 'commercial', label: 'Commercial' },
];

export default function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch project for edit mode
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch('/api/admin/projects', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch projects');
      const result = await response.json();
      return result.data as Project[];
    },
    enabled: isEditMode,
  });

  const currentProject = isEditMode ? projects?.find((p) => p.id === id) : null;

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema) as any,
    defaultValues: {
      title: '',
      category: 'kitchens',
      location: '',
      finish: '',
      cabinetStyle: '',
      turnaroundTime: '',
      description: '',
      images: [],
      thumbnail: '',
      features: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'features',
  });

  // Pre-populate form in edit mode
  useEffect(() => {
    if (currentProject) {
      setValue('title', currentProject.title);
      setValue('category', currentProject.category);
      setValue('location', currentProject.location || '');
      setValue('finish', currentProject.finish);
      setValue('cabinetStyle', currentProject.cabinetStyle);
      setValue('turnaroundTime', currentProject.turnaroundTime);
      setValue('description', currentProject.description);
      setValue('images', currentProject.images);
      setValue('thumbnail', currentProject.thumbnail);
      setValue('features', formatFeaturesForForm(currentProject.features));
      setUploadedImages(currentProject.images);
    }
  }, [currentProject, setValue]);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...data,
          features: formatFeaturesForApi(data.features),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create project');
      }

      return response.json();
    },
    onSuccess: () => {
      navigate('/admin/projects');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      const response = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...data,
          id,
          features: formatFeaturesForApi(data.features),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update project');
      }

      return response.json();
    },
    onSuccess: () => {
      navigate('/admin/projects');
    },
  });

  // Handle image upload
  const handleImagesUpload = (urls: string[]) => {
    const newImages = [...uploadedImages, ...urls];
    setUploadedImages(newImages);
    setValue('images', newImages);

    // Auto-set thumbnail to first image if not set
    if (!watch('thumbnail') && newImages.length > 0) {
      setValue('thumbnail', newImages[0]);
    }
  };

  // Handle image removal
  const handleImageRemove = (url: string) => {
    const newImages = uploadedImages.filter((img) => img !== url);
    setUploadedImages(newImages);
    setValue('images', newImages);

    // Update thumbnail if it was the removed image
    if (watch('thumbnail') === url && newImages.length > 0) {
      setValue('thumbnail', newImages[0]);
    } else if (newImages.length === 0) {
      setValue('thumbnail', '');
    }
  };

  // Form submit
  const onSubmit = async (data: ProjectFormData) => {
    setSubmitting(true);
    setError(null);

    try {
      if (isEditMode) {
        await updateMutation.mutateAsync(data);
      } else {
        await createMutation.mutateAsync(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (isEditMode && !currentProject && projects) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="text-center py-12">
            <p className="text-red-600">Project not found</p>
            <FormButton onClick={() => navigate('/admin/projects')} variant="secondary">
              Back to Projects
            </FormButton>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/projects')}
                className="p-2 hover:bg-luxury-sand rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-luxury-gray-900">
                  {isEditMode ? 'Edit Project' : 'Create New Project'}
                </h1>
                <p className="text-luxury-gray-600 mt-1">
                  {isEditMode ? 'Update project details' : 'Add a new project to your portfolio'}
                </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm border border-luxury-sand p-8 space-y-6">
        {/* Title */}
        <FormInput
          name="title"
          label="Project Title"
          placeholder="e.g., Modern Houston Kitchen"
          required
          error={errors.title?.message}
          register={register}
        />

        {/* Category */}
        <FormSelect
          name="category"
          label="Category"
          options={categoryOptions}
          required
          error={errors.category?.message}
          register={register}
        />

        {/* Location */}
        <FormInput
          name="location"
          label="Location"
          placeholder="e.g., Memorial, Houston"
          error={errors.location?.message}
          register={register}
        />

        {/* Finish */}
        <FormInput
          name="finish"
          label="Finish"
          placeholder="e.g., White Matte Melamine"
          required
          error={errors.finish?.message}
          register={register}
        />

        {/* Cabinet Style */}
        <FormInput
          name="cabinetStyle"
          label="Cabinet Style"
          placeholder="e.g., Frameless European"
          required
          error={errors.cabinetStyle?.message}
          register={register}
        />

        {/* Turnaround Time */}
        <FormInput
          name="turnaroundTime"
          label="Turnaround Time"
          placeholder="e.g., 2 weeks"
          required
          error={errors.turnaroundTime?.message}
          register={register}
        />

        {/* Description */}
        <FormTextarea
          name="description"
          label="Description"
          placeholder="Describe the project..."
          required
          rows={4}
          maxLength={500}
          showCharCount
          error={errors.description?.message}
          register={register}
        />

        {/* Images */}
        <ImageUpload
          label="Project Images"
          required
          error={errors.images?.message}
          multiple
          maxFiles={10}
          folder="portfolio"
          onUpload={handleImagesUpload}
          currentImages={uploadedImages}
          onRemove={handleImageRemove}
        />

        {/* Features */}
        <ArrayFieldInput
          label="Features"
          name="features"
          fields={fields}
          register={register}
          append={append}
          remove={remove}
          required
          error={errors.features?.message}
          placeholder="e.g., Soft-close hinges"
          addButtonText="Add Feature"
        />

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <FormButton
            type="submit"
            loading={submitting}
            disabled={submitting}
            icon={<Save className="w-5 h-5" />}
            fullWidth
          >
            {isEditMode ? 'Update Project' : 'Create Project'}
          </FormButton>
          <FormButton
            type="button"
            variant="secondary"
            onClick={() => navigate('/admin/projects')}
            disabled={submitting}
          >
            Cancel
          </FormButton>
        </div>
      </form>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
