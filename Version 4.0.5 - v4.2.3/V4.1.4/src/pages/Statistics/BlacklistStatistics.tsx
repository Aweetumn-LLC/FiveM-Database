import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Shield, AlertTriangle, RefreshCw, Users, Store, Server, MessageSquare } from "lucide-react";
import { useStatistics } from "@/hooks/useStatistics";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";

const BlacklistStatistics = () => {
  const { statistics, loading, error, fetchStatistics } = useStatistics();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No searches yet';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getBlacklistIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="h-6 w-6 text-blue-400" />;
      case 'store': return <Store className="h-6 w-6 text-green-400" />;
      case 'server': return <Server className="h-6 w-6 text-purple-400" />;
      case 'discord': return <MessageSquare className="h-6 w-6 text-orange-400" />;
      default: return <Shield className="h-6 w-6 text-gray-400" />;
    }
  };

  const getBlacklistColor = (type: string) => {
    switch (type) {
      case 'user': return 'text-blue-400 border-blue-400/30';
      case 'store': return 'text-green-400 border-green-400/30';
      case 'server': return 'text-purple-400 border-purple-400/30';
      case 'discord': return 'text-orange-400 border-orange-400/30';
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
      <Helmet>
        <title>FiveM Database - Blacklist Statistics & Analytics Dashboard</title>
        <meta name="description" content="View comprehensive blacklist statistics for FiveM Database including search trends, violation categories, and real-time analytics across user, server, store, and Discord blacklists." />
        <meta name="keywords" content="FiveM blacklist statistics, blacklist analytics, community protection stats, FiveM security trends, violation statistics, blacklist search data, FiveM database analytics" />
        <link rel="canonical" href="https://fivemdb.net/blacklist-statistics" />
        <meta property="og:title" content="FiveM Database - Blacklist Statistics & Analytics Dashboard" />
        <meta property="og:description" content="View comprehensive blacklist statistics for FiveM Database including search trends, violation categories, and real-time analytics." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.net/blacklist-statistics" />
        <meta property="og:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiveM Database - Blacklist Statistics Dashboard" />
        <meta name="twitter:description" content="Real-time blacklist statistics and analytics for FiveM community protection." />
        <meta name="twitter:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
      </Helmet>
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4 px-2">
              Blacklist Statistics
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Comprehensive statistics and insights for blacklist database operations
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
                      <Skeleton className="h-4 w-1/2 bg-white/5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <BarChart3 className="h-6 w-6 text-blue-400" />
                      Total Entries
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Total blacklisted entries across all categories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">
                      {formatNumber(statistics?.blacklist_statistics?.reduce((sum, bl) => sum + bl.total_entries, 0) || 0)}
                    </div>
                    <p className="text-sm text-white/60">
                      Active blacklist entries
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <Shield className="h-6 w-6 text-green-400" />
                      Total Searches
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      All-time blacklist searches performed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">
                      {formatNumber(statistics?.blacklist_statistics?.reduce((sum, bl) => sum + bl.total_searches, 0) || 0)}
                    </div>
                    <p className="text-sm text-white/60">
                      Community protection checks
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <AlertTriangle className="h-6 w-6 text-yellow-400" />
                      Today's Activity
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Blacklist searches in the last 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">
                      {formatNumber(statistics?.blacklist_statistics?.reduce((sum, bl) => sum + bl.searches_today, 0) || 0)}
                    </div>
                    <p className="text-sm text-white/60">
                      Today's protection checks
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Individual Blacklist Statistics */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Blacklist Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {statistics?.blacklist_statistics?.map((blacklist) => (
                    <Card key={blacklist.blacklist_type} className="glass-card border-0">
                      <CardHeader>
                        <CardTitle className="text-lg text-white capitalize flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getBlacklistIcon(blacklist.blacklist_type)}
                            {blacklist.blacklist_type} Blacklist
                          </div>
                          <Badge variant="outline" className={getBlacklistColor(blacklist.blacklist_type)}>
                            {formatNumber(blacklist.total_entries)} entries
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-white/70">
                          Last search: {formatDate(blacklist.last_search_date)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Total Searches:</span>
                            <span className="text-white font-semibold">{formatNumber(blacklist.total_searches)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Today:</span>
                            <span className="text-white font-semibold">{formatNumber(blacklist.searches_today)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">This Week:</span>
                            <span className="text-white font-semibold">{formatNumber(blacklist.searches_this_week)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">This Month:</span>
                            <span className="text-white font-semibold">{formatNumber(blacklist.searches_this_month)}</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2 mt-4">
                            <div 
                              className="bg-gradient-to-r from-red-400 to-orange-400 h-2 rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(100, (blacklist.total_searches / Math.max(1, statistics.blacklist_statistics.reduce((max, bl) => Math.max(max, bl.total_searches), 0))) * 100)}%`
                              }}
                            ></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BlacklistStatistics;