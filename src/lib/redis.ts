import { createClient } from "redis";
import type { RedisClientType } from "redis";
import { env } from "./env";

const globalForRedis = globalThis as unknown as {
  redisClient?: RedisClientType;
};

const client =
  globalForRedis.redisClient ??
  createClient({
    url: env.REDIS_URL,
  });

client.on("error", (err: unknown) => console.error("Redis Client Error", err));

// Only connect once
if (!globalForRedis.redisClient) {
  client.connect().catch(console.error);
  globalForRedis.redisClient = client;
}

export default client;
