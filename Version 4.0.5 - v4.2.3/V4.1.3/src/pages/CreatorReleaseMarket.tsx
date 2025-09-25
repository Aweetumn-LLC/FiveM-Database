import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Plus, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CreatorRelease {
  id: string;
  creator_name: string;
  resource_name: string;
  price: string;
  store_name: string;
  store_link: string;
  resource_link: string;
  preview_images: string[];
}

import { Helmet } from "react-helmet";

const CreatorReleaseMarket = () => {
  const [releases, setReleases] = useState<CreatorRelease[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "",
    storeLink: "",
    resourceLink: "",
    resourcePrice: "",
    imageLink: ""
  });
  

  useEffect(() => {
    fetchReleases();
  }, []);

  const fetchReleases = async () => {
    try {
      const { data, error } = await supabase
        .from('creator_releases')
        .select('*')
        .eq('is_approved', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setReleases(data || []);
    } catch (error) {
      console.error('Error fetching releases:', error);
      setReleases([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to Discord webhook
      const webhookUrl = "https://discord.com/api/webhooks/1405308460278480936/XCn__lSZr6UVMIQZpy_0acNKDQWXjl_q4HLWstpHiirPF_0ed4h3DHSoqJVrsHDgYhH1";
      
      const discordPayload = {
        embeds: [{
          title: "🚀 New Creator Release Request",
          color: 0x00ff00,
          fields: [
            { name: "Store Name", value: formData.storeName, inline: true },
            { name: "Store Link", value: formData.storeLink, inline: true },
            { name: "Resource Link", value: formData.resourceLink, inline: true },
            { name: "Resource Price", value: formData.resourcePrice, inline: true },
            { name: "Image Link", value: formData.imageLink || "Not provided", inline: true }
          ],
          timestamp: new Date().toISOString()
        }]
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordPayload),
      });

      if (!response.ok) throw new Error('Failed to send Discord notification');

      // Save to database
      const { error } = await supabase
        .from('creator_releases')
        .insert({
          creator_name: formData.storeName,
          resource_name: "Pending Review",
          price: formData.resourcePrice,
          store_name: formData.storeName,
          store_link: formData.storeLink,
          resource_link: formData.resourceLink,
          preview_images: formData.imageLink ? [formData.imageLink] : []
        });

      if (error) throw error;

      toast.success("Request Submitted! Your creator release request has been submitted for review.");

      setFormData({ storeName: "", storeLink: "", resourceLink: "", resourcePrice: "", imageLink: "" });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>FiveM Database - Creator Marketplace for Scripts & Resources</title>
        <meta name="description" content="Discover the best FiveM scripts, creators, and custom resources. From police jobs, garages, and advanced roleplay systems to premium FiveM assets—explore top creators like RTX Development, UZ Store, ZSX, JG Scripts, and many more trusted FiveM developers." />
        <link rel="canonical" href="https://fivemdb.online/creator-release-market" />
        <meta property="og:title" content="FiveM Database - Creator Marketplace for Scripts & Resources" />
        <meta property="og:description" content="Discover the best FiveM scripts, creators, and custom resources. From police jobs, garages, and advanced roleplay systems to premium FiveM assets—explore top creators like RTX Development, UZ Store, ZSX, JG Scripts, and many more trusted FiveM developers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.online/creator-release-market" />
        <meta property="og:image" content="https://fivemdb.online/images/og-default-1200x630.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiveM Database - Creator Marketplace for Scripts & Resources" />
        <meta name="twitter:description" content="Discover the best FiveM scripts, creators, and custom resources. From police jobs, garages, and advanced roleplay systems to premium FiveM assets." />
        <meta name="twitter:image" content="https://fivemdb.online/images/og-default-1200x630.png" />
      </Helmet>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Creator Release <span className="text-primary">Market</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover the latest releases from our verified creators and submit your own for community review
            </p>
            <Button
              onClick={() => setShowForm(true)}
              size="lg"
              className="px-8 py-3"
            >
              <Plus className="mr-2 h-5 w-5" />
              Submit Release Request
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          {releases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {releases.map((release, index) => (
                <motion.div
                  key={release.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl">
                        {release.creator_name} Released {release.resource_name}
                      </CardTitle>
                      <CardDescription>
                        <Badge variant="secondary" className="mb-2">
                          Price: {release.price}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {release.preview_images && release.preview_images.length > 0 && (
                        <div className="mb-4 h-40 bg-muted rounded-lg flex items-center justify-center">
                          <img 
                            src={release.preview_images[0]} 
                            alt="Preview"
                            className="max-h-full max-w-full object-contain rounded-lg"
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        <Button asChild className="w-full">
                          <a 
                            href={release.resource_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            Get Resource Here <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">No Releases Available</h3>
              <p className="text-muted-foreground mb-6">There are currently no featured creator releases to display.</p>
              <Button
                onClick={() => setShowForm(true)}
                size="lg"
                className="px-8 py-3"
              >
                <Plus className="mr-2 h-5 w-5" />
                Submit Your Release
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Submit Form Modal/Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Submit Release Request</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowForm(false)}
              >
                ×
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="storeName">Store Name *</Label>
                <Input
                  id="storeName"
                  value={formData.storeName}
                  onChange={(e) => handleInputChange('storeName', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="storeLink">Store Link *</Label>
                <Input
                  id="storeLink"
                  type="url"
                  value={formData.storeLink}
                  onChange={(e) => handleInputChange('storeLink', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="resourceLink">Resource Link *</Label>
                <Input
                  id="resourceLink"
                  type="url"
                  value={formData.resourceLink}
                  onChange={(e) => handleInputChange('resourceLink', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="resourcePrice">Resource Price *</Label>
                <Input
                  id="resourcePrice"
                  value={formData.resourcePrice}
                  onChange={(e) => handleInputChange('resourcePrice', e.target.value)}
                  placeholder="e.g., $25 or Free"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="imageLink">Image Link (Optional)</Label>
                <Input
                  id="imageLink"
                  type="url"
                  value={formData.imageLink}
                  onChange={(e) => handleInputChange('imageLink', e.target.value)}
                  placeholder="https://example.com/image.png"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CreatorReleaseMarket;