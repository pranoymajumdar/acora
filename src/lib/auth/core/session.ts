import { redisClient } from "@/lib/redis-client";
import { userRoles, userThemes } from "@/drizzle/schemas/users";
import * as crypto from "node:crypto";
import { z } from "zod";

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;
const SESSION_COOKIE_KEY = "session-id";

const sessionUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string().optional(),
  theme: z.enum(userThemes),
  role: z.enum(userRoles),
});
const sessionSchema = z.object({
  id: z.string(),
  user: sessionUserSchema,
});

export type SessionType = z.infer<typeof sessionSchema>;
export type SessionUserType = z.infer<typeof sessionUserSchema>;

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
  user: SessionUserType,
  cookies: Cookies
): Promise<null> => {
  // Generating a random random id
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();

  // Inserting the session id with session into redis
  const key = sessionKey(sessionId);
  const sessionData = sessionSchema.parse({
    id: sessionId,
    user: {
      ...user,
    },
  });
  await redisClient.setEx(
    key,
    SESSION_EXPIRATION_SECONDS * 1000,
    JSON.stringify(sessionData)
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

export const getUserSession = async (
  cookies: Pick<Cookies, "get">
): Promise<SessionType | null> => {
  // Getting the session id from cookie
  const sessionId = cookies.get(SESSION_COOKIE_KEY)?.value;

  // If the session id is null we will return null
  if (!sessionId) return null;

  // Getting the data by using the session id from redis
  const rawSessionData = await redisClient.get(sessionKey(sessionId));

  // If the raw session data is null we will return null
  if (!rawSessionData) return null;

  // Parsing the session data using the actual safe schema
  const { success, data } = sessionSchema.safeParse(JSON.parse(rawSessionData));

  // Returning the parsed data if success else returning null
  return success ? data : null;
};
