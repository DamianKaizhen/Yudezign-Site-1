import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import type { Testimonial } from '../../types';

const TestimonialsList = () => {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fetch testimonials
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await fetch('/api/admin/testimonials', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      const data = await response.json();
      return data.data as Testimonial[];
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete testimonial');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      setDeleteId(null);
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      deleteMutation.mutate(id);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (testimonial: Testimonial) => (
        <div className="flex items-center gap-3">
          {testimonial.image ? (
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-luxury-sand flex items-center justify-center text-primary font-semibold">
              {testimonial.name.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-medium text-luxury-gray-900">{testimonial.name}</p>
            <p className="text-sm text-luxury-gray-600">{testimonial.role}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (testimonial: Testimonial) => renderStars(testimonial.rating),
    },
    {
      key: 'content',
      label: 'Testimonial',
      render: (testimonial: Testimonial) => (
        <p className="text-sm text-luxury-gray-700 max-w-md truncate">
          {testimonial.content}
        </p>
      ),
    },
    {
      key: 'project',
      label: 'Project Image',
      render: (testimonial: Testimonial) => (
        <div>
          {testimonial.projectImage ? (
            <img
              src={testimonial.projectImage}
              alt="Project"
              className="w-16 h-12 object-cover rounded"
            />
          ) : (
            <span className="text-sm text-luxury-gray-400">No image</span>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (testimonial: Testimonial) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/testimonials/${testimonial.id}`}
            className="p-2 text-primary hover:bg-luxury-sand rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleDelete(testimonial.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            disabled={deleteMutation.isPending && deleteId === testimonial.id}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-luxury-gray-900 mb-2">
              Testimonials
            </h1>
            <p className="text-luxury-gray-600">
              Manage customer testimonials and reviews
            </p>
          </div>
          <Link
            to="/admin/testimonials/new"
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Testimonial
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-luxury p-6"
          >
            <p className="text-luxury-gray-600 text-sm mb-1">Total Testimonials</p>
            <p className="text-3xl font-bold text-primary">{testimonials.length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-luxury p-6"
          >
            <p className="text-luxury-gray-600 text-sm mb-1">Average Rating</p>
            <p className="text-3xl font-bold text-primary">
              {testimonials.length > 0
                ? (
                    testimonials.reduce((sum, t) => sum + t.rating, 0) /
                    testimonials.length
                  ).toFixed(1)
                : '0.0'}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-luxury p-6"
          >
            <p className="text-luxury-gray-600 text-sm mb-1">5-Star Reviews</p>
            <p className="text-3xl font-bold text-primary">
              {testimonials.filter((t) => t.rating === 5).length}
            </p>
          </motion.div>
        </div>

        {/* Table */}
        <DataTable
          data={testimonials}
          columns={columns}
          isLoading={isLoading}
          emptyMessage="No testimonials yet. Add your first one!"
        />
      </div>
    </AdminLayout>
  );
};

export default TestimonialsList;
