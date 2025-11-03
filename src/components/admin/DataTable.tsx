import { motion } from 'framer-motion';

interface Column<T> {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
}

function DataTable<T extends { id: string }>({
  data,
  columns,
  isLoading = false,
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-luxury p-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-luxury-sand rounded w-1/4 mb-4 mx-auto"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-luxury-sand rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-luxury p-12 text-center">
        <p className="text-luxury-gray-500 text-body-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-luxury overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-luxury-cream border-b border-luxury-sand">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-sm font-semibold text-luxury-gray-900"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-luxury-sand">
            {data.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="hover:bg-luxury-cream/50 transition-colors"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4">
                    {column.render(item)}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
