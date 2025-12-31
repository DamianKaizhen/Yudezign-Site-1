import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Mail, Phone, Palette, Image as ImageIcon, Download } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import type { VisualizerSubmission } from '../../types';

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'processing', label: 'Processing' },
  { value: 'completed', label: 'Completed' },
  { value: 'archived', label: 'Archived' },
];

export default function VisualizerSubmissionDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const [status, setStatus] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch all submissions to find the current one
  const { data: submissions, isLoading } = useQuery({
    queryKey: ['visualizerSubmissions'],
    queryFn: async () => {
      const response = await fetch('/api/admin/visualizer-submissions', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch visualizer submissions');
      }

      const result = await response.json();
      return result.data as VisualizerSubmission[];
    },
  });

  const submission = submissions?.find((s) => s.id === id);

  // Initialize form when submission loads
  useEffect(() => {
    if (submission) {
      setStatus(submission.status);
      setNotes(submission.notes || '');

      // Auto-mark as processing if it's new
      if (submission.status === 'new') {
        setStatus('processing');
        setHasChanges(true);
      }
    }
  }, [submission]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (updates: Partial<VisualizerSubmission>) => {
      const response = await fetch('/api/admin/visualizer-submissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          id,
          ...updates,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update submission');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visualizerSubmissions'] });
      setHasChanges(false);
    },
  });

  const handleSave = () => {
    updateMutation.mutate({
      status: status as VisualizerSubmission['status'],
      notes: notes.trim() || undefined,
    });
  };

  // Track changes
  useEffect(() => {
    if (submission) {
      const statusChanged = status !== submission.status;
      const notesChanged = (notes.trim() || undefined) !== submission.notes;
      setHasChanges(statusChanged || notesChanged);
    }
  }, [status, notes, submission]);

  const getStatusBadge = (statusValue: string) => {
    const badges = {
      new: 'bg-green-100 text-green-700 border-green-200',
      processing: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      completed: 'bg-blue-100 text-blue-700 border-blue-200',
      archived: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return badges[statusValue as keyof typeof badges] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  // Get finishes from new format or legacy format
  const getFinishes = () => {
    if (submission?.finishes && submission.finishes.length > 0) {
      return submission.finishes;
    }
    // Legacy format fallback
    if (submission?.finishId && submission?.finishName) {
      return [{
        id: submission.finishId,
        name: submission.finishName,
        imageUrl: '',
      }];
    }
    return [];
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-luxury-gray-600">Loading submission...</p>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  if (!submission) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="text-center py-12">
            <p className="text-red-600 font-medium">Submission not found</p>
            <button
              onClick={() => navigate('/admin/visualizer-submissions')}
              className="mt-4 btn-secondary"
            >
              Back to Submissions
            </button>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  const finishes = getFinishes();

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/visualizer-submissions')}
              className="p-2 hover:bg-luxury-sand rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-luxury-gray-900">Visualizer Submission</h1>
              <p className="text-luxury-gray-600 mt-1">
                From {submission.name} on{' '}
                {new Date(submission.submittedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-full border ${getStatusBadge(submission.status)}`}>
              <span className="font-medium capitalize">{submission.status}</span>
            </div>
          </div>

          {/* Room Image Card */}
          <div className="bg-white rounded-lg shadow-sm border border-luxury-sand p-6">
            <h2 className="text-xl font-semibold text-luxury-gray-900 mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              Room Photo
            </h2>
            <div className="relative">
              <img
                src={submission.roomImage}
                alt="Room"
                className="w-full max-h-96 object-contain rounded-lg border border-luxury-sand"
              />
              <a
                href={submission.roomImage}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-lg shadow transition-colors"
                title="View full size"
              >
                <Download className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-lg shadow-sm border border-luxury-sand p-6">
            <h2 className="text-xl font-semibold text-luxury-gray-900 mb-6">Submission Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-luxury-gray-700">Email</p>
                    <a
                      href={`mailto:${submission.email}`}
                      className="text-primary hover:underline"
                    >
                      {submission.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-luxury-gray-700">Phone</p>
                    <a href={`tel:${submission.phone}`} className="text-primary hover:underline">
                      {submission.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Selected Finishes */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Palette className="w-5 h-5 text-accent mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-luxury-gray-700 mb-3">
                      Selected Finish{finishes.length > 1 ? 'es' : ''} ({finishes.length})
                    </p>

                    {/* Finish Cards */}
                    <div className="space-y-3">
                      {finishes.map((finish, index) => (
                        <div
                          key={finish.id}
                          className="flex items-center gap-3 p-3 bg-luxury-cream rounded-lg border border-luxury-sand"
                        >
                          {finish.imageUrl ? (
                            <img
                              src={finish.imageUrl}
                              alt={finish.name}
                              className="w-14 h-14 object-cover rounded-lg border border-luxury-sand"
                            />
                          ) : (
                            <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center">
                              <Palette className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-primary/70 uppercase">
                                {index === 0 ? 'Primary' : 'Secondary'}
                              </span>
                            </div>
                            <p className="font-medium text-luxury-gray-900">{finish.name}</p>
                          </div>
                          {finish.imageUrl && (
                            <a
                              href={finish.imageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 hover:bg-luxury-sand rounded-lg transition-colors"
                              title="View finish image"
                            >
                              <Download className="w-4 h-4 text-primary" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                  placeholder="Add notes about this visualization request..."
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
                  onClick={() => navigate('/admin/visualizer-submissions')}
                  disabled={updateMutation.isPending}
                  className="btn-secondary"
                >
                  Back to Submissions
                </button>
              </div>

              {updateMutation.isSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm font-medium">
                    Submission updated successfully!
                  </p>
                </div>
              )}

              {updateMutation.isError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm font-medium">
                    Failed to update submission. Please try again.
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