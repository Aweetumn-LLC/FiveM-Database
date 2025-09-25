import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Trash2, Edit, Plus, Save, X, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface CreatorRelease {
  id: string;
  creator_name: string;
  resource_name: string;
  price: string;
  store_name: string;
  store_link: string;
  resource_link: string;
  preview_images: string[];
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
}

const CreatorMarketManager = () => {
  const [releases, setReleases] = useState<CreatorRelease[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newRelease, setNewRelease] = useState({ 
    creator_name: "", 
    resource_name: "", 
    price: "", 
    store_name: "", 
    store_link: "", 
    resource_link: "",
    preview_images: ""
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchReleases();
  }, []);

  const fetchReleases = async () => {
    try {
      const { data, error } = await supabase
        .from('creator_releases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReleases(data || []);
    } catch (error) {
      console.error('Error fetching releases:', error);
      toast.error("Failed to fetch creator releases");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (id: string, updates: Partial<CreatorRelease>) => {
    try {
      const { error } = await supabase
        .from('creator_releases')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setReleases(prev => prev.map(release => 
        release.id === id ? { ...release, ...updates } : release
      ));

      toast.success("Release updated successfully");
    } catch (error) {
      console.error('Error updating release:', error);
      toast.error("Failed to update release");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this release?')) return;

    try {
      const { error } = await supabase
        .from('creator_releases')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setReleases(prev => prev.filter(release => release.id !== id));
      toast.success("Release deleted successfully");
    } catch (error) {
      console.error('Error deleting release:', error);
      toast.error("Failed to delete release");
    }
  };

  const handleAdd = async () => {
    if (!newRelease.creator_name || !newRelease.resource_name || !newRelease.store_name || !newRelease.store_link || !newRelease.resource_link || !newRelease.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      // Parse preview images from comma/newline separated string
      const imageUrls = newRelease.preview_images
        .split(/[\n,]/)
        .map(url => url.trim())
        .filter(url => url.length > 0);

      const { data, error } = await supabase
        .from('creator_releases')
        .insert({
          creator_name: newRelease.creator_name,
          resource_name: newRelease.resource_name,
          price: newRelease.price,
          store_name: newRelease.store_name,
          store_link: newRelease.store_link,
          resource_link: newRelease.resource_link,
          preview_images: imageUrls,
          is_approved: true,
          is_featured: false
        })
        .select()
        .single();

      if (error) throw error;

      setReleases(prev => [data, ...prev]);
      setNewRelease({ creator_name: "", resource_name: "", price: "", store_name: "", store_link: "", resource_link: "", preview_images: "" });
      setShowAddForm(false);

      toast.success("Release added successfully");
    } catch (error) {
      console.error('Error adding release:', error);
      toast.error("Failed to add release");
    }
  };

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-black text-white">
          <AdminSidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-black text-white">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          <div className="glass-effect border-b border-white/10 sticky top-0 z-40">
            <div className="px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="text-white/80 hover:text-white" />
                <h1 className="text-2xl font-bold text-white">Creator Market Manager</h1>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Creator Market Posts</h2>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Release
                </Button>
              </div>

              {showAddForm && (
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Add New Release</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="new-creator" className="text-white">Creator Name *</Label>
                        <Input
                          id="new-creator"
                          value={newRelease.creator_name}
                          onChange={(e) => setNewRelease(prev => ({ ...prev, creator_name: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-resource" className="text-white">Resource Name *</Label>
                        <Input
                          id="new-resource"
                          value={newRelease.resource_name}
                          onChange={(e) => setNewRelease(prev => ({ ...prev, resource_name: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-store" className="text-white">Store Name *</Label>
                        <Input
                          id="new-store"
                          value={newRelease.store_name}
                          onChange={(e) => setNewRelease(prev => ({ ...prev, store_name: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-price" className="text-white">Resource Price *</Label>
                        <Input
                          id="new-price"
                          value={newRelease.price}
                          onChange={(e) => setNewRelease(prev => ({ ...prev, price: e.target.value }))}
                          placeholder="e.g., $25.00 or Free"
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-store-link" className="text-white">Store Link *</Label>
                        <Input
                          id="new-store-link"
                          type="url"
                          value={newRelease.store_link}
                          onChange={(e) => setNewRelease(prev => ({ ...prev, store_link: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-resource-link" className="text-white">Resource Link *</Label>
                        <Input
                          id="new-resource-link"
                          type="url"
                          value={newRelease.resource_link}
                          onChange={(e) => setNewRelease(prev => ({ ...prev, resource_link: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="new-preview-images" className="text-white">Preview Images</Label>
                      <Textarea
                        id="new-preview-images"
                        value={newRelease.preview_images}
                        onChange={(e) => setNewRelease(prev => ({ ...prev, preview_images: e.target.value }))}
                        placeholder="Enter image URLs, one per line:&#10;https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.png"
                        className="bg-white/10 border-white/20 text-white min-h-[120px] resize-y font-mono text-sm"
                        rows={5}
                        spellCheck={false}
                        wrap="off"
                      />
                      <p className="text-xs text-gray-400 mt-1">Enter multiple image URLs - one per line or separated by commas</p>
                    </div>
                    <div className="flex gap-2 pt-4">
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {releases.map((release) => (
                  <Card key={release.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-white text-lg">{release.creator_name} - {release.resource_name}</CardTitle>
                          <CardDescription className="text-gray-400">
                            Store: {release.store_name} | Price: {release.price}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={release.is_approved ? "default" : "secondary"}>
                            {release.is_approved ? "Approved" : "Pending"}
                          </Badge>
                          <Badge variant={release.is_featured ? "default" : "outline"}>
                            {release.is_featured ? "Featured" : "Standard"}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={release.is_approved}
                            onCheckedChange={(checked) => handleUpdate(release.id, { is_approved: checked })}
                          />
                          <span className="text-sm text-gray-400">Approved</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={release.is_featured}
                            onCheckedChange={(checked) => handleUpdate(release.id, { is_featured: checked })}
                          />
                          <span className="text-sm text-gray-400">Featured</span>
                        </div>
                      </div>
                    </div>

                    {editingId === release.id ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <Input
                            value={release.creator_name}
                            onChange={(e) => setReleases(prev => prev.map(r => 
                              r.id === release.id ? { ...r, creator_name: e.target.value } : r
                            ))}
                            placeholder="Creator Name"
                            className="bg-white/10 border-white/20 text-white"
                          />
                          <Input
                            value={release.resource_name}
                            onChange={(e) => setReleases(prev => prev.map(r => 
                              r.id === release.id ? { ...r, resource_name: e.target.value } : r
                            ))}
                            placeholder="Resource Name"
                            className="bg-white/10 border-white/20 text-white"
                          />
                          <Input
                            value={release.store_name}
                            onChange={(e) => setReleases(prev => prev.map(r => 
                              r.id === release.id ? { ...r, store_name: e.target.value } : r
                            ))}
                            placeholder="Store Name"
                            className="bg-white/10 border-white/20 text-white"
                          />
                          <Input
                            value={release.price}
                            onChange={(e) => setReleases(prev => prev.map(r => 
                              r.id === release.id ? { ...r, price: e.target.value } : r
                            ))}
                            placeholder="Price"
                            className="bg-white/10 border-white/20 text-white"
                          />
                          <Input
                            value={release.store_link}
                            onChange={(e) => setReleases(prev => prev.map(r => 
                              r.id === release.id ? { ...r, store_link: e.target.value } : r
                            ))}
                            placeholder="Store Link"
                            className="bg-white/10 border-white/20 text-white"
                          />
                          <Input
                            value={release.resource_link}
                            onChange={(e) => setReleases(prev => prev.map(r => 
                              r.id === release.id ? { ...r, resource_link: e.target.value } : r
                            ))}
                            placeholder="Resource Link"
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Preview Images</Label>
                          <Textarea
                            value={Array.isArray(release.preview_images) ? release.preview_images.join('\n') : ''}
                            onChange={(e) => {
                              const imageUrls = e.target.value
                                .split(/[\n,]/)
                                .map(url => url.trim())
                                .filter(url => url.length > 0);
                              setReleases(prev => prev.map(r => 
                                r.id === release.id ? { ...r, preview_images: imageUrls } : r
                              ));
                            }}
                            placeholder="Enter image URLs, one per line:&#10;https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                            className="bg-white/10 border-white/20 text-white min-h-[100px] resize-y font-mono text-sm"
                            rows={4}
                            spellCheck={false}
                            wrap="off"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              handleUpdate(release.id, { 
                                creator_name: release.creator_name,
                                resource_name: release.resource_name,
                                store_name: release.store_name,
                                price: release.price,
                                store_link: release.store_link,
                                resource_link: release.resource_link,
                                preview_images: release.preview_images
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
                              fetchReleases(); // Reset changes
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Preview Images Display */}
                        {release.preview_images && release.preview_images.length > 0 && (
                          <div className="mb-3">
                            <Label className="text-white text-sm">Preview Images ({release.preview_images.length})</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                              {release.preview_images.slice(0, 6).map((imageUrl, index) => (
                                <div key={index} className="relative h-16 bg-gray-800 rounded border border-gray-600 overflow-hidden">
                                  <img 
                                    src={imageUrl} 
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3e%3crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3e%3ccircle cx='8.5' cy='8.5' r='1.5'/%3e%3cpolyline points='21,15 16,10 5,21'/%3e%3c/svg%3e";
                                    }}
                                  />
                                </div>
                              ))}
                              {release.preview_images.length > 6 && (
                                <div className="h-16 bg-gray-800 rounded border border-gray-600 flex items-center justify-center">
                                  <span className="text-xs text-gray-400">+{release.preview_images.length - 6} more</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                          >
                            <a href={release.store_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Store
                            </a>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                          >
                            <a href={release.resource_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Resource
                            </a>
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingId(release.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(release.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

              {releases.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No creator releases found.</p>
                  <p className="text-gray-500 text-sm mt-2">Add your first release to get started.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CreatorMarketManager;