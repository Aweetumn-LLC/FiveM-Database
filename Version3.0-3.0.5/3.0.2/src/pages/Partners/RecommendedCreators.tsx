import { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, TrendingUp, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
}

const RecommendedCreators = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selectedCreator, setSelectedCreator] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendedCreators = async () => {
      try {
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .eq('partner_type', 'recommended')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setPartners(data || []);
        if (data && data.length > 0) {
          setSelectedCreator(data[0]);
        }
      } catch (error) {
        console.error('Error loading recommended creators:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendedCreators();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-8 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display mb-6 text-gradient animate-fade-in">
              Recommended <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Creators</span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Discover the creators we recommend for quality FiveM resources and scripts
              in the ecosystem. Each creator has been vetted for quality and reliability.
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <Badge variant="outline" className="text-green-400 border-green-400/50">
                <Star className="w-4 h-4 mr-2" />
                Community Approved
              </Badge>
              <Badge variant="outline" className="text-blue-400 border-blue-400/50">
                <TrendingUp className="w-4 h-4 mr-2" />
                Top Rated
              </Badge>
            </div>
          </div>

          {/* Creators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
            {partners.map((creator, index) => (
              <Card 
                key={creator.id} 
                className={`glass-card border-0 overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in group ${
                  selectedCreator?.id === creator.id ? 'ring-2 ring-green-500/50' : ''
                }`}
                style={{animationDelay: `${index * 100}ms`}}
                onClick={() => setSelectedCreator(creator)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={creator.logo_url || "/placeholder.svg"} 
                    alt={creator.name} 
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-display text-white">{creator.name}</CardTitle>
                  <CardDescription className="text-white/70 text-sm line-clamp-2">
                    {creator.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-center mb-3">
                    <div className="flex items-center text-xs text-white/60">
                      <Calendar className="w-3 h-3 mr-1" />
                      Since {creator.metadata?.founded || 'N/A'}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {(creator.metadata?.tags || []).slice(0, 2).map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full flex items-center gap-2 hover:bg-white/10" 
                    asChild
                  >
                    <a href={creator.website_url || "#"} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3" />
                      Visit Store
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Creator Showcase */}
          {selectedCreator && (
            <div className="mb-16">
              <Card className="glass-card border-0 overflow-hidden animate-fade-in" style={{animationDelay: '400ms'}}>
                <CardHeader className="text-center border-b border-white/10">
                  <CardTitle className="text-3xl font-display text-white mb-2">
                    Creator Spotlight
                  </CardTitle>
                  <CardDescription className="text-white/70 text-lg">
                    Featured: {selectedCreator.name}
                  </CardDescription>
                </CardHeader>
              
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Creator Stats */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="text-center">
                      <img 
                        src={selectedCreator.logo_url || "/placeholder.svg"} 
                        alt={selectedCreator.name} 
                        className="w-24 h-24 object-cover rounded-full mx-auto mb-4 ring-4 ring-white/10"
                      />
                      <h3 className="text-xl font-display text-white mb-2">{selectedCreator.name}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-3 bg-white/5 rounded-lg text-center">
                        <div className="text-lg font-medium text-white">{selectedCreator.metadata?.founded || 'N/A'}</div>
                        <div className="text-sm text-white/50">Founded</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-sm text-white/50 mb-2">Specialties</div>
                        <div className="flex flex-wrap gap-1">
                          {(selectedCreator.metadata?.tags || []).map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Website Preview */}
                  <div className="lg:col-span-3">
                    <div className="mb-4">
                      <h4 className="text-lg font-display text-white mb-2">Store Preview</h4>
                      <p className="text-white/70 text-sm">{selectedCreator.description}</p>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden border border-white/10 bg-black/30 mb-4">
                      <div className="bg-white/5 px-4 py-3 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                        <div className="text-sm text-white/70 bg-white/10 px-3 py-1 rounded-full">
                          {selectedCreator.website_url}
                        </div>
                      </div>
                    </div>
                    <AspectRatio ratio={16/9}>
                      <iframe 
                        src={selectedCreator.website_url || "#"} 
                        title={`${selectedCreator.name} website`} 
                        className="w-full h-full" 
                        sandbox="allow-same-origin allow-scripts"
                      />
                    </AspectRatio>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600" asChild>
                      <a href={selectedCreator.website_url || "#"} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Explore {selectedCreator.name}'s Store
                      </a>
                    </Button>
                  </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecommendedCreators;
