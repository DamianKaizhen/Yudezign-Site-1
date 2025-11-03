/**
 * Form Styling Utilities
 *
 * Centralized styling functions for form inputs to ensure consistency
 * and reduce duplication across FormInput, FormTextarea, and FormSelect components.
 */

interface InputStyleOptions {
  error?: boolean;
  disabled?: boolean;
  hasIcon?: boolean;
}

/**
 * Base input classes shared by all form inputs
 */
const BASE_INPUT_CLASSES = `
  w-full px-4 py-3
  border rounded-lg
  transition-all duration-200
  text-luxury-gray-900
  placeholder-luxury-gray-400
  focus:outline-none
`.trim().replace(/\s+/g, ' ');

/**
 * Get className string for form input elements
 *
 * @param options - Styling options
 * @returns Complete className string
 *
 * @example
 * ```tsx
 * <input
 *   className={getInputClasses({ error: !!errors.name, disabled: false })}
 *   {...register('name')}
 * />
 * ```
 */
export function getInputClasses(options: InputStyleOptions = {}): string {
  const { error = false, disabled = false, hasIcon = false } = options;

  const classes = [
    BASE_INPUT_CLASSES,
    hasIcon ? 'pl-11' : '',
    error
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-luxury-sand focus:ring-2 focus:ring-primary focus:border-primary',
    disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white',
  ];

  return classes.filter(Boolean).join(' ');
}

/**
 * Get className string for textarea elements
 *
 * @param options - Styling options
 * @returns Complete className string
 *
 * @example
 * ```tsx
 * <textarea
 *   className={getTextareaClasses({ error: !!errors.content })}
 *   {...register('content')}
 * />
 * ```
 */
export function getTextareaClasses(options: Omit<InputStyleOptions, 'hasIcon'> = {}): string {
  const { error = false, disabled = false } = options;

  const classes = [
    BASE_INPUT_CLASSES,
    'min-h-[120px] resize-vertical',
    error
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-luxury-sand focus:ring-2 focus:ring-primary focus:border-primary',
    disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white',
  ];

  return classes.filter(Boolean).join(' ');
}

/**
 * Get className string for select elements
 *
 * @param options - Styling options
 * @returns Complete className string
 *
 * @example
 * ```tsx
 * <select
 *   className={getSelectClasses({ error: !!errors.category })}
 *   {...register('category')}
 * />
 * ```
 */
export function getSelectClasses(options: Omit<InputStyleOptions, 'hasIcon'> = {}): string {
  const { error = false, disabled = false } = options;

  const classes = [
    BASE_INPUT_CLASSES,
    'appearance-none cursor-pointer',
    error
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-luxury-sand focus:ring-2 focus:ring-primary focus:border-primary',
    disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white',
  ];

  return classes.filter(Boolean).join(' ');
}

/**
 * Get className string for form labels
 *
 * @param required - Whether the field is required
 * @returns Complete className string
 */
export function getLabelClasses(required: boolean = false): string {
  return `
    block text-sm font-medium text-luxury-gray-700 mb-2
    ${required ? 'after:content-["*"] after:ml-1 after:text-red-500' : ''}
  `.trim().replace(/\s+/g, ' ');
}

/**
 * Get className string for error messages
 *
 * @returns Complete className string
 */
export function getErrorClasses(): string {
  return 'mt-1 text-sm text-red-600';
}

/**
 * Get className string for help text
 *
 * @returns Complete className string
 */
export function getHelpTextClasses(): string {
  return 'mt-1 text-sm text-luxury-gray-500';
}

/**
 * Get className string for icon containers in inputs
 *
 * @returns Complete className string
 */
export function getInputIconClasses(): string {
  return 'absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gray-500';
}

/**
 * Get className string for character counter
 *
 * @param isOverLimit - Whether character limit is exceeded
 * @returns Complete className string
 */
export function getCharacterCounterClasses(isOverLimit: boolean = false): string {
  return `mt-1 text-sm ${isOverLimit ? 'text-red-600' : 'text-luxury-gray-500'}`;
}
