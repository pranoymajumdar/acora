import { z } from "zod";
export declare const CategorySchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
}, {
    name: string;
    slug: string;
}>;
export declare const UpdateCategorySchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
} & {
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    id: string;
}, {
    name: string;
    slug: string;
    id: string;
}>;
//# sourceMappingURL=category.d.ts.map