import { z } from 'zod';

export const SPACE_TYPES = ['individual', 'shared'] as const;
export const SPACE_ROLES = ['owner', 'member'] as const;

export const spaceTypeSchema = z.enum(SPACE_TYPES, {
  message: 'Invalid space type.',
});

export const createSpaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Space name is required.' })
    .max(100, { message: 'Space name must be at most 100 characters long.' }),
  type: spaceTypeSchema,
});

export const updateSpaceSchema = createSpaceSchema.partial();

export const spaceQuerySchema = z.object({
  search: z.string().trim().optional(),
  type: spaceTypeSchema.optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(90).default(10),
});

export const memberParamSchema = z.object({
  id: z.coerce.number().int().positive(),
  userId: z.coerce.number().int().positive(),
});

export const memberInputSchema = z.object({
  userId: z.coerce.number().int().positive(),
});

export const memberRoleSchema = z.object({
  role: z.enum(SPACE_ROLES),
});

export const accountParamSchema = z.object({
  id: z.coerce.number().int().positive(),
  accountId: z.coerce.number().int().positive(),
});

export const spaceIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type CreateSpaceInput = z.infer<typeof createSpaceSchema>;
export type UpdateSpaceInput = z.infer<typeof updateSpaceSchema>;
export type SpaceQueryParams = z.infer<typeof spaceQuerySchema>;
export type MemberInput = z.infer<typeof memberInputSchema>;
export type MemberRoleInput = z.infer<typeof memberRoleSchema>;
