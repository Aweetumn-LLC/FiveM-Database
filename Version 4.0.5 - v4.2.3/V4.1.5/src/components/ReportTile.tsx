
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Server } from "lucide-react";

export type ReportStatus = "open" | "closed" | "resolved";
export type ServerStatus = "online" | "offline" | "unknown";

export interface ReportData {
  id: string;
  serverName: string;
  connectionCode: string;
  ownerProfile: string;
  violations: string[];
  reportLink?: string;
  status: ReportStatus;
  reportDate?: string;
  serverStatus?: ServerStatus;
  playerCount?: number;
  maxPlayers?: number;
}

interface ReportTileProps {
  report: ReportData;
}

const ReportTile = ({ report }: ReportTileProps) => {
  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case 'open':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'closed':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'resolved':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      default:
        return '';
    }
  };

  const getServerStatusColor = (status: ServerStatus = 'unknown') => {
    switch (status) {
      case 'online':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'offline':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'unknown':
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <Link to={`/report/${report.id}`} className="block">
      <Card className="glass-neo hover:glass-hover transition-all duration-300 h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg mb-2 line-clamp-2">
                {report.serverName}
              </h3>
              <p className="text-sm text-white/60 font-mono mb-3">
                {report.connectionCode}
              </p>
            </div>
            <ExternalLink size={16} className="text-white/40 flex-shrink-0 ml-2" />
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex flex-wrap gap-2">
              <Badge className={`${getStatusColor(report.status)} capitalize text-xs px-2 py-1`}>
                {report.status}
              </Badge>
              
              {report.serverStatus && (
                <Badge className={`${getServerStatusColor(report.serverStatus)} capitalize text-xs px-2 py-1 flex items-center gap-1`}>
                  <Server size={12} />
                  {report.serverStatus}
                  {report.serverStatus === 'online' && report.playerCount !== undefined && report.maxPlayers !== undefined && 
                    ` (${report.playerCount}/${report.maxPlayers})`}
                </Badge>
              )}
            </div>
            
            {report.reportDate && (
              <div className="flex items-center gap-1 text-xs text-white/50">
                <Calendar size={12} />
                {report.reportDate}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">Violations:</h4>
            <div className="space-y-1">
              {report.violations.slice(0, 3).map((violation, index) => (
                <p key={index} className="text-xs text-white/60 line-clamp-1">
                  • {violation}
                </p>
              ))}
              {report.violations.length > 3 && (
                <p className="text-xs text-white/50">
                  +{report.violations.length - 3} more violations
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ReportTile;
