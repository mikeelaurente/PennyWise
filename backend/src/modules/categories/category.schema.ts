import { z } from 'zod';

export const CATEGORY_TYPES = ['income', 'expense'] as const;

export const categoryTypeSchema = z.enum(CATEGORY_TYPES, {
  message: 'Invalid category type.',
});

export const createCategorySchema = z.object({
  spaceId: z.coerce.number().int().positive(),
  name: z.string().trim().min(1).max(100),
  type: categoryTypeSchema,
});

export const updateCategorySchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  type: categoryTypeSchema.optional(),
});

export const categoryQuerySchema = z.object({
  spaceId: z.coerce.number().int().positive(),
  search: z.string().trim().optional(),
  type: categoryTypeSchema.optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(90).default(10),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CategoryQueryParams = z.infer<typeof categoryQuerySchema>;
