import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Database, Globe, RefreshCw, TrendingUp, Users, Search } from "lucide-react";
import { useStatistics } from "@/hooks/useStatistics";
import { Skeleton } from "@/components/ui/skeleton";

const FiveMDatabaseStats = () => {
  const { statistics, loading, error, fetchStatistics } = useStatistics();

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return new Intl.NumberFormat().format(num);
  };

  const getStatIcon = (key: string) => {
    switch (key) {
      case 'total_searches': return <Search className="h-6 w-6 text-blue-400" />;
      case 'weekly_visitors': return <Users className="h-6 w-6 text-green-400" />;
      case 'monthly_visitors': return <Globe className="h-6 w-6 text-purple-400" />;
      case 'total_blacklist_entries': return <Database className="h-6 w-6 text-red-400" />;
      case 'total_violations_found': return <TrendingUp className="h-6 w-6 text-orange-400" />;
      default: return <BarChart3 className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatColor = (key: string) => {
    switch (key) {
      case 'total_searches': return 'text-blue-400 border-blue-400/30';
      case 'weekly_visitors': return 'text-green-400 border-green-400/30';
      case 'monthly_visitors': return 'text-purple-400 border-purple-400/30';
      case 'total_blacklist_entries': return 'text-red-400 border-red-400/30';
      case 'total_violations_found': return 'text-orange-400 border-orange-400/30';
      default: return 'text-gray-400 border-gray-400/30';
    }
  };

  if (error) {
    return (
      <div className="min-h-screen">
        <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Error Loading Statistics</h1>
              <p className="text-white/70 mb-4">{error}</p>
              <Button onClick={fetchStatistics} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4 px-2">
              FiveM Database Statistics
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Comprehensive insights into the FiveM DB platform and community
            </p>
            <Button 
              onClick={fetchStatistics} 
              variant="outline" 
              size="sm" 
              className="mt-4"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="glass-card border-0">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 bg-white/10" />
                    <Skeleton className="h-4 w-full bg-white/5" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-1/2 bg-white/10 mb-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full bg-white/5" />
                      <Skeleton className="h-4 w-3/4 bg-white/5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Platform Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <BarChart3 className="h-6 w-6 text-blue-400" />
                      Platform Activity
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Overall platform usage metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">
                      {formatNumber(statistics?.tool_usage_statistics?.reduce((sum, tool) => sum + tool.usage_count, 0) || 0)}
                    </div>
                    <p className="text-sm text-white/60">
                      Total platform interactions
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <Database className="h-6 w-6 text-green-400" />
                      Database Entries
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Total entries across all databases
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">
                      {formatNumber(statistics?.blacklist_statistics?.reduce((sum, bl) => sum + bl.total_entries, 0) || 0)}
                    </div>
                    <p className="text-sm text-white/60">
                      Blacklist entries maintained
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <Globe className="h-6 w-6 text-purple-400" />
                      Community Impact
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Total community protection checks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">
                      {formatNumber(statistics?.blacklist_statistics?.reduce((sum, bl) => sum + bl.total_searches, 0) || 0)}
                    </div>
                    <p className="text-sm text-white/60">
                      Protection checks performed
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Global Statistics */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Global Platform Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {statistics?.global_statistics?.map((stat) => (
                    <Card key={stat.statistic_key} className="glass-card border-0">
                      <CardHeader>
                        <CardTitle className="text-lg text-white flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getStatIcon(stat.statistic_key)}
                            {stat.statistic_key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </div>
                          <Badge variant="outline" className={getStatColor(stat.statistic_key)}>
                            {formatNumber(stat.statistic_value)}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-white/70">
                          {stat.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-white mb-2">
                          {formatNumber(stat.statistic_value)}
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min(100, (stat.statistic_value / Math.max(1, statistics.global_statistics.reduce((max, s) => Math.max(max, s.statistic_value), 0))) * 100)}%`
                            }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* System Health */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">System Health & Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="glass-card border-0">
                    <CardHeader>
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        <TrendingUp className="h-6 w-6 text-green-400" />
                        Compliance Rate
                      </CardTitle>
                      <CardDescription className="text-white/70">
                        Overall community compliance percentage
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white mb-2">
                        {statistics?.compliance_statistics?.length > 0 
                          ? Math.min(100, ((statistics.compliance_statistics.reduce((sum, comp) => sum + comp.clean_results, 0) / 
                             Math.max(1, statistics.compliance_statistics.reduce((sum, comp) => sum + comp.total_checks, 0))) * 100)).toFixed(5)
                          : '0.00000'
                        }%
                      </div>
                      <p className="text-sm text-white/60">
                        Resources and servers in compliance
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-0">
                    <CardHeader>
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        <Database className="h-6 w-6 text-blue-400" />
                        Database Growth
                      </CardTitle>
                      <CardDescription className="text-white/70">
                        Recent database activity and growth
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white mb-2">
                        {formatNumber(statistics?.blacklist_statistics?.reduce((sum, bl) => sum + bl.searches_this_week, 0) || 0)}
                      </div>
                      <p className="text-sm text-white/60">
                        Searches this week
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FiveMDatabaseStats;