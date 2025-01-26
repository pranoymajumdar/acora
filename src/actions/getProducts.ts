import { z } from "zod";

export const getProductsSchema = z.object({
  products: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      price: z.number(),
      thumbnail: z.string(),
      reviews: z.array(z.object({
        rating: z.number(),
        comment: z.string(),
        date: z.string(),
        reviewerName: z.string(),
        reviewerEmail: z.string(),
      })),
      availabilityStatus: z.string(),
      rating: z.number(),
    })
  ),
});

export type GetProductsResponse = z.infer<typeof getProductsSchema>;
