import { z } from "zod";



const envSchema = z.object({
  NEXT_PUBLIC_URL: z.string().url(),
  DATABASE_URL: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  REDIS_URL: z.string().min(1),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables:");
  console.error(_env.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
