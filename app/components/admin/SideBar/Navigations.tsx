import { ChevronRight } from 'lucide-react';
import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '~/components/ui/sidebar';
import siteConfig from '~/configs/site-config';

export default function Navigations() {
  const { pathname } = useLocation();
  const navigations = useMemo<typeof siteConfig.dashboardNav>(
    () => siteConfig.dashboardNav,
    [pathname]
  );
  return Object.keys(navigations).map((key) => (
    <SidebarGroup key={key}>
      <SidebarGroupLabel>{key}</SidebarGroupLabel>
      {
        // @ts-expect-error
        navigations[key].map((item: any) => (
          <SidebarMenu key={item.title}>
            {Object.hasOwn(item, 'childrens') ? (
              <Collapsible key={item.title} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.childrens.map((children: any) => (
                        <SidebarMenuSubItem key={children.title}>
                          <SidebarMenuSubButton asChild>
                            <NavLink to={children.url}>
                              <children.icon />
                              <span>{children.title}</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        ))
      }
    </SidebarGroup>
  ));
}
