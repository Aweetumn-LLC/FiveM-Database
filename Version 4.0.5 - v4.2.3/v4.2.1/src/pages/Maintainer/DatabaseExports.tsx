import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const TABLES = [
  { key: 'blacklist_entries', label: 'Blacklist Entries' },
  { key: 'user_blacklist', label: 'User Blacklist' },
  { key: 'server_blacklist', label: 'Server Blacklist' },
  { key: 'store_blacklist', label: 'Store/Hosting Blacklist' },
  { key: 'discord_blacklist', label: 'Discord Blacklist' },
  { key: 'ip_violation_keywords', label: 'IP Violation Keywords' },
  { key: 'ip_bypass_keywords', label: 'IP Bypass Keywords' },
  { key: 'coc_violation_keywords', label: 'CoC Violation Keywords' },
  { key: 'coc_bypass_keywords', label: 'CoC Bypass Keywords' },
  { key: 'coc_contextual_patterns', label: 'CoC Contextual Patterns' },
  { key: 'partners', label: 'Partners' },
];

export default function DatabaseExports(){
  const exportTable = async (table: string) => {
    try {
      const { data, error } = await supabase.from(table as any).select('*');
      if (error) throw error;
      const blob = new Blob([JSON.stringify(data || [], null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${table}-export-${new Date().toISOString().slice(0,19)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Exported ${table}`);
    } catch(e:any){
      toast.error(e.message || `Failed to export ${table}`);
    }
  };

  return (
    <div className="max-w-3xl space-y-4">
      <Helmet>
        <title>Database Exports | FiveM DB</title>
        <meta name="description" content="Export individual tables as JSON with one click." />
        <link rel="canonical" href={`${window.location.origin}/Maintainer/exports`} />
      </Helmet>

      <Card>
        <CardHeader>
          <CardTitle>Database Exports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Table</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TABLES.map(t => (
                <TableRow key={t.key}>
                  <TableCell>{t.label}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" onClick={() => exportTable(t.key)}>Export JSON</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
