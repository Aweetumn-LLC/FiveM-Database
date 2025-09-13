import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Upload, FileDown, FileUp } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ImportExport = () => {
  const [importing, setImporting] = useState<string | null>(null);
  const [exporting, setExporting] = useState<string | null>(null);

  const exportData = async (type: string) => {
    setExporting(type);
    try {
      let data: any[] = [];
      let filename = '';

      switch (type) {
        case 'blacklist':
          const blacklistResult = await supabase.from('blacklist_entries').select('*');
          data = blacklistResult.data || [];
          filename = 'blacklist-links.json';
          break;
        case 'ip-violations':
          const ipViolationsResult = await supabase.from('ip_violation_keywords').select('*');
          data = ipViolationsResult.data || [];
          filename = 'ip-violations.json';
          break;
        case 'coc-violations':
          const cocViolationsResult = await supabase.from('coc_violation_keywords').select('*');
          data = cocViolationsResult.data || [];
          filename = 'coc-violations.json';
          break;
        case 'ip-bypass':
          const ipBypassResult = await supabase.from('ip_bypass_keywords').select('*');
          data = ipBypassResult.data || [];
          filename = 'ip-bypass.json';
          break;
        case 'coc-bypass':
          const cocBypassResult = await supabase.from('coc_bypass_keywords').select('*');
          data = cocBypassResult.data || [];
          filename = 'coc-bypass.json';
          break;
        case 'contextual':
          const contextualResult = await supabase.from('coc_contextual_patterns').select('*');
          data = contextualResult.data || [];
          filename = 'contextual-patterns.json';
          break;
        case 'partners':
          const partnersResult = await supabase.from('partners').select('*');
          data = partnersResult.data || [];
          filename = 'partners.json';
          break;
      }

      // Create download
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(`${type} data exported successfully`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error(`Failed to export ${type} data`);
    } finally {
      setExporting(null);
    }
  };

  const importData = async (type: string, file: File) => {
    setImporting(type);
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (!Array.isArray(data)) {
        throw new Error('Invalid file format: expected JSON array');
      }

      let tableName = '';
      let processedData: any[] = [];

      switch (type) {
        case 'blacklist':
          tableName = 'blacklist_entries';
          processedData = data.map(item => ({
            name: item.name,
            keyword: item.keyword,
            category: item.category,
            severity: item.severity,
            reason: item.reason,
            flagged_by: item.flagged_by,
            blacklisted_since: item.blacklisted_since,
            discord_server_id: item.discord_server_id,
            links: item.links || []
          }));
          break;
        case 'ip-violations':
          tableName = 'ip_violation_keywords';
          processedData = data.map(item => ({ keyword: item.keyword }));
          break;
        case 'coc-violations':
          tableName = 'coc_violation_keywords';
          processedData = data.map(item => ({ keyword: item.keyword }));
          break;
        case 'ip-bypass':
          tableName = 'ip_bypass_keywords';
          processedData = data.map(item => ({ keyword: item.keyword }));
          break;
        case 'coc-bypass':
          tableName = 'coc_bypass_keywords';
          processedData = data.map(item => ({ keyword: item.keyword }));
          break;
        case 'contextual':
          tableName = 'coc_contextual_patterns';
          processedData = data.map(item => ({ pattern: item.pattern }));
          break;
        case 'partners':
          tableName = 'partners';
          processedData = data.map(item => ({
            name: item.name,
            description: item.description,
            logo_url: item.logo_url,
            website_url: item.website_url,
            partner_type: item.partner_type,
            featured: item.featured || false,
            display_order: item.display_order || 0,
            metadata: item.metadata || {}
          }));
          break;
      }

      // Insert data in batches
      const batchSize = 100;
      for (let i = 0; i < processedData.length; i += batchSize) {
        const batch = processedData.slice(i, i + batchSize);
        const { error } = await supabase.from(tableName as any).insert(batch);
        if (error) throw error;
      }

      toast.success(`${type} data imported successfully (${processedData.length} records)`);
    } catch (error) {
      console.error('Import error:', error);
      toast.error(`Failed to import ${type} data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setImporting(null);
    }
  };

  const handleFileUpload = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importData(type, file);
    }
  };

  const dataTypes = [
    { key: 'blacklist', label: 'Blacklist Links', description: 'Export/import blacklisted entries' },
    { key: 'ip-violations', label: 'IP Violations', description: 'Export/import IP violation keywords' },
    { key: 'coc-violations', label: 'COC Violations', description: 'Export/import Code of Conduct violation keywords' },
    { key: 'ip-bypass', label: 'IP Bypass', description: 'Export/import IP bypass keywords' },
    { key: 'coc-bypass', label: 'COC Bypass', description: 'Export/import Code of Conduct bypass keywords' },
    { key: 'contextual', label: 'Contextual', description: 'Export/import contextual patterns' },
    { key: 'partners', label: 'Partners', description: 'Export/import partner data' }
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-gradient">Import & Export Data</CardTitle>
          <CardDescription className="text-muted-foreground">
            Export and import various data types for backup and migration purposes
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataTypes.map((dataType) => (
          <Card key={dataType.key} className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">{dataType.label}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {dataType.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => exportData(dataType.key)}
                disabled={exporting === dataType.key}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {exporting === dataType.key ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Exporting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </div>
                )}
              </Button>

              <div className="relative">
                <Input
                  type="file"
                  accept=".json"
                  onChange={(e) => handleFileUpload(dataType.key, e)}
                  className="hidden"
                  id={`import-${dataType.key}`}
                  disabled={importing === dataType.key}
                />
                <label htmlFor={`import-${dataType.key}`}>
                  <Button
                    type="button"
                    disabled={importing === dataType.key}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    asChild
                  >
                    <span>
                      {importing === dataType.key ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Importing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Upload className="w-4 h-4" />
                          <span>Import</span>
                        </div>
                      )}
                    </span>
                  </Button>
                </label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">Important Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Export files are downloaded as JSON format</li>
            <li>• Import files must be valid JSON arrays</li>
            <li>• Imported data will be added to existing records</li>
            <li>• Large imports are processed in batches of 100 records</li>
            <li>• All operations are logged for audit purposes</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportExport;