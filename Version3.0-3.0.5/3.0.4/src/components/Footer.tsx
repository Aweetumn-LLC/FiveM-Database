
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative py-16 px-6 mt-auto">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      <div className="absolute inset-0 border-t border-white/5 bg-white/[0.02] backdrop-blur-sm"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-display inline-block mb-6 hover:text-blue-400 transition-colors">
              FIVEM<span className="text-blue-400 font-bold">DB</span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-6 max-w-md">
              A community-driven reports database that aims to improve
              the FiveM ecosystem through transparency and accountability.
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="https://discord.fivemdb.online" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-blue-400 transition-colors flex items-center gap-2 group"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  💬
                </div>
                Discord
              </a>
              <a 
                href="https://github.com/SophiaDLL" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-blue-400 transition-colors flex items-center gap-2 group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Github className="w-4 h-4" />
                </div>
                GitHub
              </a>
            </div>
          </div>
          
          {/* Legal section */}
          <div>
            <h4 className="text-sm font-semibold mb-6 text-white/90">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy-policy" className="text-sm text-white/60 hover:text-white transition-colors block py-1">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-sm text-white/60 hover:text-white transition-colors block py-1">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/usage-policy" className="text-sm text-white/60 hover:text-white transition-colors block py-1">
                  Usage Policy
                </Link>
              </li>
              <li>
                <Link to="/data-policy" className="text-sm text-white/60 hover:text-white transition-colors block py-1">
                  Data Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links section */}
          <div>
            <h4 className="text-sm font-semibold mb-6 text-white/90">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/reports" className="text-sm text-white/60 hover:text-white transition-colors block py-1">
                  Reports
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-sm text-white/60 hover:text-white transition-colors block py-1">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/creator-tools" className="text-sm text-white/60 hover:text-white transition-colors block py-1">
                  Creator Tools
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-sm text-white/60 hover:text-white transition-colors block py-1">
                  Support Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with enhanced styling */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-white/50 text-center md:text-left">
              © {currentYear} FIVEM DB - Community Driven Reports Database
            </div>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <span>Made with ❤️ for the FiveM community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
