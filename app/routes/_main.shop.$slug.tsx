import { getShop } from "~/features/shop/service";
import type { Route } from "./+types/_main.shop.$slug";


export async function loader({ params }: Route.LoaderArgs) {
  const shop = await getShop(params.slug);

  return { shop };
}

function CollectionsPage({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      <code>
        <pre>
          {
            JSON.stringify(loaderData.shop, null, 4)
          }

        </pre>
      </code>
    </main>
  );
}

export default CollectionsPage;
