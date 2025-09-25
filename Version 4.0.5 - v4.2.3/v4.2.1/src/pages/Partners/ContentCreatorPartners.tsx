import { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, TrendingUp, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";

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

const ContentCreatorPartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selectedCreator, setSelectedCreator] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContentCreatorPartners = async () => {
      try {
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .eq('partner_type', 'content')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setPartners(data || []);
        if (data && data.length > 0) {
          setSelectedCreator(data[0]);
        }
      } catch (error) {
        console.error('Error loading content creators:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContentCreatorPartners();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Content Creator Partners | FiveM DB</title>
        <meta name="description" content="Featured FiveM content creators and partners collaborating with FiveM DB." />
        <link rel="canonical" href="https://fivemdb.online/content-creators" />
      </Helmet>
      <main className="flex-grow pt-8 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display mb-6 text-gradient animate-fade-in">
              Partner Content <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Creators</span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
             Discover the Content Creators that not only We support, 
             but that support the FiveM Database Project. 
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <Badge variant="outline" className="text-green-400 border-green-400/50">
                <Star className="w-4 h-4 mr-2" />
                Partner
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
                      Visit {selectedCreator.name}'s Channel
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
                    You're Currently Vewing; {selectedCreator.name}'s Channel
                  </CardTitle>
                  <CardDescription className="text-white/70 text-lg">
                    {/* Featured:   **REMOVED TO ANNOTHER LINE AND IS BASICLY JUST A FILLER CUS I DONT WANT TO REMOVE */}
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
                      <div className="text-sm text-white/50">Since</div>
                        <div className="text-lg font-medium text-white">{selectedCreator.metadata?.founded || 'N/A'}</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-m text-center text-white/50 mb-2">Content Types</div>
                        <div className="flex flex-wrap gap-1">
                          {(selectedCreator.metadata?.tags || []).map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                       
                  <div className="flex justify-center">
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" asChild>
                      <a href={selectedCreator.website_url || "#"} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit {selectedCreator.name}'s Channel
                      </a>
                    </Button>
                  </div>
                    </div>
                  </div>
                  
                  {/* Website Preview */}
                  <div className="lg:col-span-3">
                    <div className="mb-4">
                      <h4 className="text-lg font-display text-center text-white mb-2">Channel Preview</h4>
                      <p className="text-white/70 text-center text-sm">{selectedCreator.description}</p>
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
                      <embed 
                        src={selectedCreator.website_url || "#"} 
                        title={`${selectedCreator.name} website`} 
                        className="w-full h-full rounded-lg" 
                        type="text/html"
                      />
                    </AspectRatio>
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

export default ContentCreatorPartners;
