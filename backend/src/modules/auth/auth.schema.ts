import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(255, { message: 'Name must be at most 255 characters long' }),

  email: z.email({
    message: 'Invalid email address',
  }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
