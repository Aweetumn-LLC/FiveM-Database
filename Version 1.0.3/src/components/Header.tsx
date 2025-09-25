
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-4 glass-effect" : "py-8"
      } ${isMobile && mobileMenuOpen ? "bg-[#080818]" : ""}`}
      style={isMobile && mobileMenuOpen ? {backgroundColor: '#080818'} : {}}
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex justify-between items-center">
          <Link to="/reports" className="text-lg font-display tracking-wide minimal-hover relative group">
            FIVEM<span className="text-gradient font-bold">DB</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 lg:space-x-10">
              <li>
                <Link 
                  to="/documentation" 
                  className={`font-light tracking-wide minimal-hover relative group ${
                    isActive("/documentation") ? "text-white" : "text-white/80"
                  }`}
                >
                  DOCUMENTATION
                  {isActive("/documentation") && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 to-purple-500"></span>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/resource-checker" 
                  className={`font-light tracking-wide minimal-hover relative group ${
                    isActive("/resource-checker") ? "text-white" : "text-white/80"
                  }`}
                >
                  RESOURCE CHECKER
                  {isActive("/resource-checker") && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 to-purple-500"></span>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/reports" 
                  className={`font-light tracking-wide minimal-hover relative group ${
                    isActive("/reports") ? "text-white" : "text-white/80"
                  }`}
                >
                  REPORTS
                  {isActive("/reports") && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 to-purple-500"></span>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/report-stats" 
                  className={`font-light tracking-wide minimal-hover relative group ${
                    isActive("/report-stats") ? "text-white" : "text-white/80"
                  }`}
                >
                  REPORT STATS
                  {isActive("/report-stats") && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 to-purple-500"></span>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/partners" 
                  className={`font-light tracking-wide minimal-hover relative group ${
                    isActive("/partners") ? "text-white" : "text-white/80"
                  }`}
                >
                  PARTNERS
                  {isActive("/partners") && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 to-purple-500"></span>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/fivem-tos" 
                  className={`font-light tracking-wide minimal-hover relative group ${
                    isActive("/fivem-tos") ? "text-white" : "text-white/80"
                  }`}
                >
                  FIVEM TOS
                  {isActive("/fivem-tos") && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 to-purple-500"></span>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <a 
                  href="https://discord.fivemdb.online" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-light tracking-wide minimal-hover relative group text-white/80"
                >
                  DISCORD
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <Link 
                  to="/our-ask" 
                  className={`font-light tracking-wide minimal-hover relative group ${
                    isActive("/our-ask") ? "text-white" : "text-white/80"
                  }`}
                >
                  OUR ASK
                  {isActive("/our-ask") && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 to-purple-500"></span>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile navigation menu */}
        {mobileMenuOpen && (
          <nav 
            className="md:hidden mt-6 pb-4 animate-fade-in bg-[#080818]" 
            style={{
              backgroundColor: '#080818',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '0 0 8px 8px'
            }}
          >
            <ul className="flex flex-col space-y-4">
              <li>
                <Link 
                  to="/documentation" 
                  className={`font-light tracking-wide block py-2 ${isActive("/documentation") ? "text-white" : "text-white/70"}`}
                >
                  DOCUMENTATION
                </Link>
              </li>
              <li>
                <Link 
                  to="/resource-checker" 
                  className={`font-light tracking-wide block py-2 ${isActive("/resource-checker") ? "text-white" : "text-white/70"}`}
                >
                  RESOURCE CHECKER
                </Link>
              </li>
              <li>
                <Link 
                  to="/reports" 
                  className={`font-light tracking-wide block py-2 ${isActive("/reports") ? "text-white" : "text-white/70"}`}
                >
                  REPORTS
                </Link>
              </li>
              <li>
                <Link 
                  to="/report-stats" 
                  className={`font-light tracking-wide block py-2 ${isActive("/report-stats") ? "text-white" : "text-white/70"}`}
                >
                  REPORT STATS
                </Link>
              </li>
              <li>
                <Link 
                  to="/partners" 
                  className={`font-light tracking-wide block py-2 ${isActive("/partners") ? "text-white" : "text-white/70"}`}
                >
                  PARTNERS
                </Link>
              </li>
              <li>
                <Link 
                  to="/fivem-tos" 
                  className={`font-light tracking-wide block py-2 ${isActive("/fivem-tos") ? "text-white" : "text-white/70"}`}
                >
                  FIVEM TOS
                </Link>
              </li>
              <li>
                <a 
                  href="https://discord.fivemdb.online" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-light tracking-wide block py-2 text-white/70"
                >
                  DISCORD
                </a>
              </li>
              <li>
                <Link 
                  to="/our-ask" 
                  className={`font-light tracking-wide block py-2 ${isActive("/our-ask") ? "text-white" : "text-white/70"}`}
                >
                  OUR ASK
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
