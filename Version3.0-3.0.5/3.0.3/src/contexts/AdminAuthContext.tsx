import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id?: string;
  username: string;
  display_name: string;
  permissions?: Record<string, boolean>;
}

interface AdminAuthContextType {
  user: User | null;
  sessionToken: string | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  logActivity: (action: string, description: string, metadata?: any) => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { username, password }
      });

      if (error) throw error;

      if (data.success) {
        setUser(data.user);
        setSessionToken(data.sessionToken);
        
        // Store in localStorage for persistence
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        localStorage.setItem('adminSessionToken', data.sessionToken);

        // Log the session
        await logUserSession();
        
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Authentication error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setSessionToken(null);
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminSessionToken');
  };

  const hasPermission = (permission: string): boolean => {
    // Legacy "Maintainer" user has all permissions
    if (user?.username === 'Maintainer') return true;
    
    // Check specific permissions for other users
    return user?.permissions?.[permission] === true;
  };

  const logActivity = async (action: string, description: string, metadata: any = {}) => {
    if (!user) return;

    try {
      // Get user's IP and location
      const response = await fetch('https://ipapi.co/json/');
      const locationData = await response.json();

      await supabase
        .from('maintainer_activity_logs')
        .insert({
          maintainer_id: user.id || 'legacy-maintainer',
          maintainer_username: user.username,
          action_type: action,
          action_description: description,
          ip_address: locationData.ip,
          user_agent: navigator.userAgent,
          metadata: {
            ...metadata,
            country: locationData.country_name,
            timestamp: new Date().toISOString()
          }
        });
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  };

  const logUserSession = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const locationData = await response.json();
      
      await supabase.functions.invoke('admin-logger', {
        body: {
          action: 'log_session',
          ip_address: locationData.ip,
          user_agent: navigator.userAgent,
          country: locationData.country_name
        }
      });
    } catch (error) {
      console.error('Failed to log session:', error);
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    const storedToken = localStorage.getItem('adminSessionToken');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setSessionToken(storedToken);
    }
  }, []);

  return (
    <AdminAuthContext.Provider value={{
      user,
      sessionToken,
      login,
      logout,
      hasPermission,
      logActivity
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};