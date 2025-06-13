import { eq } from "drizzle-orm";

import { db } from "~/lib/db.server";
import { type Collection, collectionsTable, type Shop, shopTable } from "~/lib/schemas";

import type { ShopWithCollection } from "./interfaces";

export async function getShops() {
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
}

export async function getShop(slug: string) {
  const rows = await db.select({
    shop: shopTable,
    collection: collectionsTable,
  }).from(shopTable).where(eq(shopTable.slug, slug)).leftJoin(collectionsTable, eq(collectionsTable.shopId, shopTable.id));

  const collections: Collection[] = [];
  const shop: Shop = rows[0].shop;
  for (const row of rows) {
    if (row.collection) {
      collections.push(row.collection);
    }
  }

  return {
    ...shop,
    collection: collections,
  };
}
