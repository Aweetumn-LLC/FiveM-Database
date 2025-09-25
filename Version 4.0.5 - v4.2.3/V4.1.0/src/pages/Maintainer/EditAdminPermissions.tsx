import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_PAGES = [
  { key: 'admin_panel', label: 'Admin Panel (/admin)' },
  { key: 'admin_statistics', label: 'Statistics (/admin/statistics)' },
  { key: 'admin_history', label: 'History (/admin/history)' },
  { key: 'admin_blacklists', label: 'Blacklists (/admin/blacklists)' },
  { key: 'admin_database', label: 'Database (/admin/database)' },
];

type Perms = Record<string, boolean>;

type AdminUser = { id: string; username: string | null; display_name: string | null; email: string | null };

export default function EditAdminPermissions() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [perms, setPerms] = useState<Perms>({});
  const [loading, setLoading] = useState(false);

  const loadAdmins = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-users', { body: { action: 'list_admins' } });
      if (error) throw error;
      setAdmins(((data?.admins as unknown) as AdminUser[]) || []);
    } catch (e) {
      const { data, error } = await supabase.from('admin_users' as any).select('id, username, display_name, email').order('created_at', { ascending: false });
      if (error) { toast.error('Failed to load admins'); return; }
      setAdmins(((data as unknown) as AdminUser[]) || []);
    }
  };

  const loadPerms = async (id: string) => {
    setLoading(true);
    const { data, error } = await supabase.from('admin_permissions' as any).select('permission_key, permission_value').eq('admin_id', id);
    if (error) { toast.error('Failed to load permissions'); setLoading(false); return; }
    const p: Perms = {};
    (data as any[])?.forEach((r:any) => { p[r.permission_key] = r.permission_value; });
    setPerms(p);
    setLoading(false);
  };

  const update = async (adminId: string, key: string, value: boolean) => {
    const { error } = await supabase.from('admin_permissions' as any).upsert({ admin_id: adminId, permission_key: key, permission_value: value });
    if (error) { toast.error('Failed to update'); return; }
    setPerms(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => { loadAdmins(); }, []);

  const activeAdmin = admins.find(a => a.id === openId);

  return (
    <div className="space-y-4 max-w-3xl">
      <Helmet>
        <title>Edit Admin Permissions | FiveM DB</title>
        <meta name="description" content="Edit permissions for each admin account." />
        <link rel="canonical" href={`${window.location.origin}/Maintainer/admins/permissions`} />
      </Helmet>

      <Card>
        <CardHeader>
          <CardTitle>Admin Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Click Edit perms to manage access per admin</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.display_name || a.username || a.email || '—'}</TableCell>
                  <TableCell>{a.username || '—'}</TableCell>
                  <TableCell>{a.email || '—'}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" onClick={async () => { setOpenId(a.id); await loadPerms(a.id); }}>Edit perms</Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={async () => {
                        if (!confirm('Delete this admin? This cannot be undone.')) return;
                        try {
                          const { data, error } = await supabase.functions.invoke('admin-users', { body: { action: 'delete_admin', admin_id: a.id } });
                          if (error || !data?.success) throw new Error(data?.error || error?.message || 'Failed to delete admin');
                          toast.success('Admin deleted');
                          if (openId === a.id) setOpenId(null);
                          loadAdmins();
                        } catch (e: any) {
                          toast.error(e.message || 'Failed to delete admin');
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!openId} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit permissions - {activeAdmin ? (activeAdmin.display_name || activeAdmin.username || activeAdmin.email) : ''}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading…</div>
            ) : (
              ADMIN_PAGES.map(p => (
                <label key={p.key} className="flex items-center gap-3">
                  <Checkbox checked={!!perms[p.key]} onCheckedChange={(v) => activeAdmin && update(activeAdmin.id, p.key, !!v)} />
                  <span>{p.label}</span>
                </label>
              ))
            )}
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpenId(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
