import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Search, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const popularPages = [
    
    { title: "Resource Checker", path: "/resource-checker", icon: Search },
    { title: "User Blacklist", path: "/user-blacklist", icon: Search },
    { title: "Server Blacklist", path: "/server-blacklist", icon: Search },
    { title: "Store/Hosting Blacklist", path: "/store-blacklist", icon: Search },
    { title: "Discord Blacklist", path: "/discord-blacklist", icon: Search }
  ];

  return (
    <div className="min-h-screen">
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-4xl">
          
          {/* Main 404 Section */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <h1 className="text-8xl md:text-9xl font-bold text-gradient mb-4 leading-none">
                404
              </h1>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                Page Not Found
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                Sorry, the page you're looking for doesn't exist. It might have been moved, 
                deleted, or you entered the wrong URL.
              </p>
            </div>

            {/* URL Info */}
            <Card className="glass-card border-0 mb-8 max-w-2xl mx-auto">
              <CardContent className="p-4">
                <p className="text-sm text-white/50 mb-1">Requested URL:</p>
                <code className="text-red-400 font-mono text-sm break-all">
                  {location.pathname}
                </code>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/">
                <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-6 py-3">
                  <Home className="h-4 w-4" />
                  Go Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="flex items-center gap-2 border-white/20 text-white hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>

          {/* Popular Pages Section */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              Popular Pages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularPages.map((page) => {
                const IconComponent = page.icon;
                return (
                  <Link key={page.path} to={page.path}>
                    <Card className="glass-card border-0 transition-all duration-300 hover:scale-105 hover:bg-white/5">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5 text-blue-400" />
                          <span className="text-white font-medium">{page.title}</span>
                          <ExternalLink className="h-4 w-4 text-white/50 ml-auto" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Help Section */}
          <Card className="glass-card border-0">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-4">
                Still Can't Find What You're Looking For?
              </h3>
              <p className="text-white/70 mb-4">
                If you believe this is an error or need assistance, please contact our support team.
              </p>
              <a 
                href="mailto:autumn@fivemdb.online" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                autumn@fivemdb.online
              </a>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default NotFound;