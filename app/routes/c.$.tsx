import { redirect } from "react-router";

import type { collectionsTable } from "~/lib/db/schemas";

import { db } from "~/lib/db";

import type { Route } from "./+types/c.$";

export async function loader({ params }: Route.LoaderArgs) {
  const slugs = params["*"].split("/").filter(value => value !== "");
  if (slugs.length === 0 || slugs[0] === "") {
    return redirect("/404");
  }

  let collection: typeof collectionsTable.$inferSelect | undefined;
  let parentId: string | null = null;

  for (const slug of slugs) {
    collection = await db.query.collectionsTable.findFirst({
      where: (table, { eq, and, isNull }) => and(eq(table.slug, slug), parentId ? eq(table.parentId, parentId) : isNull(table.parentId)),
    });

    if (!collection) {
      return redirect("/404");
    }

    parentId = collection.id;
  }
  return {
    collection,
  };
}

function CollectionsPage() {
  return <div>Hello World</div>;
}

export default CollectionsPage;
