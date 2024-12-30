import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';
import env from '~/env';

const globalForDb = globalThis as unknown as {
  conn: typeof drizzle;
};

const conn = globalForDb.conn ?? drizzle(process.env.DATABASE_URL!);
if (env.NODE_ENV !== 'production') globalForDb.conn = conn;

const db = drizzle(env.DATABASE_URL);
