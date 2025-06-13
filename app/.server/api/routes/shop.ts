import { eq } from "drizzle-orm";
import { z } from "zod";

import { publicProcedure, router } from "~/.server/api/trpc";
import { db } from "~/.server/db/db";
import { type Collection, collectionsTable, type Shop, shopTable } from "~/.server/db/schemas";

export type ShopWithCollection = {
  collections: Collection[];
} & Shop;

export const shopRouter = router({
  all: publicProcedure.query(async () => {
    const rows = await db.select({
      shop: shopTable,
      collection: collectionsTable,
    }).from(shopTable).leftJoin(
      collectionsTable,
      eq(shopTable.id, collectionsTable.shopId),
    );

    const grouped = rows.reduce((acc, row) => {
      const shopId = row.shop.id;
      if (!acc[shopId]) {
        acc[shopId] = {
          ...row.shop,
          collections: [],
        };
      }

      if (row.collection?.id) {
        acc[shopId].collections.push(row.collection);
      }
      return acc;
    }, {} as Record<string, ShopWithCollection>);

    return Object.values(grouped);
  }),

  findBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
    const rows = await db.select({
      shop: shopTable,
      collection: collectionsTable,
    }).from(shopTable).where(eq(shopTable.slug, input.slug)).leftJoin(collectionsTable, eq(shopTable.id, collectionsTable.shopId));

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
  }),
});
