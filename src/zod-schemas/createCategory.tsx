import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(3).max(100),
  slug: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  parentId: z.string().optional(),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
