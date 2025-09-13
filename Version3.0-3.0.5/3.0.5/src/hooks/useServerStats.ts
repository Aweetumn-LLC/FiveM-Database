
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ServerStats {
  totalChecks: number;
  totalViolationsTos: number;
  totalViolationsCoc: number;
  totalPlayersSeen: number;
  uniqueServersChecked: number;
}

export const useServerStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['server-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('server_checker_stats')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching server stats:', error);
        return {
          totalChecks: 0,
          totalViolationsTos: 0,
          totalViolationsCoc: 0,
          totalPlayersSeen: 0,
          uniqueServersChecked: 0
        };
      }

      return {
        totalChecks: data.total_checks || 0,
        totalViolationsTos: data.total_violations_tos || 0,
        totalViolationsCoc: data.total_violations_coc || 0,
        totalPlayersSeen: data.total_players_seen || 0,
        uniqueServersChecked: data.unique_servers_checked || 0
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  return {
    stats: stats || {
      totalChecks: 0,
      totalViolationsTos: 0,
      totalViolationsCoc: 0,
      totalPlayersSeen: 0,
      uniqueServersChecked: 0
    },
    loading: isLoading
  };
};
