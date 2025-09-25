import { useRef, useState } from "react";
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

export default function DatabaseImports(){
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File | null>>({});
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  const onPick = (table: string) => {
    if (!fileInputs.current[table]) return;
    fileInputs.current[table]!.click();
  };

  const onChangeFile = (table: string, file: File | null) => {
    setSelectedFiles((prev) => ({ ...prev, [table]: file }));
  };

  const handleImport = async (table: string) => {
    const file = selectedFiles[table];
    if (!file) return toast.error('Choose a JSON file first');
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const rows = Array.isArray(json) ? json : (json[table] || []);
      if (!Array.isArray(rows)) throw new Error('Invalid JSON format for selected table');
      const { error } = await supabase.from(table as any).upsert(rows);
      if (error) throw error;
      toast.success(`Imported into ${table}`);
      setSelectedFiles((prev) => ({ ...prev, [table]: null }));
    } catch (e:any){
      toast.error(e.message || `Import failed for ${table}`);
    }
  };

  return (
    <div className="max-w-3xl space-y-4">
      <Helmet>
        <title>Database Imports | FiveM DB</title>
        <meta name="description" content="Import JSON into individual tables with one click." />
        <link rel="canonical" href={`${window.location.origin}/Maintainer/imports`} />
      </Helmet>

      <Card>
        <CardHeader>
          <CardTitle>Database Imports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Table</TableHead>
                <TableHead>File</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TABLES.map(t => (
                <TableRow key={t.key}>
                  <TableCell>{t.label}</TableCell>
                  <TableCell>
                    <input
                      type="file"
                      accept="application/json"
                      className="hidden"
                      ref={(el) => (fileInputs.current[t.key] = el)}
                      onChange={(e) => onChangeFile(t.key, e.target.files?.[0] || null)}
                    />
                    <Button variant="outline" size="sm" onClick={() => onPick(t.key)}>
                      {selectedFiles[t.key]?.name || 'Choose file'}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" onClick={() => handleImport(t.key)} disabled={!selectedFiles[t.key]}>Import</Button>
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
