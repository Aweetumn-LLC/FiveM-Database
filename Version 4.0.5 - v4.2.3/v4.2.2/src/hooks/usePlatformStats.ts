
import { useResourceStats } from './useResourceStats';

export const usePlatformStats = () => {
  const { stats: resourceStats, loading: resourceLoading } = useResourceStats();

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
    loading: resourceLoading
  };
};
