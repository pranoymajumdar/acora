import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	DATABASE_URL: z.string().min(1),
	CORS_ORIGIN: z.string().url(),
	BETTER_AUTH_SECRET: z.string(),
	BETTER_AUTH_URL: z.string(),
	PORT: z.string().transform((val) => Number(val)),
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
