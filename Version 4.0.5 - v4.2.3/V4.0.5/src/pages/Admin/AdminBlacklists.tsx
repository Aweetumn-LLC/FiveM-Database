import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Search, Link, User, Server, Store, MessageCircle, AlertTriangle, Home } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";

interface BlacklistItem {
  id: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

const AdminBlacklists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAdminAuth();
  
  // TOS/COC Blacklists
  const [ipViolations, setIpViolations] = useState<BlacklistItem[]>([]);
  const [cocViolations, setCocViolations] = useState<BlacklistItem[]>([]);
  
  // TOS/COC Bypasses
  const [ipBypasses, setIpBypasses] = useState<BlacklistItem[]>([]);
  const [cocBypasses, setCocBypasses] = useState<BlacklistItem[]>([]);
  
  // 5DB Blacklists
  const [userBlacklists, setUserBlacklists] = useState<BlacklistItem[]>([]);
  const [storeBlacklists, setStoreBlacklists] = useState<BlacklistItem[]>([]);
  const [serverBlacklists, setServerBlacklists] = useState<BlacklistItem[]>([]);
  const [discordBlacklists, setDiscordBlacklists] = useState<BlacklistItem[]>([]);
  const [blacklistLinks, setBlacklistLinks] = useState<BlacklistItem[]>([]);

  useEffect(() => {
    fetchAllBlacklists();
  }, []);

  const fetchAllBlacklists = async () => {
    try {
      setLoading(true);
      
      const [
        ipViolationsData,
        cocViolationsData,
        ipBypassesData,
        cocBypassesData,
        userBlacklistsData,
        storeBlacklistsData,
        serverBlacklistsData,
        discordBlacklistsData,
        blacklistLinksData
      ] = await Promise.all([
        supabase.from('ip_violation_keywords').select('*').order('created_at', { ascending: false }),
        supabase.from('coc_violation_keywords').select('*').order('created_at', { ascending: false }),
        supabase.from('ip_bypass_keywords').select('*').order('created_at', { ascending: false }),
        supabase.from('coc_bypass_keywords').select('*').order('created_at', { ascending: false }),
        supabase.from('user_blacklist').select('*').order('created_at', { ascending: false }),
        supabase.from('store_blacklist').select('*').order('created_at', { ascending: false }),
        supabase.from('server_blacklist').select('*').order('created_at', { ascending: false }),
        supabase.from('discord_blacklist').select('*').order('created_at', { ascending: false }),
        supabase.from('blacklist_entries').select('*').order('created_at', { ascending: false })
      ]);

      setIpViolations(ipViolationsData.data || []);
      setCocViolations(cocViolationsData.data || []);
      setIpBypasses(ipBypassesData.data || []);
      setCocBypasses(cocBypassesData.data || []);
      setUserBlacklists(userBlacklistsData.data || []);
      setStoreBlacklists(storeBlacklistsData.data || []);
      setServerBlacklists(serverBlacklistsData.data || []);
      setDiscordBlacklists(discordBlacklistsData.data || []);
      setBlacklistLinks(blacklistLinksData.data || []);
    } catch (error) {
      console.error('Error fetching blacklists:', error);
      toast.error('Failed to load blacklists');
    } finally {
      setLoading(false);
    }
  };

