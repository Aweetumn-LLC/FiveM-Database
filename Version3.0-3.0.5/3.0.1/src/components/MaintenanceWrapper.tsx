import { useMaintenanceMode } from '@/hooks/useMaintenanceMode';
import { useLocation } from 'react-router-dom';
import { Settings, Wrench } from 'lucide-react';

interface MaintenanceWrapperProps {
  children: React.ReactNode;
}

const MaintenanceWrapper = ({ children }: MaintenanceWrapperProps) => {
  const { isMaintenanceMode, loading } = useMaintenanceMode();
  const location = useLocation();

  // Don't show maintenance mode for admin panel or admin routes
  const isAdminPanel = location.pathname.startsWith('/admin');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--theme-background)' }}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isMaintenanceMode && !isAdminPanel) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--theme-background)' }}>
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-8">
            <div className="relative">
              <Settings className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-spin" style={{ animationDuration: '3s' }} />
              <Wrench className="w-8 h-8 text-orange-400 absolute top-2 right-2" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Under Maintenance
          </h1>
          
          <p className="text-gray-300 text-lg mb-6">
            We're currently performing scheduled maintenance to improve your experience. 
            Please check back in a few minutes.
          </p>
          
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">
              Expected downtime: 15-30 minutes
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default MaintenanceWrapper;