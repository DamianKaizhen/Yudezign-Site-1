import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, AlertCircle } from 'lucide-react';
import { DataTable } from '../../components/admin/ui/DataTable';
import { FormButton } from '../../components/admin/ui/FormButton';
import AdminLayout from '../../components/admin/AdminLayout';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import type { Project } from '../../types';
import type { DataTableColumn, DataTableAction, SelectOption } from '../../types';

// Category filter options
const categoryOptions: SelectOption[] = [
  { value: '', label: 'All Categories' },
  { value: 'kitchens', label: 'Kitchens' },
  { value: 'closets', label: 'Closets' },
  { value: 'vanities', label: 'Vanities' },
  { value: 'custom', label: 'Custom' },
  { value: 'commercial', label: 'Commercial' },
];

export default function ProjectsList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; project: Project | null }>({
    show: false,
    project: null,
  });

  // Fetch projects
  const { data, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch('/api/admin/projects', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const result = await response.json();
      return result.data as Project[];
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setDeleteConfirm({ show: false, project: null });
    },
  });

  // Filter projects by category
  const filteredProjects = selectedCategory
    ? data?.filter((p) => p.category === selectedCategory)
    : data;

  // Table columns
  const columns: DataTableColumn<Project>[] = [
    {
      key: 'thumbnail',
      label: 'Image',
      render: (value) => (
        <img
          src={value as string}
          alt="Project thumbnail"
          className="w-16 h-16 object-cover rounded-lg"
        />
      ),
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true,
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value) => (
        <span className="capitalize px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
          {value as string}
        </span>
      ),
    },
    {
      key: 'location',
      label: 'Location',
      render: (value) => (value ? (value as string) : <span className="text-gray-400">—</span>),
    },
  ];

  // Table actions
  const actions: DataTableAction<Project>[] = [
    {
      label: 'Edit',
      icon: <Edit className="w-4 h-4" />,
      onClick: (project) => navigate(`/admin/projects/${project.id}`),
      variant: 'primary',
    },
    {
      label: 'Delete',
      icon: <Trash2 className="w-4 h-4" />,
      onClick: (project) => setDeleteConfirm({ show: true, project }),
      variant: 'danger',
    },
  ];

  const handleDelete = () => {
    if (deleteConfirm.project) {
      deleteMutation.mutate(deleteConfirm.project.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-luxury-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center text-red-600">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p className="font-medium">Failed to load projects</p>
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
              <h1 className="text-3xl font-bold text-luxury-gray-900">Projects</h1>
              <p className="text-luxury-gray-600 mt-1">
                Manage your portfolio projects ({data?.length || 0} total)
              </p>
            </div>
            <FormButton
              onClick={() => navigate('/admin/projects/new')}
              icon={<Plus className="w-5 h-5" />}
            >
              Add New Project
            </FormButton>
          </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-luxury-sand">
        <div className="max-w-xs">
          <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
            Filter by Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-luxury-sand rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* DataTable */}
      <div className="bg-white rounded-lg shadow-sm border border-luxury-sand p-6">
        {filteredProjects && filteredProjects.length > 0 ? (
          <DataTable
            data={filteredProjects}
            columns={columns}
            actions={actions}
            searchable
            searchPlaceholder="Search by title or location..."
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-luxury-gray-500">
              {selectedCategory
                ? 'No projects found in this category.'
                : 'No projects yet. Click "Add New Project" to get started.'}
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
                  Delete Project
                </h3>
                <p className="text-luxury-gray-600 mb-4">
                  Are you sure you want to delete "{deleteConfirm.project?.title}"? This action
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
                    onClick={() => setDeleteConfirm({ show: false, project: null })}
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
