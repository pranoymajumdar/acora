import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { publicProcedure } from "../../trpc";

export const products = publicProcedure
  .input(z.object({ collectionSlug: z.string() }))
  .query(async ({ ctx, input }) => {
    const collection = await ctx.db.query.collectionsTable.findFirst({
      where: (table, { eq }) => eq(table.slug, input.collectionSlug),
    });

    if (!collection) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Invalid collection slug.",
      });
    }
    return await ctx.db.query.productsTable.findMany({
      where: (table, { eq }) => eq(table.collectionId, collection.id),
    });
  });
