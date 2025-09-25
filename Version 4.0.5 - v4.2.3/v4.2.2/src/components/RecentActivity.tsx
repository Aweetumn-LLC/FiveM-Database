import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { Search, Server, Shield, Database } from "lucide-react";

interface ResourceSearchItem {
  id: string;
  search_query: string;
  search_type: string;
  is_blacklisted: boolean;
  created_at: string;
}

interface ServerCheckItem {
  id: string;
  connection_code: string;
  status: string;
  checked_at: string;
  server_data?: any;
}

interface RecentActivityResponse {
  resource_searches: ResourceSearchItem[];
  server_checks: ServerCheckItem[];
  stats: {
    resource: any | null;
    server: any | null;
    blacklist: Array<{ blacklist_type: string; total_entries: number; total_searches: number }>;
  };
}

const StatPill = ({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: any; color: string }) => (
  <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-background/60 border border-border/50">
    <Icon className={`h-4 w-4 ${color}`} />
    <span className="text-sm text-muted-foreground">{label}:</span>
    <span className={`text-sm font-semibold ${color}`}>{value}</span>
  </div>
);

export default function RecentActivity() {
  const [data, setData] = useState<RecentActivityResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke<RecentActivityResponse>('recent-activity', {
        body: { limit: 8 },
      });
      if (!error) setData(data as any);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Skeleton className="h-64 w-full bg-white/5" />
        <Skeleton className="h-64 w-full bg-white/5" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats summary */}
      <div className="flex flex-wrap gap-3">
        <StatPill label="Total Searches" value={data?.stats.resource?.total_searches || 0} icon={Search} color="text-blue-400" />
        <StatPill label="Server Checks" value={data?.stats.server?.total_checks || 0} icon={Server} color="text-cyan-400" />
        <StatPill label="Blacklist Entries" value={(data?.stats.blacklist || []).reduce((s, b) => s + (b.total_entries || 0), 0)} icon={Database} color="text-red-400" />
        <StatPill label="Clean Results" value={data?.stats.resource?.clean_searches || 0} icon={Shield} color="text-emerald-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Searches */}
        <Card className="bg-card/50 backdrop-blur-xl border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Search className="h-5 w-5 text-blue-400" />
              Recent Searches
              <Badge variant="outline" className="ml-2">{data?.resource_searches.length || 0}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(data?.resource_searches || []).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50">
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {item.search_query}
                    </div>
                    <div className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleString()} • {item.search_type.replace(/_/g, ' ')}</div>
                  </div>
                  <Badge variant="outline" className={item.is_blacklisted ? 'text-red-400 border-red-400/30' : 'text-green-400 border-green-400/30'}>
                    {item.is_blacklisted ? 'Blacklisted' : 'Clean'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Server Checks */}
        <Card className="bg-card/50 backdrop-blur-xl border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Server className="h-5 w-5 text-cyan-400" />
              Recent Server Lookups
              <Badge variant="outline" className="ml-2">{data?.server_checks.length || 0}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(data?.server_checks || []).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50">
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {item.connection_code?.toUpperCase?.() || 'N/A'}
                    </div>
                    <div className="text-xs text-muted-foreground">{new Date(item.checked_at).toLocaleString()}</div>
                  </div>
                  <Badge variant="outline" className={item.status === 'success' ? 'text-green-400 border-green-400/30' : 'text-yellow-400 border-yellow-400/30'}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
