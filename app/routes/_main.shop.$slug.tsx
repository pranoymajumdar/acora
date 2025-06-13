import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "~/lib/trpc";

import type { Route } from "./+types/_main.shop.$slug";

function CollectionsPage({ params }: Route.ComponentProps) {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.shop.findBySlug.queryOptions({
    slug: params.slug,
  }));
  return (
    <main>
      <code>
        <pre>
          {JSON.stringify(data, null, 4)}
        </pre>
      </code>
    </main>
  );
}

export default CollectionsPage;
