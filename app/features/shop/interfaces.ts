import type { Collection, Shop } from "~/lib/schemas";

export type ShopWithCollection = {
  collections: Collection[];
} & Shop;
