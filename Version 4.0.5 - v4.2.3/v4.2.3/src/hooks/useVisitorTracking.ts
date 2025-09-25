import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useVisitorTracking = () => {
  const trackVisitor = async () => {
    try {
      await supabase.functions.invoke('statistics-tracker', {
        body: {
          action: 'track_visitor',
          data: {
            type: 'page_view'
          }
        }
      });
    } catch (error) {
      console.error('Error tracking visitor:', error);
    }
  };

  useEffect(() => {
    // Track visitor once when component mounts
    const hasTrackedVisit = sessionStorage.getItem('visitor_tracked');
    
    if (!hasTrackedVisit) {
      trackVisitor();
      sessionStorage.setItem('visitor_tracked', 'true');
    }
  }, []);

  return { trackVisitor };
};