import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const AVAILABLE_PERMISSIONS = [
  { key: 'view_blacklist', label: 'View Blacklist' },
  { key: 'edit_blacklist', label: 'Edit Blacklist' },
  { key: 'view_partners', label: 'View Partners' },
  { key: 'edit_partners', label: 'Edit Partners' },
  { key: 'view_keywords', label: 'View Keywords' },
  { key: 'edit_keywords', label: 'Edit Keywords' },
  { key: 'view_analytics', label: 'View Analytics' },
  { key: 'view_logs', label: 'View Logs' },
  { key: 'manage_settings', label: 'Manage Settings' },
  { key: 'import_export', label: 'Import/Export' }
];

type Maintainer = { id: string; username: string; display_name: string };

type Perms = Record<string, boolean>;

export default function EditMaintainerPermissions(){
  const [maintainers, setMaintainers] = useState<Maintainer[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [perms, setPerms] = useState<Perms>({});
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const loadMaintainers = async () => {
      const { data, error } = await supabase.from('maintainer_users' as any).select('id, username, display_name').order('created_at',{ascending:false});
      if (error) { toast.error('Failed to load maintainers'); return; }
      setMaintainers(((data as unknown) as Maintainer[]) || []);
    };
    loadMaintainers();
  },[]);

  const loadPerms = async (id:string) => {
    setLoading(true);
    const { data, error } = await supabase.from('maintainer_permissions' as any).select('permission_key, permission_value').eq('maintainer_id', id);
    if (error) { toast.error('Failed to load permissions'); setLoading(false); return; }
    const p:Record<string, boolean> = {};
    (data as any[])?.forEach((row:any)=>{ p[row.permission_key] = row.permission_value; });
    setPerms(p);
    setLoading(false);
  };

  const update = async (id:string, key:string, value:boolean) => {
    const { error } = await supabase
      .from('maintainer_permissions' as any)
      .upsert(
        { maintainer_id: id, permission_key: key, permission_value: value },
        { onConflict: 'maintainer_id,permission_key' }
      );
    if (error) { toast.error(error.message || 'Failed to update'); return; }
    setPerms(prev=> ({ ...prev, [key]: value }));
  };

  const active = maintainers.find(m => m.id === openId);

  return (
    <div className="space-y-4 max-w-3xl">
      <Helmet>
        <title>Edit Maintainer Permissions | FiveM DB</title>
        <meta name="description" content="Manage granular permissions for maintainer accounts." />
        <link rel="canonical" href={`${window.location.origin}/Maintainer/maintainers/permissions`} />
      </Helmet>

      <Card>
        <CardHeader>
          <CardTitle>Maintainer Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Click Edit perms to manage access per maintainer</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintainers.map((m)=> (
                <TableRow key={m.id}>
                  <TableCell>{m.display_name || m.username}</TableCell>
                  <TableCell>{m.username}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" onClick={async ()=> { setOpenId(m.id); await loadPerms(m.id); }}>Edit perms</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!openId} onOpenChange={(o)=> !o && setOpenId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit permissions - {active ? (active.display_name || active.username) : ''}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading…</div>
            ) : (
              AVAILABLE_PERMISSIONS.map(p=> (
                <label key={p.key} className="flex items-center gap-3">
                  <Checkbox checked={!!perms[p.key]} onCheckedChange={(v)=> active && update(active.id, p.key, !!v)} />
                  <span>{p.label}</span>
                </label>
              ))
            )}
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={()=> setOpenId(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
