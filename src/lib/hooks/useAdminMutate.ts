import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';

interface AdminMutateOptions<TData, TVariables>
  extends Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'> {
  /** HTTP method (default: 'POST') */
  method?: 'POST' | 'PUT';
  /** Query keys to invalidate on success */
  invalidateQueries?: string[];
  /** Navigate to path on success */
  navigateOnSuccess?: string;
}

/**
 * useAdminMutate - Unified hook for admin POST/PUT requests
 *
 * Consolidates repetitive useMutation patterns across admin pages.
 * Handles create/update operations, query invalidation, and navigation.
 *
 * @param resource - API resource name (e.g., 'projects', 'finishes')
 * @param options - Optional mutation configuration
 * @returns React Query mutation with typed data
 *
 * @example
 * ```tsx
 * // Create new project
 * const createMutation = useAdminMutate<Project, ProjectFormData>('projects', {
 *   invalidateQueries: ['projects'],
 *   navigateOnSuccess: '/admin/projects',
 * });
 *
 * const handleSubmit = (data: ProjectFormData) => {
 *   createMutation.mutate(data);
 * };
 *
 * // Update existing project
 * const updateMutation = useAdminMutate<Project, ProjectFormData>('projects', {
 *   method: 'PUT',
 *   invalidateQueries: ['projects'],
 * });
 *
 * updateMutation.mutate({ id: 'project_123', ...formData });
 * ```
 */
export function useAdminMutate<TData = unknown, TVariables = unknown>(
  resource: string,
  options: AdminMutateOptions<TData, TVariables> = {}
) {
  const {
    method = 'POST',
    invalidateQueries = [],
    navigateOnSuccess,
    onSuccess,
    ...mutationOptions
  } = options;

  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const response = await fetch(`/api/admin/${resource}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(variables),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to ${method.toLowerCase()} ${resource}`);
      }

      return response.json();
    },
    onSuccess: (data, variables, context) => {
      // Invalidate specified queries
      invalidateQueries.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });

      // Navigate if specified
      if (navigateOnSuccess && typeof window !== 'undefined') {
        // Use setTimeout to ensure navigation happens after state updates
        setTimeout(() => {
          window.location.href = navigateOnSuccess;
        }, 100);
      }

      // Call custom onSuccess if provided
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    ...mutationOptions,
  });
}
