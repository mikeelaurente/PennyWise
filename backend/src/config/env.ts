import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET_KEY: z.string().min(1),
  JWT_EXPIRATION_IN_MINUTES: z.coerce.number().positive(),
  JWT_REFRESH_EXPIRATION_IN_DAYS: z.coerce.number().positive(),
  PORT: z.coerce.number().default(3000),
});

export const env = envSchema.parse(process.env);
