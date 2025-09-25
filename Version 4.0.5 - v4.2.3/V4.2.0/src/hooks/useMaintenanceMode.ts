import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useMaintenanceMode = () => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMaintenanceMode = async () => {
      try {
        const { data } = await supabase
          .from('website_settings')
          .select('setting_value')
          .eq('setting_key', 'maintenance_mode')
          .single();

        if (data) {
          setIsMaintenanceMode(data.setting_value === 'true' || data.setting_value === true);
        }
      } catch (error) {
        console.error('Error checking maintenance mode:', error);
      } finally {
        setLoading(false);
      }
    };

    checkMaintenanceMode();

    // Subscribe to maintenance mode changes
    const channel = supabase
      .channel('maintenance-mode-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'website_settings',
          filter: 'setting_key=eq.maintenance_mode'
        },
        (payload) => {
          const newValue = payload.new.setting_value;
          setIsMaintenanceMode(newValue === 'true' || newValue === true);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { isMaintenanceMode, loading };
};