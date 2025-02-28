import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const globalForDb = globalThis as unknown as {
  conn: pg.Pool | undefined;
};

const conn =
  globalForDb.conn ??
  new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn);
