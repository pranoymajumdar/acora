import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env";
import { usersTable } from "@/schemas/users";
import { categoriesTable, subCategoriesTable } from "@/schemas/categories";
import { productsTable } from "@/schemas/products";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, {
  schema: {
    users: usersTable,
    categories: categoriesTable,
    subCategories: subCategoriesTable,
    products: productsTable,
  },
});
