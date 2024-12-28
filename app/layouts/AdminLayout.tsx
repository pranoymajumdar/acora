import { Outlet } from 'react-router';
import Header from '~/components/admin/Header';

export default function DashboardLayout() {
  return (
    <main className="flex flex-col gap-5">
      <Header />
      <Outlet />
    </main>
  );
}
