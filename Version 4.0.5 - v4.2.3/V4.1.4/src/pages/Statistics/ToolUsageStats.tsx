import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Activity, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStatistics } from "@/hooks/useStatistics";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";

const ToolUsageStats = () => {
  const { statistics, loading, error, fetchStatistics } = useStatistics();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        <title>FiveM Database - Tool Usage Statistics & Analytics Dashboard</title>
        <meta name="description" content="Real-time analytics and usage statistics for FiveM Database tools including resource checker, server verification, blacklist tools, and community features. Monitor platform engagement and performance." />
        <meta name="keywords" content="FiveM DB tool usage statistics, platform analytics, tool engagement metrics, resource checker stats, server verification analytics, FiveM tool performance" />
        <link rel="canonical" href="https://fivemdb.net/tool-usage-stats" />
        <meta property="og:title" content="FiveM Database - Tool Usage Statistics & Analytics Dashboard" />
        <meta property="og:description" content="Real-time analytics and usage statistics for FiveM Database tools and features with comprehensive engagement metrics." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.net/tool-usage-stats" />
        <meta property="og:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiveM Database - Tool Usage Statistics Dashboard" />
        <meta name="twitter:description" content="Real-time FiveM Database tool usage analytics and performance metrics." />
        <meta name="twitter:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
      </Helmet>
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4 px-2">
              Tool Usage Statistics
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Analytics and insights for FiveM DB tool usage and performance
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
                      Total Tool Usage
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      All-time usage across all tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">
                      {formatNumber(statistics?.tool_usage_statistics?.reduce((sum, tool) => sum + tool.usage_count, 0) || 0)}
                    </div>
                    <p className="text-sm text-white/60">
                      Total tool interactions
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <TrendingUp className="h-6 w-6 text-green-400" />
                      Today's Usage
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Tool usage in the last 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">
                      {formatNumber(statistics?.tool_usage_statistics?.reduce((sum, tool) => sum + tool.usage_today, 0) || 0)}
                    </div>
                    <p className="text-sm text-white/60">
                      Interactions today
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <Activity className="h-6 w-6 text-purple-400" />
                      This Week
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Tool usage in the last 7 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">
                      {formatNumber(statistics?.tool_usage_statistics?.reduce((sum, tool) => sum + tool.usage_this_week, 0) || 0)}
                    </div>
                    <p className="text-sm text-white/60">
                      Weekly interactions
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Tool Statistics */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Individual Tool Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {statistics?.tool_usage_statistics?.map((tool) => (
                    <Card key={tool.tool_name} className="glass-card border-0">
                      <CardHeader>
                        <CardTitle className="text-lg text-white capitalize flex items-center justify-between">
                          {tool.tool_name.replace(/_/g, ' ')}
                          <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                            {formatNumber(tool.usage_count)} total
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-white/70">
                          Last used: {formatDate(tool.last_used_at)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Today:</span>
                            <span className="text-white font-semibold">{formatNumber(tool.usage_today)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">This Week:</span>
                            <span className="text-white font-semibold">{formatNumber(tool.usage_this_week)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">This Month:</span>
                            <span className="text-white font-semibold">{formatNumber(tool.usage_this_month)}</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2 mt-4">
                            <div 
                              className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(100, (tool.usage_this_week / Math.max(1, statistics.tool_usage_statistics.reduce((max, t) => Math.max(max, t.usage_this_week), 0))) * 100)}%`
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

export default ToolUsageStats;