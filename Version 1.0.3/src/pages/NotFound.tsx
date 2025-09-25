
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-light mb-4">404</h1>
        <p className="text-xl text-white/60 font-light mb-4">Page not found</p>
        <Link to="/reports" className="text-white underline font-light minimal-hover">
          Return to Reports
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
