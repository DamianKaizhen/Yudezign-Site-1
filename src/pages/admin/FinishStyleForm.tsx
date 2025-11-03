import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Save } from 'lucide-react';
import { FormInput } from '../../components/admin/ui/FormInput';
import { FormTextarea } from '../../components/admin/ui/FormTextarea';
import { FormButton } from '../../components/admin/ui/FormButton';
import AdminLayout from '../../components/admin/AdminLayout';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import type { FinishStyle } from '../../types';
import { generateStyleId, getNextStyleOrder } from '../../lib/utils/finishesUtils';

// Zod validation schema
const finishStyleSchema = z.object({
  name: z.string().min(1, 'Style name is required').max(100, 'Name must be less than 100 characters'),
  description: z.string().max(300, 'Description must be less than 300 characters').optional(),
  visible: z.boolean(),
  order: z.number().int().min(1, 'Order must be at least 1'),
});

type FinishStyleFormData = z.infer<typeof finishStyleSchema>;

export default function FinishStyleForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = id !== 'new';

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch finish styles
  const { data: styles } = useQuery({
    queryKey: ['finishStyles'],
    queryFn: async () => {
      const response = await fetch('/api/admin/finish-styles', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch finish styles');
      const result = await response.json();
      return result.data as FinishStyle[];
    },
  });

  const currentStyle = isEditMode ? styles?.find((s) => s.id === id) : null;

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FinishStyleFormData>({
    resolver: zodResolver(finishStyleSchema),
    defaultValues: {
      name: '',
      description: '',
      visible: true,
      order: styles ? getNextStyleOrder(styles) : 1,
    },
  });

  // Update default order when styles load
  useEffect(() => {
    if (styles && !isEditMode) {
      setValue('order', getNextStyleOrder(styles));
    }
  }, [styles, isEditMode, setValue]);

  // Pre-populate form in edit mode
  useEffect(() => {
    if (currentStyle) {
      setValue('name', currentStyle.name);
      setValue('description', currentStyle.description || '');
      setValue('visible', currentStyle.visible);
      setValue('order', currentStyle.order);
    }
  }, [currentStyle, setValue]);

  // Submit handler
  const onSubmit = async (data: FinishStyleFormData) => {
    setSubmitting(true);
    setError(null);

    try {
      const finishStyle: FinishStyle = {
        id: isEditMode ? id! : generateStyleId(data.name),
        name: data.name,
        description: data.description,
        visible: data.visible,
        order: data.order,
      };

      const response = await fetch('/api/admin/finish-styles', {
        method: isEditMode ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(finishStyle),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save finish style');
      }

      navigate('/admin/finish-styles');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const watchVisible = watch('visible');

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/finish-styles')}
              className="p-2 hover:bg-luxury-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-luxury-gray-900">
                {isEditMode ? 'Edit Finish Style' : 'Add New Finish Style'}
              </h1>
              <p className="text-luxury-gray-600 mt-1">
                {isEditMode
                  ? `Editing: ${currentStyle?.name || ''}`
                  : 'Create a new finish style category'}
              </p>
            </div>
          </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">Error saving finish style</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Main Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-luxury-sand p-6">
          <h2 className="text-xl font-semibold text-luxury-gray-900 mb-6">Style Details</h2>

          <div className="space-y-6">
            {/* Style Name */}
            <FormInput
              label="Style Name"
              name="name"
              required
              error={errors.name?.message}
              register={register}
              placeholder="e.g., A Touch of Nature, Artisan Shine"
            />

            {/* Description */}
            <FormTextarea
              label="Description"
              name="description"
              error={errors.description?.message}
              register={register}
              placeholder="Brief description of this finish style..."
              rows={3}
            />

            {/* Order */}
            <div>
              <FormInput
                label="Display Order"
                name="order"
                type="number"
                required
                error={errors.order?.message}
                register={register}
                placeholder="1"
              />
              <p className="text-xs text-luxury-gray-500 mt-1">
                Lower numbers appear first
              </p>
            </div>

            {/* Visibility Toggle */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('visible')}
                  className="w-5 h-5 rounded border-luxury-sand text-primary focus:ring-primary"
                />
                <div>
                  <span className="font-medium text-luxury-gray-900">
                    Show on website
                  </span>
                  <p className="text-sm text-luxury-gray-600">
                    {watchVisible
                      ? 'This style will be visible to website visitors'
                      : 'This style will be hidden from website visitors'}
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">💡 Tip</p>
              <p className="text-blue-700">
                Use the visibility toggle to hide styles temporarily without deleting them. Hidden
                styles won't appear on the website but can still be edited in the admin panel.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <FormButton
            type="button"
            variant="secondary"
            onClick={() => navigate('/admin/finish-styles')}
            disabled={submitting}
          >
            Cancel
          </FormButton>
          <FormButton
            type="submit"
            icon={<Save className="w-5 h-5" />}
            loading={submitting}
          >
            {isEditMode ? 'Save Changes' : 'Create Style'}
          </FormButton>
        </div>
      </form>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
