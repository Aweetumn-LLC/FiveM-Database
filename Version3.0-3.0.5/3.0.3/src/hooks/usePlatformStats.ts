
import { useResourceStats } from './useResourceStats';
import { useServerStats } from './useServerStats';

export const usePlatformStats = () => {
  const { stats: resourceStats, loading: resourceLoading } = useResourceStats();
  const { stats: serverStats, loading: serverLoading } = useServerStats();

  const allStats = [
    {
      label: "Total Security Checks",
      value: resourceLoading ? "..." : resourceStats.totalSearches.toLocaleString(),
      icon: "Database",
      change: "+12% this week",
      color: "text-orange-400",
      bgGradient: "from-orange-500/10 to-orange-600/5"
    },
    {
      label: "Clean Resources",
      value: resourceLoading ? "..." : resourceStats.cleanSearches.toLocaleString(),
      icon: "Shield",
      change: "+8% this week",
      color: "text-green-400",
      bgGradient: "from-green-500/10 to-green-600/5"
    },
    {
      label: "Threats Prevented",
      value: resourceLoading ? "..." : resourceStats.blacklistedSearches.toLocaleString(),
      icon: "Activity",
      change: "+15% this week",
      color: "text-red-400",
      bgGradient: "from-red-500/10 to-red-600/5"
    },
    {
      label: "Server Checks",
      value: serverLoading ? "..." : serverStats.totalChecks.toLocaleString(),
      icon: "Server",
      change: "+20% this week",
      color: "text-blue-400",
      bgGradient: "from-blue-500/10 to-blue-600/5"
    },
    {
      label: "TOS Violations",
      value: serverLoading ? "..." : serverStats.totalViolationsTos.toLocaleString(),
      icon: "AlertTriangle",
      change: "+5% this week",
      color: "text-yellow-400",
      bgGradient: "from-yellow-500/10 to-yellow-600/5"
    },
    {
      label: "COC Violations",
      value: serverLoading ? "..." : serverStats.totalViolationsCoc.toLocaleString(),
      icon: "AlertCircle",
      change: "+3% this week",
      color: "text-purple-400",
      bgGradient: "from-purple-500/10 to-purple-600/5"
    },
    {
      label: "Players Monitored",
      value: serverLoading ? "..." : serverStats.totalPlayersSeen.toLocaleString(),
      icon: "Users",
      change: "+25% this week",
      color: "text-cyan-400",
      bgGradient: "from-cyan-500/10 to-cyan-600/5"
    },
    {
      label: "Safety Score",
      value: resourceLoading ? "..." : `${Math.round((resourceStats.cleanSearches / resourceStats.totalSearches) * 100)}%`,
      icon: "TrendingUp",
      change: "+2% this month",
      color: "text-emerald-400",
      bgGradient: "from-emerald-500/10 to-emerald-600/5"
    }
  ];

  return {
    stats: allStats,
    loading: resourceLoading || serverLoading
  };
};
