import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, Save, X, Upload, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Partner {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  partner_type: string;
  featured: boolean;
  display_order: number;
  metadata: any;
  created_at: string;
  updated_at: string;
}

interface PartnerFormData {
  name: string;
  description: string;
  logo_url: string;
  website_url: string;
  partner_type: string;
  featured: boolean;
  display_order: number;
  metadata: string;
}

const PARTNER_TYPES = [
  { value: 'creator', label: 'Creator' },
  { value: 'recommended', label: 'Recommended' },
  { value: 'hosting', label: 'Hosting' },
  { value: 'framework', label: 'Framework' },
  { value: 'server', label: 'Server' }
];

export default function PartnersManager() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPartner, setEditingPartner] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');

  const [formData, setFormData] = useState<PartnerFormData>({
    name: '',
    description: '',
    logo_url: '',
    website_url: '',
    partner_type: 'creator',
    featured: false,
    display_order: 0,
    metadata: '{}'
  });

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('partner_type', { ascending: true })
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error loading partners:', error);
      toast.error("Failed to load partners");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let metadata = {};
      try {
        metadata = JSON.parse(formData.metadata);
      } catch {
        metadata = {};
      }

      const partnerData = {
        ...formData,
        metadata
      };

      if (editingPartner) {
        const { error } = await supabase
          .from('partners')
          .update(partnerData)
          .eq('id', editingPartner);

        if (error) throw error;
        toast.success("Partner updated successfully");
      } else {
        const { error } = await supabase
          .from('partners')
          .insert([partnerData]);

        if (error) throw error;
        toast.success("Partner added successfully");
      }

      resetForm();
      loadPartners();
    } catch (error) {
      console.error('Error saving partner:', error);
      toast.error("Failed to save partner");
    }
  };

  const handleEdit = (partner: Partner) => {
    setFormData({
      name: partner.name,
      description: partner.description || '',
      logo_url: partner.logo_url || '',
      website_url: partner.website_url || '',
      partner_type: partner.partner_type,
      featured: partner.featured,
      display_order: partner.display_order,
      metadata: JSON.stringify(partner.metadata, null, 2)
    });
    setEditingPartner(partner.id);
    setShowAddForm(true);
  };

  const handleDelete = async (partnerId: string) => {
    if (!confirm('Are you sure you want to delete this partner?')) return;

    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', partnerId);

      if (error) throw error;
      
      toast.success("Partner deleted successfully");
      loadPartners();
    } catch (error) {
      console.error('Error deleting partner:', error);
      toast.error("Failed to delete partner");
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      logo_url: '',
      website_url: '',
      partner_type: 'creator',
      featured: false,
      display_order: 0,
      metadata: '{}'
    });
    setEditingPartner(null);
    setShowAddForm(false);
  };

  const exportPartners = () => {
    const filteredPartners = selectedType === 'all' 
      ? partners 
      : partners.filter(p => p.partner_type === selectedType);
    
    const dataStr = JSON.stringify(filteredPartners, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `partners-${selectedType}-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importPartners = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid file format');
        }

        for (const partner of data) {
          const { id, created_at, updated_at, ...partnerData } = partner;
          await supabase.from('partners').insert([partnerData]);
        }

        toast.success(`Imported ${data.length} partners successfully`);
        loadPartners();
      } catch (error) {
        console.error('Error importing partners:', error);
        toast.error("Failed to import partners");
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const filteredPartners = selectedType === 'all' 
    ? partners 
    : partners.filter(p => p.partner_type === selectedType);

  if (loading) {
    return <div className="text-white">Loading partners...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Partners Management</h2>
        <div className="flex gap-2">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {PARTNER_TYPES.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <label htmlFor="import-partners">
            <Button variant="outline" className="cursor-pointer">
              <Upload className="w-4 h-4 mr-1" />
              Import
            </Button>
            <input
              id="import-partners"
              type="file"
              accept=".json"
              onChange={importPartners}
              style={{ display: 'none' }}
            />
          </label>
          <Button onClick={exportPartners} variant="outline">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-1" />
            Add Partner
          </Button>
        </div>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingPartner ? 'Edit Partner' : 'Add New Partner'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Partner Type *</label>
                  <Select 
                    value={formData.partner_type} 
                    onValueChange={(value: any) => setFormData({...formData, partner_type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PARTNER_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white">Logo URL</label>
                  <Input
                    value={formData.logo_url}
                    onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
                    placeholder="/placeholder.svg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Website URL</label>
                  <Input
                    value={formData.website_url}
                    onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-white">Featured</label>
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Display Order</label>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white">Metadata (JSON)</label>
                <Textarea
                  value={formData.metadata}
                  onChange={(e) => setFormData({...formData, metadata: e.target.value})}
                  rows={4}
                  placeholder='{"key": "value"}'
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  <Save className="w-4 h-4 mr-1" />
                  {editingPartner ? 'Update' : 'Add'} Partner
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {filteredPartners.map((partner) => (
          <Card key={partner.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-white">{partner.name}</h3>
                    <Badge variant={partner.featured ? "default" : "secondary"}>
                      {partner.partner_type}
                    </Badge>
                    {partner.featured && (
                      <Badge variant="outline">Featured</Badge>
                    )}
                  </div>
                  {partner.description && (
                    <p className="text-white/70 text-sm mb-2">{partner.description}</p>
                  )}
                  <div className="text-xs text-white/50 space-y-1">
                    {partner.website_url && (
                      <div>Website: {partner.website_url}</div>
                    )}
                    <div>Order: {partner.display_order}</div>
                    {Object.keys(partner.metadata).length > 0 && (
                      <div>Metadata: {JSON.stringify(partner.metadata)}</div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(partner)}>
                    <Edit2 className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(partner.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPartners.length === 0 && (
        <div className="text-center py-8 text-white/60">
          No partners found for the selected type.
        </div>
      )}
    </div>
  );
}