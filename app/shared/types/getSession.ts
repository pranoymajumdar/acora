import type { auth } from "~/features/auth/lib/auth.server";

export type SessionDataType = Awaited<ReturnType<typeof auth.api.getSession>>;

export type SessionUserType = Awaited<ReturnType<typeof auth.api.getSession>>;
