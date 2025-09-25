import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background/95 backdrop-blur-xl border-t border-border/50 mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-6 flex flex-col md:flex-row items-center justify-between pb-8 border-b border-border/30">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <img 
                src="https://zwrks.com/cdn/NexoraData/Logo_Holo_Transparent_White.png" 
                alt="NexoraData Logo" 
                className="h-12 w-auto"
              />
              <div>
                <p className="text-foreground font-semibold">FiveM Database</p>
                <p className="text-muted-foreground text-sm">Powered by NexoraData</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Copyright © NexoraData 2025
            </p>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Info</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/creator-release-market" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Creator Market
                </Link>
              </li>
              <li>
                <a 
                  href="https://nexoradata.ltd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Nexora Data
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://discord.fivemdb.net" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Discord
                </a>
              </li>
              <li>
                <a 
                  href="https://insider.fivemdb.net" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Contributor
                </a>
              </li>
              <li>
                <a 
                  href="https://news.fivemdb.net" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  News
                </a>
              </li>
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Compliance</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/resource-checker" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Resource Checker
                </Link>
              </li>
              <li>
                <Link 
                  to="/fivem-server-checker" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  FiveM Server Checker
                </Link>
              </li>
            </ul>
          </div>

          {/* Blacklist Tools */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Blacklist Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/user-blacklist-checker" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  User Checker
                </Link>
              </li>
              <li>
                <Link 
                  to="/store-blacklist-checker" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Store Checker
                </Link>
              </li>
              <li>
                <Link 
                  to="/server-blacklist-checker" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Server Checker
                </Link>
              </li>
              <li>
                <Link 
                  to="/discord-blacklist-checker" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Discord Checker
                </Link>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Partners</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/creator-partners" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Creator Partners
                </Link>
              </li>
              <li>
                <Link 
                  to="/partnered-hosting" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Hosting Partners
                </Link>
              </li>
              <li>
                <Link 
                  to="/partnered-servers" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Partner Servers
                </Link>
              </li>
              <li>
                <Link 
                  to="/content-creators" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Content Creators
                </Link>
              </li>
            </ul>
          </div>

          {/* Creator Tools */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Creator Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/creator-tools" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Creator Suite
                </Link>
              </li>
            </ul>
          </div>

          {/* FiveM Database Legal */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">FiveM Database Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/terms-of-service" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/usage-policy" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Usage Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/data-policy" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Data Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/legal" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Legal Disclaimer
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/fivem-tos" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  FiveM TOS
                </Link>
              </li>
            </ul>
          </div>

          {/* About FiveM Database */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">About FiveM Database</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/what-is-fivem-db" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  About FiveM DB
                </Link>
              </li>
              <li>
                <Link 
                  to="/who-is-fivem-db" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link 
                  to="/seal-of-approval" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Seal of Approval
                </Link>
              </li>
            </ul>
          </div>

          {/* How Our Systems Work */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">How Our Systems Work</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/tool-info/blacklist-system" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Blacklist System Info
                </Link>
              </li>
              <li>
                <Link 
                  to="/tool-info/compliance-tools" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Compliance System Info
                </Link>
              </li>
            </ul>
          </div>

          {/* FiveM Info */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">FiveM Info</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/fivem-tos" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  FiveM TOS
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}