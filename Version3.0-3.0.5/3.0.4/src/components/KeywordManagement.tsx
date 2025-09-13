import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Plus, Trash2, Shield, Key, Eye, EyeOff, Download, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

interface KeywordItem {
  id: string;
  keyword: string;
  created_at: string;
}

interface ContextualPattern {
  id: string;
  pattern: string[];
  created_at: string;
}

interface KeywordManagementProps {
  type: 'ip-violation' | 'coc-violation' | 'ip-bypass' | 'coc-bypass' | 'contextual';
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const KeywordManagement: React.FC<KeywordManagementProps> = ({ type, title, description, icon: Icon }) => {
  const { hasPermission, logActivity } = useAdminAuth();
  const [keywords, setKeywords] = useState<KeywordItem[]>([]);
  const [contextualPatterns, setContextualPatterns] = useState<ContextualPattern[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Form states
  const [newKeyword, setNewKeyword] = useState("");
  const [newPattern, setNewPattern] = useState("");

  // Get table name for database operations
  const getTableName = (type: string): 'ip_violation_keywords' | 'coc_violation_keywords' | 'ip_bypass_keywords' | 'coc_bypass_keywords' | 'coc_contextual_patterns' => {
    switch (type) {
      case 'ip-violation': return 'ip_violation_keywords';
      case 'coc-violation': return 'coc_violation_keywords';
      case 'ip-bypass': return 'ip_bypass_keywords';
      case 'coc-bypass': return 'coc_bypass_keywords';
      case 'contextual': return 'coc_contextual_patterns';
      default: return 'ip_violation_keywords'; // fallback
    }
  };

  const tableName = getTableName(type);

  useEffect(() => {
    loadData();
  }, [type]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (type === 'contextual') {
        const { data, error } = await supabase
          .from('coc_contextual_patterns')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setContextualPatterns(data as ContextualPattern[] || []);
      } else {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setKeywords(data as KeywordItem[] || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const addKeyword = async () => {
    if (!newKeyword.trim()) {
      toast.error("Please enter a keyword");
      return;
    }

    if (!hasPermission('edit_keywords')) {
      toast.error("You don't have permission to add keywords");
      return;
    }

    try {
      const { error } = await supabase
        .from(tableName)
        .insert([{ keyword: newKeyword.trim() }]);

      if (error) throw error;

      await logActivity('create', `Added keyword: "${newKeyword.trim()}" to ${tableName}`, {
        action: 'add',
        table: tableName,
        keyword: newKeyword.trim(),
        target_table: tableName
      });

      setNewKeyword("");
      setIsDialogOpen(false);
      loadData();
      toast.success("Keyword added successfully");
    } catch (error) {
      console.error('Error adding keyword:', error);
      toast.error("Failed to add keyword");
    }
  };

  const addPattern = async () => {
    if (!newPattern.trim()) {
      toast.error("Please enter a pattern");
      return;
    }

    if (!hasPermission('edit_keywords')) {
      toast.error("You don't have permission to add patterns");
      return;
    }

    try {
      const patternArray = newPattern.split(',').map(s => s.trim()).filter(Boolean);
      
      const { error } = await supabase
        .from('coc_contextual_patterns')
        .insert([{ pattern: patternArray }]);

      if (error) throw error;

      await logActivity('create', `Added contextual pattern: [${patternArray.join(', ')}]`, {
        action: 'add',
        table: 'coc_contextual_patterns',
        pattern: patternArray,
        target_table: 'coc_contextual_patterns'
      });

      setNewPattern("");
      setIsDialogOpen(false);
      loadData();
      toast.success("Pattern added successfully");
    } catch (error) {
      console.error('Error adding pattern:', error);
      toast.error("Failed to add pattern");
    }
  };

  const deleteItem = async (id: string) => {
    if (!hasPermission('edit_keywords')) {
      toast.error("You don't have permission to delete items");
      return;
    }

    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;

      await logActivity('delete', `Deleted item from ${tableName}`, {
        action: 'delete',
        table: tableName,
        target_table: tableName,
        target_id: id
      });

      loadData();
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error("Failed to delete item");
    }
  };

  const exportData = () => {
    const data = type === 'contextual' ? contextualPatterns : keywords;
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${type}-keywords-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid file format');
        }

        for (const item of data) {
          const { id, created_at, updated_at, ...itemData } = item;
          
          if (type === 'contextual') {
            await supabase.from('coc_contextual_patterns').insert([itemData]);
          } else {
            await supabase.from(tableName).insert([itemData]);
          }
        }

        toast.success(`Imported ${data.length} items successfully`);
        loadData();
      } catch (error) {
        console.error('Error importing data:', error);
        toast.error('Failed to import data');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const filteredData = type === 'contextual' 
    ? contextualPatterns.filter(pattern => 
        pattern.pattern.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : keywords.filter(keyword => 
        keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const displayedData = showAll ? filteredData : filteredData.slice(0, 10);

  const canEdit = hasPermission('edit_keywords');
  const canView = hasPermission('view_keywords') || canEdit;

  if (!canView) {
    return (
      <Card className="glass-card border-0">
        <CardContent className="p-8 text-center">
          <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Access Denied</h3>
          <p className="text-white/60">You don't have permission to view this section.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card border-0">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Icon className="h-6 w-6 text-orange-400" />
              <div>
                <CardTitle className="text-white">{title}</CardTitle>
                <CardDescription className="text-white/60">{description}</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-orange-400 border-orange-400/30">
                {type === 'contextual' ? contextualPatterns.length : keywords.length} items
              </Badge>
              {canEdit ? (
                <Badge variant="outline" className="text-green-400 border-green-400/30">
                  <Shield className="h-3 w-3 mr-1" />
                  Can Edit
                </Badge>
              ) : (
                <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                  <Eye className="h-3 w-3 mr-1" />
                  View Only
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                placeholder={`Search ${type === 'contextual' ? 'patterns' : 'keywords'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={exportData}
                variant="outline"
                size="sm"
                className="border-blue-500/20 hover:bg-blue-500/10 text-blue-400"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              {canEdit && (
                <>
                  <label htmlFor={`import-${type}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer border-green-500/20 hover:bg-green-500/10 text-green-400"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                    <input
                      id={`import-${type}`}
                      type="file"
                      accept=".json"
                      onChange={importData}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add {type === 'contextual' ? 'Pattern' : 'Keyword'}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/80">
                    {type === 'contextual' ? 'Pattern' : 'Keyword'}
                  </TableHead>
                  <TableHead className="text-white/80">Created</TableHead>
                  {canEdit && <TableHead className="text-white/80 w-20">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedData.map((item) => (
                  <TableRow key={item.id} className="border-white/10">
                    <TableCell className="text-white">
                      <div className="font-mono text-sm">
                        {type === 'contextual' 
                          ? (item as ContextualPattern).pattern.join(', ')
                          : (item as KeywordItem).keyword
                        }
                      </div>
                    </TableCell>
                    <TableCell className="text-white/60">
                      {new Date(item.created_at).toLocaleDateString()}
                    </TableCell>
                    {canEdit && (
                      <TableCell>
                        <Button
                          onClick={() => deleteItem(item.id)}
                          size="sm"
                          variant="outline"
                          className="border-red-500/20 hover:bg-red-500/10 text-red-400"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Show More/Less Button */}
          {filteredData.length > 10 && (
            <div className="text-center">
              <Button
                onClick={() => setShowAll(!showAll)}
                variant="outline"
                className="border-white/10 hover:bg-white/5"
              >
                {showAll ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Show Less
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Show All ({filteredData.length - 10} more)
                  </>
                )}
              </Button>
            </div>
          )}

          {filteredData.length === 0 && (
            <div className="text-center py-8">
              <Key className="h-12 w-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/60">
                {searchTerm ? 'No items match your search.' : 'No items found.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-neo">
          <DialogHeader>
            <DialogTitle className="text-white">
              Add New {type === 'contextual' ? 'Pattern' : 'Keyword'}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              {type === 'contextual' 
                ? 'Enter comma-separated words to create a contextual pattern'
                : 'Enter a new keyword to add to the list'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-item" className="text-white">
                {type === 'contextual' ? 'Pattern (comma-separated)' : 'Keyword'}
              </Label>
              {type === 'contextual' ? (
                <Textarea
                  id="new-item"
                  value={newPattern}
                  onChange={(e) => setNewPattern(e.target.value)}
                  placeholder="word1, word2, word3"
                  className="bg-white/5 border-white/10 text-white mt-2"
                />
              ) : (
                <Input
                  id="new-item"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Enter keyword"
                  className="bg-white/5 border-white/10 text-white mt-2"
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsDialogOpen(false)}
              variant="outline"
              className="border-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={type === 'contextual' ? addPattern : addKeyword}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Add {type === 'contextual' ? 'Pattern' : 'Keyword'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KeywordManagement;