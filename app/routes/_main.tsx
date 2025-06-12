import { Outlet } from "react-router";

import { auth } from "~/features/auth/lib/auth.server";
import { CollectionService } from "~/features/collections/service";
import { Header } from "~/shared/components/header";

import type { Route } from "./+types/_main";

export async function loader({ request }: Route.LoaderArgs) {
  const sessionData = await auth.api.getSession({ headers: request.headers });
  const collections = await CollectionService.getCollectionHierarchy();
  return {
    sessionData,
    collections,
  };
}

function MainLayout({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Header sessionData={loaderData.sessionData} collections={loaderData.collections} />
      <main className="max-w-screen-2xl mx-auto px-4"><Outlet /></main>
    </>
  );
}

export default MainLayout;
