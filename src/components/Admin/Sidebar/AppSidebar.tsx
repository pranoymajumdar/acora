import { AcoraLogo } from "@/components/Logo";
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { SidebarNav } from "./SidebarNav";
import { LucideLayers, LucideLayoutDashboard, LucideMoreHorizontal } from "lucide-react";
import { UserMenuDropdown } from "@/components/UserMenuDropdown";
import type { User } from "better-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sidebarNav = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LucideLayoutDashboard },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: LucideLayers,
  },
];

export const AppSidebar = async ({ user }: { user: User }) => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <AcoraLogo size={24} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav items={sidebarNav} />
      </SidebarContent>
      <SidebarFooter>
        <UserMenuDropdown user={user}>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar className="h-8 w-8 rounded-lg grayscale">
              <AvatarImage src={user.image!} alt={user.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">{user.email}</span>
            </div>
            <LucideMoreHorizontal className="ml-auto size-4" />
          </SidebarMenuButton>
        </UserMenuDropdown>
      </SidebarFooter>
    </Sidebar>
  );
};
