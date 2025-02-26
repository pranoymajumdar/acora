import { Outlet } from "react-router";
import Header from "~/components/site/header/header";

export default function MainLayout() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}
