import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Trash2, Edit, Plus, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useAdminLogger } from "@/hooks/useAdminLogger";

interface FeaturedCreator {
  id: string;
  name: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

const FeaturedCreators = () => {
  const { user } = useAdminAuth();
  const { logAdminAction } = useAdminLogger();
  const [creators, setCreators] = useState<FeaturedCreator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCreator, setNewCreator] = useState({ name: "", image_url: "", display_order: 0 });
  const [showAddForm, setShowAddForm] = useState(false);
  

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const { data, error } = await supabase
        .from('featured_creators')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCreators(data || []);
    } catch (error) {
      console.error('Error fetching creators:', error);
      toast.error("Failed to fetch featured creators");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (id: string, updates: Partial<FeaturedCreator>) => {
    try {
      const { error } = await supabase
        .from('featured_creators')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setCreators(prev => prev.map(creator => 
        creator.id === id ? { ...creator, ...updates } : creator
      ));

      // Log the admin action
      const creator = creators.find(c => c.id === id);
      await logAdminAction(
        user?.username || 'Unknown',
        'updated',
        'featured_creators',
        creator?.name || 'Unknown',
        `Updated featured creator "${creator?.name}"`
      );

      toast.success("Creator updated successfully");
    } catch (error) {
      console.error('Error updating creator:', error);
      toast.error("Failed to update creator");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this creator?')) return;

    try {
      const { error } = await supabase
        .from('featured_creators')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Find the deleted creator for logging
      const deletedCreator = creators.find(creator => creator.id === id);
      
      // Log the admin action
      await logAdminAction(
        user?.username || 'Unknown',
        'deleted',
        'featured_creators',
        deletedCreator?.name || 'Unknown',
        `Deleted featured creator "${deletedCreator?.name}"`
      );

      setCreators(prev => prev.filter(creator => creator.id !== id));

      toast.success("Creator deleted successfully");
    } catch (error) {
      console.error('Error deleting creator:', error);
      toast.error("Failed to delete creator");
    }
  };

  const handleAdd = async () => {
    if (!newCreator.name || !newCreator.image_url) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('featured_creators')
        .insert({
          name: newCreator.name,
          image_url: newCreator.image_url,
          display_order: newCreator.display_order,
        })
        .select()
        .single();

      if (error) throw error;

      // Log the admin action
      await logAdminAction(
        user?.username || 'Unknown',
        'added',
        'featured_creators',
        newCreator.name,
        `Added featured creator "${newCreator.name}"`
      );

      setCreators(prev => [...prev, data]);
      setNewCreator({ name: "", image_url: "", display_order: 0 });
      setShowAddForm(false);

      toast.success("Creator added successfully");
    } catch (error) {
      console.error('Error adding creator:', error);
      toast.error("Failed to add creator");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Featured Creators</h2>
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-white">Featured Creators</h1>
          
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Featured Creators</h2>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Creator
            </Button>
          </div>

          {showAddForm && (
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Add New Creator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="new-name" className="text-white">Name</Label>
                  <Input
                    id="new-name"
                    value={newCreator.name}
                    onChange={(e) => setNewCreator(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="new-image" className="text-white">Image URL</Label>
                  <Input
                    id="new-image"
                    value={newCreator.image_url}
                    onChange={(e) => setNewCreator(prev => ({ ...prev, image_url: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="new-order" className="text-white">Display Order</Label>
                  <Input
                    id="new-order"
                    type="number"
                    value={newCreator.display_order}
                    onChange={(e) => setNewCreator(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAdd}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((creator) => (
              <Card key={creator.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={creator.image_url} 
                        alt={creator.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/48x48/333/fff?text=?";
                        }}
                      />
                      <div>
                        <CardTitle className="text-white text-lg">{creator.name}</CardTitle>
                        <CardDescription className="text-gray-400">
                          Order: {creator.display_order}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={creator.is_active ? "default" : "secondary"}>
                        {creator.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={creator.is_active}
                        onCheckedChange={(checked) => handleUpdate(creator.id, { is_active: checked })}
                      />
                      <span className="text-sm text-gray-400">Active</span>
                    </div>
                  </div>

                  {editingId === creator.id ? (
                    <div className="space-y-3">
                      <Input
                        value={creator.name}
                        onChange={(e) => setCreators(prev => prev.map(c => 
                          c.id === creator.id ? { ...c, name: e.target.value } : c
                        ))}
                        className="bg-white/10 border-white/20 text-white"
                      />
                      <Input
                        value={creator.image_url}
                        onChange={(e) => setCreators(prev => prev.map(c => 
                          c.id === creator.id ? { ...c, image_url: e.target.value } : c
                        ))}
                        className="bg-white/10 border-white/20 text-white"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            handleUpdate(creator.id, { 
                              name: creator.name, 
                              image_url: creator.image_url 
                            });
                            setEditingId(null);
                          }}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingId(null);
                            fetchCreators(); // Reset changes
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingId(creator.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(creator.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCreators;