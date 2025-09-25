import { useState } from "react";
import { useStatistics } from "@/hooks/useStatistics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, Shield, Database, Search, Activity, TrendingUp, Clock, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";

const AdminStatistics = () => {
  const { statistics, loading, error } = useStatistics();
  const { user, logout } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <BarChart3 className="w-8 h-8 text-orange-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Loading Statistics...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto">
            <BarChart3 className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Error Loading Statistics</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number) => num.toLocaleString();
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

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
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gradient">Statistics Dashboard</h1>
                      <p className="text-sm text-muted-foreground">Comprehensive website analytics</p>
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
            <div className="max-w-7xl mx-auto space-y-6">
              <Tabs defaultValue="blacklists" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 border border-orange-500/20">
                  <TabsTrigger value="blacklists" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                    Blacklist Stats
                  </TabsTrigger>
                  <TabsTrigger value="compliance" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                    Compliance
                  </TabsTrigger>
                  <TabsTrigger value="tools" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                    Tool Usage
                  </TabsTrigger>
                  <TabsTrigger value="global" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                    Global Stats
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="blacklists" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statistics?.blacklist_statistics?.map((stat: any) => (
                      <Card key={stat.blacklist_type} className="glass-card border-orange-500/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-white flex items-center justify-between">
                            <span className="capitalize">{stat.blacklist_type} Blacklist</span>
                            <Shield className="w-5 h-5 text-orange-400" />
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-400 text-sm">Total Entries</p>
                              <p className="text-xl font-bold text-white">{formatNumber(stat.total_entries)}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Total Searches</p>
                              <p className="text-xl font-bold text-white">{formatNumber(stat.total_searches)}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-400 text-sm">Today</span>
                              <Badge variant="secondary">{formatNumber(stat.searches_today)}</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400 text-sm">This Week</span>
                              <Badge variant="secondary">{formatNumber(stat.searches_this_week)}</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400 text-sm">This Month</span>
                              <Badge variant="secondary">{formatNumber(stat.searches_this_month)}</Badge>
                            </div>
                          </div>
                          
                          <div className="pt-2 border-t border-gray-700">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-sm">Last Search</span>
                              <span className="text-white text-sm">{formatDate(stat.last_search_date)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="compliance" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {statistics?.compliance_statistics?.map((stat: any) => (
                      <Card key={stat.statistic_type} className="glass-card border-orange-500/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-white flex items-center justify-between">
                            <span className="capitalize">{stat.statistic_type.replace('_', ' ')}</span>
                            <Activity className="w-5 h-5 text-green-400" />
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-gray-400 text-sm">Total Checks</p>
                              <p className="text-xl font-bold text-white">{formatNumber(stat.total_checks)}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Violations</p>
                              <p className="text-xl font-bold text-red-400">{formatNumber(stat.total_violations)}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">Clean Results</p>
                              <p className="text-xl font-bold text-green-400">{formatNumber(stat.clean_results)}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-400 text-sm">Violation Rate</span>
                              <Badge variant={(Number(stat.violation_percentage) > 20) ? "destructive" : "secondary"}>
                                {Math.min(100, Number(stat.violation_percentage || 0)).toFixed(5)}%
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <p className="text-gray-400">Today</p>
                              <p className="text-white">{formatNumber(stat.checks_today)}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">This Week</p>
                              <p className="text-white">{formatNumber(stat.checks_this_week)}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">This Month</p>
                              <p className="text-white">{formatNumber(stat.checks_this_month)}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="tools" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statistics?.tool_usage_statistics?.map((stat: any) => (
                      <Card key={stat.tool_name} className="glass-card border-orange-500/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-white flex items-center justify-between">
                            <span className="capitalize">{stat.tool_name.replace('_', ' ')}</span>
                            <Search className="w-5 h-5 text-blue-400" />
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="text-center">
                            <p className="text-gray-400 text-sm">Total Usage</p>
                            <p className="text-3xl font-bold text-white">{formatNumber(stat.usage_count)}</p>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <p className="text-gray-400">Today</p>
                              <p className="text-white">{formatNumber(stat.usage_today)}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">This Week</p>
                              <p className="text-white">{formatNumber(stat.usage_this_week)}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">This Month</p>
                              <p className="text-white">{formatNumber(stat.usage_this_month)}</p>
                            </div>
                          </div>
                          
                          <div className="pt-2 border-t border-gray-700">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-sm">Last Used</span>
                              <span className="text-white text-sm">{formatDate(stat.last_used_at)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="global" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statistics?.global_statistics?.map((stat: any) => (
                      <Card key={stat.statistic_key} className="glass-card border-orange-500/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-white flex items-center justify-between">
                            <span className="capitalize">{stat.statistic_key.replace('_', ' ')}</span>
                            <Database className="w-5 h-5 text-purple-400" />
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="text-center">
                            <p className="text-4xl font-bold text-white">{formatNumber(stat.statistic_value)}</p>
                            {stat.description && (
                              <p className="text-gray-400 text-sm mt-2">{stat.description}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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

export default AdminStatistics;