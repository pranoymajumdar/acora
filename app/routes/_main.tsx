import { Outlet } from "react-router";

import { auth } from "~/.server/auth/config";
import { Header } from "~/shared/components/header";

import type { Route } from "./+types/_main";

export async function loader({ request }: Route.LoaderArgs) {
  const sessionData = await auth.api.getSession({ headers: request.headers });

  return {
    sessionData,
  };
}

function MainLayout({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Header sessionData={loaderData.sessionData} />
      <main className="max-w-screen-2xl mx-auto px-4"><Outlet /></main>
    </>
  );
}

export default MainLayout;
