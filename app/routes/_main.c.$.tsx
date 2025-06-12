import { redirect } from "react-router";

import { CollectionService } from "~/features/collections/service";

import type { Route } from "./+types/_main.c.$";

export async function loader({ params }: Route.LoaderArgs) {
  const slugs = params["*"].split("/").filter(value => value !== "");

  if (slugs.length === 0 || slugs[0] === "") {
    return redirect("/404");
  }

  const data = await CollectionService.findBySlugPath(slugs);

  if (!data) {
    return redirect("/404");
  }
}

function CollectionsPage({ loaderData: _ }: Route.ComponentProps) {
  return (
    <main>
      hehe
    </main>
  );
}

export default CollectionsPage;
