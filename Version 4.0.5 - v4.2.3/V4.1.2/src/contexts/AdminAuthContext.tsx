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
  loginWithDiscord: (code: string, redirectUri: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  logActivity: (action: string, description: string, metadata?: any) => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  const loginWithDiscord = async (code: string, redirectUri: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { code, redirect_uri: redirectUri }
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        const now = Date.now();
        
        setUser(data.user);
        setSessionToken(data.sessionToken);
        
        // Store in localStorage
        const sessionData = {
          user: data.user,
          sessionToken: data.sessionToken,
          timestamp: now,
          expiresAt: now + (24 * 60 * 60 * 1000) // 24 hours
        };
        
        localStorage.setItem('adminSession', JSON.stringify(sessionData));

        // Log the session
        await logUserSession();
        
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Discord authentication failed' };
      }
    } catch (error) {
      console.error('Discord authentication error:', error);
      return { success: false, error: 'Discord authentication failed. Please try again.' };
    }
  };

  const login = async (username: string, password: string) => {
    try {
      // Rate limiting check - prevent brute force
      const lastAttempt = localStorage.getItem('lastLoginAttempt');
      const attemptCount = parseInt(localStorage.getItem('loginAttempts') || '0');
      const now = Date.now();
      
      if (lastAttempt && now - parseInt(lastAttempt) < 30000 && attemptCount >= 5) {
        return { success: false, error: 'Too many failed attempts. Please wait 30 seconds.' };
      }

      // Input validation
      if (!username || username.length < 3) {
        return { success: false, error: 'Username must be at least 3 characters' };
      }
      
      if (!password || password.length < 8) {
        return { success: false, error: 'Password must be at least 8 characters' };
      }

      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { username: username.trim(), password }
      });

      if (error) {
        // Update failed attempts
        localStorage.setItem('loginAttempts', (attemptCount + 1).toString());
        localStorage.setItem('lastLoginAttempt', now.toString());
        throw error;
      }

      if (data.success) {
        // Clear failed attempts on success
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('lastLoginAttempt');
        
        setUser(data.user);
        setSessionToken(data.sessionToken);
        
        // Store in localStorage with encryption metadata
        const sessionData = {
          user: data.user,
          sessionToken: data.sessionToken,
          timestamp: now,
          expiresAt: now + (24 * 60 * 60 * 1000) // 24 hours
        };
        
        localStorage.setItem('adminSession', JSON.stringify(sessionData));

        // Log the session with enhanced security info
        await logUserSession();
        
        return { success: true };
      } else {
        // Update failed attempts
        localStorage.setItem('loginAttempts', (attemptCount + 1).toString());
        localStorage.setItem('lastLoginAttempt', now.toString());
        return { success: false, error: data.error || 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Authentication error:', error);
      return { success: false, error: 'Authentication failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    setSessionToken(null);
    
    // Enhanced logout - clear all auth data
    localStorage.removeItem('adminSession');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminSessionToken');
    localStorage.removeItem('loginAttempts');
    localStorage.removeItem('lastLoginAttempt');
    
    // Clear any sensitive session data from memory
    if (user) {
      logActivity('logout', 'User logged out', { username: user.username });
    }
  };

  const hasPermission = (permission: string): boolean => {
    // Legacy "Maintainer" user has all permissions
    if (user?.username === 'Maintainer') return true;
    
    // Staff Discord IDs have all permissions
    const staffDiscordIDs = [
      '1320215445768372366',
      '259408255053201409',
      '406719326419288066',
      '107372998016663552',
      '424921782454190085' // Rex
    ];
    if (user?.id && staffDiscordIDs.includes(user.id)) return true;
    
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

  // Enhanced session validation on mount
  useEffect(() => {
    const validateSession = () => {
      try {
        const storedSession = localStorage.getItem('adminSession');
        const legacyUser = localStorage.getItem('adminUser');
        const legacyToken = localStorage.getItem('adminSessionToken');
        
        if (storedSession) {
          const sessionData = JSON.parse(storedSession);
          const now = Date.now();
          
          // Check if session is expired
          if (sessionData.expiresAt && now > sessionData.expiresAt) {
            console.log('Session expired, clearing data');
            logout();
            return;
          }
          
          // Validate session structure
          if (sessionData.user && sessionData.sessionToken) {
            setUser(sessionData.user);
            setSessionToken(sessionData.sessionToken);
          }
        } else if (legacyUser && legacyToken) {
          // Handle legacy sessions - upgrade them
          try {
            const user = JSON.parse(legacyUser);
            const now = Date.now();
            
            const sessionData = {
              user,
              sessionToken: legacyToken,
              timestamp: now,
              expiresAt: now + (24 * 60 * 60 * 1000)
            };
            
            localStorage.setItem('adminSession', JSON.stringify(sessionData));
            localStorage.removeItem('adminUser');
            localStorage.removeItem('adminSessionToken');
            
            setUser(user);
            setSessionToken(legacyToken);
          } catch (error) {
            console.error('Error upgrading legacy session:', error);
            logout();
          }
        }
      } catch (error) {
        console.error('Session validation error:', error);
        logout();
      }
    };

    validateSession();

    // Set up periodic session validation
    const interval = setInterval(validateSession, 5 * 60 * 1000); // Check every 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  return (
    <AdminAuthContext.Provider value={{
      user,
      sessionToken,
      login,
      loginWithDiscord,
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