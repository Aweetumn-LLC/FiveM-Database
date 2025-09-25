import { useState } from "react";
import { Home, Search, BarChart3, Users, FileText, Gavel, HelpCircle, Star, Wrench, Heart, Server, Shield, ChevronRight, Database, Globe, Code, Scale, Camera, MessageSquareMore, Settings, Zap, TrendingUp, Award} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

export function ModernAppSidebar() {
  const location = useLocation();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const { user } = useAdminAuth();
  const [openGroups, setOpenGroups] = useState<string[]>(["info", "social", "CFXInfo", "Information", "compliance", "blacklist", "partners", "tools", "legal"]);

  const isActive = (path: string) => location.pathname === path;

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const sidebarGroups = [
    {
      id: "info",
      label: "Info",
      icon: Database,
      color: "text-cyan-400",
      items: [
        { to: "/creator-release-market", label: "Creator Market", icon: Star },
        { href: "https://nexoradata.ltd", label: "Nexora Data", external: true, icon: Globe },
      ]
    },
    {
      id: "social",
      label: "Connect",
      icon: MessageSquareMore,
      color: "text-blue-400",
      items: [
        { href: "https://discord.fivemdb.net", label: "Discord", external: true, icon: MessageSquareMore },
        { href: "https://insider.fivemdb.net", label: "Contributor", external: true, icon: MessageSquareMore },
        { href: "https://news.fivemdb.net", label: "News", external: true, icon: TrendingUp },
      ]
    },
    {
      id: "CFXInfo",
      label: "CFX Info",
      icon: HelpCircle,
      color: "text-yellow-400",
      items: 
      [ 
        { to: "/fivem-tos", label: "FiveM TOS", icon: Gavel }
      ]
    },
    {
      id: "Information",
      label: "Information", 
      icon: HelpCircle,
      color: "text-yellow-400",
      items: 
      [ 
        { to: "/what-is-fivem-db", label: "About FiveM DB", icon: HelpCircle },
        { to: "/who-is-fivem-db", label: "Our Team", icon: Users },
        { to: "/tool-info/blacklist-system", label: "Blacklist System Info", icon: HelpCircle },
        { to: "/tool-info/compliance-tools", label: "Compliance System Info", icon: Users }
      ]
    },
    {
      id: "compliance",
      label: "Compliance",
      icon: Zap,
      color: "text-yellow-400",
      items: [
        { to: "/resource-checker", label: "Resource Checker", icon: Search },
        { to: "/fivem-server-checker", label: "FiveM Server Checker", icon: Server },
      ]
    },
    {
      id: "blacklist",
      label: "Blacklist Tools",
      icon: Shield,
      color: "text-red-400",
      items: [
        { to: "/user-blacklist-checker", label: "User Checker", icon: Search },
        { to: "/store-blacklist-checker", label: "Store Checker", icon: Search },
        { to: "/server-blacklist-checker", label: "Server Checker", icon: Search },
        { to: "/discord-blacklist-checker", label: "Discord Checker", icon: Search },
      ]
    },
    {
      id: "partners",
      label: "Partners",
      icon: Award,
      color: "text-purple-400",
      items: [
        { to: "/creator-partners", label: "Creator Partners", icon: Star },
        { to: "/partnered-hosting", label: "Hosting Partners", icon: Server },
        { to: "/partnered-servers", label: "Partner Servers", icon: Globe },
        { to: "/content-creators", label: "Content Creators", icon: Camera }
      ]
    },
    {
      id: "tools",
      label: "Creator Tools",
      icon: Wrench,
      color: "text-orange-400",
      items: [
        { to: "/creator-tools", label: "Creator Suite", icon: Wrench },
      ]
    },
    {
      id: "contact",
      label: "Contact",
      icon: MessageSquareMore,
      color: "text-gray-400",
      items: [
        { to: "/terms-of-service", label: "Terms of Service", icon: FileText },
        { to: "/usage-policy", label: "Usage Policy", icon: HelpCircle },
        { to: "/data-policy", label: "Data Policy", icon: Database },
        { to: "/how-we-use-your-data", label: "Data Usage", icon: Shield },
        { to: "/legal", label: "Legal Disclaimer", icon: Scale },
        { to: "/privacy-policy", label: "Privacy Policy", icon: Gavel },
      ]
    }
  ];

  return (
    <Sidebar 
      className="border-r border-sidebar-border/50 backdrop-blur-xl bg-sidebar-background/95" 
      collapsible="icon"
      variant="sidebar"
      side="left"
    >
      <SidebarHeader className="border-b border-sidebar-border/50 p-6 bg-gradient-to-r from-sidebar-background/50 to-sidebar-accent/30">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group" onClick={handleNavClick}>
            <div className="relative">
              <img 
                src="https://cdn.velocitynet.work/Logos/5DBv3.1.png" 
                alt="FiveMDB.net" 
                className="h-10 w-auto group-hover:scale-105 transition-all duration-300 drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
            {(state === "expanded" || isMobile) && (
              <div className="ml-4">
                <span className="text-foreground font-bold text-lg tracking-tight">FiveM DB</span>
                <p className="text-muted-foreground text-xs font-medium">Community Database</p>
              </div>
            )}
          </Link>
          {!isMobile && (
            <SidebarTrigger className="text-muted-foreground hover:text-primary transition-colors duration-200" />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar-background/50 backdrop-blur-sm">
        {/* Admin Panel - Enhanced styling */}
        {user && (
          <SidebarGroup className="px-4 py-3">
            <SidebarGroupLabel className="text-red-400 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Administration
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive("/admin")}
                    className="group relative overflow-hidden rounded-xl border border-red-500/20 bg-gradient-to-r from-red-500/10 to-red-600/10 hover:from-red-500/20 hover:to-red-600/20 text-white hover:text-red-200 data-[active=true]:from-red-500/30 data-[active=true]:to-red-600/30 data-[active=true]:text-red-100 transition-all duration-300"
                  >
                    <Link to="/admin" className="flex items-center gap-3 p-3" onClick={handleNavClick}>
                      <Settings className="h-5 w-5 text-red-400 group-hover:scale-110 transition-transform duration-200" />
                      {(state === "expanded" || isMobile) && (
                        <div className="flex-1">
                          <span className="font-semibold">Admin Panel</span>
                          <p className="text-xs opacity-70">System control</p>
                        </div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {user?.username === 'Maintainer' && (
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive("/Maintainer")}
                      className="group relative overflow-hidden rounded-xl border border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-orange-600/10 hover:from-orange-500/20 hover:to-orange-600/20 text-white hover:text-orange-200 data-[active=true]:from-orange-500/30 data-[active=true]:to-orange-600/30 data-[active=true]:text-orange-100 transition-all duration-300"
                    >
                      <Link to="/Maintainer" className="flex items-center gap-3 p-3" onClick={handleNavClick}>
                        <Shield className="h-5 w-5 text-orange-400 group-hover:scale-110 transition-transform duration-200" />
                        {(state === "expanded" || isMobile) && (
                          <div className="flex-1">
                            <span className="font-semibold">Maintainer</span>
                            <p className="text-xs opacity-70">Core systems</p>
                          </div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Navigation Groups */}
        {sidebarGroups.map((group) => (
          <Collapsible
            key={group.id}
            open={openGroups.includes(group.id)}
            onOpenChange={() => toggleGroup(group.id)}
          >
            <SidebarGroup className="px-4 py-2">
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className={`${group.color} font-semibold text-xs uppercase tracking-wider cursor-pointer hover:text-primary transition-colors duration-200 flex items-center justify-between group mb-2`}>
                  <div className="flex items-center gap-2">
                    <group.icon className="h-4 w-4" />
                    {(state === "expanded" || isMobile) && group.label}
                  </div>
                  {(state === "expanded" || isMobile) && (
                    <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${openGroups.includes(group.id) ? 'rotate-90' : ''}`} />
                  )}
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="space-y-1">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        {item.external ? (
                          <SidebarMenuButton 
                            asChild 
                            className="group relative overflow-hidden rounded-lg hover:bg-sidebar-hover hover:text-primary transition-all duration-200 border border-transparent hover:border-primary/20"
                          >
                            <a 
                              href={item.href} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex items-center gap-3 p-2"
                              onClick={handleNavClick}
                            >
                              <item.icon className="h-4 w-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200" />
                               {(state === "expanded" || isMobile) && (
                                 <div className="flex-1 min-w-0">
                                   <div className="flex items-center gap-2">
                                     <span className="font-medium truncate">{item.label}</span>
                                     <Badge variant="outline" className="text-xs px-1 py-0">external</Badge>
                                   </div>
                                 </div>
                               )}
                            </a>
                          </SidebarMenuButton>
                        ) : (
                          <SidebarMenuButton 
                            asChild 
                            isActive={isActive(item.to!)}
                            className="group relative overflow-hidden rounded-lg hover:bg-sidebar-hover hover:text-primary data-[active=true]:bg-primary/20 data-[active=true]:text-primary data-[active=true]:border-primary/30 transition-all duration-200 border border-transparent hover:border-primary/20"
                          >
                            <Link to={item.to!} className="flex items-center gap-3 p-2" onClick={handleNavClick}>
                              <item.icon className="h-4 w-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200" />
                               {(state === "expanded" || isMobile) && (
                                 <div className="flex-1 min-w-0">
                                   <span className="font-medium truncate">{item.label}</span>
                                 </div>
                               )}
                            </Link>
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}