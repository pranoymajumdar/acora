import { z } from "zod";

export const uuidSchema = z.string().uuid();

export type UUIDSchema = z.infer<typeof uuidSchema>;
