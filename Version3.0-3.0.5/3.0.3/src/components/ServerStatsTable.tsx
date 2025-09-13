
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useServerStats } from "@/hooks/useServerStats";
import { Server, Users, AlertTriangle, XCircle, Activity, TrendingUp } from "lucide-react";

const ServerStatsTable = () => {
  const { stats, loading } = useServerStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const violationRate = stats.totalChecks > 0 ? 
    ((stats.totalViolationsTos + stats.totalViolationsCoc) / stats.totalChecks * 100).toFixed(1) : '0.0';
  
  const avgPlayersPerServer = stats.uniqueServersChecked > 0 ? 
    (stats.totalPlayersSeen / stats.uniqueServersChecked).toFixed(1) : '0.0';

  const statsData = [
    {
      metric: 'Total Server Checks',
      value: stats.totalChecks.toLocaleString(),
      icon: <Activity className="h-5 w-5 text-blue-400" />,
      description: 'All server checks performed'
    },
    {
      metric: 'Unique Servers Checked',
      value: stats.uniqueServersChecked.toLocaleString(),
      icon: <Server className="h-5 w-5 text-green-400" />,
      description: 'Different servers analyzed'
    },
    {
      metric: 'TOS Violations Found',
      value: stats.totalViolationsTos.toLocaleString(),
      icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
      description: 'IP/Brand violations detected'
    },
    {
      metric: 'COC Violations Found',
      value: stats.totalViolationsCoc.toLocaleString(),
      icon: <XCircle className="h-5 w-5 text-red-400" />,
      description: 'Content violations detected'
    },
    {
      metric: 'Total Players Seen',
      value: stats.totalPlayersSeen.toLocaleString(),
      icon: <Users className="h-5 w-5 text-purple-400" />,
      description: 'All players across checked servers'
    },
    {
      metric: 'Violation Rate',
      value: `${violationRate}%`,
      icon: <TrendingUp className="h-5 w-5 text-orange-400" />,
      description: 'Percentage of checks with violations'
    },
    {
      metric: 'Avg Players per Server',
      value: avgPlayersPerServer,
      icon: <Users className="h-5 w-5 text-cyan-400" />,
      description: 'Average player count per server'
    }
  ];

  return (
    <Card className="glass-card border-0">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Server className="h-6 w-6 text-orange-400" />
          Detailed Server Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead className="text-white/70">Metric</TableHead>
              <TableHead className="text-white/70">Value</TableHead>
              <TableHead className="text-white/70">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statsData.map((stat, index) => (
              <TableRow key={index} className="border-white/10">
                <TableCell className="text-white">
                  <div className="flex items-center gap-2">
                    {stat.icon}
                    {stat.metric}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-white font-bold">
                    {stat.value}
                  </Badge>
                </TableCell>
                <TableCell className="text-white/70 text-sm">
                  {stat.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ServerStatsTable;
