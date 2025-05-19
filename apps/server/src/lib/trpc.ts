import { TRPCError, initTRPC } from "@trpc/server";
import type { Context } from "./context";

export const t = initTRPC.context<Context>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

export const adminProcedure = t.procedure.use(
	t.middleware(({ ctx, next }) => {
		if (!ctx.session || !ctx.session.user.isAdmin) {
			throw new TRPCError({
				code: "FORBIDDEN",
				message:
					"You do not have the required permissions to perform this action.",
			});
		}

		return next({
			ctx: {
				...ctx,
				session: ctx.session,
			},
		});
	}),
);
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
	if (!ctx.session) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "Authentication required",
			cause: "No session",
		});
	}
	return next({
		ctx: {
			...ctx,
			session: ctx.session,
		},
	});
});
