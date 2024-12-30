import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .union([z.literal('development'), z.literal('testing'), z.literal('production')])
    .default('development'),
  DATABASE_URL: z.string()
});

const env = envSchema.parse(process.env);

export default env;
