import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, Plus, Trash2, Edit, Shield, Upload, Download } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BLACKLISTED_CREATORS } from "@/config/blacklistConfig";

interface BlacklistEntry {
  id?: string;
  name: string;
  links: string[];
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  blacklisted_since?: string;
  category: 'discord' | 'tebex' | 'other';
  keyword: string;
  flagged_by: string;
  discord_server_id?: string;
  created_at?: string;
  updated_at?: string;
}

const BlacklistLinks = () => {
  const [blacklistEntries, setBlacklistEntries] = useState<BlacklistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<BlacklistEntry | null>(null);
  const [importing, setImporting] = useState(false);
  
  const reasonOptions = [
    { value: "IP Infringement", severity: 3, title: "When a Person is Breaking IP Laws" },
    { value: "Leaking", severity: 3, title: "When someone is leaking assets or is selling leaks" },
    { value: "Leak Promoting", severity: 3, title: "When someone is promoting leaks" },
    { value: "re-selling", severity: 3, title: "When someone is selling open source, paid or free resources" },
    { value: "Code of Conduct", severity: 3, title: "When a store is breaking Code of Conduct" },
    { value: "ILEGAL", severity: 3, title: "When a website/store is breaking the law" },
    { value: "Branded Assets", severity: 3, title: "Anything that is branded with a IRL company/branding" },
    { value: "Theft", severity: 3, title: "Theft of a framework, vehicle, someone else work..." },
    { value: "Masking", severity: 3, title: "This is when the creator is pretending to be someone else" },
    { value: "Dumping", severity: 3, title: "Someone that is offering Server Dumping Services" },
    { value: "Un-Auth Marketplace", severity: 3, title: "When someone is selling outside of tebex" },
    { value: "Misc-Market", severity: 0, title: "Any sort of market like Fiverr, Etsy, Ebay" },
    { value: "Unlicensed Sales", severity: 2, title: "Selling assets that are 'Open Sources' from a paid asset that they have purchased" },
    { value: "Cheats", severity: 3, title: "Selling Mod/Cheat menus" },
    { value: "Service Selling", severity: 1, title: "Selling boosting sevices within FiveM ONLY" },
    { value: "Un-Auth GSP", severity: 2, title: "Selling un-authorised GSP's" }
  ];

  const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const [formData, setFormData] = useState<BlacklistEntry>({
    name: '',
    links: [],
    reason: '',
    severity: 'medium',
    category: 'other',
    keyword: '',
    flagged_by: '',
    blacklisted_since: getCurrentDate(),
    discord_server_id: ''
  });

  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

  useEffect(() => {
    loadBlacklistEntries();
  }, []);

  const loadBlacklistEntries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blacklist_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading blacklist entries:', error);
        toast.error('Failed to load blacklist entries');
        return;
      }

      setBlacklistEntries((data || []) as BlacklistEntry[]);
    } catch (error) {
      console.error('Error loading blacklist entries:', error);
      toast.error('Failed to load blacklist entries');
    } finally {
      setLoading(false);
    }
  };

  const exportBlacklistEntries = () => {
    const dataStr = JSON.stringify(blacklistEntries, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `blacklist-entries-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importBlacklistEntries = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid file format');
        }

        for (const entry of data) {
          const { id, created_at, updated_at, ...entryData } = entry;
          await supabase.from('blacklist_entries').insert([entryData]);
        }

        toast.success(`Imported ${data.length} blacklist entries successfully`);
        loadBlacklistEntries();
      } catch (error) {
        console.error('Error importing blacklist entries:', error);
        toast.error('Failed to import blacklist entries');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleImportFromConfig = async () => {
    try {
      setImporting(true);
      
      // Check if data already exists
      const { data: existingData } = await supabase
        .from('blacklist_entries')
        .select('id')
        .limit(1);

      if (existingData && existingData.length > 0) {
        if (!confirm('Database already contains blacklist entries. This will add new entries. Continue?')) {
          setImporting(false);
          return;
        }
      }

      const entriesToImport = BLACKLISTED_CREATORS.map(creator => ({
        name: creator.name,
        links: creator.links || [],
        reason: creator.reason,
        severity: creator.severity,
        blacklisted_since: creator.blacklistedSince,
        category: creator.category,
        keyword: creator.keyword,
        flagged_by: creator.flaggedBy,
        discord_server_id: creator.discordServerId || null
      }));

      const { error } = await supabase
        .from('blacklist_entries')
        .insert(entriesToImport);

      if (error) {
        console.error('Error importing blacklist entries:', error);
        toast.error('Failed to import blacklist entries');
        return;
      }

      toast.success(`Successfully imported ${entriesToImport.length} blacklist entries`);
      loadBlacklistEntries();
    } catch (error) {
      console.error('Error importing blacklist entries:', error);
      toast.error('Failed to import blacklist entries');
    } finally {
      setImporting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const entryData = {
        ...formData,
        reason: selectedReasons.join(', '),
        links: formData.links.filter(link => link.trim() !== ''),
        discord_server_id: formData.discord_server_id || null
      };

      if (editingEntry) {
        const { error } = await supabase
          .from('blacklist_entries')
          .update(entryData)
          .eq('id', editingEntry.id);

        if (error) {
          console.error('Error updating blacklist entry:', error);
          toast.error('Failed to update blacklist entry');
          return;
        }

        toast.success('Blacklist entry updated successfully');
      } else {
        const { error } = await supabase
          .from('blacklist_entries')
          .insert([entryData]);

        if (error) {
          console.error('Error creating blacklist entry:', error);
          toast.error('Failed to create blacklist entry');
          return;
        }

        toast.success('Blacklist entry created successfully');
      }

      setIsDialogOpen(false);
      setEditingEntry(null);
      resetForm();
      loadBlacklistEntries();
    } catch (error) {
      console.error('Error saving blacklist entry:', error);
      toast.error('Failed to save blacklist entry');
    }
  };

  const handleEdit = (entry: BlacklistEntry) => {
    setEditingEntry(entry);
    setFormData({
      ...entry,
      links: entry.links || [],
      discord_server_id: entry.discord_server_id || ''
    });
    setSelectedReasons(entry.reason ? entry.reason.split(', ') : []);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blacklist entry?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blacklist_entries')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting blacklist entry:', error);
        toast.error('Failed to delete blacklist entry');
        return;
      }

      toast.success('Blacklist entry deleted successfully');
      loadBlacklistEntries();
    } catch (error) {
      console.error('Error deleting blacklist entry:', error);
      toast.error('Failed to delete blacklist entry');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      links: [],
      reason: '',
      severity: 'medium',
      category: 'other',
      keyword: '',
      flagged_by: '',
      blacklisted_since: getCurrentDate(),
      discord_server_id: ''
    });
    setSelectedReasons([]);
  };

  const openAddDialog = () => {
    setEditingEntry(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const addLinkField = () => {
    setFormData({ ...formData, links: [...formData.links, ''] });
  };

  const removeLinkField = (index: number) => {
    const newLinks = formData.links.filter((_, i) => i !== index);
    setFormData({ ...formData, links: newLinks });
  };

  const updateLinkField = (index: number, value: string) => {
    const newLinks = [...formData.links];
    newLinks[index] = value;
    setFormData({ ...formData, links: newLinks });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Blacklist Links</h2>
          <p className="text-muted-foreground">Manage blacklisted creators and resources</p>
        </div>
        <div className="flex gap-2">
          <label htmlFor="import-blacklist">
            <Button variant="outline" className="cursor-pointer border-green-500/20 hover:bg-green-500/10 text-green-400">
              <Upload className="w-4 h-4 mr-2" />
              Import from File
            </Button>
            <input
              id="import-blacklist"
              type="file"
              accept=".json"
              onChange={importBlacklistEntries}
              style={{ display: 'none' }}
            />
          </label>
          <Button onClick={exportBlacklistEntries} variant="outline" className="border-blue-500/20 hover:bg-blue-500/10 text-blue-400">
            <Download className="w-4 h-4 mr-2" />
            Export to File
          </Button>
          <Button 
            onClick={handleImportFromConfig}
            disabled={importing}
            variant="outline" 
            className="border-orange-500/20 hover:bg-orange-500/10 text-orange-400"
          >
            {importing ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            Import from Config
          </Button>
          <Button onClick={openAddDialog} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </div>

      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-400" />
            Blacklist Entries ({blacklistEntries.length})
          </CardTitle>
          <CardDescription>
            Manage entries that will be checked during resource validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/80">Name</TableHead>
                  <TableHead className="text-white/80">Category</TableHead>
                  <TableHead className="text-white/80">Severity</TableHead>
                  <TableHead className="text-white/80">Reason</TableHead>
                  <TableHead className="text-white/80">Flagged By</TableHead>
                  <TableHead className="text-white/80">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blacklistEntries.map((entry) => (
                  <TableRow key={entry.id} className="border-white/10">
                    <TableCell className="text-white">
                      <div>
                        <div className="font-medium">{entry.name}</div>
                        <div className="text-sm text-white/60">Keyword: {entry.keyword}</div>
                        {entry.discord_server_id && (
                          <div className="text-xs text-white/50">Discord: {entry.discord_server_id}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {entry.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(entry.severity)}>
                        {entry.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white max-w-md">
                      <div className="truncate">{entry.reason}</div>
                      {entry.links && entry.links.length > 0 && (
                        <div className="text-xs text-white/60 mt-1">
                          {entry.links.length} link(s)
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-white/80">{entry.flagged_by}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEdit(entry)}
                          size="sm"
                          variant="outline"
                          className="border-blue-500/20 hover:bg-blue-500/10 text-blue-400"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(entry.id!)}
                          size="sm"
                          variant="outline"
                          className="border-red-500/20 hover:bg-red-500/10 text-red-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {blacklistEntries.length === 0 && (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/60">No blacklist entries found</p>
                <p className="text-white/40 text-sm">Click "Add Entry" or "Import from Config" to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingEntry ? 'Edit Blacklist Entry' : 'Add Blacklist Entry'}
            </DialogTitle>
            <DialogDescription>
              {editingEntry ? 'Update the blacklist entry details' : 'Add a new entry to the blacklist database'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Creator/Resource name"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white">Keyword</label>
                <Input
                  value={formData.keyword}
                  onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                  placeholder="Search keyword"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white">Category</label>
                <Select value={formData.category} onValueChange={(value: any) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discord">Discord</SelectItem>
                    <SelectItem value="tebex">Tebex</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-white">Severity</label>
                <Select value={formData.severity} onValueChange={(value: any) => setFormData({ ...formData, severity: value })}>
                  <SelectTrigger>
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
            </div>

            <div>
              <label className="text-sm font-medium text-white">Reasons (Select Multiple)</label>
              <div className="border rounded-md p-3 max-h-48 overflow-y-auto bg-background">
                {reasonOptions.map((option) => (
                  <label key={option.value} className="flex items-start space-x-2 py-2 cursor-pointer hover:bg-muted/50 rounded px-2">
                    <input
                      type="checkbox"
                      checked={selectedReasons.includes(option.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedReasons([...selectedReasons, option.value]);
                        } else {
                          setSelectedReasons(selectedReasons.filter(r => r !== option.value));
                        }
                      }}
                      className="mt-1 accent-green-500"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm text-white">{option.value}</span>
                      <span className="text-xs text-muted-foreground">{option.title}</span>
                    </div>
                  </label>
                ))}
              </div>
              {selectedReasons.length > 0 && (
                <div className="mt-2 text-xs text-white/60">
                  Selected: {selectedReasons.join(', ')}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white">Flagged By</label>
                <Input
                  value={formData.flagged_by}
                  onChange={(e) => setFormData({ ...formData, flagged_by: e.target.value })}
                  placeholder="Who flagged this"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white">Discord Server ID</label>
                <Input
                  value={formData.discord_server_id}
                  onChange={(e) => setFormData({ ...formData, discord_server_id: e.target.value })}
                  placeholder="Discord server ID (optional)"
                />
              </div>
            </div>

             <div>
               <div className="flex items-center justify-between mb-2">
                 <label className="text-sm font-medium text-white">Links</label>
                 <Button
                   type="button"
                   onClick={addLinkField}
                   size="sm"
                   variant="outline"
                   className="border-green-500/20 hover:bg-green-500/10 text-green-400"
                 >
                   <Plus className="w-3 h-3 mr-1" />
                   Add Link
                 </Button>
               </div>
               
               {formData.links.length === 0 && (
                 <div className="text-center py-4 border-2 border-dashed border-white/20 rounded-md">
                   <p className="text-white/60 text-sm">No links added yet</p>
                   <p className="text-white/40 text-xs">Click "Add Link" to start adding links</p>
                 </div>
               )}
               
               <div className="space-y-2">
                 {formData.links.map((link, index) => (
                   <div key={index} className="flex gap-2">
                     <Input
                       value={link}
                       onChange={(e) => updateLinkField(index, e.target.value)}
                       placeholder={`https://example.com/link${index + 1}`}
                       className="flex-1"
                     />
                     <Button
                       type="button"
                       onClick={() => removeLinkField(index)}
                       size="sm"
                       variant="outline"
                       className="border-red-500/20 hover:bg-red-500/10 text-red-400 px-2"
                     >
                       <Trash2 className="w-3 h-3" />
                     </Button>
                   </div>
                 ))}
               </div>
               
               {formData.links.length > 0 && (
                 <p className="text-xs text-green-400 mt-2">{formData.links.length} link(s) added</p>
               )}
             </div>

            <div>
              <label className="text-sm font-medium text-white">Blacklisted Since</label>
              <Input
                value={formData.blacklisted_since}
                readOnly
                placeholder="DD-MM-YYYY"
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-white/60 mt-1">Automatically set to current date</p>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingEntry ? 'Update Entry' : 'Add Entry'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlacklistLinks;