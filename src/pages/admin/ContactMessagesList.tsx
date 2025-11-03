import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Mail, Trash2, AlertCircle, Eye, FileText, Download } from 'lucide-react';
import { DataTable } from '../../components/admin/ui/DataTable';
import { FormButton } from '../../components/admin/ui/FormButton';
import AdminLayout from '../../components/admin/AdminLayout';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import type { ContactMessage, SelectOption } from '../../types';
import type { DataTableColumn, DataTableAction } from '../../types';

// Status filter options
const statusOptions: SelectOption[] = [
  { value: '', label: 'All Status' },
  { value: 'new', label: 'New' },
  { value: 'read', label: 'Read' },
  { value: 'responded', label: 'Responded' },
  { value: 'archived', label: 'Archived' },
];

// Project type filter options
const projectTypeOptions: SelectOption[] = [
  { value: '', label: 'All Project Types' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'closet', label: 'Closet' },
  { value: 'vanity', label: 'Vanity' },
  { value: 'custom', label: 'Custom' },
  { value: 'other', label: 'Other' },
];

export default function ContactMessagesList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedProjectType, setSelectedProjectType] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    message: ContactMessage | null;
  }>({
    show: false,
    message: null,
  });

  // Fetch contact messages
  const { data, isLoading, error } = useQuery({
    queryKey: ['contactMessages', selectedStatus, selectedProjectType],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedStatus) params.append('status', selectedStatus);
      if (selectedProjectType) params.append('projectType', selectedProjectType);

      const response = await fetch(`/api/admin/contact-messages?${params}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contact messages');
      }

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

      if (!response.ok) {
        throw new Error('Failed to delete contact message');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
      setDeleteConfirm({ show: false, message: null });
    },
  });

  // Get status badge color
  const getStatusBadge = (status: string) => {
    const badges = {
      new: 'bg-green-100 text-green-700',
      read: 'bg-blue-100 text-blue-700',
      responded: 'bg-purple-100 text-purple-700',
      archived: 'bg-gray-100 text-gray-700',
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-700';
  };

  // Table columns
  const columns: DataTableColumn<ContactMessage>[] = [
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusBadge(
            value as string
          )}`}
        >
          {value as string}
        </span>
      ),
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-luxury-gray-900">{value as string}</span>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (value) => (
        <a href={`mailto:${value}`} className="text-primary hover:underline">
          {value as string}
        </a>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (value) => <span className="text-luxury-gray-600">{value as string}</span>,
    },
    {
      key: 'projectType',
      label: 'Project Type',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 bg-accent/10 text-accent-dark rounded text-sm font-medium capitalize">
          {value as string}
        </span>
      ),
    },
    {
      key: 'submittedAt',
      label: 'Submitted',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-luxury-gray-600">
          {new Date(value as string).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      ),
    },
    {
      key: 'attachments',
      label: 'Files',
      render: (value) => {
        const attachments = value as string[] | undefined;
        return attachments && attachments.length > 0 ? (
          <span className="flex items-center gap-1 text-sm text-luxury-gray-600">
            <FileText className="w-4 h-4" />
            {attachments.length}
          </span>
        ) : (
          <span className="text-luxury-gray-400">—</span>
        );
      },
    },
  ];

  // Table actions
  const actions: DataTableAction<ContactMessage>[] = [
    {
      label: 'View',
      icon: <Eye className="w-4 h-4" />,
      onClick: (message) => navigate(`/admin/contact-messages/${message.id}`),
      variant: 'primary',
    },
    {
      label: 'Delete',
      icon: <Trash2 className="w-4 h-4" />,
      onClick: (message) => setDeleteConfirm({ show: true, message }),
      variant: 'danger',
    },
  ];

  const handleDelete = () => {
    if (deleteConfirm.message) {
      deleteMutation.mutate(deleteConfirm.message.id);
    }
  };

  // Count unread messages
  const unreadCount = data?.filter((m) => m.status === 'new').length || 0;

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-luxury-gray-600">Loading contact messages...</p>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center h-96">
            <div className="text-center text-red-600">
              <AlertCircle className="w-12 h-12 mx-auto mb-4" />
              <p className="font-medium">Failed to load contact messages</p>
              <p className="text-sm mt-2">{(error as Error).message}</p>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-luxury-gray-900">Contact Messages</h1>
              <p className="text-luxury-gray-600 mt-1">
                Manage quote requests and inquiries ({data?.length || 0} total
                {unreadCount > 0 && `, ${unreadCount} unread`})
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-luxury-sand">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
                  Filter by Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-luxury-sand rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
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
                  Filter by Project Type
                </label>
                <select
                  value={selectedProjectType}
                  onChange={(e) => setSelectedProjectType(e.target.value)}
                  className="w-full px-4 py-2 border border-luxury-sand rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {projectTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Info Card for New Messages */}
          {unreadCount > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-900">
                  <p className="font-medium mb-1">
                    You have {unreadCount} new {unreadCount === 1 ? 'message' : 'messages'}
                  </p>
                  <p className="text-green-700">
                    Click "View" on any message to mark it as read and add notes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* DataTable */}
          <div className="bg-white rounded-lg shadow-sm border border-luxury-sand p-6">
            {data && data.length > 0 ? (
              <DataTable
                data={data}
                columns={columns}
                actions={actions}
                searchable
                searchPlaceholder="Search by name, email, or message..."
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-luxury-gray-500">
                  {selectedStatus || selectedProjectType
                    ? 'No contact messages found matching your filters.'
                    : 'No contact messages yet. Messages submitted through the contact form will appear here.'}
                </p>
              </div>
            )}
          </div>

          {/* Delete Confirmation Modal */}
          {deleteConfirm.show && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-luxury-lg max-w-md w-full p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-luxury-gray-900 mb-2">
                      Delete Contact Message
                    </h3>
                    <p className="text-luxury-gray-600 mb-4">
                      Are you sure you want to delete the message from "
                      {deleteConfirm.message?.name}"? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                      <FormButton
                        variant="danger"
                        onClick={handleDelete}
                        loading={deleteMutation.isPending}
                        fullWidth
                      >
                        Delete
                      </FormButton>
                      <FormButton
                        variant="secondary"
                        onClick={() => setDeleteConfirm({ show: false, message: null })}
                        disabled={deleteMutation.isPending}
                        fullWidth
                      >
                        Cancel
                      </FormButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
