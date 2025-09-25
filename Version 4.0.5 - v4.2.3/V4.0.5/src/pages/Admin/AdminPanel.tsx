import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Home, Shield, Eye, EyeOff, Lock, ChevronRight, Menu, Users, Database, Activity, AlertTriangle, TrendingUp, Clock, Server, Globe } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { BarChart3, History } from "lucide-react";
import { WebsiteStatsGrid } from "@/components/WebsiteStatsGrid";
import { supabase } from "@/integrations/supabase/client";

const AdminPanel = () => {
  const { user, login, logout } = useAdminAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const isAuthenticated = !!user;

  interface RecentLog {
    id: string;
    maintainer_username: string;
    action_type: string;
    action_description: string;
    created_at: string;
  }
  const [recentLogs, setRecentLogs] = useState<RecentLog[]>([]);
  const [recentLoading, setRecentLoading] = useState(true);

  useEffect(() => {
    const loadRecent = async () => {
      try {
        const { data, error } = await supabase
          .from('maintainer_activity_logs')
          .select('id, maintainer_username, action_type, action_description, created_at')
          .order('created_at', { ascending: false })
          .limit(6);
        if (error) throw error;
        setRecentLogs(data || []);
      } catch (e) {
        console.error('Failed to load recent activity:', e);
      } finally {
        setRecentLoading(false);
      }
    };
    loadRecent();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    
    try {
      const result = await login(username, password);
      
      if (result.success) {
        setUsername("");
        setPassword("");
        toast.success("Access granted - Welcome to the admin panel");
      } else {
        toast.error(result.error || "Access denied - Invalid credentials");
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error("Authentication failed - Please try again");
    }
    
    setLoading(false);
  };

  // Enhanced Admin Login Screen - Matching Website Theme
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated Background - Matching Website */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-blue-500/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse-subtle" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-subtle delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse-subtle delay-2000" />

        {/* Login Container */}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-md animate-fade-in">
            {/* Logo Section - Matching Website Style */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img 
                    src="https://cdn.velocitynet.work/Logos/5DBv3.1.png" 
                    alt="FiveMDB.online" 
                    className="h-16 w-auto hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-xl -z-10" />
                </div>
              </div>
              
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Admin Portal
                </span>
              </h1>
              <p className="text-gray-400 text-lg">Secure access to system management</p>
            </div>

            {/* Enhanced Login Card */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-orange-500/20 backdrop-blur-xl shadow-2xl shadow-orange-500/10">
              <CardHeader className="space-y-1 text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-orange-500/20 rounded-2xl border border-orange-500/30">
                    <Shield className="w-8 h-8 text-orange-400" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-white">Authentication Required</CardTitle>
                <CardDescription className="text-gray-400 text-base">
                  Enter your admin credentials to continue
                </CardDescription>
                
                {/* Discord Login Option */}
                <div className="pt-4">
                  <Link to="/admin/discord-login">
                    <Button 
                      className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white mb-4"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                      Login with Discord
                    </Button>
                  </Link>
                  
                </div>
              </CardHeader>
              <CardContent className="space-y-6">

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 bg-gray-800/30 rounded-lg p-3 border border-gray-700/50">
                    <Shield className="w-4 h-4 text-orange-400" />
                    <span>Protected by enterprise-grade security</span>
                  </div>
                  
                  <div className="text-center">
                    <Button
                      asChild
                      variant="ghost"
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                    >
                      <Link to="/">
                        <Home className="w-4 h-4 mr-2" />
                        Return to Homepage
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced Admin Dashboard with Sidebar
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" style={{ background: 'var(--theme-background)' }}>
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="glass-effect border-b border-white/10 sticky top-0 z-40">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger className="text-white/80 hover:text-white" />
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-orange-600 to-red-600">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gradient">Admin Control Panel</h1>
                      <p className="text-sm text-muted-foreground">System Management</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Link
                    to="/"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg glass-card hover:bg-white/10 transition-all duration-300 text-white/80 hover:text-white"
                  >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout();
                      setPassword("");
                    }}
                    className="border-white/20 hover:bg-white/10 text-white/80 hover:text-white"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Welcome Section */}
              <div className="glass-card p-6 border border-orange-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.display_name || user?.username}</h2>
                    <p className="text-gray-400">Here's what's happening with your system today.</p>
                  </div>
                  <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              {/* Website Statistics Grid */}
              <WebsiteStatsGrid />

              {/* Quick Actions & System Status */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="glass-card p-6 border border-orange-500/20">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-orange-400" />
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link to="/admin/statistics" className="p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg transition-all duration-200 group">
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                        <span className="text-white group-hover:text-blue-400 transition-colors">View Statistics</span>
                      </div>
                    </Link>
                    <Link to="/admin/blacklists" className="p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-all duration-200 group">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-red-400" />
                        <span className="text-white group-hover:text-red-400 transition-colors">Manage Blacklists</span>
                      </div>
                    </Link>
                    <Link to="/admin/database" className="p-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-lg transition-all duration-200 group">
                      <div className="flex items-center space-x-3">
                        <Database className="w-5 h-5 text-purple-400" />
                        <span className="text-white group-hover:text-purple-400 transition-colors">Database Tools</span>
                      </div>
                    </Link>
                    <Link to="/admin/history" className="p-4 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-lg transition-all duration-200 group">
                      <div className="flex items-center space-x-3">
                        <History className="w-5 h-5 text-green-400" />
                        <span className="text-white group-hover:text-green-400 transition-colors">View History</span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* System Status */}
                <div className="glass-card p-6 border border-orange-500/20">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-orange-400" />
                    System Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white">API Service</span>
                      </div>
                      <span className="text-green-400 text-sm font-medium">Operational</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white">Database</span>
                      </div>
                      <span className="text-green-400 text-sm font-medium">Healthy</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="text-white">Edge Functions</span>
                      </div>
                      <span className="text-yellow-400 text-sm font-medium">Degraded</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white">Authentication</span>
                      </div>
                      <span className="text-green-400 text-sm font-medium">Operational</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="glass-card p-6 border border-orange-500/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-orange-400" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {recentLoading ? (
                    <div className="text-gray-400 text-sm">Loading...</div>
                  ) : recentLogs.length === 0 ? (
                    <div className="text-gray-400 text-sm">No recent activity</div>
                  ) : (
                    recentLogs.map((log) => (
                      <div key={log.id} className="flex items-center space-x-4 p-3 hover:bg-white/5 rounded-lg transition-colors">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <Activity className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm">{log.action_description}</p>
                          <p className="text-gray-400 text-xs">{log.maintainer_username} • {new Date(log.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPanel;