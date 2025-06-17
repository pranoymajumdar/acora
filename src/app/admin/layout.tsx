import { AppSidebar } from "@/components/Admin/Sidebar";
import { SiteHeader } from "@/components/Admin/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";

const AdminLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (!data?.session) {
    return redirect("not-found");
  }
  return (
    <SidebarProvider>
      <AppSidebar user={data.user} />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
