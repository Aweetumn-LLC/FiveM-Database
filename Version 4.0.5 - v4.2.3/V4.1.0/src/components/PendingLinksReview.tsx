import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Clock, Check, X, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PendingLinksReview = () => {
  const [pendingLinks, setPendingLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLink, setSelectedLink] = useState<any>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  useEffect(() => {
    fetchPendingLinks();
  }, []);

  const fetchPendingLinks = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('blacklist_reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setPendingLinks(data);
      } else {
        console.error('Error fetching blacklist reviews:', error);
        setPendingLinks([]);
      }
    } catch (error: any) {
      console.error('Error fetching pending links:', error);
      toast.error("Failed to fetch pending links");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (link: any) => {
    try {
      console.log('Approving link:', link);
      
      // Move to blacklist_entries
      const { data: insertData, error: insertError } = await supabase
        .from('blacklist_entries')
        .insert([{
          name: link.name,
          keyword: link.keyword,
          links: link.links || [],
          reason: link.reason,
          severity: link.severity,
          category: link.category,
          flagged_by: link.flagged_by,
          blacklisted_since: link.blacklisted_since || new Date().toISOString(),
          discord_server_id: link.discord_server_id || null
        }])
        .select();

      if (insertError) {
        console.error('Insert error:', insertError);
        throw insertError;
      }
      
      console.log('Inserted into blacklist_entries:', insertData);

      // Delete from blacklist_reviews
      const { error: deleteError } = await supabase
        .from('blacklist_reviews')
        .delete()
        .eq('id', link.id);

      if (deleteError) {
        console.error('Delete error:', deleteError);
        throw deleteError;
      }

      toast.success("Link approved and added to blacklist");

      fetchPendingLinks();
      setIsReviewDialogOpen(false);
    } catch (error: any) {
      console.error('Error approving link:', error);
      toast.error(error.message || "Failed to approve link");
    }
  };

  const handleReject = async (link: any) => {
    try {
      // Delete from blacklist_reviews
      const { error } = await supabase
        .from('blacklist_reviews')
        .delete()
        .eq('id', link.id);

      if (error) throw error;

      toast.success("Link rejected and removed");

      fetchPendingLinks();
      setIsReviewDialogOpen(false);
    } catch (error: any) {
      console.error('Error rejecting link:', error);
      toast.error(error.message || "Failed to reject link");
    }
  };

  const openReviewDialog = (link: any) => {
    setSelectedLink(link);
    setIsReviewDialogOpen(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-400" />
            <div>
              <CardTitle className="text-white">Pending Links Review</CardTitle>
              <CardDescription className="text-white/60">
                Review and approve or reject pending blacklist submissions
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[500px]">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-white/60">Name</TableHead>
                <TableHead className="text-white/60">Keyword</TableHead>
                <TableHead className="text-white/60">Reason</TableHead>
                <TableHead className="text-white/60">Severity</TableHead>
                <TableHead className="text-white/60">Flagged By</TableHead>
                <TableHead className="text-white/60">Created</TableHead>
                <TableHead className="text-white/60">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-white/60">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : pendingLinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-white/60">
                    No pending links for review
                  </TableCell>
                </TableRow>
              ) : (
                pendingLinks.map((link) => (
                  <TableRow key={link.id} className="border-white/10">
                    <TableCell className="text-white">{link.name}</TableCell>
                    <TableCell className="text-white/80">{link.keyword}</TableCell>
                    <TableCell className="text-white/80 max-w-[200px] truncate">
                      {link.reason}
                    </TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(link.severity)}>
                        {link.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white/60">{link.flagged_by}</TableCell>
                    <TableCell className="text-white/60">
                      {new Date(link.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => openReviewDialog(link)}
                        className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400"
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="bg-gray-900 border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Pending Link</DialogTitle>
            <DialogDescription className="text-white/60">
              Review the submission details and approve or reject
            </DialogDescription>
          </DialogHeader>

          {selectedLink && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/60">Name</label>
                  <p className="text-white">{selectedLink.name}</p>
                </div>
                <div>
                  <label className="text-sm text-white/60">Keyword</label>
                  <p className="text-white">{selectedLink.keyword}</p>
                </div>
              </div>

              <div>
                <label className="text-sm text-white/60">Links</label>
                {selectedLink.links && selectedLink.links.length > 0 ? (
                  <div className="mt-1 space-y-1">
                    {selectedLink.links.map((link: string, idx: number) => (
                      <p key={idx} className="text-white/80 text-sm break-all">{link}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/40">No links provided</p>
                )}
              </div>

              <div>
                <label className="text-sm text-white/60">Reason</label>
                <p className="text-white/80">{selectedLink.reason}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-white/60">Severity</label>
                  <Badge className={`mt-1 ${getSeverityColor(selectedLink.severity)}`}>
                    {selectedLink.severity}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm text-white/60">Category</label>
                  <p className="text-white">{selectedLink.category}</p>
                </div>
                <div>
                  <label className="text-sm text-white/60">Flagged By</label>
                  <p className="text-white">{selectedLink.flagged_by}</p>
                </div>
              </div>

              {selectedLink.discord_server_id && (
                <div>
                  <label className="text-sm text-white/60">Discord Server ID</label>
                  <p className="text-white">{selectedLink.discord_server_id}</p>
                </div>
              )}

              <div>
                <label className="text-sm text-white/60">Submitted</label>
                <p className="text-white">
                  {new Date(selectedLink.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsReviewDialogOpen(false)}
              className="border-white/10 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={() => selectedLink && handleReject(selectedLink)}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400"
            >
              <X className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button
              onClick={() => selectedLink && handleApprove(selectedLink)}
              className="bg-green-500/20 hover:bg-green-500/30 text-green-400"
            >
              <Check className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PendingLinksReview;