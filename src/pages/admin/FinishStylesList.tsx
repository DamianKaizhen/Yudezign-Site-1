import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { DataTable } from '../../components/admin/ui/DataTable';
import { FormButton } from '../../components/admin/ui/FormButton';
import type { FinishStyle } from '../../types';
import type { DataTableColumn, DataTableAction } from '../../types';

export default function FinishStylesList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    style: FinishStyle | null;
    finishCount: number;
  }>({
    show: false,
    style: null,
    finishCount: 0,
  });

  // Fetch finish styles
  const { data, isLoading, error } = useQuery({
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

  // Fetch finishes (to check dependencies)
  const { data: finishes } = useQuery({
    queryKey: ['finishes'],
    queryFn: async () => {
      const response = await fetch('/api/admin/finishes', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch finishes');
      }

      const result = await response.json();
      return result.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/finish-styles?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete finish style');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finishStyles'] });
      queryClient.invalidateQueries({ queryKey: ['finishes'] });
      setDeleteConfirm({ show: false, style: null, finishCount: 0 });
    },
  });

  // Table columns
  const columns: DataTableColumn<FinishStyle>[] = [
    {
      key: 'order',
      label: 'Order',
      sortable: true,
      render: (value) => (
        <span className="font-medium text-luxury-gray-700">{value as number}</span>
      ),
    },
    {
      key: 'name',
      label: 'Style Name',
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-luxury-gray-900">{value as string}</span>
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
      key: 'visible',
      label: 'Visibility',
      render: (value) => (
        <div className="flex items-center gap-2">
          {value ? (
            <>
              <Eye className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-medium">Visible</span>
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4 text-luxury-gray-400" />
              <span className="text-luxury-gray-400">Hidden</span>
            </>
          )}
        </div>
      ),
    },
    {
      key: 'id',
      label: 'Finishes Count',
      render: (value) => {
        const count = finishes?.filter((f: any) => f.styleId === value)?.length || 0;
        return (
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {count} {count === 1 ? 'finish' : 'finishes'}
          </span>
        );
      },
    },
  ];

  // Table actions
  const actions: DataTableAction<FinishStyle>[] = [
    {
      label: 'Edit',
      icon: <Edit className="w-4 h-4" />,
      onClick: (style) => navigate(`/admin/finish-styles/${style.id}`),
      variant: 'primary',
    },
    {
      label: 'Delete',
      icon: <Trash2 className="w-4 h-4" />,
      onClick: (style) => {
        const finishCount = finishes?.filter((f: any) => f.styleId === style.id)?.length || 0;
        setDeleteConfirm({ show: true, style, finishCount });
      },
      variant: 'danger',
    },
  ];

  const handleDelete = () => {
    if (deleteConfirm.style) {
      deleteMutation.mutate(deleteConfirm.style.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-luxury-gray-600">Loading finish styles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center text-red-600">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p className="font-medium">Failed to load finish styles</p>
          <p className="text-sm mt-2">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-luxury-gray-900">Finish Styles</h1>
          <p className="text-luxury-gray-600 mt-1">
            Manage finish style categories ({data?.length || 0} total)
          </p>
        </div>
        <FormButton
          onClick={() => navigate('/admin/finish-styles/new')}
          icon={<Plus className="w-5 h-5" />}
        >
          Add New Style
        </FormButton>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-medium mb-1">About Finish Styles</p>
            <p className="text-blue-700">
              Styles are categories that group your finishes together (e.g., "A Touch of Nature",
              "Artisan Shine"). Each finish belongs to one style. You can reorder styles using the
              "Order" field, and hide styles without deleting them using visibility settings.
            </p>
          </div>
        </div>
      </div>

      {/* DataTable */}
      <div className="bg-white rounded-lg shadow-sm border border-luxury-sand p-6">
        {data && data.length > 0 ? (
          <DataTable
            data={data}
            columns={columns}
            actions={actions}
            searchable
            searchPlaceholder="Search by style name..."
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-luxury-gray-500 mb-4">
              No finish styles yet. Click "Add New Style" to get started.
            </p>
            <FormButton
              onClick={() => navigate('/admin/finish-styles/new')}
              icon={<Plus className="w-5 h-5" />}
            >
              Add Your First Style
            </FormButton>
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
                  Delete Finish Style
                </h3>
                <p className="text-luxury-gray-600 mb-4">
                  Are you sure you want to delete "{deleteConfirm.style?.name}"?
                </p>

                {deleteConfirm.finishCount > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                    <p className="text-amber-900 text-sm font-medium">
                      ⚠️ Warning: This style has {deleteConfirm.finishCount}{' '}
                      {deleteConfirm.finishCount === 1 ? 'finish' : 'finishes'} assigned to it.
                    </p>
                    <p className="text-amber-800 text-sm mt-1">
                      You'll need to reassign these finishes to another style before deleting, or
                      delete them first.
                    </p>
                  </div>
                )}

                {deleteConfirm.finishCount === 0 && (
                  <p className="text-sm text-luxury-gray-500 mb-4">
                    This style has no finishes assigned. It's safe to delete.
                  </p>
                )}

                <div className="flex gap-3">
                  <FormButton
                    variant="danger"
                    onClick={handleDelete}
                    loading={deleteMutation.isPending}
                    disabled={deleteConfirm.finishCount > 0}
                    fullWidth
                  >
                    {deleteConfirm.finishCount > 0 ? 'Cannot Delete' : 'Delete Style'}
                  </FormButton>
                  <FormButton
                    variant="secondary"
                    onClick={() => setDeleteConfirm({ show: false, style: null, finishCount: 0 })}
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
  );
}
