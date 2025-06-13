import type { auth } from "~/.server/auth/config";

export type SessionDataType = Awaited<ReturnType<typeof auth.api.getSession>>;

export type SessionUserType = Awaited<ReturnType<typeof auth.api.getSession>>;
