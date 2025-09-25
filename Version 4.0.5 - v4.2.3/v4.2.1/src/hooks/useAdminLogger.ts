import { supabase } from "@/integrations/supabase/client";

interface LogParams {
  category: string;
  message: string;
  log_level?: 'info' | 'warning' | 'error' | 'critical';
  metadata?: any;
}

interface SessionParams {
  ip_address?: string;
  user_agent?: string;
  country?: string;
}

export const useAdminLogger = () => {
  const logSystemEvent = async ({ category, message, log_level = 'info', metadata = {} }: LogParams) => {
    try {
      await supabase.functions.invoke('admin-logger', {
        body: {
          action: 'log_system',
          category,
          message,
          log_level,
          metadata
        }
      });
    } catch (error) {
      console.error('Failed to log system event:', error);
    }
  };

  const logAdminAction = async (
    username: string, 
    action_type: string, 
    database_name: string, 
    item_name: string, 
    description: string
  ) => {
    try {
      // Get user's IP and location
      const response = await fetch('https://ipapi.co/json/');
      const locationData = await response.json();

      await supabase.functions.invoke('admin-logger', {
        body: {
          action: 'log_system',
          category: 'admin_action',
          message: description,
          log_level: 'info',
          username,
          action_type,
          database_name,
          item_name,
          ip_address: locationData.ip,
          user_agent: navigator.userAgent,
          country: locationData.country_name,
          metadata: {
            action_type,
            database_name,
            item_name,
            timestamp: new Date().toISOString()
          }
        }
      });
    } catch (error) {
      console.error('Failed to log admin action:', error);
    }
  };

  const logUserSession = async ({ ip_address, user_agent, country }: SessionParams) => {
    try {
      const { data } = await supabase.functions.invoke('admin-logger', {
        body: {
          action: 'log_session',
          ip_address,
          user_agent,
          country
        }
      });
      return data?.session_id;
    } catch (error) {
      console.error('Failed to log user session:', error);
      return null;
    }
  };

  const logBlacklistChange = async (action: string, type: string, keyword: string) => {
    await logSystemEvent({
      category: 'blacklist_change',
      message: `${action} ${type} keyword: "${keyword}"`,
      log_level: 'info',
      metadata: {
        action,
        type,
        keyword,
        timestamp: new Date().toISOString()
      }
    });
  };

  return {
    logSystemEvent,
    logUserSession,
    logBlacklistChange,
    logAdminAction
  };
};