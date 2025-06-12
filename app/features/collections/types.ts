import type { Collection, Product } from "~/lib/db/schemas";

export type CollectionBreadcrumb = {
  id: string;
  name: string;
  slug: string;
  path: string;
};

export type CollectionHierarchy = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  parentId?: string | null;
  children: CollectionHierarchy[];
};