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
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Users, UserPlus, Trash2 } from "lucide-react";

interface MaintainerUser {
  id: string;
  username: string;
  display_name: string | null;
  is_active: boolean;
  created_at: string;
}

export default function AddMaintainers() {
  const { user } = useAdminAuth();
  const [maintainers, setMaintainers] = useState<MaintainerUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = useMemo(() => username.trim().length >= 3 && password.length >= 6, [username, password]);

  const totalMaintainers = maintainers.length;
  const activeMaintainers = maintainers.filter((m) => m.is_active).length;

  const canAdd = user?.username === "Maintainer";

  const fetchMaintainers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("maintainer_users" as any)
      .select("id, username, display_name, is_active, created_at")
      .order("created_at", { ascending: false });
    if (error) toast.error("Failed to load maintainers");
    setMaintainers(((data as unknown) as MaintainerUser[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMaintainers();
  }, []);

  const handleCreate = async () => {
    if (!canAdd) return toast.error("Only the 'Maintainer' account can add maintainers");
    if (!canSubmit) return;
    try {
      const { error } = await supabase.from("maintainer_users" as any).insert({
        username: username.trim(),
        display_name: displayName.trim() || username.trim(),
        password_hash: password,
      });
      if (error) throw error;
      toast.success("Maintainer created");
      setOpen(false);
      setUsername("");
      setDisplayName("");
      setPassword("");
      fetchMaintainers();
    } catch (e: any) {
      toast.error(e.message || "Failed to create maintainer");
    }
  };

  const handleDelete = async (id: string, username: string) => {
    if (!canAdd) return toast.error("Only the 'Maintainer' account can delete maintainers");
    if (username === "Maintainer") return toast.error("The primary 'Maintainer' account cannot be deleted");
    try {
      const { error } = await supabase.from("maintainer_users" as any).delete().eq("id", id);
      if (error) throw error;
      toast.success("Maintainer deleted");
      fetchMaintainers();
    } catch (e: any) {
      toast.error(e.message || "Failed to delete maintainer");
    }
  };

  return (
    <main className="space-y-6 animate-fade-in">
      <Helmet>
        <title>Maintainers | FiveM DB</title>
        <meta name="description" content="View and add maintainer accounts." />
        <link rel="canonical" href={`${window.location.origin}/Maintainer/maintainers/add`} />
      </Helmet>

      {/* Page header */}
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Maintainer Management</h1>
        <p className="text-muted-foreground">Create, review, and manage maintainer accounts.</p>
      </header>

      {/* Quick stats */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Card className="hover-scale">
          <CardHeader className="py-3">
            <CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4" /> Total Maintainers</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-semibold">{totalMaintainers}</div>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardHeader className="py-3">
            <CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4" /> Active Maintainers</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-semibold">{activeMaintainers}</div>
          </CardContent>
        </Card>
      </section>

      <Card className="animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle>Maintainers</CardTitle>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="hover-scale" disabled={!canAdd}><UserPlus className="mr-2 h-4 w-4" /> Add maintainer</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add maintainer</DialogTitle>
                <DialogDescription>
                  Create a new maintainer account. Only the primary Maintainer can perform this action.
                </DialogDescription>
              </DialogHeader>
              {!canAdd && (
                <p className="text-sm text-muted-foreground">Only the primary Maintainer can use this action.</p>
              )}
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
                <Button onClick={handleCreate} disabled={!canSubmit || !canAdd} className="w-full">
                  Create Maintainer
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
              <TableCaption>List of maintainers</TableCaption>
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
                {maintainers.map((m) => (
                  <TableRow key={m.id} className="animate-fade-in">
                    <TableCell>{m.display_name || m.username}</TableCell>
                    <TableCell>{m.username}</TableCell>
                    <TableCell>{new Date(m.created_at).toLocaleString()}</TableCell>
                    <TableCell>{m.is_active ? "Active" : "Inactive"}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="hover-scale"
                        disabled={!canAdd || m.username === "Maintainer"}
                        onClick={() => handleDelete(m.id, m.username)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
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
