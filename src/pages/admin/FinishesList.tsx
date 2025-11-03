import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, AlertCircle, Palette } from 'lucide-react';
import { DataTable } from '../../components/admin/ui/DataTable';
import { FormButton } from '../../components/admin/ui/FormButton';
import AdminLayout from '../../components/admin/AdminLayout';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import type { Finish, FinishStyle, SelectOption } from '../../types';
import type { DataTableColumn, DataTableAction } from '../../types';

export default function FinishesList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedStyle, setSelectedStyle] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; finish: Finish | null }>({
    show: false,
    finish: null,
  });

  // Fetch finishes
  const { data: finishes, isLoading, error } = useQuery({
    queryKey: ['finishes'],
    queryFn: async () => {
      const response = await fetch('/api/admin/finishes', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch finishes');
      }

      const result = await response.json();
      return result.data as Finish[];
    },
  });

  // Fetch finish styles for filter
  const { data: styles } = useQuery({
    queryKey: ['finishStyles'],
    queryFn: async () => {
      const response = await fetch('/api/admin/finish-styles', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch finish styles');
      }

      const result = await response.json();
      return result.data as FinishStyle[];
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/finishes?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete finish');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finishes'] });
      setDeleteConfirm({ show: false, finish: null });
    },
  });

  // Filter finishes by style
  const filteredFinishes = selectedStyle
    ? finishes?.filter((f) => f.styleId === selectedStyle)
    : finishes;

  // Style filter options
  const styleOptions: SelectOption[] = [
    { value: '', label: 'All Styles' },
    ...(styles?.map((style) => ({ value: style.id, label: style.name })) || []),
  ];

  // Get style name by ID
  const getStyleName = (styleId: string): string => {
    const style = styles?.find((s) => s.id === styleId);
    return style?.name || 'Unknown Style';
  };

  // Table columns
  const columns: DataTableColumn<Finish>[] = [
    {
      key: 'color',
      label: 'Preview',
      render: (value, finish) => (
        <div className="flex items-center gap-3">
          {finish.images && finish.images.length > 0 ? (
            <img
              src={finish.images[0]}
              alt={finish.name}
              className="w-12 h-12 rounded-lg border-2 border-luxury-sand shadow-sm object-cover"
            />
          ) : (
            <div
              className="w-12 h-12 rounded-lg border-2 border-luxury-sand shadow-sm"
              style={{ backgroundColor: value as string }}
            />
          )}
          <code className="text-xs font-mono text-luxury-gray-600">
            {finish.images && finish.images.length > 0
              ? `${finish.images.length} image${finish.images.length > 1 ? 's' : ''}`
              : value as string
            }
          </code>
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Finish Name',
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-luxury-gray-900">{value as string}</span>
      ),
    },
    {
      key: 'styleId',
      label: 'Style',
      sortable: true,
      render: (value) => (
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium">
          {getStyleName(value as string)}
        </span>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (value) =>
        value ? (
          <span className="text-luxury-gray-600">{value as string}</span>
        ) : (
          <span className="text-luxury-gray-400 italic">No description</span>
        ),
    },
    {
      key: 'inStock',
      label: 'Stock Status',
      render: (value) =>
        value ? (
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
            In Stock
          </span>
        ) : (
          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-sm font-medium">
            Special Order
          </span>
        ),
    },
    {
      key: 'order',
      label: 'Order',
      sortable: true,
      render: (value) => (
        <span className="font-medium text-luxury-gray-700">{value as number}</span>
      ),
    },
  ];

  // Table actions
  const actions: DataTableAction<Finish>[] = [
    {
      label: 'Edit',
      icon: <Edit className="w-4 h-4" />,
      onClick: (finish) => navigate(`/admin/finishes/${finish.id}`),
      variant: 'primary',
    },
    {
      label: 'Delete',
      icon: <Trash2 className="w-4 h-4" />,
      onClick: (finish) => setDeleteConfirm({ show: true, finish }),
      variant: 'danger',
    },
  ];

  const handleDelete = () => {
    if (deleteConfirm.finish) {
      deleteMutation.mutate(deleteConfirm.finish.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-luxury-gray-600">Loading finishes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center text-red-600">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p className="font-medium">Failed to load finishes</p>
          <p className="text-sm mt-2">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-luxury-gray-900">Finishes</h1>
              <p className="text-luxury-gray-600 mt-1">
                Manage finish colors and options ({finishes?.length || 0} total)
              </p>
            </div>
            <div className="flex gap-3">
              <FormButton
                onClick={() => navigate('/admin/finish-styles')}
                icon={<Palette className="w-5 h-5" />}
                variant="secondary"
              >
                Manage Styles
              </FormButton>
              <FormButton
                onClick={() => navigate('/admin/finishes/new')}
                icon={<Plus className="w-5 h-5" />}
              >
                Add New Finish
              </FormButton>
            </div>
          </div>

      {/* Style Filter */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-luxury-sand">
        <div className="max-w-xs">
          <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
            Filter by Style
          </label>
          <select
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="w-full px-4 py-2 border border-luxury-sand rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {styleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Info Card */}
      {(!styles || styles.length === 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900">
              <p className="font-medium mb-1">No finish styles found</p>
              <p className="text-amber-700 mb-3">
                You need to create at least one finish style before adding finishes.
              </p>
              <FormButton
                onClick={() => navigate('/admin/finish-styles/new')}
                icon={<Plus className="w-4 h-4" />}
              >
                Create First Style
              </FormButton>
            </div>
          </div>
        </div>
      )}

      {/* DataTable */}
      <div className="bg-white rounded-lg shadow-sm border border-luxury-sand p-6">
        {filteredFinishes && filteredFinishes.length > 0 ? (
          <DataTable
            data={filteredFinishes}
            columns={columns}
            actions={actions}
            searchable
            searchPlaceholder="Search by finish name or description..."
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-luxury-gray-500 mb-4">
              {selectedStyle
                ? 'No finishes found in this style.'
                : 'No finishes yet. Click "Add New Finish" to get started.'}
            </p>
            {styles && styles.length > 0 && (
              <FormButton
                onClick={() => navigate('/admin/finishes/new')}
                icon={<Plus className="w-5 h-5" />}
              >
                Add Your First Finish
              </FormButton>
            )}
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
                <h3 className="text-lg font-semibold text-luxury-gray-900 mb-2">Delete Finish</h3>
                <p className="text-luxury-gray-600 mb-4">
                  Are you sure you want to delete "{deleteConfirm.finish?.name}"? This action
                  cannot be undone.
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
                    onClick={() => setDeleteConfirm({ show: false, finish: null })}
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
