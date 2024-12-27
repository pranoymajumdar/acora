import { Outlet } from 'react-router';
import { AdminSideBar } from '~/components/admin/SideBar';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminSideBar />
      <main className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 md:px-8">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
