import { useEffect, useState } from "react";
import { useStatistics } from "@/hooks/useStatistics";
import { TrendingUp, Activity, Database, Shield, Users, Search, CheckCircle, AlertTriangle } from "lucide-react";

export const WebsiteStatsGrid = () => {
  const { statistics, loading } = useStatistics();
  const [platformStats, setPlatformStats] = useState<any>(null);

  useEffect(() => {
    // Get platform stats from global statistics
    if (statistics?.global_statistics) {
      const stats = statistics.global_statistics.reduce((acc: any, stat: any) => {
        acc[stat.statistic_key] = stat.statistic_value;
        return acc;
      }, {});
      setPlatformStats(stats);
    }
  }, [statistics]);

  const getTotalBlacklistEntries = () => {
    if (!statistics?.blacklist_statistics) return 0;
    return statistics.blacklist_statistics.reduce((total: number, stat: any) => total + stat.total_entries, 0);
  };

  const getTotalSearches = () => {
    if (!statistics?.blacklist_statistics) return 0;
    return statistics.blacklist_statistics.reduce((total: number, stat: any) => total + stat.total_searches, 0);
  };

  const getComplianceRate = () => {
    if (!statistics?.compliance_statistics?.length) return '0.00000';
    const totalViolations = statistics.compliance_statistics.reduce((total: number, stat: any) => total + stat.total_violations, 0);
    const totalChecks = statistics.compliance_statistics.reduce((total: number, stat: any) => total + stat.total_checks, 0);
    const perc = totalChecks > 0 ? (totalViolations / totalChecks) * 100 : 0;
    return Math.min(100, perc).toFixed(5);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-6 border border-orange-500/20 animate-pulse">
            <div className="h-16 bg-gray-800 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="glass-card p-6 border border-orange-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Searches</p>
            <p className="text-2xl font-bold text-white">{getTotalSearches().toLocaleString()}</p>
            <p className="text-green-400 text-sm flex items-center mt-1">
              <Search className="w-3 h-3 mr-1" />
              Across all tools
            </p>
          </div>
          <div className="p-3 bg-blue-500/20 rounded-2xl">
            <Search className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="glass-card p-6 border border-orange-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Weekly Visitors</p>
            <p className="text-2xl font-bold text-white">{platformStats?.weekly_visitors?.toLocaleString() || '0'}</p>
            <p className="text-green-400 text-sm flex items-center mt-1">
              <Activity className="w-3 h-3 mr-1" />
              Active users
            </p>
          </div>
          <div className="p-3 bg-green-500/20 rounded-2xl">
            <Users className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>

      <div className="glass-card p-6 border border-orange-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Blacklist Entries</p>
            <p className="text-2xl font-bold text-white">{getTotalBlacklistEntries().toLocaleString()}</p>
            <p className="text-yellow-400 text-sm flex items-center mt-1">
              <Database className="w-3 h-3 mr-1" />
              Active records
            </p>
          </div>
          <div className="p-3 bg-purple-500/20 rounded-2xl">
            <Shield className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>

      <div className="glass-card p-6 border border-orange-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Non-Compliant Rate</p>
            <p className="text-2xl font-bold text-white">{getComplianceRate()}%</p>
            <p className="text-red-400 text-sm flex items-center mt-1">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Non-compliant results
            </p>
          </div>
          <div className="p-3 bg-red-500/20 rounded-2xl">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
        </div>
      </div>
    </div>
  );
};