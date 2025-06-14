import { eq } from "drizzle-orm";

import { publicProcedure } from "~/.server/api/trpc";
import { type Collection, collectionsTable, type Shop, shopTable } from "~/.server/db/schemas";

export type ShopWithCollection = {
  collection: Collection[];
} & Shop;

export const all = publicProcedure.query(async ({ ctx }) => {
  const rows = await ctx.db.select({
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
        collection: [],
      };
    }

    if (row.collection?.id) {
      acc[shopId].collection.push(row.collection);
    }
    return acc;
  }, {} as Record<string, ShopWithCollection>);

  return Object.values(grouped);
});
