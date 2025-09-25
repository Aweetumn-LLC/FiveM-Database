
import { Database, Shield, Activity, Server, AlertTriangle, AlertCircle, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePlatformStats } from "@/hooks/usePlatformStats";

const iconMap = {
  Database,
  Shield,
  Activity,
  Server,
  AlertTriangle,
  AlertCircle,
  Users,
  TrendingUp
};

const PlatformStatsGrid = () => {
  const { stats, loading } = usePlatformStats();

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Live Platform Statistics
            </span>
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Real-time security insights across our entire platform
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
            return (
              <Card key={index} className={`bg-gradient-to-br ${stat.bgGradient} border-gray-800 hover:border-orange-500/30 transition-all duration-300 hover:scale-105 group relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-4 relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700`}>
                      <IconComponent className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs bg-gray-800/50 text-gray-300 border-gray-700 px-2 py-1">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-400 font-medium leading-tight">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformStatsGrid;
