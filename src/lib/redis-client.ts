import { createClient } from "redis";
import { env } from "./env";

export const redisClient = createClient({
  url: env.REDIS_URL,
});
redisClient.on("error", (err: unknown) =>
  console.error("Redis Client Error", err)
);

redisClient.connect();
