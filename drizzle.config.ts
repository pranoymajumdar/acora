import { env } from "@/lib/env";
import { type Config } from "drizzle-kit";

export default {
  schema: "./src/drizzle/schemas/*.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
