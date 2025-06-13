import { Outlet } from "react-router";

import { auth } from "~/features/auth/lib/auth.server";
import { Header } from "~/shared/components/header";

import type { Route } from "./+types/_main";
import { getShops } from "~/features/shop/service";

export async function loader({ request }: Route.LoaderArgs) {
  const sessionData = await auth.api.getSession({ headers: request.headers });
  const shop = await getShops();

  return {
    sessionData,
    shop,
  };
}

function MainLayout({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Header sessionData={loaderData.sessionData} shop={loaderData.shop} />
      <main className="max-w-screen-2xl mx-auto px-4"><Outlet /></main>
    </>
  );
}

export default MainLayout;
