
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ResourceStats {
  totalSearches: number;
  blacklistedSearches: number;
  cleanSearches: number;
}

export const useResourceStats = () => {
  const [stats, setStats] = useState<ResourceStats>({
    totalSearches: 0,
    blacklistedSearches: 0,
    cleanSearches: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch the single stats record
      const { data, error } = await supabase
        .from('resource_checker_stats')
        .select('total_searches, blacklisted_searches, clean_searches')
        .eq('id', 'f4919032-a129-405d-87c0-d254b6a8a8e9')
        .single();

      if (error) {
        console.error('Error fetching stats:', error);
        return;
      }

      if (data) {
        setStats({
          totalSearches: Math.max(0, data.total_searches || 0),
          blacklistedSearches: Math.max(0, data.blacklisted_searches || 0),
          cleanSearches: Math.max(0, data.clean_searches || 0),
        });
      }
    } catch (error) {
      console.error('Error in fetchStats:', error);
    } finally {
      setLoading(false);
    }
  };

  const incrementStats = async (isBlacklisted: boolean) => {
    if (isUpdating) {
      console.log('Update already in progress, skipping...');
      return;
    }

    // Validate input
    if (typeof isBlacklisted !== 'boolean') {
      console.error('Invalid isBlacklisted parameter');
      return;
    }

    try {
      setIsUpdating(true);
      console.log('Starting stats increment using database function:', { isBlacklisted });
      
      // Use the database function to increment stats with sanitized input
      const { error } = await supabase.rpc('increment_resource_stats', {
        is_blacklisted: isBlacklisted,
        increment_amount: 1 // Always increment by 1 for security
      });

      if (error) {
        console.error('Error incrementing stats:', error);
        return;
      }

      console.log('Stats updated successfully using database function');
      
      // Refresh the stats to get the updated values
      await fetchStats();
      
    } catch (error) {
      console.error('Error in incrementStats:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // Set up real-time subscription to listen for changes
    const channel = supabase
      .channel('resource-stats-realtime')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'resource_checker_stats'
        },
        (payload) => {
          console.log('Real-time stats update:', payload);
          if (payload.new && typeof payload.new === 'object') {
            setStats({
              totalSearches: Math.max(0, payload.new.total_searches || 0),
              blacklistedSearches: Math.max(0, payload.new.blacklisted_searches || 0),
              cleanSearches: Math.max(0, payload.new.clean_searches || 0),
            });
          }
        }
      )
      .subscribe((status) => {
        console.log('Real-time subscription status:', status);
      });

    return () => {
      console.log('Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, []);

  return { stats, loading, incrementStats, refreshStats: fetchStats };
};
