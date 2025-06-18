import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(3).max(100),
  slug: z.string().min(3).max(100),
  parentId: z.string().uuid(),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
