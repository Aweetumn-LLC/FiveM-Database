import { useState } from "react";
import { Home, Search, BarChart3, Users, FileText, Gavel, HelpCircle, Star, Wrench, Heart, Server, Shield, ChevronDown, Database, Globe, Code, Scale, Camera, MessageSquareMore, Settings, Zap, TrendingUp, Award, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const location = useLocation();
  const { user } = useAdminAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navigationGroups = [
    {
      id: "info",
      label: "Info",
      icon: Database,
      items: [
        { to: "/creator-release-market", label: "Creator Market", icon: Star },
        { href: "https://nexoradata.ltd", label: "Nexora Data", external: true, icon: Globe },
      ]
    },
    {
      id: "social",
      label: "Connect",
      icon: MessageSquareMore,
      items: [
        { href: "https://discord.fivemdb.net", label: "Discord", external: true, icon: MessageSquareMore },
        { href: "https://insider.fivemdb.net", label: "Contributor", external: true, icon: MessageSquareMore },
        { href: "https://news.fivemdb.net", label: "News", external: true, icon: TrendingUp },
      ]
    },
    {
      id: "compliance",
      label: "Compliance",
      icon: Zap,
      items: [
        { to: "/resource-checker", label: "Resource Checker", icon: Search },
        { to: "/fivem-server-checker", label: "FiveM Server Checker", icon: Server },
      ]
    },
    {
      id: "blacklist",
      label: "Blacklist Tools",
      icon: Shield,
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
      items: [
        { to: "/creator-tools", label: "Creator Suite", icon: Wrench },
      ]
    }
  ];

  return (
    <header className="bg-background/95 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src="https://cdn.velocitynet.work/Logos/5DBv3.1.png" 
                alt="FiveMDB.net" 
                className="h-10 w-auto group-hover:scale-105 transition-all duration-300 drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
            <div>
              <span className="text-foreground font-bold text-lg tracking-tight">FiveM DB</span>
              <p className="text-muted-foreground text-xs font-medium">Community Database</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Home Link */}
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                isActive("/") 
                  ? "bg-primary/20 text-primary" 
                  : "text-foreground/80 hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="font-medium">Home</span>
            </Link>

            {/* Navigation Dropdowns */}
            {navigationGroups.map((group) => (
              <DropdownMenu key={group.id}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                  >
                    <group.icon className="h-4 w-4" />
                    <span className="font-medium">{group.label}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <group.icon className="h-4 w-4" />
                    {group.label}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {group.items.map((item) => (
                    <DropdownMenuItem key={item.label} asChild>
                      {item.external ? (
                        <a 
                          href={item.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                          <Badge variant="outline" className="text-xs ml-auto">external</Badge>
                        </a>
                      ) : (
                        <Link to={item.to!} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}

            {/* Admin Links */}
            {user && (
              <div className="flex items-center gap-1 ml-4 pl-4 border-l border-border/50">
                <Link
                  to="/admin"
                  className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 border border-red-500/20 ${
                    isActive("/admin")
                      ? "bg-red-500/30 text-red-100 border-red-500/30"
                      : "bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-200"
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span className="font-semibold">Admin</span>
                </Link>
                
                {user?.username === 'Maintainer' && (
                  <Link
                    to="/Maintainer"
                    className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 border border-orange-500/20 ${
                      isActive("/Maintainer")
                        ? "bg-orange-500/30 text-orange-100 border-orange-500/30"
                        : "bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 hover:text-orange-200"
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    <span className="font-semibold">Maintainer</span>
                  </Link>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50">
            <div className="space-y-2">
              {/* Home Link */}
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>

              {/* Navigation Groups */}
              {navigationGroups.map((group) => (
                <div key={group.id} className="space-y-1">
                  <div className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-muted-foreground">
                    <group.icon className="h-4 w-4" />
                    {group.label}
                  </div>
                  {group.items.map((item) => (
                    <div key={item.label} className="ml-4">
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                          <Badge variant="outline" className="text-xs ml-auto">external</Badge>
                        </a>
                      ) : (
                        <Link
                          to={item.to!}
                          className="flex items-center gap-3 px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              ))}

              {/* Admin Links */}
              {user && (
                <div className="pt-4 border-t border-border/50 space-y-2">
                  <Link
                    to="/admin"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-200 transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    <span className="font-semibold">Admin Panel</span>
                  </Link>
                  
                  {user?.username === 'Maintainer' && (
                    <Link
                      to="/Maintainer"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 hover:text-orange-200 transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Shield className="h-4 w-4" />
                      <span className="font-semibold">Maintainer Panel</span>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}