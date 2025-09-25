import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Server, Users, AlertTriangle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ServerCheck {
  id: string;
  connection_code: string;
  checked_at: string;
  status: string;
  server_data: any;
}

const RecentServers = () => {
  const [serverChecks, setServerChecks] = useState<ServerCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadServerChecks();
  }, []);

  const loadServerChecks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('server_checks')
        .select('*')
        .order('checked_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error loading server checks:', error);
        return;
      }

      setServerChecks(data || []);
    } catch (error) {
      console.error('Error loading server checks:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getServerName = (serverData: any) => {
    if (!serverData?.Data) return 'Unknown Server';
    return serverData.Data.hostname || 'Unknown Server';
  };

  const getPlayerCount = (serverData: any) => {
    if (!serverData?.Data) return 0;
    return serverData.Data.clients || 0;
  };

  const getViolations = (serverData: any) => {
    if (!serverData?.resourceAnalysis) return { tos: 0, coc: 0 };
    return {
      tos: serverData.resourceAnalysis.tos?.length || 0,
      coc: serverData.resourceAnalysis.coc?.length || 0
    };
  };

  const filteredChecks = serverChecks.filter(check => 
    check.connection_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getServerName(check.server_data).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Recent Server Checks</h2>
          <p className="text-muted-foreground">Monitor recently checked FiveM servers</p>
        </div>
        <Button onClick={loadServerChecks} variant="outline" className="border-white/20 hover:bg-white/10 text-white/80 hover:text-white">
          Refresh
        </Button>
      </div>

      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Server className="w-5 h-5 text-cyan-400" />
            <span>Server Check History</span>
          </CardTitle>
          <CardDescription>
            <div className="flex items-center space-x-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by connection code or server name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <Badge variant="secondary" className="bg-white/10 text-white border-0">
                {filteredChecks.length} checks
              </Badge>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/80">Connection Code</TableHead>
                  <TableHead className="text-white/80">Server Name</TableHead>
                  <TableHead className="text-white/80">Players</TableHead>
                  <TableHead className="text-white/80">TOS Violations</TableHead>
                  <TableHead className="text-white/80">COC Violations</TableHead>
                  <TableHead className="text-white/80">Status</TableHead>
                  <TableHead className="text-white/80">Checked At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChecks.map((check) => {
                  const violations = getViolations(check.server_data);
                  return (
                    <TableRow key={check.id} className="border-white/10">
                      <TableCell className="text-white font-mono">
                        {check.connection_code}
                      </TableCell>
                      <TableCell className="text-white max-w-xs truncate">
                        {getServerName(check.server_data)}
                      </TableCell>
                      <TableCell className="text-white">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span>{getPlayerCount(check.server_data)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {violations.tos > 0 ? (
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                            {violations.tos} violations
                          </Badge>
                        ) : (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Clean
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {violations.coc > 0 ? (
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                            {violations.coc} violations
                          </Badge>
                        ) : (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Clean
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {check.status === 'success' ? (
                          <div className="flex items-center space-x-2 text-green-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Success</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-red-400">
                            <AlertTriangle className="w-4 h-4" />
                            <span>Failed</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-white/60">
                        {formatDate(check.checked_at)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          {filteredChecks.length === 0 && (
            <div className="text-center py-8">
              <Server className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No server checks found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentServers;