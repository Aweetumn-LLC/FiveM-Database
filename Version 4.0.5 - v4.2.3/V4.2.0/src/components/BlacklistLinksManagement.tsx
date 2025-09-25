import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Link, Search, Trash2, Plus, Edit2, X, Check } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useAdminLogger } from "@/hooks/useAdminLogger";

interface BlacklistLink {
  id: string;
  name: string;
  keyword: string;
  links: string[] | null;
  reason: string;
  severity: string;
  category: string;
  flagged_by: string;
  created_at: string;
  blacklisted_since: string | null;
}

const BlacklistLinksManagement = () => {
  const { user } = useAdminAuth();
  const { logAdminAction } = useAdminLogger();
  const [links, setLinks] = useState<BlacklistLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<BlacklistLink | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    keyword: "",
    links: "",
    reason: "",
    severity: "low",
    category: "link",
    flagged_by: ""
  });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blacklist_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching blacklist links:', error);
      toast.error("Failed to fetch blacklist links");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const linksArray = formData.links.split(',').map(l => l.trim()).filter(l => l);
      
      const { error } = await supabase
        .from('blacklist_entries')
        .insert([{
          name: formData.name,
          keyword: formData.keyword,
          links: linksArray,
          reason: formData.reason,
          severity: formData.severity,
          category: formData.category,
          flagged_by: formData.flagged_by,
          blacklisted_since: new Date().toISOString()
        }]);

      if (error) throw error;

      // Log the admin action
      await logAdminAction(
        user?.username || 'Unknown',
        'added',
        'blacklist_entries',
        formData.name,
        `Added blacklist link "${formData.name}" with keyword "${formData.keyword}"`
      );

      toast.success("Blacklist link added successfully");

      setIsAddDialogOpen(false);
      setFormData({
        name: "",
        keyword: "",
        links: "",
        reason: "",
        severity: "low",
        category: "link",
        flagged_by: ""
      });
      fetchLinks();
    } catch (error) {
      console.error('Error adding blacklist link:', error);
      toast.error("Failed to add blacklist link");
    }
  };

  const handleEdit = async () => {
    if (!editingLink) return;

    try {
      const linksArray = formData.links.split(',').map(l => l.trim()).filter(l => l);
      
      const { error } = await supabase
        .from('blacklist_entries')
        .update({
          name: formData.name,
          keyword: formData.keyword,
          links: linksArray,
          reason: formData.reason,
          severity: formData.severity,
          category: formData.category,
          flagged_by: formData.flagged_by
        })
        .eq('id', editingLink.id);

      if (error) throw error;

      // Log the admin action
      await logAdminAction(
        user?.username || 'Unknown',
        'updated',
        'blacklist_entries',
        formData.name,
        `Updated blacklist link "${formData.name}"`
      );

      toast.success("Blacklist link updated successfully");

      setIsEditDialogOpen(false);
      setEditingLink(null);
      fetchLinks();
    } catch (error) {
      console.error('Error updating blacklist link:', error);
      toast.error("Failed to update blacklist link");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blacklist_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Find the deleted link name for logging
      const deletedLink = links.find(link => link.id === id);
      
      // Log the admin action
      await logAdminAction(
        user?.username || 'Unknown',
        'deleted',
        'blacklist_entries',
        deletedLink?.name || 'Unknown',
        `Deleted blacklist link "${deletedLink?.name || 'Unknown'}"`
      );

      toast.success("Blacklist link deleted successfully");

      fetchLinks();
    } catch (error) {
      console.error('Error deleting blacklist link:', error);
      toast.error("Failed to delete blacklist link");
    }
  };

  const openEditDialog = (link: BlacklistLink) => {
    setEditingLink(link);
    setFormData({
      name: link.name,
      keyword: link.keyword,
      links: link.links?.join(', ') || '',
      reason: link.reason,
      severity: link.severity,
      category: link.category,
      flagged_by: link.flagged_by
    });
    setIsEditDialogOpen(true);
  };

  const filteredLinks = links.filter(link =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (link.links && link.links.some(l => l.toLowerCase().includes(searchTerm.toLowerCase())))
  );

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
            <Link className="h-5 w-5 text-orange-400" />
            <div>
              <CardTitle className="text-white">Blacklisted Links</CardTitle>
              <CardDescription className="text-white/60">
                Manage blacklisted links and URLs
              </CardDescription>
            </div>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-white/60" />
          <Input
            placeholder="Search blacklisted links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
        </div>

        <ScrollArea className="h-[500px]">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-white/60">Name</TableHead>
                <TableHead className="text-white/60">Keyword</TableHead>
                <TableHead className="text-white/60">Links</TableHead>
                <TableHead className="text-white/60">Reason</TableHead>
                <TableHead className="text-white/60">Severity</TableHead>
                <TableHead className="text-white/60">Category</TableHead>
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
              ) : filteredLinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-white/60">
                    No blacklisted links found
                  </TableCell>
                </TableRow>
              ) : (
                filteredLinks.map((link) => (
                  <TableRow key={link.id} className="border-white/10">
                    <TableCell className="text-white">{link.name}</TableCell>
                    <TableCell className="text-white/80">{link.keyword}</TableCell>
                    <TableCell className="text-white/80">
                      {link.links && link.links.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {link.links.slice(0, 2).map((url, idx) => (
                            <span key={idx} className="text-xs truncate max-w-[200px]">
                              {url}
                            </span>
                          ))}
                          {link.links.length > 2 && (
                            <span className="text-xs text-white/40">
                              +{link.links.length - 2} more
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-white/40">No links</span>
                      )}
                    </TableCell>
                    <TableCell className="text-white/80 max-w-[200px] truncate">
                      {link.reason}
                    </TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(link.severity)}>
                        {link.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-white/20 text-white/60">
                        {link.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEditDialog(link)}
                          className="text-white/60 hover:text-white hover:bg-white/10"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(link.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-gray-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Add Blacklisted Link</DialogTitle>
            <DialogDescription className="text-white/60">
              Add a new link to the blacklist
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keyword" className="text-white">Keyword</Label>
              <Input
                id="keyword"
                value={formData.keyword}
                onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="links" className="text-white">Links (comma-separated)</Label>
              <Textarea
                id="links"
                value={formData.links}
                onChange={(e) => setFormData({ ...formData, links: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
                placeholder="https://example.com, https://another.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason" className="text-white">Reason</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="severity" className="text-white">Severity</Label>
                <Select
                  value={formData.severity}
                  onValueChange={(value) => setFormData({ ...formData, severity: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="flagged_by" className="text-white">Flagged By</Label>
              <Input
                id="flagged_by"
                value={formData.flagged_by}
                onChange={(e) => setFormData({ ...formData, flagged_by: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              className="border-white/10 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Add Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Edit Blacklisted Link</DialogTitle>
            <DialogDescription className="text-white/60">
              Update the blacklisted link information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-white">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-keyword" className="text-white">Keyword</Label>
              <Input
                id="edit-keyword"
                value={formData.keyword}
                onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-links" className="text-white">Links (comma-separated)</Label>
              <Textarea
                id="edit-links"
                value={formData.links}
                onChange={(e) => setFormData({ ...formData, links: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
                placeholder="https://example.com, https://another.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-reason" className="text-white">Reason</Label>
              <Textarea
                id="edit-reason"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-severity" className="text-white">Severity</Label>
                <Select
                  value={formData.severity}
                  onValueChange={(value) => setFormData({ ...formData, severity: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-category" className="text-white">Category</Label>
                <Input
                  id="edit-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-flagged_by" className="text-white">Flagged By</Label>
              <Input
                id="edit-flagged_by"
                value={formData.flagged_by}
                onChange={(e) => setFormData({ ...formData, flagged_by: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-white/10 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEdit}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Update Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default BlacklistLinksManagement;