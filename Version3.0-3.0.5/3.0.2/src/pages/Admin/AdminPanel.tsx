import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus, Home, Shield, Eye, EyeOff, Lock, Database, Users, BarChart3, Activity, Calendar, Clock, AlertTriangle, CheckCircle2, XCircle, Globe, Bell, Monitor, Settings, Server } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import FiveMSection from "./FiveMSection";
import RecentSearches from "./RecentSearches";
import BlacklistLinks from "./BlacklistLinks";
import KeywordManager from './KeywordManager';
import PartnersManager from './PartnersManager';
import ImportExport from './ImportExport';

interface KeywordItem {
  id: string;
  keyword: string;
  created_at: string;
}

interface ContextualPattern {
  id: string;
  pattern: string[];
  created_at: string;
}

interface SystemLog {
  id: string;
  log_level: 'info' | 'warning' | 'error' | 'critical';
  category: string;
  message: string;
  metadata?: any;
  created_at: string;
}

interface AdminAlert {
  id: string;
  alert_type: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  is_read: boolean;
  created_at: string;
  resolved_at?: string;
}

interface WebsiteSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  description?: string;
}

interface UserSession {
  id: string;
  session_id: string;
  ip_address?: string;
  user_agent?: string;
  country?: string;
  city?: string;
  pages_visited: number;
  session_duration?: string;
  created_at: string;
  last_activity: string;
}

interface AnalyticsData {
  totalEvents: number;
  totalPages: number;
  totalCountries: number;
  recentEvents: any[];
  topPages: any[];
  topCountries: any[];
}

interface ServerStats {
  totalChecks: number;
  uniqueServers: number;
  totalViolations: number;
  totalPlayers: number;
}