  const filterItems = (items: BlacklistItem[], searchFields: string[]) => {
    if (!searchTerm) return items;
    return items.filter(item =>
      searchFields.some(field =>
        item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
  };

  const renderKeywordList = (items: BlacklistItem[], title: string, icon: React.ReactNode) => (
    <Card className="glass-card border-orange-500/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          {icon}
          <span>{title}</span>
          <Badge variant="secondary">{items.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-2">
            {filterItems(items, ['keyword']).map((item) => (
              <div key={item.id} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{item.keyword}</span>
                  <span className="text-gray-400 text-sm">{formatDate(item.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <Shield className="w-8 h-8 text-orange-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Loading Blacklists...</h2>
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
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gradient">Blacklist Management</h1>
                      <p className="text-sm text-muted-foreground">Comprehensive blacklist database</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search blacklists..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64 bg-gray-900/50 border-orange-500/20 focus:border-orange-400"
                    />
                  </div>
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
            <div className="max-w-7xl mx-auto space-y-6">
              <Tabs defaultValue="tos-coc-blacklists" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 bg-gray-900/50 border border-orange-500/20">
                  <TabsTrigger value="tos-coc-blacklists" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                    TOS/COC Blacklists
                  </TabsTrigger>
                  <TabsTrigger value="tos-coc-bypasses" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                    TOS/COC Bypasses
                  </TabsTrigger>
                  <TabsTrigger value="5db-blacklists" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                    5DB Blacklists
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="tos-coc-blacklists" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {renderKeywordList(
                      filterItems(blacklistLinks, ['name', 'keyword']),
                      "Blacklist Links",
                      <Link className="w-5 h-5 text-red-400" />
                    )}
                    {renderKeywordList(
                      ipViolations,
                      "IP Violations",
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    )}
                    {renderKeywordList(
                      cocViolations,
                      "COC Violations",
                      <Shield className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="tos-coc-bypasses" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderKeywordList(
                      ipBypasses,
                      "IP Bypass Words",
                      <Shield className="w-5 h-5 text-green-400" />
                    )}
                    {renderKeywordList(
                      cocBypasses,
                      "COC Bypass Words",
                      <Shield className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="5db-blacklists" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="glass-card border-orange-500/20">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <User className="w-5 h-5 text-blue-400" />
                          <span>User Blacklists</span>
                          <Badge variant="secondary">{userBlacklists.length}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[400px]">
                          <div className="space-y-2">
                            {filterItems(userBlacklists, ['fivem_id', 'discord_id', 'reason']).map((item) => (
                              <div key={item.id} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                                <div className="space-y-1">
                                  {item.fivem_id && <p className="text-white">FiveM ID: {item.fivem_id}</p>}
                                  {item.discord_id && <p className="text-white">Discord ID: {item.discord_id}</p>}
                                  <p className="text-gray-400 text-sm">{item.reason}</p>
                                  <p className="text-gray-500 text-xs">{formatDate(item.created_at)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="glass-card border-orange-500/20">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <Store className="w-5 h-5 text-purple-400" />
                          <span>Store/Hosting Blacklists</span>
                          <Badge variant="secondary">{storeBlacklists.length}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[400px]">
                          <div className="space-y-2">
                            {filterItems(storeBlacklists, ['store_name', 'reason']).map((item) => (
                              <div key={item.id} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                                <div className="space-y-1">
                                  <p className="text-white font-medium">{item.store_name}</p>
                                  <p className="text-gray-400 text-sm">{item.reason}</p>
                                  <p className="text-gray-500 text-xs">{formatDate(item.created_at)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="glass-card border-orange-500/20">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <Server className="w-5 h-5 text-green-400" />
                          <span>Server Blacklists</span>
                          <Badge variant="secondary">{serverBlacklists.length}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[400px]">
                          <div className="space-y-2">
                            {filterItems(serverBlacklists, ['server_name', 'owner_fivem_id', 'reason']).map((item) => (
                              <div key={item.id} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                                <div className="space-y-1">
                                  <p className="text-white font-medium">{item.server_name}</p>
                                  <p className="text-gray-300 text-sm">Owner: {item.owner_fivem_id}</p>
                                  <p className="text-gray-400 text-sm">{item.reason}</p>
                                  <p className="text-gray-500 text-xs">{formatDate(item.created_at)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="glass-card border-orange-500/20">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <MessageCircle className="w-5 h-5 text-indigo-400" />
                          <span>Discord Blacklists</span>
                          <Badge variant="secondary">{discordBlacklists.length}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[400px]">
                          <div className="space-y-2">
                            {filterItems(discordBlacklists, ['discord_server_name', 'owner_discord_id', 'reason']).map((item) => (
                              <div key={item.id} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                                <div className="space-y-1">
                                  <p className="text-white font-medium">{item.discord_server_name}</p>
                                  <p className="text-gray-300 text-sm">Owner: {item.owner_discord_id}</p>
                                  <p className="text-gray-400 text-sm">{item.reason}</p>
                                  <p className="text-gray-500 text-xs">{formatDate(item.created_at)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminBlacklists;