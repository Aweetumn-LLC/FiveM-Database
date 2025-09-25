
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const Discord = () => {
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.href = "https://discord.fivemdb.net";
    }, 1500);
    
    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-radial from-background to-black/50 px-4">
      <div className="glass-card p-6 md:p-8 lg:p-10 rounded-xl text-center animate-fade-in max-w-md mx-auto w-full">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <div className="relative">
            <Loader2 className="w-10 h-10 md:w-12 md:h-12 text-primary animate-spin" />
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-ring"></div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-lg md:text-xl lg:text-2xl font-display font-medium">Redirecting to Discord</h1>
            <p className="text-white/70 text-sm md:text-base">Please wait while we connect you to our community...</p>
          </div>
          
          <div className="w-full max-w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 animate-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discord;
