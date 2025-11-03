import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';

interface AdminDeleteOptions extends Omit<UseMutationOptions<unknown, Error, string>, 'mutationFn'> {
  /** Query keys to invalidate on success */
  invalidateQueries?: string[];
  /** Success message to display */
  successMessage?: string;
}

/**
 * useAdminDelete - Unified hook for admin DELETE requests
 *
 * Consolidates repetitive delete mutation patterns across admin pages.
 * Handles deletion, query invalidation, and success notifications.
 *
 * @param resource - API resource name (e.g., 'projects', 'finishes')
 * @param options - Optional mutation configuration
 * @returns React Query mutation for delete operations
 *
 * @example
 * ```tsx
 * // Delete project with confirmation
 * const deleteMutation = useAdminDelete('projects', {
 *   invalidateQueries: ['projects'],
 *   successMessage: 'Project deleted successfully',
 * });
 *
 * const handleDelete = (id: string) => {
 *   if (confirm('Are you sure you want to delete this project?')) {
 *     deleteMutation.mutate(id);
 *   }
 * };
 * ```
 */
export function useAdminDelete(
  resource: string,
  options: AdminDeleteOptions = {}
) {
  const {
    invalidateQueries = [resource],
    successMessage,
    onSuccess,
    ...mutationOptions
  } = options;

  const queryClient = useQueryClient();

  return useMutation<unknown, Error, string>({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/${resource}?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to delete ${resource}`);
      }

      return response.json();
    },
    onSuccess: (data, id, context) => {
      // Invalidate specified queries
      invalidateQueries.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });

      // Show success message if provided
      if (successMessage && typeof window !== 'undefined') {
        // Could use a toast notification library here
        console.log(successMessage);
      }

      // Call custom onSuccess if provided
      if (onSuccess) {
        onSuccess(data, id, context);
      }
    },
    ...mutationOptions,
  });
}
