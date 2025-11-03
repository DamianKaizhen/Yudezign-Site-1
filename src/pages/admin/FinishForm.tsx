import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { FormInput } from '../../components/admin/ui/FormInput';
import { FormTextarea } from '../../components/admin/ui/FormTextarea';
import { FormSelect } from '../../components/admin/ui/FormSelect';
import { FormButton } from '../../components/admin/ui/FormButton';
import { ColorPicker } from '../../components/admin/ui/ColorPicker';
import { ImageUpload } from '../../components/admin/ui/ImageUpload';
import AdminLayout from '../../components/admin/AdminLayout';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import type { Finish, FinishStyle, SelectOption } from '../../types';
import { generateFinishId, getNextFinishOrder } from '../../lib/utils/finishesUtils';

// Zod validation schema
const finishSchema = z.object({
  name: z.string().min(1, 'Finish name is required').max(100, 'Name must be less than 100 characters'),
  styleId: z.string().min(1, 'Please select a finish style'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color (e.g., #FF5733)'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  inStock: z.boolean(),
  description: z.string().max(300, 'Description must be less than 300 characters').optional(),
  order: z.number().int().min(1, 'Order must be at least 1'),
});

type FinishFormData = z.infer<typeof finishSchema>;

export default function FinishForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = id !== 'new';

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch finishes
  const { data: finishes } = useQuery({
    queryKey: ['finishes'],
    queryFn: async () => {
      const response = await fetch('/api/admin/finishes', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch finishes');
      const result = await response.json();
      return result.data as Finish[];
    },
  });

  // Fetch finish styles
  const { data: styles, isLoading: stylesLoading } = useQuery({
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

  const currentFinish = isEditMode ? finishes?.find((f) => f.id === id) : null;

  // Style options for select
  const styleOptions: SelectOption[] =
    styles?.map((style) => ({ value: style.id, label: style.name })) || [];

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FinishFormData>({
    resolver: zodResolver(finishSchema),
    defaultValues: {
      name: '',
      styleId: '',
      color: '#FFFFFF',
      images: [],
      inStock: true,
      description: '',
      order: 1,
    },
  });

  const watchStyleId = watch('styleId');
  const watchColor = watch('color');
  const watchImages = watch('images');

  // Update default order when finishes and styleId load
  useEffect(() => {
    if (finishes && watchStyleId && !isEditMode) {
      setValue('order', getNextFinishOrder(watchStyleId, finishes));
    }
  }, [finishes, watchStyleId, isEditMode, setValue]);

  // Pre-populate form in edit mode
  useEffect(() => {
    if (currentFinish) {
      setValue('name', currentFinish.name);
      setValue('styleId', currentFinish.styleId);
      setValue('color', currentFinish.color);
      setValue('images', currentFinish.images || []);
      setValue('inStock', currentFinish.inStock);
      setValue('description', currentFinish.description || '');
      setValue('order', currentFinish.order);
    }
  }, [currentFinish, setValue]);

  // Submit handler
  const onSubmit = async (data: FinishFormData) => {
    setSubmitting(true);
    setError(null);

    // Debug logging
    console.log('=== FINISH FORM DEBUG ===');
    console.log('URL id parameter:', id);
    console.log('isEditMode:', isEditMode);
    console.log('Will use method:', isEditMode ? 'PUT' : 'POST');

    try {
      const finish: Finish = {
        id: isEditMode ? id! : generateFinishId(),
        name: data.name,
        styleId: data.styleId,
        color: data.color,
        images: data.images,
        inStock: data.inStock,
        description: data.description,
        order: data.order,
      };

      console.log('Finish object being sent:', finish);

      const response = await fetch('/api/admin/finishes', {
        method: isEditMode ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(finish),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save finish');
      }

      navigate('/admin/finishes');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (stylesLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-luxury-gray-600">Loading...</p>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  if (!styles || styles.length === 0) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/finishes')}
                className="p-2 hover:bg-luxury-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-3xl font-bold text-luxury-gray-900">Add New Finish</h1>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">
                No Finish Styles Available
              </h3>
              <p className="text-amber-700 mb-4">
                You need to create at least one finish style before you can add finishes. Finish
                styles are categories like "A Touch of Nature" or "Artisan Shine" that group your
                finishes together.
              </p>
              <FormButton onClick={() => navigate('/admin/finish-styles/new')}>
                Create Your First Style
              </FormButton>
            </div>
          </div>
        </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/finishes')}
          className="p-2 hover:bg-luxury-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-luxury-gray-900">
            {isEditMode ? 'Edit Finish' : 'Add New Finish'}
          </h1>
          <p className="text-luxury-gray-600 mt-1">
            {isEditMode ? `Editing: ${currentFinish?.name || ''}` : 'Create a new finish color'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">Error saving finish</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Main Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-luxury-sand p-6">
          <h2 className="text-xl font-semibold text-luxury-gray-900 mb-6">Finish Details</h2>

          <div className="space-y-6">
            {/* Finish Name */}
            <FormInput
              label="Finish Name"
              name="name"
              required
              error={errors.name?.message}
              register={register}
              placeholder="e.g., Natural Oak, High Gloss White"
            />

            {/* Style Selection */}
            <FormSelect
              label="Finish Style"
              name="styleId"
              required
              error={errors.styleId?.message}
              options={styleOptions}
              register={register}
            />

            {/* Color Picker - For preview/fallback */}
            <ColorPicker
              label="Preview Color (fallback)"
              value={watchColor}
              onChange={(color) => setValue('color', color)}
              required
              error={errors.color?.message}
            />

            {/* Image Upload */}
            <ImageUpload
              label="Finish Material Photos"
              required
              multiple={true}
              maxFiles={8}
              currentImages={watchImages}
              onUpload={(urls) => {
                setValue('images', [...watchImages, ...urls]);
              }}
              onRemove={(url) => {
                setValue('images', watchImages.filter((img) => img !== url));
              }}
              error={errors.images?.message}
            />

            {/* Description */}
            <FormTextarea
              label="Description"
              name="description"
              error={errors.description?.message}
              register={register}
              placeholder="Brief description of this finish..."
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
                Lower numbers appear first within the style
              </p>
            </div>

            {/* Stock Status Toggle */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('inStock')}
                  className="w-5 h-5 rounded border-luxury-sand text-primary focus:ring-primary"
                />
                <div>
                  <span className="font-medium text-luxury-gray-900">In Stock</span>
                  <p className="text-sm text-luxury-gray-600">
                    Check if this finish is currently in stock and ready to ship
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="bg-white rounded-lg shadow-sm border border-luxury-sand p-6">
          <h3 className="text-lg font-semibold text-luxury-gray-900 mb-4">Preview</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <div
                className="w-24 h-24 rounded-lg border-2 border-luxury-sand shadow-lg"
                style={{ backgroundColor: watchColor }}
              />
              <div>
                <p className="text-sm text-luxury-gray-600 mb-1">Fallback Color Code</p>
                <code className="text-base font-mono font-semibold text-luxury-gray-900">
                  {watchColor}
                </code>
                <p className="text-xs text-luxury-gray-500 mt-2">
                  Used when images are loading or unavailable
                </p>
              </div>
            </div>
            {watchImages.length > 0 && (
              <div>
                <p className="text-sm text-luxury-gray-600 mb-2">
                  {watchImages.length} image{watchImages.length !== 1 ? 's' : ''} uploaded
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <FormButton
            type="button"
            variant="secondary"
            onClick={() => navigate('/admin/finishes')}
            disabled={submitting}
          >
            Cancel
          </FormButton>
          <FormButton type="submit" icon={<Save className="w-5 h-5" />} loading={submitting}>
            {isEditMode ? 'Save Changes' : 'Create Finish'}
          </FormButton>
        </div>
      </form>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
