
import { useState } from "react";
import { Menu, X, Shield, ChevronDown, Home, Search, BarChart3, Users, FileText, Gavel, HelpCircle, Star, Wrench, Heart, Server } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const mainNavItems = [
    { to: "/", label: "Home", icon: Home },
  ];

  const toolsNavItems = [
    { to: "/resource-checker", label: "Checker Tool", icon: Search },
    { to: "/server-checker", label: "Server Checker", icon: Server },
    { to: "/creator-tools", label: "Creator Tools", icon: Wrench },
    { to: "/admin/keywords", label: "Keyword Manager", icon: Shield },
  ];

  const reportsNavItems = [
    { to: "/reports", label: "Reports", icon: FileText },
    { to: "/report-stats", label: "Statistics", icon: BarChart3 },
  ];

  const partnerNavItems = [
    { to: "/creator-partners", label: "Creator Partners", icon: Star },
    { to: "/recommended-creators", label: "Recommended Creators", icon: Users },
    
  ];

  const resourceNavItems = [
    { to: "/fivem-tos", label: "FiveM TOS", icon: Gavel },
    { to: "/our-ask", label: "Our Ask", icon: HelpCircle },
    { to: "/documentation", label: "Documentation", icon: FileText },
  ];

  const quickLinks = [
    { href: "https://discord.fivemdb.online", label: "Discord", external: true },
    { to: "/donate", label: "Donate", icon: Heart },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-600 safe-area-top">
      <div className="responsive-container py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo Section */}
          <div className="flex items-center space-x-3 lg:space-x-6">
            <Link 
              to="/" 
              className="flex items-center group hover:opacity-90 transition-all duration-300"
            >
              <div className="relative">
                <img 
                  src="https://cdn.laurelnwk.com/FiveDB_Transparent.png" 
                  alt="FiveMDB Logo" 
                  className="h-7 sm:h-8 lg:h-10 w-auto group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-lg"></div>
              </div>
            </Link>
            
            {/* Quick Action Links */}
            <div className="hidden sm:flex items-center space-x-4 lg:space-x-5">
              {quickLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-orange-400 transition-colors duration-300 text-sm lg:text-base font-medium mobile-touch-target"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to!}
                    className={`flex items-center gap-1 transition-colors duration-300 text-sm lg:text-base font-medium mobile-touch-target ${
                      isActive(link.to!) ? "text-orange-400" : "text-white/70 hover:text-orange-400"
                    }`}
                  >
                    {link.icon && <link.icon className="h-4 w-4" />}
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 2xl:space-x-2">
            {/* Main Navigation */}
            {mainNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm 2xl:text-base font-medium ${
                  isActive(item.to) 
                    ? "bg-gray-800 text-orange-400" 
                    : "text-white/70 hover:text-white hover:bg-gray-800"
                }`}
              >
                <item.icon className="h-4 w-4 2xl:h-5 2xl:w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
            
            {/* Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-white/70 hover:text-white hover:bg-gray-800 px-3 py-2 h-auto font-medium text-sm 2xl:text-base rounded-lg transition-all duration-300 group"
                >
                  <Wrench className="h-4 w-4 2xl:h-5 2xl:w-5 mr-2" />
                  Tools 
                  <ChevronDown className="ml-2 h-3 w-3 2xl:h-4 2xl:w-4 group-hover:rotate-180 transition-transform duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-black border-gray-600">
                <div className="p-2">
                  <div className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2 px-2">
                    Community Tools
                  </div>
                  {toolsNavItems.map((item) => (
                    <DropdownMenuItem key={item.to} asChild>
                      <Link 
                        to={item.to} 
                        className="flex items-center space-x-3 text-white/80 hover:text-white hover:bg-gray-800 rounded-md px-2 py-2 transition-colors duration-200"
                      >
                        <item.icon className="h-4 w-4 text-orange-400" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Reports Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-white/70 hover:text-white hover:bg-gray-800 px-3 py-2 h-auto font-medium text-sm 2xl:text-base rounded-lg transition-all duration-300 group"
                >
                  <BarChart3 className="h-4 w-4 2xl:h-5 2xl:w-5 mr-2" />
                  Reports 
                  <ChevronDown className="ml-2 h-3 w-3 2xl:h-4 2xl:w-4 group-hover:rotate-180 transition-transform duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-black border-gray-600">
                <div className="p-2">
                  <div className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2 px-2">
                    Reports & Analytics
                  </div>
                  {reportsNavItems.map((item) => (
                    <DropdownMenuItem key={item.to} asChild>
                      <Link 
                        to={item.to} 
                        className="flex items-center space-x-3 text-white/80 hover:text-white hover:bg-gray-800 rounded-md px-2 py-2 transition-colors duration-200"
                      >
                        <item.icon className="h-4 w-4 text-orange-400" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Enhanced Partners Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-white/70 hover:text-white hover:bg-gray-800 px-3 py-2 h-auto font-medium text-sm 2xl:text-base rounded-lg transition-all duration-300 group"
                >
                  <Users className="h-4 w-4 2xl:h-5 2xl:w-5 mr-2" />
                  Partners 
                  <ChevronDown className="ml-2 h-3 w-3 2xl:h-4 2xl:w-4 group-hover:rotate-180 transition-transform duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-black border-gray-600">
                <div className="p-2">
                  <div className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2 px-2">
                    Our Partners
                  </div>
                  {partnerNavItems.map((item) => (
                    <DropdownMenuItem key={item.to} asChild>
                      <Link 
                        to={item.to} 
                        className="flex items-center space-x-3 text-white/80 hover:text-white hover:bg-gray-800 rounded-md px-2 py-2 transition-colors duration-200"
                      >
                        <item.icon className="h-4 w-4 text-orange-400" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Enhanced Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-white/70 hover:text-white hover:bg-gray-800 px-3 py-2 h-auto font-medium text-sm 2xl:text-base rounded-lg transition-all duration-300 group"
                >
                  <FileText className="h-4 w-4 2xl:h-5 2xl:w-5 mr-2" />
                  Resources 
                  <ChevronDown className="ml-2 h-3 w-3 2xl:h-4 2xl:w-4 group-hover:rotate-180 transition-transform duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-black border-gray-600">
                <div className="p-2">
                  <div className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2 px-2">
                    Information & Guides
                  </div>
                  {resourceNavItems.map((item) => (
                    <DropdownMenuItem key={item.to} asChild>
                      <Link 
                        to={item.to} 
                        className="flex items-center space-x-3 text-white/80 hover:text-white hover:bg-gray-800 rounded-md px-2 py-2 transition-colors duration-200"
                      >
                        <item.icon className="h-4 w-4 text-orange-400" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="xl:hidden flex items-center justify-center w-10 h-10 text-white/70 hover:text-white hover:bg-gray-800 transition-all duration-300 mobile-touch-target rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 rotate-90 transition-transform duration-300" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
          {isMenuOpen && (
            <nav className="xl:hidden mt-6 pb-6 border-t border-gray-600 pt-6 mobile-nav-menu rounded-xl bg-black">
            <div className="space-y-2">
              {/* Mobile Main Navigation */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-3 px-3">
                  Main Navigation
                </div>
                {mainNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 mobile-touch-target ${
                      isActive(item.to) 
                        ? "bg-gray-800 text-orange-400" 
                        : "text-white/70 hover:text-white hover:bg-gray-800"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Tools Section */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-3 px-3">
                  Community Tools
                </div>
                {toolsNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 mobile-touch-target ${
                      isActive(item.to) 
                        ? "bg-orange-500/20 text-orange-400 shadow-lg shadow-orange-500/10" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Reports Section */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-3 px-3">
                  Reports & Analytics
                </div>
                {reportsNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 mobile-touch-target ${
                      isActive(item.to) 
                        ? "bg-orange-500/20 text-orange-400 shadow-lg shadow-orange-500/10" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Partners Section */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-3 px-3">
                  Partners
                </div>
                {partnerNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 mobile-touch-target ${
                      isActive(item.to) 
                        ? "bg-orange-500/20 text-orange-400 shadow-lg shadow-orange-500/10" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Resources Section */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-3 px-3">
                  Resources & Information
                </div>
                {resourceNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 mobile-touch-target ${
                      isActive(item.to) 
                        ? "bg-orange-500/20 text-orange-400 shadow-lg shadow-orange-500/10" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Quick Links */}
              <div className="border-t border-white/10 pt-4">
                <div className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-3 px-3">
                  Quick Links
                </div>
                {quickLinks.map((link) => (
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-white/70 hover:text-white hover:bg-white/10 mobile-touch-target"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield className="h-5 w-5" />
                      <span className="font-medium">{link.label}</span>
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.to!}
                       className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 mobile-touch-target ${
                         isActive(link.to!) 
                           ? "bg-orange-500/20 text-orange-400 shadow-lg shadow-orange-500/10" 
                           : "text-white/70 hover:text-white hover:bg-white/10"
                       }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon ? <link.icon className="h-5 w-5" /> : <Star className="h-5 w-5" />}
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  )
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
