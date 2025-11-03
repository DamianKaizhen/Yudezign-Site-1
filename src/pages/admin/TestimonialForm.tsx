import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Star, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useFileUploadHandler } from '../../lib/hooks/useFileUploadHandler';
import type { Testimonial } from '../../types';

const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role/Company is required'),
  content: z.string().min(10, 'Testimonial must be at least 10 characters'),
  rating: z.number().min(1).max(5),
  image: z.string().optional(),
  projectImage: z.string().optional(),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

const TestimonialForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditMode = !!id;

  const [customerImageUrl, setCustomerImageUrl] = useState<string>('');
  const [projectImageUrl, setProjectImageUrl] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState(5);

  // File upload handlers
  const customerUpload = useFileUploadHandler({
    endpoint: '/api/upload',
    compress: true,
  });
  const projectUpload = useFileUploadHandler({
    endpoint: '/api/upload',
    compress: true,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      rating: 5,
    },
  });

  // Fetch testimonial for edit mode
  const { data: testimonial } = useQuery({
    queryKey: ['testimonial', id],
    queryFn: async () => {
      const response = await fetch('/api/admin/testimonials', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      const data = await response.json();
      const testimonials = data.data as Testimonial[];
      return testimonials.find((t) => t.id === id);
    },
    enabled: isEditMode,
  });

  // Populate form when editing
  useEffect(() => {
    if (testimonial) {
      setValue('name', testimonial.name);
      setValue('role', testimonial.role);
      setValue('content', testimonial.content);
      setValue('rating', testimonial.rating);
      setSelectedRating(testimonial.rating);
      if (testimonial.image) {
        setCustomerImageUrl(testimonial.image);
        setValue('image', testimonial.image);
      }
      if (testimonial.projectImage) {
        setProjectImageUrl(testimonial.projectImage);
        setValue('projectImage', testimonial.projectImage);
      }
    }
  }, [testimonial, setValue]);

  // Image upload handler
  const handleImageUpload = async (
    file: File,
    type: 'customer' | 'project'
  ) => {
    const upload = type === 'customer' ? customerUpload : projectUpload;
    const setUrl = type === 'customer' ? setCustomerImageUrl : setProjectImageUrl;
    const fieldName = type === 'customer' ? 'image' : 'projectImage';

    try {
      const url = await upload.uploadFile(file);
      setUrl(url);
      setValue(fieldName, url);
    } catch (error) {
      console.error('Upload error:', error);
      alert(upload.error || 'Failed to upload image. Please try again.');
    }
  };

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (data: TestimonialFormData) => {
      const method = isEditMode ? 'PUT' : 'POST';
      const payload = isEditMode
        ? { ...data, id }
        : {
            ...data,
            id: `testimonial_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          };

      const response = await fetch('/api/admin/testimonials', {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to save testimonial');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      navigate('/admin/testimonials');
    },
  });

  const onSubmit = (data: TestimonialFormData) => {
    saveMutation.mutate(data);
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setValue('rating', rating);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/testimonials')}
            className="flex items-center gap-2 text-luxury-gray-600 hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Testimonials
          </button>
          <h1 className="text-3xl font-bold text-luxury-gray-900">
            {isEditMode ? 'Edit Testimonial' : 'Add New Testimonial'}
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
              Customer Name *
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
              Role/Company *
            </label>
            <input
              type="text"
              {...register('role')}
              className="input-field"
              placeholder="CEO, Tech Company Inc."
            />
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
              Rating *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingClick(rating)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      rating <= selectedRating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
              Testimonial Content *
            </label>
            <textarea
              {...register('content')}
              rows={4}
              className="input-field resize-none"
              placeholder="Write the customer's testimonial here..."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>

          {/* Customer Image */}
          <div>
            <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
              Customer Photo (Optional)
            </label>
            {customerImageUrl ? (
              <div className="relative inline-block">
                <img
                  src={customerImageUrl}
                  alt="Customer"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCustomerImageUrl('');
                    setValue('image', '');
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
                  {customerUpload.uploading ? 'Uploading...' : 'Upload Customer Photo'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, 'customer');
                  }}
                  className="hidden"
                  disabled={customerUpload.uploading}
                />
              </label>
            )}
          </div>

          {/* Project Image */}
          <div>
            <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
              Project Image (Optional)
            </label>
            {projectImageUrl ? (
              <div className="relative inline-block">
                <img
                  src={projectImageUrl}
                  alt="Project"
                  className="w-48 h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setProjectImageUrl('');
                    setValue('projectImage', '');
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
                  {projectUpload.uploading ? 'Uploading...' : 'Upload Project Image'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, 'project');
                  }}
                  className="hidden"
                  disabled={projectUpload.uploading}
                />
              </label>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-6 border-t border-luxury-sand">
            <button
              type="submit"
              disabled={isSubmitting || customerUpload.uploading || projectUpload.uploading}
              className="btn-primary disabled:opacity-50"
            >
              {isSubmitting
                ? 'Saving...'
                : isEditMode
                  ? 'Update Testimonial'
                  : 'Create Testimonial'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/testimonials')}
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

export default TestimonialForm;
