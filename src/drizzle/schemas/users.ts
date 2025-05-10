import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userRoles = ["admin", "user"] as const;
export type UserRole = (typeof userRoles)[number];
export const usersRoleEnum = pgEnum("user_roles", userRoles);

export const userThemes = ["light", "dark", "system"] as const;
export type UserTheme = (typeof userThemes)[number];
export const usersThemeEnum = pgEnum("users_theme", userThemes);

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),
  role: usersRoleEnum().notNull().default("user"),
  theme: usersThemeEnum().notNull().default("system"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type UserSelect = typeof usersTable.$inferSelect;
export type UserInsert = typeof usersTable.$inferInsert;
