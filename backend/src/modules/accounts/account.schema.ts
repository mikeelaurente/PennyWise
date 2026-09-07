import z from 'zod';

export const accountTypeSchema = z.enum(
  ['e-wallet', 'bank', 'cash', 'credit-card', 'investment'],
  { message: 'Invalid account type.' },
);

export const accountStatusSchema = z.enum(['active', 'archived', 'closed'], {
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

export type CreateAccountInput = z.infer<typeof createAccountSchema>;
