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
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useAdminLogger } from "@/hooks/useAdminLogger";

interface BlacklistEntry {
  id?: string;
  name: string;
  links: string[];
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical' | 'Exponential';
  blacklisted_since?: string;
  category: 'discord' | 'tebex' | 'other';
  keyword: string;
  flagged_by: string;
  discord_server_id?: string;
  created_at?: string;
  updated_at?: string;
}

const BlacklistLinks = () => {
  const { hasPermission, user } = useAdminAuth();
  const { logAdminAction } = useAdminLogger();
  const [blacklistEntries, setBlacklistEntries] = useState<BlacklistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<BlacklistEntry | null>(null);
  const [importing, setImporting] = useState(false);
  
  const reasonOptions = [
    { value: "Child Pedestrians", reason: "Selling or Producing Child Pedestrians In fiveM (Violation of the Code Of Conduct)", severity: "Exponential" },
    { value: "School RP & Assets", reason: "When a server, creator or marketplace is selling Assets that Include School building or something that is Relevent to the topic. (Violation of the Terms of Service & Code of Conduct)", severity: "Exponential" },
    { value: "Malicious behavior", reason: "When a creator or Server has had Malicious behavior or Malicious Attempts towards a player or the Client of there resources Via using any sort of Harmfull tool. (Violation of the Terms of Service & Code of Conduct & Legal)", severity: "Exponential" },
    { value: "Explicit Adult Content (EAC)", reason: "If a resource or Server is showing Explicit Adult content (EAC) This includes such things as Giving Birth in graphic, Etc, Etc", severity: "Critical" },
    { value: "Debadging", reason: "When a creator/Store has Debadged a vehicle and Claimed it to be Lore Friendly (Violation of the Terms of Service)", severity: "Critical" },
    { value: "IP Infringement", reason: "When a Creator, store or website is selling Branded/Real world assets in there store (Violation of the Terms of Service)", severity: "Critical" },
    { value: "Leaking", reason: "When a Website, discord or store is Leaking assets (Violation of the Terms of Service & Code of Conduct)", severity: "Critical" },
    { value: "Leak Promoting", reason: "This is when a Creator, store or server has partnerd with a leaking service Discord or Website to Promote there Products or server This is also known as Indirect promotion of a leaking service (Violation of the Terms of Service & Code of Conduct)", severity: "Critical" },
    { value: "Reselling", reason: "The act of Taking someone elses work and then Claiming at you're own to then sell on annother Market. (Violation of the Terms of Service, Code of Conduct & The creators Guidelines)", severity: "Critical" },
    { value: "ILLEGAL", reason: "This is when someone is Breaking the LAW and should only be used in the WORST CASE SENARIOS Example Breaking the geneva convention Etc, Etc", severity: "Exponential" },
    { value: "Impersonation", reason: "When a Creator, store or server is pretending to be someone that they are not.", severity: "Critical" },
    { value: "Services", reason: "This is when someone is selling a Service such as Account boosting, Game Boosting, Etc, Etc", severity: "High" },
    { value: "Unauthorized Marketplace", reason: "This is when a Cretor or Seller is using any other platform other than \"TEBEX\" To sell assets on the FiveM Platform (Violation of the Terms of Service)", severity: "Critical" },
    { value: "Cheats", reason: "This is when a Creator Or Marketplace is selling Cheat, Cheat Menus, Cracked Clients, Accounts, Spoofers, Etc, etc (Violation of the Terms of Service & Code of Conduct)", severity: "Critical" },
    { value: "unauthorized GSP", reason: "This is when a hosting company is selling Game Panel's for FiveM Server's (Violation of the Terms of Service)", severity: "Critical" },
    { value: "Scamming", reason: "This is when a Server, Creator or Marketplace has scammed a User and there is sufficient evidance of this.", severity: "Exponential" },
    { value: "Discriminatory or Offensive Content", reason: "When a server or creator includes discriminatory, hateful, or offensive content within resources, such as logos, in-game interactions, or scripts that promote racism, sexism, homophobia, or other forms of hate speech.", severity: "Exponential" },
    { value: "Fake Player Services", reason: "When a Service is offering Fake Players that are Purchasable (Violation of the Terms of Service & Code of Conduct)", severity: "Critical" },
    { value: "Upvote Services", reason: "When a service is offering to sell upvotes that are not from the Authorised market cfx.portal (Violation of the Terms of Service)", severity: "Critical" }
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
    severity: 'critical',
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

        await logAdminAction(
          user?.username || 'Unknown',
          'imported',
          'blacklist_entries',
          `${data.length} entries`,
          `Imported ${data.length} blacklist entries from file`
        );
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

      await logAdminAction(
        user?.username || 'Unknown',
        'imported',
        'blacklist_entries',
        `${entriesToImport.length} entries`,
        `Imported ${entriesToImport.length} blacklist entries from config`
      );
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

        await logAdminAction(
          user?.username || 'Unknown',
          'updated',
          'blacklist_entries',
          entryData.name || editingEntry?.id || 'unknown',
          `Updated blacklist entry "${entryData.name}"`
        );
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

        await logAdminAction(
          user?.username || 'Unknown',
          'created',
          'blacklist_entries',
          entryData.name,
          `Created blacklist entry "${entryData.name}"`
        );
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

      await logAdminAction(
        user?.username || 'Unknown',
        'deleted',
        'blacklist_entries',
        id,
        `Deleted blacklist entry ID ${id}`
      );
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
      severity: 'critical',
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
      case 'Exponential': return 'bg-red-600/20 text-red-300 border-red-600/30';
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
          <Button onClick={exportBlacklistEntries} variant="outline" className="border-blue-500/20 hover:bg-blue-500/10 text-blue-400">
            <Download className="w-4 h-4 mr-2" />
            Export to File
          </Button>
          {hasPermission('edit_blacklist') && (
            <>
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
            </>
          )}
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
                        {hasPermission('edit_blacklist') && (
                          <>
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
                          </>
                        )}
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
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="Exponential">Exponential</SelectItem>
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
                      <span className="text-xs text-muted-foreground">{option.reason}</span>
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