import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

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
  const [filteredReleases, setFilteredReleases] = useState<CreatorRelease[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "",
    storeLink: "",
    resourceLink: "",
    resourcePrice: "",
    imageLink: ""
  });

  const ITEMS_PER_PAGE = 24;
  

  useEffect(() => {
    fetchReleases(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const fetchReleases = async (page = 1, search = "") => {
    try {
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      let query = supabase
        .from('creator_releases')
        .select('*', { count: 'exact' })
        .eq('is_approved', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false });

      if (search) {
        query = query.or(`creator_name.ilike.%${search}%,resource_name.ilike.%${search}%,store_name.ilike.%${search}%`);
      }

      const { data, error, count } = await query.range(from, to);

      if (error) throw error;
      setReleases(data || []);
      setFilteredReleases(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching releases:', error);
      setReleases([]);
      setFilteredReleases([]);
      setTotalCount(0);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchReleases(1, searchTerm);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

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

      {/* Search Section */}
      <section className="py-8 bg-muted/50">
        <div className="container mx-auto px-6">
          <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl mx-auto">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by creator name, resource name, or store..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button type="submit" size="lg">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
          
          {searchTerm && (
            <div className="text-center mt-4">
              <p className="text-muted-foreground">
                {totalCount > 0 ? `Found ${totalCount} results for "${searchTerm}"` : `No results found for "${searchTerm}"`}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          {filteredReleases.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredReleases.map((release, index) => (
                  <motion.div
                    key={release.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-lg">
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
                          <div className="mb-4 h-32 bg-muted rounded-lg flex items-center justify-center">
                            <img 
                              src={release.preview_images[0]} 
                              alt="Preview"
                              className="max-h-full max-w-full object-contain rounded-lg"
                            />
                          </div>
                        )}
                        <div className="space-y-2">
                          <Button asChild className="w-full" size="sm">
                            <a 
                              href={release.resource_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              Get Resource <ExternalLink className="ml-2 h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(currentPage - 1);
                            }}
                          />
                        </PaginationItem>
                      )}
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              href="#"
                              isActive={currentPage === pageNum}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(pageNum);
                              }}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(currentPage + 1);
                            }}
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">No Releases Available</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm 
                  ? `No results found for "${searchTerm}". Try adjusting your search terms.`
                  : "There are currently no featured creator releases to display."
                }
              </p>
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