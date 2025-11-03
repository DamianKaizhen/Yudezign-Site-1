import { Plus, X } from 'lucide-react';
import type {
  UseFormRegister,
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  Path,
} from 'react-hook-form';
import { FormField } from './FormField';

interface ArrayField {
  id: string;
  value: string;
}

interface ArrayFieldInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  fields: ArrayField[];
  register: UseFormRegister<T>;
  append: UseFieldArrayAppend<T>;
  remove: UseFieldArrayRemove;
  required?: boolean;
  error?: string;
  placeholder?: string;
  addButtonText?: string;
}

/**
 * ArrayFieldInput - Dynamic add/remove text fields
 * Used for managing arrays like project features
 */
export function ArrayFieldInput<T extends FieldValues>({
  label,
  name,
  fields,
  register,
  append,
  remove,
  required = false,
  error,
  placeholder = 'Enter value',
  addButtonText = 'Add Item',
}: ArrayFieldInputProps<T>) {
  return (
    <FormField label={label} error={error} required={required}>
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input
              {...register(`${name}.${index}.value` as Path<T>)}
              placeholder={placeholder}
              className="
                flex-1 px-4 py-3
                border border-luxury-sand rounded-lg
                focus:ring-2 focus:ring-primary focus:border-primary
                transition-all duration-200
                text-luxury-gray-900
                placeholder-luxury-gray-400
                focus:outline-none
              "
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="
                px-3 py-3
                bg-red-50 text-red-600
                rounded-lg
                hover:bg-red-100
                transition-colors duration-200
                border border-red-200
              "
              title="Remove item"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ value: '' } as any)}
          className="
            w-full px-4 py-3
            bg-white border-2 border-dashed border-luxury-sand
            rounded-lg
            text-luxury-gray-700
            hover:border-primary hover:bg-primary/5
            transition-all duration-200
            flex items-center justify-center gap-2
            font-medium
          "
        >
          <Plus className="w-5 h-5" />
          {addButtonText}
        </button>

        {fields.length === 0 && (
          <p className="text-sm text-luxury-gray-500 text-center py-2">
            No items added yet. Click the button above to add one.
          </p>
        )}
      </div>
    </FormField>
  );
}
