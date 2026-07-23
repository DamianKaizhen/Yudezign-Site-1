import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Mail, Phone, Calendar, FileText, Download, Tag } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import type { ContactMessage } from '../../types';

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'read', label: 'Read' },
  { value: 'responded', label: 'Responded' },
  { value: 'archived', label: 'Archived' },
  { value: 'spam', label: 'Spam' },
];

export default function ContactMessageDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const [status, setStatus] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch all messages to find the current one
  const { data: messages, isLoading } = useQuery({
    queryKey: ['contactMessages'],
    queryFn: async () => {
      const response = await fetch('/api/admin/contact-messages', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contact messages');
      }

      const result = await response.json();
      return result.data as ContactMessage[];
    },
  });

  const message = messages?.find((m) => m.id === id);

  // Initialize form when message loads
  useEffect(() => {
    if (message) {
      setStatus(message.status);
      setNotes(message.notes || '');

      // Auto-mark as read if it's new
      if (message.status === 'new') {
        setStatus('read');
        setHasChanges(true);
      }
    }
  }, [message]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (updates: Partial<ContactMessage>) => {
      const response = await fetch('/api/admin/contact-messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          id,
          ...updates,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update contact message');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
      setHasChanges(false);
    },
  });

  const handleSave = () => {
    updateMutation.mutate({
      status: status as ContactMessage['status'],
      notes: notes.trim() || undefined,
    });
  };

  // Track changes
  useEffect(() => {
    if (message) {
      const statusChanged = status !== message.status;
      const notesChanged = (notes.trim() || undefined) !== message.notes;
      setHasChanges(statusChanged || notesChanged);
    }
  }, [status, notes, message]);

  const getStatusBadge = (statusValue: string) => {
    const badges = {
      new: 'bg-green-100 text-green-700 border-green-200',
      read: 'bg-blue-100 text-blue-700 border-blue-200',
      responded: 'bg-purple-100 text-purple-700 border-purple-200',
      archived: 'bg-gray-100 text-gray-700 border-gray-200',
      spam: 'bg-red-100 text-red-700 border-red-200',
    };
    return badges[statusValue as keyof typeof badges] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-luxury-gray-600">Loading message...</p>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  if (!message) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="text-center py-12">
            <p className="text-red-600 font-medium">Message not found</p>
            <button
              onClick={() => navigate('/admin/contact-messages')}
              className="mt-4 btn-secondary"
            >
              Back to Messages
            </button>
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
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/contact-messages')}
              className="p-2 hover:bg-luxury-sand rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-luxury-gray-900">Contact Message</h1>
              <p className="text-luxury-gray-600 mt-1">
                From {message.name} on{' '}
                {new Date(message.submittedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-full border ${getStatusBadge(message.status)}`}>
              <span className="font-medium capitalize">{message.status}</span>
            </div>
          </div>

          {/* Message Details Card */}
          <div className="bg-white rounded-lg shadow-sm border border-luxury-sand p-6">
            <h2 className="text-xl font-semibold text-luxury-gray-900 mb-6">Message Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-luxury-gray-700">Email</p>
                    <a
                      href={`mailto:${message.email}`}
                      className="text-primary hover:underline"
                    >
                      {message.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-luxury-gray-700">Phone</p>
                    <a href={`tel:${message.phone}`} className="text-primary hover:underline">
                      {message.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-luxury-gray-700">Project Type</p>
                    <p className="text-luxury-gray-900 capitalize">{message.projectType}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-luxury-gray-700">Timeline</p>
                    <p className="text-luxury-gray-900 capitalize">{message.timeline}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="border-t border-luxury-sand pt-6">
              <h3 className="text-sm font-medium text-luxury-gray-700 mb-3">Message</h3>
              <div className="bg-luxury-cream rounded-lg p-4">
                <p className="text-luxury-gray-900 whitespace-pre-wrap">{message.message}</p>
              </div>
            </div>

            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="border-t border-luxury-sand pt-6 mt-6">
                <h3 className="text-sm font-medium text-luxury-gray-700 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Attachments ({message.attachments.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {message.attachments.map((url, index) => {
                    const filename = url.split('/').pop() || `attachment-${index + 1}`;
                    const isImage = url.match(/\.(jpg|jpeg|png|gif)$/i);

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-luxury-cream rounded-lg border border-luxury-sand"
                      >
                        {isImage ? (
                          <img
                            src={url}
                            alt={filename}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-accent/10 rounded flex items-center justify-center">
                            <FileText className="w-6 h-6 text-accent" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-luxury-gray-900 truncate">
                            {filename}
                          </p>
                        </div>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 p-2 hover:bg-white rounded transition-colors"
                          title="Download"
                        >
                          <Download className="w-5 h-5 text-primary" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Status & Notes Card */}
          <div className="bg-white rounded-lg shadow-sm border border-luxury-sand p-6">
            <h2 className="text-xl font-semibold text-luxury-gray-900 mb-6">
              Status & Internal Notes
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
                  Status *
                </label>
                <select
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="input-field"
                  required
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
                  Internal Notes
                </label>
                <textarea
                  name="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this inquiry (not visible to customer)..."
                  rows={4}
                  className="input-field resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  disabled={!hasChanges || updateMutation.isPending}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => navigate('/admin/contact-messages')}
                  disabled={updateMutation.isPending}
                  className="btn-secondary"
                >
                  Back to Messages
                </button>
              </div>

              {updateMutation.isSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm font-medium">
                    Message updated successfully!
                  </p>
                </div>
              )}

              {updateMutation.isError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm font-medium">
                    Failed to update message. Please try again.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
