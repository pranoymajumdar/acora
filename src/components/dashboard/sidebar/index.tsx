"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { SessionUserType } from "@/lib/auth/core/session";
import type { ComponentProps } from "react";
import {
  LucideLayers,
  LucideLayoutDashboard,
  LucidePackage,
  LucideShoppingCart,
} from "lucide-react";
import { AcoraLogo } from "@/components/logo";
import { SidebarUser } from "./sidebar-user";
import { SidebarNav } from "./sidebar-nav";

const navLinks = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LucideLayoutDashboard,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: LucideLayers,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: LucidePackage,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: LucideShoppingCart,
  },
];

export const DashboardSidebar = ({
  user,
  ...props
}: ComponentProps<typeof Sidebar> & { user: SessionUserType }) => {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <AcoraLogo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav items={navLinks} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};
