import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Plus, Trash2, Shield, Eye, EyeOff, Download, Upload, Users, Server, Store, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useAdminLogger } from "@/hooks/useAdminLogger";

interface BlacklistItem {
  id: string;
  created_at: string;
  updated_at: string;
  reason: string;
  proof_images?: string[] | null;
  evidence_links?: string[] | null;
  // User blacklist specific
  discord_id?: string | null;
  fivem_id?: string | null;
  // Server blacklist specific
  server_name?: string;
  owner_fivem_id?: string;
  // Store blacklist specific
  store_name?: string;
  store_links?: string[] | null;
  resource_prefix?: string | null;
  // Discord blacklist specific
  discord_server_name?: string;
  owner_discord_id?: string;
  discord_invite_links?: string[] | null;
}

interface BlacklistManagementProps {
  type: 'user' | 'server' | 'store' | 'discord';
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const BlacklistManagement: React.FC<BlacklistManagementProps> = ({ type, title, description, icon: Icon }) => {
  const { hasPermission, logActivity, user } = useAdminAuth();
  const { logAdminAction } = useAdminLogger();
  const [items, setItems] = useState<BlacklistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [editingItem, setEditingItem] = useState<BlacklistItem | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    reason: "",
    proof_images: "",
    evidence_links: "",
    // User specific
    discord_id: "",
    fivem_id: "",
    // Server specific
    server_name: "",
    owner_fivem_id: "",
    // Store specific
    store_name: "",
    store_links: "",
    resource_prefix: "",
    // Discord specific
    discord_server_name: "",
    owner_discord_id: "",
    discord_invite_links: ""
  });

  const getTableName = () => `${type}_blacklist` as const;

  useEffect(() => {
    loadData();
  }, [type]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from(getTableName())
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setItems(data as BlacklistItem[] || []);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const addItem = async () => {
    if (!formData.reason.trim()) {
      toast.error("Please enter a reason");
      return;
    }

    if (!hasPermission('edit_keywords')) {
      toast.error("You don't have permission to add items");
      return;
    }

    try {
      const insertData: any = {
        reason: formData.reason.trim(),
        proof_images: formData.proof_images ? formData.proof_images.split(',').map(s => s.trim()).filter(Boolean) : null,
        evidence_links: formData.evidence_links ? formData.evidence_links.split(',').map(s => s.trim()).filter(Boolean) : null,
      };

      // Add type-specific fields
      switch (type) {
        case 'user':
          if (formData.discord_id) insertData.discord_id = formData.discord_id.trim();
          if (formData.fivem_id) insertData.fivem_id = formData.fivem_id.trim();
          break;
        case 'server':
          insertData.server_name = formData.server_name.trim();
          insertData.owner_fivem_id = formData.owner_fivem_id.trim();
          break;
        case 'store':
          insertData.store_name = formData.store_name.trim();
          if (formData.store_links) {
            insertData.store_links = formData.store_links.split(',').map(s => s.trim()).filter(Boolean);
          }
          if (formData.resource_prefix) {
            insertData.resource_prefix = formData.resource_prefix.trim();
          }
          break;
        case 'discord':
          insertData.discord_server_name = formData.discord_server_name.trim();
          insertData.owner_discord_id = formData.owner_discord_id.trim();
          if (formData.discord_invite_links) {
            insertData.discord_invite_links = formData.discord_invite_links.split(',').map(s => s.trim()).filter(Boolean);
          }
          if (formData.resource_prefix) {
            insertData.resource_prefix = formData.resource_prefix.trim();
          }
          break;
      }

      const { error } = await supabase
        .from(getTableName())
        .insert([insertData]);

      if (error) throw error;

      await logActivity('create', `Added ${type} blacklist entry`, {
        action: 'add',
        table: getTableName(),
        data: insertData,
        target_table: getTableName()
      });

      await logAdminAction(
        user?.username || 'Unknown',
        'created',
        getTableName(),
        (insertData.server_name || insertData.store_name || insertData.discord_server_name || insertData.discord_id || insertData.fivem_id || 'new_entry'),
        `Added ${type} blacklist entry`
      );


      resetForm();
      setIsDialogOpen(false);
      loadData();
      toast.success("Item added successfully");
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error("Failed to add item");
    }
  };

  const deleteItem = async (id: string) => {
    if (!hasPermission('edit_keywords')) {
      toast.error("You don't have permission to delete items");
      return;
    }

    try {
      const { error } = await supabase
        .from(getTableName())
        .delete()
        .eq('id', id);

      if (error) throw error;

      await logActivity('delete', `Deleted ${type} blacklist entry`, {
        action: 'delete',
        table: getTableName(),
        target_table: getTableName(),
        target_id: id
      });

      await logAdminAction(
        user?.username || 'Unknown',
        'deleted',
        getTableName(),
        id,
        `Deleted ${type} blacklist entry (ID: ${id})`
      );

      loadData();
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error("Failed to delete item");
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(items, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${type}-blacklist-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const resetForm = () => {
    setFormData({
      reason: "",
      proof_images: "",
      evidence_links: "",
      discord_id: "",
      fivem_id: "",
      server_name: "",
      owner_fivem_id: "",
      store_name: "",
      store_links: "",
      resource_prefix: "",
      discord_server_name: "",
      owner_discord_id: "",
      discord_invite_links: ""
    });
  };

  const openEdit = (item: BlacklistItem) => {
    setEditingItem(item);
    setFormData({
      reason: item.reason || "",
      proof_images: item.proof_images && item.proof_images.length ? item.proof_images.join(', ') : "",
      evidence_links: item.evidence_links && item.evidence_links.length ? item.evidence_links.join(', ') : "",
      // User specific
      discord_id: item.discord_id || "",
      fivem_id: item.fivem_id || "",
      // Server specific
      server_name: item.server_name || "",
      owner_fivem_id: item.owner_fivem_id || "",
      // Store specific
      store_name: item.store_name || "",
      store_links: item.store_links && item.store_links.length ? item.store_links.join(', ') : "",
      resource_prefix: item.resource_prefix || "",
      // Discord specific
      discord_server_name: item.discord_server_name || "",
      owner_discord_id: item.owner_discord_id || "",
      discord_invite_links: item.discord_invite_links && item.discord_invite_links.length ? item.discord_invite_links.join(', ') : "",
    });
    setIsDialogOpen(true);
  };

  const updateItem = async () => {
    if (!editingItem) return;

    if (!formData.reason.trim()) {
      toast.error("Please enter a reason");
      return;
    }

    if (!hasPermission('edit_keywords')) {
      toast.error("You don't have permission to edit items");
      return;
    }

    try {
      const updateData: any = {
        reason: formData.reason.trim(),
        proof_images: formData.proof_images
          ? formData.proof_images.split(',').map((s) => s.trim()).filter(Boolean)
          : null,
        evidence_links: formData.evidence_links
          ? formData.evidence_links.split(',').map((s) => s.trim()).filter(Boolean)
          : null,
      };

      switch (type) {
        case 'user':
          updateData.discord_id = formData.discord_id ? formData.discord_id.trim() : null;
          updateData.fivem_id = formData.fivem_id ? formData.fivem_id.trim() : null;
          break;
        case 'server':
          updateData.server_name = formData.server_name.trim();
          updateData.owner_fivem_id = formData.owner_fivem_id.trim();
          break;
        case 'store':
          updateData.store_name = formData.store_name.trim();
          updateData.store_links = formData.store_links
            ? formData.store_links.split(',').map((s) => s.trim()).filter(Boolean)
            : null;
          updateData.resource_prefix = formData.resource_prefix 
            ? formData.resource_prefix.trim() 
            : null;
          break;
        case 'discord':
          updateData.discord_server_name = formData.discord_server_name.trim();
          updateData.owner_discord_id = formData.owner_discord_id.trim();
          updateData.discord_invite_links = formData.discord_invite_links
            ? formData.discord_invite_links.split(',').map((s) => s.trim()).filter(Boolean)
            : null;
          updateData.resource_prefix = formData.resource_prefix 
            ? formData.resource_prefix.trim() 
            : null;
          break;
      }

      const { error } = await supabase
        .from(getTableName())
        .update(updateData)
        .eq('id', editingItem.id);

      if (error) throw error;

      await logActivity('update', `Updated ${type} blacklist entry`, {
        action: 'update',
        table: getTableName(),
        target_table: getTableName(),
        target_id: editingItem.id,
        data: updateData,
      });

      await logAdminAction(
        user?.username || 'Unknown',
        'updated',
        getTableName(),
        editingItem.id,
        `Updated ${type} blacklist entry (ID: ${editingItem.id})`
      );


      setIsDialogOpen(false);
      setEditingItem(null);
      resetForm();
      loadData();
      toast.success('Item updated successfully');
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Failed to update item');
    }
  };

  const filteredData = items.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.reason?.toLowerCase().includes(searchLower) ||
      item.discord_id?.toLowerCase().includes(searchLower) ||
      item.fivem_id?.toLowerCase().includes(searchLower) ||
      item.server_name?.toLowerCase().includes(searchLower) ||
      item.store_name?.toLowerCase().includes(searchLower) ||
      item.discord_server_name?.toLowerCase().includes(searchLower) ||
      (item.evidence_links && item.evidence_links.join(' ').toLowerCase().includes(searchLower))
    );
  });

  const displayedData = showAll ? filteredData : filteredData.slice(0, 10);

  const canEdit = hasPermission('edit_keywords');
  const canView = hasPermission('view_keywords') || canEdit;

  if (!canView) {
    return (
      <Card className="glass-card border-0">
        <CardContent className="p-8 text-center">
          <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Access Denied</h3>
          <p className="text-white/60">You don't have permission to view this section.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card border-0">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Icon className="h-6 w-6 text-orange-400" />
              <div>
                <CardTitle className="text-white">{title}</CardTitle>
                <CardDescription className="text-white/60">{description}</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-orange-400 border-orange-400/30">
                {items.length} items
              </Badge>
              {canEdit ? (
                <Badge variant="outline" className="text-green-400 border-green-400/30">
                  <Shield className="h-3 w-3 mr-1" />
                  Can Edit
                </Badge>
              ) : (
                <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                  <Eye className="h-3 w-3 mr-1" />
                  View Only
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search blacklist entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={exportData}
                variant="outline"
                size="sm"
                className="border-blue-500/20 hover:bg-blue-500/10 text-blue-400"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              {canEdit && (
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Entry
                </Button>
              )}
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/80">Primary Info</TableHead>
                  <TableHead className="text-white/80">Reason</TableHead>
                  <TableHead className="text-white/80">Created</TableHead>
                  {canEdit && <TableHead className="text-white/80 w-20">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedData.map((item) => (
                  <TableRow key={item.id} className="border-white/10">
                    <TableCell className="text-white">
                      <div className="font-mono text-sm">
                        {type === 'user' && (
                          <div>
                            {item.discord_id && <div>Discord: {item.discord_id}</div>}
                            {item.fivem_id && <div>FiveM: {item.fivem_id}</div>}
                          </div>
                        )}
                        {type === 'server' && <div>{item.server_name}</div>}
                        {type === 'store' && <div>{item.store_name}</div>}
                        {type === 'discord' && <div>{item.discord_server_name}</div>}
                      </div>
                    </TableCell>
                    <TableCell className="text-white/60 max-w-xs truncate">
                      {item.reason}
                    </TableCell>
                    <TableCell className="text-white/60">
                      {new Date(item.created_at).toLocaleDateString()}
                    </TableCell>
                    {canEdit && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => openEdit(item)}
                            size="sm"
                            variant="outline"
                            className="border-orange-500/20 hover:bg-orange-500/10 text-orange-400"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => deleteItem(item.id)}
                            size="sm"
                            variant="outline"
                            className="border-red-500/20 hover:bg-red-500/10 text-red-400"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Show More/Less Button */}
          {filteredData.length > 10 && (
            <div className="text-center">
              <Button
                onClick={() => setShowAll(!showAll)}
                variant="outline"
                className="border-white/10 hover:bg-white/5"
              >
                {showAll ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Show Less
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Show All ({filteredData.length - 10} more)
                  </>
                )}
              </Button>
            </div>
          )}

          {filteredData.length === 0 && (
            <div className="text-center py-8">
              <Icon className="h-12 w-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/60">
                {searchTerm ? 'No items match your search.' : 'No items found.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-neo max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">{editingItem ? `Edit ${title} Entry` : `Add New ${title} Entry`}</DialogTitle>
            <DialogDescription className="text-white/60">
              Fill in the details for the new blacklist entry
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {/* Type-specific fields */}
            {type === 'user' && (
              <>
                <div>
                  <Label htmlFor="discord_id" className="text-white">Discord ID</Label>
                  <Input
                    id="discord_id"
                    value={formData.discord_id}
                    onChange={(e) => setFormData({...formData, discord_id: e.target.value})}
                    placeholder="Enter Discord ID"
                    className="bg-white/5 border-white/10 text-white mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="fivem_id" className="text-white">FiveM ID</Label>
                  <Input
                    id="fivem_id"
                    value={formData.fivem_id}
                    onChange={(e) => setFormData({...formData, fivem_id: e.target.value})}
                    placeholder="Enter FiveM ID"
                    className="bg-white/5 border-white/10 text-white mt-2"
                  />
                </div>
              </>
            )}

            {type === 'server' && (
              <>
                <div>
                  <Label htmlFor="server_name" className="text-white">Server Name *</Label>
                  <Input
                    id="server_name"
                    value={formData.server_name}
                    onChange={(e) => setFormData({...formData, server_name: e.target.value})}
                    placeholder="Enter server name"
                    className="bg-white/5 border-white/10 text-white mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="owner_fivem_id" className="text-white">Owner FiveM ID *</Label>
                  <Input
                    id="owner_fivem_id"
                    value={formData.owner_fivem_id}
                    onChange={(e) => setFormData({...formData, owner_fivem_id: e.target.value})}
                    placeholder="Enter owner FiveM ID"
                    className="bg-white/5 border-white/10 text-white mt-2"
                  />
                </div>
              </>
            )}

            {type === 'store' && (
              <>
                <div>
                  <Label htmlFor="store_name" className="text-white">Store Name *</Label>
                  <Input
                    id="store_name"
                    value={formData.store_name}
                    onChange={(e) => setFormData({...formData, store_name: e.target.value})}
                    placeholder="Enter store name"
                    className="bg-white/5 border-white/10 text-white mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="store_links" className="text-white">Store Links (comma-separated)</Label>
                  <Textarea
                    id="store_links"
                    value={formData.store_links}
                    onChange={(e) => setFormData({...formData, store_links: e.target.value})}
                    placeholder="https://example.com, https://another.com"
                    className="bg-white/5 border-white/10 text-white mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="resource_prefix" className="text-white">Resource Prefix</Label>
                  <Input
                    id="resource_prefix"
                    value={formData.resource_prefix}
                    onChange={(e) => setFormData({...formData, resource_prefix: e.target.value})}
                    placeholder="e.g., qs- (for Quasar resources)"
                    className="bg-white/5 border-white/10 text-white mt-2"
                  />
                  <p className="text-xs text-white/60 mt-1">
                    Optional: Resources starting with this prefix will be flagged as violations
                  </p>
                </div>
              </>
            )}

            {type === 'discord' && (
              <>
                <div>
                  <Label htmlFor="discord_server_name" className="text-white">Discord Server Name *</Label>
                  <Input
                    id="discord_server_name"
                    value={formData.discord_server_name}
                    onChange={(e) => setFormData({...formData, discord_server_name: e.target.value})}
                    placeholder="Enter Discord server name"
                    className="bg-white/5 border-white/10 text-white mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="owner_discord_id" className="text-white">Owner Discord ID *</Label>
                  <Input
                    id="owner_discord_id"
                    value={formData.owner_discord_id}
                    onChange={(e) => setFormData({...formData, owner_discord_id: e.target.value})}
                    placeholder="Enter owner Discord ID"
                    className="bg-white/5 border-white/10 text-white mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="discord_invite_links" className="text-white">Invite Links (comma-separated)</Label>
                  <Textarea
                    id="discord_invite_links"
                    value={formData.discord_invite_links}
                    onChange={(e) => setFormData({...formData, discord_invite_links: e.target.value})}
                    placeholder="https://discord.gg/invite1, https://discord.gg/invite2"
                    className="bg-white/5 border-white/10 text-white mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="resource_prefix" className="text-white">Resource Prefix</Label>
                  <Input
                    id="resource_prefix"
                    value={formData.resource_prefix}
                    onChange={(e) => setFormData({...formData, resource_prefix: e.target.value})}
                    placeholder="e.g., qs- (for Quasar resources)"
                    className="bg-white/5 border-white/10 text-white mt-2"
                  />
                  <p className="text-xs text-white/60 mt-1">
                    Optional: Resources starting with this prefix will be flagged as violations
                  </p>
                </div>
              </>
            )}

            {/* Common fields */}
            <div>
              <Label htmlFor="reason" className="text-white">Reason *</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                placeholder="Enter reason for blacklisting"
                className="bg-white/5 border-white/10 text-white mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="proof_images" className="text-white">Proof Images (comma-separated URLs)</Label>
              <Textarea
                id="proof_images"
                value={formData.proof_images}
                onChange={(e) => setFormData({...formData, proof_images: e.target.value})}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                className="bg-white/5 border-white/10 text-white mt-2"
              />
            </div>
            <div>
              <Label htmlFor="evidence_links" className="text-white">Evidence Links (comma-separated URLs)</Label>
              <Textarea
                id="evidence_links"
                value={formData.evidence_links}
                onChange={(e) => setFormData({...formData, evidence_links: e.target.value})}
                placeholder="https://evidence.com/thread1, https://pastebin.com/abc123"
                className="bg-white/5 border-white/10 text-white mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setIsDialogOpen(false);
                resetForm();
                setEditingItem(null);
              }}
              variant="outline"
              className="border-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={editingItem ? updateItem : addItem}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {editingItem ? 'Save Changes' : 'Add Entry'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlacklistManagement;