import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useAdminLogger } from "@/hooks/useAdminLogger";
import { UserPlus, Edit, Trash2, Shield } from "lucide-react";

interface MaintainerUser {
  id: string;
  username: string;
  display_name: string;
  is_active: boolean;
  created_at: string;
}

interface Permission {
  permission_key: string;
  permission_value: boolean;
}

const AVAILABLE_PERMISSIONS = [
  { key: 'view_blacklist', label: 'View Blacklist', description: 'Access to view blacklist entries' },
  { key: 'edit_blacklist', label: 'Edit Blacklist', description: 'Add/remove blacklist entries' },
  { key: 'view_partners', label: 'View Partners', description: 'Access to view partners' },
  { key: 'edit_partners', label: 'Edit Partners', description: 'Add/remove partners' },
  { key: 'view_keywords', label: 'View Keywords', description: 'Access to keyword management' },
  { key: 'edit_keywords', label: 'Edit Keywords', description: 'Add/remove keywords' },
  { key: 'view_analytics', label: 'View Analytics', description: 'Access to analytics and reports' },
  { key: 'view_logs', label: 'View Logs', description: 'Access to system logs' },
  { key: 'manage_settings', label: 'Manage Settings', description: 'Access to system settings' },
  { key: 'import_export', label: 'Import/Export', description: 'Access to import/export functionality' }
];

export default function MaintainerManager() {
  const { logActivity, user } = useAdminAuth();
  const { logAdminAction } = useAdminLogger();
  const [maintainers, setMaintainers] = useState<MaintainerUser[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMaintainer, setSelectedMaintainer] = useState<MaintainerUser | null>(null);
  const [maintainerPermissions, setMaintainerPermissions] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  // Form states
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");

  const fetchMaintainers = async () => {
    try {
      const { data, error } = await supabase
        .from('maintainer_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMaintainers(data || []);
    } catch (error) {
      console.error('Error fetching maintainers:', error);
      toast.error('Failed to load maintainers');
    } finally {
      setLoading(false);
    }
  };

  const fetchMaintainerPermissions = async (maintainerId: string) => {
    try {
      const { data, error } = await supabase
        .from('maintainer_permissions')
        .select('permission_key, permission_value')
        .eq('maintainer_id', maintainerId);

      if (error) throw error;
      
      const permissions: Record<string, boolean> = {};
      data?.forEach(perm => {
        permissions[perm.permission_key] = perm.permission_value;
      });
      
      setMaintainerPermissions(permissions);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast.error('Failed to load permissions');
    }
  };

  const createMaintainer = async () => {
    if (!newUsername || !newPassword) {
      toast.error('Username and password are required');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('maintainer_users')
        .insert({
          username: newUsername,
          password_hash: newPassword, // In production, hash this on the server
          display_name: newDisplayName || newUsername
        })
        .select()
        .single();

      if (error) throw error;

      await logActivity('create', `Created maintainer: ${newUsername}`, {
        target_table: 'maintainer_users',
        target_id: data.id,
        username: newUsername
      });

      await logAdminAction(
        user?.username || 'Unknown',
        'created',
        'maintainer_users',
        newUsername,
        `Created maintainer "${newUsername}"`
      );

      toast.success('Maintainer created successfully');
      setNewUsername("");
      setNewPassword("");
      setNewDisplayName("");
      setIsCreateDialogOpen(false);
      fetchMaintainers();
    } catch (error) {
      console.error('Error creating maintainer:', error);
      toast.error('Failed to create maintainer');
    }
  };

  const toggleMaintainerStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('maintainer_users')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Maintainer ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchMaintainers();
    } catch (error) {
      console.error('Error updating maintainer status:', error);
      toast.error('Failed to update maintainer status');
    }
  };

  const deleteMaintainer = async (id: string) => {
    if (!confirm('Are you sure you want to delete this maintainer?')) return;

    try {
      const { error } = await supabase
        .from('maintainer_users')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Maintainer deleted successfully');
      fetchMaintainers();
    } catch (error) {
      console.error('Error deleting maintainer:', error);
      toast.error('Failed to delete maintainer');
    }
  };

  const updatePermission = async (maintainerId: string, permissionKey: string, value: boolean) => {
    try {
      const { error } = await supabase
        .from('maintainer_permissions')
        .upsert({
          maintainer_id: maintainerId,
          permission_key: permissionKey,
          permission_value: value
        });

      if (error) throw error;

      setMaintainerPermissions(prev => ({
        ...prev,
        [permissionKey]: value
      }));

      toast.success('Permission updated');
    } catch (error) {
      console.error('Error updating permission:', error);
      toast.error('Failed to update permission');
    }
  };

  const openEditPermissions = (maintainer: MaintainerUser) => {
    setSelectedMaintainer(maintainer);
    fetchMaintainerPermissions(maintainer.id);
    setIsEditDialogOpen(true);
  };

  useEffect(() => {
    fetchMaintainers();
  }, []);

  if (loading) {
    return <div className="p-6">Loading maintainers...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Maintainer Management</h2>
          <p className="text-muted-foreground">Manage admin panel access and permissions</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Maintainer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Maintainer</DialogTitle>
              <DialogDescription>
                Add a new maintainer with custom permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter username"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
              <div>
                <Label htmlFor="displayName">Display Name (Optional)</Label>
                <Input
                  id="displayName"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  placeholder="Enter display name"
                />
              </div>
              <Button onClick={createMaintainer} className="w-full">
                Create Maintainer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Maintainers</CardTitle>
          <CardDescription>
            Manage maintainer accounts and their access levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Display Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintainers.map((maintainer) => (
                <TableRow key={maintainer.id}>
                  <TableCell className="font-medium">{maintainer.username}</TableCell>
                  <TableCell>{maintainer.display_name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={maintainer.is_active}
                        onCheckedChange={() => toggleMaintainerStatus(maintainer.id, maintainer.is_active)}
                      />
                      <Badge variant={maintainer.is_active ? "default" : "secondary"}>
                        {maintainer.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(maintainer.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditPermissions(maintainer)}
                      >
                        <Shield className="mr-1 h-3 w-3" />
                        Permissions
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteMaintainer(maintainer.id)}
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Permissions Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Permissions</DialogTitle>
            <DialogDescription>
              Configure access permissions for {selectedMaintainer?.display_name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {AVAILABLE_PERMISSIONS.map((permission) => (
              <div key={permission.key} className="flex items-center justify-between p-3 border rounded">
                <div className="flex-1">
                  <div className="font-medium">{permission.label}</div>
                  <div className="text-sm text-muted-foreground">{permission.description}</div>
                </div>
                <Checkbox
                  checked={maintainerPermissions[permission.key] || false}
                  onCheckedChange={(checked) => 
                    selectedMaintainer && updatePermission(
                      selectedMaintainer.id, 
                      permission.key, 
                      checked as boolean
                    )
                  }
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}