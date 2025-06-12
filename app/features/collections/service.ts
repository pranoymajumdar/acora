import type { Collection } from "~/lib/db/schemas";

import { db } from "~/lib/db";

import type { CollectionBreadcrumb, CollectionHierarchy } from "./types";



export class CollectionService {
  static async findBySlugPath(slugs: string[]) {
    let collection: Collection | undefined;
    let parentId: string | null = null;
    const breadcrumbs: CollectionBreadcrumb[] = [];
    let currentPath: string = "";

    for (const slug of slugs) {
      currentPath += `/${slug}`;
      collection = await db.query.collectionsTable.findFirst({
        where: (table, { eq, isNull, and }) => (
          and(eq(table.slug, slug), parentId ? eq(table.parentId, parentId) : isNull(table.parentId))
        ),
        with: {
          children: true,
          parent: true,
        },
      });

      if (!collection) {
        return null;
      }

      breadcrumbs.push({
        id: collection.id,
        name: collection.name,
        path: `/c${currentPath}`,
        slug: collection.slug,
      });

      parentId = collection.id;
    }

    if (!collection) {
      return null;
    }

    return {
      collection,
      breadcrumbs,
    };
  }

  static async getCollectionHierarchy() {
    const collections = await db.query.collectionsTable.findMany({
      orderBy: (collections, { asc }) => [asc(collections.name)],
      with: { children: true, parent: true },
    });

    const map = new Map<string, CollectionHierarchy>();
    collections.forEach(col => {
      map.set(col.id, {
        id: col.id,
        name: col.name,
        slug: col.slug,
        description: col.description,
        parentId: col.parentId,
        children: []
      })
    })

    const roots: CollectionHierarchy[] = [];
    map.forEach(col => {
      if (col.parentId && map.has(col.parentId)) {
        map.get(col.parentId)!.children.push(col)
      } else {
        roots.push(col)
      }
    })

    return roots;
  }
}
