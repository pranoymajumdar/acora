import {
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { subCategoriesTable } from "./categories";

export const productsTable = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  shortDescription: varchar("short_description").notNull(),
  description: text("description").notNull(),
  price: decimal("price").notNull(),
  stock: integer("stock").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  subCategoryId: uuid("sub_category_id")
    .references(() => subCategoriesTable.id, { onDelete: "cascade" })
    .notNull(),
});
