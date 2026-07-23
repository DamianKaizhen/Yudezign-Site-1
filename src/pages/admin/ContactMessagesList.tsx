import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Eye, Trash2, Mail, Phone, Paperclip } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import type { ContactMessage } from '../../types';

export default function ContactMessagesList() {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedProjectType, setSelectedProjectType] = useState('');

  // Fetch contact messages
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['contactMessages'],
    queryFn: async () => {
      const response = await fetch('/api/admin/contact-messages', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch contact messages');
      const result = await response.json();
      return result.data as ContactMessage[];
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/contact-messages?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete message');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMutation.mutate(id);
    }
  };

  // Filter messages
  const filteredMessages = messages.filter((msg) => {
    if (selectedStatus && msg.status !== selectedStatus) return false;
    if (selectedProjectType && msg.projectType !== selectedProjectType) return false;
    return true;
  });

  const unreadCount = messages.filter((m) => m.status === 'new').length;

  const getStatusBadge = (status: string) => {
    const badges = {
      new: 'bg-green-100 text-green-700',
      read: 'bg-blue-100 text-blue-700',
      responded: 'bg-purple-100 text-purple-700',
      archived: 'bg-gray-100 text-gray-700',
      spam: 'bg-red-100 text-red-700',
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
              Contact Messages
            </h1>
            <p className="text-luxury-gray-600">
              View and manage contact form submissions
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-luxury p-6"
            >
              <p className="text-luxury-gray-600 text-sm mb-1">Total Messages</p>
              <p className="text-3xl font-bold text-primary">{messages.length}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-luxury p-6"
            >
              <p className="text-luxury-gray-600 text-sm mb-1">Unread Messages</p>
              <p className="text-3xl font-bold text-primary">{unreadCount}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-luxury p-6"
            >
              <p className="text-luxury-gray-600 text-sm mb-1">Responded</p>
              <p className="text-3xl font-bold text-primary">
                {messages.filter((m) => m.status === 'responded').length}
              </p>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-luxury p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
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
                  <option value="read">Read</option>
                  <option value="responded">Responded</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
                  Filter by Project Type
                </label>
                <select
                  value={selectedProjectType}
                  onChange={(e) => setSelectedProjectType(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Project Types</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="closet">Closet</option>
                  <option value="vanity">Vanity</option>
                  <option value="custom">Custom</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Messages Table */}
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-luxury p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-luxury-gray-600">Loading messages...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="bg-white rounded-lg shadow-luxury p-12 text-center">
              <p className="text-luxury-gray-500 text-body-lg">No messages found</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-luxury overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-luxury-cream border-b border-luxury-sand">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-luxury-gray-900">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-luxury-gray-900">
                        Project Type
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-luxury-gray-900">
                        Timeline
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
                    {filteredMessages.map((message, index) => (
                      <motion.tr
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="hover:bg-luxury-cream/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-luxury-gray-900">{message.name}</p>
                            <div className="flex flex-col gap-1 mt-1">
                              <a
                                href={`mailto:${message.email}`}
                                className="text-sm text-primary hover:text-primary-light flex items-center gap-1"
                              >
                                <Mail className="w-3 h-3" />
                                {message.email}
                              </a>
                              <a
                                href={`tel:${message.phone}`}
                                className="text-sm text-luxury-gray-600 hover:text-primary flex items-center gap-1"
                              >
                                <Phone className="w-3 h-3" />
                                {message.phone}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-luxury-gray-700 capitalize">
                            {message.projectType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-luxury-gray-700">{message.timeline}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(message.status)}`}
                          >
                            {message.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="text-luxury-gray-900">
                              {new Date(message.submittedAt).toLocaleDateString()}
                            </p>
                            <p className="text-luxury-gray-500">
                              {new Date(message.submittedAt).toLocaleTimeString()}
                            </p>
                          </div>
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="flex items-center gap-1 mt-1">
                              <Paperclip className="w-3 h-3 text-luxury-gray-400" />
                              <span className="text-xs text-luxury-gray-500">
                                {message.attachments.length} file(s)
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/admin/contact-messages/${message.id}`}
                              className="p-2 text-primary hover:bg-luxury-sand rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(message.id)}
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
