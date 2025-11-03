import { useState } from 'react';
import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { FormField } from './FormField';

interface FormTextareaProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  register: UseFormRegister<T>;
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
  disabled?: boolean;
}

/**
 * FormTextarea - Multiline text input with optional character counter
 * Integrates with react-hook-form
 */
export function FormTextarea<T extends FieldValues>({
  name,
  label,
  placeholder,
  required = false,
  error,
  register,
  rows = 4,
  maxLength,
  showCharCount = false,
  disabled = false,
}: FormTextareaProps<T>) {
  const [charCount, setCharCount] = useState(0);

  return (
    <FormField label={label} error={error} required={required}>
      <textarea
        {...register(name)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        onChange={(e) => {
          if (showCharCount) {
            setCharCount(e.target.value.length);
          }
        }}
        className={`
          w-full px-4 py-3
          border rounded-lg
          transition-all duration-200
          resize-y
          ${
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-luxury-sand focus:ring-2 focus:ring-primary focus:border-primary'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'}
          text-luxury-gray-900
          placeholder-luxury-gray-400
          focus:outline-none
        `}
      />
      {showCharCount && maxLength && (
        <div className="mt-1 text-sm text-luxury-gray-500 text-right">
          {charCount} / {maxLength}
        </div>
      )}
    </FormField>
  );
}
