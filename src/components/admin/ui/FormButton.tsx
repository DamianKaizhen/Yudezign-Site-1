import React from 'react';
import { Loader2 } from 'lucide-react';

interface FormButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * FormButton - Styled button with loading states and variants
 * Supports primary, secondary, and danger variants
 */
export const FormButton: React.FC<FormButtonProps> = ({
  type = 'button',
  variant = 'primary',
  loading = false,
  disabled = false,
  onClick,
  icon,
  children,
  fullWidth = false,
}) => {
  const baseStyles = `
    px-6 py-3 rounded-lg
    font-medium
    transition-all duration-200
    flex items-center justify-center gap-2
    ${fullWidth ? 'w-full' : ''}
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-60 disabled:cursor-not-allowed
  `;

  const variantStyles = {
    primary: `
      bg-primary text-white
      hover:bg-primary/90
      focus:ring-primary
      shadow-md hover:shadow-lg
    `,
    secondary: `
      bg-white text-luxury-gray-900
      border border-luxury-sand
      hover:bg-luxury-cream
      focus:ring-luxury-sand
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700
      focus:ring-red-500
      shadow-md hover:shadow-lg
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};
