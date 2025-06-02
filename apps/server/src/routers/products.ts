import prisma from "@/lib/prisma";
import { adminProcedure, publicProcedure, router } from "@/lib/trpc";
import { ProductSchema, UUIDSchema } from "@acora/zod-schemas";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const productsRouter = router({
  create: adminProcedure.input(ProductSchema).mutation(async ({ input }) => {
    return await prisma.product.create({
      data: {
        name: input.name,
        description: input.description,
        price: input.price,
        shortDescription: input.shortDescription,
        sku: input.sku,
        slug: input.slug,
        stock: input.stock,
        categoryId: input.categoryId,
        discountPrice:
          input.discountPrice > 0 ? input.discountPrice : undefined,
        isActive: input.isActive,
        isFeatured: input.isFeatured,
        imagesUrl: input.imagesUrl,
      },
    });
  }),
  getAll: publicProcedure.query(async () => {
    return await prisma.product.findMany({
      include: {
        category: true,
      },
    });
  }),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return await prisma.product.findUnique({
        where: {
          slug: input.slug,
        },
      });
    }),

  delete: adminProcedure.input(UUIDSchema).mutation(async ({ input }) => {
    if (
      !(await prisma.product.findUnique({
        where: {
          id: input.id,
        },
      }))
    ) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Product not found.",
      });
    }

    return await prisma.product.delete({
      where: {
        id: input.id,
      },
    });
  }),
});
