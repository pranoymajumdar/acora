import { eq } from "drizzle-orm";
import { z } from "zod";

import { type Collection, collectionsTable, shopTable } from "~/.server/db/schemas";
import { publicProcedure } from "~/.server/api/trpc";

export const bySlug = publicProcedure.input(z.object({ shopSlug: z.string() })).query(async ({ input, ctx }) => {
  const rows = await ctx.db.select({
    shop: shopTable,
    collection: collectionsTable,
  }).from(shopTable).where(eq(shopTable.slug, input.shopSlug)).leftJoin(collectionsTable, eq(shopTable.id, collectionsTable.shopId));

  const collection: Collection[] = [];

  for (const row of rows) {
    if (row.collection) {
      collection.push(row.collection);
    }
  }

  return {
    ...rows[0].shop,
    collection,
  };
});