interface ResourceStats {
  totalSearches: number;
  blacklistedSearches: number;
  cleanSearches: number;
}

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  // Data states
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
  const [adminAlerts, setAdminAlerts] = useState<AdminAlert[]>([]);
  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSetting[]>([]);
  const [userSessions, setUserSessions] = useState<UserSession[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalEvents: 0,
    totalPages: 0,
    totalCountries: 0,
    recentEvents: [],
    topPages: [],
    topCountries: []
  });
  const [serverStats, setServerStats] = useState<ServerStats>({
    totalChecks: 0,
    uniqueServers: 0,
    totalViolations: 0,
    totalPlayers: 0
  });
  const [resourceStats, setResourceStats] = useState<ResourceStats>({
    totalSearches: 0,
    blacklistedSearches: 0,
    cleanSearches: 0
  });

  // Keyword states
  const [ipViolationKeywords, setIpViolationKeywords] = useState<KeywordItem[]>([]);
  const [cocViolationKeywords, setCocViolationKeywords] = useState<KeywordItem[]>([]);
  const [ipBypassKeywords, setIpBypassKeywords] = useState<KeywordItem[]>([]);
  const [cocBypassKeywords, setCocBypassKeywords] = useState<KeywordItem[]>([]);
  const [contextualPatterns, setContextualPatterns] = useState<ContextualPattern[]>([]);

  // New keyword inputs
  const [newIpViolation, setNewIpViolation] = useState("");
  const [newCocViolation, setNewCocViolation] = useState("");
  const [newIpBypass, setNewIpBypass] = useState("");
  const [newCocBypass, setNewCocBypass] = useState("");
  const [newPattern, setNewPattern] = useState("");

  // Settings state for bulk saving
  const [pendingSettings, setPendingSettings] = useState<{[key: string]: any}>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { password }
      });

      if (error) throw error;

      if (data.success) {
        setIsAuthenticated(true);
        setPassword("");
        
        // Log the admin session
        try {
          const response = await fetch('https://ipapi.co/json/');
          const locationData = await response.json();
          
          await supabase.functions.invoke('admin-logger', {
            body: {
              action: 'log_session',
              ip_address: locationData.ip,
              user_agent: navigator.userAgent,
              country: locationData.country_name
            }
          });
        } catch (logError) {
          console.error('Failed to log session:', logError);
        }
        
        toast.success("Access granted - Welcome to the admin panel");
        loadAllData();
      } else {
        toast.error("Access denied - Invalid password");
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error("Authentication failed - Please try again");
    }
    
    setLoading(false);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadSystemLogs(),
        loadAdminAlerts(),
        loadWebsiteSettings(),
        loadUserSessions(),
        loadAnalyticsData(),
        loadServerStats(),
        loadResourceStats(),
        loadAllKeywords()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error("Failed to load some data");
    }
    setLoading(false);
  };

  const loadSystemLogs = async () => {
    const { data } = await supabase
      .from('system_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    
    setSystemLogs(data?.map(log => ({
      ...log,
      log_level: log.log_level as 'info' | 'warning' | 'error' | 'critical'
    })) || []);
  };

  const loadAdminAlerts = async () => {
    const { data } = await supabase
      .from('admin_alerts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);
    
    setAdminAlerts(data?.map(alert => ({
      ...alert,
      severity: alert.severity as 'low' | 'medium' | 'high' | 'critical'
    })) || []);
  };

  const loadWebsiteSettings = async () => {
    const { data } = await supabase
      .from('website_settings')
      .select('*')
      .order('setting_key');
    
    setWebsiteSettings(data || []);
  };

  const loadUserSessions = async () => {
    const { data } = await supabase
      .from('user_sessions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    
    setUserSessions(data?.map(session => ({
      ...session,
      session_duration: session.session_duration?.toString() || undefined
    })) || []);
  };

  const loadAnalyticsData = async () => {
    const [events, pages, countries] = await Promise.all([
      supabase.from('analytics_events').select('*', { count: 'exact' }),
      supabase.from('analytics_pages').select('*').order('views', { ascending: false }).limit(10),
      supabase.from('analytics_countries').select('*').order('visits', { ascending: false }).limit(10)
    ]);

    const recentEvents = await supabase
      .from('analytics_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    setAnalyticsData({
      totalEvents: events.count || 0,
      totalPages: pages.data?.length || 0,
      totalCountries: countries.data?.length || 0,
      recentEvents: recentEvents.data || [],
      topPages: pages.data || [],
      topCountries: countries.data || []
    });
  };

  const loadServerStats = async () => {
    const { data } = await supabase
      .from('server_checker_stats')
      .select('*')
      .single();
    
    if (data) {
      setServerStats({
        totalChecks: data.total_checks || 0,
        uniqueServers: data.unique_servers_checked || 0,
        totalViolations: (data.total_violations_tos || 0) + (data.total_violations_coc || 0),
        totalPlayers: data.total_players_seen || 0
      });
    }
  };

  const loadResourceStats = async () => {
    const { data } = await supabase
      .from('resource_checker_stats')
      .select('*')
      .single();
    
    if (data) {
      setResourceStats({
        totalSearches: data.total_searches || 0,
        blacklistedSearches: data.blacklisted_searches || 0,
        cleanSearches: data.clean_searches || 0
      });
    }
  };

  const loadAllKeywords = async () => {
    const [ipViolation, cocViolation, ipBypass, cocBypass, contextual] = await Promise.all([
      supabase.from('ip_violation_keywords').select('*').order('created_at', { ascending: false }),
      supabase.from('coc_violation_keywords').select('*').order('created_at', { ascending: false }),
      supabase.from('ip_bypass_keywords').select('*').order('created_at', { ascending: false }),
      supabase.from('coc_bypass_keywords').select('*').order('created_at', { ascending: false }),
      supabase.from('coc_contextual_patterns').select('*').order('created_at', { ascending: false })
    ]);

    setIpViolationKeywords(ipViolation.data || []);
    setCocViolationKeywords(cocViolation.data || []);
    setIpBypassKeywords(ipBypass.data || []);
    setCocBypassKeywords(cocBypass.data || []);
    setContextualPatterns(contextual.data || []);
  };

  const addKeyword = async (tableName: string, keyword: string, setter: (value: string) => void) => {
    if (!keyword.trim()) return;

    try {
      const { error } = await supabase
        .from(tableName as any)
        .insert([{ keyword: keyword.trim() }]);

      if (error) throw error;

      // Log the change
      await supabase.functions.invoke('admin-logger', {
        body: {
          action: 'log_system',
          category: 'blacklist_change',
          message: `Added keyword: "${keyword.trim()}" to ${tableName}`,
          log_level: 'info',
          metadata: { action: 'add', table: tableName, keyword: keyword.trim() }
        }
      });

      setter("");
      loadAllKeywords();
      toast.success("Keyword added successfully");
    } catch (error) {
      toast.error("Failed to add keyword");
    }
  };

  const deleteKeyword = async (tableName: string, id: string, keyword?: string) => {
    try {
      const { error } = await supabase
        .from(tableName as any)
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Log the change
      await supabase.functions.invoke('admin-logger', {
        body: {
          action: 'log_system',
          category: 'blacklist_change',
          message: `Deleted keyword from ${tableName}`,
          log_level: 'info',
          metadata: { action: 'delete', table: tableName, keyword_id: id }
        }
      });

      loadAllKeywords();
      toast.success("Keyword deleted successfully");
    } catch (error) {
      toast.error("Failed to delete keyword");
    }
  };

  const updateSetting = async (settingKey: string, value: any) => {
    try {
      const { error } = await supabase
        .from('website_settings')
        .update({ setting_value: value })
        .eq('setting_key', settingKey);

      if (error) throw error;

      // Log the change
      await supabase.functions.invoke('admin-logger', {
        body: {
          action: 'log_system',
          category: 'settings_change',
          message: `Updated setting: ${settingKey}`,
          log_level: 'info',
          metadata: { setting_key: settingKey, new_value: value }
        }
      });

      loadWebsiteSettings();
      toast.success("Setting updated successfully");
    } catch (error) {
      toast.error("Failed to update setting");
    }
  };

  const updatePendingSetting = (key: string, value: any) => {
    setPendingSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const saveAllSettings = async () => {
    if (Object.keys(pendingSettings).length === 0) return;

    try {
      setLoading(true);
      
      for (const [key, value] of Object.entries(pendingSettings)) {
        await updateSetting(key, value);
      }

      setPendingSettings({});
      setHasUnsavedChanges(false);
      toast.success("All settings saved successfully");
    } catch (error) {
      toast.error("Failed to save some settings");
    } finally {
      setLoading(false);
    }
  };

  const markAlertAsRead = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('admin_alerts')
        .update({ is_read: true })
        .eq('id', alertId);

      if (error) throw error;

      loadAdminAlerts();
    } catch (error) {
      toast.error("Failed to mark alert as read");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'error': return 'text-orange-400 bg-orange-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'info': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  // Beautiful Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--theme-background)' }}>
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-orange-600/20"></div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse-subtle"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-subtle delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse-subtle delay-2000"></div>
        </div>

        {/* Login Container */}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-md animate-fade-in">
            {/* Logo Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass-effect mb-6 group hover:scale-105 transition-transform duration-300">
                <Shield className="w-10 h-10 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
              </div>
              <h1 className="text-3xl font-bold text-gradient mb-2">Admin Portal</h1>
              <p className="text-muted-foreground">Secure access to system management</p>
            </div>

            {/* Login Card */}
            <Card className="glass-neo border-0 shadow-2xl">
              <CardHeader className="space-y-1 text-center pb-4">
                <CardTitle className="text-2xl font-bold text-white">Authentication Required</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Enter your admin credentials to continue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-white/90">
                    Admin Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !loading && handleLogin()}
                      placeholder="Enter secure password"
                      className="bg-white/5 border-white/10 focus:border-orange-400/50 focus:ring-orange-400/20 text-white pr-12"
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleLogin}
                  disabled={loading || !password}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4" />
                      <span>Access Admin Panel</span>
                    </div>
                  )}
                </Button>

                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Lock className="w-3 h-3" />
                  <span>Secured with enterprise-grade encryption</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced Admin Dashboard
  return (
    <div className="min-h-screen" style={{ background: 'var(--theme-background)' }}>
      {/* Header */}
      <div className="glass-effect border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-orange-600 to-red-600">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient">Admin Control Panel</h1>
                  <p className="text-sm text-muted-foreground">Comprehensive System Management</p>
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
                  setIsAuthenticated(false);
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

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Navigation Tabs */}
        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-6">
          <TabsList className="grid w-full grid-cols-9 bg-white/5 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400 flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="traffic" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Traffic</span>
            </TabsTrigger>
            <TabsTrigger value="fivem" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>FiveM</span>
            </TabsTrigger>
            <TabsTrigger value="blacklist" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400 flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Blacklist</span>
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 flex items-center space-x-2">
              <Monitor className="w-4 h-4" />
              <span>Monitoring</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400 flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="partners" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Partners</span>
            </TabsTrigger>
            <TabsTrigger value="import-export" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 flex items-center space-x-2">
              <Server className="w-4 h-4" />
              <span>Import & Export</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Section */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Analytics Events</p>
                      <p className="text-3xl font-bold text-white">{analyticsData.totalEvents.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/20">
                      <Activity className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Server Checks</p>
                      <p className="text-3xl font-bold text-white">{serverStats.totalChecks.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/20">
                      <Monitor className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Resource Searches</p>
                      <p className="text-3xl font-bold text-white">{resourceStats.totalSearches.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/20">
                      <Database className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Sessions</p>
                      <p className="text-3xl font-bold text-white">{userSessions.length}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-500/20">
                      <Users className="w-6 h-6 text-orange-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-blue-400" />
                    <span>Recent System Logs</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {systemLogs.slice(0, 10).map((log) => (
                      <div key={log.id} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                        <Badge className={`${getLogLevelColor(log.log_level)} border-0 text-xs`}>
                          {log.log_level}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{log.message}</p>
                          <p className="text-xs text-muted-foreground">{log.category} • {formatDate(log.created_at)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-green-400" />
                    <span>Top Countries</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData.topCountries.slice(0, 8).map((country, index) => (
                      <div key={country.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                            {index + 1}
                          </div>
                          <span className="text-white">{country.country || 'Unknown'}</span>
                        </div>
                        <Badge variant="secondary" className="bg-white/10 text-white border-0">
                          {country.visits?.toLocaleString() || 0}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Traffic Section */}
          <TabsContent value="traffic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    <span>Page Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topPages.map((page) => (
                      <div key={page.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{page.path}</p>
                          <p className="text-xs text-muted-foreground">Views: {page.views?.toLocaleString() || 0}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Users className="w-5 h-5 text-green-400" />
                    <span>User Sessions ({userSessions.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10">
                          <TableHead className="text-white/80">Country</TableHead>
                          <TableHead className="text-white/80">Pages</TableHead>
                          <TableHead className="text-white/80">Duration</TableHead>
                          <TableHead className="text-white/80">Last Activity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userSessions.slice(0, 10).map((session) => (
                          <TableRow key={session.id} className="border-white/10">
                            <TableCell className="text-white">{session.country || 'Unknown'}</TableCell>
                            <TableCell className="text-white">{session.pages_visited}</TableCell>
                            <TableCell className="text-white">{session.session_duration || 'Active'}</TableCell>
                            <TableCell className="text-white">{formatDate(session.last_activity)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* FiveM Section */}
          <TabsContent value="fivem" className="space-y-6">
            <FiveMSection />
          </TabsContent>

          {/* Blacklist Management Section */}
          <TabsContent value="blacklist" className="space-y-6">
            <Tabs defaultValue="blacklist-links" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6 bg-white/5 p-1">
                <TabsTrigger value="blacklist-links" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                  Blacklist Links
                </TabsTrigger>
                <TabsTrigger value="ip-violation" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                  IP Violation ({ipViolationKeywords.length})
                </TabsTrigger>
                <TabsTrigger value="coc-violation" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
                  COC Violation ({cocViolationKeywords.length})
                </TabsTrigger>
                <TabsTrigger value="ip-bypass" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                  IP Bypass ({ipBypassKeywords.length})
                </TabsTrigger>
                <TabsTrigger value="coc-bypass" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
                  COC Bypass ({cocBypassKeywords.length})
                </TabsTrigger>
                <TabsTrigger value="contextual" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                  Contextual ({contextualPatterns.length})
                </TabsTrigger>
              </TabsList>

              {/* Blacklist Links Tab */}
              <TabsContent value="blacklist-links">
                <BlacklistLinks />
              </TabsContent>

              {/* IP Violation Keywords */}
              <TabsContent value="ip-violation">
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-orange-400">
                      <AlertTriangle className="w-5 h-5" />
                      <span>IP Violation Keywords</span>
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add new IP violation keyword..."
                        value={newIpViolation}
                        onChange={(e) => setNewIpViolation(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword('ip_violation_keywords', newIpViolation, setNewIpViolation)}
                      />
                      <Button
                        onClick={() => addKeyword('ip_violation_keywords', newIpViolation, setNewIpViolation)}
                        className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border-orange-500/30"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {ipViolationKeywords.map((keyword) => (
                        <div key={keyword.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-orange-500/20">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">{keyword.keyword}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(keyword.created_at)}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteKeyword('ip_violation_keywords', keyword.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* COC Violation Keywords */}
              <TabsContent value="coc-violation">
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-red-400">
                      <XCircle className="w-5 h-5" />
                      <span>Code of Conduct Violation Keywords</span>
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add new COC violation keyword..."
                        value={newCocViolation}
                        onChange={(e) => setNewCocViolation(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword('coc_violation_keywords', newCocViolation, setNewCocViolation)}
                      />
                      <Button
                        onClick={() => addKeyword('coc_violation_keywords', newCocViolation, setNewCocViolation)}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {cocViolationKeywords.map((keyword) => (
                        <div key={keyword.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-red-500/20">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">{keyword.keyword}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(keyword.created_at)}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteKeyword('coc_violation_keywords', keyword.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* IP Bypass Keywords */}
              <TabsContent value="ip-bypass">
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-blue-400">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>IP Bypass Keywords</span>
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add new IP bypass keyword..."
                        value={newIpBypass}
                        onChange={(e) => setNewIpBypass(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword('ip_bypass_keywords', newIpBypass, setNewIpBypass)}
                      />
                      <Button
                        onClick={() => addKeyword('ip_bypass_keywords', newIpBypass, setNewIpBypass)}
                        className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/30"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {ipBypassKeywords.map((keyword) => (
                        <div key={keyword.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-blue-500/20">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">{keyword.keyword}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(keyword.created_at)}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteKeyword('ip_bypass_keywords', keyword.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* COC Bypass Keywords */}
              <TabsContent value="coc-bypass">
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-400">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>COC Bypass Keywords</span>
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add new COC bypass keyword..."
                        value={newCocBypass}
                        onChange={(e) => setNewCocBypass(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword('coc_bypass_keywords', newCocBypass, setNewCocBypass)}
                      />
                      <Button
                        onClick={() => addKeyword('coc_bypass_keywords', newCocBypass, setNewCocBypass)}
                        className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/30"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {cocBypassKeywords.map((keyword) => (
                        <div key={keyword.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-green-500/20">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">{keyword.keyword}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(keyword.created_at)}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteKeyword('coc_bypass_keywords', keyword.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contextual Patterns */}
              <TabsContent value="contextual">
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-purple-400">
                      <Activity className="w-5 h-5" />
                      <span>Contextual Patterns</span>
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add pattern (comma-separated words)..."
                        value={newPattern}
                        onChange={(e) => setNewPattern(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword('coc_contextual_patterns', newPattern, setNewPattern)}
                      />
                      <Button
                        onClick={() => addKeyword('coc_contextual_patterns', newPattern, setNewPattern)}
                        className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/30"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {contextualPatterns.map((pattern) => (
                        <div key={pattern.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-purple-500/20">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap gap-1 mb-2">
                              {pattern.pattern.map((word, index) => (
                                <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-400 border-0">
                                  {word}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground">{formatDate(pattern.created_at)}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteKeyword('coc_contextual_patterns', pattern.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Monitoring Section */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Monitor className="w-5 h-5 text-green-400" />
                    <span>Server Statistics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-white/5">
                      <p className="text-sm text-muted-foreground">Total Checks</p>
                      <p className="text-2xl font-bold text-white">{serverStats.totalChecks.toLocaleString()}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <p className="text-sm text-muted-foreground">Unique Servers</p>
                      <p className="text-2xl font-bold text-white">{serverStats.uniqueServers.toLocaleString()}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <p className="text-sm text-muted-foreground">Total Violations</p>
                      <p className="text-2xl font-bold text-red-400">{serverStats.totalViolations.toLocaleString()}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <p className="text-sm text-muted-foreground">Total Players</p>
                      <p className="text-2xl font-bold text-blue-400">{serverStats.totalPlayers.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Database className="w-5 h-5 text-blue-400" />
                    <span>Resource Statistics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 rounded-lg bg-white/5">
                      <p className="text-sm text-muted-foreground">Total Searches</p>
                      <p className="text-2xl font-bold text-white">{resourceStats.totalSearches.toLocaleString()}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <p className="text-sm text-muted-foreground">Blacklisted Resources</p>
                      <p className="text-2xl font-bold text-red-400">{resourceStats.blacklistedSearches.toLocaleString()}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <p className="text-sm text-muted-foreground">Clean Resources</p>
                      <p className="text-2xl font-bold text-green-400">{resourceStats.cleanSearches.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Logs */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-yellow-400" />
                  <span>System Logs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10">
                        <TableHead className="text-white/80">Level</TableHead>
                        <TableHead className="text-white/80">Category</TableHead>
                        <TableHead className="text-white/80">Message</TableHead>
                        <TableHead className="text-white/80">Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {systemLogs.slice(0, 15).map((log) => (
                        <TableRow key={log.id} className="border-white/10">
                          <TableCell>
                            <Badge className={`${getLogLevelColor(log.log_level)} border-0 text-xs`}>
                              {log.log_level}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-white">{log.category}</TableCell>
                          <TableCell className="text-white max-w-md truncate">{log.message}</TableCell>
                          <TableCell className="text-white">{formatDate(log.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Section */}
          <TabsContent value="alerts" className="space-y-6">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-yellow-400" />
                  <span>Admin Alerts ({adminAlerts.filter(a => !a.is_read).length} unread)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminAlerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-lg border ${alert.is_read ? 'bg-white/5 border-white/10' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={`${getSeverityColor(alert.severity)} border-0`}>
                              {alert.severity}
                            </Badge>
                            <h3 className="font-semibold text-white">{alert.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(alert.created_at)}</p>
                        </div>
                        {!alert.is_read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAlertAsRead(alert.id)}
                            className="text-yellow-400 hover:text-yellow-300"
                          >
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {adminAlerts.length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <p className="text-white">No alerts at this time</p>
                      <p className="text-sm text-muted-foreground">All systems running smoothly</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Partners Section */}
          <TabsContent value="partners" className="space-y-6">
            <PartnersManager />
          </TabsContent>

          {/* Import & Export Section */}
          <TabsContent value="import-export" className="space-y-6">
            <ImportExport />
          </TabsContent>

          {/* Settings Section */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-purple-400" />
                    <span>Website Settings</span>
                  </CardTitle>
                </div>
                {hasUnsavedChanges && (
                  <Button
                    onClick={saveAllSettings}
                    disabled={loading}
                    className="bg-orange-600 hover:bg-orange-500 text-white"
                  >
                    {loading ? 'Saving...' : 'Save All Changes'}
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {websiteSettings.map((setting) => {
                    const currentValue = pendingSettings[setting.setting_key] !== undefined 
                      ? pendingSettings[setting.setting_key] 
                      : setting.setting_value;
                    
                    return (
                      <div key={setting.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white capitalize">{setting.setting_key.replace(/_/g, ' ')}</h3>
                          <p className="text-sm text-muted-foreground">{setting.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {setting.setting_key === 'maintenance_mode' ? (
                            <Switch
                              checked={currentValue === true || currentValue === 'true'}
                              onCheckedChange={(checked) => updatePendingSetting(setting.setting_key, checked)}
                            />
                          ) : setting.setting_key === 'email_notifications' ? (
                            <Switch
                              checked={currentValue === true || currentValue === 'true'}
                              onCheckedChange={(checked) => updatePendingSetting(setting.setting_key, checked)}
                            />
                          ) : (
                            <Input
                              value={currentValue?.toString() || ''}
                              onChange={(e) => updatePendingSetting(setting.setting_key, e.target.value)}
                              className="w-32 bg-white/5 border-white/10 text-white"
                              placeholder="Enter value"
                            />
                          )}
                          {pendingSettings[setting.setting_key] !== undefined && (
                            <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-0">
                              Modified
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  
                  {hasUnsavedChanges && (
                    <Alert className="bg-yellow-500/10 border-yellow-500/30">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <AlertDescription className="text-yellow-200">
                        You have unsaved changes. Click "Save All Changes" to apply them.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;