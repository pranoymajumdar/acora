import { z } from "zod";

export const CategorySchema = z.object({
	name: z.string().min(1).min(3).max(100),
	slug: z.string().min(1).min(3).max(100),
});

export const UpdateCategorySchema = CategorySchema.extend({
	id: z.string().uuid(),
});
