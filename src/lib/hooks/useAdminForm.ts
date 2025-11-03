import { useForm, type UseFormReturn, type FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';
import { useState } from 'react';

/**
 * useAdminForm - Hook that combines react-hook-form with Zod validation
 * Provides standard error handling and submit logic
 *
 * Usage:
 * ```tsx
 * const schema = z.object({ name: z.string(), email: z.string().email() });
 * const { register, handleFormSubmit, submitting } = useAdminForm({
 *   schema,
 *   onSubmit: async (data) => { ... }
 * });
 * ```
 */
export function useAdminForm<TFormValues extends FieldValues = FieldValues>({
  schema,
  defaultValues,
  onSubmit,
}: {
  schema: z.ZodSchema<TFormValues>;
  defaultValues?: Partial<TFormValues>;
  onSubmit: (data: TFormValues) => Promise<void>;
}): UseFormReturn<TFormValues> & {
  submitting: boolean;
  submitError: string | null;
  handleFormSubmit: (e: React.FormEvent) => Promise<void>;
} {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formMethods = useForm<TFormValues>({
    // Type assertion needed due to version compatibility between zod and react-hook-form
    resolver: zodResolver(schema as any) as any,
    defaultValues: defaultValues as any,
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const isValid = await formMethods.trigger();
    if (!isValid) {
      return;
    }

    setSubmitting(true);

    try {
      const data = formMethods.getValues();
      await onSubmit(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Form submission failed';
      setSubmitError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    ...formMethods,
    submitting,
    submitError,
    handleFormSubmit,
  } as any;
}
