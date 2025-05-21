import { AcoraLogo } from "@/components/shared/logo";
import { NavUser } from "@/components/shared/nav-user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import type { User } from "@/lib/auth-client";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  LucideLayers,
  LucideLayoutDashboard,
  LucideMoreVertical,
  LucidePackage,
} from "lucide-react";
import { NavMain } from "./nav-main";

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
];

export const DashboardSidebar = ({ user }: { user: User }) => {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <AcoraLogo size={20} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navLinks} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user}>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar className="h-8 w-8 rounded-lg grayscale">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-muted-foreground text-xs">
                {user.email}
              </span>
            </div>
            <LucideMoreVertical className="ml-auto size-4" />
          </SidebarMenuButton>
        </NavUser>
      </SidebarFooter>
    </Sidebar>
  );
};
