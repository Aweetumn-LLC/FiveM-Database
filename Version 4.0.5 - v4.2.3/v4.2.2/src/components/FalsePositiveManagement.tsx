import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Check, Clock, Server, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAdminLogger } from "@/hooks/useAdminLogger";

interface FalsePositiveReport {
  id: string;
  resource_name: string;
  report_type: string;
  server_name?: string | null;
  connection_code?: string | null;
  report_count: number;
  last_reported_at: string;
  created_at: string;
}

const FalsePositiveManagement = () => {
  const [reports, setReports] = useState<FalsePositiveReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<string[]>([]);
  const { logAdminAction } = useAdminLogger();

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('false_positive_reports')
        .select('*')
        .order('report_count', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching false positive reports:', error);
      toast.error('Failed to load false positive reports');
    } finally {
      setLoading(false);
    }
  };

  const markAsSolved = async (report: FalsePositiveReport) => {
    if (processingIds.includes(report.id)) return;

    setProcessingIds(prev => [...prev, report.id]);
    
    try {
      const { error } = await supabase
        .from('false_positive_reports')
        .delete()
        .eq('id', report.id);

      if (error) throw error;

      // Log admin action
      await logAdminAction(
        'admin', // This should be replaced with actual admin username
        'DELETE',
        'false_positive_reports',
        report.resource_name,
        `Marked false positive report as solved: ${report.resource_name} (${report.report_type})`
      );

      toast.success('Report marked as solved');
      setReports(prev => prev.filter(r => r.id !== report.id));
    } catch (error) {
      console.error('Error marking report as solved:', error);
      toast.error('Failed to mark report as solved');
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== report.id));
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return (
      <Card className="border-0 shadow-lg bg-card/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-card/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-yellow-400">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
            </div>
            False Positive Reports
          </CardTitle>
          <CardDescription>
            User-reported false positives from checker tools. Review and mark as solved to remove from the database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <Alert className="border-green-500/30 bg-green-500/10">
              <Check className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-200">
                No false positive reports to review. All reports have been resolved!
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 bg-card/50 border border-border/50 rounded-xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {report.report_type === 'resource_checker' ? (
                            <Shield className="h-4 w-4 text-blue-400" />
                          ) : (
                            <Server className="h-4 w-4 text-purple-400" />
                          )}
                          <h4 className="font-semibold text-foreground">
                            {report.resource_name}
                          </h4>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            report.report_type === 'resource_checker'
                              ? 'border-blue-500/40 text-blue-400 bg-blue-500/5'
                              : 'border-purple-500/40 text-purple-400 bg-purple-500/5'
                          }`}
                        >
                          {report.report_type === 'resource_checker' ? 'Resource Checker' : 'Server Checker'}
                        </Badge>
                      </div>

                      {report.server_name && (
                        <p className="text-sm text-muted-foreground mb-1">
                          Server: {report.server_name} ({report.connection_code})
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Reports: {report.report_count}
                        </div>
                        <div>
                          Last reported: {new Date(report.last_reported_at).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => markAsSolved(report)}
                      disabled={processingIds.includes(report.id)}
                      className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30"
                    >
                      {processingIds.includes(report.id) ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 border border-green-400/30 border-t-green-400 rounded-full animate-spin" />
                          Resolving...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Check className="h-3 w-3" />
                          Mark as Solved
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FalsePositiveManagement;