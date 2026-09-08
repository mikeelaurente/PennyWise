import z from "zod";
export const ACCOUNT_STATIUS = ["active", "archived", "closed"] as const;

export const accountTypeSchema = z.enum(
  ["e-wallet", "bank", "cash", "credit-card", "investment"],
  { message: "Invalid account type." },
);

export const accountStatusSchema = z.enum(["active", "archived", "closed"], {
  message: "Invalid account status.",
});

export const createAccountSchema = z.object({
  name: z.string().min(1, { message: "Account name is required" }).max(100, {
    message: "Account name must be at most 100 characters long",
  }),

  accountType: accountTypeSchema,

  initialBalance: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message:
      "Initial balance must be a valid number with up to two decimal places.",
  }),
});

export const updateAccountStatusSchema = z.object({
  status: accountStatusSchema,
});

export const accountType = z.object({
  type: accountTypeSchema,
});

export const searchAccountSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["active", "archived", "closed"]).default("active"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(90).default(10),
});

export type CreateAccountInput = z.infer<typeof createAccountSchema>;
export type UpdateAccountStatusInput = z.infer<
  typeof updateAccountStatusSchema
>;
export type AccountType = z.infer<typeof accountType>;
export type SearchAccountSchema = z.infer<typeof searchAccountSchema>;
export type AccountStatus = (typeof ACCOUNT_STATIUS)[number];
export type AccountFilter = {
  search?: string;
  status?: AccountStatus;
};
export type UpdateAccountInput = z.infer<typeof createAccountSchema>;
