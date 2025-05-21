import { z } from "zod";
export declare const ProductSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    shortDescription: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    discountPrice: z.ZodNumber;
    stock: z.ZodNumber;
    sku: z.ZodString;
    isFeatured: z.ZodDefault<z.ZodBoolean>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    categoryId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
    price: number;
    discountPrice: number;
    stock: number;
    sku: string;
    isFeatured: boolean;
    isActive: boolean;
    categoryId: string;
}, {
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
    price: number;
    discountPrice: number;
    stock: number;
    sku: string;
    categoryId: string;
    isFeatured?: boolean | undefined;
    isActive?: boolean | undefined;
}>;
//# sourceMappingURL=product.d.ts.map