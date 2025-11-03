import { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, Database } from 'lucide-react';
import type { DataTableColumn, DataTableAction } from '../../../types';

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  actions?: DataTableAction<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

/**
 * DataTable - Advanced data table with sorting, search, and actions
 * Supports custom column rendering and row actions
 */
export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  actions = [],
  searchable = false,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    return data.filter((row) =>
      columns.some((column) => {
        const value = row[column.key as keyof T];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [data, searchQuery, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [filteredData, sortConfig]);

  const handleSort = (column: DataTableColumn<T>) => {
    if (!column.sortable) return;

    setSortConfig((current) => {
      if (current?.key === column.key) {
        return {
          key: column.key,
          direction: current.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key: column.key, direction: 'asc' };
    });
  };

  const getSortIcon = (column: DataTableColumn<T>) => {
    if (!column.sortable) return null;

    if (sortConfig?.key !== column.key) {
      return <ChevronUp className="w-4 h-4 opacity-30" />;
    }

    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="space-y-4">
      {/* Search bar */}
      {searchable && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="
              w-full pl-10 pr-4 py-3
              border border-luxury-sand rounded-lg
              focus:ring-2 focus:ring-primary focus:border-primary
              transition-all duration-200
              text-luxury-gray-900
              placeholder-luxury-gray-400
              focus:outline-none
            "
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-luxury-sand">
        <table className="min-w-full divide-y divide-luxury-sand">
          <thead className="bg-luxury-cream">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  onClick={() => handleSort(column)}
                  className={`
                    px-6 py-4 text-left text-xs font-medium text-luxury-gray-700 uppercase tracking-wider
                    ${column.sortable ? 'cursor-pointer hover:bg-luxury-sand/30 select-none' : ''}
                  `}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-6 py-4 text-right text-xs font-medium text-luxury-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-luxury-sand">
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  className="px-6 py-12 text-center"
                >
                  <div className="flex flex-col items-center gap-2 text-luxury-gray-500">
                    <Database className="w-12 h-12 opacity-30" />
                    <p>{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-luxury-cream/50 transition-colors duration-150"
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="px-6 py-4 whitespace-nowrap text-sm text-luxury-gray-900"
                    >
                      {column.render
                        ? column.render(row[column.key as keyof T], row)
                        : String(row[column.key as keyof T] ?? '')}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex justify-end gap-2">
                        {actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={() => action.onClick(row)}
                            className={`
                              px-3 py-1.5 rounded-md
                              font-medium text-sm
                              transition-colors duration-200
                              flex items-center gap-1
                              ${
                                action.variant === 'danger'
                                  ? 'bg-red-50 text-red-700 hover:bg-red-100'
                                  : action.variant === 'secondary'
                                    ? 'bg-luxury-sand text-luxury-gray-700 hover:bg-luxury-sand/70'
                                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                              }
                            `}
                          >
                            {action.icon}
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Results count */}
      <div className="text-sm text-luxury-gray-600 text-right">
        Showing {sortedData.length} of {data.length} results
      </div>
    </div>
  );
}
