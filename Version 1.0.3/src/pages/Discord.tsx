
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const Discord = () => {
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.href = "https://discord.fivemdb.online";
    }, 1500); // Short delay for the loading animation
    
    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-radial from-background to-black/50">
      <div className="glass-card p-10 rounded-xl text-center animate-fade-in">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-ring"></div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-xl font-display font-medium">Redirecting to Discord</h1>
            <p className="text-white/70">Please wait while we connect you to our community...</p>
          </div>
          
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 animate-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discord;
