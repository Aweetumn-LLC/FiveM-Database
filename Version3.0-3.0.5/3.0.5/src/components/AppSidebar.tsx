
import { useState } from "react";
import { Home, Search, BarChart3, Users, FileText, Gavel, HelpCircle, Star, Wrench, Heart, Server, Shield, ChevronDown, Database, Globe, Code, Scale } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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

export function AppSidebar() {
  const location = useLocation();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const [openGroups, setOpenGroups] = useState<string[]>(["tools", "reports", "partners", "resources", "legal"]);

  const isActive = (path: string) => location.pathname === path;

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  // Close mobile sidebar when navigation item is clicked
  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const mainNavItems = [
    { to: "/", label: "Home", icon: Home },
  ];

  const toolsNavItems = [
    { to: "/resource-checker", label: "Resource Checker", icon: Search },
    { to: "/server-checker", label: "Server Checker", icon: Server },
    { to: "/creator-tools", label: "Creator Tools", icon: Wrench },
  ];

  const reportsNavItems = [
    { to: "/reports", label: "Reports", icon: FileText },
    { to: "/report-stats", label: "Statistics", icon: BarChart3 },
  ];

  const partnerNavItems = [
    { to: "/creator-partners", label: "Creator Partners", icon: Star },
    { to: "/recommended-creators", label: "Recommended Creators", icon: Users },
    { to: "/partnered-hosting", label: "Partnered Hosting", icon: Server },
    { to: "/partnered-frameworks", label: "Partnered Frameworks", icon: Code },
    { to: "/partnered-servers", label: "Partnered Servers", icon: Globe },
  ];

  const resourceNavItems = [
    { to: "/fivem-tos", label: "FiveM TOS", icon: Gavel },
    { to: "/our-ask", label: "Our Ask", icon: HelpCircle },
    { to: "/documentation", label: "Documentation", icon: FileText },
  ];

  
  const legalNavItems = [
    { to: "/terms-of-service", label: "Terms of Service", icon: FileText },
    { to: "/usage-policy", label: "Usage Policy", icon: HelpCircle },
    { to: "/data-policy", label: "Data Policy", icon: Database },
    { to: "/how-we-use-your-data", label: "How We Use Your Data", icon: Shield },
    { to: "/legal", label: "Legal Disclaimer", icon: Scale },
    { to: "/privacy-policy", label: "Privacy Policy", icon: Gavel },
  ];

  const quickLinks = [
    { href: "https://discord.fivemdb.online", label: "Discord", external: true, icon: Shield },
    { to: "/donate", label: "Donate", icon: Heart },
  ];

  return (
    <Sidebar 
      className="bg-black border-r border-gray-700" 
      collapsible="icon"
      variant="sidebar"
      side="left"
    >
      <SidebarHeader className="border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group" onClick={handleNavClick}>
            <img 
              src="https://cdn.laurelnwk.com/FiveDB_Transparent.png" 
              alt="FiveMDB Logo" 
              className="h-8 w-auto group-hover:scale-105 transition-transform duration-300"
            />
            {(state === "expanded" || isMobile) && (
              <span className="ml-3 text-white font-semibold">FiveM DB</span>
            )}
          </Link>
          {!isMobile && (
            <SidebarTrigger className="text-white hover:text-orange-400" />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-black">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-400 font-semibold text-xs uppercase tracking-wider">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.to)}
                    className="text-white hover:bg-gray-800 hover:text-orange-400 data-[active=true]:bg-gray-800 data-[active=true]:text-orange-400"
                  >
                    <Link to={item.to} className="flex items-center gap-3" onClick={handleNavClick}>
                      <item.icon className="h-5 w-5" />
                      {(state === "expanded" || isMobile) && <span>{item.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tools */}
        <SidebarGroup>
          <Collapsible 
            open={openGroups.includes("tools")} 
            onOpenChange={() => toggleGroup("tools")}
          >
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="text-orange-400 font-semibold text-xs uppercase tracking-wider flex items-center justify-between w-full hover:text-orange-300">
                Tools
                {(state === "expanded" || isMobile) && (
                  <ChevronDown className={`h-4 w-4 transition-transform ${openGroups.includes("tools") ? "rotate-180" : ""}`} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {toolsNavItems.map((item) => (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive(item.to)}
                        className="text-white hover:bg-gray-800 hover:text-orange-400 data-[active=true]:bg-gray-800 data-[active=true]:text-orange-400"
                      >
                        <Link to={item.to} className="flex items-center gap-3" onClick={handleNavClick}>
                          <item.icon className="h-5 w-5" />
                          {(state === "expanded" || isMobile) && <span>{item.label}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Reports */}
        <SidebarGroup>
          <Collapsible 
            open={openGroups.includes("reports")} 
            onOpenChange={() => toggleGroup("reports")}
          >
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="text-orange-400 font-semibold text-xs uppercase tracking-wider flex items-center justify-between w-full hover:text-orange-300">
                Reports
                {(state === "expanded" || isMobile) && (
                  <ChevronDown className={`h-4 w-4 transition-transform ${openGroups.includes("reports") ? "rotate-180" : ""}`} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {reportsNavItems.map((item) => (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive(item.to)}
                        className="text-white hover:bg-gray-800 hover:text-orange-400 data-[active=true]:bg-gray-800 data-[active=true]:text-orange-400"
                      >
                        <Link to={item.to} className="flex items-center gap-3" onClick={handleNavClick}>
                          <item.icon className="h-5 w-5" />
                          {(state === "expanded" || isMobile) && <span>{item.label}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Partners */}
        <SidebarGroup>
          <Collapsible 
            open={openGroups.includes("partners")} 
            onOpenChange={() => toggleGroup("partners")}
          >
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="text-orange-400 font-semibold text-xs uppercase tracking-wider flex items-center justify-between w-full hover:text-orange-300">
                Partners
                {(state === "expanded" || isMobile) && (
                  <ChevronDown className={`h-4 w-4 transition-transform ${openGroups.includes("partners") ? "rotate-180" : ""}`} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {partnerNavItems.map((item) => (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive(item.to)}
                        className="text-white hover:bg-gray-800 hover:text-orange-400 data-[active=true]:bg-gray-800 data-[active=true]:text-orange-400"
                      >
                        <Link to={item.to} className="flex items-center gap-3" onClick={handleNavClick}>
                          <item.icon className="h-5 w-5" />
                          {(state === "expanded" || isMobile) && <span>{item.label}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Resources */}
        <SidebarGroup>
          <Collapsible 
            open={openGroups.includes("resources")} 
            onOpenChange={() => toggleGroup("resources")}
          >
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="text-orange-400 font-semibold text-xs uppercase tracking-wider flex items-center justify-between w-full hover:text-orange-300">
                Resources
                {(state === "expanded" || isMobile) && (
                  <ChevronDown className={`h-4 w-4 transition-transform ${openGroups.includes("resources") ? "rotate-180" : ""}`} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {resourceNavItems.map((item) => (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive(item.to)}
                        className="text-white hover:bg-gray-800 hover:text-orange-400 data-[active=true]:bg-gray-800 data-[active=true]:text-orange-400"
                      >
                        <Link to={item.to} className="flex items-center gap-3" onClick={handleNavClick}>
                          <item.icon className="h-5 w-5" />
                          {(state === "expanded" || isMobile) && <span>{item.label}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Legal */}
        <SidebarGroup>
          <Collapsible 
            open={openGroups.includes("legal")} 
            onOpenChange={() => toggleGroup("legal")}
          >
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="text-orange-400 font-semibold text-xs uppercase tracking-wider flex items-center justify-between w-full hover:text-orange-300">
                Legal
                {(state === "expanded" || isMobile) && (
                  <ChevronDown className={`h-4 w-4 transition-transform ${openGroups.includes("legal") ? "rotate-180" : ""}`} />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {legalNavItems.map((item) => (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive(item.to)}
                        className="text-white hover:bg-gray-800 hover:text-orange-400 data-[active=true]:bg-gray-800 data-[active=true]:text-orange-400"
                      >
                        <Link to={item.to} className="flex items-center gap-3" onClick={handleNavClick}>
                          <item.icon className="h-5 w-5" />
                          {(state === "expanded" || isMobile) && <span>{item.label}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Quick Links */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-400 font-semibold text-xs uppercase tracking-wider">
            Quick Links
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickLinks.map((link) => (
                <SidebarMenuItem key={link.label}>
                  {link.external ? (
                    <SidebarMenuButton 
                      asChild 
                      className="text-white hover:bg-gray-800 hover:text-orange-400"
                    >
                      <a 
                        href={link.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-3"
                        onClick={handleNavClick}
                      >
                        <link.icon className="h-5 w-5" />
                        {(state === "expanded" || isMobile) && <span>{link.label}</span>}
                      </a>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive(link.to!)}
                      className="text-white hover:bg-gray-800 hover:text-orange-400 data-[active=true]:bg-gray-800 data-[active=true]:text-orange-400"
                    >
                      <Link to={link.to!} className="flex items-center gap-3" onClick={handleNavClick}>
                        <link.icon className="h-5 w-5" />
                        {(state === "expanded" || isMobile) && <span>{link.label}</span>}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
