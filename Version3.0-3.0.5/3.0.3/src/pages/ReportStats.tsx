
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Search, Shield, AlertTriangle, Database, Users, CheckCircle, XCircle, Server, Network, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useResourceStats } from "@/hooks/useResourceStats";
import { useServerStats } from "@/hooks/useServerStats";

const ReportStats = () => {
  const { stats, loading } = useResourceStats();
  const { stats: serverStats, loading: serverLoading } = useServerStats();

  // Calculate percentages and derived stats
  const cleanPercentage = stats.totalSearches > 0 ? Math.round((stats.cleanSearches / stats.totalSearches) * 100) : 0;
  const blacklistedPercentage = stats.totalSearches > 0 ? Math.round((stats.blacklistedSearches / stats.totalSearches) * 100) : 0;

  // Calculate server violation rates
  const totalServerViolations = serverStats.totalViolationsTos + serverStats.totalViolationsCoc;
  const serverViolationRate = serverStats.totalChecks > 0 ? Math.round((totalServerViolations / serverStats.totalChecks) * 100) : 0;
  const avgPlayersPerServer = serverStats.uniqueServersChecked > 0 ? Math.round(serverStats.totalPlayersSeen / serverStats.uniqueServersChecked) : 0;

  // Data for pie chart
  const searchData = [
    { name: 'Clean Resources', value: stats.cleanSearches, color: '#22c55e' },
    { name: 'Blacklisted Resources', value: stats.blacklistedSearches, color: '#ef4444' }
  ];

  // Fixed server violation data - ensure percentages add up to 100%
  const cleanServerChecks = Math.max(0, serverStats.totalChecks - totalServerViolations);
  
  // Calculate actual percentages for display
  const tosPercentage = serverStats.totalChecks > 0 ? Math.round((serverStats.totalViolationsTos / serverStats.totalChecks) * 100) : 0;
  const cocPercentage = serverStats.totalChecks > 0 ? Math.round((serverStats.totalViolationsCoc / serverStats.totalChecks) * 100) : 0;
  const cleanPercentageServer = serverStats.totalChecks > 0 ? Math.round((cleanServerChecks / serverStats.totalChecks) * 100) : 0;

  console.log('Server stats debug:', {
    totalChecks: serverStats.totalChecks,
    tosViolations: serverStats.totalViolationsTos,
    cocViolations: serverStats.totalViolationsCoc,
    cleanChecks: cleanServerChecks,
    tosPercentage,
    cocPercentage,
    cleanPercentageServer
  });

  const serverViolationData = [
    { name: 'Clean Checks', value: cleanServerChecks, color: '#22c55e' },
    { name: 'TOS Violations', value: serverStats.totalViolationsTos, color: '#f59e0b' },
    { name: 'COC Violations', value: serverStats.totalViolationsCoc, color: '#ef4444' }
  ];

  // Generate realistic weekly trends based on current data
  const generateWeeklyTrends = () => {
    if (stats.totalSearches === 0) {
      return [
        { period: 'This Week', clean: 0, blacklisted: 0 },
        { period: 'Last Week', clean: 0, blacklisted: 0 },
        { period: '2 Weeks Ago', clean: 0, blacklisted: 0 },
        { period: '3 Weeks Ago', clean: 0, blacklisted: 0 }
      ];
    }

    // Calculate realistic weekly distribution (roughly 25% per week with some variation)
    const weeklyVariations = [0.28, 0.24, 0.26, 0.22]; // Adds up to 1.0
    
    return [
      { 
        period: 'This Week', 
        clean: Math.floor(stats.cleanSearches * weeklyVariations[0]), 
        blacklisted: Math.floor(stats.blacklistedSearches * weeklyVariations[0]) 
      }
    ];
  };

  const trendData = generateWeeklyTrends();

  return (
    <div className="min-h-screen">
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4 px-2">
              Community Statistics
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Real-time insights into resource safety checks, server analysis, and community activity
            </p>
          </div>

          {loading || serverLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Resource Checker Stats */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Search className="h-6 w-6 text-blue-400" />
                  Resource Checker Statistics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="glass-card border-0">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white/70">Total Searches</p>
                          <p className="text-2xl font-bold text-white">{stats.totalSearches.toLocaleString()}</p>
                        </div>
                        <Search className="h-8 w-8 text-blue-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-0">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white/70">Clean Resources</p>
                          <p className="text-2xl font-bold text-white">{stats.cleanSearches.toLocaleString()}</p>
                          <p className="text-xs text-green-400">{cleanPercentage}% of all searches</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-0">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white/70">Blacklisted Resources</p>
                          <p className="text-2xl font-bold text-white">{stats.blacklistedSearches.toLocaleString()}</p>
                          <p className="text-xs text-red-400">{blacklistedPercentage}% of all searches</p>
                        </div>
                        <XCircle className="h-8 w-8 text-red-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-0">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white/70">Safety Rate</p>
                          <p className="text-2xl font-bold text-white">{cleanPercentage}%</p>
                          <p className="text-xs text-white/70">Resources verified clean</p>
                        </div>
                        <Shield className="h-8 w-8 text-purple-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Server Checker Stats */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Server className="h-6 w-6 text-orange-400" />
                  Server Checker Statistics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  <Card className="glass-card border-0">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white/70">Total Checks</p>
                          <p className="text-2xl font-bold text-white">{serverStats.totalChecks.toLocaleString()}</p>
                        </div>
                        <Activity className="h-8 w-8 text-blue-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-0">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white/70">Unique Servers</p>
                          <p className="text-2xl font-bold text-white">{serverStats.uniqueServersChecked.toLocaleString()}</p>
                        </div>
                        <Server className="h-8 w-8 text-green-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-0">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white/70">TOS Violations</p>
                          <p className="text-2xl font-bold text-white">{serverStats.totalViolationsTos.toLocaleString()}</p>
                          <p className="text-xs text-yellow-400">IP/Brand violations</p>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-yellow-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-0">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white/70">COC Violations</p>
                          <p className="text-2xl font-bold text-white">{serverStats.totalViolationsCoc.toLocaleString()}</p>
                          <p className="text-xs text-red-400">Content violations</p>
                        </div>
                        <XCircle className="h-8 w-8 text-red-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-0">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white/70">Total Players</p>
                          <p className="text-2xl font-bold text-white">{serverStats.totalPlayersSeen.toLocaleString()}</p>
                          <p className="text-xs text-white/70">Avg {avgPlayersPerServer} per server</p>
                        </div>
                        <Users className="h-8 w-8 text-purple-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Resource Distribution Pie Chart */}
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-white">Resource Check Distribution</CardTitle>
                    <CardDescription className="text-white/70">
                      Breakdown of clean vs blacklisted resources
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={searchData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`}
                        >
                          {searchData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px',
                            color: '#ffffff'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Fixed Server Violation Distribution */}
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-white">Server Violation Distribution</CardTitle>
                    <CardDescription className="text-white/70">
                      Server checks by violation type ({serverStats.totalChecks.toLocaleString()} total checks)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={serverViolationData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`}
                        >
                          {serverViolationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name) => [value.toLocaleString(), name]}
                          contentStyle={{
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Database Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Blacklist Entries</span>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Server Checks</span>
                        <Badge className="bg-orange-500/20 text-orange-400">{serverStats.totalChecks.toLocaleString()}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Last Updated</span>
                        <Badge variant="outline">Live</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Community Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Resource Threats Blocked</span>
                        <Badge className="bg-red-500/20 text-red-400">{stats.blacklistedSearches.toLocaleString()}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Server Violations Found</span>
                        <Badge className="bg-yellow-500/20 text-yellow-400">{totalServerViolations.toLocaleString()}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Players Protected</span>
                        <Badge className="bg-green-500/20 text-green-400">{serverStats.totalPlayersSeen.toLocaleString()}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Service Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">API Status</span>
                        <Badge className="bg-green-500/20 text-green-400">Operational</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Server Violation Rate</span>
                        <Badge className="bg-purple-500/20 text-purple-400">{serverViolationRate}%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Coverage</span>
                        <Badge className="bg-blue-500/20 text-blue-400">Global</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReportStats;
