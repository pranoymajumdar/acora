import type { Collection, Shop } from "~/lib/schemas";

export interface ShopWithCollection extends Shop {
  collections: Collection[];
}
