import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { user } = useAdminAuth();
  const location = useLocation();

  if (!user) {
    // Check if this is a maintainer route
    if (location.pathname.startsWith('/Maintainer')) {
      // Redirect to admin login page (which is also used for maintainers)
      return <Navigate to="/admin" state={{ from: location }} replace />;
    }
    // Redirect to admin login page while preserving the intended destination
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}