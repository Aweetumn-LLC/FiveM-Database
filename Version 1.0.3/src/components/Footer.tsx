
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 px-6 w-full relative overflow-hidden footer-gradient">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <Link to="/" className="text-lg font-display inline-block mb-2">
              FIVEM<span className="text-gradient-alt font-bold">DB</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              A community-driven reports database that aims to improve
              the FiveM ecosystem through transparency and accountability.
            </p>
            <div className="pt-4">
              <div className="inline-flex h-10 animate-shimmer bg-gradient-to-r from-pink-500/20 via-teal-500/30 to-indigo-500/20 bg-[length:400%_100%] rounded-lg px-4 py-2 text-sm font-medium text-white/80">
                Helping build a safer community
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6 text-white/80 font-semibold">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/documentation" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/resource-checker" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Resource Checker
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Reports
                </Link>
              </li>
              <li>
                <Link to="/report-stats" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Report Stats
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/fivem-tos" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  FiveM TOS
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6 text-white/80 font-semibold">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy-policy" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/usage-policy" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Usage of our Service
                </Link>
              </li>
              <li>
                <Link to="/data-policy" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Data Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-6 text-white/80 font-semibold">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://discord.fivemdb.online" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-5 h-5 bg-[#5865F2] rounded-full flex items-center justify-center text-[8px] font-bold">D</span>
                  Discord Community
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/SophiaDLL" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub Repository
                </a>
              </li>
            </ul>
            
            <div className="mt-8 p-4 glass-neo rounded-lg border border-white/10">
              <h5 className="text-sm font-medium mb-2">Stay Connected</h5>
              <p className="text-xs text-white/60 mb-4">Get notified about important updates and new features.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all"
                />
                <button className="absolute right-1 top-1 bg-gradient-to-r from-indigo-500 to-teal-500 px-3 py-1 rounded text-xs font-medium hover:from-indigo-600 hover:to-teal-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-sm text-white/40 font-light tracking-wide flex flex-col md:flex-row justify-between gap-4">
          <div>© {currentYear} FIVEM DB</div>
          <div className="flex items-center gap-6">
            <span className="text-gradient-alt">COMMUNITY DRIVEN REPORTS DATABASE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
