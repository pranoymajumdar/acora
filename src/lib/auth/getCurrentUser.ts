import { cookies } from "next/headers";
import { getUserSession, type SessionType } from "./core/session";

export const getSession = async (): Promise<SessionType | null> => {
  return await getUserSession(await cookies());
};
