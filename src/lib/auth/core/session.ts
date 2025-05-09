import { redisClient } from "@/lib/redis-client";
import { userRoles, userThemes } from "@/schemas/users";
import * as crypto from "node:crypto";
import { z } from "zod";

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;
const SESSION_COOKIE_KEY = "session-id";

const sessionSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  theme: z.enum(userThemes),
  role: z.enum(userRoles),
});

export type SessionType = z.infer<typeof sessionSchema>;

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires?: number;
    }
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

const sessionKey = (sessionId: string) => {
  return `session:${sessionId}`;
};

export const createUserSession = async (
  user: SessionType,
  cookies: Cookies
): Promise<null> => {
  // Generating a random random id
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();

  // Inserting the session id with user data into redis
  const key = sessionKey(sessionId);
  await redisClient.setEx(
    key,
    SESSION_EXPIRATION_SECONDS * 1000,
    JSON.stringify(sessionSchema.parse(user))
  );

  // Adding the session id into the cookies
  cookies.set(SESSION_COOKIE_KEY, sessionId, {
    secure: true,
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
    sameSite: "lax",
    httpOnly: true,
  });
  return null;
};

export const getUserFromSession = async (
  cookies: Pick<Cookies, "get">
): Promise<SessionType | null> => {
  // Getting the session id from cookie
  const sessionId = cookies.get(SESSION_COOKIE_KEY)?.value;

  // If the session id is null we will return null
  if (!sessionId) return null;

  // Getting the data by using the session id from redis
  const rawUser = await redisClient.get(sessionKey(sessionId));

  // If the raw user data is null we will return null
  if (!rawUser) return null;

  // Parsing the user data using the actual safe schema
  const { success, data } = sessionSchema.safeParse(JSON.parse(rawUser));

  // Returning the parsed data if success else returning null
  return success ? data : null;
};
