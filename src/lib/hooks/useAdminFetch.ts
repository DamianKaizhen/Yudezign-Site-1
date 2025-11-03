import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

interface AdminFetchOptions<TData> extends Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'> {
  /** Additional query parameters */
  params?: Record<string, string>;
}

/**
 * useAdminFetch - Unified hook for admin GET requests
 *
 * Consolidates repetitive useQuery patterns across admin pages.
 * Handles authentication, error handling, and type safety.
 *
 * @param resource - API resource name (e.g., 'projects', 'finishes')
 * @param options - Optional query configuration
 * @returns React Query result with typed data
 *
 * @example
 * ```tsx
 * // Fetch all projects
 * const { data: projects, isLoading, error } = useAdminFetch<Project[]>('projects');
 *
 * // Fetch with custom enabled condition
 * const { data: testimonials } = useAdminFetch<Testimonial[]>('testimonials', {
 *   enabled: isEditMode,
 * });
 *
 * // Fetch with params
 * const { data: filtered } = useAdminFetch<Finish[]>('finishes', {
 *   params: { styleId: 'style_123' }
 * });
 * ```
 */
export function useAdminFetch<TData = unknown>(
  resource: string,
  options: AdminFetchOptions<TData> = {}
) {
  const { params, ...queryOptions } = options;

  return useQuery<TData>({
    queryKey: params ? [resource, params] : [resource],
    queryFn: async () => {
      // Build URL with query params
      const url = new URL(`/api/admin/${resource}`, window.location.origin);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }

      const response = await fetch(url.toString(), {
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to fetch ${resource}`);
      }

      const result = await response.json();

      // Return data directly or from .data property
      return (result.data ?? result) as TData;
    },
    ...queryOptions,
  });
}
