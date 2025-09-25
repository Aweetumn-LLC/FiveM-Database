import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { History, Search, Server, Shield, User, Store, MessageCircle, Clock, Home } from "lucide-react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";

interface HistoryItem {
  id: string;
  created_at: string;
  checked_at?: string;
  search_query?: string;
  search_type?: string;
  is_blacklisted?: boolean;
  violation_keywords?: string[];
  connection_code?: string;
  server_data?: any;
  status?: string;
  error_message?: string;
  result_found?: boolean;
  ip_address?: string;
  country?: string;
}

const AdminHistory = () => {
  const [resourceHistory, setResourceHistory] = useState<HistoryItem[]>([]);
  const [serverHistory, setServerHistory] = useState<HistoryItem[]>([]);
  const [blacklistHistory, setBlacklistHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllHistory();
  }, []);

  const fetchAllHistory = async () => {
    try {
      setLoading(true);
      
      // Fetch resource checker history
      const { data: resourceData } = await supabase
        .from('resource_searches')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      // Fetch server checker history
      const { data: serverData } = await supabase
        .from('server_checks')
        .select('*, checked_at')
        .order('checked_at', { ascending: false })
        .limit(100);

      // Fetch blacklist search history
      const { data: blacklistData } = await supabase
        .from('search_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      setResourceHistory(resourceData || []);
      // Add created_at from checked_at for server data
      const formattedServerData = (serverData || []).map(item => ({
        ...item,
        created_at: item.checked_at || new Date().toISOString()
      }));
      setServerHistory(formattedServerData);
      setBlacklistHistory(blacklistData || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSearchTypeIcon = (type: string) => {
    switch (type) {
      case 'user': return <User className="w-4 h-4" />;
      case 'server': return <Server className="w-4 h-4" />;
      case 'store': return <Store className="w-4 h-4" />;
      case 'discord': return <MessageCircle className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm:ss');
  };

  if (loading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <History className="w-8 h-8 text-orange-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Loading History...</h2>
        </div>
      </div>
    );
  }

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
                      <History className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gradient">History Dashboard</h1>
                      <p className="text-sm text-muted-foreground">Complete activity history</p>
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
                    onClick={logout}
                    className="border-white/20 hover:bg-white/10 text-white/80 hover:text-white"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="w-full mx-auto space-y-6">
              <Tabs defaultValue="resource" className="space-y-6">
                <TabsList className="grid w-full grid-cols-6 bg-gray-900/50 border border-orange-500/20">
                  <TabsTrigger value="resource" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                    Resource Checker
                  </TabsTrigger>
                  <TabsTrigger value="server" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                    Server Checker
                  </TabsTrigger>
                  <TabsTrigger value="user" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                    User Blacklist
                  </TabsTrigger>
                  <TabsTrigger value="serverbl" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                    Server Blacklist
                  </TabsTrigger>
                  <TabsTrigger value="store" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                    Store/Hosting Blacklist
                  </TabsTrigger>
                  <TabsTrigger value="discord" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                    Discord Blacklist
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="resource" className="space-y-4">
                  <Card className="glass-card border-orange-500/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-2">
                        <Search className="w-5 h-5 text-orange-400" />
                        <span>Resource Checker History</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[500px]">
                        <div className="space-y-3">
                          {resourceHistory.map((item) => (
                            <div key={item.id} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <Search className="w-4 h-4 text-blue-400" />
                                  <span className="text-white font-medium">{item.search_query}</span>
                                  {item.is_blacklisted ? (
                                    <Badge variant="destructive">Blacklisted</Badge>
                                  ) : (
                                    <Badge variant="secondary">Clean</Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-400 text-sm">{formatDate(item.created_at)}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate(`/resource-checker?q=${encodeURIComponent(item.search_query || '')}`)}
                                  >
                                    Copy search
                                  </Button>
                                </div>
                              </div>
                              {item.violation_keywords && item.violation_keywords.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-gray-400 text-sm">Violations:</p>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {item.violation_keywords.map((keyword, i) => (
                                      <Badge key={i} variant="outline" className="text-xs">
                                        {keyword}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {item.country && (
                                <p className="text-gray-400 text-sm mt-2">Location: {item.country}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="server" className="space-y-4">
                  <Card className="glass-card border-orange-500/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-2">
                        <Server className="w-5 h-5 text-orange-400" />
                        <span>Server Checker History</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[500px]">
                        <div className="space-y-3">
                            {serverHistory.map((item) => (
                              <div key={item.id} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <Server className="w-4 h-4 text-green-400" />
                                    <span className="text-white font-medium">{item.connection_code}</span>
                                    <Badge variant={item.status === 'success' ? 'secondary' : 'destructive'}>
                                      {item.status}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-400 text-sm">{formatDate(item.checked_at || item.created_at)}</span>
                                  </div>
                                </div>
                                {item.server_data && (
                                  <div className="mt-2">
                                    <p className="text-gray-400 text-sm">Server: {item.server_data.Data?.hostname || 'Unknown'}</p>
                                    {item.server_data.Data?.clients !== undefined && (
                                      <p className="text-gray-400 text-sm">
                                        Players: {item.server_data.Data.clients}/{item.server_data.Data.sv_maxclients}
                                      </p>
                                    )}
                                  </div>
                                )}
                                {item.error_message && (
                                  <p className="text-red-400 text-sm mt-2">Error: {item.error_message}</p>
                                )}
                              </div>
                            ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                {['user', 'serverbl', 'store', 'discord'].map((type) => (
                  <TabsContent key={type} value={type} className="space-y-4">
                    <Card className="glass-card border-orange-500/20">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center space-x-2">
                          {getSearchTypeIcon(type)}
                          <span>{type === 'serverbl' ? 'Server' : type.charAt(0).toUpperCase() + type.slice(1)} Blacklist History</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[500px]">
                          <div className="space-y-3">
                            {blacklistHistory
                              .filter((item) => item.search_type === (type === 'serverbl' ? 'server' : type))
                              .map((item) => (
                                <div key={item.id} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                      {getSearchTypeIcon(item.search_type || '')}
                                      <span className="text-white font-medium">{item.search_query}</span>
                                      <Badge variant={item.result_found ? 'destructive' : 'secondary'}>
                                        {item.result_found ? 'Found' : 'Not Found'}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-gray-400 text-sm">{formatDate(item.created_at)}</span>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const t = type === 'serverbl' ? 'server' : type;
                                          const pathMap: Record<string, string> = {
                                            user: '/user-blacklist-checker',
                                            server: '/server-blacklist-checker',
                                            store: '/store-blacklist-checker',
                                            discord: '/discord-blacklist-checker',
                                          };
                                          const path = pathMap[t] || '/reports';
                                          navigate(`${path}?q=${encodeURIComponent(item.search_query || '')}`);
                                        }}
                                      >
                                        Copy search
                                      </Button>
                                    </div>
                                  </div>
                                  {item.country && (
                                    <p className="text-gray-400 text-sm">Location: {item.country}</p>
                                  )}
                                </div>
                              ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminHistory;