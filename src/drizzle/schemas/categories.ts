import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  slug: varchar("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const subCategoriesTable = pgTable("sub_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id")
    .references(() => categoriesTable.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name").notNull(),
  slug: varchar("slug").notNull().unique(),
});
