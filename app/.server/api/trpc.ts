import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { initTRPC } from "@trpc/server";

import { auth } from "../auth/config";
import { db } from "../db/db";

export async function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  return { req, resHeaders, session, db };
}
export type Context = Awaited<ReturnType<typeof createContext>>;

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
