import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Users, UserPlus, Trash2 } from "lucide-react";
interface AdminUser {
  id: string;
  email: string | null;
  username: string | null;
  display_name: string | null;
  is_active: boolean | null;
  created_at: string;
}

export default function AddAdmins() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // form state (same fields as Maintainers)
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = useMemo(() => username.trim().length >= 3 && password.length >= 6, [username, password]);

  const totalAdmins = admins.length;
  const activeAdmins = admins.filter((a) => a.is_active !== false).length;

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      // Prefer Edge Function (service role) to avoid RLS/grant issues
      const { data, error } = await supabase.functions.invoke('admin-users', {
        body: { action: 'list_admins' },
      });
      if (error) throw error;
      setAdmins(((data?.admins as unknown) as AdminUser[]) || []);
    } catch (e) {
      // Fallback to direct query if the function is unavailable
      const { data, error } = await supabase
        .from('admin_users' as any)
        .select('id, username, display_name, is_active, created_at')
        .order('created_at', { ascending: false });
      if (error) {
        toast.error('Failed to load admins');
        setAdmins([]);
      } else {
        setAdmins(((data as unknown) as AdminUser[]) || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreate = async () => {
    if (!canSubmit) return;
    try {
      const { data, error } = await supabase.functions.invoke('admin-users', {
        body: {
          action: 'create_admin',
          username: username.trim(),
          display_name: displayName.trim() || username.trim(),
          password
        }
      });
      if (error || !data?.success) throw new Error(data?.error || error?.message || 'Failed to create admin');
      toast.success("Admin created");
      setOpen(false);
      setUsername("");
      setDisplayName("");
      setPassword("");
      fetchAdmins();
    } catch (e: any) {
      toast.error(e.message || "Failed to create admin");
    }
  };

  return (
    <main className="space-y-6 animate-fade-in">
      <Helmet>
        <title>Admins | FiveM DB</title>
        <meta name="description" content="Manage admin accounts and add new admins." />
        <link rel="canonical" href={`${window.location.origin}/Maintainer/admins/add`} />
      </Helmet>

      {/* Page header */}
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Admin Management</h1>
        <p className="text-muted-foreground">Create, review, and manage admin accounts.</p>
      </header>

      {/* Quick stats */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Card className="hover-scale">
          <CardHeader className="py-3">
            <CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4" /> Total Admins</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-semibold">{totalAdmins}</div>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardHeader className="py-3">
            <CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4" /> Active Admins</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-semibold">{activeAdmins}</div>
          </CardContent>
        </Card>
      </section>

      <Card className="animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Admins</CardTitle>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="hover-scale">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add admin
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add admin</DialogTitle>
                  <DialogDescription>
                    Create a new admin account with a username and password.
                  </DialogDescription>
                </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Username</Label>
                  <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
                </div>
                <div>
                  <Label>Display name</Label>
                  <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display name (optional)" />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreate} disabled={!canSubmit} className="w-full">
                  Create Admin
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading…</div>
          ) : (
            <Table>
              <TableCaption>List of current admin accounts</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((a) => (
                  <TableRow key={a.id} className="animate-fade-in">
                    <TableCell>{a.display_name || a.username || "—"}</TableCell>
                    <TableCell>{a.username || "—"}</TableCell>
                    <TableCell>{new Date(a.created_at).toLocaleString()}</TableCell>
                    <TableCell>{a.is_active === false ? "Inactive" : "Active"}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="hover-scale"
                        onClick={async () => {
                          if (!confirm('Delete this admin? This cannot be undone.')) return;
                          try {
                            const { data, error } = await supabase.functions.invoke('admin-users', {
                              body: { action: 'delete_admin', admin_id: a.id },
                            });
                            if (error || !data?.success) throw new Error(data?.error || error?.message || 'Failed to delete admin');
                            toast.success('Admin deleted');
                            fetchAdmins();
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
          )}
        </CardContent>
      </Card>
    </main>
  );
}
