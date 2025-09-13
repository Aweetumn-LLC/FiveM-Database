
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
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-light mb-4 md:mb-6">404</h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/60 font-light mb-6 md:mb-8">Page not found</p>
        <Link 
          to="/reports" 
          className="text-white underline font-light minimal-hover text-base md:text-lg inline-block py-2 px-4 hover:bg-white/5 rounded transition-colors"
        >
          Return to Reports
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
