import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { ChevronDown } from 'lucide-react';
import { FormField } from './FormField';
import type { SelectOption } from '../../../types';

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  register: UseFormRegister<T>;
  disabled?: boolean;
}

/**
 * FormSelect - Dropdown selector with custom styling
 * Integrates with react-hook-form
 */
export function FormSelect<T extends FieldValues>({
  name,
  label,
  options,
  placeholder = 'Select an option',
  required = false,
  error,
  register,
  disabled = false,
}: FormSelectProps<T>) {
  return (
    <FormField label={label} error={error} required={required}>
      <div className="relative">
        <select
          {...register(name)}
          disabled={disabled}
          className={`
            w-full px-4 py-3 pr-10
            border rounded-lg
            appearance-none
            transition-all duration-200
            ${
              error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-luxury-sand focus:ring-2 focus:ring-primary focus:border-primary'
            }
            ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'}
            text-luxury-gray-900
            focus:outline-none
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-gray-500 pointer-events-none"
        />
      </div>
    </FormField>
  );
}
