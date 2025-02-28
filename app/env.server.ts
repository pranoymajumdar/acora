import { config } from "dotenv";
import { z } from "zod";

if (process.env.NODE_ENV !== "production") {
  config();
}

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string().min(6, "BETTER_AUTH_SECRET must be at least 6 characters long"),
  BETTER_AUTH_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});


const env = envSchema.parse(process.env);
console.log(process.env)
export { env };
