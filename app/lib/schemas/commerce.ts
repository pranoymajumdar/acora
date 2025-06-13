import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

function baseFields<T extends object>(fields: T) {
  return {
    id: uuid("id").primaryKey().defaultRandom(),
    ...fields,
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  };
}

export const shopTable = pgTable("shop", baseFields({
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
}));

export const collectionsTable = pgTable("collections", baseFields({
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
  shopId: uuid("shopId").notNull().references(() => shopTable.id),
}));

export const productsTable = pgTable("products", baseFields({
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  collectionId: uuid("collection_id").notNull().references(() => collectionsTable.id),
}));

// Types

export type Shop = typeof shopTable.$inferSelect;
export type Collection = typeof collectionsTable.$inferSelect;
export type Product = typeof productsTable.$inferSelect;
