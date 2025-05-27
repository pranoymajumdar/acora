import { z } from "zod";
export const ProductSchema = z.object({
    name: z.string().min(3).max(100),
    slug: z.string().min(3).max(100),
    shortDescription: z.string().min(3).max(255),
    description: z.string().min(10).max(5000),
    price: z.number().min(0.01).positive(),
    discountPrice: z.number().min(0).nonnegative(),
    stock: z.number().int().min(0),
    sku: z.string().min(3).max(50),
    isFeatured: z.boolean().default(false),
    isActive: z.boolean().default(true),
    imagesUrl: z.string().array(),
    categoryId: z.string().min(1, "Choose a category"),
});
//# sourceMappingURL=product.js.map