import { z } from 'zod';

export const TRANSACTION_TYPES = ['income', 'expense'] as const;

export const transactionTypeSchema = z.enum(TRANSACTION_TYPES, {
  message: 'Invalid transaction type.',
});

export const createTransactionSchema = z.object({
  accountId: z.coerce.number().int().positive(),
  spaceId: z.coerce.number().int().positive(),
  categoryId: z.coerce.number().int().positive().nullable().optional(),
  amount: z
    .string()
    .regex(/^(0|[1-9]\d{0,12})(\.\d{1,2})?$/, {
      message: 'Amount must be a valid decimal with up to two decimal places.',
    })
    .refine((value) => /[1-9]/.test(value), {
      message: 'Amount must be greater than zero.',
    }),
  type: transactionTypeSchema,
  date: z.iso.date().optional(),
  description: z.string().trim().nullable().optional(),
});

export const transactionQuerySchema = z.object({
  spaceId: z.coerce.number().int().positive(),
  accountId: z.coerce.number().int().positive().optional(),
  categoryId: z.coerce.number().int().positive().optional(),
  search: z.string().trim().optional(),
  type: transactionTypeSchema.optional(),
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(90).default(10),
}).refine(
  (input) => !input.startDate || !input.endDate || input.startDate <= input.endDate,
  { message: 'Start date must not be after end date.' },
);

export const updateTransactionSchema = createTransactionSchema.partial().refine(
  (input) => Object.keys(input).length > 0,
  { message: 'Provide at least one field to update.' },
);

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
export type TransactionQueryParams = z.infer<typeof transactionQuerySchema>;
