import { NavLink, useLocation } from "react-router-dom";
import { Home, BarChart3, History, Shield, Database, UserCog, Star, Server } from "lucide-react";
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

const adminMenuItems = [
  { title: "Home", url: "/admin", icon: Home },
  { title: "Statistics", url: "/admin/statistics", icon: BarChart3 },
  { title: "History", url: "/admin/history", icon: History },
  { title: "Blacklists", url: "/admin/blacklists", icon: Shield },
  { title: "Database", url: "/admin/database", icon: Database },
  { title: "Partners", url: "/admin/partners", icon: History },
  { title: "Featured Creators", url: "/admin/featured-creators", icon: Star },
  { title: "Creator Market", url: "/admin/creator-market", icon: Star },
  { title: "Maintainer", url: "/Maintainer", icon: UserCog },
];

export function AdminSidebar() {
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
            Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
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