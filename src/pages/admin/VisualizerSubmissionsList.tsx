import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Eye, Trash2, Mail, Phone, Image as ImageIcon, Palette } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import type { VisualizerSubmission } from '../../types';

export default function VisualizerSubmissionsList() {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState('');

  // Fetch visualizer submissions
  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ['visualizerSubmissions'],
    queryFn: async () => {
      const response = await fetch('/api/admin/visualizer-submissions', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch visualizer submissions');
      const result = await response.json();
      return result.data as VisualizerSubmission[];
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/visualizer-submissions?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete submission');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visualizerSubmissions'] });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      deleteMutation.mutate(id);
    }
  };

  // Filter submissions
  const filteredSubmissions = submissions.filter((sub) => {
    if (selectedStatus && sub.status !== selectedStatus) return false;
    return true;
  });

  const newCount = submissions.filter((s) => s.status === 'new').length;
  const processingCount = submissions.filter((s) => s.status === 'processing').length;

  const getStatusBadge = (status: string) => {
    const badges = {
      new: 'bg-green-100 text-green-700',
      processing: 'bg-yellow-100 text-yellow-700',
      completed: 'bg-blue-100 text-blue-700',
      archived: 'bg-gray-100 text-gray-700',
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-700';
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-luxury-gray-900 mb-2">
              Visualizer Submissions
            </h1>
            <p className="text-luxury-gray-600">
              View and manage room visualizer requests
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-luxury p-6"
            >
              <p className="text-luxury-gray-600 text-sm mb-1">Total Submissions</p>
              <p className="text-3xl font-bold text-primary">{submissions.length}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-luxury p-6"
            >
              <p className="text-luxury-gray-600 text-sm mb-1">New</p>
              <p className="text-3xl font-bold text-green-600">{newCount}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-luxury p-6"
            >
              <p className="text-luxury-gray-600 text-sm mb-1">Processing</p>
              <p className="text-3xl font-bold text-yellow-600">{processingCount}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-luxury p-6"
            >
              <p className="text-luxury-gray-600 text-sm mb-1">Completed</p>
              <p className="text-3xl font-bold text-blue-600">
                {submissions.filter((s) => s.status === 'completed').length}
              </p>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-luxury p-6 mb-6">
            <div className="max-w-xs">
              <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="input-field"
              >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Submissions Table */}
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-luxury p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-luxury-gray-600">Loading submissions...</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-luxury p-12 text-center">
              <ImageIcon className="w-16 h-16 text-luxury-gray-300 mx-auto mb-4" />
              <p className="text-luxury-gray-500 text-body-lg">No submissions found</p>
              <p className="text-luxury-gray-400 text-sm mt-2">
                Submissions from the Room Visualizer will appear here
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-luxury overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-luxury-cream border-b border-luxury-sand">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-luxury-gray-900">
                        Room Image
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-luxury-gray-900">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-luxury-gray-900">
                        Selected Finish
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-luxury-gray-900">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-luxury-gray-900">
                        Submitted
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-luxury-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-luxury-sand">
                    {filteredSubmissions.map((submission, index) => (
                      <motion.tr
                        key={submission.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="hover:bg-luxury-cream/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <img
                            src={submission.roomImage}
                            alt="Room"
                            className="w-16 h-16 object-cover rounded-lg border border-luxury-sand"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-luxury-gray-900">{submission.name}</p>
                            <div className="flex flex-col gap-1 mt-1">
                              <a
                                href={`mailto:${submission.email}`}
                                className="text-sm text-primary hover:text-primary-light flex items-center gap-1"
                              >
                                <Mail className="w-3 h-3" />
                                {submission.email}
                              </a>
                              <a
                                href={`tel:${submission.phone}`}
                                className="text-sm text-luxury-gray-600 hover:text-primary flex items-center gap-1"
                              >
                                <Phone className="w-3 h-3" />
                                {submission.phone}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Palette className="w-4 h-4 text-accent" />
                            <span className="text-sm text-luxury-gray-700">
                              {submission.finishName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(submission.status)}`}
                          >
                            {submission.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="text-luxury-gray-900">
                              {new Date(submission.submittedAt).toLocaleDateString()}
                            </p>
                            <p className="text-luxury-gray-500">
                              {new Date(submission.submittedAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/admin/visualizer-submissions/${submission.id}`}
                              className="p-2 text-primary hover:bg-luxury-sand rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(submission.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              disabled={deleteMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}