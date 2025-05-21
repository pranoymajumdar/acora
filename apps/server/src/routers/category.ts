import prisma from "@/lib/prisma";
import { adminProcedure, publicProcedure, router } from "@/lib/trpc";
import {
  CategorySchema,
  UUIDSchema,
  UpdateCategorySchema,
} from "@acora/zod-schemas";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const categoryRouter = router({
  create: adminProcedure.input(CategorySchema).mutation(async ({ input }) => {
    return await prisma.category.create({
      data: {
        name: input.name,
        slug: input.slug,
      },
    });
  }),
  getAll: publicProcedure.query(async () => {
    return await prisma.category.findMany({
      include: {
        products: {
          select: {
            id: true,
          },
        },
      },
    });
  }),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return await prisma.category.findUnique({
        where: {
          slug: input.slug,
        },
      });
    }),
  update: adminProcedure
    .input(UpdateCategorySchema)
    .mutation(async ({ input }) => {
      const category = await prisma.category.findMany({
        where: {
          OR: [{ id: input.id }, { slug: input.slug }],
        },
      });
      const categoryToEdit = category.find((cat) => cat.id === input.id);
      const duplicateSlug = category.find(
        (cat) => cat.id !== input.id && cat.slug === input.slug,
      );
      if (!categoryToEdit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invalid category.",
        });
      }
      if (duplicateSlug) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Category slug already used in other category.",
        });
      }

      return await prisma.category.update({
        data: {
          name: input.name,
          slug: input.slug,
        },
        where: {
          id: input.id,
        },
      });
    }),

  delete: adminProcedure.input(UUIDSchema).mutation(async ({ input }) => {
    return await prisma.category.delete({
      where: {
        id: input.id,
      },
    });
  }),
});
