import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardSiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth/getCurrentUser";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

const DashboardLayout = async ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const session = await getSession();
  if (!session) return redirect("/_not-found");
  if (session.user.role !== "admin") return redirect("/_not-found");
  return (
    <SidebarProvider>
      <DashboardSidebar variant="inset" user={session.user} />
      <SidebarInset>
        <DashboardSiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};
export default DashboardLayout;
