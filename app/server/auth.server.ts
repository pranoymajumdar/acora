import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "~/server/db.server";
 import * as schemas from '~/server/schemas';

 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema: schemas
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false
    }
})