import { cookies } from "next/headers";
import { getUserFromSession } from "./core/session";

export const getCurrentUser = async () => {
  return await getUserFromSession(await cookies());
};
