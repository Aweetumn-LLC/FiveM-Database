import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, UserPlus, ShieldCheck, Settings, Database, Upload, Download, UserCog, Shield } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const maintainerMenuItems = [
  { title: "Dashboard", url: "/Maintainer", icon: LayoutDashboard },
  { title: "Add Admins", url: "/Maintainer/admins/add", icon: UserPlus },
  { title: "Add Maintainers", url: "/Maintainer/maintainers/add", icon: UserCog },
  { title: "Edit Admin Permissions", url: "/Maintainer/admins/permissions", icon: ShieldCheck },
  { title: "Edit Maintainer Permissions", url: "/Maintainer/maintainers/permissions", icon: ShieldCheck },
  { title: "Database Exports", url: "/Maintainer/exports", icon: Download },
  { title: "Database Imports", url: "/Maintainer/imports", icon: Upload },
  { title: "Website Settings", url: "/Maintainer/settings", icon: Settings },
  { title: "Admin Panel", url: "/admin", icon: Shield },
];

export function MaintainerSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary/15 text-primary border-primary/30 shadow-[0_0_0_1px_hsl(var(--primary)/0.15)]"
      : "hover:bg-foreground/5 text-foreground/80 hover:text-foreground";

  return (
    <Sidebar className="w-60 bg-background/60 border border-border backdrop-blur-xl animate-fade-in">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">
            Maintainer Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {maintainerMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 border border-transparent ${getNavCls({ isActive })}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default MaintainerSidebar;
