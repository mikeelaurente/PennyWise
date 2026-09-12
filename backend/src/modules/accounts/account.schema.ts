import z from 'zod';

// Account constants and schemas

export const ACCOUNT_STATUSES = ['active', 'archived', 'closed'] as const;

export const ACCOUNT_TYPES = [
  'e-wallet',
  'bank',
  'cash',
  'credit-card',
  'investment',
] as const;

export const accountTypeSchema = z.enum(ACCOUNT_TYPES, {
  message: 'Invalid account type.',
});

export const accountStatusSchema = z.enum(ACCOUNT_STATUSES, {
  message: 'Invalid account status.',
});

export const createAccountSchema = z.object({
  name: z.string().min(1, { message: 'Account name is required' }).max(100, {
    message: 'Account name must be at most 100 characters long',
  }),

  accountType: accountTypeSchema,

  initialBalance: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message:
      'Initial balance must be a valid number with up to two decimal places.',
  }),
});

export const updateAccountStatusSchema = z.object({
  status: accountStatusSchema,
});

export const accountQuerySchema = z.object({
  search: z.string().optional(),
  status: accountStatusSchema.default('active'),
  types: accountTypeSchema.array().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(90).default(10),
});

export const updateAccountSchema = createAccountSchema.partial();

// Inferred types

export type CreateAccountInput = z.infer<typeof createAccountSchema>;

export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;

export type UpdateAccountStatusInput = z.infer<
  typeof updateAccountStatusSchema
>;

export type AccountType = z.infer<typeof accountTypeSchema>;

export type AccountQueryParams = z.infer<typeof accountQuerySchema>;
