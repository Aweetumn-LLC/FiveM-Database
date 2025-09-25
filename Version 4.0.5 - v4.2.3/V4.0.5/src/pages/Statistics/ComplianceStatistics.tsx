import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart3, CheckCircle, XCircle, RefreshCw, Server, FileText } from "lucide-react";
import { useStatistics } from "@/hooks/useStatistics";
import { Skeleton } from "@/components/ui/skeleton";

const ComplianceStatistics = () => {
  const { statistics, loading, error, fetchStatistics } = useStatistics();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const getComplianceIcon = (type: string) => {
    switch (type) {
      case 'server_compliance': return <Server className="h-6 w-6 text-purple-400" />;
      case 'resource_compliance': return <FileText className="h-6 w-6 text-blue-400" />;
      default: return <BarChart3 className="h-6 w-6 text-gray-400" />;
    }
  };

  const getComplianceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-400 border-green-400/30';
    if (percentage >= 70) return 'text-yellow-400 border-yellow-400/30';
    return 'text-red-400 border-red-400/30';
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
              Compliance Statistics
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Monitor FiveM Terms of Service compliance across the community
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
                      Total Checks
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      All compliance checks performed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">
                      {formatNumber(statistics?.compliance_statistics?.reduce((sum, comp) => sum + comp.total_checks, 0) || 0)}
                    </div>
                    <p className="text-sm text-white/60">
                      Community safety checks
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <CheckCircle className="h-6 w-6 text-green-400" />
                      Clean Results
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Compliant resources and servers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">
                      {formatNumber(statistics?.compliance_statistics?.reduce((sum, comp) => sum + comp.clean_results, 0) || 0)}
                    </div>
                    <p className="text-sm text-white/60">
                      No violations found
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <XCircle className="h-6 w-6 text-red-400" />
                      Total Violations
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Policy violations detected
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">
                      {formatNumber(statistics?.compliance_statistics?.reduce((sum, comp) => sum + comp.total_violations, 0) || 0)}
                    </div>
                    <p className="text-sm text-white/60">
                      Policy violations
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Compliance Statistics */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Compliance Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {statistics?.compliance_statistics?.map((compliance) => {
                    const complianceRate = compliance.total_checks > 0 
                      ? Math.min(100, ((compliance.clean_results / compliance.total_checks) * 100))
                      : 0;
                    
                    return (
                      <Card key={compliance.statistic_type} className="glass-card border-0">
                        <CardHeader>
                          <CardTitle className="text-lg text-white capitalize flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getComplianceIcon(compliance.statistic_type)}
                              {compliance.statistic_type.replace('_', ' ')}
                            </div>
                            <Badge variant="outline" className={getComplianceColor(complianceRate)}>
                              {complianceRate.toFixed(5)}% compliant
                            </Badge>
                          </CardTitle>
                          <CardDescription className="text-white/70">
                            {Math.min(100, compliance.violation_percentage).toFixed(5)}% violation rate
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Compliance Progress Bar */}
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-white/70">Compliance Rate</span>
                                <span className="text-white">{complianceRate.toFixed(5)}%</span>
                              </div>
                              <Progress 
                                value={complianceRate} 
                                className="h-2"
                              />
                            </div>

                            {/* Statistics Grid */}
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-white/70">Total Checks:</span>
                                <span className="text-white font-semibold">{formatNumber(compliance.total_checks)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/70">Clean Results:</span>
                                <span className="text-green-400 font-semibold">{formatNumber(compliance.clean_results)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/70">Violations:</span>
                                <span className="text-red-400 font-semibold">{formatNumber(compliance.total_violations)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/70">Today:</span>
                                <span className="text-white font-semibold">{formatNumber(compliance.checks_today)}</span>
                              </div>
                            </div>

                            {/* Time-based Statistics */}
                            <div className="border-t border-white/10 pt-3">
                              <h4 className="text-white font-medium mb-2">Recent Activity</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-white/70">Today's Checks:</span>
                                  <span className="text-white">{formatNumber(compliance.checks_today)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/70">This Week:</span>
                                  <span className="text-white">{formatNumber(compliance.checks_this_week)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/70">This Month:</span>
                                  <span className="text-white">{formatNumber(compliance.checks_this_month)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ComplianceStatistics;