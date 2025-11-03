import React from 'react';
import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { FormField } from './FormField';

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'url' | 'password';
  placeholder?: string;
  required?: boolean;
  error?: string;
  register: UseFormRegister<T>;
  icon?: React.ReactNode;
  disabled?: boolean;
}

/**
 * FormInput - Text input component with react-hook-form integration
 * Supports various input types and optional icons
 */
export function FormInput<T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  error,
  register,
  icon,
  disabled = false,
}: FormInputProps<T>) {
  return (
    <FormField label={label} error={error} required={required}>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gray-500">
            {icon}
          </div>
        )}
        <input
          type={type}
          {...register(name)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-3
            ${icon ? 'pl-11' : ''}
            border rounded-lg
            transition-all duration-200
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
      </div>
    </FormField>
  );
}
