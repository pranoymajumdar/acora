import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const collectionsTable = pgTable("collections", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  description: text("description"),
  parentId: uuid("parent_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const productsTable = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  collectionId: uuid("collection_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

// Relations
export const collectionsRelations = relations(collectionsTable, ({ one, many }) => ({
  parent: one(collectionsTable, {
    fields: [collectionsTable.parentId],
    references: [collectionsTable.id],
    relationName: "CollectionHierarchy",
  }),
  children: many(collectionsTable, {
    relationName: "CollectionHierarchy",
  }),
  products: many(productsTable),
}));

export const productsRelations = relations(productsTable, ({ one }) => ({
  collection: one(collectionsTable, {
    fields: [productsTable.collectionId],
    references: [collectionsTable.id],
  }),
}));

// Types

export type Collection = typeof collectionsTable.$inferSelect;
export type Product = typeof productsTable.$inferSelect;
