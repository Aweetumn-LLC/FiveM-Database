import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Users, UserCog, Activity, Database, Settings, History, Download, Upload } from "lucide-react";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface ActivityLog {
  id: string;
  created_at: string;
  action_type: string;
  action_description: string;
  maintainer_username: string;
}

export default function Dashboard() {
  const [adminCount, setAdminCount] = useState<number>(0);
  const [maintainerCount, setMaintainerCount] = useState<number>(0);
  const [recentLogs, setRecentLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [adminsRes, maintainersRes, logsRes] = await Promise.all([
          supabase.from('admin_users').select('*', { count: 'exact', head: true }),
          supabase.from('maintainer_users').select('*', { count: 'exact', head: true }),
          supabase.from('maintainer_activity_logs').select('*').order('created_at', { ascending: false }).limit(6),
        ]);
        setAdminCount(adminsRes.count ?? 0);
        setMaintainerCount(maintainersRes.count ?? 0);
        setRecentLogs((logsRes.data as any) || []);
      } catch (e) {
        // silent fail UI-wise
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Maintainer Dashboard | FiveM DB</title>
        <meta name="description" content="Maintainer Dashboard with operational insights." />
        <link rel="canonical" href={`${window.location.origin}/Maintainer`} />
      </Helmet>

      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-orange-600 to-red-600">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Maintainer Dashboard</h1>
          <p className="text-muted-foreground">Operational overview</p>
        </div>
      </div>

      <Card className="border-rose-500/30 bg-rose-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-rose-400">
            <AlertTriangle className="h-5 w-5" /> HIGHLY SENSITIVE
          </CardTitle>
          <CardDescription>Handle with care. Actions may affect production.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass-card border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Total Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loading ? '—' : adminCount}</div>
            <p className="text-muted-foreground text-sm">Active admin accounts</p>
          </CardContent>
        </Card>
        <Card className="glass-card border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserCog className="h-5 w-5 text-primary" /> Total Maintainers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loading ? '—' : maintainerCount}</div>
            <p className="text-muted-foreground text-sm">Active maintainer accounts</p>
          </CardContent>
        </Card>
        <Card className="glass-card border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Database className="h-5 w-5 text-primary" /> Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{loading ? '—' : recentLogs.length}</div>
            <p className="text-muted-foreground text-sm">Last 6 actions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass-card border border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> Latest Maintainer Activity</CardTitle>
            <CardDescription>Most recent actions performed by maintainers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLogs.length === 0 && !loading && (
                <div className="text-sm text-muted-foreground">No activity yet.</div>
              )}
              {recentLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-background/60 border border-border">
                  <div>
                    <div className="text-sm text-foreground/90 font-medium">{log.action_type}</div>
                    <div className="text-xs text-muted-foreground">{log.action_description}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(log.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5 text-primary" /> Quick Actions</CardTitle>
            <CardDescription>Navigate to common maintainer tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3">
            <Button asChild variant="outline" className="justify-start">
              <Link to="/Maintainer/admins/add"><Users className="h-4 w-4 mr-2" /> Add Admins</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/Maintainer/maintainers/add"><UserCog className="h-4 w-4 mr-2" /> Add Maintainers</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/Maintainer/exports"><Download className="h-4 w-4 mr-2" /> Database Exports</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/Maintainer/imports"><Upload className="h-4 w-4 mr-2" /> Database Imports</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/Maintainer/settings"><Settings className="h-4 w-4 mr-2" /> Website Settings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
