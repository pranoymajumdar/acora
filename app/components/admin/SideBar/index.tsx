import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup } from '~/components/ui/sidebar';
import Header from './Header';
import Navigations from './Navigations';

export function AdminSideBar() {
  return (
    <Sidebar collapsible="icon">
      <Header />
      <SidebarContent>
        <Navigations />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
