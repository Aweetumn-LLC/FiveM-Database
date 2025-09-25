import { Shield } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import MaintainerSidebar from "@/components/MaintainerSidebar";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Outlet, Navigate } from "react-router-dom";

const AdminMaintainer = () => {
  const { user } = useAdminAuth();
  
  // Check if user is authenticated and has proper Discord ID
  const staffDiscordIDs = ['1320215445768372366', '259408255053201409', '406719326419288066'];
  const hasAccess = user && (
    user.username === 'Maintainer' || 
    (user.id && staffDiscordIDs.includes(user.id))
  );

  // Redirect to admin login if not authenticated
  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  // Show access denied if user doesn't have proper permissions
  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You do not have permission to access the Maintainer Panel.</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" style={{ background: 'var(--theme-background)' }}>
        <MaintainerSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="glass-effect border-b border-white/10 sticky top-0 z-40">
            <div className="px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="text-white/80 hover:text-white" />
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-orange-600 to-red-600">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">Maintainer Panel</h1>
                    <p className="text-sm text-muted-foreground">Privileged access (Level 2)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminMaintainer;