import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BlacklistStats {
  blacklist_type: string;
  total_entries: number;
  total_searches: number;
  searches_today: number;
  searches_this_week: number;
  searches_this_month: number;
  last_search_date: string | null;
}

interface ComplianceStats {
  statistic_type: string;
  total_checks: number;
  total_violations: number;
  clean_results: number;
  violation_percentage: number;
  checks_today: number;
  checks_this_week: number;
  checks_this_month: number;
  violations_today: number;
  violations_this_week: number;
  violations_this_month: number;
}

interface ToolUsageStats {
  tool_name: string;
  usage_count: number;
  usage_today: number;
  usage_this_week: number;
  usage_this_month: number;
  last_used_at: string | null;
}

interface GlobalStats {
  statistic_key: string;
  statistic_value: number;
  description: string;
}

interface AllStatistics {
  blacklist_statistics: BlacklistStats[];
  compliance_statistics: ComplianceStats[];
  tool_usage_statistics: ToolUsageStats[];
  global_statistics: GlobalStats[];
}

export const useStatistics = () => {
  const [statistics, setStatistics] = useState<AllStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: functionError } = await supabase.functions.invoke('statistics-tracker', {
        body: { action: 'get_all_statistics' }
      });

      if (functionError) {
        throw functionError;
      }

      setStatistics(data);
    } catch (err) {
      console.error('Error fetching statistics:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  const trackToolUsage = async (toolName: string) => {
    try {
      await supabase.functions.invoke('statistics-tracker', {
        body: {
          action: 'track_tool_usage',
          data: { tool_name: toolName }
        }
      });
    } catch (err) {
      console.error('Error tracking tool usage:', err);
    }
  };

  const updateComplianceStats = async (statisticType: string, hasViolations: boolean, violationCount = 0, cleanCount = 0) => {
    try {
      await supabase.functions.invoke('statistics-tracker', {
        body: {
          action: 'update_compliance_stats',
          data: {
            statistic_type: statisticType,
            has_violations: hasViolations,
            violation_count: violationCount,
            clean_count: cleanCount
          }
        }
      });
    } catch (err) {
      console.error('Error updating compliance stats:', err);
    }
  };

  const updateGlobalStats = async (statisticKey: string, incrementValue = 1) => {
    try {
      await supabase.functions.invoke('statistics-tracker', {
        body: {
          action: 'update_global_stats',
          data: {
            statistic_key: statisticKey,
            increment_value: incrementValue
          }
        }
      });
    } catch (err) {
      console.error('Error updating global stats:', err);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return {
    statistics,
    loading,
    error,
    fetchStatistics,
    trackToolUsage,
    updateComplianceStats,
    updateGlobalStats
  };
};